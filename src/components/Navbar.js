// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

function Navbar({ user, onLogout }) {
    const handleLogout = () => {
      const auth = getAuth();
      signOut(auth).then(() => {
        onLogout();  // Call the onLogout callback passed as a prop
      });
    };

    return (
        <AppBar position="static">
            <nav>
      <h1>Welcome, {user.name}</h1>
      <button onClick={handleLogout}>Logout</button>
    </nav>
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Project Website
                </Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                {user ? (
                    <>
                        <Button color="inherit" component={Link} to="/upload">Upload App</Button>
                        <Button color="inherit" component={Link} to="/video">Videos</Button>
                        <Button color="inherit" component={Link} to="/testimonials">Testimonials</Button>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </>
                ) : (
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
