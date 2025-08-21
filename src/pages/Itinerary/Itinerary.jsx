// // import React from 'react';
// // import { useState, useEffect } from 'react';
// // import { useLocation, Link } from 'react-router-dom';
// // import './Itinerary.css';
// // import Navbar from '../../components/Navbar/Navbar';
// // import GlowingStarsBackground from '../../components/GlowingStarsBackground/GlowingStarsBackground';
// // import MultiStepLoader from '../../components/MultiStepLoader/MultiStepLoader';
// // import { motion, AnimatePresence } from 'framer-motion';

// // // Import all the new components and API functions
// // import ItineraryTimeline from './components/ItineraryTimeline';
// // import SafetyInfo from './components/SafetyInfo';
// // import PackingList from './components/PackingList';
// // import BudgetView from './components/BudgetView';
// // import Logistics from './components/Logistics';
// // import { mlApi, authApi } from '../../services/api';
// // import { useAuth } from '../../context/AuthContext';

// // const Itinerary = () => {
// //     const location = useLocation();
// //     const { isAuthenticated } = useAuth();
// //     const [activeTab, setActiveTab] = useState('Itinerary');
// //     const [loading, setLoading] = useState(true);
// //     const [isSaving, setIsSaving] = useState(false);
// //     const [saveMessage, setSaveMessage] = useState('');
// //     const [enhancements, setEnhancements] = useState({
// //         safety: null, packing: null, budget: null, transport: null, accommodation: null
// //     });

// //     const itineraryData = location.state?.itineraryData;
// //     const place = location.state?.place;
// //     const userPreferences = location.state?.userPreferences;

// //     useEffect(() => {
// //         if (!userPreferences || !place) { setLoading(false); return; }

// //         const fetchAllEnhancements = async () => {
// //             try {
// //                 // --- 2. CALL functions via the mlApi object ---
// //                 const [safety, packing, budget, transport, accommodation] = await Promise.all([
// //                     mlApi.getSafetyInfo(userPreferences, place),
// //                     mlApi.getPackingList(userPreferences, place),
// //                     mlApi.getBudgetBreakdown(userPreferences),
// //                     mlApi.getTransportOptions(userPreferences, place),
// //                     mlApi.getAccommodationSuggestions(userPreferences, place)
// //                 ]);

// //                 setEnhancements({
// //                     safety: safety.data?.formatted,
// //                     packing: packing.data?.formatted,
// //                     budget: budget.data?.formatted,
// //                     transport: transport.data?.formatted,
// //                     accommodation: accommodation.data?.formatted
// //                 });
// //             } catch (error) {
// //                 console.error("Failed to fetch trip enhancements:", error);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };
// //         fetchAllEnhancements();
// //     }, [userPreferences, place]);

// //     const handleSaveTrip = async () => {
// //         setIsSaving(true);
// //         setSaveMessage('');
// //         try {
// //             const adventureResponse = await authApi.addAdventure({
// //                 TravelType: userPreferences.travel_type,
// //                 Budget: userPreferences.total_budget,
// //                 GroupType: userPreferences.group_type,
// //                 Group: userPreferences.no_of_people,
// //                 Duration: userPreferences.duration,
// //                 Interests: userPreferences.interests,
// //                 Season_or_Startdate: userPreferences.start_date,
// //                 Planning_style: userPreferences.planning_style,
// //             });
            
// //             const newAdventureId = adventureResponse.data.adventures.slice(-1)[0]._id;

// //             const fullPlan = {
// //                 place,
// //                 itinerary: itineraryData.itinerary,
// //                 safety: enhancements.safety,
// //                 packing: enhancements.packing,
// //                 budget: enhancements.budget,
// //                 transport: enhancements.transport,
// //                 accommodation: enhancements.accommodation,
// //             };

// //             await authApi.updateAdventureOutput(newAdventureId, fullPlan);
            
// //             setSaveMessage('Trip saved successfully to your profile!');
// //         } catch (error) {
// //             console.error("Failed to save trip:", error);
// //             setSaveMessage('Error: Could not save trip.');
// //         } finally {
// //             setIsSaving(false);
// //         }
// //     };

// //     if (!itineraryData?.itinerary) {
// //         return (
// //             <div className="page-container itinerary-container">
// //                 <Navbar />
// //                 <GlowingStarsBackground />
// //                 <div className="itinerary-wrapper" style={{ zIndex: 1, textAlign: 'center' }}>
// //                     <h2 className="itinerary-title error-title">Itinerary Data Missing</h2>
// //                     <p className="selection-subtitle">We can't display the itinerary. Please start over.</p>
// //                     <Link to="/" className="form-submit-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>Go to Homepage</Link>
// //                 </div>
// //             </div>
// //         );
// //     }

