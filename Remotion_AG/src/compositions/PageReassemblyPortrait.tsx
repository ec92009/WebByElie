import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const C = {
  ink: '#14262b',
  muted: '#587078',
  paper: '#f7f4ed',
  white: '#fffdf8',
  green: '#4f8373',
  mint: '#dcece4',
  blue: '#5f7f9b',
  rust: '#c87345',
  gold: '#e2b960',
  line: '#ccd8d2',
};

const font = 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (frame: number, start: number, end: number) => {
  const value = clamp(interpolate(frame, [start, end], [0, 1]));
  return value * value * (3 - 2 * value);
};

const Brand: React.FC = () => (
  <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
    <div style={{width: 44, height: 44, borderRadius: 13, background: C.green, display: 'grid', placeItems: 'center', color: C.white, fontSize: 22, fontWeight: 950}}>E</div>
    <span style={{fontSize: 22, fontWeight: 900, color: C.ink}}>Web By Elie</span>
  </div>
);

const KeepChip: React.FC<{label: string; delay: number}> = ({label, delay}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame: frame - delay, fps, config: {damping: 16, stiffness: 150}});
  return (
    <div style={{opacity: pop, transform: `scale(${0.82 + pop * 0.18})`, padding: '12px 18px', borderRadius: 99, background: C.mint, border: `2px solid ${C.green}`, color: C.ink, fontSize: 19, fontWeight: 850}}>
      <span style={{color: C.green, marginRight: 8}}>✓</span>{label}
    </div>
  );
};

const BrowserTop: React.FC<{label: string; accent: string}> = ({label, accent}) => (
  <div style={{height: 58, padding: '0 18px', display: 'flex', alignItems: 'center', gap: 9, background: '#eef2ef', borderBottom: `2px solid ${C.line}`}}>
    {[C.rust, C.gold, C.green].map((color) => <span key={color} style={{width: 12, height: 12, borderRadius: 99, background: color}} />)}
    <span style={{marginLeft: 10, color: C.muted, fontSize: 15, fontWeight: 800}}>{label}</span>
    <span style={{marginLeft: 'auto', width: 66, height: 7, borderRadius: 99, background: accent}} />
  </div>
);

const ExistingSite: React.FC<{opacity: number; scale: number}> = ({opacity, scale}) => (
  <div style={{position: 'absolute', left: 90, top: 300, width: 900, height: 780, opacity, transform: `scale(${scale})`, transformOrigin: 'center top', borderRadius: 28, overflow: 'hidden', background: C.white, border: `3px solid ${C.line}`, boxShadow: '0 30px 70px rgba(20,38,43,.14)'}}>
    <BrowserTop label="your current website" accent={C.gold} />
    <div style={{padding: 42}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <strong style={{fontSize: 26, color: C.ink}}>Your business</strong>
        <span style={{color: C.muted, fontSize: 16}}>About · Services · Contact</span>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: '1.15fr .85fr', gap: 28, marginTop: 42}}>
        <div>
          <div style={{fontFamily: 'Georgia, serif', fontSize: 48, lineHeight: 1.05, color: C.ink}}>Built with care.<br/>Ready for a refresh.</div>
          <div style={{marginTop: 24, width: '86%', height: 13, borderRadius: 99, background: '#dfe6e2'}} />
          <div style={{marginTop: 12, width: '72%', height: 13, borderRadius: 99, background: '#e8edea'}} />
          <div style={{marginTop: 32, width: 176, padding: '15px 0', borderRadius: 10, textAlign: 'center', color: C.white, background: C.ink, fontSize: 17, fontWeight: 850}}>Get in touch</div>
        </div>
        <div style={{height: 300, padding: 18, borderRadius: 22, background: '#e8ddd0'}}>
          <div style={{height: '100%', borderRadius: 14, background: 'linear-gradient(150deg, #e0b875, #a5c0b5 52%, #6f8792)'}} />
        </div>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 34}}>
        {['Your story', 'Familiar photos', 'Trusted details'].map((label, index) => <div key={label} style={{padding: 22, minHeight: 108, borderRadius: 16, background: index === 1 ? '#f4eee4' : '#eef4f0', color: C.ink, fontSize: 18, fontWeight: 800}}>{label}<div style={{marginTop: 14, height: 7, width: '70%', borderRadius: 99, background: index === 1 ? C.gold : C.green, opacity: .55}} /></div>)}
      </div>
    </div>
  </div>
);

