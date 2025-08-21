import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { authApi } from '../../services/api';
import Navbar from '../../components/Navbar/Navbar';
// --- THIS LINE IS THE FIX ---
import GlowingStarsBackground from '../../components/GlowingStarsBackground/GlowingStarsBackground';
import { motion } from 'framer-motion';
import './Auth.css';

// ... (rest of the component is unchanged and correct)
const VerifyEmail = () => {
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    if (!email) {
        return ( <div className="auth-page-container"><Navbar /><GlowingStarsBackground /><div className="auth-wrapper"><h1 className="auth-title">Error</h1><p className="error-message">No email address was provided. Please start the signup process again.</p><p className="auth-link"><Link to="/signup">Go to Signup</Link></p></div></div> )
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);
        try {
            const response = await authApi.verifyEmail({ email, otp });
            if (response.data.success) {
                setMessage('Email verified successfully! Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Verification failed. Please check the OTP.');
        } finally {
            setLoading(false);
        }
    };
    const handleResend = async () => {
        setError('');
        setMessage('Sending new OTP...');
        try {
            await authApi.resendOtp({ email });
            setMessage('A new OTP has been sent to your email.');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to resend OTP.');
        }
    }
    return (
        <div className="auth-page-container">
            <Navbar />
            <GlowingStarsBackground />
            <motion.div className="auth-wrapper" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="auth-title">Verify Your Email</h1>
                <p className="selection-subtitle" style={{marginTop: '-2rem', marginBottom: '2rem'}}>An OTP has been sent to <strong>{email}</strong>. Please enter it below.</p>
                <form onSubmit={handleSubmit} className="auth-form">
                    <input type="text" name="otp" placeholder="Enter 6-Digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required maxLength="6" />
                    <button type="submit" className="auth-button" disabled={loading}>{loading ? 'Verifying...' : 'Verify Account'}</button>
                    {error && <p className="error-message">{error}</p>}
                    {message && <p className="success-message">{message}</p>}
                </form>
                <p className="auth-link">Didn't receive the code? <button onClick={handleResend} className="resend-otp-link">Resend OTP</button></p>
            </motion.div>
        </div>
    );
};
export default VerifyEmail;