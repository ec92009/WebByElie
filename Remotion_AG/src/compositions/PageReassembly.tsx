import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { SharedFrame } from '../components/SharedFrame';

export const PageReassemblyComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Total 330 frames (11s)
  const time = frame / fps;
  const progress = time / 11.0;

  // Phase 1: Spread out (1.5s - 3s) -> Frames 45 - 90
  const spreadProgress = spring({ frame: frame - 45, fps, config: { damping: 14 } });

  // Phase 2: Swap Content (3s - 5s) -> Frames 90 - 150
  const swapOutProgress = spring({ frame: frame - 90, fps, config: { damping: 14 } });
  const swapInProgress = spring({ frame: frame - 110, fps, config: { damping: 14 } });

  // Phase 3: Reorder (5s - 7.5s) -> Frames 150 - 225
  const reorderProgress = spring({ frame: frame - 150, fps, config: { damping: 16 } });

  // Phase 4: Snap Back (7.5s - 9s) -> Frames 225 - 270
  const snapProgress = spring({ frame: frame - 225, fps, config: { damping: 14 } });

  // Base positions
  const baseGap = 16;
  const spreadGap = 60;

  // Current gap dynamically calculated
  const currentGap = interpolate(spreadProgress, [0, 1], [baseGap, spreadGap]) -
                     interpolate(snapProgress, [0, 1], [0, spreadGap - baseGap]);

  const blockWidth = 620;

  // Block Heights
  const hNav = 50;
  const hHero = 80;
  const hCopy = 80;
  const hProof = 60;
  const hCards = 140;
  const hCTA = 70;

  // Initial order: Nav (0), Hero (1), Copy (2), Cards (3), Proof (4), CTA (5)
  // Final order: Nav (0), Hero (1), Proof (4), NewCopy (2), Cards (3), CTA (5)

  // Calculate Y offsets based on order and gap
  const getBlockY = (orderIndex: number, gap: number, heights: number[]) => {
    let y = 0;
    for (let i = 0; i < orderIndex; i++) {
      y += heights[i] + gap;
    }
    return y;
  };

  // The heights in initial and final order
  const heightsInitial = [hNav, hHero, hCopy, hCards, hProof, hCTA];
  const heightsFinal = [hNav, hHero, hProof, hCopy, hCards, hCTA];

  // Helper to interpolate Y position during reorder phase
  const getYPos = (initialIndex: number, finalIndex: number) => {
    const startY = getBlockY(initialIndex, currentGap, heightsInitial);
    const endY = getBlockY(finalIndex, currentGap, heightsFinal);
    return interpolate(reorderProgress, [0, 1], [startY, endY]);
  };

  // Block Positions
  const navY = getYPos(0, 0);
  const heroY = getYPos(1, 1);
  const copyY = getYPos(2, 3); // Copy moves from idx 2 to 3
  const cardsY = getYPos(3, 4); // Cards move from idx 3 to 4
  const proofY = getYPos(4, 2); // Proof moves from idx 4 to 2
  const ctaY = getYPos(5, 5);

  // Swap Animation for Copy Block
  const oldCopyX = interpolate(swapOutProgress, [0, 1], [0, -800]);
  const newCopyX = interpolate(swapInProgress, [0, 1], [800, 0]);

  const isApprovedCopy = swapInProgress > 0.5;

  let badgeText = "ANALYZING";
  if (frame >= 45 && frame < 90) badgeText = "DECONSTRUCTING";
  else if (frame >= 90 && frame < 150) badgeText = "REPLACING CONTENT";
  else if (frame >= 150 && frame < 225) badgeText = "REORGANIZING FLOW";
  else if (frame >= 225) badgeText = "OPTIMIZED ✓";

  // Calculate total container height to center it
  const totalInitialHeight = heightsInitial.reduce((a, b) => a + b, 0) + (5 * baseGap);
  const startOffset = -totalInitialHeight / 2;

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
      fontFamily: 'system-ui, sans-serif'
    }}>
      {/* Background pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: snapProgress > 0.5
          ? 'radial-gradient(circle, rgba(16,185,129,0.08) 1px, transparent 1px)'
          : 'radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        transition: 'background-image 0.5s ease'
      }} />

      {/* Main Container */}
      <div style={{
        position: 'relative',
        width: blockWidth,
        transform: `translateY(${startOffset}px)`
      }}>

        {/* 1. Nav Block */}
        <div style={{
          position: 'absolute', top: navY, width: '100%', height: hNav,
          backgroundColor: '#ffffff', borderRadius: 8, padding: '0 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e2ded4'
        }}>
          <div style={{ fontWeight: 'bold', fontSize: 18, color: '#1e293b' }}>Acme Services</div>
          <div style={{ fontSize: 13, color: '#64748b' }}>Home • About • Services • Contact</div>
        </div>

        {/* 2. Hero Block */}
        <div style={{
          position: 'absolute', top: heroY, width: '100%', height: hHero,
          backgroundColor: '#ffffff', borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e2ded4'
        }}>
          <div style={{ fontSize: 26, fontWeight: 'bold', color: '#0f172a' }}>
            Modern Solutions For Your Business
          </div>
        </div>

        {/* 3. Old Copy Block */}
        <div style={{
          position: 'absolute', top: copyY, left: oldCopyX, width: '100%', height: hCopy,
          backgroundColor: '#fef2f2', borderRadius: 8, padding: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '2px solid #fca5a5',
          opacity: interpolate(swapOutProgress, [0, 0.5], [1, 0])
        }}>
          <div style={{ fontSize: 18, fontWeight: 'bold', color: '#991b1b' }}>
            We help with your website.
          </div>
          <div style={{ backgroundColor: '#ef4444', color: '#fff', fontSize: 12, fontWeight: 'bold', padding: '4px 10px', borderRadius: 4 }}>
            TOO BROAD
          </div>
        </div>

        {/* 4. New Copy Block */}
        <div style={{
          position: 'absolute', top: copyY, left: newCopyX, width: '100%', height: hCopy,
          backgroundColor: '#ecfdf5', borderRadius: 8, padding: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 4px 6px rgba(16,185,129,0.15)', border: '2px solid #10b981',
          opacity: interpolate(swapInProgress, [0, 0.5], [0, 1])
        }}>
          <div style={{ fontSize: 18, fontWeight: 'bold', color: '#065f46' }}>
            Clear facts people can find. Websites built to convert.
          </div>
          <div style={{ backgroundColor: '#10b981', color: '#fff', fontSize: 12, fontWeight: 'bold', padding: '4px 10px', borderRadius: 4 }}>
            APPROVED ✓
          </div>
        </div>

        {/* 5. Proof Block */}
        <div style={{
          position: 'absolute', top: proofY, width: '100%', height: hProof,
          backgroundColor: '#f8fafc', borderRadius: 8, padding: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: reorderProgress > 0 && reorderProgress < 1 ? '0 12px 24px rgba(37,99,235,0.2)' : '0 4px 6px rgba(0,0,0,0.05)',
          border: '1px solid #cbd5e1', fontStyle: 'italic', color: '#334155',
          transform: `scale(${interpolate(reorderProgress, [0, 0.5, 1], [1, 1.05, 1])})`,
          zIndex: reorderProgress > 0 && reorderProgress < 1 ? 10 : 1
        }}>
          "Elie doubled our leads in 3 weeks!" — Local Business Owner
        </div>

        {/* 6. Cards Block */}
        <div style={{
          position: 'absolute', top: cardsY, width: '100%', height: hCards,
          backgroundColor: '#ffffff', borderRadius: 8, padding: 16,
          display: 'flex', gap: 12,
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e2ded4'
        }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ flex: 1, backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 6, padding: 10 }}>
              <div style={{ fontWeight: 'bold', fontSize: 14, color: '#334155' }}>Service 0{i}</div>
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>Standard features.</div>
            </div>
          ))}
        </div>

        {/* 7. CTA Block */}
        <div style={{
          position: 'absolute', top: ctaY, width: '100%', height: hCTA,
          backgroundColor: '#ffffff', borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e2ded4'
        }}>
          <div style={{
            backgroundColor: snapProgress > 0.5 ? '#10b981' : '#94a3b8',
            color: '#ffffff', fontWeight: 'bold', fontSize: 18,
            padding: '14px 40px', borderRadius: 8,
            boxShadow: snapProgress > 0.5 ? '0 10px 20px rgba(16,185,129,0.4)' : 'none',
            transition: 'all 0.3s ease'
          }}>
            {snapProgress > 0.5 ? "Get Your Audit →" : "Submit"}
          </div>
        </div>
      </div>

      <SharedFrame
        stageIndex={1}
        serviceLabel="1. REWRITE & REORGANIZE"
        caption={isApprovedCopy ? "Reassemble components into a logical, high-converting flow" : "Deconstruct page to replace weak copy and reorganize layout"}
        badgeText={badgeText}
        stageProgress={progress}
      />
    </div>
  );
};
