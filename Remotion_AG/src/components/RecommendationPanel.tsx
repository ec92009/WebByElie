import React from 'react';

interface RecommendationPanelProps {
  visibleCount: number;
}

export const RecommendationPanel: React.FC<RecommendationPanelProps> = ({ visibleCount }) => {
  const bullets = [
    'Make the business and audience explicit.',
    'Answer service and location questions directly.',
    'Put proof beside every important claim.',
    'Give people and assistants one clear next step.'
  ];

  return (
    <div style={{
      width: 680,
      backgroundColor: '#ffffff',
      border: '4px solid #10b981',
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(16, 185, 129, 0.2)'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#065f46',
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 20,
        padding: '16px 24px'
      }}>
        AI RECOMMENDATIONS FOR WEB PRESENCE
      </div>

      {/* Bullets */}
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {bullets.slice(0, Math.min(visibleCount, 4)).map((txt, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              backgroundColor: '#10b981',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: 16
            }}>
              ✓
            </div>
            <div style={{ fontSize: 18, fontWeight: 'bold', color: '#0f172a' }}>
              {txt}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
