import React from 'react';

interface DatabaseCabinetProps {
  filledRows?: boolean[];
}

export const DatabaseCabinet: React.FC<DatabaseCabinetProps> = ({
  filledRows = [false, false, false, false, false]
}) => {
  const labels = ['TITLE', 'SERVICE', 'LOCATION', 'FAQ', 'JSON-LD'];

  return (
    <div style={{
      width: 260,
      height: 380,
      backgroundColor: '#1e293b',
      border: '4px solid #0f172a',
      borderRadius: 16,
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
    }}>
      <div style={{
        textAlign: 'center',
        color: '#10b981',
        fontWeight: 'bold',
        fontSize: 14,
        fontFamily: 'monospace',
        borderBottom: '2px solid #334155',
        paddingBottom: 8
      }}>
        [ INDEXED DATABASE ]
      </div>

      {labels.map((lbl, idx) => {
        const isFilled = filledRows[idx];
        return (
          <div key={lbl} style={{
            height: 48,
            backgroundColor: isFilled ? '#065f46' : '#334155',
            border: `2px solid ${isFilled ? '#10b981' : '#475569'}`,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 12px',
            fontFamily: 'monospace',
            fontSize: 13,
            fontWeight: 'bold',
            color: isFilled ? '#ffffff' : '#94a3b8'
          }}>
            <span>{lbl}:</span>
            <span>{isFilled ? 'INDEXED ✓' : 'EMPTY'}</span>
          </div>
        );
      })}
    </div>
  );
};
