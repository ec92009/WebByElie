/**
 * 10 bespoke animated SVG toybox scenes (one per service motif)
 * plus the animated Savings Cat Coin Jar SVG.
 * All illustrative UI is clearly generic ("your business").
 */

const SCENES = {
  // 01. reassemble — browser tiles popping into a fresh layout
  reassemble: `<svg class="motif-svg" viewBox="0 0 480 260" role="img" aria-label="Playful animation of website blocks reassembling into a fresh layout">
    <rect width="480" height="260" fill="#fff8ec"/>
    <rect x="44" y="26" width="392" height="208" rx="22" fill="#ffffff" stroke="#1b1b1f" stroke-width="4"/>
    <path d="M44 62 H436 V48 A22 22 0 0 0 414 26 H66 A22 22 0 0 0 44 48 Z" fill="#ffc93c" stroke="#1b1b1f" stroke-width="4"/>
    <circle cx="70" cy="44" r="6" fill="#ff6b5b" stroke="#1b1b1f" stroke-width="2.5"/>
    <circle cx="90" cy="44" r="6" fill="#3ccf91" stroke="#1b1b1f" stroke-width="2.5"/>
    <circle cx="110" cy="44" r="6" fill="#2f5bff" stroke="#1b1b1f" stroke-width="2.5"/>
    <rect x="136" y="36" width="160" height="16" rx="8" fill="#fff8ec" stroke="#1b1b1f" stroke-width="2.5"/>
    <g class="anim-snap-a">
      <rect x="68" y="82" width="186" height="66" rx="14" fill="#c4b5ff" stroke="#1b1b1f" stroke-width="3.5"/>
      <rect x="84" y="98" width="110" height="12" rx="6" fill="#1b1b1f"/>
      <rect x="84" y="118" width="144" height="10" rx="5" fill="#ffffff" stroke="#1b1b1f" stroke-width="2"/>
    </g>
    <g class="anim-snap-b">
      <rect x="270" y="82" width="142" height="130" rx="14" fill="#3ccf91" stroke="#1b1b1f" stroke-width="3.5"/>
      <circle cx="341" cy="134" r="28" fill="#ffc93c" stroke="#1b1b1f" stroke-width="3"/>
      <rect x="294" y="176" width="94" height="16" rx="8" fill="#ffffff" stroke="#1b1b1f" stroke-width="2.5"/>
    </g>
    <g class="anim-pop">
      <rect x="68" y="162" width="86" height="50" rx="12" fill="#ff6b5b" stroke="#1b1b1f" stroke-width="3.5"/>
      <rect x="168" y="162" width="86" height="50" rx="12" fill="#2f5bff" stroke="#1b1b1f" stroke-width="3.5"/>
    </g>
  </svg>`,

  // 02. search — generic search results & scanning magnifier
  search: `<svg class="motif-svg" viewBox="0 0 480 260" role="img" aria-label="Illustrative search bar and structured page snippets being checked by a magnifier">
    <rect width="480" height="260" fill="#e4ecff"/>
    <rect x="46" y="28" width="388" height="44" rx="22" fill="#ffffff" stroke="#1b1b1f" stroke-width="4"/>
    <text x="72" y="56" font-family="sans-serif" font-weight="800" font-size="16" fill="#1b1b1f">your business + city</text>
    <rect x="356" y="36" width="68" height="28" rx="14" fill="#ffc93c" stroke="#1b1b1f" stroke-width="2.5"/>
    <text x="390" y="55" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="12" fill="#1b1b1f">FIND</text>
    <g class="anim-pop">
      <rect x="46" y="92" width="388" height="62" rx="16" fill="#ffffff" stroke="#1b1b1f" stroke-width="3.5"/>
      <rect x="66" y="106" width="180" height="14" rx="7" fill="#2f5bff"/>
      <rect x="66" y="128" width="290" height="10" rx="5" fill="#1b1b1f" opacity="0.25"/>
      <circle cx="404" cy="123" r="14" fill="#3ccf91" stroke="#1b1b1f" stroke-width="3"/>
      <path d="M398 123 L403 128 L412 117" fill="none" stroke="#1b1b1f" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <rect x="46" y="168" width="388" height="62" rx="16" fill="#fff8ec" stroke="#1b1b1f" stroke-width="3.5"/>
    <rect x="66" y="182" width="150" height="14" rx="7" fill="#ff6b5b"/>
    <rect x="66" y="204" width="250" height="10" rx="5" fill="#1b1b1f" opacity="0.22"/>
    <g class="anim-scan">
      <circle cx="170" cy="148" r="34" fill="#3ccf91" fill-opacity="0.32" stroke="#1b1b1f" stroke-width="5"/>
      <line x1="196" y1="174" x2="220" y2="198" stroke="#1b1b1f" stroke-width="9" stroke-linecap="round"/>
    </g>
  </svg>`,

  // 03. assistant — generic AI chat checking structured business facts
  assistant: `<svg class="motif-svg" viewBox="0 0 480 260" role="img" aria-label="Illustrative AI chat showing clear facts for services, area, and next step">
    <rect width="480" height="260" fill="#ede8ff"/>
    <rect x="116" y="24" width="320" height="46" rx="22" fill="#ffc93c" stroke="#1b1b1f" stroke-width="3.5"/>
    <text x="140" y="53" font-family="sans-serif" font-weight="800" font-size="15" fill="#1b1b1f">"What does your business offer?"</text>
    <rect x="44" y="88" width="360" height="146" rx="22" fill="#ffffff" stroke="#1b1b1f" stroke-width="4"/>
    <text x="68" y="116" font-family="sans-serif" font-weight="800" font-size="14" fill="#2f5bff">Clear facts from your site:</text>
    <g class="anim-pop">
      <rect x="66" y="130" width="96" height="82" rx="14" fill="#3ccf91" stroke="#1b1b1f" stroke-width="3"/>
      <text x="114" y="164" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="13" fill="#1b1b1f">SERVICES</text>
      <text x="114" y="192" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="18" fill="#1b1b1f">✓</text>
    </g>
    <g class="anim-pop-d1">
      <rect x="176" y="130" width="96" height="82" rx="14" fill="#ffc93c" stroke="#1b1b1f" stroke-width="3"/>
      <text x="224" y="164" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="13" fill="#1b1b1f">AREA</text>
      <text x="224" y="192" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="18" fill="#1b1b1f">✓</text>
    </g>
    <g class="anim-pop-d2">
      <rect x="286" y="130" width="96" height="82" rx="14" fill="#c4b5ff" stroke="#1b1b1f" stroke-width="3"/>
      <text x="334" y="164" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="13" fill="#1b1b1f">NEXT STEP</text>
      <text x="334" y="192" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="18" fill="#1b1b1f">✓</text>
    </g>
  </svg>`,

  // 04. savings — keep / change / cancel bill tags with gold coins
  savings: `<svg class="motif-svg" viewBox="0 0 480 260" role="img" aria-label="Playful illustration sorting subscriptions into keep, change, and cancel">
    <rect width="480" height="260" fill="#ffe4df"/>
    <g class="anim-snap-a">
      <rect x="44" y="34" width="180" height="54" rx="16" fill="#3ccf91" stroke="#1b1b1f" stroke-width="3.5"/>
      <text x="70" y="67" font-family="sans-serif" font-weight="900" font-size="16" fill="#1b1b1f">KEEP · Core host</text>
    </g>
    <g class="anim-snap-b">
      <rect x="44" y="104" width="180" height="54" rx="16" fill="#ffc93c" stroke="#1b1b1f" stroke-width="3.5"/>
      <text x="70" y="137" font-family="sans-serif" font-weight="900" font-size="16" fill="#1b1b1f">CHANGE · Tier</text>
    </g>
    <g class="anim-pop">
      <rect x="44" y="174" width="180" height="54" rx="16" fill="#ff6b5b" stroke="#1b1b1f" stroke-width="3.5"/>
      <text x="70" y="207" font-family="sans-serif" font-weight="900" font-size="16" fill="#1b1b1f">CANCEL · Unused</text>
    </g>
    <rect x="270" y="54" width="166" height="170" rx="34" fill="#ffffff" stroke="#1b1b1f" stroke-width="4"/>
    <rect x="296" y="34" width="114" height="26" rx="10" fill="#ffc93c" stroke="#1b1b1f" stroke-width="4"/>
    <circle class="anim-pin" cx="326" cy="112" r="22" fill="#ffc93c" stroke="#1b1b1f" stroke-width="3.5"/>
    <circle class="anim-pin-d1" cx="378" cy="134" r="22" fill="#ffc93c" stroke="#1b1b1f" stroke-width="3.5"/>
    <circle class="anim-pin-d2" cx="348" cy="176" r="22" fill="#ffc93c" stroke="#1b1b1f" stroke-width="3.5"/>
    <text x="326" y="118" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="18" fill="#1b1b1f">$</text>
    <text x="378" y="140" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="18" fill="#1b1b1f">$</text>
    <text x="348" y="182" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="18" fill="#1b1b1f">$</text>
  </svg>`,

  // 05. care — spinning update gear, uptime heart monitor, backup shield
  care: `<svg class="motif-svg" viewBox="0 0 480 260" role="img" aria-label="Monthly site care dashboard showing uptime pulse, updates, and backups">
    <rect width="480" height="260" fill="#dbf8ea"/>
    <rect x="44" y="32" width="392" height="196" rx="24" fill="#ffffff" stroke="#1b1b1f" stroke-width="4"/>
    <polyline points="72,112 128,112 146,74 168,148 190,94 208,112 270,112" fill="none" stroke="#3ccf91" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <g class="anim-spin">
      <circle cx="352" cy="114" r="34" fill="#ffc93c" stroke="#1b1b1f" stroke-width="4" stroke-dasharray="14 8"/>
      <circle cx="352" cy="114" r="14" fill="#ffffff" stroke="#1b1b1f" stroke-width="3.5"/>
    </g>
    <g class="anim-pop">
      <rect x="72" y="162" width="110" height="40" rx="14" fill="#c4b5ff" stroke="#1b1b1f" stroke-width="3"/>
      <text x="127" y="187" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="13" fill="#1b1b1f">BACKUPS ✓</text>
    </g>
    <g class="anim-pop-d1">
      <rect x="196" y="162" width="110" height="40" rx="14" fill="#3ccf91" stroke="#1b1b1f" stroke-width="3"/>
      <text x="251" y="187" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="13" fill="#1b1b1f">UPTIME ✓</text>
    </g>
    <g class="anim-pop-d2">
      <rect x="320" y="162" width="90" height="40" rx="14" fill="#ffc93c" stroke="#1b1b1f" stroke-width="3"/>
      <text x="365" y="187" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="13" fill="#1b1b1f">LOG ✓</text>
    </g>
  </svg>`,

  // 06. speed — rainbow speedometer gauge & keyboard focus pills
  speed: `<svg class="motif-svg" viewBox="0 0 480 260" role="img" aria-label="Speedometer swinging into green beside accessible keyboard-focused pills">
    <rect width="480" height="260" fill="#fff0c2"/>
    <rect x="40" y="30" width="220" height="200" rx="24" fill="#ffffff" stroke="#1b1b1f" stroke-width="4"/>
    <path d="M76 168 A74 74 0 0 1 130 96" fill="none" stroke="#ff6b5b" stroke-width="18" stroke-linecap="round"/>
    <path d="M138 94 A74 74 0 0 1 196 108" fill="none" stroke="#ffc93c" stroke-width="18" stroke-linecap="round"/>
    <path d="M202 114 A74 74 0 0 1 224 168" fill="none" stroke="#3ccf91" stroke-width="18" stroke-linecap="round"/>
    <g class="anim-gauge">
      <line x1="150" y1="170" x2="150" y2="108" stroke="#1b1b1f" stroke-width="6" stroke-linecap="round"/>
      <circle cx="150" cy="170" r="11" fill="#2f5bff" stroke="#1b1b1f" stroke-width="3.5"/>
    </g>
    <text x="150" y="210" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="14" fill="#1b1b1f">FAST &amp; LIGHT</text>
    <rect x="282" y="30" width="158" height="200" rx="24" fill="#ffffff" stroke="#1b1b1f" stroke-width="4"/>
    <rect class="anim-pop" x="302" y="58" width="118" height="36" rx="18" fill="#3ccf91" stroke="#1b1b1f" stroke-width="3"/>
    <text x="361" y="81" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="13" fill="#1b1b1f">CONTRAST AA</text>
    <rect class="anim-pop-d1" x="302" y="112" width="118" height="36" rx="18" fill="#c4b5ff" stroke="#1b1b1f" stroke-width="3"/>
    <text x="361" y="135" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="13" fill="#1b1b1f">KEYBOARD ⇥</text>
    <rect class="anim-pop-d2" x="302" y="166" width="118" height="36" rx="18" fill="#2f5bff" stroke="#1b1b1f" stroke-width="3"/>
    <text x="361" y="189" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="13" fill="#ffffff">WCAG 2.2</text>
  </svg>`,

  // 07. map — folded map with 3 synced bouncing pins
  map: `<svg class="motif-svg" viewBox="0 0 480 260" role="img" aria-label="Folded local map with aligned pins and consistent hours and address">
    <rect width="480" height="260" fill="#ffe4df"/>
    <polygon points="44,58 176,34 308,58 436,34 436,216 308,236 176,216 44,236" fill="#dbf8ea" stroke="#1b1b1f" stroke-width="4" stroke-linejoin="round"/>
    <line x1="176" y1="34" x2="176" y2="216" stroke="#1b1b1f" stroke-width="2.5" stroke-dasharray="6 6"/>
    <line x1="308" y1="58" x2="308" y2="236" stroke="#1b1b1f" stroke-width="2.5" stroke-dasharray="6 6"/>
    <path d="M64 176 Q176 124 276 154 T416 116" fill="none" stroke="#ffc93c" stroke-width="14" stroke-linecap="round"/>
    <g class="anim-pin">
      <path d="M126 146 C126 146 98 118 98 98 A28 28 0 1 1 154 98 C154 118 126 146 126 146 Z" fill="#ff6b5b" stroke="#1b1b1f" stroke-width="3.5"/>
      <circle cx="126" cy="96" r="10" fill="#ffffff" stroke="#1b1b1f" stroke-width="2.5"/>
    </g>
    <g class="anim-pin-d1">
      <path d="M242 152 C242 152 214 124 214 104 A28 28 0 1 1 270 104 C270 124 242 152 242 152 Z" fill="#2f5bff" stroke="#1b1b1f" stroke-width="3.5"/>
      <circle cx="242" cy="102" r="10" fill="#ffffff" stroke="#1b1b1f" stroke-width="2.5"/>
    </g>
    <g class="anim-pin-d2">
      <path d="M362 128 C362 128 334 100 334 80 A28 28 0 1 1 390 80 C390 100 362 128 362 128 Z" fill="#ffc93c" stroke="#1b1b1f" stroke-width="3.5"/>
      <circle cx="362" cy="78" r="10" fill="#ffffff" stroke="#1b1b1f" stroke-width="2.5"/>
    </g>
    <rect x="128" y="182" width="224" height="36" rx="18" fill="#ffffff" stroke="#1b1b1f" stroke-width="3.5"/>
    <text x="240" y="205" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="13" fill="#1b1b1f">NAME · HOURS · ADDRESS ✓</text>
  </svg>`,

  // 08. move — winged box flying from heavy builder to fast owned hosting
  move: `<svg class="motif-svg" viewBox="0 0 480 260" role="img" aria-label="Winged website box flying smoothly from a monthly builder to fast owned hosting">
    <rect width="480" height="260" fill="#e4ecff"/>
    <rect x="36" y="138" width="126" height="84" rx="18" fill="#ff6b5b" stroke="#1b1b1f" stroke-width="3.5"/>
    <text x="99" y="176" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="14" fill="#1b1b1f">BUILDER</text>
    <text x="99" y="198" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="12" fill="#1b1b1f">monthly fee</text>
    <rect x="318" y="138" width="126" height="84" rx="18" fill="#3ccf91" stroke="#1b1b1f" stroke-width="3.5"/>
    <text x="381" y="176" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="14" fill="#1b1b1f">YOU OWN IT</text>
    <text x="381" y="198" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="12" fill="#1b1b1f">fast static host</text>
    <path d="M116 124 Q240 24 364 124" fill="none" stroke="#1b1b1f" stroke-width="4" stroke-dasharray="10 8" stroke-linecap="round"/>
    <g class="anim-fly">
      <rect x="150" y="66" width="66" height="54" rx="12" fill="#ffc93c" stroke="#1b1b1f" stroke-width="3.5"/>
      <rect x="175" y="66" width="16" height="16" fill="#2f5bff" stroke="#1b1b1f" stroke-width="2.5"/>
      <path d="M150 86 C132 76 130 96 142 102 Z" fill="#ffffff" stroke="#1b1b1f" stroke-width="3"/>
      <path d="M216 86 C234 76 236 96 224 102 Z" fill="#ffffff" stroke="#1b1b1f" stroke-width="3"/>
    </g>
  </svg>`,

  // 09. helpers — practical automation conveyor with clear OFF switch
  helpers: `<svg class="motif-svg" viewBox="0 0 480 260" role="img" aria-label="Small practical helper sorting inbox drafts with a visible off switch">
    <rect width="480" height="260" fill="#ede8ff"/>
    <rect x="44" y="166" width="392" height="36" rx="18" fill="#1b1b1f"/>
    <circle cx="80" cy="184" r="9" fill="#ffc93c"/>
    <circle cx="160" cy="184" r="9" fill="#3ccf91"/>
    <circle cx="240" cy="184" r="9" fill="#ff6b5b"/>
    <circle cx="320" cy="184" r="9" fill="#c4b5ff"/>
    <circle cx="400" cy="184" r="9" fill="#ffc93c"/>
    <g class="anim-belt">
      <rect x="66" y="102" width="96" height="58" rx="14" fill="#ffffff" stroke="#1b1b1f" stroke-width="3.5"/>
      <polyline points="72,110 114,138 156,110" fill="none" stroke="#2f5bff" stroke-width="3.5"/>
      <rect x="184" y="102" width="112" height="58" rx="14" fill="#3ccf91" stroke="#1b1b1f" stroke-width="3.5"/>
      <text x="240" y="137" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="14" fill="#1b1b1f">DRAFT ✓</text>
    </g>
    <rect x="310" y="30" width="126" height="44" rx="22" fill="#ffffff" stroke="#1b1b1f" stroke-width="3.5"/>
    <circle cx="334" cy="52" r="14" fill="#3ccf91" stroke="#1b1b1f" stroke-width="3"/>
    <text x="386" y="57" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="13" fill="#1b1b1f">ON / OFF</text>
  </svg>`,

  // 10. multilingual — localized pages + hreflang route stack
  multilingual: `<svg class="motif-svg" viewBox="0 0 480 260" role="img" aria-label="Localized webpage with English, French, and Spanish tabs linked to clean hreflang routes">
    <rect width="480" height="260" fill="#dbf8ea"/>
    <rect x="52" y="24" width="176" height="212" rx="24" fill="#ffffff" stroke="#1b1b1f" stroke-width="4"/>
    <rect x="70" y="42" width="140" height="28" rx="14" fill="#ffc93c" stroke="#1b1b1f" stroke-width="2.8"/>
    <text x="140" y="61" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="12" fill="#1b1b1f">EN · FR · ES</text>
    <g class="anim-pop">
      <rect x="70" y="84" width="140" height="44" rx="12" fill="#fff8ec" stroke="#1b1b1f" stroke-width="2.5"/>
      <rect x="82" y="96" width="76" height="9" rx="4" fill="#1b1b1f"/>
      <rect x="82" y="112" width="52" height="8" rx="4" fill="#ff6b5b"/>
    </g>
    <g class="anim-pop-d1">
      <rect x="70" y="140" width="140" height="44" rx="12" fill="#fff8ec" stroke="#1b1b1f" stroke-width="2.5"/>
      <rect x="82" y="152" width="88" height="9" rx="4" fill="#1b1b1f"/>
      <rect x="82" y="168" width="58" height="8" rx="4" fill="#3ccf91"/>
    </g>
    <path d="M228 130 H272 M250 74 V186 M250 74 H272 M250 186 H272" fill="none" stroke="#1b1b1f" stroke-width="3.5" stroke-linecap="round"/>
    <rect x="272" y="50" width="154" height="44" rx="16" fill="#ffc93c" stroke="#1b1b1f" stroke-width="3.5"/>
    <text x="349" y="77" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="14" fill="#1b1b1f">/en/ · English</text>
    <rect x="272" y="108" width="154" height="44" rx="16" fill="#ffffff" stroke="#1b1b1f" stroke-width="3.5"/>
    <text x="349" y="135" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="14" fill="#1b1b1f">/fr/ · Français</text>
    <rect x="272" y="166" width="154" height="44" rx="16" fill="#c4b5ff" stroke="#1b1b1f" stroke-width="3.5"/>
    <text x="349" y="193" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="14" fill="#1b1b1f">/es/ · Español</text>
    <text x="349" y="236" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="12" fill="#1b1b1f">HREFLANG + SITEMAP</text>
  </svg>`,
};

