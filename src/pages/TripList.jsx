import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import { Calendar, MapPin, Trash2, Edit2 } from 'lucide-react';

const TripList = () => {
  const { trips, deleteTrip } = useTravel();
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h2 className="text-gradient">My Trips</h2>
          <p style={{ color: 'var(--text-secondary)' }}>All your planned and past adventures.</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/trips/new')}>
          Plan New Trip
        </button>
      </div>

      {trips.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h4>No trips found</h4>
          <p style={{ color: 'var(--text-secondary)' }}>Start planning to see your trips here.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {trips.map(trip => (
            <div key={trip.id} className="glass-card" style={{ display: 'flex', overflow: 'hidden', height: '180px' }}>
              <div 
                style={{ 
                  width: '250px', 
                  background: `url(${trip.coverPhoto}) center/cover`,
                  borderRight: '1px solid var(--border-light)'
                }} 
              />
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{trip.name}</h3>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button style={styles.iconBtn} onClick={() => navigate(`/trips/${trip.id}/builder`)}>
                        <Edit2 size={18} />
                      </button>
                      <button style={{...styles.iconBtn, color: 'var(--accent-coral)'}} onClick={() => deleteTrip(trip.id)}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Calendar size={14} /> {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <MapPin size={14} /> {trip.stops?.length || 0} Stops
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{trip.description}</p>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={() => navigate(`/trips/${trip.id}/itinerary`)}>
                    View Itinerary
                  </button>
                  <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={() => navigate(`/trips/${trip.id}/budget`)}>
                    Budget Breakdowns
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  iconBtn: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid var(--border-light)',
    color: 'var(--text-primary)',
    borderRadius: 'var(--radius-sm)',
    padding: '0.5rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s'
  }
};

export default TripList;
