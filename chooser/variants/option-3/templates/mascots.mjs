/**
 * 10 original geometric inline-SVG mascots for Option 3 ("Toybox").
 * Each mascot has blinking eyelids (.mascot-eye) and pointer-tracking pupils (.mascot-pupil).
 */

function eyePair(lx, rx, y, r = 6.5, pr = 3.2) {
  return `<g class="mascot-eye">
    <circle cx="${lx}" cy="${y}" r="${r}" fill="#ffffff" stroke="#1b1b1f" stroke-width="2.6"/>
    <circle class="mascot-pupil" cx="${lx}" cy="${y}" r="${pr}" fill="#1b1b1f"/>
  </g>
  <g class="mascot-eye">
    <circle cx="${rx}" cy="${y}" r="${r}" fill="#ffffff" stroke="#1b1b1f" stroke-width="2.6"/>
    <circle class="mascot-pupil" cx="${rx}" cy="${y}" r="${pr}" fill="#1b1b1f"/>
  </g>`;
}

const MASCOTS = {
  // 01. Browser Buddy — smiling browser window with eyes
  refresh: `<g class="mascot-float">
    <rect x="14" y="22" width="92" height="76" rx="18" fill="#ffffff" stroke="#1b1b1f" stroke-width="4"/>
    <path d="M14 44 H106 V40 A18 18 0 0 0 88 22 H32 A18 18 0 0 0 14 40 Z" fill="#ffc93c" stroke="#1b1b1f" stroke-width="4"/>
    <circle cx="29" cy="33" r="4" fill="#ff6b5b" stroke="#1b1b1f" stroke-width="2"/>
    <circle cx="43" cy="33" r="4" fill="#3ccf91" stroke="#1b1b1f" stroke-width="2"/>
    <circle cx="57" cy="33" r="4" fill="#2f5bff" stroke="#1b1b1f" stroke-width="2"/>
    ${eyePair(45, 75, 65)}
    <circle cx="33" cy="74" r="4.5" fill="#ff6b5b" opacity="0.45"/>
    <circle cx="87" cy="74" r="4.5" fill="#ff6b5b" opacity="0.45"/>
    <path d="M48 79 Q60 90 72 79" fill="none" stroke="#1b1b1f" stroke-width="3.6" stroke-linecap="round"/>
    <path d="M98 14 L101 21 L108 24 L101 27 L98 34 L95 27 L88 24 L95 21 Z" fill="#ffc93c" stroke="#1b1b1f" stroke-width="2"/>
  </g>`,

  // 02. Magnifier Pal — chunky cobalt & mint magnifying glass
  seo: `<g class="mascot-float">
    <path d="M78 78 L104 104" stroke="#1b1b1f" stroke-width="15" stroke-linecap="round"/>
    <path d="M78 78 L104 104" stroke="#ffc93c" stroke-width="8" stroke-linecap="round"/>
    <circle cx="54" cy="54" r="38" fill="#2f5bff" stroke="#1b1b1f" stroke-width="4"/>
    <circle cx="54" cy="54" r="28" fill="#dbf8ea" stroke="#1b1b1f" stroke-width="3.2"/>
    ${eyePair(43, 65, 51, 6, 3)}
    <path d="M45 64 Q54 73 63 64" fill="none" stroke="#1b1b1f" stroke-width="3.4" stroke-linecap="round"/>
    <path d="M35 36 Q42 30 50 32" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round"/>
  </g>`,

  // 03. Friendly Little Bot — lilac AI buddy with glowing antenna
  "ai-ready": `<g class="mascot-float">
    <line x1="60" y1="26" x2="60" y2="14" stroke="#1b1b1f" stroke-width="4" stroke-linecap="round"/>
    <circle cx="60" cy="12" r="7" fill="#ffc93c" stroke="#1b1b1f" stroke-width="3"/>
    <rect x="10" y="48" width="12" height="24" rx="6" fill="#3ccf91" stroke="#1b1b1f" stroke-width="3.5"/>
    <rect x="98" y="48" width="12" height="24" rx="6" fill="#3ccf91" stroke="#1b1b1f" stroke-width="3.5"/>
    <rect x="20" y="26" width="80" height="72" rx="22" fill="#c4b5ff" stroke="#1b1b1f" stroke-width="4"/>
    <rect x="30" y="38" width="60" height="46" rx="14" fill="#ffffff" stroke="#1b1b1f" stroke-width="3.2"/>
    ${eyePair(47, 73, 56, 6.2, 3.1)}
    <path d="M49 71 Q60 79 71 71" fill="none" stroke="#1b1b1f" stroke-width="3.4" stroke-linecap="round"/>
  </g>`,

  // 04. Savings Cat — plump coral cat nodding to the Savings Cat video + gold coin
  "cost-cleanup": `<g class="mascot-float">
    <polygon points="24,48 28,16 52,34" fill="#ff6b5b" stroke="#1b1b1f" stroke-width="4" stroke-linejoin="round"/>
    <polygon points="96,48 92,16 68,34" fill="#ff6b5b" stroke="#1b1b1f" stroke-width="4" stroke-linejoin="round"/>
    <circle cx="60" cy="64" r="38" fill="#ff6b5b" stroke="#1b1b1f" stroke-width="4"/>
    <ellipse cx="60" cy="74" rx="22" ry="16" fill="#fff8ec"/>
    ${eyePair(45, 75, 58, 6.5, 3.2)}
    <polygon points="56,67 64,67 60,72" fill="#1b1b1f"/>
    <path d="M50 75 Q55 81 60 75 Q65 81 70 75" fill="none" stroke="#1b1b1f" stroke-width="3" stroke-linecap="round"/>
    <line x1="14" y1="64" x2="29" y2="66" stroke="#1b1b1f" stroke-width="2.8" stroke-linecap="round"/>
    <line x1="15" y1="74" x2="30" y2="73" stroke="#1b1b1f" stroke-width="2.8" stroke-linecap="round"/>
    <line x1="91" y1="66" x2="106" y2="64" stroke="#1b1b1f" stroke-width="2.8" stroke-linecap="round"/>
    <line x1="90" y1="73" x2="105" y2="74" stroke="#1b1b1f" stroke-width="2.8" stroke-linecap="round"/>
    <circle cx="92" cy="92" r="14" fill="#ffc93c" stroke="#1b1b1f" stroke-width="3.5"/>
    <text x="92" y="97" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="14" fill="#1b1b1f">$</text>
  </g>`,

  // 05. Site Care — Wrench & Heart Buddy
  "site-care": `<g class="mascot-float">
    <path d="M60 100 C28 80 16 60 16 42 C16 26 28 16 42 16 C51 16 57 21 60 27 C63 21 69 16 78 16 C92 16 104 26 104 42 C104 60 92 80 60 100 Z" fill="#3ccf91" stroke="#1b1b1f" stroke-width="4" stroke-linejoin="round"/>
    ${eyePair(45, 75, 49, 6.2, 3)}
    <path d="M49 64 Q60 74 71 64" fill="none" stroke="#1b1b1f" stroke-width="3.4" stroke-linecap="round"/>
    <rect x="74" y="72" width="32" height="14" rx="7" transform="rotate(-35 90 79)" fill="#ffc93c" stroke="#1b1b1f" stroke-width="3"/>
    <circle cx="79" cy="87" r="4" fill="#ffffff" stroke="#1b1b1f" stroke-width="2.2"/>
  </g>`,

  // 06. Speed & Accessibility — Rocket Lightning Buddy
  "speed-access": `<g class="mascot-float">
    <path d="M26 78 L14 96 L36 88 Z" fill="#ff6b5b" stroke="#1b1b1f" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M94 78 L106 96 L84 88 Z" fill="#ff6b5b" stroke="#1b1b1f" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M60 12 C82 26 88 54 84 90 H36 C32 54 38 26 60 12 Z" fill="#ffc93c" stroke="#1b1b1f" stroke-width="4" stroke-linejoin="round"/>
    <path d="M48 90 L60 110 L72 90 Z" fill="#ff6b5b" stroke="#1b1b1f" stroke-width="3.5" stroke-linejoin="round"/>
    <circle cx="60" cy="54" r="20" fill="#ffffff" stroke="#1b1b1f" stroke-width="3.5"/>
    ${eyePair(52, 68, 52, 5.2, 2.6)}
    <path d="M52 63 Q60 70 68 63" fill="none" stroke="#1b1b1f" stroke-width="3" stroke-linecap="round"/>
  </g>`,

  // 07. Local Presence — Map Pin Buddy
  "local-presence": `<g class="mascot-float">
    <ellipse cx="60" cy="106" rx="28" ry="8" fill="#3ccf91" stroke="#1b1b1f" stroke-width="3"/>
    <path d="M60 102 C60 102 24 72 24 46 C24 25 40 12 60 12 C80 12 96 25 96 46 C96 72 60 102 60 102 Z" fill="#ff6b5b" stroke="#1b1b1f" stroke-width="4" stroke-linejoin="round"/>
    <circle cx="60" cy="46" r="23" fill="#ffffff" stroke="#1b1b1f" stroke-width="3.5"/>
    ${eyePair(51, 69, 44, 5.5, 2.7)}
    <path d="M51 56 Q60 63 69 56" fill="none" stroke="#1b1b1f" stroke-width="3.2" stroke-linecap="round"/>
  </g>`,

  // 08. Platform Move — Box-with-Wings Buddy
  "platform-move": `<g class="mascot-float">
    <path class="mascot-wing-l" d="M28 54 C8 38 6 60 18 68 C8 74 16 84 28 74 Z" fill="#ffffff" stroke="#1b1b1f" stroke-width="3.5" stroke-linejoin="round"/>
    <path class="mascot-wing-r" d="M92 54 C112 38 114 60 102 68 C112 74 104 84 92 74 Z" fill="#ffffff" stroke="#1b1b1f" stroke-width="3.5" stroke-linejoin="round"/>
    <rect x="26" y="28" width="68" height="66" rx="14" fill="#ffc93c" stroke="#1b1b1f" stroke-width="4"/>
    <rect x="52" y="28" width="16" height="18" fill="#2f5bff" stroke="#1b1b1f" stroke-width="3"/>
    ${eyePair(46, 74, 62, 6, 3)}
    <path d="M50 76 Q60 85 70 76" fill="none" stroke="#1b1b1f" stroke-width="3.4" stroke-linecap="round"/>
  </g>`,

  // 09. AI Helpers — Spark Bot
  "ai-helpers": `<g class="mascot-float">
    <path d="M60 6 L64 17 L75 21 L64 25 L60 36 L56 25 L45 21 L56 17 Z" fill="#ffc93c" stroke="#1b1b1f" stroke-width="3" stroke-linejoin="round"/>
    <rect x="22" y="34" width="76" height="66" rx="26" fill="#3ccf91" stroke="#1b1b1f" stroke-width="4"/>
    <rect x="33" y="46" width="54" height="38" rx="16" fill="#c4b5ff" stroke="#1b1b1f" stroke-width="3"/>
    ${eyePair(48, 72, 62, 5.8, 2.9)}
    <path d="M51 74 Q60 80 69 74" fill="none" stroke="#1b1b1f" stroke-width="3.2" stroke-linecap="round"/>
  </g>`,

  // 10. Phone Menus — Little Menu Card Buddy
  menus: `<g class="mascot-float">
    <rect x="26" y="14" width="68" height="92" rx="18" fill="#ffffff" stroke="#1b1b1f" stroke-width="4"/>
    <rect x="34" y="24" width="52" height="16" rx="8" fill="#ffc93c" stroke="#1b1b1f" stroke-width="2.8"/>
    <circle cx="44" cy="32" r="3" fill="#1b1b1f"/>
    <line x1="52" y1="32" x2="76" y2="32" stroke="#1b1b1f" stroke-width="3" stroke-linecap="round"/>
    ${eyePair(48, 72, 58, 5.8, 2.9)}
    <path d="M50 71 Q60 79 70 71" fill="none" stroke="#1b1b1f" stroke-width="3.2" stroke-linecap="round"/>
    <rect x="44" y="84" width="32" height="12" rx="6" fill="#3ccf91" stroke="#1b1b1f" stroke-width="2.6"/>
  </g>`,
};

export function renderMascot(slug, sizeClass = "") {
  const body = MASCOTS[slug] || MASCOTS.refresh;
  return `<svg class="mascot-svg ${sizeClass}" viewBox="0 0 120 120" aria-hidden="true" focusable="false">${body}</svg>`;
}
