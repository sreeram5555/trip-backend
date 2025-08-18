import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { getLocalInfo } from '../../services/api';
import './CitySelection.css';
import Navbar from '../../components/Navbar/Navbar';
import GlowingStarsBackground from '../../components/GlowingStarsBackground/GlowingStarsBackground';
import { motion, AnimatePresence } from 'framer-motion';
import { IconSun, IconBed, IconShieldCheck, IconAlertTriangle, IconCheck } from '@tabler/icons-react';

// Helper component to render the safety rating with the correct color and icon
const SafetyRating = ({ rating }) => {
    const safeColor = "text-green-500", moderateColor = "text-yellow-500", highColor = "text-red-500";
    let colorClass = "", icon = <IconAlertTriangle size={18} />;
    if (rating === "Low") { colorClass = safeColor; icon = <IconShieldCheck size={18} />; } 
    else if (rating === "Moderate") { colorClass = moderateColor; } 
    else if (rating === "High") { colorClass = highColor; }
    return <span className={`safety-rating ${colorClass}`}>{icon} {rating} Risk</span>;
};

const CitySelection = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loadingCity, setLoadingCity] = useState(null);
    const [error, setError] = useState('');
    // NEW STATE: Stores the active image index for EACH city's gallery
    const [currentImageIndexes, setCurrentImageIndexes] = useState({});
    
    const suggestions = location.state?.suggestions || [];
    const userPreferences = location.state?.userPreferences;

    // This hook initializes the image gallery for each city to show the first image
    useEffect(() => {
        const initialIndexes = {};
        if (suggestions.length > 0) {
            suggestions.forEach(city => { initialIndexes[city.place] = 0; });
            setCurrentImageIndexes(initialIndexes);
        }
    }, [suggestions]);

    if (!userPreferences) {
        return (
             <div className="page-container selection-page-container">
                <Navbar /> <GlowingStarsBackground />
                <div className="content-wrapper">
                    <h2 className="selection-title">Oops! Something went wrong.</h2>
                    <p className="selection-subtitle">We don't have your preferences. Please start again.</p>
                    <Link to="/book-a-trip" className="form-submit-btn" style={{textDecoration: 'none', display: 'inline-block'}}>Go Back</Link>
                </div>
            </div>
        );
    }
    
    // NEW HANDLER: Updates the main image when a thumbnail is clicked
    const handleThumbnailClick = (place, index) => {
        setCurrentImageIndexes(prev => ({ ...prev, [place]: index }));
    };

    const handleCitySelect = async (place) => {
        setLoadingCity(place);
        setError('');
        try {
            const response = await getLocalInfo(userPreferences, place);
            if (response.data?.formatted) {
                navigate('/select-spots', { state: { cityDetails: response.data.formatted, selectedPlace: place, userPreferences } });
            } else { setError('Could not fetch details for this city.'); }
        } catch (err) { setError('An error occurred while fetching city details.');
        } finally { setLoadingCity(null); }
    };

    return (
        <>
            <Navbar />
            <div className="page-container selection-page-container">
                <GlowingStarsBackground />
                <motion.div className="content-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h1 className="selection-title">Step 2 — Pick your destination</h1>
                    <p className="selection-subtitle">Here are the top destinations tailored to your preferences, with key comparison info.</p>
                    
                    <div className="city-list-container">
                        {suggestions.map((city, index) => {
                            const hasPhotos = city.photos && city.photos.length > 0;
                            const currentIndex = currentImageIndexes[city.place] || 0;
                            return (
                                <motion.div key={city.place} className="city-item" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.15 }}>
                                    <div className="item-details-rich">
                                        <h2 className="item-title">{city.place}</h2>
                                        <p className="item-reason">{city.reason}</p>
                                        <div className="item-metadata">
                                            <div className="meta-item"><IconSun size={18} /> <strong>Weather:</strong> {city.weather_suitability}</div>
                                            <div className="meta-item"><IconBed size={18} /> <strong>Stays:</strong> {city.accommodation_range}</div>
                                            <div className="meta-item"><SafetyRating rating={city.safety_rating} /></div>
                                            <div className="meta-item"><IconCheck size={18} /> <strong>Permit:</strong> {city.permit_required}</div>
                                        </div>
                                        <button onClick={() => handleCitySelect(city.place)} className="select-button" disabled={loadingCity !== null}>
                                            {loadingCity === city.place ? 'Loading...' : `Continue with ${city.place}`}
                                        </button>
                                    </div>
                                    {hasPhotos && (
                                        <div className="item-gallery">
                                            <div className="main-photo-container">
                                                <AnimatePresence mode="wait">
                                                    <motion.img 
                                                        key={currentIndex}
                                                        src={city.photos[currentIndex]} 
                                                        alt={`${city.place} view`} 
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    />
                                                </AnimatePresence>
                                            </div>
                                            <div className="thumbnail-container">
                                                {city.photos.slice(0, 4).map((photoUrl, photoIndex) => (
                                                    <div 
                                                        key={photoIndex}
                                                        className={`thumbnail-photo ${currentIndex === photoIndex ? 'active' : ''}`}
                                                        onClick={() => handleThumbnailClick(city.place, photoIndex)}
                                                    >
                                                        <img src={photoUrl} alt={`Thumbnail ${photoIndex + 1}`} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )
                        })}
                    </div>
                    {error && <p className="error-message">{error}</p>}
                </motion.div>
            </div>
        </>
    );
};

export default CitySelection;