// src/pages/Testimonials.js
import React, { useState, useEffect } from 'react';
import { Button, TextField, Box } from '@mui/material';

const initialTestimonials = JSON.parse(localStorage.getItem('testimonials')) || [
    { name: "Alice", message: "Great product!", rating: 5 },
    { name: "Bob", message: "Really helped me in my project.", rating: 4 },
    { name: "Charlie", message: "Excellent support and functionality!", rating: 5 },
];

function TestimonialCard({ name, message, rating }) {
    return (
        <li style={styles.card}>
            <strong>{name}</strong>: {message} - Rating: {rating}/5
        </li>
    );
}

function Testimonials() {
    const [allTestimonials, setAllTestimonials] = useState(initialTestimonials);

    useEffect(() => {
        const storedTestimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
        setAllTestimonials(storedTestimonials);
    }, []);

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Testimonials</h2>
            <ul style={styles.list}>
                {allTestimonials.map((testimonial, index) => (
                    <TestimonialCard
                        key={index}
                        name={testimonial.name || "Anonymous"}
                        message={testimonial.message}
                        rating={testimonial.rating}
                    />
                ))}
            </ul>
        </div>
    );
}

const styles = {
    container: {
        padding: '190px',
        maxWidth: '1000px',
        margin: 'auto',
        fontFamily: 'Orbitron, sans-serif',
        background: 'radial-gradient(circle, #0a0a0a 50%, #1b1b1b 100%)',
        color: '#fff',
        borderRadius: '20px',
        boxShadow: '0 0 20px rgba(255, 0, 102, 0.8)',
        overflow: 'hidden',
        animation: 'fadeIn 1.2s ease-out',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '25px',
        fontSize: '36px',
        color: '#ff005c',
        textTransform: 'uppercase',
        textShadow: '0 0 20px #ff005c, 0 0 30px rgba(255, 0, 92, 0.8)',
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
        border: '2px solid rgba(255, 0, 102, 0.5)',
        padding: '20px',
        borderRadius: '12px',
        backgroundColor: '#202020',
        boxShadow: '0 0 30px rgba(255, 0, 102, 0.6)',
        transition: 'transform 0.3s, box-shadow 0.3s, background-color 0.3s',
        cursor: 'pointer',
    },
};

export default Testimonials;
