import React, { useRef, useEffect } from 'react';
import './SpotlightCard.css';
// The unused 'motion' import has been removed from the line below.

const SpotlightCard = ({ children, className = "" }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty("--spotlight-x", `${x}px`);
            card.style.setProperty("--spotlight-y", `${y}px`);
        };

        card.addEventListener("mousemove", handleMouseMove);

        return () => {
            card.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div ref={cardRef} className={`spotlight-card ${className}`}>
            {children}
        </div>
    );
};

export default SpotlightCard;