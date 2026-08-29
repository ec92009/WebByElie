import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { WebsitePage } from '../components/WebsitePage';
import { SearchRobot } from '../components/SearchRobot';
import { DatabaseCabinet } from '../components/DatabaseCabinet';

export const SeoHarvestPortraitComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Flip page and scan (Frames 0 - 105)
  // Flip forward starts at 1.0s (30) and lasts 1.0s (to 60).
  // Flip back starts at 2.5s (75) and lasts 1.0s (to 105).
  const pageFlipForward = interpolate(frame, [30, 60], [0, 180], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pageFlipBack = interpolate(frame, [75, 105], [0, -180], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pageRotation = pageFlipForward + pageFlipBack;

  // Scan happens from 1.0s to 3.5s (Frames 30 - 105)
  const isScanning = frame >= 30 && frame < 105;
  const scanY = interpolate(frame, [30, 105], [-450, 450], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Signal nodes detachment (Frames 70 - 130)
  const packetsProgress = interpolate(frame, [70, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Phase 2: 4.0s - 7.0s (Frames 120 - 210) Google Bot Collection
  // Robot is now in the frame from the start
  const robotX = 100;

  // Packets move into the robot's intake tray
  const harvestP = interpolate(frame, [150, 210], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Phase 3: 7.0s - 11.0s (Frames 210 - 330) Big DB Indexing
  // DB is present from the start
  const dbX = 300;

  // Database slots state
  const row1 = frame >= 230;
  const row2 = frame >= 245;
  const row3 = frame >= 260;
  const row4 = frame >= 275;
  const row5 = frame >= 290;

  const packetLabels = [
    { label: '<title> Acme Services', color: '#2563eb' },
    { label: '<meta name="description">', color: '#0d9488' },
    { label: '<h1> Modern Solutions', color: '#8b5cf6' },
    { label: '<img alt="Service Photo">', color: '#d97706' },
    { label: '<script type="application/ld+json">', color: '#10b981' }
  ];

  return (
    <div style={{
      width: 1080,
      height: 1440,
      backgroundColor: '#f6f5f1',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: 'radial-gradient(circle, rgba(37,99,235,0.06) 1px, transparent 1px)',
      backgroundSize: '36px 36px'
    }}>

      {/* Website Page Board - Scaled up and shifted left slightly */}
      <div style={{ position: 'absolute', transform: 'scale(1.3) translateX(-100px)' }}>
        <WebsitePage
          posX={0}
          rotationY={pageRotation}
          copyText="Clear facts people can find."
          copyBadge="APPROVED ✓"
          isApprovedCopy={true}
          ctaText="Get Your Audit →"
          isHighContrastCTA={true}
          isGridAligned={true}
        />
      </div>

      {/* X-Ray Scanner Bar */}
      {isScanning && (
        <div style={{
          position: 'absolute',
          left: 100,
          top: 1440 / 2 + scanY,
          width: 800,
          height: 10,
          backgroundColor: '#10b981',
          boxShadow: '0 0 30px #10b981, 0 0 60px #10b981',
          zIndex: 20,
          borderRadius: 6
        }} />
      )}

      {/* X-Ray Overlay on the Page */}
      {isScanning && (
        <div style={{
          position: 'absolute',
          left: 100,
          top: 1440 / 2 + scanY - 140,
          width: 800,
          height: 140,
          background: 'linear-gradient(to bottom, transparent, rgba(16,185,129,0.15))',
          pointerEvents: 'none',
          zIndex: 19
        }} />
      )}

      {/* Metadata Signal Capsules */}
      {frame >= 50 && (
        <div style={{
          position: 'absolute',
          left: 150,
          top: 300,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          zIndex: 10,
          transform: 'scale(1.2)' // Make them bigger for portrait
        }}>
          {packetLabels.map((pkt, idx) => {
            const itemP = Math.max(0, Math.min(1, (packetsProgress - idx * 0.15) * 2));
            const opacity = interpolate(harvestP, [0.8, 1], [itemP, 0]);

            // They move to the right into the robot's intake tray
            const itemX = interpolate(harvestP, [0, 1], [0, 300]);
            const itemY = interpolate(harvestP, [0, 1], [0, 300 - idx * 80]);

            return (
              <div key={idx} style={{
                backgroundColor: pkt.color,
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: 16,
                fontFamily: 'monospace',
                padding: '12px 22px',
                borderRadius: 8,
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                opacity,
                transform: `translate(${itemX}px, ${itemY}px) scale(${1 - harvestP * 0.4})`,
                transition: 'all 0.1s linear'
              }}>
                {pkt.label}
              </div>
            );
          })}
        </div>
      )}

      {/* Search Robot (Google Bot) */}
      <div style={{ position: 'absolute', transform: `translateX(${robotX}px) scale(1.4)`, zIndex: 15 }}>
        <SearchRobot />
      </div>

      {/* Data Chunks flying from Robot to DB (Frames 220 - 290) */}
      {frame >= 220 && frame < 300 && (
        <div style={{ position: 'absolute', width: 1080, height: 1440, zIndex: 14 }}>
          {packetLabels.map((pkt, idx) => {
            const startFrame = 220 + idx * 15;
            const endFrame = startFrame + 15;

            if (frame < startFrame || frame > endFrame) return null;

            const chunkProgress = interpolate(frame, [startFrame, endFrame], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

            const chunkX = interpolate(chunkProgress, [0, 1], [1080 / 2 + 100 + 120, 1080 / 2 + 300 - 50]);
            const dbTargetY = 1440 / 2 - 140 + (idx * 56);
            const chunkY = interpolate(chunkProgress, [0, 1], [1440 / 2 - 20, dbTargetY]);

            return (
              <div key={`chunk-${idx}`} style={{
                position: 'absolute',
                left: chunkX,
                top: chunkY,
                width: 32,
                height: 16,
                backgroundColor: pkt.color,
                borderRadius: 6,
                boxShadow: `0 0 15px ${pkt.color}`,
                opacity: chunkProgress < 0.9 ? 1 : 0
              }} />
            );
          })}
        </div>
      )}

      {/* Removed Laser Scanning Beam from Robot per user request */}

      {/* Server Database Cabinet */}
      <div style={{ position: 'absolute', transform: `translateX(${dbX}px) scale(1.4)`, zIndex: 13 }}>
        <DatabaseCabinet filledRows={[row1, row2, row3, row4, row5]} />
      </div>

    </div>
  );
};
