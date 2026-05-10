import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import { v4 as uuidv4 } from 'uuid';
import { Plus, GripVertical, Trash2, Map, Calendar, ArrowRight, Save } from 'lucide-react';

const ItineraryBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { trips, updateTrip } = useTravel();
  const trip = trips.find(t => t.id === id);

  const [stops, setStops] = useState(trip?.stops || []);
  const [newCity, setNewCity] = useState('');
  const [newDays, setNewDays] = useState(1);

  if (!trip) return <div>Trip not found</div>;

  const handleAddStop = () => {
    if (!newCity.trim()) return;
    const newStop = {
      id: uuidv4(),
      city: newCity,
      days: Number(newDays),
      activities: []
    };
    setStops([...stops, newStop]);
    setNewCity('');
    setNewDays(1);
  };

  const handleRemoveStop = (stopId) => {
    setStops(stops.filter(s => s.id !== stopId));
  };

  const handleSave = () => {
    updateTrip(id, { stops });
    navigate(`/trips/${id}/itinerary`);
  };

  return (
    <div className="animate-fade-in container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 className="text-gradient">Builder: {trip.name}</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Add stops and allocate days for your journey.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
           <button className="btn btn-secondary" onClick={() => navigate(`/trips/${id}/itinerary`)}>View Plan</button>
           <button className="btn btn-primary" onClick={handleSave}>
             <Save size={16} /> Save & Preview
           </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
        {/* Left Col: Stops Timeline */}
        <div className="glass-panel" style={{ padding: '2rem', minHeight: '60vh' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Map size={20} color="var(--accent-teal)" /> Route Timeline
          </h3>

          {stops.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
              No stops added yet. Add your first destination!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {stops.map((stop, index) => (
                <div key={stop.id} className="glass-card stagger-1" style={{ display: 'flex', alignItems: 'center', padding: '1rem', gap: '1rem' }}>
                  <GripVertical size={20} color="var(--text-muted)" style={{ cursor: 'grab' }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '1.1rem' }}>{index + 1}. {stop.city}</h4>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      <Calendar size={12} style={{ display: 'inline', marginRight: '4px' }}/> 
                      {stop.days} Day{stop.days > 1 ? 's' : ''}
                    </span>
                  </div>
                  <button style={{ background: 'none', border: 'none', color: 'var(--accent-coral)', cursor: 'pointer', padding: '0.5rem' }} onClick={() => handleRemoveStop(stop.id)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Col: Add Stop Tool */}
        <div>
          <div className="glass-panel" style={{ padding: '2rem', position: 'sticky', top: '100px' }}>
            <h4 style={{ marginBottom: '1rem' }}>Add Destination</h4>
            
            <div className="input-group">
              <label className="input-label">City / Location</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="e.g. Paris"
                value={newCity}
                onChange={e => setNewCity(e.target.value)}
              />
            </div>
            
            <div className="input-group">
              <label className="input-label">Number of Days</label>
              <input 
                type="number" 
                min="1"
                className="input-field" 
                value={newDays}
                onChange={e => setNewDays(e.target.value)}
              />
            </div>

            <button 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '1rem' }}
              onClick={handleAddStop}
            >
              <Plus size={18} /> Add Stop
            </button>
            
            <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
               <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                 Need inspiration? <br/>
                 <button style={{ background: 'none', border: 'none', color: 'var(--accent-blue)', cursor: 'pointer', marginTop: '0.5rem', fontWeight: '500' }} onClick={() => navigate('/search/cities')}>
                   Browse Destinations <ArrowRight size={14} />
                 </button>
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryBuilder;
