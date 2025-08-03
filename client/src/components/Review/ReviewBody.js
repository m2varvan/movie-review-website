import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const ReviewBody = (props) => {

  //states declarations
  //constants and functions declarations
  const handleChange = (event) => {
    props.setEnteredReview(event.target.value)
    props.setReviewError('')
  }
  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '45ch' } }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="review-body"
          label="Enter Your Review"
          multiline
          rows={4}
          inputProps={{ maxLength: 200 }} // restrict input to 200 characters
          helperText={`${props.enteredReview.length}/200 characters`} // optional character counter
          value = {props.enteredReview}
          onChange = {handleChange}
        />
      </div>
    </Box>
  );
}

export default ReviewBody;

