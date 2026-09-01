import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const C = {
  ink: '#14262b', muted: '#587078', paper: '#f7f4ed', white: '#fffdf8',
  green: '#4f8373', mint: '#dcece4', blue: '#5f7f9b', rust: '#c87345',
  gold: '#e2b960', line: '#ccd8d2',
};
const font = 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (frame: number, start: number, end: number) => {
  const value = clamp(interpolate(frame, [start, end], [0, 1]));
  return value * value * (3 - 2 * value);
};

const Brand: React.FC = () => <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
  <div style={{width: 46, height: 46, borderRadius: 13, background: C.green, display: 'grid', placeItems: 'center', color: C.white, fontSize: 22, fontWeight: 950}}>E</div>
  <span style={{fontSize: 23, fontWeight: 900, color: C.ink}}>Web By Elie</span>
</div>;

const BrowserTop: React.FC<{label: string; accent: string}> = ({label, accent}) => <div style={{height: 58, padding: '0 20px', display: 'flex', alignItems: 'center', gap: 9, background: '#eef2ef', borderBottom: `2px solid ${C.line}`}}>
  {[C.rust, C.gold, C.green].map((color) => <span key={color} style={{width: 12, height: 12, borderRadius: 99, background: color}} />)}
  <span style={{marginLeft: 10, color: C.muted, fontSize: 15, fontWeight: 800}}>{label}</span>
  <span style={{marginLeft: 'auto', width: 74, height: 7, borderRadius: 99, background: accent}} />
</div>;

const KeepChip: React.FC<{label: string; delay: number}> = ({label, delay}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame: frame - delay, fps, config: {damping: 16, stiffness: 150}});
  return <div style={{opacity: pop, transform: `scale(${.82 + pop * .18})`, padding: '12px 20px', borderRadius: 99, background: C.mint, border: `2px solid ${C.green}`, color: C.ink, fontSize: 18, fontWeight: 850}}><span style={{color: C.green, marginRight: 8}}>✓</span>{label}</div>;
};

const ExistingSite: React.FC<{opacity: number}> = ({opacity}) => <div style={{position: 'absolute', left: 240, top: 245, width: 1440, height: 630, opacity, borderRadius: 30, overflow: 'hidden', background: C.white, border: `3px solid ${C.line}`, boxShadow: '0 30px 70px rgba(20,38,43,.14)'}}>
  <BrowserTop label="your current website" accent={C.gold} />
  <div style={{padding: 46}}>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><strong style={{fontSize: 27, color: C.ink}}>Your business</strong><span style={{color: C.muted, fontSize: 17}}>About · Services · Contact</span></div>
    <div style={{display: 'grid', gridTemplateColumns: '1.3fr .7fr', gap: 38, marginTop: 34}}>
      <div><div style={{fontFamily: 'Georgia, serif', fontSize: 55, lineHeight: 1.04, color: C.ink}}>Built with care.<br/>Ready for a refresh.</div><div style={{marginTop: 24, width: '78%', height: 13, borderRadius: 99, background: '#dfe6e2'}} /><div style={{marginTop: 12, width: '64%', height: 13, borderRadius: 99, background: '#e8edea'}} /><div style={{marginTop: 28, width: 180, padding: '14px 0', borderRadius: 10, textAlign: 'center', color: C.white, background: C.ink, fontSize: 17, fontWeight: 850}}>Get in touch</div></div>
      <div style={{height: 300, padding: 18, borderRadius: 22, background: '#e8ddd0'}}><div style={{height: '100%', borderRadius: 14, background: 'linear-gradient(150deg, #e0b875, #a5c0b5 52%, #6f8792)'}} /></div>
    </div>
  </div>
</div>;

type Look = {name: string; note: string; accent: string; background: string; fontFamily: string};
const looks: Look[] = [
  {name: 'Warm', note: 'welcoming colour', accent: C.rust, background: '#fbefe4', fontFamily: 'Georgia, serif'},
  {name: 'Clear', note: 'easy layout', accent: C.green, background: '#edf5f1', fontFamily: font},
  {name: 'Bold', note: 'strong headline', accent: C.blue, background: '#e9eef5', fontFamily: font},
];

