import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, Easing } from 'remotion';
import { SharedFrame } from '../components/SharedFrame';
import { WebsitePage } from '../components/WebsitePage';
import { SearchRobot } from '../components/SearchRobot';
import { DatabaseCabinet } from '../components/DatabaseCabinet';
import { AIBotComponent } from '../components/AIBot';
import { RecommendationPanel } from '../components/RecommendationPanel';

export const AioRecommendationsComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = frame / 330.0;

  // Matching ending positions of SeoHarvest (Video 2)
  const pagePosX = -360;
  const googleBotX = 120;
  const googleBotY = 0;
  const googleDbX = 520;
  const googleDbY = 0;

  // AIO Bots entrance from the LEFT (Delayed by 1.5s -> starts at 75)
  // Slowed down by half -> takes 100 frames (75 to 175)
  const entranceProgress = interpolate(frame, [75, 175], [0, 1], {
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  // Global Pan Offset
  const panOffset = entranceProgress * 460;

  // They start offscreen left. Target visual position is -750 (left 20% of screen).
  // Target physical position = -750 - 460 = -1210
  const openAiX = interpolate(entranceProgress, [0, 1], [-1800, -1210]);
  const openAiY = -250;
  const claudeX = interpolate(entranceProgress, [0, 1], [-1800, -1210]);
  const claudeY = 250;

  // Simultaneous Scanning (Frames 120 - 270)
  const isScanning = frame >= 120 && frame < 270;

  // SEO Bot scans top-down over the page (x = -360)
  const scanY = interpolate(frame, [120, 250], [-400, 400], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // OpenAI and Claude scan horizontally across the page
  const scanX_OpenAI = interpolate(frame, [120, 250], [-600, -50], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const scanX_Claude = interpolate(frame, [120, 250], [-50, -600], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Panel bullets calculation (Started 1s earlier: Frames 240 - 290)
  const visibleBullets = Math.floor(interpolate(frame, [240, 290], [0, 4], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  let badgeText = "SEO FOUNDATION ESTABLISHED";
  if (frame >= 30 && frame < 75) badgeText = "AIO BOTS APPROACHING";
  else if (frame >= 75 && frame < 220) badgeText = "MULTI-AGENT SCANNING";
  else if (frame >= 220 && frame < 240) badgeText = "PROCESSING CONTEXT";
  else if (frame >= 240 && frame < 290) badgeText = "GENERATING AI RESPONSES";
  else if (frame >= 290) badgeText = "AIO READY ✓";

  // Data nodes extraction delayed by ~45 frames to match new entrance
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
      width: 1920,
      height: 1080,
      backgroundColor: '#f6f5f1',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: 'radial-gradient(circle, rgba(13,148,136,0.06) 1px, transparent 1px)',
      backgroundSize: '24px 24px',
      backgroundPosition: `${panOffset}px 0px`
    }}>

      {/* World Wrapper (pans to the right) */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `translateX(${panOffset}px)`
      }}>

        {/* Website Page */}
        <div style={{ position: 'absolute', transform: 'translate(0, 0)', zIndex: 1 }}>
          <WebsitePage
            posX={pagePosX}
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
            {/* SEO Bot Vertical Laser (Top Down) */}
            <div style={{
              position: 'absolute', width: 600, height: 4,
              backgroundColor: '#2563eb', boxShadow: '0 0 20px #2563eb', zIndex: 15,
              transform: `translate(${pagePosX}px, ${scanY}px)`
            }} />

            {/* OpenAI Horizontal Laser (Left to Right) */}
            <div style={{
              position: 'absolute', width: 4, height: 700,
              backgroundColor: '#0d9488', boxShadow: '0 0 20px #0d9488', zIndex: 15,
              transform: `translate(${scanX_OpenAI}px, 0px)`
            }} />

            {/* Claude Horizontal Laser (Right to Left) */}
            <div style={{
              position: 'absolute', width: 4, height: 700,
              backgroundColor: '#d97706', boxShadow: '0 0 20px #d97706', zIndex: 15,
              transform: `translate(${scanX_Claude}px, 0px)`
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
              else { targetX = googleDbX; targetY = googleDbY; } // SEO goes to the DB

              // Start from the page
              const startX = pagePosX + (idx % 2 === 0 ? 50 : -50);
              const startY = (idx % 3 - 1) * 50;

              const currentX = interpolate(pullP, [0, 1], [startX, targetX]);
              const currentY = interpolate(pullP, [0, 1], [startY, targetY]);

              return (
                <div key={idx} style={{
                  position: 'absolute',
                  backgroundColor: node.color,
                  color: '#fff',
                  padding: '8px 16px',
                  borderRadius: 20,
                  fontWeight: 'bold',
                  fontSize: 14,
                  boxShadow: `0 8px 16px rgba(0,0,0,0.2)`,
                  opacity: pullP > 0.8 ? interpolate(pullP, [0.8, 1], [1, 0]) : 1,
                  // Center the div on its coordinates, scale down as it reaches target
                  transform: `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px)) scale(${1 - pullP * 0.4})`,
                }}>
                  {node.label}
                </div>
              );
            })}
          </div>
        )}

        {/* SEO Database Cabinet (Static from Video 2) */}
        <div style={{ position: 'absolute', transform: `translate(${googleDbX}px, ${googleDbY}px)`, zIndex: 4 }}>
          {/* Already filled from previous video */}
          <DatabaseCabinet filledRows={[true, true, true, true, true]} />
        </div>

        {/* SEO Bot (Static from Video 2) */}
        <div style={{ position: 'absolute', transform: `translate(${googleBotX}px, ${googleBotY}px)`, zIndex: 10 }}>
          <SearchRobot />
        </div>

        {/* AI Bots (Left Side) */}
        <div style={{ position: 'absolute', transform: `translate(${openAiX}px, ${openAiY}px)`, zIndex: 10 }}>
          <AIBotComponent type="openai" />
        </div>
        <div style={{ position: 'absolute', transform: `translate(${claudeX}px, ${claudeY}px)`, zIndex: 10 }}>
          <AIBotComponent type="claude" />
        </div>

        {/* Recommendation Panel Output */}
        {frame >= 210 && (
          <div style={{ position: 'absolute', transform: `translate(-940px, 0px) scale(1.1)`, zIndex: 25 }}>
            <RecommendationPanel visibleCount={visibleBullets} />
          </div>
        )}
      </div> {/* End World Wrapper */}

      {/* Static UI Layer */}
      <SharedFrame
        stageIndex={3}
        serviceLabel="3. AIO (AI OPTIMIZATION)"
        caption="SEO continues its foundation while AIO agents simultaneously scan and extract training facts"
        badgeText={badgeText}
        stageProgress={progress}
      />
    </div>
  );
};
