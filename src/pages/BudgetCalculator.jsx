import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import { IndianRupee, Plus, PieChart, Info } from 'lucide-react';

const BudgetCalculator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { trips } = useTravel();
  const trip = trips.find(t => t.id === id);

  const [expenses, setExpenses] = useState([
    { id: 1, category: 'Flights', amount: 72000, details: 'Round trip' },
    { id: 2, category: 'Accommodation', amount: 45000, details: 'Hotel 4 nights' },
    { id: 3, category: 'Food', amount: 15000, details: 'Estimated daily meals' },
    { id: 4, category: 'Activities', amount: 12500, details: 'Museums and tours' }
  ]);

  if (!trip) return <div>Trip not found</div>;

  const total = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="animate-fade-in container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
           <button className="btn btn-secondary" onClick={() => navigate(`/trips/${id}/itinerary`)}>Back</button>
           <div>
             <h2 className="text-gradient">Trip Budget</h2>
             <p style={{ color: 'var(--text-secondary)' }}>Track and estimate your expenses.</p>
           </div>
         </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem' }}>
        {/* Left Col: Overview */}
        <div className="glass-panel" style={{ padding: '2rem', height: 'fit-content' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PieChart size={20} color="var(--accent-teal)" /> Total Estimated
          </h3>
          <div style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--accent-teal)', display: 'flex', alignItems: 'center' }}>
            <IndianRupee size={32} style={{ marginRight: '4px' }} />
            {total.toLocaleString('en-IN')}
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>
            Based on {expenses.length} estimated expense categories.
          </p>

          <button className="btn btn-primary" style={{ width: '100%' }}>
            <Plus size={16} /> Add Expense
          </button>
        </div>

        {/* Right Col: Expense Details */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
           <h3 style={{ marginBottom: '1.5rem' }}>Expense Breakdown</h3>
           
           <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             {expenses.map((exp) => (
               <div key={exp.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem' }}>
                 <div>
                   <h4 style={{ fontSize: '1.1rem' }}>{exp.category}</h4>
                   <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{exp.details}</p>
                 </div>
                 <div style={{ fontSize: '1.25rem', fontWeight: '600', display: 'flex', alignItems: 'center' }}>
                   <IndianRupee size={16} />{exp.amount.toLocaleString('en-IN')}
                 </div>
               </div>
             ))}
           </div>

           <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: 'var(--radius-sm)', display: 'flex', gap: '1rem' }}>
             <Info size={24} color="var(--accent-blue)" style={{ flexShrink: 0 }} />
             <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
               Pro tip: Book flights at least 3 months in advance to save up to 20% on overall travel costs.
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetCalculator;
