import * as React from 'react';
import { Typography, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import movieImage from '../../assets/movieImage.jpg';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const Landing = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      {/* Full-screen background image */}
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          backgroundImage: `url(${movieImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          position: 'relative',
        }}
      >
        {/* Semi-transparent overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.42)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: 'red',
              fontWeight: 'bold',
              letterSpacing: '0.1em',
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
            }}
            gutterBottom
          >
            Welcome to MovieVerse
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Landing;
