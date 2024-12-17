// src/components/Navbar.js
import React from 'react';
import './Navbar.css';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

function Navbar({ user, onLogout }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            onLogout();
            navigate('/'); // Redirect to home page
        } catch (error) {
            console.error("Logout failed: ", error);
        }
    };

    return (
        <AppBar position="static" className="gaming-navbar">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }} className="gaming-welcome">
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Home
                    </Link>
                </Typography>
                {/* Links available for all users */}
                <Button color="inherit" component={Link} to="/video">
                    Videos
                </Button>
                <Button color="inherit" component={Link} to="/testimonials">
                    Testimonials
                </Button>

                {/* Conditional rendering for "Download" button */}
                {(user && (user.role === 'admin' || user.role === 'client' || user.role === 'player')) && (
                    <Button color="inherit" component={Link} to="/download">
                        Download
                    </Button>
                )}

                {/* Conditional rendering based on user authentication */}
                {user ? (
                    <>
                        {/* Show 'Upload App' for admin and client only */}
                        {(user.role === 'admin' || user.role === 'client') && (
                            <Button color="inherit" component={Link} to="/upload">
                                Upload App
                            </Button>
                        )}

                        {/* Admin only link */}
                        {user.role === 'admin' && (
                            <Button color="inherit" component={Link} to="/admin">
                                Admin Panel
                            </Button>
                        )}

                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                        <Typography variant="h6" sx={{ marginLeft: 2 }} className="gaming-welcome">
                            Welcome, {user.name || user.email}
                        </Typography>
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
            </Toolbar>
        </AppBar>
    );

}

export default Navbar;
