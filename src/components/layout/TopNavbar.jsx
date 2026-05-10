import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTravel } from '../../context/TravelContext';
import { Plane, Compass, LayoutDashboard, Settings, LogOut, Search } from 'lucide-react';

const TopNavbar = () => {
  const { user, logout } = useTravel();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <nav style={styles.nav} className="glass-panel">
      <div style={styles.container}>
        <div style={styles.logo} onClick={() => navigate('/dashboard')}>
          <Plane color="var(--accent-teal)" size={28} />
          <span className="text-gradient">Traveloop</span>
        </div>
        
        <div style={styles.links}>
          <NavLink to="/dashboard" style={({isActive}) => isActive ? styles.activeLink : styles.link}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
          <NavLink to="/trips" style={({isActive}) => isActive ? styles.activeLink : styles.link}>
            <Compass size={18} /> My Trips
          </NavLink>
          <NavLink to="/search/cities" style={({isActive}) => isActive ? styles.activeLink : styles.link}>
            <Search size={18} /> Discover
          </NavLink>
        </div>

        <div style={styles.userSection}>
          <span style={styles.userName}>Hello, {user?.name || 'Traveler'}</span>
          <button style={styles.iconBtn} onClick={() => navigate('/settings')}>
            <Settings size={20} />
          </button>
          <button style={styles.iconBtn} onClick={handleLogout} title="Logout">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 50,
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderRadius: 0,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.5rem',
    fontWeight: '700',
    cursor: 'pointer',
  },
  links: {
    display: 'flex',
    gap: '2rem',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.2s',
  },
  activeLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'var(--accent-teal)',
    textDecoration: 'none',
    fontWeight: '600',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  userName: {
    color: 'var(--text-primary)',
    fontWeight: '500',
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'color 0.2s',
  }
};

export default TopNavbar;