const LookCard: React.FC<{look: Look; index: number; selected: boolean; discard: number; exit: number}> = ({look, index, selected, discard, exit}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame: frame - (43 + index * 7), fps, config: {damping: 18, stiffness: 120}});
  const left = 90 + index * 610;
  const top = 250;
  const width = 540;
  const height = 470;
  const sourceX = left + width / 2;
  const dx = 960 - sourceX;
  const dy = 855 - (top + height);
  const wave = Math.sin(discard * Math.PI * 2) * 50 * (1 - discard);
  const bend = Math.sin(discard * Math.PI) * (index === 0 ? -18 : 18);
  const twist = Math.sin(discard * Math.PI * 1.6) * (index === 0 ? -12 : 12);
  const discardOpacity = 1 - ease(discard, .82, 1);
  return <div style={{position: 'absolute', left, top, zIndex: 10 + index, width, height, opacity: enter * discardOpacity * (1 - exit), transformOrigin: '50% 100%', transform: `translateX(${(1 - enter) * (index % 2 === 0 ? -170 : 170) + discard * dx + wave}px) translateY(${discard * dy}px) rotate(${twist}deg) skewX(${bend}deg) scaleX(${(selected ? 1.025 : 1) * (1 - discard * .94)}) scaleY(${1 - discard * .78})`, filter: discard > 0 ? `blur(${discard * 1.4}px)` : undefined, borderRadius: 27, padding: 28, background: look.background, border: `${selected ? 5 : 3}px solid ${selected ? look.accent : C.line}`, boxShadow: selected ? `0 22px 48px ${look.accent}33` : '0 16px 34px rgba(20,38,43,.08)', overflow: 'hidden'}}>
    <div style={{fontSize: 16, fontWeight: 900, color: look.accent, letterSpacing: 1.2, textTransform: 'uppercase'}}>Look {index + 1}</div>
    <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 4}}><strong style={{fontFamily: look.fontFamily, fontSize: 44, color: C.ink}}>{look.name}</strong><span style={{fontSize: 16, color: C.muted}}>{look.note}</span></div>
    <div style={{height: 285, marginTop: 22, borderRadius: 18, background: C.white, overflow: 'hidden', border: `2px solid ${look.accent}55`}}>
      <div style={{height: 36, background: C.ink, display: 'flex', alignItems: 'center', gap: 6, padding: '0 14px'}}>{[1, 2, 3].map((dot) => <span key={dot} style={{width: 7, height: 7, borderRadius: 99, background: '#fff', opacity: .65}} />)}</div>
      <div style={{padding: 24, display: 'grid', gridTemplateColumns: index === 1 ? '1.3fr .7fr' : index === 2 ? '.75fr 1.25fr' : '1fr .8fr', gap: 18}}><div><div style={{fontFamily: look.fontFamily, fontSize: 29, lineHeight: 1.05, fontWeight: index === 2 ? 950 : 750, color: C.ink}}>{index === 0 ? 'Made to feel familiar.' : index === 1 ? 'Find what matters.' : 'Make a clear impression.'}</div><div style={{width: '78%', height: 8, marginTop: 18, borderRadius: 99, background: look.accent}} /></div><div style={{height: 178, borderRadius: 12, background: `linear-gradient(145deg, ${look.accent}, ${look.background})`}} /></div>
    </div>
    {selected && <div style={{position: 'absolute', right: 20, top: 18, width: 44, height: 44, borderRadius: 99, background: look.accent, color: C.white, display: 'grid', placeItems: 'center', fontSize: 26, fontWeight: 950}}>✓</div>}
  </div>;
};

