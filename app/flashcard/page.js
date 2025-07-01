'use client'

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs  } from 'firebase/firestore';
import { db } from '../../firebase';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Grid,
    Card,
    CardContent,
    CardActionArea,
    Paper,
    IconButton,
    Tooltip,
  } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useSearchParams } from 'next/navigation';

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState({});
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [flashcardToDelete, setFlashcardToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const searchParams = useSearchParams();
    const search = searchParams.get('id');
    
    useEffect(() => {
        async function getFlashCard() {
            if (!user || !search) return;
            const colRef = collection(doc(collection(db, 'users'), user.id), search);
            const docs = await getDocs(colRef);
            const flashcards = [];

            docs.forEach((doc) => {
                flashcards.push({id: doc.id, ...doc.data()});
            });
            setFlashcards(flashcards);
            console.log(flashcards);
        }
        getFlashCard();
    }, [user, search]);

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
          ...prev,
          [id]: !prev[id],
        }));
    };

    const handleDeleteClick = (e, flashcard) => {
        e.stopPropagation();
        setFlashcardToDelete(flashcard);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!flashcardToDelete) return;
        
        setIsDeleting(true);
        try {
            const response = await fetch('/api/flashcards/delete-card', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id,
                    collectionName: search,
                    cardId: flashcardToDelete.id
                }),
            });

            if (response.ok) {
                // Remove the flashcard from local state
                setFlashcards(prev => prev.filter(f => f.id !== flashcardToDelete.id));
                setDeleteDialogOpen(false);
                setFlashcardToDelete(null);
            } else {
                const error = await response.json();
                alert(`Error deleting flashcard: ${error.error}`);
            }
        } catch (error) {
            console.error('Error deleting flashcard:', error);
            alert('Failed to delete flashcard. Please try again.');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setFlashcardToDelete(null);
    };

    if (!isLoaded || !isSignedIn) {
        return <></>;
    }

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
            <Container maxWidth="md" sx={{ mt: 0, backgroundColor: '#fff', borderRadius: 4, boxShadow: '0 2px 16px rgba(0,0,0,0.04)', py: 4 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, color: 'black' }}>
                        {search} - Flashcard Set
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                        Click on a card to flip it. Use the delete button to remove individual cards.
                    </Typography>
                </Box>
                <Grid container spacing={3}>
                    {flashcards.map((flashcard, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card
                                sx={{
                                    backgroundColor: 'transparent',
                                    boxShadow: 'none',
                                    borderRadius: 2,
                                    '&:hover': {
                                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                                    },
                                    position: 'relative',
                                }}
                            >
                                <CardActionArea onClick={() => handleCardClick(index)}>
                                    <CardContent>
                                        <Box
                                            sx={{
                                                perspective: '1000px',
                                                '& > div': {
                                                    transition: 'transform 0.6s',
                                                    transformStyle: 'preserve-3d',
                                                    position: 'relative',
                                                    width: '100%',
                                                    height: '200px',
                                                    borderRadius: 2,
                                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                                    transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                                },
                                                '& > div > div': {
                                                    position: 'absolute',
                                                    width: '100%',
                                                    height: '100%',
                                                    backfaceVisibility: 'hidden',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: 3,
                                                    boxSizing: 'border-box',
                                                    borderRadius: 2,
                                                },
                                                '& > div > div:nth-of-type(2)': {
                                                    transform: 'rotateY(180deg)',
                                                },
                                            }}
                                        >
                                            <div>
                                                <div
                                                    style={{
                                                        backgroundColor: 'rgb(118, 118, 118)',
                                                        color: 'white',
                                                        borderRadius: '12px',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <Typography variant="h6" component="div">
                                                        {flashcard.front}
                                                    </Typography>
                                                </div>
                                                <div
                                                    style={{
                                                        backgroundColor: 'white',
                                                        color: 'black',
                                                        borderRadius: '12px',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <Typography variant="h6" component="div">
                                                        {flashcard.back}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                                
                                {/* Delete Button */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 8,
                                        right: 8,
                                        zIndex: 1,
                                    }}
                                >
                                    <Tooltip title="Delete this flashcard">
                                        <IconButton
                                            onClick={(e) => handleDeleteClick(e, flashcard)}
                                            sx={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                                                },
                                                width: 32,
                                                height: 32,
                                            }}
                                        >
                                            <Delete sx={{ fontSize: 18, color: '#d32f2f' }} />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                aria-labelledby="delete-card-dialog-title"
                aria-describedby="delete-card-dialog-description"
            >
                <DialogTitle id="delete-card-dialog-title" sx={{ color: '#d32f2f' }}>
                    Delete Flashcard
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-card-dialog-description">
                        Are you sure you want to delete this flashcard? 
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} disabled={isDeleting}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleDeleteConfirm} 
                        color="error" 
                        variant="contained"
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}