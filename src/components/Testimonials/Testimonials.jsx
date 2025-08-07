import React from 'react';
import './Testimonials.css';
import { motion } from 'framer-motion';

const testimonials = [
    {
        quote: "The itinerary for our Kerala trip was flawless. RoamAI planned everything, from the houseboats in Alleppey to the tea gardens in Munnar. It felt like magic!",
        author: "Priya & Rohan",
        location: "Mumbai"
    },
    {
        quote: "As a solo traveler, safety and planning are key. This tool gave me a detailed plan for my Rajasthan trip that was both adventurous and secure. Highly recommended!",
        author: "Anjali S.",
        location: "Bengaluru"
    },
    {
        quote: "I never would have discovered the hidden gems in Hampi without this. The AI suggested spots that weren't on any other blog. It made our trip truly unique.",
        author: "The Verma Family",
        location: "New Delhi"
    }
];

const Testimonials = () => {
    return (
        <section className="testimonials-section">
            <div className="section-container">
                <div className="section-header">
                    <h2>Stories from Our Travelers</h2>
                </div>
                <div className="testimonials-grid">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className="testimonial-card"
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ delay: index * 0.15 }}
                        >
                            <p className="testimonial-quote">"{testimonial.quote}"</p>
                            <div className="testimonial-author">
                                <strong>{testimonial.author}</strong>
                                <span>, {testimonial.location}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;