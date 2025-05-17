import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode }) => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ 
          textDecoration: 'none', 
          color: 'inherit',
          flexGrow: 1 
        }}>
          Batch 16
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button color="inherit" component={RouterLink} to="/directory">Directory</Button>
          <Button color="inherit" component={RouterLink} to="/events">Events</Button>
          <Button color="inherit" component={RouterLink} to="/gallery">Gallery</Button>
          <Button color="inherit" component={RouterLink} to="/forum">Forum</Button>
          <Button color="inherit" component={RouterLink} to="/memoriam">Memoriam</Button>
          <Button color="inherit" component={RouterLink} to="/achievements">Achievements</Button>
          <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;