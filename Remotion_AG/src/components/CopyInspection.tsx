import React from 'react';

interface CopyInspectionProps {
  x: number;
  y: number;
  annotationText?: string;
}

export const CopyInspectionTool: React.FC<CopyInspectionProps> = ({ x, y, annotationText }) => {
  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: y,
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none',
      zIndex: 30,
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }}>
      {/* Loupe Lens */}
      <div style={{
        width: 100,
        height: 100,
        borderRadius: '50%',
        border: '6px solid #d97706',
        backgroundColor: 'rgba(255, 255, 255, 0.45)',
        boxShadow: '0 10px 30px rgba(217, 119, 6, 0.3), inset 0 0 15px rgba(255,255,255,0.8)',
        backdropFilter: 'blur(3px)',
        position: 'relative'
      }}>
        {/* Handle */}
        <div style={{
          position: 'absolute',
          bottom: -35,
          right: -35,
          width: 12,
          height: 50,
          backgroundColor: '#1e2229',
          borderRadius: 6,
          transform: 'rotate(-45deg)',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
        }} />
      </div>

      {/* Annotation Tag */}
      {annotationText && (
        <div style={{
          backgroundColor: '#ef4444',
          color: '#ffffff',
          fontWeight: 'bold',
          fontSize: 14,
          padding: '6px 14px',
          borderRadius: 6,
          boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
          fontFamily: 'monospace',
          letterSpacing: 1
        }}>
          {annotationText}
        </div>
      )}
    </div>
  );
};
