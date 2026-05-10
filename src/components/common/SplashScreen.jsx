import React, { useEffect, useState } from 'react';
import { Plane } from 'lucide-react';

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000); // 3 seconds total to match flight

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      overflow: 'hidden'
    }} className="animate-shimmer">
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="animate-airplane" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
          <Plane size={250} color="var(--accent-teal)" />
        </div>
        
        <h1 className="text-gradient" style={{ 
          fontSize: '4rem', 
          fontWeight: '800',
          letterSpacing: '4px',
          animation: 'fadeIn 2s ease-out'
        }}>
          TRAVELOOP
        </h1>
        
        <p style={{ 
          color: 'var(--text-secondary)', 
          marginTop: '1rem',
          fontSize: '1.2rem',
          animation: 'fadeIn 3s ease-out'
        }}>
          Preparing your next journey...
        </p>

        {/* Loading Progress Bar */}
        <div style={{
          width: '200px',
          height: '4px',
          background: 'var(--bg-darker)',
          borderRadius: '2px',
          marginTop: '3rem',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            background: 'var(--accent-teal)',
            width: '0%',
            animation: 'loadingProgress 3s linear forwards'
          }} />
        </div>
      </div>

      <style>{`
        @keyframes loadingProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
