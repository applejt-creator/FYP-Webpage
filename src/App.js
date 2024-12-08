import React, { useEffect, useState } from 'react';
//src/App.js
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Upload from './pages/Upload';
import Video from './pages/Video';
import Testimonials from './pages/Testimonials';
import Download from './pages/Download';
import Admin from './pages/Admin';
import CircularProgress from '@mui/material/CircularProgress';

// Fetch user details from Firestore
async function fetchUserDetails(uid) {
  try {
    const userDoc = doc(db, 'users', uid);
    const userSnap = await getDoc(userDoc);

    if (userSnap.exists()) {
      return userSnap.data(); // Returns user details, including the role
    } else {
      console.error('User document not found in Firestore.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null;
  }
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const userDetails = await fetchUserDetails(authUser.uid);
        if (userDetails) {
          setUser({ ...authUser, ...userDetails });
        } else {
          auth.signOut(); // Log out if fetching user details fails
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription on component unmount
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20%' }}>
        <CircularProgress />
      </div>
    );
  }

  // Define routes dynamically
  const routes = [
    { path: '/', element: <h1>Welcome to the Project Website</h1> },
    { path: '/login', element: user ? <Navigate to="/" /> : <Login setUser={setUser} /> },
    { path: '/register', element: <Register /> },
    { path: '/video', element: <Video videoSrc="/videos/path-to-your-video.mp4" /> },
    { path: '/testimonials', element: <Testimonials /> },
    { path: '/download', element: <Download /> },
    { path: '/upload', element: user ? <Upload /> : <Navigate to="/login" /> },
    {
      path: '/admin',
      element: user && user.role === 'admin' ? <Admin /> : <Navigate to="/" />,
    },
    { path: '*', element: <h1>404: Page Not Found</h1> },
  ];

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
