import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../../services/api';
import Navbar from '../../components/Navbar/Navbar';
// --- THIS LINE IS THE FIX ---
import GlowingStarsBackground from '../../components/GlowingStarsBackground/GlowingStarsBackground';
import { motion } from 'framer-motion';
import './Auth.css';

// ... (rest of the component is unchanged and correct)
const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await authApi.register(formData);
            if (response.data.success) {
                navigate('/verify-email', { state: { email: formData.email } });
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="auth-page-container">
            <Navbar />
            <GlowingStarsBackground />
            <motion.div className="auth-wrapper" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="auth-title">Create Your Account</h1>
                <p className="selection-subtitle" style={{marginTop: '-2rem', marginBottom: '2rem'}}>Join RoamAI to start planning and saving your perfect trips.</p>
                <form onSubmit={handleSubmit} className="auth-form">
                    <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required minLength="6" />
                    <button type="submit" className="auth-button" disabled={loading}>{loading ? 'Creating Account...' : 'Sign Up'}</button>
                    {error && <p className="error-message">{error}</p>}
                </form>
                <p className="auth-link">Already have an account? <Link to="/login">Login</Link></p>
            </motion.div>
        </div>
    );
};
export default Signup;