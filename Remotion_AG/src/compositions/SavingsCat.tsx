import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { SharedFrame } from '../components/SharedFrame';
import { WebsitePage } from '../components/WebsitePage';
import { SavingsCatComponent } from '../components/SavingsCat';

export const SavingsCatComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = frame / 330.0;

  // Cat Entrance (1.5s -> frame 45)
  const catX = interpolate(frame, [45, 96], [-1000, -450], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pageX = interpolate(frame, [45, 96], [0, 200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Magnifying Glass Y position (3.2s to 5.8s -> frames 96 to 174)
  const glassY = interpolate(frame, [96, 174], [-200, 200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Paw Movements
  const leftPawY = interpolate(frame, [174, 246, 300], [0, 120, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rightPawY = interpolate(frame, [174, 246, 300], [0, 120, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Expense cards state
  const isSealed = frame >= 300;

  let badgeText = "INSPECTING";
  if (frame >= 45 && frame < 96) badgeText = "SCANNING";
  else if (frame >= 96 && frame < 174) badgeText = "LEAK DETECTED";
  else if (frame >= 174 && frame < 246) badgeText = "CATCHING";
  else if (frame >= 246 && frame < 300) badgeText = "POCKETING SAVINGS";
  else if (frame >= 300) badgeText = "SAVINGS FOUND ✓";

  return (
    <div style={{
      width: 1920,
      height: 1080,
      backgroundColor: '#f6f5f1',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Fat Cat */}
      <div style={{ position: 'absolute', transform: `translateX(${catX}px)` }}>
        <SavingsCatComponent leftPawY={leftPawY} rightPawY={rightPawY} />
      </div>

      {/* Website Page */}
      <WebsitePage
        posX={pageX}
        copyText="Clear facts people can find."
        copyBadge="APPROVED ✓"
        isApprovedCopy={true}
        ctaText="Get Your Audit"
        isHighContrastCTA={true}
      />

      {/* Recurring Expense Cards */}
      <div style={{ position: 'absolute', transform: `translateX(${pageX + 380}px)`, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {[
          'Unused plugin — $29/mo',
          'Duplicate tool — $18/mo',
          'Silent renewal — $49/yr',
          'Old service — $12/mo'
        ].map((txt, idx) => (
          <div key={idx} style={{
            padding: '12px 20px',
            backgroundColor: isSealed ? '#ecfdf5' : '#fff1f2',
            border: `2px solid ${isSealed ? '#10b981' : '#fda4af'}`,
            borderRadius: 8,
            fontWeight: 'bold',
            color: isSealed ? '#065f46' : '#9f1239',
            fontSize: 16
          }}>
            {txt} {isSealed ? '✓ SEALED' : ''}
          </div>
        ))}
      </div>

      {/* Magnifying Glass Lens overlay */}
      {frame >= 96 && frame < 174 && (
        <div style={{
          position: 'absolute',
          transform: `translate(${pageX + 180}px, ${glassY}px)`,
          width: 140,
          height: 140,
          borderRadius: '50%',
          border: '8px solid #f59e0b',
          backgroundColor: 'rgba(255,255,255,0.4)',
          boxShadow: '0 0 30px rgba(245, 158, 11, 0.4)',
          zIndex: 20
        }} />
      )}

      <SharedFrame
        stageIndex={4}
        serviceLabel="4. SAVINGS"
        caption={isSealed ? "Keep more of what you earn." : "Fat cat catches evaporating dollar signs and pockets the savings"}
        badgeText={badgeText}
        stageProgress={progress}
      />
    </div>
  );
};
