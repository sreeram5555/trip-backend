import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000'; // Your FastAPI backend URL

// --- CORE WORKFLOW ---
export const generatePlaces = (preferences) => {
  return axios.post(`${API_URL}/generate`, preferences);
};

export const getLocalInfo = (preferences, selected_place) => {
  return axios.post(`${API_URL}/local-info`, { preferences, selected_place });
};

export const getSchedule = (preferences, selected_place, selected_attractions, selected_cuisines) => {
  const attractionNames = selected_attractions.map(att => att.name);
  const cuisineNames = selected_cuisines.map(cui => cui.dish);
  return axios.post(`${API_URL}/schedule-trip`, {
    preferences,
    selected_place,
    selected_attractions: attractionNames,
    selected_cuisines: cuisineNames,
  });
};

// --- NEW ENHANCEMENT ENDPOINTS ---
export const getSafetyInfo = (preferences, selected_place) => {
  return axios.post(`${API_URL}/safety-info`, { preferences, selected_place });
};

export const getPackingList = (preferences, selected_place) => {
  return axios.post(`${API_URL}/packing-list`, { preferences, selected_place });
};

export const getBudgetBreakdown = (preferences) => {
  // This endpoint only needs preferences
  return axios.post(`${API_URL}/budget-breakdown`, { preferences });
};

export const getTransportOptions = (preferences, selected_place) => {
  return axios.post(`${API_URL}/transport-options`, { preferences, selected_place });
};

export const getAccommodationSuggestions = (preferences, selected_place) => {
  return axios.post(`${API_URL}/accommodation-suggestions`, { preferences, selected_place });
};