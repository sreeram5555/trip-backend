import React, { useState, useEffect } from "react";
import "./MultiStepLoader.css";
import { AnimatePresence, motion } from "framer-motion";

const loadingStates = [
    { text: "Analyzing your travel preferences..." },
    { text: "Consulting our AI destination expert..." },
    { text: "Scouring India for hidden gems..." },
    { text: "Finding the perfect match for you..." },
    { text: "Almost there, curating suggestions..." },
];

const MultiStepLoader = ({ loading, duration = 2000 }) => {
    const [currentState, setCurrentState] = useState(0);

    useEffect(() => {
        if (!loading) {
            setCurrentState(0);
            return;
        }
        const interval = setInterval(() => {
            setCurrentState((prev) => (prev + 1) % loadingStates.length);
        }, duration);

        return () => clearInterval(interval);
    }, [loading, duration]);

    return (
        <AnimatePresence mode="wait">
            {loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="loader-wrapper"
                >
                    <div className="loader-container">
                        <motion.div
                            key={currentState}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="loader-text"
                        >
                            {loadingStates[currentState].text}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MultiStepLoader;