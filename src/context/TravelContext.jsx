import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { generateStops } from '../utils/itineraryGenerator';

const TravelContext = createContext();

export const useTravel = () => useContext(TravelContext);

export const TravelProvider = ({ children }) => {
  // --- MOCK DATABASE ---

  // 1. User Auth State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('traveloop_user');
    return saved ? JSON.parse(saved) : null;
  });

  // 1b. Security Registry
  const [userRegistry, setUserRegistry] = useState(() => {
    const saved = localStorage.getItem('traveloop_registry');
    return saved ? JSON.parse(saved) : [];
  });

  // 2. Trips List
  const [trips, setTrips] = useState(() => {
    const saved = localStorage.getItem('traveloop_trips');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('traveloop_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('traveloop_registry', JSON.stringify(userRegistry));
  }, [userRegistry]);

  useEffect(() => {
    localStorage.setItem('traveloop_trips', JSON.stringify(trips));
  }, [trips]);

  // Login / Signup Security Mock
  const signup = (email, password) => {
    const existing = userRegistry.find(u => u.email === email);
    if (existing) {
      return { success: false, error: "Email is already registered." };
    }
    // Simulate hashing the password
    const hashedPassword = btoa(password + "salt123"); 
    const newUser = { id: uuidv4(), email, passwordHash: hashedPassword, name: email.split('@')[0] };
    setUserRegistry(prev => [...prev, newUser]);
    setUser({ id: newUser.id, email: newUser.email, name: newUser.name });
    return { success: true };
  };

  const login = (email, password) => {
    const existing = userRegistry.find(u => u.email === email);
    if (!existing) {
      return { success: false, error: "No account found with this email." };
    }
    // Verify hash
    const inputHash = btoa(password + "salt123");
    if (existing.passwordHash !== inputHash) {
      return { success: false, error: "Incorrect password." };
    }
    setUser({ id: existing.id, email: existing.email, name: existing.name });
    return { success: true };
  };

  const logout = () => setUser(null);

  // Trips CRUD
  const addTrip = (tripData) => {
    // Magic Generator Logic
    const start = new Date(tripData.startDate);
    const end = new Date(tripData.endDate);
    const timeDiff = end.getTime() - start.getTime();
    let daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (daysDiff < 1 || isNaN(daysDiff)) daysDiff = 1;

    const generatedStopsList = tripData.destinationState ? 
           generateStops(tripData.destinationState, daysDiff) : [];

    const newTrip = {
      id: uuidv4(),
      userId: user?.id,
      name: tripData.name,
      originState: tripData.destinationState || 'Unknown',
      destinationState: tripData.destinationState || 'Unknown Destination',
      startDate: tripData.startDate,
      endDate: tripData.endDate,
      description: tripData.description,
      coverPhoto: tripData.coverPhoto || `https://picsum.photos/seed/${encodeURIComponent(tripData.destinationState || 'travel')}/1200/600`,
      stops: generatedStopsList, // Use the smart generator
      activities: [], // { id, stopId, activityId, time, cost }
      checklist: [], // { id, text, isPacked, category }
      notes: [], // { id, stopId, text, timestamp }
      createdAt: new Date().toISOString()
    };
    setTrips(prev => [...prev, newTrip]);
    return newTrip.id;
  };

  const updateTrip = (id, updates) => {
    setTrips(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTrip = (id) => {
    setTrips(prev => prev.filter(t => t.id !== id));
  };

  const value = {
    user, login, logout,
    trips, addTrip,    updateTrip, 
    deleteTrip,
    setUser,
    signup
  };

  return (
    <TravelContext.Provider value={value}>
      {children}
    </TravelContext.Provider>
  );
};
