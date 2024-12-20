// src/pages/Testimonials.js
import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function TestimonialCard({ name, message, rating, type }) {
    return (
        <li style={styles.card}>
            <strong>{name}</strong>: {message} - Rating: {rating}/5 (Type: {type})
        </li>
    );
}

function Testimonials() {
    const [allTestimonials, setAllTestimonials] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [filteredTestimonials, setFilteredTestimonials] = useState([]);

    const fetchReview = async () => {
        const testimonialsCollectionRef = collection(db, 'testimonial');
        const testimonialsDoc = await getDocs(testimonialsCollectionRef);
        const testimonialsData = testimonialsDoc.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setAllTestimonials(testimonialsData);
    };

    useEffect(() => {
        fetchReview();
    }, []);

    useEffect(() => {
        const filtered = allTestimonials.filter(
            (testimonial) =>
                (selectedType === '' || testimonial.type === selectedType) &&
                (testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    testimonial.message.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredTestimonials(filtered);
    }, [searchTerm, selectedType, allTestimonials]);

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Testimonials</h2>

            <FormControl fullWidth style={styles.dropdown}>
                <InputLabel>Filter by Type</InputLabel>
                <Select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Testimonial">Testimonial</MenuItem>
                    <MenuItem value="Report">Report</MenuItem>
                    <MenuItem value="Issue">Issue</MenuItem>
                    <MenuItem value="Rating">Rating</MenuItem>
                </Select>
            </FormControl>

            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.search}
            />

            <ul style={styles.list}>
                {filteredTestimonials.map((testimonial, index) => (
                    <TestimonialCard
                        key={index}
                        name={testimonial.name || 'Anonymous'}
                        message={testimonial.message}
                        rating={testimonial.rating}
                        type={testimonial.type || 'General'}
                    />
                ))}
            </ul>
        </div>
    );
}

const styles = {
    container: {
        padding: '50px',
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
    search: {
        marginBottom: '20px',
        backgroundColor: '#fff',
        borderRadius: '4px',
    },
    dropdown: {
        marginBottom: '20px',
    },
};

export default Testimonials;
