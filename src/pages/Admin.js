import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase'; // Ensure Firebase is initialized properly
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { sendPasswordResetEmail } from 'firebase/auth'; // Import for sending password reset email

function AdminPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loadingAction, setLoadingAction] = useState(false); // State for managing action loading
    const [selectedUser, setSelectedUser] = useState(null); // Keep track of which user the admin is resetting the password for

    // Fetch users from Firestore
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersCollection = collection(db, 'users');
                const userDocs = await getDocs(usersCollection);
                const userList = userDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setUsers(userList);
                setLoading(false);
            } catch (error) {
                setError('Failed to load users.');
                console.error('Error fetching users:', error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Handle deleting a user
    const handleDelete = async (userId, email) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setLoadingAction(true);
            try {
                const userDoc = doc(db, 'users', userId);
                await deleteDoc(userDoc);

                const firebaseUser = await auth.getUserByEmail(email);
                await auth.deleteUser(firebaseUser.uid);

                setUsers(users.filter((user) => user.id !== userId));

                alert('User deleted successfully!');
            } catch (error) {
                console.error('Error deleting user:', error);
                setError('Failed to delete user.');
            } finally {
                setLoadingAction(false);
            }
        }
    };

    // Handle sending password reset email
    const handleResetPassword = async (email) => {
        setLoadingAction(true);
        try {
            await sendPasswordResetEmail(auth, email);
            alert('Password reset email sent successfully!');
        } catch (error) {
            console.error('Error sending password reset email:', error);
            setError('Failed to send password reset email.');
        } finally {
            setLoadingAction(false);
        }
    };

    // Loading state while fetching users
    if (loading) return <p>Loading users...</p>;

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Admin Dashboard</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul style={styles.list}>
                {users.map((user) => (
                    <li key={user.id} style={styles.card}>
                        <p>
                            <strong>Name:</strong> {user.name} <br />
                            <strong>Email:</strong> {user.email} <br />
                            <strong>Company:</strong> {user.company} <br />
                            <strong>Phone:</strong> {user.phone} <br />
                            <strong>Role:</strong> {user.role}
                        </p>
                        <button
                            onClick={() => handleDelete(user.id, user.email)}
                            disabled={loadingAction}
                            style={styles.actionButton}
                        >
                            {loadingAction ? 'Processing...' : 'Delete'}
                        </button>

                        <button onClick={() => setSelectedUser(user)} style={styles.actionButton}>
                            Reset Password
                        </button>

                        {selectedUser?.id === user.id && (
                            <div style={styles.resetPasswordForm}>
                                <button
                                    onClick={() => handleResetPassword(user.email)}
                                    disabled={loadingAction}
                                    style={styles.actionButton}
                                >
                                    {loadingAction ? 'Processing...' : 'Send Password Reset Email'}
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        maxWidth: '900px',
        margin: 'auto',
        fontFamily: 'Orbitron, sans-serif', // Futuristic gaming font
        background: 'radial-gradient(circle, #000000 50%, #0f0f10 100%)', // Glowing dark background
        color: '#fff', // White text for contrast
        borderRadius: '15px',
        boxShadow: '0 0 30px rgba(255, 0, 102, 0.6)', // Neon pink glowing shadow effect
        overflow: 'hidden',
        textAlign: 'center', // Center all content for a polished look
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '30px', // Slightly larger heading
        color: '#ff005c', // Neon pink for a striking heading
        textTransform: 'uppercase',
        textShadow: '0 0 15px #ff005c, 0 0 30px rgba(255, 0, 92, 0.5)', // Glowing text effect
    },
    list: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
    },
    card: {
        marginBottom: '15px',
        border: '2px solid rgba(255, 0, 102, 0.4)', // Neon pink border
        padding: '15px',
        borderRadius: '8px',
        backgroundColor: '#141414', // Dark card background
        boxShadow: '0 0 20px rgba(255, 0, 102, 0.6)', // Neon glow around each card
        transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth animations
        textAlign: 'left', // Left-align card content
    },
    actionButton: {
        margin: '5px',
        padding: '8px 15px', // Slightly larger padding for better usability
        backgroundColor: '#ff005c', // Neon pink button background
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: '14px',
        boxShadow: '0 0 10px rgba(255, 0, 92, 0.5)', // Glowing button effect
        transition: 'background-color 0.3s ease, transform 0.3s ease',
    },
    actionButtonHover: {
        backgroundColor: '#ff1e1e', // Transition to bright red on hover
        transform: 'scale(1.1)', // Slightly zoom in
        boxShadow: '0 0 15px rgba(255, 30, 30, 0.7)', // Bright glow on hover
    },
    actionButtonDisabled: {
        backgroundColor: '#333', // Muted dark gray for disabled state
        cursor: 'not-allowed',
        boxShadow: 'none', // No glow for disabled buttons
    },
    resetPasswordForm: {
        marginTop: '10px',
        padding: '15px',
        background: 'linear-gradient(135deg, #1a1a1a, #0f0f10)', // Subtle gradient for the form background
        borderRadius: '8px',
        boxShadow: '0 0 20px rgba(255, 0, 102, 0.5)', // Glowing form effect
    },
};

export default AdminPage;
