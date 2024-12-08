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
        padding: '20px',
        maxWidth: '600px',
        margin: 'auto',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '24px',
        color: '#333',
    },
    list: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
    },
    card: {
        marginBottom: '15px',
        border: '1px solid #ccc',
        padding: '15px',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
};

export default Testimonials;
