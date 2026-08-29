import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React from 'react';
import { WebsitePage } from '../components/WebsitePage';
import { SearchRobot } from '../components/SearchRobot';
import { RecommendationPanel } from '../components/RecommendationPanel';
import { DatabaseCabinet } from '../components/DatabaseCabinet';
import { AIBotComponent } from '../components/AIBot';
import { Search } from 'lucide-react';

const NODES = [
  { id: 1, name: "Ipsum Cloud", price: 145, discount: 0.2, pruned: false, x: 30, y: 30 },
  { id: 2, name: "Dolor Server", price: 85, discount: 0.5, pruned: true, x: 200, y: 40 },
  { id: 3, name: "Amet Storage", price: 210, discount: 0.3, pruned: false, x: 400, y: 80 },
  { id: 4, name: "Consectetur API", price: 55, discount: 0.1, pruned: false, x: 60, y: 150 },
  { id: 5, name: "Adipiscing DB", price: 320, discount: 0.4, pruned: false, x: 280, y: 180 },
  { id: 6, name: "Elit CDN", price: 40, discount: 0.2, pruned: true, x: 450, y: 260 },
  { id: 7, name: "Sed Router", price: 95, discount: 0.15, pruned: false, x: 40, y: 330 },
  { id: 8, name: "Do Proxy", price: 120, discount: 0.25, pruned: true, x: 210, y: 380 },
  { id: 9, name: "Eiusmod Cache", price: 180, discount: 0.45, pruned: false, x: 420, y: 450 },
  { id: 10, name: "Tempor Worker", price: 75, discount: 0.1, pruned: false, x: 70, y: 520 },
  { id: 11, name: "Incididunt Lambda", price: 110, discount: 0.3, pruned: true, x: 240, y: 580 },
  { id: 12, name: "Labore Firewall", price: 250, discount: 0.2, pruned: false, x: 440, y: 640 },
];

export const CostEfficiencyPortraitComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- 1. Camera Zoom & Pan ---
  // The page was centrally located in Video 3 at (0, -50) but the world was scaled 1.15.
  // We want to zoom into the page, scaling up.
  const cameraZoom = interpolate(frame, [30, 90], [1.15, 1.4], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cameraPanY = interpolate(frame, [30, 90], [0, 50], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // --- 2. Page Flip ---
  const pageRotateY = interpolate(frame, [40, 90], [0, 180], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // --- 3. Loupe Scan ---
  // Starts scanning after flip (frame 100)
  const loupeX = interpolate(frame, [100, 250], [-200, 800], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#f6f5f1', overflow: 'hidden' }}>

      {/* Global Savings Counter - Only visible after flip */}
      <div style={{
        position: 'absolute', top: 120, left: 0, right: 0,
        textAlign: 'center', zIndex: 100,
        opacity: interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        color: 'black', fontFamily: 'sans-serif'
      }}>
        <h2 style={{ fontSize: '40px', color: '#666', margin: 0 }}>MONTHLY INFRASTRUCTURE COST</h2>
        <div style={{ fontSize: '120px', fontWeight: 'bold', color: '#ef4444' }}>
          ${Math.floor(
            NODES.reduce((total, node) => {
              const nodePassed = loupeX > (node.x + 100);
              if (nodePassed) {
                if (node.pruned) return total;
                return total + (node.price * (1 - node.discount));
              }
              return total + node.price;
            }, 0)
          )}
        </div>
      </div>

      {/* World Container - Handles the Zoom */}
      <div style={{
        position: 'absolute', width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transform: `scale(${cameraZoom}) translate(0px, ${cameraPanY}px)`,
        transformOrigin: 'center center'
      }}>

        {/* Assets from Video 3 - Fading out during zoom */}
        <div style={{
          position: 'absolute', width: '100%', height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: interpolate(frame, [30, 90], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
        }}>
          {/* SEO Database Cabinet */}
          <div style={{ position: 'absolute', transform: `translate(0px, -550px) scale(0.8)`, zIndex: 4 }}>
            <DatabaseCabinet filledRows={[true, true, true, true, true]} />
          </div>

          {/* SEO Bot */}
          <div style={{ position: 'absolute', transform: `translate(250px, -450px)`, zIndex: 10 }}>
            <SearchRobot />
          </div>

          {/* AI Bots */}
          <div style={{ position: 'absolute', transform: `translate(-250px, 300px)`, zIndex: 10 }}>
            <AIBotComponent type="openai" />
          </div>
          <div style={{ position: 'absolute', transform: `translate(250px, 300px)`, zIndex: 10 }}>
            <AIBotComponent type="claude" />
          </div>

          {/* Recommendation Panel Output */}
          <div style={{ position: 'absolute', transform: `translate(0px, 400px) scale(1.1)`, zIndex: 25 }}>
            <RecommendationPanel visibleCount={4} />
          </div>
        </div>

        {/* The Landing Page - Central focus of the flip */}
        <div style={{
          position: 'absolute',
          transform: `translate(0px, -50px) rotateY(${pageRotateY}deg)`,
          transformStyle: 'preserve-3d'
        }}>

          {/* FRONT: The Website Page */}
          <div style={{
            position: 'absolute',
            left: -310, top: -370, // Center the 620x740 page
            backfaceVisibility: 'hidden',
          }}>
            <WebsitePage
              copyText="AI-Optimized Growth"
              copyBadge="APPROVED ✓"
              isApprovedCopy={true}
              ctaText="Get Your Audit"
              isHighContrastCTA={true}
              isGridAligned={true}
            />
          </div>

          {/* BACK: The Infrastructure Nodes */}
          {/* Rotated 180deg so it faces forward when pageRotateY = 180 */}
          <div style={{
            position: 'absolute',
            left: -310, top: -370,
            width: 620, height: 740,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            backgroundColor: '#1a1a1a',
            border: '2px solid #333',
            borderRadius: 16,
            boxShadow: 'inset 0 0 100px rgba(0,0,0,0.8), 0 20px 40px rgba(0,0,0,0.2)'
          }}>

            {/* Draw messy connections */}
            <svg style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
              {NODES.map((node, i) => (
                i > 0 && !node.pruned && !NODES[i-1].pruned && (
                  <line
                    key={`line-${i}`}
                    x1={node.x + 70} y1={node.y + 37}
                    x2={NODES[i-1].x + 70} y2={NODES[i-1].y + 37}
                    stroke="#444" strokeWidth={3}
                    opacity={loupeX > Math.max(node.x, NODES[i-1].x) ? 0.3 : 1}
                  />
                )
              ))}
            </svg>

            {/* Nodes */}
            {NODES.map((node) => {
              const nodePassed = loupeX > (node.x + 100);
              const nodeBeingScanned = loupeX >= node.x && loupeX <= node.x + 200;

              const currentPrice = nodePassed ? (node.price * (1 - node.discount)) : node.price;

              if (node.pruned && nodePassed && !nodeBeingScanned) {
                return null;
              }

              const isPruning = node.pruned && nodeBeingScanned;

              return (
                <div key={node.id} style={{
                  position: 'absolute',
                  left: node.x, top: node.y,
                  width: 140, height: 75,
                  backgroundColor: isPruning ? '#ef4444' : (nodePassed ? '#10b981' : '#333'),
                  borderRadius: 12,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  boxShadow: nodeBeingScanned ? '0 0 30px white' : (nodePassed ? '0 0 20px rgba(16, 185, 129, 0.5)' : '0 0 10px black'),
                  transform: nodeBeingScanned ? 'scale(1.15)' : 'scale(1)',
                  zIndex: nodeBeingScanned ? 10 : 5,
                  color: 'white', fontFamily: 'sans-serif',
                  opacity: (node.pruned && nodePassed) ? 0 : 1,
                  transition: 'all 0.1s ease-out'
                }}>
                  <div style={{ fontSize: '12px', color: '#ccc', marginBottom: 2 }}>{node.name}</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                    ${Math.floor(currentPrice)}
                  </div>
                  {nodePassed && !node.pruned && (
                    <div style={{ fontSize: '10px', color: '#fff', backgroundColor: 'rgba(0,0,0,0.5)', padding: '2px 6px', borderRadius: 10, marginTop: 3 }}>
                      -{node.discount * 100}%
                    </div>
                  )}
                  {isPruning && (
                    <div style={{ position: 'absolute', color: 'white', fontWeight: 'bold', fontSize: '18px', textShadow: '0 0 10px red' }}>
                      PRUNED
                    </div>
                  )}
                </div>
              );
            })}

            {/* Magnifying Glass (Loupe) */}
            <div style={{
              position: 'absolute',
              left: loupeX, top: -100,
              width: 150, height: 1200,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              zIndex: 20,
              opacity: interpolate(frame, [90, 100, 250, 260], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <div style={{ position: 'absolute', top: 500, transform: 'scale(4)' }}>
                <Search color="rgba(255,255,255,0.8)" size={100} strokeWidth={1} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
