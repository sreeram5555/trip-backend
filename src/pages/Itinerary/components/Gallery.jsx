import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery = ({ suggestions, selectedPlace }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    // Find the specific suggestion object that matches the selected place
    const cityData = suggestions.find(s => s.place === selectedPlace);

    if (!cityData || !cityData.photos || cityData.photos.length === 0) {
        return <p className="feature-placeholder">No photos are available for this destination.</p>;
    }

    const handleThumbnailClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="feature-content-wrapper">
            <h3 className="feature-title">Image Gallery for {selectedPlace}</h3>
            <div className="item-gallery profile-gallery">
                <div className="main-photo-container">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentIndex}
                            src={cityData.photos[currentIndex]}
                            alt={`${selectedPlace} view`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    </AnimatePresence>
                </div>
                <div className="thumbnail-container">
                    {cityData.photos.map((photoUrl, photoIndex) => (
                        <div
                            key={photoIndex}
                            className={`thumbnail-photo ${currentIndex === photoIndex ? 'active' : ''}`}
                            onClick={() => handleThumbnailClick(photoIndex)}
                        >
                            <img src={photoUrl} alt={`Thumbnail ${photoIndex + 1}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Gallery;