type Look = {name: string; note: string; accent: string; background: string; fontFamily: string};
const looks: Look[] = [
  {name: 'Warm', note: 'welcoming colour', accent: C.rust, background: '#fbefe4', fontFamily: 'Georgia, serif'},
  {name: 'Clear', note: 'easy layout', accent: C.green, background: '#edf5f1', fontFamily: font},
  {name: 'Bold', note: 'strong headline', accent: C.blue, background: '#e9eef5', fontFamily: font},
];

const LookCard: React.FC<{look: Look; index: number; selected: boolean; compact: boolean; discard: number; exit: number}> = ({look, index, selected, compact, discard, exit}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame: frame - (43 + index * 7), fps, config: {damping: 18, stiffness: 120}});
  const y = compact ? 310 + index * 205 : 315 + index * 300;
  const height = compact ? 178 : 258;
  const basketMouth = 1225;
  const drop = Math.max(0, basketMouth - (y + height));
  const wave = Math.sin(discard * Math.PI * 2) * 42 * (1 - discard);
  const bend = Math.sin(discard * Math.PI) * (index === 0 ? -17 : 17);
  const twist = Math.sin(discard * Math.PI * 1.6) * (index === 0 ? -10 : 10);
  const discardOpacity = 1 - ease(discard, .82, 1);
  return (
    <div style={{position: 'absolute', left: 80, top: y, zIndex: 10 + index, width: 920, height, opacity: enter * discardOpacity * (1 - exit), transformOrigin: '50% 100%', transform: `translateX(${(1 - enter) * (index % 2 === 0 ? -170 : 170) + wave}px) translateY(${discard * drop}px) rotate(${twist}deg) skewX(${bend}deg) scaleX(${(selected ? 1.025 : 1) * (1 - discard * .95)}) scaleY(${1 - discard * .78})`, filter: discard > 0 ? `blur(${discard * 1.4}px)` : undefined, borderRadius: 25, padding: compact ? 20 : 26, background: look.background, border: `${selected ? 5 : 3}px solid ${selected ? look.accent : C.line}`, boxShadow: selected ? `0 20px 44px ${look.accent}33` : '0 16px 34px rgba(20,38,43,.08)', display: 'grid', gridTemplateColumns: '200px 1fr', gap: 24, overflow: 'hidden'}}>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <span style={{fontSize: 16, fontWeight: 900, color: look.accent, letterSpacing: 1.2, textTransform: 'uppercase'}}>Look {index + 1}</span>
        <strong style={{fontFamily: look.fontFamily, fontSize: compact ? 34 : 42, color: C.ink, marginTop: 4}}>{look.name}</strong>
        <span style={{fontSize: 16, color: C.muted, marginTop: 8}}>{look.note}</span>
      </div>
      <div style={{borderRadius: 17, background: C.white, overflow: 'hidden', border: `2px solid ${look.accent}55`}}>
        <div style={{height: compact ? 28 : 34, background: C.ink, display: 'flex', alignItems: 'center', gap: 5, padding: '0 12px'}}>{[1, 2, 3].map((dot) => <span key={dot} style={{width: 6, height: 6, borderRadius: 99, background: '#fff', opacity: .65}} />)}</div>
        <div style={{padding: compact ? 14 : 18, display: 'grid', gridTemplateColumns: index === 1 ? '1.35fr .65fr' : index === 2 ? '.72fr 1.28fr' : '1fr .8fr', gap: 13}}>
          <div><div style={{fontFamily: look.fontFamily, fontSize: compact ? 21 : 29, lineHeight: 1.05, fontWeight: index === 2 ? 950 : 750, color: C.ink}}>{index === 0 ? 'Made to feel familiar.' : index === 1 ? 'Find what matters.' : 'Make a clear impression.'}</div><div style={{width: '78%', height: 7, marginTop: 12, borderRadius: 99, background: look.accent}} /></div>
          <div style={{minHeight: compact ? 65 : 104, borderRadius: 11, background: `linear-gradient(145deg, ${look.accent}, ${look.background})`}} />
        </div>
      </div>
      {selected && <div style={{position: 'absolute', right: 18, top: 16, width: 42, height: 42, borderRadius: 99, background: look.accent, color: C.white, display: 'grid', placeItems: 'center', fontSize: 25, fontWeight: 950}}>✓</div>}
    </div>
  );
};

