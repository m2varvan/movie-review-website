import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const ReviewTitle = (props) => {

  //states declarations
  //constants and functions declarations
  const handleChange = (event) => {
    props.setEnteredTitle(event.target.value)
    props.setTitleError('')
  };
  
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField 
      id="review-title" 
      label="Enter Your Review Title" 
      variant="standard" 
      value = {props.enteredTitle}
      onChange = {handleChange}
      />
    </Box>
    
  );
}

export default ReviewTitle;

