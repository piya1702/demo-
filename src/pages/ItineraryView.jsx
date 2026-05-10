import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import { Share, DollarSign, CheckSquare, Settings2, Clock, MapPin } from 'lucide-react';

const ItineraryView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { trips } = useTravel();
  const trip = trips.find(t => t.id === id);

  if (!trip) return <div>Trip not found</div>;

  return (
    <div className="animate-fade-in container">
      {/* Header Banner */}
      <div className="glass-panel" style={{ 
        position: 'relative', 
        overflow: 'hidden',
        padding: '3rem',
        marginBottom: '2rem',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'flex-end'
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: `linear-gradient(to top, var(--bg-darker) 10%, transparent), url(${trip.coverPhoto}) center/cover`,
          opacity: 0.6, zIndex: 0
        }} />
        
        <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', margin: 0 }}>{trip.name}</h1>
            {trip.destinationState && (
              <p style={{ color: 'var(--accent-teal)', fontSize: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>
                Destination: {trip.destinationState}
              </p>
            )}
            <p style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>
              {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-secondary" onClick={() => navigate(`/trips/${id}/budget`)}>
              <DollarSign size={16} /> Budget
            </button>
            <button className="btn btn-secondary" onClick={() => navigate(`/trips/${id}/checklist`)}>
              <CheckSquare size={16} /> Pack
            </button>
            <button className="btn btn-secondary" onClick={() => navigate(`/trips/${id}/builder`)}>
              <Settings2 size={16} /> Edit
            </button>
            <button className="btn btn-primary" onClick={() => navigate(`/shared/${id}`)}>
              <Share size={16} /> Share
            </button>
          </div>
        </div>
      </div>

      {/* Itinerary Timeline */}
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {trip.stops?.length === 0 ? (
          <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem' }}>
            <h4>Your itinerary is empty</h4>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Let's add some destinations to your trip.</p>
            <button className="btn btn-primary" onClick={() => navigate(`/trips/${id}/builder`)}>
              Open Builder
            </button>
          </div>
        ) : (
          trip.stops.map((stop, stopIdx) => (
            <div key={stop.id} style={{ marginBottom: '3rem' }}>
              {/* Stop Title & Meta */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white', flexShrink: 0, boxShadow: '0 4px 12px rgba(45, 212, 191, 0.3)' }}>
                  <div style={{ margin: 'auto' }}>{stopIdx + 1}</div>
                </div>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: 'var(--radius-sm)',
                  background: `url(https://picsum.photos/seed/${encodeURIComponent(stop.city)}/200/200) center/cover`,
                  border: '2px solid var(--border-light)',
                  flexShrink: 0
                }} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                    <h2 className="text-gradient" style={{ fontSize: '1.8rem', margin: 0 }}>{stop.city}</h2>
                    <span style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>({stop.days} Days)</span>
                  </div>
                </div>
              </div>
              
              <div style={{ borderLeft: '2px dashed var(--border-light)', marginLeft: '20px', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {(stop.dailyPlan ? stop.dailyPlan : Array.from({ length: stop.days })).map((dayItem, dayIdx) => (
                  <div key={dayIdx} className="glass-card stagger-1" style={{ padding: '1.5rem' }}>
                    <h4 style={{ marginBottom: '1rem', color: 'var(--accent-blue)' }}>Day {dayItem.dayNumber || dayIdx + 1}</h4>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', width: '60px' }}>
                          <Clock size={14} style={{ display: 'inline', marginRight: '4px' }} /> 10:00
                        </span>
                        <div>
                          <p style={{ fontWeight: '500' }}>{dayItem.title || `Explore ${stop.city} Center`}</p>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{dayItem.desc || `Walk around main attractions in ${stop.city}.`}</p>
                        </div>
                      </div>
                      
                      <button 
                        style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: 'var(--accent-teal)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}
                        onClick={() => navigate('/search/activities')}
                      >
                        <MapPin size={16} /> Add Activity
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ItineraryView;
