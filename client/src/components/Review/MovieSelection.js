import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const MovieSelection = (props) => {

  //states declarations
  //constants and functions declarations
  const handleChange = (event) => {
    props.setSelectedMovie(event.target.value)
    props.setMovieError('')
  }

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="movie-select-label">Select your movie</InputLabel>
      <Select
        labelId="movie-select-label"
        id="movie-select"
        value={props.selectedMovie}
        label="Select your movie"
        onChange={handleChange}
      >
        {props.movies.map((movie, index) =>
          <MenuItem key={movie.id} value={movie}>{movie.name}</MenuItem>
        )}
      </Select>
    </FormControl>
  );
}

export default MovieSelection;

