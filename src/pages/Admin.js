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
        setLoadingAction(true); // Set loading action state
        try {
            // Update the user's suspension status in Firestore
            const userDoc = doc(db, 'users', userId);
            await updateDoc(userDoc, { isSuspended: !isSuspended });

            // Optionally, disable or enable the Firebase Authentication user
            const firebaseUser = await auth.getUserByEmail(email);
            await auth.updateUser(firebaseUser.uid, { disabled: !isSuspended });

            // Update the user in the state to reflect the change immediately
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === userId ? { ...user, isSuspended: !isSuspended } : user
                )
            );

            alert(isSuspended ? 'User unsuspended successfully!' : 'User suspended successfully!');
        } catch (error) {
            console.error('Error toggling suspension status:', error);
            setError('Failed to update user suspension status.');
        } finally {
            setLoadingAction(false); // Reset loading state
        }
    };

    // Handle deleting a user
    const handleDelete = async (userId, email) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setLoadingAction(true); // Set loading action state
            try {
                // Delete user from Firestore
                const userDoc = doc(db, 'users', userId);
                await deleteDoc(userDoc);

                // Delete user from Firebase Authentication
                const firebaseUser = await auth.getUserByEmail(email);
                await auth.deleteUser(firebaseUser.uid);

                // Refetch the users list after deletion
                setUsers(users.filter((user) => user.id !== userId));

                alert('User deleted successfully!');
            } catch (error) {
                console.error('Error deleting user:', error);
                setError('Failed to delete user.');
            } finally {
                setLoadingAction(false); // Reset loading state
            }
        }
    };

    // Handle sending password reset email
    const handleResetPassword = async (email) => {
        setLoadingAction(true); // Set loading action state
        try {
            await sendPasswordResetEmail(auth, email);
            alert('Password reset email sent successfully!');
        } catch (error) {
            console.error('Error sending password reset email:', error);
            setError('Failed to send password reset email.');
        } finally {
            setLoadingAction(false); // Reset loading state
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
                            onClick={() => handleSuspendToggle(user.id, user.email, user.isSuspended)}
                            disabled={loadingAction}
                        >
                            {loadingAction
                                ? 'Processing...'
                                : user.isSuspended
                                    ? 'Unsuspend'
                                    : 'Suspend'}
                        </button>
                        <button
                            onClick={() => handleDelete(user.id, user.email)}
                            disabled={loadingAction}
                        >
                            {loadingAction ? 'Processing...' : 'Delete'}
                        </button>

                        {/* Admin enters a new password */}
                        <button onClick={() => setSelectedUser(user)}>
                            Reset Password
                        </button>

                        {selectedUser?.id === user.id && (
                            <div>
                                <button
                                    onClick={() => handleResetPassword(user.email)}
                                    disabled={loadingAction}
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

export default AdminPage;
