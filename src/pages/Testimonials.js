// src/pages/Testimonials.js
import React from 'react';

function Testimonials() {
    const testimonials = [
        { name: "Alice", message: "Great product!" },
        { name: "Bob", message: "Really helped me in my project." },
    ];

    return (
        <div>
            <h2>Testimonials</h2>
            <ul>
                {testimonials.map((t, index) => (
                    <li key={index}>
                        <strong>{t.name}</strong>: {t.message}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Testimonials;
