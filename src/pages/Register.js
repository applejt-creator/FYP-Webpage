// src/pages/Register.js
import React, { useState } from 'react';
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
    // Container Styles (Red Gaming Theme)
    container: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '30px',
        fontFamily: 'Orbitron, sans-serif', // Futuristic font
        textAlign: 'center',
        border: '2px solid #ff4d4d', // Neon red border
        borderRadius: '15px',
        backgroundColor: '#1a1a1a', // Dark background for contrast
        boxShadow: '0 8px 15px rgba(255, 0, 0, 0.3)', // Glowing neon red effect
        transition: 'all 0.3s ease', // Smooth transition for hover effects
    },

    // Header Styles (Red Neon Glow)
    header: {
        color: '#ff4d4d', // Neon red text for header
        fontSize: '32px', // Larger font size for visibility
        fontWeight: '700',
        marginBottom: '20px',
        textShadow: '0 0 15px rgba(255, 77, 77, 0.8)', // Glowing text-shadow effect
    },

    // Form Styles
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px', // Increase space between form elements
    },

    // Input Group Styles
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
    },

    // Input Field Styles
    input: {
        padding: '12px',
        fontSize: '16px',
        border: '2px solid #ff4d4d', // Neon red border for inputs
        borderRadius: '8px', // Rounded input fields
        backgroundColor: '#2a2a2a', // Dark input field background
        color: '#fff',
        outline: 'none',
        transition: 'border-color 0.3s, box-shadow 0.3s ease',
    },

    // Input Focus Effect (Neon Red Glow)
    inputFocus: {
        borderColor: '#ff4d4d', // Red border when focused
        boxShadow: '0 0 8px rgba(255, 77, 77, 0.8)', // Glowing effect on focus
    },

    // Button Styles (Futuristic Red Gradient)
    button: {
        padding: '12px',
        fontSize: '18px',
        color: '#fff',
        backgroundColor: 'linear-gradient(90deg, #ff4d4d, #ff0033)', // Red gradient background for the button
        border: 'none',
        borderRadius: '8px', // Rounded corners for the button
        cursor: 'pointer',
        transition: 'transform 0.3s, box-shadow 0.3s ease',
    },

    // Button Hover Effect (Glow and Scaling)
    buttonHover: {
        transform: 'scale(1.05)', // Slight zoom-in effect on hover
        boxShadow: '0 0 15px rgba(255, 0, 0, 0.7)', // Glowing effect around button
    },

    // Error Message Styles (Neon Red Glow)
    error: {
        marginTop: '15px',
        color: '#ff6666', // Lighter neon red for error messages
        fontSize: '14px',
        textShadow: '0 0 10px rgba(255, 102, 102, 0.8)', // Glow effect for error message
    },

    // Disabled Button Style (Dimmed Appearance)
    buttonDisabled: {
        backgroundColor: '#444',
        color: '#999',
        cursor: 'not-allowed',
    }
};

export default Register;