const GenieTrail: React.FC<{progress: number; index: number; accent: string}> = ({progress, index, accent}) => {
  const sourceY = index === 0 ? 399 : 604;
  const mouthY = 1225;
  const startY = interpolate(progress, [0, 1], [sourceY, mouthY - 24]);
  const bend = (index === 0 ? -1 : 1) * (145 - progress * 90);
  const visibility = ease(progress, .08, .24) * (1 - ease(progress, .72, 1));
  const strokeWidth = interpolate(progress, [0, 1], [34, 7]);
  const path = `M 540 ${startY} C ${540 + bend} ${startY + 90}, ${540 - bend} ${mouthY - 115}, 540 ${mouthY}`;
  return <svg viewBox="0 0 1080 1440" style={{position: 'absolute', inset: 0, zIndex: 8, width: '100%', height: '100%', opacity: visibility, pointerEvents: 'none'}}>
    <path d={path} fill="none" stroke={accent} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray="34 22" strokeDashoffset={-progress * 190} opacity={.5} />
    <path d={path} fill="none" stroke={C.white} strokeWidth={Math.max(3, strokeWidth * .22)} strokeLinecap="round" strokeDasharray="18 38" strokeDashoffset={progress * 150} opacity={.85} />
  </svg>;
};

const WasteBasket: React.FC<{frame: number}> = ({frame}) => {
  const {fps} = useVideoConfig();
  const rise = spring({frame: frame - 134, fps, config: {damping: 15, stiffness: 145}});
  const leave = ease(frame, 174, 182);
  const visible = rise * (1 - leave);
  return <div style={{position: 'absolute', left: 448, top: 1208, zIndex: 30, width: 184, height: 166, opacity: visible, transform: `translateY(${(1 - rise) * 130 + leave * 130}px) scale(${.82 + rise * .18})`, transformOrigin: 'center bottom'}}>
    <div style={{position: 'absolute', left: 10, right: 10, top: 4, height: 30, borderRadius: 99, background: C.ink, boxShadow: '0 8px 18px rgba(20,38,43,.2)'}} />
    <div style={{position: 'absolute', left: 22, right: 22, top: 18, bottom: 0, borderRadius: '14px 14px 36px 36px', background: 'linear-gradient(90deg, #78909a, #adc0c5 48%, #6a838d)', border: `5px solid ${C.ink}`, overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 15, opacity: .42, backgroundImage: `repeating-linear-gradient(90deg, transparent 0 21px, ${C.ink} 21px 27px)`}} />
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 18, borderRadius: 99, background: '#c7d4d7', border: `5px solid ${C.ink}`}} />
  </div>;
};

const Cursor: React.FC<{frame: number}> = ({frame}) => {
  const x = interpolate(frame, [128, 146], [850, 825], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const y = interpolate(frame, [128, 146], [390, 835], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const pulse = 1 + Math.sin(frame * .7) * .06;
  return <div style={{position: 'absolute', left: x, top: y, zIndex: 20, transform: `rotate(-22deg) scale(${pulse})`, color: C.ink, fontSize: 74, textShadow: '0 3px 0 #fff, 3px 0 0 #fff, -3px 0 0 #fff'}}>➤</div>;
};

const ExpandedBoldSite: React.FC<{opacity: number}> = ({opacity}) => {
  const frame = useCurrentFrame();
  const grow = ease(frame, 178, 202);
  const left = interpolate(grow, [0, 1], [80, 42]);
  const top = interpolate(grow, [0, 1], [720, 245]);
  const width = interpolate(grow, [0, 1], [920, 996]);
  const height = interpolate(grow, [0, 1], [178, 1050]);
  return <div style={{position: 'absolute', left, top, width, height, opacity, borderRadius: interpolate(grow, [0, 1], [25, 34]), overflow: 'hidden', background: C.white, border: `5px solid ${C.blue}`, boxShadow: '0 38px 90px rgba(20,38,43,.2)'}}>
    <BrowserTop label="Look 3 selected · Bold" accent={C.blue} />
    <div style={{padding: 40}}>
      <div style={{fontSize: 18, color: C.blue, fontWeight: 950, letterSpacing: 1.5, textTransform: 'uppercase'}}>Your story · a bolder direction</div>
      <div style={{display: 'grid', gridTemplateColumns: '1.22fr .78fr', gap: 26, marginTop: 22}}>
        <div>
          <div style={{fontSize: 58, lineHeight: .98, color: C.ink, fontWeight: 950, letterSpacing: -2}}>A clearer website that still feels like you.</div>
          <div style={{fontSize: 21, lineHeight: 1.35, color: C.muted, marginTop: 24}}>Keep what customers recognise. Improve what helps them take the next step.</div>
          <div style={{display: 'inline-block', marginTop: 28, padding: '17px 26px', borderRadius: 12, background: C.blue, color: C.white, fontSize: 19, fontWeight: 900}}>Let’s refresh your site</div>
        </div>
        <div style={{borderRadius: 22, background: `linear-gradient(155deg, ${C.blue}, ${C.mint} 58%, ${C.gold})`}} />
      </div>
      <div style={{marginTop: 34, padding: 28, borderRadius: 20, background: '#e9eef5', borderLeft: `8px solid ${C.blue}`}}>
        <div style={{color: C.ink, fontSize: 27, lineHeight: 1.25, fontWeight: 800}}>“Elie doubled our leads in three weeks.”</div>
        <div style={{marginTop: 12, color: C.muted, fontSize: 17, fontWeight: 800}}>— Local business owner</div>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: 30}}><span style={{padding: '11px 19px', borderRadius: 99, background: '#e9eef5', color: C.blue, fontSize: 16, fontWeight: 950}}>✓ Look 3 chosen</span></div>
    </div>
  </div>;
};

