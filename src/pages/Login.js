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
    container: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
    },
    header: {
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    button: {
        padding: '10px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#007BFF',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    error: {
        marginTop: '10px',
        color: 'red',
        fontSize: '14px',
    },
};

export default Login;
