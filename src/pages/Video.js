// src/pages/Video.js
import React from 'react';

function Video() {
    return (
        <div>
            <h2>Video Showcase</h2>
            <video controls width="600">
                <source src="path-to-your-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

export default Video;
