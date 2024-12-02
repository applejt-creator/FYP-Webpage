// src/pages/Admin.js
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase'; // Ensure Firebase is initialized properly
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { sendPasswordResetEmail } from 'firebase/auth';  // Single import at the top

function AdminPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newPassword, setNewPassword] = useState(''); // State for new password input
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

    // Handle suspending a user
    const handleSuspend = async (userId, email) => {
        try {
            // Disable the user account in Firestore
            const userDoc = doc(db, 'users', userId);
            await updateDoc(userDoc, { isSuspended: true });

            // Optionally, disable the Firebase Authentication user
            const user = await auth.getUserByEmail(email);
            await auth.updateUser(user.uid, { disabled: true });

            alert('User suspended successfully!');
        } catch (error) {
            console.error('Error suspending user:', error);
            setError('Failed to suspend user.');
        }
    };

    // Handle deleting a user
    const handleDelete = async (userId, email) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                // Delete user from Firestore
                const userDoc = doc(db, 'users', userId);
                await deleteDoc(userDoc);

                // Delete user from Firebase Authentication
                const user = await auth.getUserByEmail(email);
                await auth.deleteUser(user.uid);

                // Refetch the users list after deletion
                setUsers(users.filter((user) => user.id !== userId));

                alert('User deleted successfully!');
            } catch (error) {
                console.error('Error deleting user:', error);
                setError('Failed to delete user.');
            }
        }
    };

    // Handle manually changing the user's password
    const handleChangePassword = async (userId, newPassword) => {
        try {
            // Get the Firebase user by email
            const user = await auth.getUserByEmail(userId);

            // Update password in Firebase Authentication
            await auth.updateUser(user.uid, {
                password: newPassword,
            });

            alert(`Password for ${user.email} has been successfully changed.`);
        } catch (error) {
            console.error('Error changing password:', error);
            setError('Failed to change password.');
        }
    };

    // Loading state while fetching users
    if (loading) return <p>Loading users...</p>;

    return (
        <div>
            <h1>Admin Dashboard</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <p>
                            <strong>Name:</strong> {user.name} <br />
                            <strong>Email:</strong> {user.email} <br />
                            <strong>Status:</strong> {user.isSuspended ? 'Suspended' : 'Active'}
                        </p>
                        <button
                            onClick={() => handleSuspend(user.id, user.email)}
                            disabled={user.isSuspended}
                        >
                            {user.isSuspended ? 'Already Suspended' : 'Suspend'}
                        </button>
                        <button onClick={() => handleDelete(user.id, user.email)}>Delete</button>

                        {/* Admin enters a new password */}
                        <button onClick={() => setSelectedUser(user)}>
                            Reset Password
                        </button>

                        {selectedUser?.id === user.id && (
                            <div>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter new password"
                                />
                                <button
                                    onClick={() => handleChangePassword(user.id, newPassword)}
                                    disabled={!newPassword}
                                >
                                    Change Password
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminPage;
