import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { SharedFrame } from '../components/SharedFrame';
import { WebsitePage } from '../components/WebsitePage';
import { SearchRobot } from '../components/SearchRobot';
import { DatabaseCabinet } from '../components/DatabaseCabinet';

export const SeoHarvestComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 11 seconds = 330 frames
  const time = frame / fps;
  const progress = time / 11.0;

  // Phase 1: 0.0s - 4.0s (Frames 0 - 120) X-Ray Scan over the page
  const scanY = interpolate(frame, [30, 100], [-350, 350], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const isScanning = frame >= 30 && frame < 120;

  // Signal nodes detachment (Frames 70 - 130)
  const packetsProgress = interpolate(frame, [70, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Phase 2: 4.0s - 7.0s (Frames 120 - 210) Google Bot Entrance & Collection
  const robotSpring = spring({ frame: frame - 120, fps, config: { damping: 14 } });
  const robotX = interpolate(robotSpring, [0, 1], [900, 120]);

  // Packets move into the robot's intake tray
  const harvestP = interpolate(frame, [150, 210], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Phase 3: 7.0s - 11.0s (Frames 210 - 330) Big DB Indexing
  const dbSpring = spring({ frame: frame - 210, fps, config: { damping: 14 } });
  const dbX = interpolate(dbSpring, [0, 1], [1000, 520]);

  // Database slots state
  const row1 = frame >= 230;
  const row2 = frame >= 245;
  const row3 = frame >= 260;
  const row4 = frame >= 275;
  const row5 = frame >= 290;

  let badgeText = "READY";
  if (frame >= 30 && frame < 120) badgeText = "X-RAY SCANNING";
  else if (frame >= 120 && frame < 150) badgeText = "CRAWLER DETECTED";
  else if (frame >= 150 && frame < 210) badgeText = "COLLECTING SIGNALS";
  else if (frame >= 210 && frame < 290) badgeText = "INDEXING TO DB";
  else if (frame >= 290) badgeText = "SEO RANKING OPTIMIZED ✓";

  const packetLabels = [
    { label: '<title> Acme Services', color: '#2563eb' },
    { label: '<meta name="description">', color: '#0d9488' },
    { label: '<h1> Modern Solutions', color: '#8b5cf6' },
    { label: '<img alt="Service Photo">', color: '#d97706' },
    { label: '<script type="application/ld+json">', color: '#10b981' }
  ];

  return (
    <div style={{
      width: 1920,
      height: 1080,
      backgroundColor: '#f6f5f1',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: 'radial-gradient(circle, rgba(37,99,235,0.06) 1px, transparent 1px)',
      backgroundSize: '24px 24px'
    }}>

      {/* Website Page Board (Remains front-facing, shifts left slightly) */}
      <WebsitePage
        posX={-360}
        rotationY={0}
        copyText="Clear facts people can find."
        copyBadge="APPROVED ✓"
        isApprovedCopy={true}
        ctaText="Get Your Audit →"
        isHighContrastCTA={true}
        isGridAligned={true}
      />

      {/* X-Ray Scanner Bar */}
      {isScanning && (
        <div style={{
          position: 'absolute',
          left: 250, // Overlapping the WebsitePage which is roughly at x = 1920/2 - 360 = 600 center. Width 620 -> 290 to 910
          top: 1080 / 2 + scanY,
          width: 700,
          height: 6,
          backgroundColor: '#10b981',
          boxShadow: '0 0 20px #10b981, 0 0 40px #10b981',
          zIndex: 20,
          borderRadius: 4
        }} />
      )}

      {/* X-Ray Overlay on the Page (Simulates revealing tags) */}
      {isScanning && (
        <div style={{
          position: 'absolute',
          left: 250,
          top: 1080 / 2 + scanY - 100,
          width: 700,
          height: 100,
          background: 'linear-gradient(to bottom, transparent, rgba(16,185,129,0.15))',
          pointerEvents: 'none',
          zIndex: 19
        }} />
      )}

      {/* Metadata Signal Capsules (Float out as scanner passes) */}
      {frame >= 50 && (
        <div style={{
          position: 'absolute',
          left: 300,
          top: 240,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          zIndex: 10
        }}>
          {packetLabels.map((pkt, idx) => {
            // They fade in staggered after frame 70
            const itemP = Math.max(0, Math.min(1, (packetsProgress - idx * 0.15) * 2));
            const opacity = interpolate(harvestP, [0.8, 1], [itemP, 0]); // Fade out as they enter robot

            // They move to the right into the robot's intake tray
            const itemX = interpolate(harvestP, [0, 1], [0, 500]);
            const itemY = interpolate(harvestP, [0, 1], [0, 200 - idx * 60]);

            return (
              <div key={idx} style={{
                backgroundColor: pkt.color,
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: 14,
                fontFamily: 'monospace',
                padding: '10px 18px',
                borderRadius: 8,
                boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
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
      <div style={{ position: 'absolute', transform: `translateX(${robotX}px)`, zIndex: 15 }}>
        <SearchRobot />
      </div>

      {/* Data Chunks flying from Robot to DB (Frames 220 - 290) */}
      {frame >= 220 && frame < 300 && (
        <div style={{ position: 'absolute', width: 1920, height: 1080, zIndex: 14 }}>
          {packetLabels.map((pkt, idx) => {
            const startFrame = 220 + idx * 15;
            const endFrame = startFrame + 15;

            // Chunk only exists during its specific flight window
            if (frame < startFrame || frame > endFrame) return null;

            const chunkProgress = interpolate(frame, [startFrame, endFrame], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

            // Calculate trajectory from Robot (approx x=120) to DB (approx x=520)
            const chunkX = interpolate(chunkProgress, [0, 1], [1920 / 2 + 120 + 100, 1920 / 2 + 520 - 50]);

            // Robot is vertically centered, DB rows are slightly offset vertically
            // Let's target the chunk to different heights to hit the DB rows
            const dbTargetY = 1080 / 2 - 100 + (idx * 40);
            const chunkY = interpolate(chunkProgress, [0, 1], [1080 / 2 - 20, dbTargetY]);

            return (
              <div key={`chunk-${idx}`} style={{
                position: 'absolute',
                left: chunkX,
                top: chunkY,
                width: 24,
                height: 12,
                backgroundColor: pkt.color,
                borderRadius: 4,
                boxShadow: `0 0 10px ${pkt.color}`,
                opacity: chunkProgress < 0.9 ? 1 : 0
              }} />
            );
          })}
        </div>
      )}

      {/* Laser Scanning Beam from Robot (Frame 150-210) */}
      {frame >= 150 && frame < 210 && (
        <div style={{
          position: 'absolute',
          left: 450,
          top: 300,
          width: 500,
          height: 4,
          backgroundColor: '#2563eb',
          boxShadow: '0 0 15px #2563eb, 0 0 30px #2563eb',
          zIndex: 14,
          transform: 'rotate(-10deg)'
        }} />
      )}

      {/* Server Database Cabinet (The Big DB) */}
      <div style={{ position: 'absolute', transform: `translateX(${dbX}px)`, zIndex: 15 }}>
        <DatabaseCabinet filledRows={[row1, row2, row3, row4, row5]} />
      </div>

      <SharedFrame
        stageIndex={2}
        serviceLabel="2. SEO INDEXING"
        caption={frame >= 150 ? "GoogleBot collects semantic signals and indexes them in the central DB" : "X-Ray scanner extracts hidden technical signals and schema markup"}
        badgeText={badgeText}
        stageProgress={progress}
      />
    </div>
  );
};
