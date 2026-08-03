import React from 'react';
import {AbsoluteFill, Img, interpolate, useCurrentFrame} from 'remotion';
import logo from '../assets/web-by-elie-logo.svg';

export const AIO_RECOMMENDATIONS_FRAMES = 330;

const C = {
  ink: '#102027',
  muted: '#526870',
  paper: '#f7faf8',
  line: '#c9d8d2',
  dark: '#1e3035',
  green: '#4f8373',
  blue: '#597d99',
  rust: '#c87345',
  yellow: '#e6bd69',
  mint: '#d9eae2',
  purple: '#7165a6',
  googleBlue: '#4285f4',
  googleRed: '#ea4335',
  googleYellow: '#fbbc05',
  googleGreen: '#34a853',
  openai: '#187d78',
  openaiLight: '#d8efec',
  claude: '#bd6e4d',
  claudeLight: '#f5dfd5',
};

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number) => value * value * (3 - 2 * value);
const tween = (frame: number, start: number, end: number) => smooth(clamp(interpolate(frame, [start, end], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})));
const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount;
const labelStyle: React.CSSProperties = {fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', letterSpacing: 0.5};

const Background: React.FC = () => <AbsoluteFill style={{background: `radial-gradient(circle at 54% 42%, #ffffff 0%, ${C.paper} 54%, #e8f0ed 100%)`}}>
  <div style={{position: 'absolute', inset: 0, opacity: 0.32, backgroundImage: 'linear-gradient(rgba(79,131,115,.09) 1px, transparent 1px), linear-gradient(90deg, rgba(79,131,115,.09) 1px, transparent 1px)', backgroundSize: '48px 48px', maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)'}} />
</AbsoluteFill>;

const StageMarker: React.FC<{frame: number}> = ({frame}) => {
  const stages = [
    {label: 'SEO handoff', start: 0, end: 46, color: C.googleBlue},
    {label: 'new readers arrive', start: 46, end: 118, color: C.openai},
    {label: 'collect the context', start: 118, end: 205, color: C.purple},
    {label: 'write recommendations', start: 205, end: 305, color: C.claude},
  ];
  const active = stages.find((stage) => frame >= stage.start && frame < stage.end);
  const opacity = tween(frame, 14, 32);
  return <div style={{position: 'absolute', left: 760, top: 46, width: 410, opacity, ...labelStyle}}>
    <div style={{display: 'flex', justifyContent: 'space-between', color: C.muted, fontSize: 12, fontWeight: 950, textTransform: 'uppercase'}}><span>indexed context</span><span>useful answers</span></div>
    <div style={{height: 5, marginTop: 10, borderRadius: 99, background: '#dbe5e0'}}><div style={{height: '100%', width: `${clamp(frame / 305) * 100}%`, borderRadius: 99, background: active?.color || C.claude}} /></div>
    <div style={{height: 22, marginTop: 8, color: active?.color || C.claude, fontSize: 14, fontWeight: 950, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1}}>{active?.label || 'recommendations ready'}</div>
  </div>;
};

const SourcePanel: React.FC<{frame: number}> = ({frame}) => {
  const handoff = tween(frame, 104, 154);
  const rows = [
    {label: 'keywords', value: 'website refresh / Rueil', color: C.googleRed},
    {label: 'page data', value: 'service / audience / next step', color: C.googleYellow},
    {label: 'JSON-LD', value: 'ProfessionalService / FAQ', color: C.googleBlue},
    {label: 'proof', value: 'clear claims / supporting evidence', color: C.googleGreen},
  ];
  return <div style={{position: 'absolute', left: 104, top: 244, width: 520, height: 486, padding: 22, borderRadius: 18, background: C.dark, color: '#fff', boxShadow: '0 24px 60px rgba(16,32,39,.18)', zIndex: 3, ...labelStyle}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', height: 46, borderRadius: 10, background: '#2d464d'}}><span style={{width: 12, height: 12, borderRadius: 99, background: C.googleBlue}} /><span style={{fontSize: 16, fontWeight: 950}}>SEO harvest</span><span style={{marginLeft: 'auto', color: '#b8d8ca', fontSize: 12, fontWeight: 950, textTransform: 'uppercase'}}>available context</span></div>
    <div style={{marginTop: 25, color: '#b8d8ca', fontSize: 12, fontWeight: 950, textTransform: 'uppercase', letterSpacing: 1}}>what the bots can read</div>
    <div style={{display: 'grid', gap: 12, marginTop: 13}}>{rows.map((row) => <div key={row.label} style={{display: 'flex', alignItems: 'center', gap: 11, minHeight: 52, padding: '0 12px', borderRadius: 9, background: '#2d464d'}}><span style={{width: 11, height: 11, borderRadius: 99, background: row.color, boxShadow: handoff > 0.3 ? `0 0 0 5px ${row.color}22` : 'none'}} /><span style={{width: 87, color: '#d9e5e1', fontSize: 12, fontWeight: 950, textTransform: 'uppercase'}}>{row.label}</span><span style={{color: '#fff', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 12, fontWeight: 800}}>{row.value}</span></div>)}</div>
    <div style={{position: 'absolute', left: 22, right: 22, bottom: 22, display: 'flex', justifyContent: 'space-between', color: handoff > 0.5 ? '#b8d8ca' : C.muted, fontSize: 12, fontWeight: 950, textTransform: 'uppercase'}}><span>{handoff > 0.5 ? 'handoff in progress' : 'ready for readers'}</span><span>SEO → AIO</span></div>
  </div>;
};

const IndexArchive: React.FC<{frame: number}> = ({frame}) => {
  const nudge = tween(frame, 64, 122);
  return <div style={{position: 'absolute', left: 1518, top: 714, width: 335, height: 224, opacity: 0.68, transform: `translate(${lerp(0, 72, nudge)}px, ${lerp(0, -110, nudge)}px) scale(${lerp(1, .72, nudge)})`, transformOrigin: 'center bottom', zIndex: 1, ...labelStyle}}>
    <div style={{padding: '9px 13px', borderRadius: '10px 10px 0 0', background: '#4d6469', color: '#e5efec', fontSize: 12, fontWeight: 950, textTransform: 'uppercase', letterSpacing: 0.8}}>Google index / background</div>
    <div style={{display: 'grid', gap: 7, padding: 14, border: `3px solid #789097`, borderTop: 0, borderRadius: '0 0 16px 16px', background: '#e8f0ed'}}>{['crawl record', 'metadata graph', 'answer candidate'].map((label, index) => <div key={label} style={{display: 'flex', alignItems: 'center', gap: 8, height: 34, padding: '0 10px', borderRadius: 6, background: '#d6e3de', color: C.muted, fontSize: 11, fontWeight: 950}}><span style={{width: 8, height: 8, borderRadius: 99, background: [C.googleBlue, C.googleYellow, C.googleGreen][index]}} /><span>{label}</span><span style={{marginLeft: 'auto', fontSize: 10, textTransform: 'uppercase'}}>indexed</span></div>)}</div>
  </div>;
};

const GoogleBot: React.FC<{frame: number}> = ({frame}) => {
  const nudge = tween(frame, 64, 122);
  const reveal = tween(frame, 0, 28);
  const status = nudge > 0.5 ? 'background / indexing' : 'front / received';
  return <div style={{position: 'absolute', left: lerp(1370, 1575, nudge), top: lerp(230, 130, nudge), width: 300, height: 430, opacity: reveal * lerp(1, .62, nudge), transform: `scale(${lerp(1.04, .64, nudge)})`, transformOrigin: 'center bottom', zIndex: 2, ...labelStyle}}>
    <div style={{position: 'absolute', left: 144, top: -25, width: 7, height: 33, background: C.ink, borderRadius: 99}} /><div style={{position: 'absolute', left: 132, top: -42, width: 30, height: 30, borderRadius: 99, background: C.googleRed, border: `5px solid ${C.ink}`}} />
    <div style={{position: 'absolute', left: 15, top: 0, width: 270, height: 160, border: `5px solid ${C.ink}`, borderRadius: 38, background: '#fff', overflow: 'hidden', boxShadow: '0 22px 42px rgba(16,32,39,.14)'}}><div style={{height: 13, background: `linear-gradient(90deg, ${C.googleBlue} 0 25%, ${C.googleRed} 25% 50%, ${C.googleYellow} 50% 75%, ${C.googleGreen} 75% 100%)`}} /><div style={{display: 'flex', justifyContent: 'center', gap: 44, marginTop: 34}}>{[C.googleBlue, C.googleRed].map((color) => <span key={color} style={{display: 'grid', placeItems: 'center', width: 40, height: 40, borderRadius: 99, background: C.ink, border: `8px solid ${color}`}}><i style={{width: 9, height: 9, borderRadius: 99, background: '#fff'}} /></span>)}</div><div style={{width: 68, height: 7, margin: '19px auto 0', borderRadius: 99, background: C.green}} /></div>
    <div style={{position: 'absolute', left: 43, top: 145, width: 214, height: 210, border: `5px solid ${C.ink}`, borderRadius: 30, background: '#f7fbff', boxShadow: '0 22px 42px rgba(16,32,39,.12)'}}><div style={{width: 142, height: 73, margin: '24px auto 0', padding: 11, borderRadius: 12, background: '#e7f0ff', border: `2px solid ${C.googleBlue}`, color: C.ink, fontSize: 15, fontWeight: 950, textAlign: 'center'}}><div style={{color: C.googleBlue, fontSize: 11, textTransform: 'uppercase'}}>indexed</div><div style={{marginTop: 7}}>database ✓</div></div><div style={{display: 'flex', justifyContent: 'center', gap: 8, marginTop: 22}}>{[C.googleBlue, C.googleRed, C.googleYellow, C.googleGreen].map((color) => <span key={color} style={{width: 16, height: 16, borderRadius: 99, background: color}} />)}</div><div style={{width: 90, height: 7, margin: '22px auto 0', borderRadius: 99, background: C.ink}} /></div>
    <div style={{position: 'absolute', left: 0, top: 204, width: 58, height: 20, borderRadius: 99, background: C.ink, transform: 'rotate(28deg)'}} /><div style={{position: 'absolute', right: 0, top: 204, width: 58, height: 20, borderRadius: 99, background: C.ink, transform: 'rotate(-28deg)'}} />
    <div style={{position: 'absolute', left: 55, top: 369, width: 67, height: 28, borderRadius: '0 0 14px 14px', background: C.ink}} /><div style={{position: 'absolute', right: 55, top: 369, width: 67, height: 28, borderRadius: '0 0 14px 14px', background: C.ink}} />
    <div style={{position: 'absolute', left: 29, bottom: 0, padding: '8px 12px', borderRadius: 8, background: C.dark, color: '#fff', fontSize: 11, fontWeight: 950, textTransform: 'uppercase', letterSpacing: 0.7, whiteSpace: 'nowrap'}}>{status}</div>
  </div>;
};

type AIBotProps = {frame: number; x: number; delay: number; brand: string; color: string; light: string; label: string};
const AIBot: React.FC<AIBotProps> = ({frame, x, delay, brand, color, light, label}) => {
  const reveal = tween(frame, 44 + delay, 96 + delay);
  const collect = tween(frame, 112 + delay, 180 + delay);
  const synthesize = tween(frame, 188 + delay, 236 + delay);
  const bob = Math.sin((frame + delay) * 0.08) * 4 * reveal;
  const status = synthesize > 0.45 ? 'recommend' : collect > 0.35 ? 'collecting' : 'reading';
  return <div style={{position: 'absolute', left: x, top: 280, width: 300, height: 430, opacity: reveal, transform: `translateY(${lerp(130, 0, reveal) + bob}px)`, transformOrigin: 'center bottom', zIndex: 5, ...labelStyle}}>
    <div style={{position: 'absolute', left: 144, top: -25, width: 7, height: 33, background: C.ink, borderRadius: 99}} /><div style={{position: 'absolute', left: 132, top: -42, width: 30, height: 30, borderRadius: 99, background: color, border: `5px solid ${C.ink}`}} />
    <div style={{position: 'absolute', left: 15, top: 0, width: 270, height: 160, border: `5px solid ${C.ink}`, borderRadius: 38, background: '#fff', overflow: 'hidden', boxShadow: '0 22px 42px rgba(16,32,39,.16)'}}><div style={{height: 13, background: color}} /><div style={{display: 'flex', justifyContent: 'center', gap: 44, marginTop: 34}}>{[color, C.ink].map((eyeColor, index) => <span key={`${brand}-${index}`} style={{display: 'grid', placeItems: 'center', width: 40, height: 40, borderRadius: 99, background: C.ink, border: `8px solid ${eyeColor}`}}><i style={{width: 9, height: 9, borderRadius: 99, background: '#fff'}} /></span>)}</div><div style={{width: 68, height: 7, margin: '19px auto 0', borderRadius: 99, background: color}} /></div>
    <div style={{position: 'absolute', left: 43, top: 145, width: 214, height: 210, border: `5px solid ${C.ink}`, borderRadius: 30, background: light, boxShadow: '0 22px 42px rgba(16,32,39,.14)'}}><div style={{width: 148, height: 75, margin: '23px auto 0', padding: 11, borderRadius: 12, background: '#fff', border: `2px solid ${color}`, color: C.ink, fontSize: 14, fontWeight: 950, textAlign: 'center'}}><div style={{color, fontSize: 11, textTransform: 'uppercase'}}>{status}</div><div style={{marginTop: 7}}>{synthesize > 0.45 ? 'BULLETS ✓' : collect > 0.35 ? 'CONTEXT + DATA' : 'READING INPUT'}</div></div><div style={{display: 'flex', justifyContent: 'center', gap: 8, marginTop: 22}}>{[color, C.googleBlue, C.googleGreen].map((dot) => <span key={dot} style={{width: 16, height: 16, borderRadius: 99, background: dot}} />)}</div><div style={{width: 90, height: 7, margin: '22px auto 0', borderRadius: 99, background: C.ink}} /></div>
    <div style={{position: 'absolute', left: 0, top: 204, width: 58, height: 20, borderRadius: 99, background: C.ink, transform: 'rotate(28deg)'}} /><div style={{position: 'absolute', right: 0, top: 204, width: 58, height: 20, borderRadius: 99, background: C.ink, transform: 'rotate(-28deg)'}} />
    <div style={{position: 'absolute', left: 55, top: 369, width: 67, height: 28, borderRadius: '0 0 14px 14px', background: C.ink}} /><div style={{position: 'absolute', right: 55, top: 369, width: 67, height: 28, borderRadius: '0 0 14px 14px', background: C.ink}} />
    <div style={{position: 'absolute', left: 51, bottom: 0, padding: '8px 12px', borderRadius: 8, background: color, color: '#fff', fontSize: 12, fontWeight: 950, textTransform: 'uppercase', letterSpacing: 0.8, whiteSpace: 'nowrap'}}>{label}</div>
  </div>;
};

const NudgeArrow: React.FC<{frame: number}> = ({frame}) => {
  const nudge = tween(frame, 68, 112);
  return <div style={{position: 'absolute', inset: 0, opacity: nudge * (1 - tween(frame, 126, 144)), zIndex: 4, pointerEvents: 'none'}}><svg style={{position: 'absolute', inset: 0}} viewBox="0 0 1920 1080" aria-hidden="true"><path d="M1268 460 C1350 430 1375 360 1450 330" fill="none" stroke={C.claude} strokeWidth="5" strokeDasharray="13 11" /><path d="M1448 330 l-16 4 M1448 330 l-4 16" fill="none" stroke={C.claude} strokeWidth="5" strokeLinecap="round" /></svg><div style={{position: 'absolute', left: 1260, top: 198, padding: '8px 12px', borderRadius: 99, background: C.claudeLight, color: C.claude, fontSize: 11, fontWeight: 950, textTransform: 'uppercase', letterSpacing: 0.8, ...labelStyle}}>nudge → background</div></div>;
};

const DataRoutes: React.FC<{frame: number}> = ({frame}) => {
  const collect = tween(frame, 104, 150);
  return <svg style={{position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', opacity: collect}} viewBox="0 0 1920 1080" aria-hidden="true"><path d="M600 380 C690 380 710 520 830 560" fill="none" stroke={C.openai} strokeWidth="4" strokeDasharray="12 12" /><path d="M600 540 C770 540 860 565 1135 560" fill="none" stroke={C.claude} strokeWidth="4" strokeDasharray="12 12" /></svg>;
};

const DataPackets: React.FC<{frame: number}> = ({frame}) => {
  const packets = [
    {label: 'keywords', color: C.googleRed, to: 'openai', delay: 0, startY: 390, targetY: 505, arc: 48},
    {label: 'page data', color: C.googleYellow, to: 'claude', delay: 10, startY: 455, targetY: 545, arc: 78},
    {label: 'JSON-LD', color: C.googleBlue, to: 'openai', delay: 20, startY: 520, targetY: 575, arc: 78},
    {label: 'proof', color: C.googleGreen, to: 'claude', delay: 30, startY: 585, targetY: 625, arc: 48},
  ];
  return <div style={{position: 'absolute', inset: 0, zIndex: 6, pointerEvents: 'none'}}>{packets.map((packet) => { const flight = tween(frame, 116 + packet.delay, 170 + packet.delay); const visible = tween(frame, 112 + packet.delay, 120 + packet.delay) * (1 - tween(frame, 168 + packet.delay, 184 + packet.delay)); const targetX = packet.to === 'openai' ? 835 : 1135; const x = lerp(585, targetX, flight); const y = lerp(packet.startY, packet.targetY, flight) - Math.sin(flight * Math.PI) * packet.arc; return <div key={packet.label} style={{position: 'absolute', left: x, top: y, padding: '6px 9px', borderRadius: 7, background: packet.color, color: '#fff', opacity: visible, boxShadow: '0 8px 18px rgba(16,32,39,.18)', fontSize: 10, fontWeight: 950, textTransform: 'uppercase', letterSpacing: 0.7, ...labelStyle}}>{packet.label}</div>; })}</div>;
};

const RecommendationCard: React.FC<{frame: number; index: number; text: string; color: string}> = ({frame, index, text, color}) => {
  const reveal = tween(frame, 190 + index * 18, 220 + index * 18);
  return <div style={{position: 'absolute', left: 650, top: 744 + index * 58, width: 720, height: 48, opacity: reveal, transform: `translateX(${lerp(-28, 0, reveal)}px)`, zIndex: 7, display: 'flex', alignItems: 'center', gap: 13, padding: '0 15px', border: `2px solid ${color}`, borderRadius: 9, background: '#fff', boxShadow: '0 13px 28px rgba(16,32,39,.13)', ...labelStyle}}><span style={{display: 'grid', placeItems: 'center', width: 23, height: 23, borderRadius: 99, background: color, color: '#fff', fontSize: 15, fontWeight: 950}}>✓</span><span style={{width: 155, color, fontSize: 11, fontWeight: 950, textTransform: 'uppercase', letterSpacing: 0.8}}>recommendation 0{index + 1}</span><span style={{color: C.ink, fontSize: 16, fontWeight: 900}}>{text}</span></div>;
};

export const AIORecommendations: React.FC = () => {
  const frame = useCurrentFrame();
  const ready = tween(frame, 260, 302);
  const logoOpacity = tween(frame, 12, 34);
  return <AbsoluteFill style={{fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', background: C.paper, overflow: 'hidden'}}>
    <Background />
    <div style={{position: 'absolute', left: 84, top: 54, display: 'flex', alignItems: 'center', gap: 12, opacity: logoOpacity, ...labelStyle}}><Img src={logo} style={{width: 42, height: 42, borderRadius: 9}} /><span style={{color: C.ink, fontSize: 20, fontWeight: 950}}>Web By Elie</span></div>
    <StageMarker frame={frame} />
    <div style={{position: 'absolute', left: 1440, top: 54, opacity: tween(frame, 34, 62), color: C.ink, fontSize: 14, fontWeight: 950, textTransform: 'uppercase', letterSpacing: 1, ...labelStyle}}>AIO / people + AI readers</div>
    <SourcePanel frame={frame} />
    <IndexArchive frame={frame} />
    <GoogleBot frame={frame} />
    <NudgeArrow frame={frame} />
    <AIBot frame={frame} x={690} delay={0} brand="OPENAI" color={C.openai} light={C.openaiLight} label="OpenAI bot" />
    <AIBot frame={frame} x={1030} delay={14} brand="CLAUDE" color={C.claude} light={C.claudeLight} label="Claude bot" />
    <DataRoutes frame={frame} />
    <DataPackets frame={frame} />
    <div style={{position: 'absolute', left: 650, top: 716, opacity: tween(frame, 174, 204), color: C.ink, fontSize: 14, fontWeight: 950, textTransform: 'uppercase', letterSpacing: 1, ...labelStyle}}>bullet-point recommendations</div>
    <RecommendationCard frame={frame} index={0} color={C.openai} text="Make the business and audience explicit." />
    <RecommendationCard frame={frame} index={1} color={C.claude} text="Answer service and location questions directly." />
    <RecommendationCard frame={frame} index={2} color={C.googleBlue} text="Put proof beside every important claim." />
    <RecommendationCard frame={frame} index={3} color={C.green} text="Give people and assistants one next step." />
    <div style={{position: 'absolute', left: 82, bottom: 48, opacity: tween(frame, 14, 34), ...labelStyle}}><div style={{color: C.muted, fontSize: 13, fontWeight: 950, letterSpacing: 1, textTransform: 'uppercase'}}>AIO / collect context / write useful answers</div><div style={{marginTop: 8, color: C.ink, fontSize: 30, fontWeight: 950}}>{ready > 0.5 ? 'Useful recommendations, ready to act on.' : 'The bots turn signals into guidance.'}</div></div>
    <div style={{position: 'absolute', right: 82, bottom: 52, opacity: ready, padding: '9px 13px', borderRadius: 99, background: C.mint, color: C.green, fontSize: 12, fontWeight: 950, textTransform: 'uppercase', letterSpacing: 0.8, ...labelStyle}}>recommendations ready ✓</div>
  </AbsoluteFill>;
};
