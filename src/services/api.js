import axios from 'axios';

// --- Axios Instance for the Node.js Auth/Data Backend (Port 5000) ---
// const authApiClient = axios.create({
//     // baseURL: 'http://localhost:5000/api',
//      baseURL: 'https://trip-project-2.onrender.com/',
//     withCredentials: true,
// });



const authApiClient = axios.create({
  baseURL: "https://trip-backend-1-db3t.onrender.com/api",
  withCredentials: true,
});




export default authApiClient;



// --- Axios Instance for the Python ML Backend (Port 8000) ---
const mlApiClient = axios.create({
    // baseURL: 'http://localhost:8000',
    baseURL: 'https://travelagent-agentic-ai.onrender.com',
});

// ===================================================================
// AUTH & DATA API (Node.js @ Port 5000)
// ===================================================================
// In src/services/api.js...

// ===================================================================
// AUTH & DATA API (Node.js @ Port 5000)
// ===================================================================
export const authApi = {
    // Auth endpoints are unchanged
    register: (userData) => authApiClient.post('/auth/register', userData),
    verifyEmail: (data) => authApiClient.post('/auth/verify-email', data),
    resendOtp: (data) => authApiClient.post('/auth/resend-otp', data),
    login: (credentials) => authApiClient.post('/auth/login', credentials),
    logout: () => authApiClient.post('/auth/logout'),
    getMe: () => authApiClient.get('/auth/me'),

    // --- NEW, SIMPLIFIED ADVENTURE ENDPOINTS ---
    saveAdventure: (tripPlan) => authApiClient.post('/adventure/save', { tripPlan }),
    getMyAdventures: () => authApiClient.get('/adventure/my'),
};

// ===================================================================
// MACHINE LEARNING API (Python @ Port 8000)
// ===================================================================
export const mlApi = {
    generatePlaces: (preferences) => mlApiClient.post('/generate', preferences),
    getLocalInfo: (preferences, selected_place) => mlApiClient.post('/local-info', { preferences, selected_place }),
    getSchedule: (preferences, selected_place, selected_attractions, selected_cuisines) => {
        const attractionNames = selected_attractions.map(att => att.name);
        const cuisineNames = selected_cuisines.map(cui => cui.dish);
        return mlApiClient.post('/schedule-trip', {
            preferences,
            selected_place,
            selected_attractions: attractionNames,
            selected_cuisines: cuisineNames,
        });
    },
    getSafetyInfo: (preferences, selected_place) => mlApiClient.post('/safety-info', { preferences, selected_place }),
    getPackingList: (preferences, selected_place) => mlApiClient.post('/packing-list', { preferences, selected_place }),
    getBudgetBreakdown: (preferences) => mlApiClient.post('/budget-breakdown', { preferences }),
    getTransportOptions: (preferences, selected_place) => mlApiClient.post('/transport-options', { preferences, selected_place }),
    getAccommodationSuggestions: (preferences, selected_place) => mlApiClient.post('/accommodation-suggestions', { preferences, selected_place }),
    getReviews: (preferences, selected_place) => mlApiClient.post('/reviews', { preferences, selected_place }),
};