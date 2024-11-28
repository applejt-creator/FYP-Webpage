// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar({ user, onLogout }) {
    return (
        <AppBar position="static">
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
                        <Button color="inherit" onClick={onLogout}>Logout</Button>
                    </>
                ) : (
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
