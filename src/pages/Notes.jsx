import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, Plus } from 'lucide-react';

const Notes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([
    { id: 1, title: 'Hotel Reservation', text: 'Booking ref: XY892. Checkin 2PM.', date: '2026-05-10' }
  ]);

  return (
    <div className="animate-fade-in container" style={{ maxWidth: '800px' }}>
      <button className="btn btn-secondary" onClick={() => navigate(`/trips/${id}/itinerary`)} style={{ marginBottom: '2rem' }}>
        Back to Itinerary
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 className="text-gradient" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen /> Trip Journal & Notes
        </h2>
        <button className="btn btn-primary"><Plus size={16} /> New Note</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
        {notes.map(n => (
          <div key={n.id} className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h4 style={{ color: 'var(--accent-teal)' }}>{n.title}</h4>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{n.date}</span>
            </div>
            <p style={{ color: 'var(--text-primary)', lineHeight: '1.6' }}>{n.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
