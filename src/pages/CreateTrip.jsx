import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';

const CreateTrip = () => {
  const { addTrip } = useTravel();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    destinationState: '',
    startDate: '',
    endDate: '',
    description: '',
    coverPhoto: 'https://picsum.photos/seed/travel/1200/600'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = addTrip(formData);
    navigate(`/trips/${newId}/builder`);
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <button 
        style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginBottom: '2rem' }}
        onClick={() => navigate('/dashboard')}
      >
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <div className="glass-panel" style={{ padding: '3rem' }}>
        <h2 className="text-gradient" style={{ marginBottom: '2rem' }}>Design Your Next Journey</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="input-group">
              <label className="input-label">Trip Name</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="e.g. Summer in Europe" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                required 
              />
            </div>
            
            <div className="input-group">
              <label className="input-label">Destination State / Country</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="e.g. California, US" 
                value={formData.destinationState}
                onChange={e => {
                  const dest = e.target.value;
                  setFormData({
                    ...formData, 
                    destinationState: dest,
                    coverPhoto: `https://picsum.photos/seed/${encodeURIComponent(dest || 'travel')}/1200/600`
                  });
                }}
                required 
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="input-group">
              <label className="input-label">Start Date</label>
              <input 
                type="date" 
                className="input-field" 
                value={formData.startDate}
                onChange={e => setFormData({...formData, startDate: e.target.value})}
                required 
              />
            </div>
            <div className="input-group">
              <label className="input-label">End Date</label>
              <input 
                type="date" 
                className="input-field" 
                value={formData.endDate}
                onChange={e => setFormData({...formData, endDate: e.target.value})}
                required 
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Description / Goal</label>
            <textarea 
              className="input-field" 
              rows={3}
              placeholder="What's the main purpose of this trip?"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="input-group" style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div 
                style={{
                  width: '100%', height: '180px', borderRadius: 'var(--radius-sm)', 
                  background: `url(${formData.coverPhoto}) center/cover no-repeat`,
                  border: '1px solid var(--border-light)', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backgroundTransition: 'background 0.5s ease'
                }}
              >
                  {!formData.coverPhoto && <ImageIcon color="var(--text-muted)" size={48} />}
              </div>
              <input 
                type="url" 
                className="input-field" 
                placeholder="Or paste a custom image URL here..." 
                value={formData.coverPhoto}
                onChange={e => setFormData({...formData, coverPhoto: e.target.value})}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Start Building Itinerary</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTrip;