const StageHeading: React.FC<{frame: number}> = ({frame}) => {
  const text = frame < 44 ? 'Your site already has good bones.' : frame < 128 ? 'Three ways it could feel.' : frame < 158 ? 'Choose a direction.' : frame < 202 ? 'Look 3: Bold.' : 'Refresh without starting over.';
  return <div style={{position: 'absolute', left: 64, right: 64, top: 100, textAlign: 'center'}}><div style={{color: C.green, fontSize: 16, fontWeight: 950, letterSpacing: 2, textTransform: 'uppercase'}}>Website refresh</div><div style={{marginTop: 12, color: C.ink, fontSize: 46, lineHeight: 1.05, fontWeight: 900}}>{text}</div></div>;
};

export const PageReassemblyPortraitComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const loopBack = ease(frame, 257, 269);
  const openingOpacity = (1 - ease(frame, 38, 55)) + loopBack;
  const looksOpacity = ease(frame, 40, 55) * (1 - loopBack);
  const compact = frame >= 126;
  const discardWarm = ease(frame, 143, 166);
  const discardClear = ease(frame, 148, 171);
  const selectedCardIsExpanded = frame >= 178;
  const dismissSelectedCard = selectedCardIsExpanded ? 1 : 0;
  const expandedOpacity = (selectedCardIsExpanded ? 1 : 0) * (1 - loopBack);

  return <AbsoluteFill style={{fontFamily: font, background: C.paper, overflow: 'hidden'}}>
    <div style={{position: 'absolute', inset: 0, opacity: .32, backgroundImage: `linear-gradient(${C.green}18 1px, transparent 1px), linear-gradient(90deg, ${C.green}18 1px, transparent 1px)`, backgroundSize: '52px 52px'}} />
    <div style={{position: 'absolute', left: 42, top: 34}}><Brand /></div>
    <StageHeading frame={loopBack > .55 ? 0 : frame} />

    <div style={{opacity: Math.min(1, openingOpacity)}}>
      <ExistingSite opacity={1} scale={.98 + loopBack * .02} />
      <div style={{position: 'absolute', left: 112, bottom: 112, display: 'flex', gap: 12}}>
        <KeepChip label="your story" delay={16} />
        <KeepChip label="familiar photos" delay={22} />
        <KeepChip label="trusted details" delay={28} />
      </div>
    </div>

    <div style={{opacity: looksOpacity}}>
      <GenieTrail progress={discardWarm} index={0} accent={looks[0].accent} />
      <GenieTrail progress={discardClear} index={1} accent={looks[1].accent} />
      {looks.map((look, index) => <LookCard key={look.name} look={look} index={index} compact={compact} selected={index === 2 && frame >= 143} discard={index === 0 ? discardWarm : index === 1 ? discardClear : 0} exit={index === 2 ? dismissSelectedCard : 0} />)}
      {frame >= 128 && frame < 160 && <Cursor frame={frame} />}
      {frame >= 134 && frame < 183 && <WasteBasket frame={frame} />}
    </div>

    <ExpandedBoldSite opacity={expandedOpacity} />
  </AbsoluteFill>;
};
