// src/pages/Admin.js
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

    // Handle suspending or unsuspending a user
    const handleSuspendToggle = async (userId, email, isSuspended) => {
        setLoadingAction(true);
        try {
            const userDoc = doc(db, 'users', userId);
            await updateDoc(userDoc, { isSuspended: !isSuspended });

            const firebaseUser = await auth.getUserByEmail(email);
            await auth.updateUser(firebaseUser.uid, { disabled: !isSuspended });

            setUsers((prevUsers) =>
                prevUsers.map((user) => (user.id === userId ? { ...user, isSuspended: !isSuspended } : user))
            );

            alert(isSuspended ? 'User unsuspended successfully!' : 'User suspended successfully!');
        } catch (error) {
            console.error('Error toggling suspension status:', error);
            setError('Failed to update user suspension status.');
        } finally {
            setLoadingAction(false);
        }
    };

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
        <div>
            <h1>Admin Dashboard</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {users.map((user) => (
                    <li key={user.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
                        <p>
                            <strong>Name:</strong> {user.name} <br />
                            <strong>Email:</strong> {user.email} <br />
                            <strong>Status:</strong> {user.isSuspended ? 'Suspended' : 'Active'}
                        </p>
                        <button
                            onClick={() => handleSuspendToggle(user.id, user.email, user.isSuspended)}
                            disabled={loadingAction}
                            style={styles.actionButton}
                        >
                            {loadingAction ? 'Processing...' : user.isSuspended ? 'Unsuspend' : 'Suspend'}
                        </button>
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
        fontFamily: 'Orbitron, sans-serif', // Futuristic font for the gaming theme
        background: 'radial-gradient(circle, #000000 50%, #0f0f10 100%)', // Glowing dark background
        color: '#fff', // White text
        borderRadius: '15px',
        boxShadow: '0 0 30px rgba(255, 0, 102, 0.6)', // Glowing shadow effect
        overflow: 'hidden',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '30px', // Slightly larger heading
        color: '#ff005c', // Neon pink color
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
        backgroundColor: '#141414', // Dark background for each card
        boxShadow: '0 0 20px rgba(255, 0, 102, 0.6)', // Glowing effect around each card
        transition: 'transform 0.3s, box-shadow 0.3s',
    },
    actionButton: {
        margin: '5px',
        padding: '5px 10px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    actionButtonDisabled: {
        backgroundColor: '#ddd',
        cursor: 'not-allowed',
    },
    resetPasswordForm: {
        marginTop: '10px',
    }
};

export default AdminPage;
