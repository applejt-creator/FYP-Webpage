// src/pages/Testimonials.js
import React from 'react';

const testimonials = [
    { name: "Alice", message: "Great product!" },
    { name: "Bob", message: "Really helped me in my project." },
    { name: "Charlie", message: "Excellent support and functionality!" },
];

function TestimonialCard({ name, message }) {
    return (
        <li style={styles.card}>
            <strong>{name}</strong>: {message}
        </li>
    );
}

function Testimonials() {
    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Testimonials</h2>
            <ul style={styles.list}>
                {testimonials.map((testimonial, index) => (
                    <TestimonialCard 
                        key={index} 
                        name={testimonial.name} 
                        message={testimonial.message} 
                    />
                ))}
            </ul>
            {/* Future enhancement: Fetch testimonials from an API */}
        </div>
    );
}

const styles = {
    container: {
        padding: '190px',
        maxWidth: '1000px',
        margin: 'auto',
        fontFamily: 'Orbitron, sans-serif', // Futuristic font for the gaming theme
        background: 'radial-gradient(circle, #0a0a0a 50%, #1b1b1b 100%)', // Darker glowing background
        color: '#fff', // White text
        borderRadius: '20px',
        boxShadow: '0 0 20px rgba(255, 0, 102, 0.8)', // Glowing shadow effect
        overflow: 'hidden',
        animation: 'fadeIn 1.2s ease-out', // Adding fade-in animation to container
    },
    heading: {
        textAlign: 'center',
        marginBottom: '25px',
        fontSize: '36px', // Larger heading for emphasis
        color: '#ff005c', // Neon pink color
        textTransform: 'uppercase',
        textShadow: '0 0 20px #ff005c, 0 0 30px rgba(255, 0, 92, 0.8)', // Glowing text effect
        letterSpacing: '10px',
        animation: 'slideIn 1s ease-out',
    },
    list: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
    },
    card: {
        marginBottom: '20px',
        border: '2px solid rgba(255, 0, 102, 0.5)', // Neon pink border
        padding: '20px',
        borderRadius: '12px',
        backgroundColor: '#202020', // Dark background for each card
        boxShadow: '0 0 30px rgba(255, 0, 102, 0.6)', // Glowing effect around each card
        transition: 'transform 0.3s, box-shadow 0.3s, background-color 0.3s',
        cursor: 'pointer',
    },
    name: {
        color: '#1e90ff', // Neon blue color for names
        fontWeight: 'bold',
        fontSize: '1.3rem',
        letterSpacing: '1px',
    },
    text: {
        color: '#f1f1f1', // Light gray for text
        fontSize: '1.1rem',
        lineHeight: '1.6',
        marginTop: '60px',
    },
    cardHover: {
        transform: 'scale(1.05)',
        boxShadow: '0 0 40px rgba(255, 0, 102, 0.8)', // Enhanced glowing on hover
        backgroundColor: '#2b2b2b', // Darker background on hover
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    button: {
        background: 'linear-gradient(90deg, #ff4d4d, #ff005c)', // Button gradient
        padding: '12px 24px',
        border: 'none',
        borderRadius: '8px',
        color: '#fff',
        fontSize: '1.1rem',
        cursor: 'pointer',
        marginTop: '15px',
        transition: 'transform 0.3s, box-shadow 0.3s',
        boxShadow: '0 0 15px rgba(255, 0, 102, 0.5)',
    },
    buttonHover: {
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 20px rgba(255, 0, 102, 0.7)', // Enhanced glow effect on button hover
    },
};

export default Testimonials;
