'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Container, TextField, Button, Typography, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Paper, CircularProgress } from '@mui/material';
import { collection, doc, writeBatch, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function Generate() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const [flipped, setFlipped] = useState(false);
  const [text, setText] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0); 
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    fetch('api/generate', {
      method: 'POST',
      body: text,
    })
      .then((response) => response.json())
      .then((data) => {
        setFlashcards(data);
        setCurrentCardIndex(0); // Reset to first card
        setFlipped(false); // Reset flip state
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleCardClick = () => {
    setFlipped(!flipped);
  };

  const handleNext = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setFlipped(false); 
    }
  };

  const handlePrev = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setFlipped(false); 
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const saveFlashcards = async () => {
    if (!name) {
      alert('Please enter a name for your flashcard set.');
      return;
    }
    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, 'users'), user.id);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || [];
      if (collections.find((f) => f.name === name)) {
        alert('You already have a collection with this name. Please choose a different name.');
        return;
      } else {
        collections.push({ name });
        batch.set(userDocRef, { flashcards: collections }, { merge: true });
      }
    } else {
      batch.set(userDocRef, { flashcards: [{ name }] });
    }

    const colRef = collection(userDocRef, name);
    flashcards.forEach((flashcard) => {
      const cardDocRef = doc(colRef);
      batch.set(cardDocRef, flashcard);
    });

    await batch.commit();
    handleClose();
    router.push('/flashcards');
  };

  return (
    <Box
      sx={{
        backgroundImage: "url('/diamond-sunset.svg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100vw',
      }}
    >
      <Container maxWidth="md" sx={{ mt: 0, pt: 0, pb: 0 }}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '25%',
            width: '700px',
            height: '700px',
            borderRadius: '20%',
            background: 'linear-gradient(to top, black, rgb(190, 18, 60))',
            boxShadow: 3,
            zIndex: 0, 
            filter: 'blur(70px)', 
            opacity: 0.1, 
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'transparent',
            padding: 4,
            borderRadius: 3,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'black', fontWeight: 600 }} justifyContent="center">
            Try AI generative searches <span style={{ color: 'rgb(0, 0, 0)' }}>instantly</span>
          </Typography>
          <Paper
            elevation={6}
            sx={{
              padding: 4,
              backgroundColor: '#fff',
              boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
              borderRadius: 4,
              width: '100%',
              maxWidth: '400px',
              height: '300px',
              marginTop: '50px',
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'black', fontWeight: 600 }}>
              Generate Flashcards
            </Typography>
            <Typography variant="body1" sx={{ color: 'grey', mb: 6, mt: 4 }}>
              Enter any topic you want to study. We will generate flashcards for you.
            </Typography>
            <Box sx={{ width: '80%', margin: '0 auto' }}>
              <TextField
                value={text}
                onChange={(e) => setText(e.target.value)}
                label="Enter text"
                fullWidth
                multiline
                rows={1}
                variant="outlined"
                sx={{
                  mb: 2,
                  backgroundColor: '#fff',
                  borderRadius: 2,
                }}
              />
            </Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'rgba(210, 55, 245, 0.8)',
                color: '#fff',
                fontWeight: 600,
                width: 'auto',
                '&:hover': {
                  backgroundColor: 'rgba(146, 4, 182, 0.8)',
                },
                mt: 2,
                mb: 2,
              }}
              onClick={handleSubmit}
              fullWidth
            >
              Generate Flashcards
            </Button>
          </Paper>
        </Box>

        {flashcards.length > 0 && (
          <>
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography
                variant="h6"
                component="h2"
                fontWeight="bold"
                align="center"
                sx={{
                  fontStyle: 'italic', 
                  mb: 4, 
                  color: 'white', 
                }}
              >
                Here are some flashcards we generated for you. 
                Let's see how well you know them!
              </Typography>

              {/* Flashcard Display */}
              {flashcards.length > 0 && (
                <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Box sx={{ position: 'relative', width: '70%', maxWidth: '500px' }}>
                    {/* Navigation Arrows */}
                    <IconButton
                      onClick={handlePrev}
                      disabled={currentCardIndex === 0}
                      sx={{
                        position: 'absolute',
                        left: '-50px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 1,
                        color: 'grey',
                        '&:disabled': {
                          color: 'lightgrey',
                        },
                      }}
                    >
                      <ArrowBack />
                    </IconButton>
                    <IconButton
                      onClick={handleNext}
                      disabled={currentCardIndex === flashcards.length - 1}
                      sx={{
                        position: 'absolute',
                        right: '-50px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 1,
                        color: 'grey',
                        '&:disabled': {
                          color: 'lightgrey',
                        },
                      }}
                    >
                      <ArrowForward />
                    </IconButton>

                    {/* Flashcard */}
                    <Box
                      onClick={handleCardClick}
                      sx={{
                        perspective: '1000px',
                        width: '100%',
                        height: '300px',
                        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                        transition: 'transform 0.6s',
                        transformStyle: 'preserve-3d',
                        borderRadius: '16px',
                        position: 'relative',
                        zIndex: 0,
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          backfaceVisibility: 'hidden',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: 3,
                          boxSizing: 'border-box',
                          borderRadius: '16px',
                          backgroundColor: 'rgb(86, 86, 86)',
                          color: 'white',
                          textAlign: 'center',
                        }}
                      >
                        <Typography variant="h6">
                          {flashcards[currentCardIndex]?.front}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: 3,
                          boxSizing: 'border-box',
                          borderRadius: '16px',
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          color: 'black',
                          textAlign: 'center',
                        }}
                      >
                        <Typography variant="h6">
                          {flashcards[currentCardIndex]?.back}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Counter Display */}
                  <Box
                    sx={{
                      marginTop: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '150px',
                      height: '150px',
                      marginLeft: 12,
                    }}
                  >
                    {/* Circular Progress */}
                    <CircularProgress
                      variant="determinate"
                      value={(currentCardIndex + 1) / flashcards.length * 100}
                      size={150}
                      thickness={4}
                      sx={{
                        color: 'rgba(255, 255, 255, 0.3)',
                        position: 'absolute',
                      }}
                    />
                    {/* Numeric Display */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                        zIndex: 1,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'white',
                          fontWeight: 'bold',
                          textAlign: 'center',
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          borderRadius: '8px',
                          padding: '8px',
                        }}
                      >
                        {currentCardIndex + 1} / {flashcards.length}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}

              {/* Save Flashcards Button */}
              <Button
                variant="contained"
                sx={{
                  backgroundColor: 'white',
                  color: 'black',
                  fontWeight: 600,
                  mt: 4,
                  mb: 4,
                  '&:hover': {
                    backgroundColor: 'grey',
                  },
                }}
                onClick={handleOpen}
              >
                Save Flashcards
              </Button>
            </Box>
          </>
        )}
        {/* Dialog for saving flashcards */}
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth borderRadius="100px">
          <DialogTitle
            sx={{
              backgroundColor: 'rgb(18, 56, 243)', 
              color: 'white', 
              fontWeight: 600, 
            }}
          >
            Save Flashcards
          </DialogTitle>
          <DialogContent
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.1)', 
              padding: 3, 
            }}
          >
            <DialogContentText
              sx={{
                marginTop: 2,
                marginBottom: 2, 
                color: 'text.primary', 
                fontSize: '16px', 
              }}
            >
              Enter a name for your flashcard set:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Set Name"
              type="text"
              fullWidth
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                marginTop: 1,
                borderRadius: 2, 
              }}
            />
          </DialogContent>
          <DialogActions
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            }}
          >
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={saveFlashcards} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