export function renderMotifScene(motif) {
  return SCENES[motif] || SCENES.reassemble;
}

export function renderCoinJar() {
  return `<div class="coin-jar-wrap">
  <svg class="coin-jar-svg" viewBox="0 0 280 280" role="img" aria-label="Animated savings cat coin jar catching coins">
    <!-- Dropping coins -->
    <g class="jar-coin jar-coin-1">
      <circle cx="116" cy="48" r="18" fill="#ffc93c" stroke="#1b1b1f" stroke-width="3.5"/>
      <text x="116" y="54" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="16" fill="#1b1b1f">$</text>
    </g>
    <g class="jar-coin jar-coin-2">
      <circle cx="164" cy="40" r="18" fill="#ffc93c" stroke="#1b1b1f" stroke-width="3.5"/>
      <text x="164" y="46" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="16" fill="#1b1b1f">$</text>
    </g>

    <!-- Jar lid -->
    <rect x="78" y="78" width="124" height="26" rx="12" fill="#ffc93c" stroke="#1b1b1f" stroke-width="4"/>
    <rect x="112" y="87" width="56" height="8" rx="4" fill="#1b1b1f"/>

    <!-- Jar body -->
    <rect x="48" y="104" width="184" height="156" rx="42" fill="#ffffff" stroke="#1b1b1f" stroke-width="4.5"/>
    <path d="M70 124 V234" stroke="#e4ecff" stroke-width="10" stroke-linecap="round"/>

    <!-- Stacked coins inside jar -->
    <g class="jar-coin jar-coin-3">
      <circle cx="102" cy="222" r="20" fill="#ffc93c" stroke="#1b1b1f" stroke-width="3.5"/>
      <text x="102" y="228" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="16" fill="#1b1b1f">$</text>
    </g>
    <g class="jar-coin jar-coin-4">
      <circle cx="176" cy="222" r="20" fill="#ffc93c" stroke="#1b1b1f" stroke-width="3.5"/>
      <text x="176" y="228" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="16" fill="#1b1b1f">$</text>
    </g>
    <g class="jar-coin jar-coin-5">
      <circle cx="140" cy="204" r="21" fill="#ffc93c" stroke="#1b1b1f" stroke-width="3.5"/>
      <text x="140" y="210" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="16" fill="#1b1b1f">$</text>
    </g>

    <!-- Cute Savings Cat Sticker on front of jar -->
    <circle cx="140" cy="154" r="32" fill="#ff6b5b" stroke="#1b1b1f" stroke-width="3.5"/>
    <polygon points="116,138 118,116 134,128" fill="#ff6b5b" stroke="#1b1b1f" stroke-width="3.2" stroke-linejoin="round"/>
    <polygon points="164,138 162,116 146,128" fill="#ff6b5b" stroke="#1b1b1f" stroke-width="3.2" stroke-linejoin="round"/>
    <circle cx="129" cy="150" r="4" fill="#1b1b1f"/>
    <circle cx="151" cy="150" r="4" fill="#1b1b1f"/>
    <path d="M132 162 Q136 167 140 162 Q144 167 148 162" fill="none" stroke="#1b1b1f" stroke-width="2.8" stroke-linecap="round"/>
  </svg>
</div>`;
}
