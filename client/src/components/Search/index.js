import * as React from 'react';
import { Typography, Box, TextField, Button } from '@mui/material';

const Search = () => {

  // States for values entered in the text field
  const [movieTitleSearch, setmovieTitleSearch] = React.useState('')
  const [actorSearch, setActorSearch] = React.useState('')
  const [directorName, setDirectorName] = React.useState('')

  const [results, setResults] = React.useState([]);
  const [error, setError] = React.useState('');

  const handleChange1 = (event) => {
    setmovieTitleSearch(event.target.value)
  };

  const handleChange2 = (event) => {
    setActorSearch(event.target.value)
  };

  const handleChange3 = (event) => {
    setDirectorName(event.target.value)
  };

  const handleSearch = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (movieTitleSearch) queryParams.append('title', movieTitleSearch);
      if (actorSearch) queryParams.append('actor', actorSearch);
      if (directorName) queryParams.append('director', directorName);

      const response = await fetch(`/api/search?${queryParams.toString()}`);
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Error fetching results');

      setResults(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Something went wrong');
      setResults([]);
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
      
      </Box> 

    </div>
  );
}

export default Search;
