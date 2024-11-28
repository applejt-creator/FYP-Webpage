import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './App.css';


import Navbar from './components/NavBar';
import Login from './pages/Login';
import Upload from './pages/Upload';
import Video from './pages/Video';
import Testimonials from './pages/Testimonials';

function App() {
  const fetchData = async () => { 
    try {
      const response = await axios.get('http://localhost:5000');
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/video" element={<Video />} />
          <Route path="/testimonials" element={<Testimonials />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