const GenieTrail: React.FC<{progress: number; index: number; accent: string}> = ({progress, index, accent}) => {
  const sourceX = index === 0 ? 360 : 970;
  const sourceY = 485;
  const startX = interpolate(progress, [0, 1], [sourceX, 960]);
  const startY = interpolate(progress, [0, 1], [sourceY, 830]);
  const direction = index === 0 ? 1 : -1;
  const visibility = ease(progress, .08, .24) * (1 - ease(progress, .72, 1));
  const strokeWidth = interpolate(progress, [0, 1], [36, 7]);
  const path = `M ${startX} ${startY} C ${startX + direction * 170} ${startY + 100}, ${960 - direction * 130} 760, 960 855`;
  return <svg viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0, zIndex: 8, width: '100%', height: '100%', opacity: visibility, pointerEvents: 'none'}}><path d={path} fill="none" stroke={accent} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray="34 22" strokeDashoffset={-progress * 190} opacity={.5} /><path d={path} fill="none" stroke={C.white} strokeWidth={Math.max(3, strokeWidth * .22)} strokeLinecap="round" strokeDasharray="18 38" strokeDashoffset={progress * 150} opacity={.85} /></svg>;
};

const WasteBasket: React.FC<{frame: number}> = ({frame}) => {
  const {fps} = useVideoConfig();
  const rise = spring({frame: frame - 134, fps, config: {damping: 15, stiffness: 145}});
  const leave = ease(frame, 170, 180);
  const visible = rise * (1 - leave);
  return <div style={{position: 'absolute', left: 860, top: 838, zIndex: 30, width: 200, height: 185, opacity: visible, transform: `translateY(${(1 - rise) * 150 + leave * 150}px) scale(${.82 + rise * .18})`, transformOrigin: 'center bottom'}}><div style={{position: 'absolute', left: 12, right: 12, top: 4, height: 31, borderRadius: 99, background: C.ink, boxShadow: '0 8px 18px rgba(20,38,43,.2)'}} /><div style={{position: 'absolute', left: 24, right: 24, top: 18, bottom: 0, borderRadius: '14px 14px 38px 38px', background: 'linear-gradient(90deg, #78909a, #adc0c5 48%, #6a838d)', border: `5px solid ${C.ink}`, overflow: 'hidden'}}><div style={{position: 'absolute', inset: 17, opacity: .42, backgroundImage: `repeating-linear-gradient(90deg, transparent 0 23px, ${C.ink} 23px 29px)`}} /></div><div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 19, borderRadius: 99, background: '#c7d4d7', border: `5px solid ${C.ink}`}} /></div>;
};

