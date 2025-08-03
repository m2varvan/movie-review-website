import * as React from 'react';
import { Typography, Box, TextField, Button, Paper } from '@mui/material';

const Search = () => {

  // States for values entered in the text field
  const [movieTitleSearch, setMovieTitleSearch] = React.useState('')
  const [actorSearch, setActorSearch] = React.useState('')
  const [directorName, setDirectorName] = React.useState('')

  // States for api
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false)

  const handleChange1 = (event) => {
    setMovieTitleSearch(event.target.value)
  };

  const handleChange2 = (event) => {
    setActorSearch(event.target.value)
  };

  const handleChange3 = (event) => {
    setDirectorName(event.target.value)
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (movieTitleSearch) queryParams.append('title', movieTitleSearch);
      if (actorSearch) queryParams.append('actor', actorSearch);
      if (directorName) queryParams.append('director', directorName);

      const response = await fetch(`/api/search?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
      <Box sx={{ mt: 4, px: 2 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            textAlign: 'center',
            mt: 4 
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
            Search for a Movie
          </Typography>
        </Box>

        <Box
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-evenly', 
            gap: 2, 
            flexWrap: 'wrap', 
            mt: 4
          }}
        >
          <TextField 
            id="search-title" 
            label="Enter the Movie Title" 
            variant="outlined" 
            value = {movieTitleSearch}
            onChange = {handleChange1}
            sx={{ width: '400px' }}
          />

          <TextField 
            id="search-actor" 
            label="Enter the Actors First and Last Name" 
            variant="outlined" 
            value = {actorSearch}
            onChange = {handleChange2}
            sx={{ width: '400px' }}
          />

          <TextField 
            id="search-director" 
            label="Enter the Directors First and Last Name" 
            variant="outlined" 
            value = {directorName}
            onChange = {handleChange3}
            sx={{ width: '400px' }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button id="search-button" variant="contained" onClick={handleSearch}>Submit</Button>
        </Box>
        {loading && <Typography>Loading...</Typography>}

        {results.length > 0 && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt={4}
          >
            <Typography variant="h5" gutterBottom>
              Search Results
            </Typography>

            {results.map((movie, index) => (
              <Paper
                key={index}
                elevation={3}
                sx={{
                  width: "90%",
                  maxWidth: "600px",
                  mb: 3,
                  p: 2,
                  backgroundColor: "#f9f9f9",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Movie Title: {movie.movieTitle}
                </Typography>
                <Typography variant="subtitle1">
                  Movie Director: {movie.director.join(", ")}
                </Typography>
                <Typography variant="subtitle1">
                  Average Rating: {movie.averageRating}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Reviews:
                </Typography>
                <ul style={{ paddingLeft: "20px", marginTop: 0 }}>
                  {movie.reviews.length > 0 ? (
                    movie.reviews.map((review, idx) => (
                      <li key={idx}>
                        <Typography variant="body2">"{review}"</Typography>
                      </li>
                    ))
                  ) : (
                    <li>
                      <Typography variant="body2">No reviews</Typography>
                    </li>
                  )}
                </ul>
              </Paper>
            ))}
          </Box>
        )}

      </Box>
      
    </div>
  );
}

export default Search;
