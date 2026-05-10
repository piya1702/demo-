import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import { CheckSquare, Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const Checklist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Assume trip data fetch
  const [items, setItems] = useState([
    { id: '1', text: 'Passport and Visa', packed: true },
    { id: '2', text: 'Sunscreen', packed: false },
    { id: '3', text: 'Phone Charger & Adapter', packed: false },
  ]);
  const [newItem, setNewItem] = useState('');

  const handleAdd = () => {
    if (!newItem) return;
    setItems([...items, { id: uuidv4(), text: newItem, packed: false }]);
    setNewItem('');
  };

  const togglePacked = (itemId) => {
    setItems(items.map(i => i.id === itemId ? { ...i, packed: !i.packed } : i));
  };

  const remove = (itemId) => {
    setItems(items.filter(i => i.id !== itemId));
  };

  return (
    <div className="animate-fade-in container" style={{ maxWidth: '600px' }}>
      <button className="btn btn-secondary" onClick={() => navigate(`/trips/${id}/itinerary`)} style={{ marginBottom: '2rem' }}>
        Back to Itinerary
      </button>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h2 className="text-gradient" style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckSquare /> Packing List
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Ensure you have everything before heading to the airport.</p>
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <input 
            type="text" 
            className="input-field" 
            placeholder="Add a new item..." 
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
          />
          <button className="btn btn-primary" onClick={handleAdd}>
            <Plus size={16} /> Add
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {items.map((item) => (
            <div key={item.id} className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }} onClick={() => togglePacked(item.id)}>
                <div style={{ 
                  width: '20px', height: '20px', borderRadius: '4px', 
                  border: item.packed ? 'none' : '1px solid var(--border-light)',
                  background: item.packed ? 'var(--accent-teal)' : 'rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {item.packed && <CheckSquare size={14} color="white" />}
                </div>
                <span style={{ textDecoration: item.packed ? 'line-through' : 'none', color: item.packed ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                  {item.text}
                </span>
              </div>
              <button style={{ background: 'none', border: 'none', color: 'var(--accent-coral)', cursor: 'pointer' }} onClick={() => remove(item.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Checklist;