// //     const tabs = ['Itinerary', 'Safety', 'Packing', 'Budget', 'Logistics'];

// //     const renderContent = () => {
// //         switch (activeTab) {
// //             case 'Itinerary':
// //                 return <ItineraryTimeline itineraryData={itineraryData} />;
// //             case 'Safety':
// //                 return <SafetyInfo data={enhancements.safety} />;
// //             case 'Packing':
// //                 return <PackingList data={enhancements.packing} />;
// //             case 'Budget':
// //                 return <BudgetView data={enhancements.budget} />;
// //             case 'Logistics':
// //                 return <Logistics transportData={enhancements.transport} accommodationData={enhancements.accommodation} />;
// //             default:
// //                 return null;
// //         }
// //     };
    
// //     return (
// //         <>
// //             <Navbar />
// //             <div className="page-container itinerary-container">
// //                 <GlowingStarsBackground />
// //                 <motion.div className="itinerary-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
// //                     <div className="itinerary-header">
// //                         <h1 className="itinerary-title">Your Trip Dashboard for {place}</h1>
// //                         {isAuthenticated && (
// //                             <button onClick={handleSaveTrip} className="save-trip-button" disabled={isSaving}>
// //                                 {isSaving ? 'Saving...' : 'Save Trip to Profile'}
// //                             </button>
// //                         )}
// //                     </div>
// //                     <p className="itinerary-subtitle">Here is your complete, AI-generated travel plan.</p>
// //                     {saveMessage && <p className="save-message">{saveMessage}</p>}
                    
// //                     <div className="dashboard-tabs">
// //                         {tabs.map(tab => (
// //                             <button key={tab} className={`tab-button ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
// //                                 {tab}
// //                                 {activeTab === tab && <motion.div className="active-tab-underline" layoutId="underline" />}
// //                             </button>
// //                         ))}
// //                     </div>

// //                     <div className="dashboard-content">
// //                         <AnimatePresence mode="wait">
// //                             <motion.div
// //                                 key={activeTab}
// //                                 initial={{ y: 10, opacity: 0 }}
// //                                 animate={{ y: 0, opacity: 1 }}
// //                                 exit={{ y: -10, opacity: 0 }}
// //                                 transition={{ duration: 0.2 }}
// //                             >
// //                                 {loading ? <MultiStepLoader loading={loading} /> : renderContent()}
// //                             </motion.div>
// //                         </AnimatePresence>
// //                     </div>
// //                 </motion.div>
// //             </div>
// //         </>
// //     );
// // };

// // export default Itinerary;

// import React, { useState, useEffect } from 'react';
// import { useLocation, Link } from 'react-router-dom';
// import './Itinerary.css';
// import Navbar from '../../components/Navbar/Navbar';
// import GlowingStarsBackground from '../../components/GlowingStarsBackground/GlowingStarsBackground';
// import MultiStepLoader from '../../components/MultiStepLoader/MultiStepLoader';
// import { motion, AnimatePresence } from 'framer-motion';
// import ItineraryTimeline from './components/ItineraryTimeline';
// import SafetyInfo from './components/SafetyInfo';
// import PackingList from './components/PackingList';
// import BudgetView from './components/BudgetView';
// import Logistics from './components/Logistics';
// import { mlApi, authApi } from '../../services/api';
// import { useAuth } from '../../context/AuthContext';

// const Itinerary = () => {
//     const location = useLocation();
//     const { isAuthenticated } = useAuth();
//     const [activeTab, setActiveTab] = useState('Itinerary');
//     const [loading, setLoading] = useState(true);
//     const [isSaving, setIsSaving] = useState(false);
//     const [saveMessage, setSaveMessage] = useState('');
//     const [enhancements, setEnhancements] = useState({
//         safety: null, packing: null, budget: null, transport: null, accommodation: null
//     });

//     const itineraryData = location.state?.itineraryData;
//     const place = location.state?.place;
//     const userPreferences = location.state?.userPreferences;
//     const suggestions = location.state?.suggestions; // Make sure to pass suggestions to this page

//     useEffect(() => {
//         if (!userPreferences || !place) {
//             setLoading(false);
//             return;
//         }
//         const fetchAllEnhancements = async () => {
//             try {
//                 const [safety, packing, budget, transport, accommodation] = await Promise.all([
//                     mlApi.getSafetyInfo(userPreferences, place),
//                     mlApi.getPackingList(userPreferences, place),
//                     mlApi.getBudgetBreakdown(userPreferences),
//                     mlApi.getTransportOptions(userPreferences, place),
//                     mlApi.getAccommodationSuggestions(userPreferences, place)
//                 ]);
//                 setEnhancements({
//                     safety: safety.data?.formatted,
//                     packing: packing.data?.formatted,
//                     budget: budget.data?.formatted,
//                     transport: transport.data?.formatted,
//                     accommodation: accommodation.data?.formatted
//                 });
//             } catch (error) {
//                 console.error("Failed to fetch trip enhancements:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchAllEnhancements();
//     }, [userPreferences, place]);

