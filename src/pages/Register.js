// src/pages/Register.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Ensure Firestore and Auth are initialized properly
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { user } from '../accountEntity';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('client');
    const [company, setCompany] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setError('');
        setLoading(true);

        try {
            // Step 1: Register user with Firebase Authentication
            // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // const user = userCredential.user;

            // // Step 2: Save user details in Firestore
            // const userDoc = doc(db, 'users', user.uid); // Create a document in 'users' collection
            // await setDoc(userDoc, {
            //     name: name,
            //     email: user.email,
            //     role: role, // Role, e.g., 'client' or 'player'
            //     company: company,
            //     phone: phone,
            // });

            user.createUser(email, password, role, company, phone, name)

            alert(`Account created successfully with role: ${role}`);
            // Reset form fields
            setName('');
            setEmail('');
            setPassword('');
            setRole('client');
            setCompany('');
            setPhone('');

            // Redirect to the main page after successful registration
            navigate('/'); // Navigate to home page (or the desired page)
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
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
                <div>
                    <label>Company:</label>
                    <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}

export default Register;
