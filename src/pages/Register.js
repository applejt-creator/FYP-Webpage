import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Ensure Firestore and Auth are initialized properly

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('client'); // Default role (can be dynamic if needed)
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setError('');
        setLoading(true); // Set loading state to true

        try {
            // Step 1: Register user with Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Step 2: Save user role in Firestore
            const userDoc = doc(db, 'users', user.uid); // Create a document in 'users' collection
            await setDoc(userDoc, {
                email: user.email,
                role: role, // Role, e.g., 'client' or 'player'
            });

            alert('Account created successfully with role: ' + role);
            setEmail(''); // Clear email field
            setPassword(''); // Clear password field
        } catch (error) {
            setError(error.message); // Display error message
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
                <div>
                    <label>Role:</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="client">Client</option>
                        <option value="player">Player</option>
                    </select>
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
