import * as React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import Landing from '../Landing';
import Search from '../Search';
import Review from '../Review';
import MyPage from '../MyPage';

const NavigationBar = () => {
  const navigate = useNavigate();
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#ef5350',
        boxShadow: 4,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'center',
          minHeight: '200px', 
        }}
      >
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Button
            id="nav-landing"
            sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}
            onClick={() => navigate('/')}
          >
            Landing
          </Button>
          <Button
            id="nav-search"
            sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}
            onClick={() => navigate('/Search')}
          >
            Search
          </Button>
          <Button
            id="nav-review"
            sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}
            onClick={() => navigate('/Review')}
          >
            Review
          </Button>
          <Button
            id="nav-myPage"
            sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}
            onClick={() => navigate('/MyPage')}
          >
            MyPage
          </Button>
        </Box>
      </Toolbar>
    </AppBar>

  );
}


const App = () => {


  return (
    
    <Router> 
      <div>
        <NavigationBar />
        <Box p={3}>
          <Routes>
            <Route path="/Search" element={<Search />} />
            <Route path="/Review" element={<Review />} />
            <Route path="/MyPage" element={<MyPage />} />
            <Route path="/" element={<Landing />} />
          </Routes>
        </Box>
      </div>
    </Router>
      
  );
}

export default App;
