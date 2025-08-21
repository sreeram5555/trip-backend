import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mlApi } from '../../services/api';
import './UserPreferencesForm.css';
import Navbar from '../../components/Navbar/Navbar';
import GlowingStarsBackground from '../../components/GlowingStarsBackground/GlowingStarsBackground';
import MultiStepLoader from '../../components/MultiStepLoader/MultiStepLoader';
import { motion, AnimatePresence } from 'framer-motion';

const formContainerVariants = { hidden: { opacity: 0, scale: 0.98 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut', when: "beforeChildren", staggerChildren: 0.05, }, }, exit: { opacity: 0, scale: 0.98, transition: { duration: 0.3, ease: 'easeIn' } } };
const fieldVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut', }, }, };

const UserPreferencesForm = () => {
    const [formData, setFormData] = useState({
        travel_type: 'Leisure',
        total_budget: 60000,
        group_type: 'couple',
        no_of_people: 2,
        duration: 7,
        interests: 'mountains, trekking, culture',
        start_date: new Date().toISOString().split('T')[0],
        planning_style: 'Holiday based',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const payload = { ...formData, total_budget: parseInt(formData.total_budget), no_of_people: parseInt(formData.no_of_people), duration: parseInt(formData.duration), budget_range: null };

        try {
            const response = await mlApi.generatePlaces(payload);
            if (response.data?.places?.length > 0) {
                navigate('/select-city', { state: { suggestions: response.data.places, userPreferences: payload } });
            } else {
                setError('No suggestions found. Please try different preferences.');
                setLoading(false);
            }
        } catch (err) {
            setError('Failed to fetch suggestions. Please check the backend and try again.');
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
                        <motion.div key="form" className="form-wrapper" variants={formContainerVariants} initial="hidden" animate="visible" exit="exit">
                            <motion.h1 variants={fieldVariants} className="form-title">AI Travel Planning Wizard</motion.h1>
                            <motion.p variants={fieldVariants} className="form-subtitle">Step 1 — Tell us about your trip</motion.p>
                            <form onSubmit={handleSubmit} className="preferences-form">
                                <div className="form-grid">
                                    <motion.div variants={fieldVariants} className="form-group"><label htmlFor="travel_type">Travel Type</label><select id="travel_type" name="travel_type" value={formData.travel_type} onChange={handleChange}><option>Leisure</option><option>Business</option><option>Adventure</option><option>Romantic</option><option>Family</option></select></motion.div>
                                    <motion.div variants={fieldVariants} className="form-group"><label htmlFor="total_budget">Total Budget (₹)</label><input id="total_budget" type="number" name="total_budget" value={formData.total_budget} onChange={handleChange} placeholder="e.g., 60000" min="1000" step="1000" required /></motion.div>
                                    <motion.div variants={fieldVariants} className="form-group form-group-full"><label htmlFor="interests">Interests</label><input id="interests" type="text" name="interests" value={formData.interests} onChange={handleChange} placeholder="e.g., mountains, trekking, culture" required /></motion.div>
                                    <motion.div variants={fieldVariants} className="form-group"><label htmlFor="duration">Trip Duration (days): {formData.duration}</label><input id="duration" type="range" name="duration" value={formData.duration} onChange={handleChange} min="1" max="45" /></motion.div>
                                    <motion.div variants={fieldVariants} className="form-group"><label htmlFor="no_of_people">Number of People: {formData.no_of_people}</label><input id="no_of_people" type="range" name="no_of_people" value={formData.no_of_people} onChange={handleChange} min="1" max="30" /></motion.div>
                                    <motion.div variants={fieldVariants} className="form-group"><label htmlFor="group_type">Group Type</label><input id="group_type" type="text" name="group_type" value={formData.group_type} onChange={handleChange} placeholder="e.g., couple, friends, family" required /></motion.div>
                                    <motion.div variants={fieldVariants} className="form-group"><label htmlFor="start_date">Start Date (optional)</label><input id="start_date" type="date" name="start_date" value={formData.start_date} onChange={handleChange} /></motion.div>
                                    <motion.div variants={fieldVariants} className="form-group form-group-full"><label htmlFor="planning_style">Planning Style</label><select id="planning_style" name="planning_style" value={formData.planning_style} onChange={handleChange}><option>Not specified</option><option>Holiday based</option><option>Season based</option></select></motion.div>
                                </div>
                                <motion.button variants={fieldVariants} type="submit" className="form-submit-btn" disabled={loading}>✨ Get Suggestions</motion.button>
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