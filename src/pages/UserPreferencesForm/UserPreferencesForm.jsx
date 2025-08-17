import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generatePlaces } from '../../services/api';
import './UserPreferencesForm.css';
import Navbar from '../../components/Navbar/Navbar';
import GlowingStarsBackground from '../../components/GlowingStarsBackground/GlowingStarsBackground';
import MultiStepLoader from '../../components/MultiStepLoader/MultiStepLoader';
import { motion, AnimatePresence } from 'framer-motion';

// Animation variants for Framer Motion
const formContainerVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: {
        duration: 0.3,
        ease: 'easeIn'
    }
  }
};

const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

const UserPreferencesForm = () => {
    const [formData, setFormData] = useState({
        travel_type: 'Adventure',
        min_budget: '15000',
        max_budget: '50000',
        duration: '7',
        interests: 'Mountains, Food, History',
        group_type: 'Couple',
        no_of_people: '2',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const payload = {
            travel_type: formData.travel_type,
            budget_range: [parseInt(formData.min_budget), parseInt(formData.max_budget)],
            duration: parseInt(formData.duration),
            no_of_people: parseInt(formData.no_of_people),
            interests: formData.interests,
            group_type: formData.group_type
        };
        try {
            const response = await generatePlaces(payload);
            if (response.data && response.data.places && response.data.places.length > 0) {
                navigate('/select-city', { 
                    state: { 
                        suggestions: response.data.places,
                        userPreferences: payload 
                    } 
                });
            } else {
                setError('No suggestions found. Please try different preferences.');
                setLoading(false);
            }
        } catch (err) {
            setError('Failed to fetch suggestions. Please check the backend and try again.');
            console.error('Error fetching city suggestions:', err);
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="page-container form-page-container">
                <GlowingStarsBackground />
                <AnimatePresence mode="wait">
                    {loading ? (
                        <MultiStepLoader loading={loading} key="loader" />
                    ) : (
                        <motion.div
                            key="form"
                            className="form-wrapper"
                            variants={formContainerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <motion.h1 variants={fieldVariants} className="form-title">Design Your Dream Trip</motion.h1>
                            <motion.p variants={fieldVariants} className="form-subtitle">Fill in your preferences and let our AI find the perfect destinations for you.</motion.p>
                            
                            <form onSubmit={handleSubmit} className="preferences-form">
                                <div className="form-grid">
                                    <motion.div variants={fieldVariants} className="form-group form-group-full">
                                        <label htmlFor="interests">What are your interests? (e.g., Hiking, Beaches)</label>
                                        <input id="interests" type="text" name="interests" value={formData.interests} onChange={handleChange} placeholder="e.g., Hiking, Temples, Foodie" required />
                                    </motion.div>
                                    <motion.div variants={fieldVariants} className="form-group">
                                        <label htmlFor="min_budget">Min Budget (INR)</label>
                                        <input id="min_budget" type="number" name="min_budget" value={formData.min_budget} onChange={handleChange} placeholder="e.g., 15000" min="0" step="1000" required />
                                    </motion.div>
                                    <motion.div variants={fieldVariants} className="form-group">
                                        <label htmlFor="max_budget">Max Budget (INR)</label>
                                        <input id="max_budget" type="number" name="max_budget" value={formData.max_budget} onChange={handleChange} placeholder="e.g., 50000" min="0" step="1000" required />
                                    </motion.div>
                                    <motion.div variants={fieldVariants} className="form-group">
                                        <label htmlFor="duration">Trip Duration (days)</label>
                                        <input id="duration" type="number" name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g., 7" min="1" required />
                                    </motion.div>
                                     <motion.div variants={fieldVariants} className="form-group">
                                        <label htmlFor="no_of_people">Number of People</label>
                                        <input id="no_of_people" type="number" name="no_of_people" value={formData.no_of_people} onChange={handleChange} placeholder="e.g., 2" min="1" required />
                                    </motion.div>
                                    <motion.div variants={fieldVariants} className="form-group">
                                        <label htmlFor="travel_type">Type of Travel</label>
                                        <select id="travel_type" name="travel_type" value={formData.travel_type} onChange={handleChange}>
                                            <option value="Adventure">Adventure</option>
                                            <option value="Relaxation">Relaxation</option>
                                            <option value="Cultural">Cultural</option>
                                            <option value="Spiritual">Spiritual</option>
                                            <option value="Historical">Historical</option>
                                        </select>
                                    </motion.div>
                                    <motion.div variants={fieldVariants} className="form-group">
                                        <label htmlFor="group_type">Travel Group</label>
                                        <select id="group_type" name="group_type" value={formData.group_type} onChange={handleChange}>
                                            <option value="Solo">Solo</option>
                                            <option value="Couple">Couple</option>
                                            <option value="Family">Family</option>
                                            <option value="Friends">Friends</option>
                                        </select>
                                    </motion.div>
                                </div>
                                <motion.button variants={fieldVariants} type="submit" className="form-submit-btn" disabled={loading}>
                                    Find Destinations
                                </motion.button>
                                {error && <p className="error-message">{error}</p>}
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default UserPreferencesForm;

