// src/pages/Testimonials.js
import React from 'react';

function Testimonials() {
    const testimonials = [
        { name: "Alice", message: "Great product!" },
        { name: "Bob", message: "Really helped me in my project." },
    ];

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h2>Testimonials</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {testimonials.map((t, index) => (
                    <li key={index} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                        <strong>{t.name}</strong>: {t.message}
                    </li>
                ))}
            </ul>
            {/* Future enhancement: Fetch testimonials from an API */}
        </div>
    );
}

export default Testimonials;