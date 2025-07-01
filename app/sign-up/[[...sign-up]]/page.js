import {AppBar, Container, Toolbar, Button, Typography,Box} from '@mui/material';
import Link from 'next/link';
import {SignUp} from '@clerk/nextjs';
import Navbar from '@/components/Navbar';

export default function SignUpPage() {
    return <Container maxWidth="100vw" >
        <Navbar />

        <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        >
        <Typography variant="h4" gutterBottom>
            Sign Up
        </Typography>
        <SignUp />
            
        </Box>
        </Container>
}