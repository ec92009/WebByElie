/**
 * Bespoke animated SVG "ink engraving / line-art" illustrations for each service motif.
 * Strictly zero inline styles; `js/main.js` sets stagger delays via `--md`.
 */

const MOTIFS = {
  reassemble: {
    caption: "Plate · Editorial reassembly",
    svg: `<svg class="motif-svg" viewBox="0 0 380 280" role="img" aria-label="Ink engraving illustrating website layout reassembly">
      <title>Website layout reassembly engraving</title>
      <!-- Crop marks -->
      <path class="m-fine m-draw" d="M24 36 H38 M36 24 V38 M342 24 V38 M340 36 H356 M24 244 H38 M36 242 V256 M342 242 V256 M340 244 H356"/>
      <!-- Main page sheet -->
      <rect class="m-fill-paper m-ink m-draw" x="56" y="42" width="188" height="196" rx="2"/>
      <line class="m-fine m-draw" x1="56" y1="68" x2="244" y2="68"/>
      <circle class="m-ink" cx="70" cy="55" r="3"/>
      <circle class="m-ink" cx="82" cy="55" r="3"/>
      <circle class="m-ink" cx="94" cy="55" r="3"/>
      <!-- Existing preserved blocks -->
      <rect class="m-fill-soft m-ink m-draw" x="72" y="84" width="156" height="44"/>
      <line class="m-fine m-draw" x1="84" y1="100" x2="178" y2="100"/>
      <line class="m-fine m-draw" x1="84" y1="112" x2="148" y2="112"/>
      <rect class="m-fill-sage m-sage m-draw" x="72" y="142" width="72" height="78"/>
      <line class="m-fine m-draw" x1="82" y1="158" x2="132" y2="158"/>
      <line class="m-fine m-draw" x1="82" y1="170" x2="124" y2="170"/>
      <line class="m-fine m-draw" x1="82" y1="182" x2="128" y2="182"/>
      <!-- Floating new module sliding into place -->
      <g class="m-float">
        <rect class="m-fill-paper m-vermilion m-draw" x="166" y="132" width="144" height="84" rx="2"/>
        <line class="m-vermilion m-draw" x1="182" y1="154" x2="282" y2="154"/>
        <line class="m-fine m-draw" x1="182" y1="170" x2="290" y2="170"/>
        <line class="m-fine m-draw" x1="182" y1="184" x2="262" y2="184"/>
        <rect class="m-fill-vermilion" x="182" y="196" width="44" height="8" rx="1"/>
      </g>
      <!-- Placement guide arrow -->
      <path class="m-vermilion m-draw" d="M276 74 C298 78, 314 96, 306 122"/>
      <path class="m-vermilion m-draw" d="M298 114 L306 124 L314 113"/>
      <text class="m-label" x="256" y="64">Option B</text>
    </svg>`,
  },

  search: {
    caption: "Plate · Structured search loupe",
    svg: `<svg class="motif-svg" viewBox="0 0 380 280" role="img" aria-label="Ink engraving of a magnifying glass examining structured page headings">
      <title>Structured search loupe engraving</title>
      <!-- Document folio -->
      <rect class="m-fill-paper m-ink m-draw" x="48" y="34" width="212" height="212" rx="2"/>
      <text class="m-label" x="68" y="62">Title &middot; Description</text>
      <line class="m-vermilion m-draw" x1="68" y1="74" x2="220" y2="74"/>
      <line class="m-fine m-draw" x1="68" y1="88" x2="236" y2="88"/>
      <line class="m-fine m-draw" x1="68" y1="100" x2="210" y2="100"/>
      <!-- Heading hierarchy lines -->
      <text class="m-label" x="68" y="130">H1</text>
      <line class="m-ink m-draw" x1="94" y1="126" x2="226" y2="126"/>
      <text class="m-label" x="68" y="156">H2</text>
      <line class="m-sage m-draw" x1="94" y1="152" x2="196" y2="152"/>
      <text class="m-label" x="68" y="182">H2</text>
      <line class="m-sage m-draw" x1="94" y1="178" x2="212" y2="178"/>
      <line class="m-fine m-draw" x1="68" y1="208" x2="180" y2="208"/>
      <line class="m-fine m-draw" x1="68" y1="220" x2="154" y2="220"/>
      <!-- Engraved Loupe -->
      <g class="m-float">
        <circle class="m-fill-paper m-ink m-draw" cx="258" cy="144" r="54"/>
        <circle class="m-fine m-draw" cx="258" cy="144" r="44"/>
        <path class="m-vermilion m-draw" d="M236 144 L250 158 L280 128"/>
        <line class="m-ink m-draw" x1="297" y1="183" x2="334" y2="220"/>
        <line class="m-vermilion m-draw" x1="305" y1="191" x2="328" y2="214"/>
      </g>
    </svg>`,
  },

  assistant: {
    caption: "Plate · Answer-ready fact sheet",
    svg: `<svg class="motif-svg" viewBox="0 0 380 280" role="img" aria-label="Ink engraving showing structured business facts flowing into an assistant answer box">
      <title>AI-ready structured facts engraving</title>
      <!-- Left: structured index card -->
      <rect class="m-fill-paper m-ink m-draw" x="34" y="48" width="136" height="184" rx="2"/>
      <line class="m-fine m-draw" x1="34" y1="74" x2="170" y2="74"/>
      <text class="m-label" x="48" y="65">llms.txt &middot; Facts</text>
      <text class="m-label" x="48" y="98">Services</text>
      <line class="m-ink m-draw" x1="48" y1="108" x2="150" y2="108"/>
      <text class="m-label" x="48" y="138">Area</text>
      <line class="m-sage m-draw" x1="48" y1="148" x2="138" y2="148"/>
      <text class="m-label" x="48" y="178">Next step</text>
      <line class="m-vermilion m-draw" x1="48" y1="188" x2="146" y2="188"/>
      <!-- Connecting conduits -->
      <path class="m-vermilion m-draw" d="M170 112 C196 112, 194 128, 218 128"/>
      <path class="m-sage m-draw" d="M170 148 H218"/>
      <path class="m-ink m-draw" d="M170 184 C196 184, 194 166, 218 166"/>
      <!-- Right: illustrative assistant card -->
      <rect class="m-fill-paper m-ink m-draw" x="218" y="64" width="130" height="148" rx="4"/>
      <circle class="m-vermilion m-pulse" cx="240" cy="88" r="7"/>
      <text class="m-label" x="256" y="91">Illustrative</text>
      <line class="m-fine m-draw" x1="234" y1="114" x2="332" y2="114"/>
      <line class="m-ink m-draw" x1="234" y1="130" x2="326" y2="130"/>
      <line class="m-ink m-draw" x1="234" y1="146" x2="314" y2="146"/>
      <line class="m-sage m-draw" x1="234" y1="162" x2="322" y2="162"/>
      <path class="m-vermilion m-draw" d="M234 186 L242 194 L256 180"/>
      <text class="m-label" x="266" y="191">Clear facts</text>
    </svg>`,
  },

  savings: {
    caption: "Plate · Subscription & renewal ledger",
    svg: `<svg class="motif-svg" viewBox="0 0 380 280" role="img" aria-label="Ink engraving of a subscription ledger with keep and cancel marks">
      <title>Cost cleanup ledger engraving</title>
      <!-- Printed ledger -->
      <rect class="m-fill-paper m-ink m-draw" x="46" y="34" width="288" height="212" rx="2"/>
      <line class="m-ink m-draw" x1="46" y1="68" x2="334" y2="68"/>
      <line class="m-fine m-draw" x1="252" y1="34" x2="252" y2="246"/>
      <text class="m-label" x="64" y="55">Item / Subscription</text>
      <text class="m-label" x="266" y="55">Decision</text>
      <!-- Row 1: Keep -->
      <line class="m-fine m-draw" x1="46" y1="112" x2="334" y2="112"/>
      <line class="m-ink m-draw" x1="66" y1="90" x2="188" y2="90"/>
      <path class="m-sage m-draw" d="M276 90 L285 99 L302 81"/>
      <!-- Row 2: Overlap struck through -->
      <line class="m-fine m-draw" x1="46" y1="156" x2="334" y2="156"/>
      <line class="m-fine m-draw" x1="66" y1="134" x2="212" y2="134"/>
      <path class="m-vermilion m-draw" d="M60 137 C116 128, 174 139, 224 131"/>
      <path class="m-vermilion m-draw" d="M280 126 L298 144 M298 126 L280 144"/>
      <!-- Row 3: Unused struck through -->
      <line class="m-fine m-draw" x1="46" y1="200" x2="334" y2="200"/>
      <line class="m-fine m-draw" x1="66" y1="178" x2="196" y2="178"/>
      <path class="m-vermilion m-draw" d="M60 181 C112 173, 166 183, 210 175"/>
      <path class="m-vermilion m-draw" d="M280 170 L298 188 M298 170 L280 188"/>
      <!-- Row 4: Keep -->
      <line class="m-ink m-draw" x1="66" y1="222" x2="174" y2="222"/>
      <path class="m-sage m-draw" d="M276 222 L285 231 L302 213"/>
    </svg>`,
  },

  care: {
    caption: "Plate · Monthly care chronometer",
    svg: `<svg class="motif-svg" viewBox="0 0 380 280" role="img" aria-label="Ink engraving of a monthly chronometer dial and change log">
      <title>Monthly site care chronometer engraving</title>
      <!-- Outer dial -->
      <circle class="m-fill-paper m-ink m-draw" cx="136" cy="140" r="84"/>
      <circle class="m-fine m-draw" cx="136" cy="140" r="70"/>
      <!-- Rotating dashed tick ring -->
      <g class="m-spin">
        <circle class="m-sage m-draw" cx="136" cy="140" r="56" stroke-dasharray="6 10"/>
      </g>
      <!-- Clock hands -->
      <line class="m-ink m-draw" x1="136" y1="140" x2="136" y2="96"/>
      <line class="m-vermilion m-draw" x1="136" y1="140" x2="172" y2="154"/>
      <circle class="m-fill-vermilion" cx="136" cy="140" r="4"/>
      <!-- Monthly log card -->
      <rect class="m-fill-paper m-ink m-draw" x="234" y="64" width="112" height="152" rx="2"/>
      <text class="m-label" x="248" y="88">Change log</text>
      <line class="m-fine m-draw" x1="248" y1="98" x2="332" y2="98"/>
      <path class="m-sage m-draw" d="M248 120 L254 126 L266 114"/>
      <line class="m-ink m-draw" x1="274" y1="120" x2="328" y2="120"/>
      <path class="m-sage m-draw" d="M248 150 L254 156 L266 144"/>
      <line class="m-ink m-draw" x1="274" y1="150" x2="322" y2="150"/>
      <path class="m-sage m-draw" d="M248 180 L254 186 L266 174"/>
      <line class="m-ink m-draw" x1="274" y1="180" x2="330" y2="180"/>
    </svg>`,
  },

  speed: {
    caption: "Plate · Velocity & accessibility dial",
    svg: `<svg class="motif-svg" viewBox="0 0 380 280" role="img" aria-label="Ink engraving of a speed gauge and WCAG accessibility contrast marks">
      <title>Speed and accessibility gauge engraving</title>
      <!-- Gauge arc -->
      <path class="m-fine m-draw" d="M64 206 A126 126 0 0 1 316 206"/>
      <path class="m-ink m-draw" d="M84 206 A106 106 0 0 1 296 206"/>
      <!-- Fast sage zone -->
      <path class="m-sage m-draw" d="M244 114 A106 106 0 0 1 296 206"/>
      <!-- Tick marks -->
      <line class="m-ink m-draw" x1="84" y1="206" x2="98" y2="206"/>
      <line class="m-ink m-draw" x1="115" y1="131" x2="125" y2="141"/>
      <line class="m-ink m-draw" x1="190" y1="100" x2="190" y2="114"/>
      <line class="m-ink m-draw" x1="265" y1="131" x2="255" y2="141"/>
      <line class="m-ink m-draw" x1="296" y1="206" x2="282" y2="206"/>
      <!-- Needle -->
      <line class="m-vermilion m-draw" x1="190" y1="206" x2="266" y2="152"/>
      <circle class="m-fill-paper m-ink" cx="190" cy="206" r="9"/>
      <circle class="m-fill-vermilion" cx="190" cy="206" r="4"/>
      <!-- Accessibility contrast & keyboard pill -->
      <rect class="m-fill-paper m-ink m-draw" x="108" y="226" width="164" height="30" rx="2"/>
      <text class="m-label" x="128" y="245">WCAG 2.2 &middot; CWV</text>
    </svg>`,
  },

  map: {
    caption: "Plate · Local cartography & pin",
    svg: `<svg class="motif-svg" viewBox="0 0 380 280" role="img" aria-label="Ink engraving of a neighborhood street map with a vermilion location pin">
      <title>Local presence map engraving</title>
      <!-- Folded map frame -->
      <rect class="m-fill-paper m-ink m-draw" x="38" y="38" width="304" height="204" rx="2"/>
      <!-- Street grid -->
      <path class="m-fine m-draw" d="M38 104 L342 84 M38 176 L342 156 M124 38 L108 242 M238 38 L254 242"/>
      <path class="m-sage m-draw" d="M62 214 C122 192, 166 138, 224 128 C272 120, 304 106, 330 74"/>
      <!-- Ripple rings -->
      <circle class="m-vermilion m-pulse" cx="192" cy="148" r="24"/>
      <circle class="m-fine" cx="192" cy="148" r="38"/>
      <!-- Pin -->
      <g class="m-float">
        <path class="m-fill-paper m-vermilion m-draw" d="M192 146 C192 146, 168 118, 168 98 A24 24 0 1 1 216 98 C216 118, 192 146, 192 146 Z"/>
        <circle class="m-fill-vermilion" cx="192" cy="98" r="7"/>
      </g>
      <text class="m-label" x="54" y="228">Hours &middot; Address &middot; Pin</text>
    </svg>`,
  },

  move: {
    caption: "Plate · Ownership & redirect bridge",
    svg: `<svg class="motif-svg" viewBox="0 0 380 280" role="img" aria-label="Ink engraving showing a website moving from a boxed builder to owned static hosting">
      <title>Platform move bridge engraving</title>
      <!-- Left: old boxed builder -->
      <rect class="m-fill-soft m-fine m-draw" x="34" y="96" width="102" height="118" rx="2" stroke-dasharray="5 4"/>
      <text class="m-label" x="52" y="122">Builder</text>
      <line class="m-fine m-draw" x1="52" y1="140" x2="116" y2="140"/>
      <line class="m-fine m-draw" x1="52" y1="156" x2="108" y2="156"/>
      <line class="m-fine m-draw" x1="52" y1="172" x2="114" y2="172"/>
      <!-- Right: clean owned static site -->
      <rect class="m-fill-paper m-ink m-draw" x="240" y="76" width="108" height="138" rx="2"/>
      <text class="m-label" x="256" y="102">Owned site</text>
      <line class="m-sage m-draw" x1="256" y1="120" x2="330" y2="120"/>
      <line class="m-ink m-draw" x1="256" y1="138" x2="322" y2="138"/>
      <line class="m-ink m-draw" x1="256" y1="154" x2="314" y2="154"/>
      <!-- Key symbol -->
      <circle class="m-vermilion m-draw" cx="272" cy="188" r="8"/>
      <path class="m-vermilion m-draw" d="M280 188 H312 M302 188 V196 M310 188 V194"/>
      <!-- Redirect bridge arc -->
      <path class="m-vermilion m-draw" d="M136 126 C168 62, 208 62, 236 106"/>
      <path class="m-vermilion m-draw" d="M225 103 L237 108 L237 95"/>
      <text class="m-label" x="158" y="64">301 Map</text>
    </svg>`,
  },

  helpers: {
    caption: "Plate · Practical automation schematic",
    svg: `<svg class="motif-svg" viewBox="0 0 380 280" role="img" aria-label="Ink engraving of small drafting gears and a manual off switch">
      <title>AI helpers schematic engraving</title>
      <!-- Left envelope input -->
      <rect class="m-fill-paper m-ink m-draw" x="34" y="104" width="84" height="58" rx="2"/>
      <path class="m-ink m-draw" d="M34 106 L76 138 L118 106"/>
      <!-- Connecting line -->
      <line class="m-fine m-draw" x1="118" y1="133" x2="156" y2="133"/>
      <!-- Central engraved gear -->
      <g class="m-spin">
        <circle class="m-fill-paper m-ink m-draw" cx="192" cy="133" r="34"/>
        <circle class="m-sage m-draw" cx="192" cy="133" r="14"/>
        <path class="m-ink m-draw" d="M192 91 V99 M192 167 V175 M150 133 H158 M226 133 H234 M162 103 L168 109 M216 157 L222 163 M222 103 L216 109 M168 157 L162 163"/>
      </g>
      <!-- Output draft card -->
      <line class="m-vermilion m-draw" x1="228" y1="133" x2="262" y2="133"/>
      <rect class="m-fill-paper m-ink m-draw" x="262" y="88" width="84" height="90" rx="2"/>
      <line class="m-vermilion m-draw" x1="276" y1="112" x2="330" y2="112"/>
      <line class="m-fine m-draw" x1="276" y1="128" x2="332" y2="128"/>
      <line class="m-fine m-draw" x1="276" y1="144" x2="320" y2="144"/>
      <line class="m-fine m-draw" x1="276" y1="160" x2="312" y2="160"/>
      <!-- Manual off switch below -->
      <rect class="m-fill-paper m-ink m-draw" x="142" y="210" width="100" height="32" rx="16"/>
      <circle class="m-fill-vermilion" cx="222" cy="226" r="10"/>
      <text class="m-label" x="158" y="230">Off switch</text>
    </svg>`,
  },

  multilingual: {
    caption: "Plate · Multilingual pages & hreflang",
    svg: `<svg class="motif-svg" viewBox="0 0 380 280" role="img" aria-label="Ink engraving of a localized webpage with English, French, and Spanish tabs linked to clean hreflang routes">
      <title>Multilingual localized pages engraving</title>
      <!-- Localized page sheet -->
      <rect class="m-fill-paper m-ink m-draw" x="50" y="34" width="142" height="212" rx="6"/>
      <line class="m-fine m-draw" x1="70" y1="54" x2="172" y2="54"/>
      <!-- Language tabs -->
      <text class="m-label" x="70" y="76">EN &middot; FR &middot; ES</text>
      <line class="m-vermilion m-draw" x1="70" y1="86" x2="172" y2="86"/>
      <!-- Content lines -->
      <line class="m-ink m-draw" x1="70" y1="112" x2="148" y2="112"/>
      <line class="m-fine m-draw" x1="70" y1="124" x2="168" y2="124"/>
      <line class="m-ink m-draw" x1="70" y1="152" x2="142" y2="152"/>
      <line class="m-fine m-draw" x1="70" y1="164" x2="168" y2="164"/>
      <line class="m-sage m-draw" x1="70" y1="192" x2="154" y2="192"/>
      <line class="m-fine m-draw" x1="70" y1="204" x2="164" y2="204"/>
      <!-- Clean hreflang route cards -->
      <g class="m-float">
        <rect class="m-fill-paper m-ink m-draw" x="226" y="66" width="106" height="32" rx="4"/>
        <text class="m-label" x="242" y="87">/en/ &middot; primary</text>
        <rect class="m-fill-paper m-ink m-draw" x="226" y="114" width="106" height="32" rx="4"/>
        <text class="m-label" x="242" y="135">/fr/ &middot; synced</text>
        <rect class="m-fill-paper m-ink m-draw" x="226" y="162" width="106" height="32" rx="4"/>
        <text class="m-label" x="242" y="183">/es/ &middot; synced</text>
      </g>
      <text class="m-label" x="228" y="218">hreflang &amp; sitemap</text>
      <path class="m-vermilion m-draw" d="M192 130 H226 M209 82 V178 M209 82 H226 M209 178 H226"/>
    </svg>`,
  },
};

export function renderMotifPlate(motifKey, plateLabel = "") {
  const motif = MOTIFS[motifKey] || MOTIFS.reassemble;
  return `<figure class="engraving-plate" data-reveal>
    <div class="engraving-frame">
      ${motif.svg}
    </div>
    <figcaption class="hero-plate-caption">
      <strong>${plateLabel || motif.caption}</strong>
      <span>Ink illustration</span>
    </figcaption>
  </figure>`;
}