//     // --- NEW, SIMPLIFIED SAVE FUNCTION ---
//     const handleSaveTrip = async () => {
//         setIsSaving(true);
//         setSaveMessage('');
//         try {
//             // 1. Construct the complete trip plan object, just like trip_plan.json
//             const fullTripPlan = {
//                 preferences: userPreferences,
//                 selected_place: place,
//                 suggestions: suggestions,
//                 local_info: {
//                     top_attractions: location.state?.cityDetails?.top_attractions,
//                     local_cuisine: location.state?.cityDetails?.local_cuisine
//                 },
//                 selected_attractions: location.state?.selectedAttractions,
//                 selected_cuisines: location.state?.selectedCuisines,
//                 itinerary: itineraryData,
//                 safety: enhancements.safety,
//                 packing: enhancements.packing,
//                 budget: enhancements.budget,
//                 transport: enhancements.transport,
//                 accommodation: enhancements.accommodation,
//                 reviews: enhancements.reviews, // Assuming reviews might be added later
//             };

//             // 2. Call the new, single API endpoint to save the entire object
//             await authApi.saveAdventure(fullTripPlan);
            
//             setSaveMessage('Trip saved successfully to your profile!');
//         } catch (error) {
//             console.error("Failed to save trip:", error);
//             setSaveMessage('Error: Could not save trip.');
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     if (!itineraryData?.itinerary) {
//         return (
//             <div className="page-container itinerary-container">
//                 <Navbar /> <GlowingStarsBackground />
//                 <div className="itinerary-wrapper" style={{ zIndex: 1, textAlign: 'center' }}>
//                     <h2 className="itinerary-title error-title">Itinerary Data Missing</h2>
//                     <p className="selection-subtitle">We can't display the itinerary. Please start over.</p>
//                     <Link to="/" className="form-submit-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>Go to Homepage</Link>
//                 </div>
//             </div>
//         );
//     }

//     const tabs = ['Itinerary', 'Safety', 'Packing', 'Budget', 'Logistics'];
//     const renderContent = () => {
//         switch (activeTab) {
//             case 'Itinerary': return <ItineraryTimeline itineraryData={itineraryData} />;
//             case 'Safety': return <SafetyInfo data={enhancements.safety} />;
//             case 'Packing': return <PackingList data={enhancements.packing} />;
//             case 'Budget': return <BudgetView data={enhancements.budget} />;
//             case 'Logistics': return <Logistics transportData={enhancements.transport} accommodationData={enhancements.accommodation} />;
//             default: return null;
//         }
//     };
    
//     return (
//         <>
//             <Navbar />
//             <div className="page-container itinerary-container">
//                 <GlowingStarsBackground />
//                 <motion.div className="itinerary-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//                     <div className="itinerary-header">
//                         <h1 className="itinerary-title">Your Trip Dashboard for {place}</h1>
//                         {isAuthenticated && (
//                             <button onClick={handleSaveTrip} className="save-trip-button" disabled={isSaving}>
//                                 {isSaving ? 'Saving...' : 'Save Trip to Profile'}
//                             </button>
//                         )}
//                     </div>
//                     <p className="itinerary-subtitle">Here is your complete, AI-generated travel plan.</p>
//                     {saveMessage && <p className="save-message">{saveMessage}</p>}
//                     <div className="dashboard-tabs">{tabs.map(tab => (<button key={tab} className={`tab-button ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>{tab}{activeTab === tab && <motion.div className="active-tab-underline" layoutId="underline" />}</button>))}</div>
//                     <div className="dashboard-content"><AnimatePresence mode="wait"><motion.div key={activeTab} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.2 }}>{loading ? <MultiStepLoader loading={loading} /> : renderContent()}</motion.div></AnimatePresence></div>
//                 </motion.div>
//             </div>
//         </>
//     );
// };

// export default Itinerary;
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Itinerary.css';
import Navbar from '../../components/Navbar/Navbar';
// --- THIS LINE IS THE FIX ---
import GlowingStarsBackground from '../../components/GlowingStarsBackground/GlowingStarsBackground';
import MultiStepLoader from '../../components/MultiStepLoader/MultiStepLoader';
import { motion, AnimatePresence } from 'framer-motion';
import ItineraryTimeline from './components/ItineraryTimeline';
import SafetyInfo from './components/SafetyInfo';
import PackingList from './components/PackingList';
import BudgetView from './components/BudgetView';
import Logistics from './components/Logistics';
import { mlApi, authApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

// ... (The rest of the file is correct from the previous answer)
const Itinerary = () => {
    const location = useLocation();
    const { isAuthenticated } = useAuth();
    const [activeTab, setActiveTab] = useState('Itinerary');
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');
    const [enhancements, setEnhancements] = useState({ safety: null, packing: null, budget: null, transport: null, accommodation: null, reviews: null });
    const { itineraryData, place, userPreferences, suggestions, cityDetails, selectedAttractions, selectedCuisines } = location.state || {};

    useEffect(() => {
        if (!userPreferences || !place) { setLoading(false); return; }
        const fetchAllEnhancements = async () => {
            try {
                const [safety, packing, budget, transport, accommodation, reviews] = await Promise.all([
                    mlApi.getSafetyInfo(userPreferences, place),
                    mlApi.getPackingList(userPreferences, place),
                    mlApi.getBudgetBreakdown(userPreferences),
                    mlApi.getTransportOptions(userPreferences, place),
                    mlApi.getAccommodationSuggestions(userPreferences, place),
                    mlApi.getReviews(userPreferences, place)
                ]);
                setEnhancements({
                    safety: safety.data?.formatted,
                    packing: packing.data?.formatted,
                    budget: budget.data?.formatted,
                    transport: transport.data?.formatted,
                    accommodation: accommodation.data?.formatted,
                    reviews: reviews.data?.formatted
                });
            } catch (error) { console.error("Failed to fetch trip enhancements:", error);
            } finally { setLoading(false); }
        };
        fetchAllEnhancements();
    }, [userPreferences, place]);

    const handleSaveTrip = async () => {
        setIsSaving(true);
        setSaveMessage('');
        try {
            const fullTripPlan = {
                preferences: userPreferences,
                selected_place: place,
                suggestions: suggestions,
                local_info: cityDetails,
                selected_attractions: selectedAttractions,
                selected_cuisines: selectedCuisines,
                itinerary: itineraryData,
                safety: enhancements.safety,
                packing: enhancements.packing,
                budget: enhancements.budget,
                transport: enhancements.transport,
                accommodation: enhancements.accommodation,
                reviews: enhancements.reviews,
            };
            await authApi.saveAdventure(fullTripPlan);
            setSaveMessage('Trip saved successfully to your profile!');
        } catch (error) {
            console.error("Failed to save trip:", error);
            setSaveMessage('Error: Could not save trip.');
        } finally {
            setIsSaving(false);
        }
    };

    if (!itineraryData?.itinerary) {
        return ( <div className="page-container itinerary-container"><Navbar /> <GlowingStarsBackground /><div className="itinerary-wrapper" style={{ zIndex: 1, textAlign: 'center' }}><h2 className="itinerary-title error-title">Itinerary Data Missing</h2><p className="selection-subtitle">We can't display the itinerary. Please start over.</p><Link to="/" className="form-submit-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>Go to Homepage</Link></div></div> );
    }

    const tabs = ['Itinerary', 'Safety', 'Packing', 'Budget', 'Logistics'];
    const renderContent = () => {
        switch (activeTab) {
            case 'Itinerary': return <ItineraryTimeline itineraryData={itineraryData} />;
            case 'Safety': return <SafetyInfo data={enhancements.safety} />;
            case 'Packing': return <PackingList data={enhancements.packing} />;
            case 'Budget': return <BudgetView data={enhancements.budget} />;
            case 'Logistics': return <Logistics transportData={enhancements.transport} accommodationData={enhancements.accommodation} />;
            default: return null;
        }
    };
    
    return (
        <><Navbar /><div className="page-container itinerary-container"><GlowingStarsBackground /><motion.div className="itinerary-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><div className="itinerary-header"><h1 className="itinerary-title">Your Trip Dashboard for {place}</h1>{isAuthenticated && ( <button onClick={handleSaveTrip} className="save-trip-button" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save Trip to Profile'}</button> )}</div><p className="itinerary-subtitle">Here is your complete, AI-generated travel plan.</p>{saveMessage && <p className="save-message">{saveMessage}</p>}<div className="dashboard-tabs">{tabs.map(tab => (<button key={tab} className={`tab-button ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>{tab}{activeTab === tab && <motion.div className="active-tab-underline" layoutId="underline" />}</button>))}</div><div className="dashboard-content"><AnimatePresence mode="wait"><motion.div key={activeTab} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.2 }}>{loading ? <MultiStepLoader loading={loading} /> : renderContent()}</motion.div></AnimatePresence></div></motion.div></div></>
    );
};
export default Itinerary;