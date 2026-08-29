import React from 'react';

interface WebsitePageProps {
  zNav?: number;
  zHero?: number;
  zVagueCopy?: number;
  zImage?: number;
  zCards?: number;
  zProof?: number;
  zCTA?: number;

  copyText?: string;
  copyBadge?: string;
  isApprovedCopy?: boolean;

  ctaText?: string;
  isHighContrastCTA?: boolean;

  rotationY?: number;
  rotationX?: number;
  posX?: number;

  proofPos?: { x: number; y: number; z: number };
  showBlueprintGrid?: boolean;
  showStrikeThrough?: boolean;
  isGridAligned?: boolean;
}

export const WebsitePage: React.FC<WebsitePageProps> = ({
  zNav = 0,
  zHero = 0,
  zVagueCopy = 0,
  zImage = 0,
  zCards = 0,
  zProof = 0,
  zCTA = 0,
  copyText = "We help with your website.",
  copyBadge = "TOO BROAD",
  isApprovedCopy = false,
  ctaText = "Contact Us",
  isHighContrastCTA = false,
  rotationY = 0,
  rotationX = 0,
  posX = 0,
  proofPos,
  showBlueprintGrid = false,
  showStrikeThrough = false,
  isGridAligned = false
}) => {
  return (
    <div style={{
      width: 620,
      height: 740,
      backgroundColor: '#ffffff',
      borderRadius: 16,
      boxShadow: isGridAligned ? '0 25px 50px rgba(16, 185, 129, 0.25)' : '0 20px 40px rgba(0,0,0,0.15)',
      border: `2px solid ${isGridAligned ? '#10b981' : '#e2ded4'}`,
      position: 'relative',
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      transform: `translateX(${posX}px) rotateY(${rotationY}deg) rotateX(${rotationX}deg)`,
      transformStyle: 'preserve-3d',
      transition: 'transform 0.1s linear, border 0.3s ease'
    }}>
      {/* Blueprint Alignment Lines Overlay */}
      {showBlueprintGrid && (
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: 'linear-gradient(to right, rgba(239, 68, 68, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(239, 68, 68, 0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          borderRadius: 16,
          zIndex: 1
        }} />
      )}

      {/* 1. Navigation */}
      <div style={{
        height: 50,
        backgroundColor: '#f1f5f9',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        transform: `translateZ(${zNav}px)`,
        boxShadow: zNav > 10 ? '0 10px 20px rgba(0,0,0,0.15)' : 'none',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{ fontWeight: 'bold', fontSize: 18, color: '#1e293b' }}>Acme Services</div>
        <div style={{ fontSize: 13, color: '#64748b' }}>Home • About • Services • Contact</div>
      </div>

      {/* 2. Hero Headline */}
      <div style={{
        transform: `translateZ(${zHero}px)`,
        fontSize: 26,
        fontWeight: 'bold',
        color: '#0f172a',
        position: 'relative',
        zIndex: 2
      }}>
        Modern Solutions For Your Business
      </div>

      {/* 3. Vague Copy / Rewritten Copy */}
      <div style={{
        transform: `translateZ(${zVagueCopy}px)`,
        padding: 16,
        borderRadius: 8,
        backgroundColor: isApprovedCopy ? '#ecfdf5' : '#fef2f2',
        border: `2px solid ${isApprovedCopy ? '#10b981' : '#fca5a5'}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: isApprovedCopy ? '#065f46' : '#991b1b',
          textDecoration: showStrikeThrough && !isApprovedCopy ? 'line-through' : 'none'
        }}>
          {copyText}
        </div>
        {copyBadge && (
          <div style={{
            backgroundColor: isApprovedCopy ? '#10b981' : '#ef4444',
            color: '#fff',
            fontSize: 12,
            fontWeight: 'bold',
            padding: '4px 10px',
            borderRadius: 4
          }}>
            {copyBadge}
          </div>
        )}
      </div>

      {/* 4. Proof Block (relocatable) */}
      <div style={{
        transform: proofPos ? `translate(${proofPos.x}px, ${proofPos.y}px) translateZ(${proofPos.z}px)` : `translateZ(${zProof}px)`,
        padding: 14,
        backgroundColor: '#f8fafc',
        border: '2px solid #e2e8f0',
        borderRadius: 8,
        fontStyle: 'italic',
        fontSize: 14,
        color: '#334155',
        position: 'relative',
        zIndex: proofPos ? 10 : 2,
        boxShadow: proofPos ? '0 12px 24px rgba(37, 99, 235, 0.2)' : 'none'
      }}>
        "Elie doubled our leads in 3 weeks!" — Local Business Owner
      </div>

      {/* 5. Generic Image Placeholder */}
      <div style={{
        transform: `translateZ(${zImage}px)`,
        height: 130,
        backgroundColor: '#e2e8f0',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#64748b',
        fontSize: 14,
        position: 'relative',
        zIndex: 2
      }}>
        [ Generic Stock Photo Placeholder ]
      </div>

      {/* 6. Service Cards */}
      <div style={{
        transform: `translateZ(${zCards}px)`,
        display: 'flex',
        gap: 12,
        position: 'relative',
        zIndex: 2
      }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{
            flex: 1,
            padding: 10,
            backgroundColor: '#f8fafc',
            border: '1px solid #cbd5e1',
            borderRadius: 6
          }}>
            <div style={{ fontWeight: 'bold', fontSize: 14, color: '#334155' }}>Service 0{i}</div>
            <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>Standard features & support.</div>
          </div>
        ))}
      </div>

      {/* 7. CTA Button */}
      <div style={{
        transform: `translateZ(${zCTA}px)`,
        alignSelf: 'center',
        marginTop: 6,
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          backgroundColor: isHighContrastCTA ? '#10b981' : '#94a3b8',
          color: '#ffffff',
          fontWeight: 'bold',
          fontSize: 18,
          padding: '14px 40px',
          borderRadius: 8,
          textAlign: 'center',
          boxShadow: isHighContrastCTA ? '0 10px 20px rgba(16, 185, 129, 0.4)' : 'none',
          transition: 'all 0.3s ease'
        }}>
          {ctaText}
        </div>
      </div>
    </div>
  );
};
