// src/pages/Register.js
import React, { useState } from 'react';
import { auth } from '../firebase'; // Ensure auth is properly initialized
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Correct function name


function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        setError('');
        setLoading(true); // Set loading state to true

        try {
            // Create a new user with email and password
            await createUserWithEmailAndPassword(auth, email, password); // Corrected function call
            alert('Account created successfully!');
        } catch (error) {
            setError(error.message); // Set the error message if registration fails
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Register'}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}

export default Register;
