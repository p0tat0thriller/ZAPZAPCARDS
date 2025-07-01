import { useState, useEffect } from 'react';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useRouter } from 'next/navigation';
import { 
  Container, 
  Grid, 
  Card, 
  CardActionArea, 
  CardContent, 
  Typography, 
  Box, 
  IconButton, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions, 
  Button,
  Tooltip
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

export default function FlashcardDisplay({ user }) {
    const [flashcards, setFlashcards] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [flashcardToDelete, setFlashcardToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function getFlashCards() {
            if (!user) return;
            const docRef = doc(collection(db, 'users'), user.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const collections = docSnap.data().flashcards || [];
                setFlashcards(collections);
            } else {
                await setDoc(docRef, { flashcards: [] });
            }
        }
        getFlashCards();
    }, [user]);

    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`);
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
            const response = await fetch('/api/flashcards/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id,
                    collectionName: flashcardToDelete.name
                }),
            });

            if (response.ok) {
                // Remove the flashcard from local state
                setFlashcards(prev => prev.filter(f => f.name !== flashcardToDelete.name));
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

    return (
        <>
            <Box sx={{
              maxWidth: '1200px',
              mx: 'auto',
              mb: 6,
              borderRadius: 3,
              px: { xs: 2, sm: 4 },
              py: 2,
              backgroundImage: "url('/background.svg')",
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed',
              animation: 'gradientBG 10s ease infinite',
              boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
            }}>
              <Grid container spacing={3} justifyContent="center">
                    {flashcards.map((flashcard, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card
                                sx={{
                                    borderRadius: 2,
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    background: 'rgba(198, 198, 198, 0.85)',
                                    '&:hover': {
                                        boxShadow: '0 8px 24px 0 rgba(124, 58, 237, 0.15)',
                                        transform: 'scale(1.04) translateY(-4px)',
                                        background: '#e0bbff',
                                        color: '#222',
                                    },
                                    maxWidth: 300, 
                                    mx: 'auto',
                                    position: 'relative',
                                    zIndex: 1,
                                    willChange: 'transform',
                                }}
                            >
                                <CardActionArea onClick={() => handleCardClick(flashcard.name)}
                                    sx={{ pointerEvents: 'auto' }}
                                >
                                    <CardContent
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '100px',
                                            backgroundColor: '#f5f5f5',
                                            p: 2, 
                                            transition: 'color 0.2s',
                                        }}
                                    >
                                        <Typography variant="h6" sx={{ color: '#222', fontWeight: 500 }}>
                                            {flashcard.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                {/* Delete Button */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 8,
                                        right: 8,
                                        zIndex: 10,
                                        pointerEvents: 'auto',
                                    }}
                                >
                                    <Tooltip title="Delete flashcard set">
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
            </Box>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                aria-labelledby="delete-dialog-title"
                aria-describedby="delete-dialog-description"
            >
                <DialogTitle id="delete-dialog-title" sx={{ color: '#rgb(210, 55, 245)' }}>
                    Delete Flashcard Set
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-description">
                        Are you sure you want to delete "{flashcardToDelete?.name}"? 
                        This action cannot be undone and will permanently remove all flashcards in this set.
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
        </>
    );
}
