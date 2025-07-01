'use client';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'white', color: 'white', px: 4, top: 0, zIndex: 1100 }}>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', height: 64 }}>
        {/* Logo */}
        <Box onClick={() => router.push('/')} sx={{ cursor: 'pointer' }}>
          <Image
            src="/logo.svg"
            alt="Logo"
            width={250}
            height={150}
            priority
          />
        </Box>
        <Box sx={{ flexGrow: 1 }} />

        {/* Sign Up and Log In Buttons */}
        <SignedOut>
          <Button
            variant="outlined"
            sx={{
              borderColor: 'black',
              color: 'black',
              mx: 2,
              '&:hover': {
                backgroundColor: 'rgb(175, 175, 175)',
                borderColor: 'grey',
              },
            }}
            onClick={() => router.push('/sign-up')}
          >
            Sign Up
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'rgb(210, 55, 245)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgb(147, 4, 182)',
              },
            }}
            onClick={() => router.push('/sign-in')}
          >
            Log In
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Toolbar>
    </AppBar>
  );
}
