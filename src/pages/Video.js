// src/pages/Video.js
import React from 'react';

function Video({ videoSrc }) {
    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Video Showcase</h2>
            <video controls style={styles.video}>
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <p style={styles.errorMessage}>If the video does not load, please check your connection or try a different browser.</p>
        </div>
    );
}

const styles = {
     // Container Styles (Red Gaming Theme)
  container: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#1a1a1a', // Dark background to make neon colors pop
    borderRadius: '15px', // Rounded corners for a modern feel
    boxShadow: '0 0 20px rgba(255, 0, 0, 0.5)', // Neon red glow effect
    transition: 'all 0.3s ease', // Smooth transition for hover effects
    overflow: 'hidden', // To ensure content stays within rounded corners
  },

  // Heading Styles (Red Neon Glow)
  heading: {
    fontSize: '40px', // Larger text for visibility
    marginBottom: '30px',
    color: '#ff4d4d', // Neon red for heading
    fontWeight: '700',
    textShadow: '0 0 20px rgba(255, 77, 77, 0.9)', // Strong glowing red effect
    letterSpacing: '1.5px', // Slight letter-spacing for a clean look
    transition: 'color 0.3s, text-shadow 0.3s', // Smooth transition on hover
  },

  // Video Styles (Modern and sleek)
  video: {
    width: '100%',
    maxWidth: '800px', // Slightly larger video container for better viewing
    margin: '20px auto',
    borderRadius: '15px', // Rounded corners for a sleek look
    boxShadow: '0 8px 20px rgba(255, 0, 0, 0.6)', // Glowing red effect around the video
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease',
  },

  // Error Message Styles (Neon Red glow)
  errorMessage: {
    marginTop: '15px',
    fontSize: '18px',
    color: '#ff6666', // Lighter neon red for error messages
    textShadow: '0 0 12px rgba(255, 102, 102, 1)', // Glow effect for error message
    letterSpacing: '1px', // Subtle letter-spacing for readability
    transition: 'color 0.3s, text-shadow 0.3s', // Smooth transition for glow effect
  },

  // Hover effect for container (Pulse effect in red)
  containerHover: {
    '&:hover': {
      boxShadow: '0 100px 20px rgba(255, 0, 0, 1)', // Stronger red glow on hover
      transform: 'scale(1.05)', // Slight zoom-in effect for a modern touch
    }
  },

  // Video Hover Effect (Glowing and smooth scaling)
  videoHover: {
    '&:hover': {
      transform: 'scale(1.1)', // Slight zoom-in effect on hover
      boxShadow: '0 8px 30px rgba(255, 0, 92, 0.8), inset 0 0 15px rgba(0, 0, 0, 0.8)', // Stronger glowing effect
      filter: 'brightness(1.3)', // Adds brightness effect when hovering
    }
  },

  // Additional Hover Effects for Heading, Error Message, and Video (Neon Glow Enhancement)
  headingHover: {
    '&:hover': {
      color: '#ff005c', // Neon pink on hover for heading
      textShadow: '0 0 30px rgba(255, 0, 92, 1)', // Stronger glow on hover
    }
  },

  errorMessageHover: {
    '&:hover': {
      color: '#ff4d4d', // Darker neon red when hovered
      textShadow: '0 0 20px rgba(255, 77, 77, 0.9)', // Enhanced glow effect
    }
  },
};


export default Video;
