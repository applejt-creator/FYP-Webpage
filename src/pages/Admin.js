import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';

function AdminPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            const usersCollection = collection(db, 'users');
            const userDocs = await getDocs(usersCollection);
            const userList = userDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setUsers(userList);
            setLoading(false);
        };

        fetchUsers();
    }, []);

    const handleSuspend = async (userId) => {
        try {
            const userDoc = doc(db, 'users', userId);
            await updateDoc(userDoc, { isSuspended: true });
            alert('User suspended successfully!');
        } catch (error) {
            console.error('Error suspending user:', error);
        }
    };

    const handleDelete = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                const userDoc = doc(db, 'users', userId);
                await deleteDoc(userDoc);
                setUsers(users.filter((user) => user.id !== userId));
                alert('User deleted successfully!');
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const handleChangePassword = async (email) => {
        try {
            await auth.sendPasswordResetEmail(email);
            alert('Password reset email sent successfully!');
        } catch (error) {
            console.error('Error sending password reset email:', error);
        }
    };

    if (loading) return <p>Loading users...</p>;

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <p>
                            <strong>Name:</strong> {user.name} <br />
                            <strong>Email:</strong> {user.email} <br />
                            <strong>Status:</strong> {user.isSuspended ? 'Suspended' : 'Active'}
                        </p>
                        <button
                            onClick={() => handleSuspend(user.id)}
                            disabled={user.isSuspended}
                        >
                            {user.isSuspended ? 'Already Suspended' : 'Suspend'}
                        </button>
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                        <button onClick={() => handleChangePassword(user.email)}>Reset Password</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminPage;
