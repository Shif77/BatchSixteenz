import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode }) => {
  return (
    <AppBar position="fixed" sx={{ background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(10px)' }}>
      <Toolbar>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ 
          textDecoration: 'none', 
          color: 'inherit',
          flexGrow: 1,
          fontWeight: 'bold'
        }}>
          NADIR ON THE GO
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button color="inherit" component={RouterLink} to="/directory">DIRECTORY</Button>
          <Button color="inherit" component={RouterLink} to="/events">EVENTS</Button>
          <Button color="inherit" component={RouterLink} to="/gallery">GALLERY</Button>
          <Button color="inherit" component={RouterLink} to="/forum">FORUM</Button>
          <Button color="inherit" component={RouterLink} to="/memoriam">MEMORIAM</Button>
          <Button color="inherit" component={RouterLink} to="/achievements">ACHIEVEMENTS</Button>
          {/* <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;