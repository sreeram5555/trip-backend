// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import MultiStepLoader from './MultiStepLoader/MultiStepLoader'; // A better loading indicator

// const ProtectedRoute = () => {
//     const { isAuthenticated, loading } = useAuth();

//     if (loading) {
//         // Show a full-page loader while checking auth status
//         return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><MultiStepLoader loading={true} /></div>;
//     }

//     return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MultiStepLoader from './MultiStepLoader/MultiStepLoader';

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <MultiStepLoader loading={true} />
            </div>
        );
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;