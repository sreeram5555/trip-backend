import React from 'react';
import { motion } from 'framer-motion';
import { IconShieldCheck, IconHeartbeat, IconPhone } from '@tabler/icons-react';

const SafetyInfo = ({ data }) => {
    if (!data || Object.keys(data).length === 0) {
        return <p className="feature-placeholder">No safety information available for this destination.</p>;
    }
    return (
        <motion.div className="feature-content-wrapper">
            <h3 className="feature-title">Safety Guidance for Your Trip</h3>
            <div className="safety-grid">
                <div className="info-card"><IconShieldCheck size={28} /><h4>Overall Risk</h4><p>{data.overall_risk_level || 'N/A'}</p></div>
                <div className="info-card wide-card"><h4>Common Scams to Avoid</h4><ul>{(data.common_scams || []).map((scam, i) => <li key={i}>{scam}</li>)}</ul></div>
                <div className="info-card wide-card"><h4>Local Norms & Laws</h4><ul>{(data.local_laws_and_norms || []).map((norm, i) => <li key={i}>{norm}</li>)}</ul></div>
                <div className="info-card"><IconHeartbeat size={28} /><h4>Health Advice</h4><p><strong>Food & Water:</strong> {data.health?.food_water_safety || 'N/A'}</p><p><strong>Mosquitoes:</strong> {data.health?.mosquito_advice || 'N/A'}</p></div>
                <div className="info-card emergency"><IconPhone size={28} /><h4>Emergency Contacts</h4><ul>{data.emergency_contacts && Object.entries(data.emergency_contacts).map(([name, number]) => (<li key={name}><strong>{name.replace(/_/g, ' ').toUpperCase()}:</strong> {number}</li>))}</ul></div>
            </div>
        </motion.div>
    );
};
export default SafetyInfo;
