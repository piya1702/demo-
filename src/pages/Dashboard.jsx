import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import { Plus, MapPin, Calendar, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const { user, trips } = useTravel();
  const navigate = useNavigate();

  const upcomingTrips = trips.filter(t => new Date(t.startDate) >= new Date()).slice(0, 3);

  return (
    <div className="animate-fade-in">
      <header style={styles.header}>
        <div>
          <h1 className="text-gradient">Welcome back, {user?.name || 'Traveler'}</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Where is your next adventure taking you?
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/trips/new')}>
          <Plus size={18} /> Plan New Trip
        </button>
      </header>

      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h3>Upcoming Trips</h3>
          {upcomingTrips.length > 0 && (
            <button style={styles.viewAllBtn} onClick={() => navigate('/trips')}>
              View All <ArrowRight size={16} />
            </button>
          )}
        </div>
        
        {upcomingTrips.length === 0 ? (
          <div className="glass-card" style={styles.emptyState}>
             <MapPin size={48} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
             <h4>No upcoming trips</h4>
             <p style={{ color: 'var(--text-secondary)' }}>You haven't planned any future adventures yet.</p>
             <button className="btn btn-secondary" style={{ marginTop: '1rem' }} onClick={() => navigate('/trips/new')}>
               Start Planning
             </button>
          </div>
        ) : (
          <div style={styles.grid}>
            {upcomingTrips.map(trip => (
              <div key={trip.id} className="glass-card" style={styles.tripCard} onClick={() => navigate(`/trips/${trip.id}/itinerary`)}>
                <div style={{...styles.cardImage, backgroundImage: `url(${trip.coverPhoto})`}} />
                <div style={styles.cardContent}>
                  <h4>{trip.name}</h4>
                  <div style={styles.cardMeta}>
                    <Calendar size={14} /> 
                    <span>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
                  </div>
                  <p style={styles.cardDesc}>{trip.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section style={styles.section}>
         <h3>Popular Destinations</h3>
         <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Get inspired for your next journey.</p>
         <div style={styles.grid}>
             {[
               { name: 'Kerala, India', img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop' },
               { name: 'Rajasthan, India', img: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800&auto=format&fit=crop' },
               { name: 'Tokyo, Japan', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop' }
             ].map((dest, i) => (
                <div key={i} className="glass-card stagger-1" style={{...styles.tripCard, cursor: 'pointer', display: 'flex', flexDirection: 'column'}} onClick={() => navigate('/search/cities')}>
                   <div style={{...styles.cardImage, backgroundImage: `url(${dest.img})`, height: '160px'}} />
                   <div style={styles.cardContent}>
                      <h4>{dest.name}</h4>
                   </div>
                </div>
             ))}
         </div>
      </section>
    </div>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '3rem',
  },
  section: {
    marginBottom: '4rem',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  viewAllBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    background: 'none',
    border: 'none',
    color: 'var(--accent-teal)',
    cursor: 'pointer',
    fontWeight: '500',
    fontFamily: 'inherit',
    fontSize: '0.9rem',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem 2rem',
    textAlign: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  tripCard: {
    overflow: 'hidden',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s',
  },
  cardImage: {
    height: '140px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  cardContent: {
    padding: '1.25rem',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  cardMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'var(--text-muted)',
    fontSize: '0.875rem',
  },
  cardDesc: {
    color: 'var(--text-secondary)',
    fontSize: '0.875rem',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  }
};

export default Dashboard;
