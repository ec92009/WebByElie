import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const PageReassemblyPortraitComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Total 300 frames (10s)
  const time = frame / fps;
  const progress = time / 10.0;

  // Phase 1: Spread out (0.5s - 2s) -> Frames 15 - 60
  const spreadProgress = spring({ frame: frame - 15, fps, config: { damping: 14 } });

  // Phase 2: Swap Content (2s - 4s) -> Frames 60 - 120
  const swapOutProgress = spring({ frame: frame - 60, fps, config: { damping: 14 } });
  const swapInProgress = spring({ frame: frame - 80, fps, config: { damping: 14 } });

  // Phase 3: Reorder (4s - 6.5s) -> Frames 120 - 195
  const reorderProgress = spring({ frame: frame - 120, fps, config: { damping: 16 } });

  // Phase 4: Snap Back (6.5s - 8s) -> Frames 195 - 240
  const snapProgress = spring({ frame: frame - 195, fps, config: { damping: 14 } });

  // Base positions scaled up 1.5x
  const baseGap = 24;
  const spreadGap = 90;

  // Current gap dynamically calculated
  const currentGap = interpolate(spreadProgress, [0, 1], [baseGap, spreadGap]) -
                     interpolate(snapProgress, [0, 1], [0, spreadGap - baseGap]);

  const blockWidth = 840;

  // Block Heights (scaled ~1.5x)
  const hNav = 75;
  const hHero = 120;
  const hCopy = 120;
  const hProof = 90;
  const hCards = 210;
  const hCTA = 105;

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
  const oldCopyX = interpolate(swapOutProgress, [0, 1], [0, -1200]);
  const newCopyX = interpolate(swapInProgress, [0, 1], [1200, 0]);

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
      width: 1080,
      height: 1440,
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
        backgroundSize: '32px 32px',
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
          backgroundColor: '#ffffff', borderRadius: 12, padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 6px 12px rgba(0,0,0,0.05)', border: '2px solid #e2ded4'
        }}>
          <div style={{ fontWeight: 'bold', fontSize: 24, color: '#1e293b' }}>Acme Services</div>
          <div style={{ fontSize: 18, color: '#64748b' }}>Home • About • Services • Contact</div>
        </div>

        {/* 2. Hero Block */}
        <div style={{
          position: 'absolute', top: heroY, width: '100%', height: hHero,
          backgroundColor: '#ffffff', borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 6px 12px rgba(0,0,0,0.05)', border: '2px solid #e2ded4'
        }}>
          <div style={{ fontSize: 36, fontWeight: 'bold', color: '#0f172a' }}>
            Modern Solutions For Your Business
          </div>
        </div>

        {/* 3. Old Copy Block */}
        <div style={{
          position: 'absolute', top: copyY, left: oldCopyX, width: '100%', height: hCopy,
          backgroundColor: '#fef2f2', borderRadius: 12, padding: 24,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 6px 12px rgba(0,0,0,0.05)', border: '3px solid #fca5a5',
          opacity: interpolate(swapOutProgress, [0, 0.5], [1, 0])
        }}>
          <div style={{ fontSize: 24, fontWeight: 'bold', color: '#991b1b' }}>
            We help with your website.
          </div>
          <div style={{ backgroundColor: '#ef4444', color: '#fff', fontSize: 16, fontWeight: 'bold', padding: '6px 14px', borderRadius: 6 }}>
            TOO BROAD
          </div>
        </div>

        {/* 4. New Copy Block */}
        <div style={{
          position: 'absolute', top: copyY, left: newCopyX, width: '100%', height: hCopy,
          backgroundColor: '#ecfdf5', borderRadius: 12, padding: 24,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 6px 12px rgba(16,185,129,0.15)', border: '3px solid #10b981',
          opacity: interpolate(swapInProgress, [0, 0.5], [0, 1])
        }}>
          <div style={{ fontSize: 24, fontWeight: 'bold', color: '#065f46' }}>
            Clear facts people can find. Websites built to convert.
          </div>
          <div style={{ backgroundColor: '#10b981', color: '#fff', fontSize: 16, fontWeight: 'bold', padding: '6px 14px', borderRadius: 6 }}>
            APPROVED ✓
          </div>
        </div>

        {/* 5. Proof Block */}
        <div style={{
          position: 'absolute', top: proofY, width: '100%', height: hProof,
          backgroundColor: '#f8fafc', borderRadius: 12, padding: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: reorderProgress > 0 && reorderProgress < 1 ? '0 16px 32px rgba(37,99,235,0.2)' : '0 6px 12px rgba(0,0,0,0.05)',
          border: '2px solid #cbd5e1', fontStyle: 'italic', color: '#334155', fontSize: 20,
          transform: `scale(${interpolate(reorderProgress, [0, 0.5, 1], [1, 1.05, 1])})`,
          zIndex: reorderProgress > 0 && reorderProgress < 1 ? 10 : 1
        }}>
          "Elie doubled our leads in 3 weeks!" — Local Business Owner
        </div>

        {/* 6. Cards Block */}
        <div style={{
          position: 'absolute', top: cardsY, width: '100%', height: hCards,
          backgroundColor: '#ffffff', borderRadius: 12, padding: 24,
          display: 'flex', gap: 16,
          boxShadow: '0 6px 12px rgba(0,0,0,0.05)', border: '2px solid #e2ded4'
        }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ flex: 1, backgroundColor: '#f8fafc', border: '2px solid #cbd5e1', borderRadius: 8, padding: 16 }}>
              <div style={{ fontWeight: 'bold', fontSize: 20, color: '#334155' }}>Service 0{i}</div>
              <div style={{ fontSize: 16, color: '#64748b', marginTop: 8 }}>Standard features.</div>
            </div>
          ))}
        </div>

        {/* 7. CTA Block */}
        <div style={{
          position: 'absolute', top: ctaY, width: '100%', height: hCTA,
          backgroundColor: '#ffffff', borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 6px 12px rgba(0,0,0,0.05)', border: '2px solid #e2ded4'
        }}>
          <div style={{
            backgroundColor: snapProgress > 0.5 ? '#10b981' : '#94a3b8',
            color: '#ffffff', fontWeight: 'bold', fontSize: 24,
            padding: '20px 60px', borderRadius: 12,
            boxShadow: snapProgress > 0.5 ? '0 12px 24px rgba(16,185,129,0.4)' : 'none',
            transition: 'all 0.3s ease'
          }}>
            {snapProgress > 0.5 ? "Get Your Audit →" : "Submit"}
          </div>
        </div>
      </div>
    </div>
  );
};
