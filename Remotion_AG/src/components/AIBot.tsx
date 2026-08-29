import React from 'react';

interface AIBotProps {
  type: 'openai' | 'claude';
}

export const AIBotComponent: React.FC<AIBotProps> = ({ type }) => {
  const isOpenAI = type === 'openai';
  const color = isOpenAI ? '#0d9488' : '#d97706';
  const label = isOpenAI ? 'OPENAI' : 'CLAUDE';

  return (
    <div style={{
      width: 160,
      height: 240,
      backgroundColor: color,
      borderRadius: '80px 80px 24px 24px',
      border: '4px solid #0f172a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 16,
      boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
      position: 'relative'
    }}>
      {/* Visor Eye */}
      <div style={{
        width: 100,
        height: 32,
        backgroundColor: '#0f172a',
        borderRadius: 16,
        marginTop: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: 80,
          height: 12,
          backgroundColor: '#ffffff',
          borderRadius: 6,
          boxShadow: `0 0 12px ${color}`
        }} />
      </div>

      {/* Brand Badge */}
      <div style={{
        backgroundColor: '#0f172a',
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 14,
        padding: '6px 14px',
        borderRadius: 6,
        marginTop: 40
      }}>
        {label}
      </div>
    </div>
  );
};
