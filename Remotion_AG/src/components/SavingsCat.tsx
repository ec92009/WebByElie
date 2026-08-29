import React from 'react';

interface SavingsCatProps {
  leftPawY?: number;
  rightPawY?: number;
}

export const SavingsCatComponent: React.FC<SavingsCatProps> = ({
  leftPawY = 0,
  rightPawY = 0
}) => {
  return (
    <div style={{
      width: 280,
      height: 340,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* Head */}
      <div style={{
        width: 140,
        height: 120,
        backgroundColor: '#eab308',
        borderRadius: '70px 70px 50px 50px',
        border: '4px solid #1e293b',
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        justifyContent: 'center'
      }}>
        {/* Ears */}
        <div style={{ position: 'absolute', top: -16, left: 10, width: 0, height: 0, borderLeft: '16px solid transparent', borderRight: '16px solid transparent', borderBottom: '30px solid #eab308' }} />
        <div style={{ position: 'absolute', top: -16, right: 10, width: 0, height: 0, borderLeft: '16px solid transparent', borderRight: '16px solid transparent', borderBottom: '30px solid #eab308' }} />

        {/* Eyes */}
        <div style={{ position: 'absolute', top: 45, left: 35, width: 14, height: 14, borderRadius: '50%', backgroundColor: '#0f172a' }} />
        <div style={{ position: 'absolute', top: 45, right: 35, width: 14, height: 14, borderRadius: '50%', backgroundColor: '#0f172a' }} />

        {/* Snout */}
        <div style={{ position: 'absolute', top: 60, width: 28, height: 18, borderRadius: '50%', backgroundColor: '#fef08a' }} />
      </div>

      {/* Fat Body */}
      <div style={{
        width: 220,
        height: 220,
        backgroundColor: '#eab308',
        borderRadius: '50%',
        border: '4px solid #1e293b',
        marginTop: -30,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        {/* Cream Belly */}
        <div style={{
          width: 160,
          height: 180,
          backgroundColor: '#fef08a',
          borderRadius: '50%',
          marginTop: 20
        }} />

        {/* Navy Waistcoat */}
        <div style={{
          position: 'absolute',
          inset: 0,
          border: '40px solid #1e293b',
          borderBottom: 'none',
          borderRadius: '50% 50% 0 0',
          pointerEvents: 'none'
        }} />

        {/* Left Pocket Slot */}
        <div style={{
          position: 'absolute',
          bottom: 40,
          left: 20,
          width: 44,
          height: 30,
          backgroundColor: '#334155',
          border: '2px solid #0f172a',
          borderRadius: 6
        }} />

        {/* Right Pocket Slot */}
        <div style={{
          position: 'absolute',
          bottom: 40,
          right: 20,
          width: 44,
          height: 30,
          backgroundColor: '#334155',
          border: '2px solid #0f172a',
          borderRadius: 6
        }} />
      </div>

      {/* Bare Cream Paw Left */}
      <div style={{
        position: 'absolute',
        top: 140 - leftPawY,
        left: 0,
        width: 48,
        height: 36,
        backgroundColor: '#fef08a',
        border: '3px solid #1e293b',
        borderRadius: 18,
        zIndex: 4,
        transition: 'top 0.1s linear'
      }} />

      {/* Bare Cream Paw Right */}
      <div style={{
        position: 'absolute',
        top: 140 - rightPawY,
        right: 0,
        width: 48,
        height: 36,
        backgroundColor: '#fef08a',
        border: '3px solid #1e293b',
        borderRadius: 18,
        zIndex: 4,
        transition: 'top 0.1s linear'
      }} />
    </div>
  );
};
