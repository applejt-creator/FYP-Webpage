// src/pages/Register.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Ensure Firestore and Auth are initialized properly
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('client');
    const [company, setCompany] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const validateForm = () => {
        if (!name.trim()) {
            setError('Name is required.');
            return false;
        }
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address.');
            return false;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            return false;
        }
        if (phone && !/^\d+$/.test(phone)) {
            setError('Phone number should only contain digits.');
            return false;
        }
        setError('');
        return true;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

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
            resetForm();
            navigate('/'); // Redirect to the desired page
        } catch (err) {
            setError(`Registration failed: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setRole('client');
        setCompany('');
        setPhone('');
    };

    return (
        <div style={styles.container}>
            <h2>Register</h2>
            <form onSubmit={handleRegister} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label>Role:</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        style={styles.input}
                    >
                        <option value="client">Client</option>
                        <option value="player">Player</option>
                    </select>
                </div>
                <div style={styles.inputGroup}>
                    <label>Company:</label>
                    <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label>Phone:</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <button type="submit" disabled={loading} style={styles.button}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
                {error && <p style={styles.error}>{error}</p>}
            </form>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
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

export default Register;
