import React from 'react';

export const SearchRobot: React.FC = () => {
  return (
    <div style={{
      width: 220,
      height: 280,
      backgroundColor: '#f8fafc',
      border: '3px solid #334155',
      borderRadius: 24,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 16,
      boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
      position: 'relative'
    }}>
      {/* Brand Header */}
      <div style={{
        backgroundColor: '#1e293b',
        color: '#fff',
        borderRadius: 8,
        padding: '6px 12px',
        fontWeight: 'bold',
        fontSize: 16,
        display: 'flex',
        gap: 2
      }}>
        <span style={{ color: '#4285F4' }}>G</span>
        <span style={{ color: '#EA4335' }}>o</span>
        <span style={{ color: '#FBBC05' }}>o</span>
        <span style={{ color: '#4285F4' }}>g</span>
        <span style={{ color: '#34A853' }}>l</span>
        <span style={{ color: '#EA4335' }}>e</span>
        <span style={{ fontSize: 12, color: '#94a3b8', marginLeft: 4 }}>BOT</span>
      </div>

      {/* Sensor Eye */}
      <div style={{
        width: 60,
        height: 60,
        borderRadius: '50%',
        backgroundColor: '#2563eb',
        border: '4px solid #1e293b',
        marginTop: 20,
        boxShadow: '0 0 20px rgba(37, 99, 235, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: '#ffffff' }} />
      </div>

      {/* Intake Conveyor Tray */}
      <div style={{
        position: 'absolute',
        bottom: -20,
        left: -30,
        width: 140,
        height: 36,
        backgroundColor: '#334155',
        borderRadius: 8,
        border: '2px solid #0f172a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#10b981',
        fontWeight: 'bold',
        fontSize: 12
      }}>
        INTAKE TRAY
      </div>
    </div>
  );
};
