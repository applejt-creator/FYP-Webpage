// src/pages/Login.js
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function Login({ setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        // Basic input validation
        if (!email || !validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        if (!password || password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }

        setLoading(true);
        const auth = getAuth();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user); // Update user state in parent
        } catch (error) {
            // Extract Firebase error messages
            let errorMessage = 'Login failed: ' + (error.code || error.message);
            if (error.code === 'auth/user-not-found') {
                errorMessage = 'No user found with this email.';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Incorrect password.';
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage = 'Too many attempts. Please try again later.';
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Login</h2>
            <form onSubmit={handleLogin} style={styles.form}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    required
                />
                <button type="submit" disabled={loading} style={styles.button}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            {error && <p style={styles.error}>{error}</p>}
        </div>
    );
}

const styles = {
    // Container Styles (Red Gaming Theme)
    container: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '30px',
        fontFamily: 'Orbitron, sans-serif', // Futuristic font for a modern gaming feel
        textAlign: 'center',
        border: '1px solid #ff4d4d', // Neon red border
        borderRadius: '15px', // Rounded corners for a clean, modern look
        backgroundColor: '#1a1a1a', // Dark background to enhance neon elements
        boxShadow: '0 8px 15px rgba(255, 0, 0, 0.3)', // Neon red glow effect
        transition: 'all 0.3s ease', // Smooth transition for hover effects
    },

    // Header Styles (Red Neon Glow)
    header: {
        color: '#ff4d4d', // Neon red text for header
        fontSize: '32px', // Slightly larger text for the header
        fontWeight: '700',
        marginBottom: '20px',
        textShadow: '0 0 15px rgba(255, 77, 77, 0.8)', // Glowing text-shadow effect
    },

    // Form Styles
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px', // Increase gap between form elements for a spacious feel
    },

    // Input Field Styles (Futuristic Red)
    input: {
        padding: '12px',
        fontSize: '16px',
        border: '2px solid #ff4d4d', // Red border for input fields
        borderRadius: '8px', // Rounded input fields
        backgroundColor: '#2a2a2a', // Dark input field background
        color: '#fff',
        outline: 'none',
        transition: 'border-color 0.3s, box-shadow 0.3s',
    },

    // Input Focus Styles (Neon Red Glow on Focus)
    inputFocus: {
        borderColor: '#ff4d4d', // Red border when focused
        boxShadow: '0 0 8px rgba(255, 77, 77, 0.8)', // Glowing effect when focused
    },

    // Button Styles (Futuristic Red and Blue Gradient)
    button: {
        padding: '12px',
        fontSize: '18px',
        color: '#fff',
        backgroundColor: 'linear-gradient(90deg, #ff4d4d, #ff0033)', // Red gradient for button
        border: 'none',
        borderRadius: '8px', // Rounded button
        cursor: 'pointer',
        transition: 'transform 0.3s, box-shadow 0.3s ease',
    },

    // Button Hover Effect (Glow and Scaling)
    buttonHover: {
        transform: 'scale(1.05)', // Slight zoom-in effect
        boxShadow: '0 0 15px rgba(255, 0, 0, 0.7)', // Glowing red effect on hover
    },

    // Error Message Styles (Neon Red Glow)
    error: {
        marginTop: '15px',
        color: '#ff6666', // Lighter neon red for error messages
        fontSize: '14px',
        textShadow: '0 0 10px rgba(255, 102, 102, 0.8)', // Glow effect on error message
    },

    // Disabled Button Style (Dimmed Appearance)
    buttonDisabled: {
        backgroundColor: '#444',
        color: '#999',
        cursor: 'not-allowed',
    }
};

export default Login;
