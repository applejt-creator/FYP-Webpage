import React from 'react';

function Video() {
    const prototypeVideoSrc = '/videos/FYP_VIDEO.mp4'; // Local path for prototype video
    const finalVideoSrc = '/videos/FINAL_VIDEO.mp4'; // Local path for final video

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Prototype Video Showcase</h2>
            <video controls style={styles.video}>
                <source src={prototypeVideoSrc} type="video/mp4" />
                {/* Fallback text */}
                Your browser does not support the video tag.
            </video>
            <p style={styles.errorMessage}>
                If the video does not load, please check your connection or try a different browser.
            </p>

            <h2 style={styles.heading}>Final Video Showcase</h2>
            <video controls style={styles.video}>
                <source src={finalVideoSrc} type="video/mp4" />
                {/* Fallback text */}
                Your browser does not support the video tag.
            </video>
            <p style={styles.errorMessage}>
                If the video does not load, please check your connection or try a different browser.
            </p>
        </div>
    );
}

const styles = {
    container: {
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#1a1a1a',
        borderRadius: '15px',
        boxShadow: '0 0 20px rgba(255, 0, 0, 0.5)',
    },
    heading: {
        fontSize: '40px',
        marginBottom: '30px',
        color: '#ff4d4d',
        fontWeight: '700',
        textShadow: '0 0 20px rgba(255, 77, 77, 0.9)',
    },
    video: {
        width: '100%',
        maxWidth: '800px',
        margin: '20px auto',
        borderRadius: '15px',
        boxShadow: '0 8px 20px rgba(255, 0, 0, 0.6)',
    },
    errorMessage: {
        marginTop: '15px',
        fontSize: '18px',
        color: '#ff6666',
        textShadow: '0 0 12px rgba(255, 102, 102, 1)',
    },
};

export default Video;
