import React, { useEffect, useState, useRef } from 'react';
import './InfiniteMovingCards.css';

const testimonials = [
    {
        quote: "Our AI doesn't just find places; it understands your vibe. From serene beaches to bustling bazaars, we find what truly moves you.",
        name: "Personalized Discovery",
        title: "Feature",
    },
    {
        quote: "Receive a full, day-by-day schedule. We handle the logistics of timing, travel, and bookings so you can just enjoy the experience.",
        name: "Seamless Itineraries",
        title: "Feature",
    },
    {
        quote: "Our local expert agents recommend authentic cuisine and hidden culinary gems that you won't find in any travel guide.",
        name: "Authentic Culinary Experiences",
        title: "Feature",
    },
    {
        quote: "Whether you're a solo adventurer, a couple on a romantic getaway, or a family, our plans adapt to your group's specific needs.",
        name: "Tailored for Every Traveler",
        title: "Feature",
    },
    {
        quote: "Safety and smart planning are at our core. We suggest the best routes, safe accommodations, and reliable transport options.",
        name: "Smart & Safe Travel",
        title: "Feature",
    },
];

export const InfiniteMovingCards = () => {
    return (
        <div className="infinite-cards-section">
            <h2 className="section-title">A Travel Agent Like No Other</h2>
            <div className="infinite-cards-container">
                <ul className="infinite-scroller">
                    {[...testimonials, ...testimonials].map((item, index) => (
                        <li className="card" key={index}>
                            <blockquote>
                                <p>"{item.quote}"</p>
                                <footer>
                                    <span>{item.name}</span>
                                    <span className="title">{item.title}</span>
                                </footer>
                            </blockquote>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};