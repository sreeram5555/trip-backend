import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar/Navbar';
// --- THIS LINE IS THE FIX ---
import GlowingStarsBackground from '../../components/GlowingStarsBackground/GlowingStarsBackground';
import { motion } from 'framer-motion';
import './Auth.css';

// ... (rest of the component is unchanged and correct)
const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await authApi.login(formData);
            const meResponse = await authApi.getMe();
            login(meResponse.data.user);
            navigate('/profile');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="auth-page-container">
            <Navbar />
            <GlowingStarsBackground />
            <motion.div className="auth-wrapper" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="auth-title">Welcome Back</h1>
                <p className="selection-subtitle" style={{marginTop: '-2rem', marginBottom: '2rem'}}>Login to access your saved trips and continue planning.</p>
                <form onSubmit={handleSubmit} className="auth-form">
                    <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    <button type="submit" className="auth-button" disabled={loading}>{loading ? 'Logging In...' : 'Login'}</button>
                    {error && <p className="error-message">{error}</p>}
                </form>
                <p className="auth-link">Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </motion.div>
        </div>
    );
};
export default Login;