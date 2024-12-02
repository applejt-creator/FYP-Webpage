// src/components/Navbar.js
import React from 'react';
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
                <Button color="inherit" component={Link} to="/download">
                    Download
                </Button>

                {/* Role-based links */}
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
                        <Typography variant="h6" sx={{ marginLeft: 2 }}>
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
