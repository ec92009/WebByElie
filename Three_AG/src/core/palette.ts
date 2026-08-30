import * as THREE from 'three';

export const PALETTE = {
  // Studio environment
  background: 0xf6f5f1,      // Bright warm neutral
  gridLine: 0xe2ded4,        // Subtle architectural grid line
  inkDark: 0x1e2229,         // Dark ink for outlines and high contrast copy
  inkMedium: 0x4a5160,       // Secondary text ink
  cardBg: 0xffffff,          // Pristine paper/card background
  panelHeader: 0xeeebe3,     // Card headers & tabs

  // Accents
  green: 0x10b981,          // Refresh / Approval / Success green
  greenLight: 0xd1fae5,     // Light green highlight background
  blue: 0x2563eb,           // Tech / Link / Structure blue
  blueLight: 0xdbeafe,      // Light blue highlight
  terracotta: 0xd97706,     // Claude warm terracotta accent
  rust: 0xc2410c,           // Attention / Strike-through rust red
  gold: 0xf59e0b,           // Coin / Dollar sign / Value gold
  goldDark: 0xd97706,       // Dollar sign edge gold
  teal: 0x0d9488,           // OpenAI cool teal/green accent
  purple: 0x8b5cf6,         // Database / Indexing violet

  // Materials
  inkOutline: 0x272c36,
  catFur: 0xeab308,          // Warm golden-amber cat fur
  catBelly: 0xfef08a,        // Cream cat belly
  catVest: 0x1e293b,         // Dark navy velvet waistcoat
  catPockets: 0x334155,       // Navy pocket fabric
  catInnerPocket: 0x0f172a,  // Deep pocket interior shadow
  catPaws: 0xfef08a,          // Cream bare paws
};

export function createInkMaterial(color: number, roughness = 0.4): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    roughness,
    metalness: 0.05,
    flatShading: false
  });
}

export function createOutlineMaterial(): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({
    color: PALETTE.inkOutline,
    side: THREE.BackSide
  });
}
