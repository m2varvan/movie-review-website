import * as React from 'react';
import Typography from "@mui/material/Typography";

const Landing = () => {
  return (
    <div>
      <Typography 
      variant = 'h3' 
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
    </div>
  );
}

export default Landing;
