// src/pages/Video.js
import React from 'react';

function Video({ videoSrc }) {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Video Showcase</h2>
            <video controls width="600">
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <p style={{ marginTop: '10px' }}>If the video does not load, please check your connection or try a different browser.</p>
        </div>
    );
}

export default Video;