import React, { useEffect, useState } from 'react'; // React imports
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Router imports
import { onAuthStateChanged } from 'firebase/auth'; // Firebase authentication
import { doc, getDoc } from 'firebase/firestore'; // Firestore
import { auth, db } from './firebase'; // Your Firebase configuration
import Navbar from './components/Navbar'; // Components
import Login from './pages/Login';
import Register from './pages/Register';
import Upload from './pages/Upload';
import Video from './pages/Video';
import Testimonials from './pages/Testimonials';
import Download from './pages/Download';
import Admin from './pages/Admin'; // Admin page

// Fetch user details from Firestore
async function fetchUserDetails(uid) {
  const userDoc = doc(db, 'users', uid);
  const userSnap = await getDoc(userDoc);

  if (userSnap.exists()) {
    return userSnap.data(); // Returns user details, including the role
  } else {
    console.error('User document not found in Firestore.');
    return null;
  }
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const userDetails = await fetchUserDetails(authUser.uid);
        if (userDetails) {
          // Add role info to the user object (e.g., admin or player)
          setUser({ ...authUser, ...userDetails });
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<h1>Welcome to the Project Website</h1>} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/video" element={<Video videoSrc="/videos/path-to-your-video.mp4" />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/download" element={<Download />} />
        <Route path="/upload" element={user ? <Upload /> : <Navigate to="/login" />} />

        {/* Admin Route - Only accessible by admin users */}
        <Route
          path="/admin"
          element={user && user.role === 'admin' ? <Admin /> : <Navigate to="/" />}
        />

        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
