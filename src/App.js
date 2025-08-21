// import React from 'react';
// // We no longer need to import BrowserRouter here
// import { Route, Routes } from 'react-router-dom';
// import Home from './pages/Home/Home';
// import UserPreferencesForm from './pages/UserPreferencesForm/UserPreferencesForm';
// import CitySelection from './pages/CitySelection/CitySelection';
// import SpotCuisineSelection from './pages/SpotCuisineSelection/SpotCuisineSelection';
// import Itinerary from './pages/Itinerary/Itinerary';
// import Login from './pages/Auth/Login';
// import Signup from './pages/Auth/Signup';
// import VerifyEmail from './pages/Auth/VerifyEmail';
// import Profile from './pages/Profile/Profile';
// import ProtectedRoute from './components/ProtectedRoute';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/verify-email" element={<VerifyEmail />} />
        
//         {/* Protected Routes */}
//         <Route element={<ProtectedRoute />}>
//           <Route path="/book-a-trip" element={<UserPreferencesForm />} />
//           <Route path="/select-city" element={<CitySelection />} />
//           <Route path="/select-spots" element={<SpotCuisineSelection />} />
//           <Route path="/itinerary" element={<Itinerary />} />
//           <Route path="/profile" element={<Profile />} />
//         </Route>
//       </Routes>
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import UserPreferencesForm from './pages/UserPreferencesForm/UserPreferencesForm';
import CitySelection from './pages/CitySelection/CitySelection';
import SpotCuisineSelection from './pages/SpotCuisineSelection/SpotCuisineSelection';
import Itinerary from './pages/Itinerary/Itinerary';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import VerifyEmail from './pages/Auth/VerifyEmail';
import Profile from './pages/Profile/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/book-a-trip" element={<UserPreferencesForm />} />
          <Route path="/select-city" element={<CitySelection />} />
          <Route path="/select-spots" element={<SpotCuisineSelection />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;