const Cursor: React.FC<{frame: number}> = ({frame}) => {
  const x = interpolate(frame, [128, 146], [430, 1680], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const y = interpolate(frame, [128, 146], [390, 650], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const pulse = 1 + Math.sin(frame * .7) * .06;
  return <div style={{position: 'absolute', left: x, top: y, zIndex: 40, transform: `rotate(-22deg) scale(${pulse})`, color: C.ink, fontSize: 78, textShadow: '0 3px 0 #fff, 3px 0 0 #fff, -3px 0 0 #fff'}}>➤</div>;
};

const ExpandedBoldSite: React.FC<{opacity: number}> = ({opacity}) => {
  const frame = useCurrentFrame();
  const grow = ease(frame, 182, 206);
  const contentOpacity = ease(frame, 188, 198);
  const left = interpolate(grow, [0, 1], [1310, 60]);
  const top = interpolate(grow, [0, 1], [250, 185]);
  const width = interpolate(grow, [0, 1], [540, 1800]);
  const height = interpolate(grow, [0, 1], [470, 835]);
  return <div style={{position: 'absolute', left, top, width, height, opacity, borderRadius: interpolate(grow, [0, 1], [27, 34]), overflow: 'hidden', background: C.white, border: `5px solid ${C.blue}`, boxShadow: '0 38px 90px rgba(20,38,43,.2)'}}><BrowserTop label="Look 3 selected · Bold" accent={C.blue} /><div style={{padding: 50, opacity: contentOpacity}}><div style={{fontSize: 18, color: C.blue, fontWeight: 950, letterSpacing: 1.5, textTransform: 'uppercase'}}>Your story · a bolder direction</div><div style={{display: 'grid', gridTemplateColumns: '1.28fr .72fr', gap: 44, marginTop: 18}}><div><div style={{fontSize: 68, lineHeight: .98, color: C.ink, fontWeight: 950, letterSpacing: -2}}>A clearer website that still feels like you.</div><div style={{fontSize: 22, lineHeight: 1.35, color: C.muted, marginTop: 22}}>Keep what customers recognise. Improve what helps them take the next step.</div><div style={{display: 'inline-block', marginTop: 26, padding: '17px 28px', borderRadius: 12, background: C.blue, color: C.white, fontSize: 20, fontWeight: 900}}>Let’s refresh your site</div></div><div style={{borderRadius: 24, minHeight: 310, background: `linear-gradient(155deg, ${C.blue}, ${C.mint} 58%, ${C.gold})`}} /></div><div style={{marginTop: 30, padding: 26, borderRadius: 20, background: '#e9eef5', borderLeft: `8px solid ${C.blue}`}}><div style={{color: C.ink, fontSize: 27, lineHeight: 1.25, fontWeight: 800}}>“Elie doubled our leads in three weeks.”</div><div style={{marginTop: 9, color: C.muted, fontSize: 17, fontWeight: 800}}>— Local business owner</div></div></div></div>;
};

const StageHeading: React.FC<{frame: number}> = ({frame}) => {
  const text = frame < 44 ? 'Your site already has good bones.' : frame < 128 ? 'Three ways it could feel.' : frame < 158 ? 'Choose a direction.' : frame < 206 ? 'Look 3: Bold.' : 'Refresh without starting over.';
  return <div style={{position: 'absolute', left: 300, right: 300, top: 62, textAlign: 'center'}}><div style={{color: C.green, fontSize: 16, fontWeight: 950, letterSpacing: 2, textTransform: 'uppercase'}}>Website refresh</div><div style={{marginTop: 9, color: C.ink, fontSize: 48, lineHeight: 1.05, fontWeight: 900}}>{text}</div></div>;
};

export const PageReassemblyLandscapeReviewComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const loopBack = ease(frame, 257, 269);
  const openingOpacity = (1 - ease(frame, 38, 55)) + loopBack;
  const looksOpacity = ease(frame, 40, 55) * (1 - loopBack);
  const discardWarm = ease(frame, 143, 166);
  const discardClear = ease(frame, 148, 171);
  const selectedCardIsExpanded = frame >= 182;
  return <AbsoluteFill style={{fontFamily: font, background: C.paper, overflow: 'hidden'}}><div style={{position: 'absolute', inset: 0, opacity: .32, backgroundImage: `linear-gradient(${C.green}18 1px, transparent 1px), linear-gradient(90deg, ${C.green}18 1px, transparent 1px)`, backgroundSize: '52px 52px'}} /><div style={{position: 'absolute', left: 54, top: 40}}><Brand /></div><StageHeading frame={loopBack > .55 ? 0 : frame} /><div style={{opacity: Math.min(1, openingOpacity)}}><ExistingSite opacity={1} /><div style={{position: 'absolute', left: 600, bottom: 76, display: 'flex', gap: 14}}><KeepChip label="your story" delay={16} /><KeepChip label="familiar photos" delay={22} /><KeepChip label="trusted details" delay={28} /></div></div><div style={{opacity: looksOpacity}}><GenieTrail progress={discardWarm} index={0} accent={looks[0].accent} /><GenieTrail progress={discardClear} index={1} accent={looks[1].accent} />{looks.map((look, index) => <LookCard key={look.name} look={look} index={index} selected={index === 2 && frame >= 143} discard={index === 0 ? discardWarm : index === 1 ? discardClear : 0} exit={index === 2 && selectedCardIsExpanded ? 1 : 0} />)}{frame >= 128 && frame < 160 && <Cursor frame={frame} />}{frame >= 134 && frame < 181 && <WasteBasket frame={frame} />}</div><ExpandedBoldSite opacity={(selectedCardIsExpanded ? 1 : 0) * (1 - loopBack)} /></AbsoluteFill>;
};
