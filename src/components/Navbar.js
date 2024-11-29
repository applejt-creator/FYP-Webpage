// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { getAuth, signOut } from 'firebase/auth';

function Navbar({ user, onLogout }) {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleLogout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            onLogout(); // Call the onLogout callback passed as a prop
            navigate('/'); // Redirect to the main page after logout
        } catch (error) {
            console.error("Logout failed: ", error); // Log error if logout fails
        }
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Project Website
                    </Link>
                </Typography>
                {/* Links available for all users */}
                <Button color="inherit" component={Link} to="/video">
                    Videos
                </Button>
                <Button color="inherit" component={Link} to="/testimonials">
                    Testimonials
                </Button>
                <Button color="inherit" component={Link} to="/download"> {/* Add this line for Download page */}
                    Download
                </Button>
                {user ? (
                    <>
                        <Button color="inherit" component={Link} to="/upload">
                            Upload App
                        </Button>
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/login">
                            Login
                        </Button>
                        <Button color="inherit" component={Link} to="/register">
                            Register
                        </Button>
                    </>
                )}
                {user && (
                    <Typography variant="h6" sx={{ marginLeft: 2 }}>
                        Welcome, {user.name}
                    </Typography>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;