// src/pages/Testimonials.js
import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';

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
    const [testimonial, setTestimonial] = useState({ name: '', message: '', rating: '' });
    const [allTestimonials, setAllTestimonials] = useState(testimonials);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTestimonial({ ...testimonial, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (testimonial.name && testimonial.message && testimonial.rating) {
            setAllTestimonials([...allTestimonials, testimonial]);
            setTestimonial({ name: '', message: '', rating: '' });
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Testimonials</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    name="name"
                    value={testimonial.name}
                    onChange={handleInputChange}
                    style={{ ...styles.textField, backgroundColor: '#2b2b2b' }} // Lighten text field background
                />
                <TextField
                    label="Testimonial"
                    variant="outlined"
                    fullWidth
                    name="message"
                    multiline
                    rows={4}
                    value={testimonial.message}
                    onChange={handleInputChange}
                    style={{ ...styles.textField, backgroundColor: '#2b2b2b' }} // Lighten text field background
                />
                <TextField
                    label="Rating"
                    variant="outlined"
                    fullWidth
                    type="number"
                    name="rating"
                    value={testimonial.rating}
                    onChange={handleInputChange}
                    style={{ ...styles.textField, backgroundColor: '#2b2b2b' }} // Lighten text field background
                />
                <Button type="submit" variant="contained" style={styles.button}>
                    Submit
                </Button>
            </form>
            <ul style={styles.list}>
                {allTestimonials.map((testimonial, index) => (
                    <TestimonialCard
                        key={index}
                        name={testimonial.name}
                        message={testimonial.message}
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
    textField: {
        marginBottom: '15px',
        backgroundColor: '#2b2b2b', // Lighter background for text fields
    },
    button: {
        background: 'linear-gradient(90deg, #ff4d4d, #ff005c)',
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
};

export default Testimonials;
