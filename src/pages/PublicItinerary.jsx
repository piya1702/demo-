import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import { Plane, Compass, Calendar, MapPin } from 'lucide-react';

const PublicItinerary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { trips } = useTravel();
  const trip = trips.find(t => t.id === id);

  if (!trip) return (
    <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-muted)' }}>
      <h2>Trip Not Found</h2>
      <button className="btn btn-primary" onClick={() => navigate('/')} style={{ marginTop: '1rem' }}>Return Home</button>
    </div>
  );

  return (
    <div className="animate-fade-in" style={{ padding: '0', margin: '-6rem 0 0 0' }}>
      {/* Hero Banner */}
      <div style={{ 
        height: '60vh', 
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        background: `linear-gradient(to top, var(--bg-darker) 10%, rgba(0,0,0,0.3)), url(${trip.coverPhoto}) center/cover`,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        paddingBottom: '4rem', textAlign: 'center'
      }}>
        <div className="glass-panel" style={{ padding: '2rem 4rem', backdropFilter: 'blur(16px)' }}>
          <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>{trip.name}</h1>
          <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: 'var(--text-primary)', fontSize: '1.2rem' }}>
            <span><Calendar size={18} style={{ display: 'inline', verticalAlign: 'text-bottom' }}/> {new Date(trip.startDate).toLocaleDateString()}</span>
            <span>&bull;</span>
            <span><MapPin size={18} style={{ display: 'inline', verticalAlign: 'text-bottom' }}/> {trip.stops?.length || 0} Stops</span>
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '2rem', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <div style={{ textAlign: 'center', padding: '0 2rem' }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>"{trip.description}"</p>
        </div>

        {trip.stops?.map((stop, idx) => (
          <div key={stop.id} className="glass-card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '2rem', color: 'var(--accent-teal)', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginRight: '0.5rem' }}>Stop {idx + 1}:</span> 
              {stop.city}
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Staying for {stop.days} days</p>
            
            <div style={{ borderLeft: '2px solid var(--border-light)', paddingLeft: '1.5rem', marginLeft: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                  <p style={{ fontWeight: '500' }}>Explore {stop.city}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>A wonderful time visiting key local attractions.</p>
               </div>
            </div>
          </div>
        ))}

        <div style={{ textAlign: 'center', padding: '4rem 0', borderTop: '1px solid var(--border-light)', marginTop: '2rem' }}>
          <Plane color="var(--accent-blue)" size={32} style={{ marginBottom: '1rem' }} />
          <h3>Inspired by this trip?</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Create your own personalized itinerary with Traveloop.</p>
          <button className="btn btn-primary" onClick={() => navigate('/auth')}>Start Planning</button>
        </div>
      </div>
    </div>
  );
};

export default PublicItinerary;
