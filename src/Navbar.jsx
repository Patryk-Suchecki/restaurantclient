import React from 'react';
import { Link } from 'react-router-dom';
import { Box, AppBar, Typography, Toolbar, IconButton, Menu, MenuItem, Button } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon onClick={handleClick}/>
          </IconButton>
            <Menu
        id="menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
                  <MenuItem onClick={handleClose}><Typography variant='h5'><Link to="/">Strona główna</Link></Typography></MenuItem>
        {isAuthenticated ? (
          <>
            <MenuItem><Typography variant="h5"><Link to="/own">Moje restauracje</Link></Typography></MenuItem>
              <MenuItem><Button variant="outlined" size="small" onClick={onLogout}>Wyloguj</Button></MenuItem>
              
          </>
        ) : (
          <>
              <MenuItem onClick={handleClose}><Typography variant='h5'><Link to="/login">Logowanie</Link></Typography></MenuItem>
              <MenuItem onClick={handleClose}><Typography variant='h5'><Link to="/register">Rejestracja</Link></Typography></MenuItem>
          </>
        )}
      </Menu>
      <Typography variant="h5">RestaurantAPI</Typography>
        </Toolbar>
        
    </AppBar>

    </Box>
  );
};

export default Navbar;
