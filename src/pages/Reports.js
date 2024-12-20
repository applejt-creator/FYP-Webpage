// src/pages/Reports.js
import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase';

function Reports() {
    const [submission, setSubmission] = useState({
        type: '',
        name: '',
        message: '',
        rating: '',
    });
    const [error, setError] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSubmission({ ...submission, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};

        // Validate type
        if (!submission.type) {
            errors.type = 'Submission type is required';
        }

        // Validate name
        if (!submission.name) {
            errors.name = 'Name is required';
        }

        // Validate message
        if (!submission.message) {
            errors.message = 'Message is required';
        }

        // Validate rating only if type is "Rating"
        if (submission.type === 'Rating' && (!submission.rating || submission.rating < 1 || submission.rating > 5)) {
            errors.rating = 'Rating must be between 1 and 5';
        }

        if (Object.keys(errors).length === 0) {
            try {
                const submissionsCollectionRef = collection(db, submission.type.toLowerCase()); // Save to collection based on type
                await addDoc(submissionsCollectionRef, {
                    name: submission.name,
                    message: submission.message,
                    rating: submission.rating || null, // Only include rating if applicable
                    type: submission.type,
                });
                alert(`${submission.type} submitted successfully!`);
                setSubmission({ type: '', name: '', message: '', rating: '' });
                setError({});
            } catch (error) {
                console.error("Error adding submission: ", error);
                alert("There was an error submitting your form.");
            }
        } else {
            setError(errors);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Submit Your Testimonial/Report/Issue/Rating</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <FormControl fullWidth style={styles.dropdown}>
                    <InputLabel id="submission-type-label">Submission Type</InputLabel>
                    <Select
                        labelId="submission-type-label"
                        id="submission-type"
                        value={submission.type}
                        name="type"
                        onChange={handleInputChange}
                    >
                        <MenuItem value="Testimonial">Testimonial</MenuItem>
                        <MenuItem value="Report">Report</MenuItem>
                        <MenuItem value="Issue">Issue</MenuItem>
                        <MenuItem value="Rating">Rating</MenuItem>
                    </Select>
                </FormControl>
                {error.type && <p style={styles.error}>{error.type}</p>}

                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    name="name"
                    value={submission.name}
                    onChange={handleInputChange}
                    style={{ ...styles.textField, backgroundColor: '#2b2b2b' }}
                />
                {error.name && <p style={styles.error}>{error.name}</p>}

                <TextField
                    label="Message"
                    variant="outlined"
                    fullWidth
                    name="message"
                    multiline
                    rows={4}
                    value={submission.message}
                    onChange={handleInputChange}
                    style={{ ...styles.textField, backgroundColor: '#2b2b2b' }}
                />
                {error.message && <p style={styles.error}>{error.message}</p>}

                {submission.type === 'Rating' && (
                    <TextField
                        label="Rating"
                        variant="outlined"
                        fullWidth
                        type="number"
                        name="rating"
                        value={submission.rating}
                        onChange={handleInputChange}
                        inputProps={{ min: 1, max: 5 }}
                        style={{ ...styles.textField, backgroundColor: '#2b2b2b' }}
                    />
                )}
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
    dropdown: {
        marginBottom: '15px',
        backgroundColor: '#2b2b2b',
    },
    error: {
        color: 'red',
        fontSize: '0.875rem',
        marginBottom: '5px',
    },
};

export default Reports;
