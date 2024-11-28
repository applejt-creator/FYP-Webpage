import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Assuming Navbar is in components folder
import Login from './pages/Login';
import Upload from './pages/Upload';
import Video from './pages/Video';
import Testimonials from './pages/Testimonials';

function App() {
    const [user, setUser] = useState(null); // Maintain user login state

    const handleLogout = () => {
        setUser(null); // Clear user state on logout
        console.log('User logged out');
    };

    return (
        <Router>
            <Navbar user={user} onLogout={handleLogout} />
            <div>
                <Routes>
                    <Route path="/" element={<h1>Welcome to the Project Website</h1>} />
                    <Route path="/login" element={<Login setUser={setUser} />} />
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/video" element={<Video />} />
                    <Route path="/testimonials" element={<Testimonials />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
