import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useTravel } from './context/TravelContext';

// Layout
import TopNavbar from './components/layout/TopNavbar';
import SplashScreen from './components/common/SplashScreen';

// Pages
import AuthScreen from './pages/AuthScreen';
import Dashboard from './pages/Dashboard';
import CreateTrip from './pages/CreateTrip';
import TripList from './pages/TripList';
import ItineraryBuilder from './pages/ItineraryBuilder';
import ItineraryView from './pages/ItineraryView';
import CitySearch from './pages/CitySearch';
import ActivitySearch from './pages/ActivitySearch';
import BudgetCalculator from './pages/BudgetCalculator';
import Checklist from './pages/Checklist';
import Notes from './pages/Notes';
import PublicItinerary from './pages/PublicItinerary';
import UserProfile from './pages/UserProfile';
import AdminDashboard from './pages/AdminDashboard';

const ProtectedRoute = () => {
  const { user } = useTravel();
  if (!user) return <Navigate to="/auth" />;
  return (
    <>
      <TopNavbar />
      <div className="page-wrapper container">
        <Outlet />
      </div>
    </>
  );
};

function App() {
  const [showSplash, setShowSplash] = React.useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthScreen />} />
        <Route path="/shared/:id" element={<PublicItinerary />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trips" element={<TripList />} />
          <Route path="/trips/new" element={<CreateTrip />} />
          <Route path="/trips/:id/builder" element={<ItineraryBuilder />} />
          <Route path="/trips/:id/itinerary" element={<ItineraryView />} />
          <Route path="/trips/:id/budget" element={<BudgetCalculator />} />
          <Route path="/trips/:id/checklist" element={<Checklist />} />
          <Route path="/trips/:id/notes" element={<Notes />} />
          <Route path="/search/cities" element={<CitySearch />} />
          <Route path="/search/activities" element={<ActivitySearch />} />
          <Route path="/settings" element={<UserProfile />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
