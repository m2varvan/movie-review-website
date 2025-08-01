import * as React from 'react';
import ReviewTitle from './ReviewTitle';
import ReviewBody from './ReviewBody';
import ReviewRating from './ReviewRating';
import MovieSelection from './MovieSelection';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Review = () => {

  //states declarations
  const [selectedMovie, setSelectedMovie] = React.useState('')
  const [enteredTitle, setEnteredTitle] = React.useState('')
  const [enteredReview, setEnteredReview] = React.useState('')
  const [selectedRating, setSelectedRating] = React.useState('')
  const [movies, setMovies] = React.useState([]);
  const [error, setError] = React.useState({})
  const [submitStatus, setSubmitStatus] = React.useState(false)
  const [confirmationMessage, setConfirmationMessage] = React.useState(null)

  //states for api calls
  const [loading, setLoading] = React.useState(false)
  const [userID] = React.useState(2)

  
  // Error States
  const [movieError, setMovieError] = React.useState('')
  const [titleError, setTitleError] = React.useState('')
  const [reviewError, setReviewError] = React.useState('')
  const [ratingError, setRatingError] = React.useState('')


  //constants and functions declarations
  React.useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/movies');

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Failed to load movies:', error);
    } finally {
      setLoading(false);
    }
  };


const handleSubmit = async () => {
  const newErrors = {};
  if (selectedMovie === '') {
    newErrors.movie = "Select Your movie";
    setMovieError("Select your movie");
    setConfirmationMessage(null);
  }
  if (enteredTitle.trim() === '') {
    newErrors.title = "Enter your review title";
    setTitleError("Enter your review title");
    setConfirmationMessage(null);
  }
  if (enteredReview.trim() === '') {
    newErrors.review = "Enter your review";
    setReviewError("Enter your review");
    setConfirmationMessage(null);
  }
  if (selectedRating === '') {
    newErrors.rating = "Select the rating";
    setRatingError("Select the rating");
    setConfirmationMessage(null);
  }

  setError(newErrors);

  if (Object.keys(newErrors).length === 0) {
    const reviewData = {
      movieID: selectedMovie.id,     
      userID: userID,                  
      reviewTitle: enteredTitle,
      reviewContent: enteredReview,
      reviewScore: selectedRating
    };

    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to submit review');
    }

    setSubmitStatus(true);
    setConfirmationMessage(
      <Typography id="confirmation-message" color="success.main">
        Your review has been received <br />
        Movie: {selectedMovie.name} <br />
        Review Title: {enteredTitle} <br />
        Review Body: {enteredReview} <br />
        Rating: {selectedRating} <br />
      </Typography>
    );
  }
};


  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',  // center horizontally
        mt: 5, // margin top for spacing
      }}
      > 
        <Grid container spacing={2} direction = "column" alignItems = "center" justifyContent="center" maxWidth={500} sx={{ border: '1px solid #ccc' }}>
          
          <Grid item>
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
            Enter Your Review
          </Typography>          
          </Grid>

          <Grid item>
            <MovieSelection 
            movies = {movies} 
            setMovies = {setMovies}
            selectedMovie = {selectedMovie}
            setSelectedMovie = {setSelectedMovie}
            setMovieError = {setMovieError}
            />
            {'movie' in error && (
              <Typography color="red">{movieError}</Typography>
            )}
          </Grid>

          <Grid item>
            <ReviewTitle
            enteredTitle = {enteredTitle}
            setEnteredTitle = {setEnteredTitle}
            setTitleError = {setTitleError}
            /> 
            {'title' in error && (
              <Typography color="red">{titleError}</Typography>
            )}
          </Grid>

          <Grid item>
            <ReviewBody
            enteredReview = {enteredReview}
            setEnteredReview = {setEnteredReview}
            setReviewError = {setReviewError}
            />
            {'review' in error && (
              <Typography color="red">{reviewError}</Typography>
            )}
          </Grid>

          <Grid item>
            <ReviewRating
            selectedRating = {selectedRating}
            setSelectedRating = {setSelectedRating}
            setRatingError = {setRatingError}
            />
            {'rating' in error && (
              <Typography color="red">{ratingError}</Typography>
            )}
          </Grid>

          <Grid item>
            <Button id="submit-button" variant="contained" onClick={handleSubmit}>Submit</Button>
            {submitStatus === true && (
              <Typography id="confirmation-message" color="success.main">
              {confirmationMessage}
              </Typography>
            )}
          </Grid>

        </Grid>
      </Box>
  );
}

export default Review;
