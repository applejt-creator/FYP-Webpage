// src/pages/Reports.js
import React, { useState, useEffect } from 'react';
import { Button, TextField, Box } from '@mui/material';

const initialTestimonials = JSON.parse(localStorage.getItem('testimonials')) || [
    { name: "Alice", message: "Great product!", rating: 5 },
    { name: "Bob", message: "Really helped me in my project.", rating: 4 },
    { name: "Charlie", message: "Excellent support and functionality!", rating: 5 },
];

function Reports() {
    const [testimonial, setTestimonial] = useState({ name: '', message: '', rating: '' });
    const [error, setError] = useState({});

    useEffect(() => {
        const storedTestimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTestimonial({ ...testimonial, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = {};

        // Validate name
        if (!testimonial.name) {
            errors.name = 'Name is required';
        }

        // Validate message
        if (!testimonial.message) {
            errors.message = 'Message is required';
        }

        // Validate rating (should be between 1 and 5)
        if (!testimonial.rating || testimonial.rating < 1 || testimonial.rating > 5) {
            errors.rating = 'Rating must be between 1 and 5';
        }

        if (Object.keys(errors).length === 0) {
            const newTestimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
            newTestimonials.push(testimonial);
            localStorage.setItem('testimonials', JSON.stringify(newTestimonials));
            setTestimonial({ name: '', message: '', rating: '' });
            setError({});
        } else {
            setError(errors);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Submit Your Testimonial/Reports/Issue/Rating</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    name="name"
                    value={testimonial.name}
                    onChange={handleInputChange}
                    style={{ ...styles.textField, backgroundColor: '#2b2b2b' }}
                />
                {error.name && <p style={styles.error}>{error.name}</p>}

                <TextField
                    label="Testimonial"
                    variant="outlined"
                    fullWidth
                    name="message"
                    multiline
                    rows={4}
                    value={testimonial.message}
                    onChange={handleInputChange}
                    style={{ ...styles.textField, backgroundColor: '#2b2b2b' }}
                />
                {error.message && <p style={styles.error}>{error.message}</p>}

                <TextField
                    label="Rating"
                    variant="outlined"
                    fullWidth
                    type="number"
                    name="rating"
                    value={testimonial.rating}
                    onChange={handleInputChange}
                    inputProps={{ min: 1, max: 5 }}
                    style={{ ...styles.textField, backgroundColor: '#2b2b2b' }}
                />
                {error.rating && <p style={styles.error}>{error.rating}</p>}

                <Button type="submit" variant="contained" style={styles.button}>
                    Submit
                </Button>
            </form>
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
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textField: {
        marginBottom: '15px',
        backgroundColor: '#2b2b2b',
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
    error: {
        color: 'red',
        fontSize: '0.875rem',
        marginBottom: '5px',
    },
};

export default Reports;
