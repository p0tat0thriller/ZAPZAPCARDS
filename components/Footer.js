import { Box, Typography, Container, Grid, Link } from '@mui/material';
import Image from 'next/image';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: 'rgb(255, 255, 255)',
        color: 'black',
        py: { xs: 2, md: 3 },
        borderTop: '2px solid rgba(0, 0, 0, 0.1)',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Image src="/logo.svg" alt="FlashCard Saas Logo" width={150} height={45} />
            </Box>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgb(0, 0, 0)', 
                maxWidth: '300px', 
                fontSize: { xs: '0.875rem', md: '1rem' } 
              }}
            >
              Your go-to platform for creating, managing, and studying flashcards. Learn faster, smarter, and better.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600, 
                mb: 2, 
                fontSize: { xs: '1rem', md: '1.25rem' } 
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/generate" color="inherit" underline="hover" sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                Generate Flashcards
              </Link>
              <Link href="/" color="inherit" underline="hover" sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                About Us
              </Link>
              <Link href="/" color="inherit" underline="hover" sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                Contact
              </Link>
            </Box>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600, 
                mb: 2, 
                fontSize: { xs: '1rem', md: '1.25rem' } 
              }}
            >
              Contact Us
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgb(0, 0, 0)',
                fontSize: { xs: '0.875rem', md: '1rem' } 
              }}
            >
              Email: akshitnalawade33@gmail.com
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgb(0, 0, 0)',
                fontSize: { xs: '0.875rem', md: '1rem' } 
              }}
            >
              Email: yahya.alim.37@gmail.com
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgb(0, 0, 0)', 
                fontSize: { xs: '0.875rem', md: '1rem' } 
              }}
            >
              Phone: +91 93723 64465
            </Typography>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgb(0, 0, 0)', 
              fontSize: { xs: '0.75rem', md: '0.875rem' } 
            }}
          >
            &copy; {new Date().getFullYear()} ZAPZAPCARDS. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
