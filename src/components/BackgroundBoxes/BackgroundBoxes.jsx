import React, { useRef, useEffect } from 'react';
import './BackgroundBoxes.css';
import { motion } from 'framer-motion';

const BackgroundBoxes = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            container.style.setProperty("--mouse-x", `${x}px`);
            container.style.setProperty("--mouse-y", `${y}px`);
        };

        container.addEventListener("mousemove", handleMouseMove);

        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const boxes = new Array(150).fill(1);

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="background-boxes-container"
        >
            {boxes.map((_, i) => (
                <div key={`box-${i}`} className="background-box" />
            ))}
        </motion.div>
    );
};

export default BackgroundBoxes;