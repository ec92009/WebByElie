import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, Easing } from 'remotion';
import { WebsitePage } from '../components/WebsitePage';
import { SearchRobot } from '../components/SearchRobot';
import { DatabaseCabinet } from '../components/DatabaseCabinet';
import { AIBotComponent } from '../components/AIBot';
import { RecommendationPanel } from '../components/RecommendationPanel';

export const AioRecommendationsPortraitComposition: React.FC = () => {
  const baseFrame = useCurrentFrame();
  const frame = baseFrame + 60; // Cut 2 seconds (60 frames) off the top
  const progress = frame / 330.0;

  // Center page for portrait
  const pagePosX = 0;
  const pagePosY = -50;

  // Match Video 2 positions exactly (accounting for the 1.15x world scale)
  const googleBotX = 87;
  const googleBotY = 0;
  const googleDbX = 261;
  const googleDbY = 0;

  // AIO Bots entrance (starts at 75)
  const entranceProgress = interpolate(frame, [75, 175], [0, 1], {
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  // They start offscreen and move to the sides of the page
  const openAiX = interpolate(entranceProgress, [0, 1], [-800, -250]);
  const openAiY = 300;
  const claudeX = interpolate(entranceProgress, [0, 1], [800, 250]);
  const claudeY = 300;

  // Simultaneous Scanning (Frames 120 - 270)
  const isScanning = frame >= 120 && frame < 270;

  // SEO Bot scans top-down over the page
  const scanY = interpolate(frame, [120, 250], [-400, 400], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // OpenAI and Claude scan horizontally
  const scanX_OpenAI = interpolate(frame, [120, 250], [-350, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const scanX_Claude = interpolate(frame, [120, 250], [350, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Panel bullets calculation
  const visibleBullets = Math.floor(interpolate(frame, [240, 290], [0, 4], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  const dataNodes = [
    { label: 'Keywords', color: '#2563eb', delay: 145, target: 'google' },
    { label: 'Brand Voice', color: '#0d9488', delay: 165, target: 'openai' },
    { label: 'Factual Claims', color: '#d97706', delay: 185, target: 'claude' },
    { label: 'Sitemap', color: '#2563eb', delay: 205, target: 'google' },
    { label: 'Service Specs', color: '#0d9488', delay: 225, target: 'openai' },
    { label: 'Reviews', color: '#d97706', delay: 245, target: 'claude' }
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
      backgroundImage: 'radial-gradient(circle, rgba(13,148,136,0.06) 1px, transparent 1px)',
      backgroundSize: '36px 36px',
    }}>
      {/* World Wrapper */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'scale(1.15)' // slightly scale up for portrait
      }}>

        {/* Website Page */}
        <div style={{ position: 'absolute', transform: `translate(${pagePosX}px, ${pagePosY}px)`, zIndex: 1 }}>
          <WebsitePage
            posX={0}
            rotationY={0}
            copyText="Clear facts people can find."
            copyBadge="APPROVED ✓"
            isApprovedCopy={true}
            ctaText="Get Your Audit"
            isHighContrastCTA={true}
          />
        </div>

        {/* Scanning Beams */}
        {isScanning && (
          <>
            {/* SEO Bot Vertical Laser */}
            <div style={{
              position: 'absolute', width: 600, height: 6,
              backgroundColor: '#2563eb', boxShadow: '0 0 20px #2563eb', zIndex: 15,
              transform: `translate(${pagePosX}px, ${scanY + pagePosY}px)`
            }} />

            {/* OpenAI Horizontal Laser */}
            <div style={{
              position: 'absolute', width: 6, height: 700,
              backgroundColor: '#0d9488', boxShadow: '0 0 20px #0d9488', zIndex: 15,
              transform: `translate(${scanX_OpenAI}px, ${pagePosY}px)`
            }} />

            {/* Claude Horizontal Laser */}
            <div style={{
              position: 'absolute', width: 6, height: 700,
              backgroundColor: '#d97706', boxShadow: '0 0 20px #d97706', zIndex: 15,
              transform: `translate(${scanX_Claude}px, ${pagePosY}px)`
            }} />
          </>
        )}

        {/* Data Nodes floating to Bots / DB */}
        {frame >= 90 && (
          <div style={{ position: 'absolute', zIndex: 20 }}>
            {dataNodes.map((node, idx) => {
              if (frame < node.delay) return null;

              const pullP = interpolate(frame, [node.delay, node.delay + 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

              let targetX, targetY;
              if (node.target === 'openai') { targetX = openAiX; targetY = openAiY; }
              else if (node.target === 'claude') { targetX = claudeX; targetY = claudeY; }
              else { targetX = googleDbX; targetY = googleDbY; }

              // Start from the page
              const startX = pagePosX + (idx % 2 === 0 ? 50 : -50);
              const startY = pagePosY + (idx % 3 - 1) * 50;

              const currentX = interpolate(pullP, [0, 1], [startX, targetX]);
              const currentY = interpolate(pullP, [0, 1], [startY, targetY]);

              return (
                <div key={idx} style={{
                  position: 'absolute',
                  backgroundColor: node.color,
                  color: '#fff',
                  padding: '10px 18px',
                  borderRadius: 20,
                  fontWeight: 'bold',
                  fontSize: 16,
                  boxShadow: `0 8px 16px rgba(0,0,0,0.2)`,
                  opacity: pullP > 0.8 ? interpolate(pullP, [0.8, 1], [1, 0]) : 1,
                  transform: `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px)) scale(${1 - pullP * 0.4})`,
                }}>
                  {node.label}
                </div>
              );
            })}
          </div>
        )}

        {/* SEO Database Cabinet */}
        <div style={{ position: 'absolute', transform: `translate(${googleDbX}px, ${googleDbY}px) scale(1.22)`, zIndex: 4 }}>
          <DatabaseCabinet filledRows={[true, true, true, true, true]} />
        </div>

        {/* SEO Bot */}
        <div style={{ position: 'absolute', transform: `translate(${googleBotX}px, ${googleBotY}px) scale(1.22)`, zIndex: 10 }}>
          <SearchRobot />
        </div>

        {/* AI Bots */}
        <div style={{ position: 'absolute', transform: `translate(${openAiX}px, ${openAiY}px)`, zIndex: 10 }}>
          <AIBotComponent type="openai" />
        </div>
        <div style={{ position: 'absolute', transform: `translate(${claudeX}px, ${claudeY}px)`, zIndex: 10 }}>
          <AIBotComponent type="claude" />
        </div>

        {/* Recommendation Panel Output */}
        {frame >= 210 && (
          <div style={{ position: 'absolute', transform: `translate(0px, 400px) scale(1.1)`, zIndex: 25 }}>
            <RecommendationPanel visibleCount={visibleBullets} />
          </div>
        )}
      </div>
    </div>
  );
};
