import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Itinerary.css';
import Navbar from '../../components/Navbar/Navbar';
import GlowingStarsBackground from '../../components/GlowingStarsBackground/GlowingStarsBackground';
import MultiStepLoader from '../../components/MultiStepLoader/MultiStepLoader';
import { motion, AnimatePresence } from 'framer-motion';

// Import all the new components and API functions
import ItineraryTimeline from './components/ItineraryTimeline';
import SafetyInfo from './components/SafetyInfo';
import PackingList from './components/PackingList';
import BudgetView from './components/BudgetView';
import Logistics from './components/Logistics';
import { 
    getSafetyInfo, 
    getPackingList, 
    getBudgetBreakdown, 
    getTransportOptions, 
    getAccommodationSuggestions 
} from '../../services/api';

const Itinerary = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('Itinerary');
    const [loading, setLoading] = useState(true);
    const [enhancements, setEnhancements] = useState({
        safety: null, packing: null, budget: null, transport: null, accommodation: null
    });

    // Read data from the previous page
    const itineraryData = location.state?.itineraryData;
    const place = location.state?.place;
    const userPreferences = location.state?.userPreferences;

    // This useEffect hook now runs correctly because userPreferences is present
    useEffect(() => {
        // If essential data is missing, don't try to fetch
        if (!userPreferences || !place) {
            setLoading(false);
            return;
        }

        const fetchAllEnhancements = async () => {
            try {
                // Fetch all enhancement data in parallel for speed
                const [safety, packing, budget, transport, accommodation] = await Promise.all([
                    getSafetyInfo(userPreferences, place),
                    getPackingList(userPreferences, place),
                    getBudgetBreakdown(userPreferences),
                    getTransportOptions(userPreferences, place),
                    getAccommodationSuggestions(userPreferences, place)
                ]);

                // Update state with the formatted data from the API responses
                setEnhancements({
                    safety: safety.data?.formatted,
                    packing: packing.data?.formatted,
                    budget: budget.data?.formatted,
                    transport: transport.data?.formatted,
                    accommodation: accommodation.data?.formatted
                });
            } catch (error) {
                console.error("Failed to fetch trip enhancements:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllEnhancements();
    }, [userPreferences, place]);

    // Error handling for initial load
    if (!itineraryData?.itinerary) {
        return (
            <div className="page-container itinerary-container">
                <Navbar />
                <GlowingStarsBackground />
                <div className="itinerary-wrapper" style={{ zIndex: 1, textAlign: 'center' }}>
                    <h2 className="itinerary-title error-title">Itinerary Data Missing</h2>
                    <p className="selection-subtitle">We can't display the itinerary. Please start over.</p>
                    <Link to="/" className="form-submit-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>Go to Homepage</Link>
                </div>
            </div>
        );
    }

    const tabs = ['Itinerary', 'Safety', 'Packing', 'Budget', 'Logistics'];

    const renderContent = () => {
        switch (activeTab) {
            case 'Itinerary':
                return <ItineraryTimeline itineraryData={itineraryData} />;
            case 'Safety':
                return <SafetyInfo data={enhancements.safety} />;
            case 'Packing':
                return <PackingList data={enhancements.packing} />;
            case 'Budget':
                return <BudgetView data={enhancements.budget} />;
            case 'Logistics':
                return <Logistics transportData={enhancements.transport} accommodationData={enhancements.accommodation} />;
            default:
                return null;
        }
    };
    
    return (
        <>
            <Navbar />
            <div className="page-container itinerary-container">
                <GlowingStarsBackground />
                <motion.div className="itinerary-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h1 className="itinerary-title">Your Trip Dashboard for {place}</h1>
                    <p className="itinerary-subtitle">Here is your complete, AI-generated travel plan.</p>
                    
                    <div className="dashboard-tabs">
                        {tabs.map(tab => (
                            <button key={tab} className={`tab-button ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                                {tab}
                                {activeTab === tab && <motion.div className="active-tab-underline" layoutId="underline" />}
                            </button>
                        ))}
                    </div>

                    <div className="dashboard-content">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -10, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {loading ? <MultiStepLoader loading={loading} /> : renderContent()}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default Itinerary;