'use client';
import { Box, Typography, Button, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

const HeroSection = () => {
  const router = useRouter();
  const { user } = useUser();

  const handleButtonClick = (path) => {
    if (!user) {
      router.push('/sign-in'); // Redirect to sign-up page if user is not authenticated
    } else {
      router.push(path); // Otherwise, proceed with the original path
    }
  };

  return (
    <Box 
      sx={{ 
        bgcolor: 'orange', 
        color: 'white', 
        py: 8, 
        textAlign: 'center',
        backgroundImage: 'url("/herosection.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
    >
      {/* Orange overlay for readability */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        bgcolor: 'rgba(0, 0, 0, 0.32)', // semi-transparent orange
        zIndex: 0,
        pointerEvents: 'none',
      }} />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Main Header Text */}
        <Box 
          sx={{ 
            mb: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography 
            variant="h3"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '2rem', md: '2.5rem' }, // Adjusted for longer text
              textAlign: 'center'
            }}
          >
            An intelligent flashcard creation platform that lets you generate study cards using AI or craft them manually.
          </Typography>
        </Box>

         {/* Buttons Container */}
         <Box 
          sx={{ 
            mt: 4, 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3 // Add vertical space between the two button sections
          }}
        >
          {/* AI Generate Section */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, maxWidth: 600 }}>
            <Typography 
              variant="subtitle1"
              sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center', mb: 0.5 }}
            >
              Let AI do the heavy lifting.
            </Typography>
            <Typography 
              variant="body1"
              sx={{ color: 'white', fontSize: { xs: '0.95rem', md: '1.05rem' }, textAlign: 'center', mb: 1 }}
            >
              Enter your text or topic, and the AI will extract key questions and answers to create high-quality, smart, ready-to-review flashcards tailored to your content helping you understand the key concepts.
            </Typography>
            <Button 
              variant="contained" 
              sx={{
                bgcolor: 'rgb(42, 159, 248)',
                borderColor: 'rgb(255, 255, 0)',
                color: 'white',
                '&:hover': {
                  bgcolor: 'rgb(5, 103, 200)',
                  borderColor: 'rgb(255, 255, 0)',
                },
              }}
              onClick={() => handleButtonClick('/generate')}
            >
              Try AI Generate
            </Button>
          </Box>

          {/* Add extra space between the two button sections */}
          <Box sx={{ height: 24 }} />

          {/* Manual Flashcards Section */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, maxWidth: 600 }}>
            <Typography 
              variant="subtitle1"
              sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center', mb: 0.5 }}
            >
              Want to create flashcards the old school way?
            </Typography>
            <Typography 
              variant="body1"
              sx={{ color: 'white', fontSize: { xs: '0.95rem', md: '1.05rem' }, textAlign: 'center', mb: 1 }}
            >
              Add your own questions, answers, and organize them exactly how you like. Create flashcards manually with your own terms, definitions, and notes. Ideal for focused, hands-on revision.
            </Typography>
            <Button 
              variant="outlined" 
              sx={{
                bgcolor: 'rgb(255, 44, 192)',
                color: 'white',
                borderColor: 'rgb(255, 44, 192)',
                '&:hover': {
                  bgcolor: 'rgb(197, 0, 138)',
                  borderColor: 'rgb(197, 0, 138)',
                },
              }}
              onClick={() => handleButtonClick('/manual/flashcards')}
            >
              Create Flashcards Manually
            </Button>
          </Box>
        </Box>
      </Container>
      
    </Box>
  );
};

export default HeroSection;
