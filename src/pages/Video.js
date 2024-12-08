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
    container: {
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        fontSize: '24px',
        marginBottom: '20px',
        color: '#333',
    },
    video: {
        width: '100%',
        maxWidth: '600px',
        margin: 'auto',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    errorMessage: {
        marginTop: '10px',
        fontSize: '14px',
        color: '#888',
    },
};

export default Video;
