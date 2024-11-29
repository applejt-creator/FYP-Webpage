// src/App.js
import React, { useState } from 'react'; // Ensure this line is at the top
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Upload from './pages/Upload';
import Video from './pages/Video';
import Testimonials from './pages/Testimonials';
import Register from './pages/Register';
import Download from './pages/Download'; // Import the Download component

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
    console.log('User  logged out');
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<h1>Welcome to the Project Website</h1>} />
        <Route path="/login" element={user ? <h1>You are already logged in!</h1> : <Login setUser={setUser} />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/download" element={<Download />} /> {/* Add the Download route */}
        <Route path="/video" element={<Video videoSrc="/videos/path-to-your-video.mp4" />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App; // Ensure this line is at the end of the file