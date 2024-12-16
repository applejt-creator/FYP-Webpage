import React, { useEffect, useState } from 'react';
import './App.css';
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
    {
      path: '/',
      element: (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h1>Welcome to Gaming with Barehands</h1>
          <p style={{ marginTop: '20px', fontSize: '18px', lineHeight: '1.5' }}>
            Gaming with Barehands is a cutting-edge project that leverages machine learning and
            computer vision to recognize hand gestures and provide an immersive gaming experience.
            Our goal is to redefine how users interact with games by eliminating the need for traditional controllers.
            <br />
            Join us in creating a world where hand gestures are no longer just a game mechanic, but a powerful tool for expressing emotions and interacting with others.
            <br />
            <br />
            <a href="https://github.com/applejt-creator/FYP-Webpage.git" className="github-link">GitHub website Repository</a>
            <a href="https://github.com/AksAlexTyd/FYP-HandGestureRecognition.git" className="github-link">GitHub Gesture Motion Repository</a>
            <a href="https://github.com/P4ndemonium/FYP_Game.git" className="github-link">GitHub Unity Game Repository</a>
          </p>
          <h2 style={{ marginTop: '40px' }}>Meet the Team</h2>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '30px', marginTop: '20px' }}>
            <div style={{ textAlign: 'center', width: '200px' }}>
              <img
                src="/pictures/member1.jpg"
                alt="Aw Boon Fong"
                style={{ width: '150px', height: '150px', borderRadius: '50%' }}
              />
              <h3>Aw Boon Fong</h3>
              <p>Developer for project website backend</p>
            </div>
            <div style={{ textAlign: 'center', width: '200px' }}>
              <img
                src="/pictures/member2.jpg"
                alt="Ephraim Chang Enlin"
                style={{ width: '150px', height: '150px', borderRadius: '50%' }}
              />
              <h3>Ephraim Chang Enlin</h3>
              <p>Documentation</p>
            </div>
            <div style={{ textAlign: 'center', width: '200px' }}>
              <img
                src="/pictures/member3.jpg"
                alt="Muhammad Faiz Bin Johari"
                style={{ width: '150px', height: '150px', borderRadius: '50%' }}
              />
              <h3>Muhammad Faiz Bin Johari</h3>
              <p>Developer for input system and game</p>
            </div>
            <div style={{ textAlign: 'center', width: '200px' }}>
              <img
                src="/pictures/member4.jpg"
                alt="Tan Jun Han, Jasper"
                style={{ width: '150px', height: '150px', borderRadius: '50%' }}
              />
              <h3>Tan Jun Han, Jasper</h3>
              <p>Developer for project website frontend, partial backend, and project game</p>
            </div>
            <div style={{ textAlign: 'center', width: '200px' }}>
              <img
                src="/pictures/member5.jpg"
                alt="Simiyon Raju Aroharrison"
                style={{ width: '150px', height: '150px', borderRadius: '50%' }}
              />
              <h3>Simiyon Raju Aroharrison</h3>
              <p>Developer for project website CSS </p>
            </div>
            <div style={{ textAlign: 'center', width: '200px' }}>
              <img
                src="/pictures/member6.jpg"
                alt="Aung Kyaw Saw"
                style={{ width: '150px', height: '150px', borderRadius: '50%' }}
              />
              <h3>Aung Kyaw Saw</h3>
              <p>Developer for Gesture Motion</p>
            </div>
            <div style={{ textAlign: 'center', width: '200px' }}>
            </div>
          </div>
        </div>
      ),
    },
    { path: '/login', element: user ? <Navigate to="/" /> : <Login setUser={setUser} /> },
    { path: '/register', element: user ? <Navigate to="/" /> : <Register setUser={setUser} /> },
    { path: '/upload', element: user ? <Upload /> : <Navigate to="/login" /> },
    { path: '/video', element: user ? <Video /> : <Navigate to="/login" /> },
    { path: '/testimonials', element: user ? <Testimonials /> : <Navigate to="/login" /> },
    { path: '/download', element: user ? <Download /> : <Navigate to="/login" /> },
    { path: '/admin', element: user && user.role === 'admin' ? <Admin /> : <Navigate to="/" /> },
    { path: '*', element: <Navigate to="/" /> },
  ];

  return (
    <Router>
      <Navbar user={user} handleLogout={handleLogout} />
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
