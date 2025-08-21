import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconSun, IconBed, IconShieldCheck, IconAlertTriangle, IconCheck } from '@tabler/icons-react';

// The SafetyRating helper is self-contained and correct.
const SafetyRating = ({ rating }) => {
    const safeColor = "text-green-500", moderateColor = "text-yellow-500", highColor = "text-red-500";
    let colorClass = "", icon = <IconAlertTriangle size={18} />;
    if (rating === "Low") { colorClass = safeColor; icon = <IconShieldCheck size={18} />; }
    else if (rating === "Moderate") { colorClass = moderateColor; }
    else if (rating === "High") { colorClass = highColor; }
    return <span className={`safety-rating ${colorClass}`}>{icon} {rating} Risk</span>;
};

// This is the new, self-contained CityCard component that MANAGES ITS OWN STATE.
const CityCard = ({ city, onSelect, isLoading }) => {
    // --- THIS IS THE CRITICAL FIX ---
    // State is now managed LOCALLY inside each card. This is the correct React pattern.
    const [currentIndex, setCurrentIndex] = useState(0);

    const hasPhotos = city.photos && city.photos.length > 0;

    // These handlers work on this card's individual state.
    const handleNextImage = (e) => {
        e.stopPropagation(); // Prevents the main card's onClick from firing
        if (!hasPhotos) return;
        setCurrentIndex((prevIndex) => (prevIndex + 1) % city.photos.length);
    };

    const handlePrevImage = (e) => {
        e.stopPropagation(); // Prevents the main card's onClick from firing
        if (!hasPhotos) return;
        setCurrentIndex((prevIndex) => (prevIndex - 1 + city.photos.length) % city.photos.length);
    };

    return (
        <motion.div 
            className="city-item" 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
        >
            {/* The Image Gallery is now part of the card */}
            {hasPhotos && (
                <div className="card-image-carousel">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={`${city.place}-${currentIndex}`} // Key change triggers the animation
                            src={city.photos[currentIndex]}
                            alt={`View of ${city.place}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        />
                    </AnimatePresence>
                    <div className="carousel-controls">
                        {/* The arrow buttons now work correctly */}
                        <button className="carousel-button" onClick={handlePrevImage}>‹</button>
                        <span className="carousel-counter">{currentIndex + 1} / {city.photos.length}</span>
                        <button className="carousel-button" onClick={handleNextImage}>›</button>
                    </div>
                </div>
            )}

            {/* The text details */}
            <div className="card-content-details">
                <h2 className="item-title">{city.place}</h2>
                <p className="item-reason">{city.reason}</p>
                <div className="item-metadata">
                    <div className="meta-item"><IconSun size={18} /> <strong>Weather:</strong> {city.weather_suitability}</div>
                    <div className="meta-item"><IconBed size={18} /> <strong>Stays:</strong> {city.accommodation_range}</div>
                    <div className="meta-item"><SafetyRating rating={city.safety_rating} /></div>
                    <div className="meta-item"><IconCheck size={18} /> <strong>Permit:</strong> {city.permit_required}</div>
                </div>
                <button onClick={() => onSelect(city.place)} className="select-button" disabled={isLoading}>
                    {isLoading ? 'Loading...' : `Explore ${city.place}`}
                </button>
            </div>
        </motion.div>
    );
};

export default CityCard;