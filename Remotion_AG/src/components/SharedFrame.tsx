import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface SharedFrameProps {
  stageIndex: number; // 1 to 4
  serviceLabel: string;
  caption: string;
  badgeText: string;
  stageProgress: number; // 0 to 1
}

export const SharedFrame: React.FC<SharedFrameProps> = ({
  stageIndex,
  serviceLabel,
  caption,
  badgeText,
  stageProgress
}) => {
  const totalProg = ((stageIndex - 1) + Math.min(1, Math.max(0, stageProgress))) / 4;

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 40,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 26, fontWeight: 'bold', color: '#1e2229' }}>
          Web By Elie
        </div>

        {/* Progress bar */}
        <div style={{ width: 400, height: 8, backgroundColor: '#e2ded4', borderRadius: 4, position: 'relative', overflow: 'hidden' }}>
          <div style={{
            width: `${totalProg * 100}%`,
            height: '100%',
            backgroundColor: '#10b981',
            borderRadius: 4,
            transition: 'width 0.1s linear'
          }} />
        </div>

        {/* Service Label */}
        <div style={{
          backgroundColor: '#2563eb',
          color: '#ffffff',
          fontWeight: 'bold',
          fontSize: 18,
          padding: '8px 20px',
          borderRadius: 8
        }}>
          {serviceLabel}
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 22, fontWeight: 500, color: '#1e2229' }}>
          {caption}
        </div>

        {badgeText && (
          <div style={{
            backgroundColor: '#10b981',
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: 20,
            padding: '10px 24px',
            borderRadius: 8,
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
          }}>
            {badgeText}
          </div>
        )}
      </div>
    </div>
  );
};
