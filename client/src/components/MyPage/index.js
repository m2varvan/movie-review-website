import * as React from 'react';
import { Typography, Box, Button, MenuItem, Select, FormControl, InputLabel, Paper } from '@mui/material';

const MyPage = () => {
  // Static user ID for demonstration (should be dynamic in real apps)
  const userID = 2;

  // State to hold movies in user's watchlist
  const [watchlist, setWatchList] = React.useState([]);

  // State to hold all available movies
  const [allMovies, setAllMovies] = React.useState([]);

  // State to track the selected movie for adding to the watchlist
  const [selectedMovie, setSelectedMovie] = React.useState('');

  // Updates selectedMovie state when user chooses a movie from dropdown
  const handleChange = (event) => {
    setSelectedMovie(event.target.value);
  };

  // Adds selected movie to watchlist
  const handleAddToWatchlist = () => {
    toggleWatchlist(selectedMovie, false);
  };

  // Removes a movie from watchlist by ID
  const handleRemoveFromWatchlist = (movieID) => {
    toggleWatchlist(movieID, true);
  };

  // Runs once on component mount to load initial data
  React.useEffect(() => {
    loadMovies();
    loadWatchlist();
  }, []);

  // Fetches current watchlist from backend for this user
  const loadWatchlist = () => {
    fetch(`/api/watchlist/${userID}`)
      .then((res) => res.json())
      .then((data) => {
        // Ensure data is an array before setting
        setWatchList(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error('Error fetching watchlist:', err);
        setWatchList([]);
      });
  };

  // Fetches all available movies from backend
  const loadMovies = async () => {
    try {
      const response = await fetch('/api/movies');
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      const data = await response.json();
      setAllMovies(data);
    } catch (error) {
      console.error('Failed to load movies:', error);
    }
  };

  // Adds or removes a movie from the user's watchlist
  const toggleWatchlist = (movieID, inWatchlist) => {
    const url = inWatchlist ? '/api/watchlist/remove' : '/api/watchlist/add';

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userID, movieID }),
    })
      .then((res) => res.json())
      .then(() => {
        // Refresh watchlist after change
        loadWatchlist();
        // Clear selected movie after adding
        setSelectedMovie('');
      })
      .catch((err) => console.error('Error updating watchlist:', err));
  };

  // Checks if a movie is already in the watchlist
  const isInWatchlist = (movieID) =>
    watchlist.some((movie) => movie.movieID === movieID);

  // Confirms if watchlist data is valid
  const isValidWatchlist = Array.isArray(watchlist) && watchlist.length > 0;

  return (
    <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Page Title */}
      <Typography
        variant="h3"
        sx={{
          color: 'red',
          fontWeight: 'bold',
          letterSpacing: '0.1em',
          fontFamily: '"Comic Sans MS", cursive, sans-serif',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
          mb: 4,
          textAlign: 'center',
        }}
      >
        🎬 My Movie Watchlist
      </Typography>

      {/* Add Movie to Watchlist Section */}
      <Box sx={{ maxWidth: 400, width: '100%', mb: 5 }}>
        <Typography variant="h6" gutterBottom>
          Add a Movie to Watchlist
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="movie-watchlist-select-label">Select Movie</InputLabel>
          <Select
            labelId="movie-watchlist-select-label"
            value={selectedMovie}
            label="Select Movie"
            onChange={handleChange}
          >
            {/* Dropdown options for all available movies */}
            {allMovies.map((movie) => (
              <MenuItem key={movie.id} value={movie.id}>
                {movie.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          id="add-movie-button"
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleAddToWatchlist}
          disabled={!selectedMovie || isInWatchlist(selectedMovie)}
          fullWidth
        >
          Add to Watchlist
        </Button>
      </Box>

      {/* Watchlist Display Section */}
      <Paper elevation={3} sx={{ p: 3, maxWidth: 500, width: '100%' }}>
        <Typography variant="h6" gutterBottom>
          📌 Movies in Your Watchlist
        </Typography>
        {isValidWatchlist ? (
          // If watchlist has movies, display them
          <ul style={{ paddingLeft: 16 }}>
            {watchlist.map((movie) => (
              <li key={movie.movieID}>
                {movie.movieTitle}{' '}
                <Button
                  id="remove-movie-button"
                  size="small"
                  color="error"
                  onClick={() => handleRemoveFromWatchlist(movie.movieID)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          // Message if watchlist is empty
          <Typography variant="body1">No movies in your watchlist.</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default MyPage;
