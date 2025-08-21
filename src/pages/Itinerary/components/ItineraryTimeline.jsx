import React from 'react';
import { motion } from 'framer-motion';

const icons = {
    travel: '🚗', spot: '📍', break: '☕', accommodation: '🏨', restaurant: '🍴', cuisine: '🍲',
};

const StepRenderer = ({ step }) => {
    switch (step.type) {
        case 'travel': return ( <div className="step-content"> <strong>Travel from {step.from} to {step.to}</strong> <p className="step-time">Time: {step.options[0].depart_time} - {step.options[0].arrival_time}</p> <div className="options-container"> {step.options.map((opt, i) => ( <span key={i} className="option-tag"> {opt.mode} ({opt.time}, ~{opt.cost}) </span> ))} </div> </div> );
        case 'spot': return ( <div className="step-content"> <strong>Visit: {step.name}</strong> <p className="step-time">Time: {step.arrival_time} - {step.depart_time}</p> <p className="step-reason"><em>"{step.reason}"</em></p> </div> );
        case 'break': return ( <div className="step-content"> <strong>Break: {step.activity}</strong> <p className="step-time">Time: {step.arrival_time} - {step.depart_time} ({step.duration})</p> </div> );
        case 'cuisine': return ( <div className="step-content"> <strong>Local Dish: {step.dish}</strong> <p>Origin: {step.origin} | Recommended for: {step.time_to_consume}</p> </div> );
        case 'accommodation': return ( <div className="step-content"> <strong>Check-in to your Accommodation</strong> <p className="step-time">Arrival Time: {step.options[0].arrival_time}</p> <div className="options-container"> <strong>Suggestions:</strong> <ul className="options-list"> {step.options.map((opt, i) => ( <li key={i}>{opt.name} - {opt.price_range}, {opt.rating} ⭐</li> ))} </ul> </div> </div> );
        case 'restaurant': return ( <div className="step-content"> <strong>Dine at: {step.options[0].name}</strong> <p className="step-time">Time: {step.options[0].arrival_time} - {step.options[0].depart_time}</p> <div className="options-container"> <strong>Cuisines: </strong> {step.options[0].cuisines_served.map((c, i) => <span key={i} className="option-tag">{c}</span>)} </div> </div> );
        default: return <p>Unknown step in itinerary.</p>;
    }
};

const ItineraryTimeline = ({ itineraryData }) => {
    return (
        <div className="days-section">
            {(itineraryData.itinerary || []).map((day, dayIndex) => (
                <motion.div
                    key={day.day}
                    className="day-card"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: dayIndex * 0.1 }}
                >
                    <h2 className="day-title">Day {day.day}</h2>
                    <div className="timeline">
                        {day.steps.map((step, stepIndex) => (
                            <div key={stepIndex} className={`timeline-item ${step.type}`}>
                                <div className="timeline-icon">{icons[step.type] || '•'}</div>
                                <div className="timeline-content">
                                    <StepRenderer step={step} />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default ItineraryTimeline;