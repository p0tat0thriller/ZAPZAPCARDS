'use client';

import { useUser } from '@clerk/nextjs';
import { Container, Typography, Box } from '@mui/material';
import FlashcardDisplay from '../../components/FlashcardDisplay';
import { useEffect } from 'react';

export default function Flashcards() {
    const { isLoaded, isSignedIn, user } = useUser();

    useEffect(() => {
        const original = document.body.style.backgroundImage;
        document.body.style.backgroundImage = 'none';
        return () => {
            document.body.style.backgroundImage = original;
        };
    }, []);

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
            <Container maxWidth="md" sx={{
                mt: 0,
                borderRadius: 4,
                boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
                py: 4,
                backgroundColor: '#fff',
            }}>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Typography
                        variant="h4"
                        component="h1"
                        gutterBottom
                        sx={{ fontWeight: 600, color: 'rgb(0, 0, 0)' }}
                    >
                        These Are Your Created Flashcard Sets
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: 'rgb(0, 0, 0)' }}>
                        Here are the flashcard sets you have created. Click on a card to view details..
                    </Typography>
                </Box>
                <FlashcardDisplay user={user} />
            </Container>
        </Box>
    );
}
