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
import Reports from './pages/Reports';
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
            We are passionate about creating a world where hand gestures are no longer just a game mechanic, but a powerful tool for expressing emotions and interacting with others.
            our moto is "Gaming with bare hands, the future is here".
            we are a open source project that supports group of developers who are working on this project.
            we would like to invite clients and developers to join the project and contribute to the development of this project to make gesture recognition more accessible and user-friendly.
            we would appereciate your support and contribution to this project.
            <br />
            Join us in creating a world where hand gestures are no longer just a game mechanic, but a powerful tool for expressing emotions and interacting with others.
          </p>

          {/* What the website offers */}
          <h2 style={{ marginTop: '40px' }}>What Can You Do Here?</h2>
          <ul style={{ textAlign: 'left', display: 'inline-block', marginTop: '20px', fontSize: '18px' }}>
            <li><strong>Explore the Latest Technologies:</strong> Learn about how hand gesture recognition works using machine learning and computer vision.</li>
            <li><strong>Download Our Software:</strong> Access free demo software for gesture recognition and test it with our simple games.</li>
            <li><strong>Upload Your Content:</strong> Clients can upload their games or gesture software to integrate with our recognition system.</li>
            <li><strong>Watch Demonstration Videos:</strong> View videos showcasing gesture recognition in action.</li>
            <li><strong>Testimonials:</strong> Read experiences from players, developers, and clients using our platform.</li>
            <li><strong>Stay Updated:</strong> Access research, documentation, and news about the project.</li>
          </ul>

          {/* Access Information */}
          <h2 style={{ marginTop: '40px' }}>For Players</h2>
          <p style={{ marginTop: '10px', fontSize: '18px' }}>
            - Download hand-gesture demo games for a new gaming experience.<br />
            - View installation guides for software and games.<br />
            - Watch videos to learn how gestures work and try them in our games.<br />
            - Share your feedback and suggestions to improve our system.
          </p>

          <h2 style={{ marginTop: '40px' }}>For Clients and Developers</h2>
          <p style={{ marginTop: '10px', fontSize: '18px' }}>
            - Upload custom-built games or gesture software to test integrations.<br />
            - Access detailed installation and troubleshooting guides.<br />
            - Collaborate with us to enhance hand-gesture recognition systems.<br />
            - Contribute to our open-source repositories for further innovation.
          </p>

          {/* Download Center */}
          <h2 style={{ marginTop: '40px' }}>Download Center</h2>
          <ul style={{ textAlign: 'left', display: 'inline-block', marginTop: '20px', fontSize: '18px' }}>
            <li><strong>Hand Gesture Recognition Software:</strong> Experience our hand gesture recognition technology.</li>
            <li><strong>Demo Games:</strong> Play gesture-enabled demo games.</li>
            <li><strong>Installation Guides:</strong> Step-by-step instructions for software and games.</li>
          </ul>

          {/* Upload Center */}
          <h2 style={{ marginTop: '40px' }}>Upload Center</h2>
          <p style={{ marginTop: '10px', fontSize: '18px' }}>
            Clients can upload games and improved gesture software for testing and collaboration.<br />
            <strong>Supported Content:</strong> .exe files, ML models, and relevant software documentation.
          </p>
          <a href="https://github.com/applejt-creator/FYP-Webpage.git" className="github-link">GitHub website Repository</a>
          <a href="https://github.com/AksAlexTyd/FYP-HandGestureRecognition.git" className="github-link">GitHub Gesture Motion Repository</a>
          <a href="https://github.com/P4ndemonium/FYP_Game.git" className="github-link">GitHub Unity Game Repository</a>
          {/* Meet the Team */}
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
              <p>Documentation Lead</p>
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
              <p>Developer for project website frontend, and game design</p>
            </div>
            <div style={{ textAlign: 'center', width: '200px' }}>
              <img
                src="/pictures/member5.jpg"
                alt="Simiyon Raju Aroharrison"
                style={{ width: '150px', height: '150px', borderRadius: '50%' }}
              />
              <h3>Simiyon Raju Aroharrison</h3>
              <p>Developer for website frontend style, assist documentation</p>
            </div>
            <div style={{ textAlign: 'center', width: '200px' }}>
              <img
                src="/pictures/member6.jpg"
                alt="Aung Kyaw Saw"
                style={{ width: '150px', height: '150px', borderRadius: '50%' }}
              />
              <h3>Aung Kyaw Saw</h3>
              <p>Developer for hand gesture recognition, Model training

</p>
            </div>
          </div>

          {/* Feedback and Support */}
          <h2 style={{ marginTop: '40px' }}>Feedback & Support</h2>
          <p style={{ marginTop: '10px', fontSize: '18px' }}>
            - Have questions, feedback, or issues? Let us know!<br />
            - Explore our <strong>Testimonials</strong> for common questions, troubleshooting tips and feedbacks.<br />
            - <strong>Contact Us:</strong> support@gamingwithbarehands.com
          </p>
        </div>
      ),
    },    
    { path: '/login', element: user ? <Navigate to="/" /> : <Login setUser={setUser} /> },
    { path: '/register', element: user ? <Navigate to="/" /> : <Register setUser={setUser} /> },
    { path: '/upload', element: user ? <Upload /> : <Navigate to="/login" /> },
    { path: '/video', element: <Video /> }, // Accessible to all users
    { path: '/testimonials', element: <Testimonials /> }, // Accessible to all users
    { path: '/reports', element: <Reports /> }, 
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
