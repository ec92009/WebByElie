import React from 'react';
import {AbsoluteFill, Img, interpolate, useCurrentFrame} from 'remotion';
import logo from '../assets/web-by-elie-logo.svg';

export const SEO_PAGE_FLIP_FRAMES = 330;

const C = {
  ink: '#102027',
  muted: '#526870',
  paper: '#f7faf8',
  panel: '#ffffff',
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
    {label: 'page surface', start: 0, end: 48, color: C.green},
    {label: 'flip below the surface', start: 48, end: 120, color: C.blue},
    {label: 'examine the signals', start: 120, end: 202, color: C.purple},
    {label: 'harvest + store', start: 202, end: 304, color: C.googleBlue},
  ];
  const active = stages.find((stage) => frame >= stage.start && frame < stage.end);
  const opacity = tween(frame, 16, 34);
  return <div style={{position: 'absolute', left: 760, top: 46, width: 410, opacity, ...labelStyle}}>
    <div style={{display: 'flex', justifyContent: 'space-between', color: C.muted, fontSize: 12, fontWeight: 950, textTransform: 'uppercase'}}><span>visible page</span><span>search robots</span></div>
    <div style={{position: 'relative', height: 5, marginTop: 10, borderRadius: 99, background: '#dbe5e0'}}>
      <div style={{height: '100%', width: `${clamp(frame / 292) * 100}%`, borderRadius: 99, background: active?.color || C.googleBlue}} />
    </div>
    <div style={{height: 22, marginTop: 8, color: active?.color || C.googleBlue, fontSize: 14, fontWeight: 950, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1}}>{active?.label || 'database updated'}</div>
  </div>;
};

const FrontFace: React.FC = () => <div style={{position: 'absolute', inset: 0, padding: 24, background: '#fff', borderRadius: 18, backfaceVisibility: 'hidden'}}>
  <div style={{height: 48, display: 'flex', alignItems: 'center', gap: 9, padding: '0 16px', borderRadius: 10, background: '#e8efeb', color: C.muted, fontSize: 16, fontWeight: 950}}>
    {[C.rust, C.yellow, C.green].map((color) => <span key={color} style={{width: 12, height: 12, borderRadius: 99, background: color}} />)}
    <span style={{marginLeft: 8}}>new structure</span>
    <span style={{marginLeft: 'auto', fontSize: 13, color: C.green}}>visible layer</span>
  </div>
  <div style={{position: 'relative', height: 490, marginTop: 20, overflow: 'hidden', borderRadius: 12, background: '#f5faf7', border: `2px solid ${C.line}`}}>
    <div style={{position: 'absolute', left: 25, top: 25, width: 430, height: 106, borderRadius: 12, background: C.green, color: '#fff', padding: '24px 22px', fontSize: 32, fontWeight: 950, lineHeight: 1}}>make the next step obvious</div>
    <div style={{position: 'absolute', left: 25, top: 154, width: 430, height: 122, borderRadius: 12, background: '#fff', border: `2px solid ${C.line}`, padding: 20}}>
      <div style={{width: '86%', height: 9, borderRadius: 99, background: C.blue}} />
      <div style={{width: '64%', height: 9, marginTop: 12, borderRadius: 99, background: '#b9ccd1'}} />
      <div style={{width: '74%', height: 9, marginTop: 12, borderRadius: 99, background: '#d5e1dd'}} />
      <span style={{display: 'block', marginTop: 20, color: C.ink, fontSize: 18, fontWeight: 900}}>clear facts people can find</span>
    </div>
    <div style={{position: 'absolute', left: 25, top: 300, width: 150, height: 48, display: 'grid', placeItems: 'center', borderRadius: 99, background: C.dark, color: '#fff', fontSize: 16, fontWeight: 950}}>next step</div>
    <div style={{position: 'absolute', left: 25, top: 374, width: 430, height: 82, display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px', borderRadius: 12, background: '#e2f0e8', color: C.ink, fontSize: 17, fontWeight: 900}}><span style={{width: 11, height: 11, borderRadius: 99, background: C.green}} /><span>proof / signal / trust</span></div>
  </div>
  <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 17, color: C.muted, fontSize: 13, fontWeight: 950, textTransform: 'uppercase', letterSpacing: 1}}><span>what people see</span><span>surface only</span></div>
</div>;

const BackFace: React.FC = () => <div style={{position: 'absolute', inset: 0, padding: 24, background: C.dark, borderRadius: 18, color: '#fff', backfaceVisibility: 'hidden', transform: 'rotateY(180deg)'}}>
  <div style={{height: 48, display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px', borderRadius: 10, background: '#2d464d', color: '#d9e5e1', fontSize: 16, fontWeight: 950}}>
    <span style={{width: 12, height: 12, borderRadius: 99, background: C.purple}} />
    <span>source layer</span>
    <span style={{marginLeft: 'auto', color: '#b8d8ca', fontSize: 13}}>hidden SEO signals</span>
  </div>
  <div style={{display: 'flex', gap: 8, marginTop: 20}}>
    {['keywords', 'data', 'JSON-LD'].map((tab, index) => <div key={tab} style={{padding: '8px 12px', borderRadius: 7, background: index === 0 ? C.purple : '#355057', color: '#fff', fontSize: 12, fontWeight: 950, textTransform: 'uppercase', letterSpacing: 0.8}}>{tab}</div>)}
  </div>
  <div style={{marginTop: 28, color: '#b8d8ca', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 17, lineHeight: 1.8}}>
    <div><span style={{color: C.googleRed}}>const</span> pageSignals = {'{'}</div>
    <div style={{paddingLeft: 25}}>title: <span style={{color: C.googleYellow}}>'clear facts people can find'</span>,</div>
    <div style={{paddingLeft: 25}}>service: <span style={{color: C.googleYellow}}>'website refresh'</span>,</div>
    <div style={{paddingLeft: 25}}>location: <span style={{color: C.googleYellow}}>'Rueil and nearby'</span>,</div>
    <div style={{paddingLeft: 25}}>nextStep: <span style={{color: C.googleYellow}}>'contact'</span>,</div>
    <div>{'}'}</div>
  </div>
  <div style={{display: 'flex', gap: 10, marginTop: 26}}>{['crawlable', 'indexable', 'attributable'].map((item, index) => <span key={item} style={{padding: '7px 10px', borderRadius: 99, background: index === 1 ? '#315c4f' : '#355057', color: '#d9e5e1', fontSize: 12, fontWeight: 950}}>{item}</span>)}</div>
</div>;

const PageFlip: React.FC<{frame: number}> = ({frame}) => {
  const angle = interpolate(frame, [48, 116], [0, 180], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const intro = tween(frame, 0, 26);
  const lift = tween(frame, 25, 58);
  const opacity = 1 - tween(frame, 292, 326) * 0.18;
  return <div style={{position: 'absolute', left: 116, top: 190, width: 650, height: 640, opacity, perspective: '1600px', zIndex: 3, ...labelStyle}}>
    <div style={{position: 'absolute', inset: 0, transform: `translateY(${lerp(34, 0, lift)}px) scale(${lerp(.96, 1, intro)}) rotateY(${angle}deg)`, transformStyle: 'preserve-3d', transformOrigin: 'center center'}}>
      <FrontFace />
      <BackFace />
    </div>
    <div style={{position: 'absolute', left: 22, top: -25, padding: '8px 13px', borderRadius: '10px 10px 0 0', background: C.blue, color: '#fff', opacity: tween(frame, 34, 52) * (1 - tween(frame, 134, 150)), fontSize: 13, fontWeight: 950, textTransform: 'uppercase', letterSpacing: 1}}>SEO takes the page below the surface</div>
  </div>;
};

type SignalChipProps = {frame: number; delay: number; x: number; y: number; label: string; type: string; color: string};
const SignalChip: React.FC<SignalChipProps> = ({frame, delay, x, y, label, type, color}) => {
  const reveal = tween(frame, 118 + delay, 145 + delay);
  return <div style={{position: 'absolute', left: x, top: y, opacity: reveal, transform: `translate(${lerp(-30, 0, reveal)}px, ${lerp(18, 0, reveal)}px) rotate(${lerp(-4, 0, reveal)}deg)`, zIndex: 4, ...labelStyle}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 9, padding: '10px 13px', border: `2px solid ${color}`, borderRadius: 9, background: '#fff', boxShadow: '0 12px 24px rgba(16,32,39,.12)'}}>
      <span style={{padding: '4px 6px', borderRadius: 5, background: color, color: '#fff', fontSize: 10, fontWeight: 950, textTransform: 'uppercase', letterSpacing: 0.7}}>{type}</span>
      <span style={{color: C.ink, fontSize: 16, fontWeight: 950}}>{label}</span>
    </div>
  </div>;
};

const MetadataPanel: React.FC<{frame: number}> = ({frame}) => {
  const reveal = tween(frame, 125, 156);
  return <div style={{position: 'absolute', left: 795, top: 164, width: 388, opacity: reveal, transform: `translateY(${lerp(28, 0, reveal)}px)`, zIndex: 4, ...labelStyle}}>
    <div style={{display: 'inline-block', padding: '8px 12px', borderRadius: '10px 10px 0 0', background: C.purple, color: '#fff', fontSize: 12, fontWeight: 950, textTransform: 'uppercase', letterSpacing: 1}}>page data</div>
    <div style={{padding: '16px 18px', border: `3px solid ${C.purple}`, borderTop: 0, borderRadius: '0 12px 12px 12px', background: '#fff', boxShadow: '0 18px 40px rgba(16,32,39,.14)'}}>
      {[['TITLE', 'clear facts people can find'], ['DESCRIPTION', 'website refresh for independent businesses'], ['CANONICAL', 'web-by-elie.com/'], ['FAQ', 'what happens in the first pass?']].map(([name, value]) => <div key={name} style={{display: 'flex', gap: 12, marginTop: name === 'TITLE' ? 0 : 9, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 12}}><span style={{width: 84, color: C.purple, fontWeight: 950}}>{name}</span><span style={{color: C.ink, fontWeight: 800}}>{value}</span></div>)}
    </div>
  </div>;
};

const JsonPanel: React.FC<{frame: number}> = ({frame}) => {
  const reveal = tween(frame, 150, 181);
  return <div style={{position: 'absolute', left: 785, top: 688, width: 490, opacity: reveal, transform: `translateY(${lerp(32, 0, reveal)}px)`, zIndex: 4, ...labelStyle}}>
    <div style={{display: 'inline-block', padding: '8px 12px', borderRadius: '10px 10px 0 0', background: C.googleBlue, color: '#fff', fontSize: 12, fontWeight: 950, textTransform: 'uppercase', letterSpacing: 1}}>structured data / JSON-LD</div>
    <div style={{padding: '14px 17px', border: `3px solid ${C.googleBlue}`, borderTop: 0, borderRadius: '0 12px 12px 12px', background: '#f4f8ff', color: C.ink, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 13, lineHeight: 1.55, boxShadow: '0 18px 40px rgba(16,32,39,.14)'}}>
      <div><span style={{color: C.googleRed}}>{'{'}</span> <span style={{color: C.googleBlue}}>&quot;@type&quot;</span>: <span style={{color: C.googleGreen}}>&quot;ProfessionalService&quot;</span>,</div>
      <div style={{paddingLeft: 18}}><span style={{color: C.googleBlue}}>&quot;areaServed&quot;</span>: <span style={{color: C.googleGreen}}>&quot;Rueil&quot;</span>,</div>
      <div style={{paddingLeft: 18}}><span style={{color: C.googleBlue}}>&quot;offers&quot;</span>: <span style={{color: C.googleGreen}}>&quot;Website refresh&quot;</span></div>
      <div><span style={{color: C.googleRed}}>{'}'}</span> <span style={{color: C.muted}}>→ parseable signal</span></div>
    </div>
  </div>;
};

const DatabaseVault: React.FC<{frame: number}> = ({frame}) => {
  const reveal = tween(frame, 238, 266);
  const stored = tween(frame, 264, 302);
  const records = [
    {label: 'keyword index', color: C.googleRed},
    {label: 'page metadata', color: C.googleYellow},
    {label: 'JSON-LD graph', color: C.googleBlue},
    {label: 'location + service', color: C.googleGreen},
  ];
  return <div style={{position: 'absolute', left: 1450, top: 734, width: 400, opacity: reveal, transform: `translateY(${lerp(36, 0, reveal)}px)`, zIndex: 4, ...labelStyle}}>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '12px 12px 0 0', background: C.dark, color: '#fff'}}>
      <span style={{fontSize: 13, fontWeight: 950, textTransform: 'uppercase', letterSpacing: 0.9}}>big search database</span>
      <span style={{color: '#b8d8ca', fontSize: 11, fontWeight: 950, textTransform: 'uppercase'}}>store / retrieve</span>
    </div>
    <div style={{position: 'relative', height: 222, padding: '16px 18px', border: `4px solid ${C.ink}`, borderTop: 0, borderRadius: '0 0 24px 24px', background: '#fff', boxShadow: '0 20px 42px rgba(16,32,39,.18)'}}>
      <div style={{position: 'absolute', left: 18, right: 18, top: 12, height: 30, border: `3px solid ${C.googleBlue}`, borderRadius: '50%', background: '#e7f0ff'}} />
      <div style={{position: 'absolute', left: 25, right: 25, top: 28, height: 164, border: `3px solid ${C.googleBlue}`, borderTop: 0, borderRadius: '0 0 22px 22px', background: '#f7fbff'}} />
      <div style={{position: 'relative', display: 'grid', gap: 7, marginTop: 40}}>
        {records.map((record, index) => {
          const rowOpacity = tween(frame, 252 + index * 7, 270 + index * 7);
          return <div key={record.label} style={{display: 'flex', alignItems: 'center', gap: 8, height: 25, padding: '0 9px', borderRadius: 6, background: `rgba(66,133,244,${0.08 + rowOpacity * 0.08})`, opacity: rowOpacity, color: C.ink, fontSize: 11, fontWeight: 950}}><span style={{width: 9, height: 9, borderRadius: 99, background: record.color}} /><span>{record.label}</span><span style={{marginLeft: 'auto', color: C.green, fontSize: 10, textTransform: 'uppercase'}}>indexed</span></div>;
        })}
      </div>
      <div style={{position: 'absolute', right: 30, bottom: 13, color: stored > 0.5 ? C.green : C.muted, fontSize: 11, fontWeight: 950, textTransform: 'uppercase', letterSpacing: 0.7}}>{stored > 0.5 ? 'database updated ✓' : 'writing records...'}</div>
    </div>
  </div>;
};

const HarvestRoute: React.FC<{frame: number}> = ({frame}) => {
  const reveal = tween(frame, 220, 248);
  return <svg style={{position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', opacity: reveal}} viewBox="0 0 1920 1080" aria-hidden="true">
    <path d="M1560 540 C1665 585 1572 684 1654 760" fill="none" stroke={C.googleBlue} strokeWidth="5" strokeDasharray="15 13" />
    <path d="M1560 560 C1685 612 1598 702 1690 770" fill="none" stroke={C.googleGreen} strokeWidth="4" strokeDasharray="9 14" opacity=".72" />
    <path d="M1650 760 l-14 -5 M1650 760 l-4 -14" fill="none" stroke={C.googleBlue} strokeWidth="5" strokeLinecap="round" />
  </svg>;
};

const HarvestPackets: React.FC<{frame: number}> = ({frame}) => {
  const packets = [
    {label: '#SEO', color: C.googleRed, delay: 0},
    {label: 'JSON', color: C.googleBlue, delay: 8},
    {label: 'DATA', color: C.googleYellow, delay: 16},
    {label: 'FAQ', color: C.googleGreen, delay: 24},
  ];
  return <div style={{position: 'absolute', inset: 0, zIndex: 6, pointerEvents: 'none'}}>
    <div style={{position: 'absolute', left: 1620, top: 704, padding: '7px 11px', borderRadius: 99, background: C.googleBlue, color: '#fff', opacity: tween(frame, 224, 244) * (1 - tween(frame, 300, 316)), fontSize: 11, fontWeight: 950, textTransform: 'uppercase', letterSpacing: 0.8, ...labelStyle}}>harvest → store</div>
    {packets.map((packet) => {
      const travel = tween(frame, 232 + packet.delay, 270 + packet.delay);
      const visible = tween(frame, 228 + packet.delay, 236 + packet.delay) * (1 - tween(frame, 268 + packet.delay, 278 + packet.delay));
      const x = lerp(1530 + packet.delay * 0.7, 1630 + packet.delay * 0.8, travel);
      const y = lerp(530 + packet.delay * 0.8, 775 + packet.delay * 0.6, travel) - Math.sin(travel * Math.PI) * 126;
      return <div key={packet.label} style={{position: 'absolute', left: x, top: y, padding: '5px 8px', borderRadius: 6, background: packet.color, color: '#fff', opacity: visible, fontSize: 10, fontWeight: 950, letterSpacing: 0.7, boxShadow: '0 8px 18px rgba(16,32,39,.18)', ...labelStyle}}>{packet.label}</div>;
    })}
  </div>;
};

const SignalLines: React.FC<{frame: number}> = ({frame}) => {
  const reveal = tween(frame, 210, 246);
  return <svg style={{position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', opacity: reveal}} viewBox="0 0 1920 1080" aria-hidden="true">
    <path d="M1178 267 C1275 250 1320 300 1430 365" fill="none" stroke={C.googleBlue} strokeWidth="4" strokeDasharray="12 12" />
    <path d="M1260 780 C1325 740 1355 640 1450 565" fill="none" stroke={C.googleGreen} strokeWidth="4" strokeDasharray="12 12" />
    <path d="M1220 530 C1305 500 1340 455 1452 452" fill="none" stroke={C.purple} strokeWidth="4" strokeDasharray="12 12" />
    {[{x: 1430, y: 365, color: C.googleBlue}, {x: 1450, y: 565, color: C.googleGreen}, {x: 1452, y: 452, color: C.purple}].map((point) => <circle key={`${point.x}-${point.y}`} cx={point.x} cy={point.y} r="9" fill={point.color} />)}
  </svg>;
};

const SearchRobot: React.FC<{frame: number; x: number; y: number; scale: number; delay: number; label: string}> = ({frame, x, y, scale, delay, label}) => {
  const reveal = tween(frame, 184 + delay, 230 + delay);
  const bob = Math.sin((frame + delay) * 0.09) * 5 * reveal;
  const harvesting = tween(frame, 228 + delay, 258 + delay);
  const stored = tween(frame, 260 + delay, 294 + delay);
  const status = stored > 0.5 ? 'stored ✓' : harvesting > 0.35 ? 'harvesting...' : 'received';
  const statusColor = stored > 0.5 ? C.googleGreen : harvesting > 0.35 ? C.googleBlue : C.googleBlue;
  return <div style={{position: 'absolute', left: x, top: y, width: 300, height: 430, opacity: reveal, transform: `translateY(${lerp(130, 0, reveal) + bob}px) scale(${scale})`, transformOrigin: 'center bottom', zIndex: 5, ...labelStyle}}>
    <div style={{position: 'absolute', left: 144, top: -25, width: 7, height: 33, background: C.ink, borderRadius: 99}} />
    <div style={{position: 'absolute', left: 132, top: -42, width: 30, height: 30, borderRadius: 99, background: C.googleRed, border: `5px solid ${C.ink}`}} />
    <div style={{position: 'absolute', left: 15, top: 0, width: 270, height: 160, border: `5px solid ${C.ink}`, borderRadius: 38, background: '#fff', boxShadow: '0 22px 42px rgba(16,32,39,.16)', overflow: 'hidden'}}>
      <div style={{height: 13, background: `linear-gradient(90deg, ${C.googleBlue} 0 25%, ${C.googleRed} 25% 50%, ${C.googleYellow} 50% 75%, ${C.googleGreen} 75% 100%)`}} />
      <div style={{display: 'flex', justifyContent: 'center', gap: 44, marginTop: 34}}>
        {[C.googleBlue, C.googleRed].map((color) => <span key={color} style={{display: 'grid', placeItems: 'center', width: 40, height: 40, borderRadius: 99, background: C.ink, border: `8px solid ${color}`}}><i style={{width: 9, height: 9, borderRadius: 99, background: '#fff'}} /></span>)}
      </div>
      <div style={{width: 68, height: 7, margin: '19px auto 0', borderRadius: 99, background: C.green}} />
    </div>
    <div style={{position: 'absolute', left: 43, top: 145, width: 214, height: 210, border: `5px solid ${C.ink}`, borderRadius: 30, background: '#f7fbff', boxShadow: '0 22px 42px rgba(16,32,39,.14)'}}>
      <div style={{width: 142, height: 73, margin: '24px auto 0', padding: 11, borderRadius: 12, background: '#e7f0ff', border: `2px solid ${statusColor}`, color: C.ink, fontSize: 15, fontWeight: 950, textAlign: 'center'}}><div style={{color: statusColor, fontSize: 11, textTransform: 'uppercase'}}>{status}</div><div style={{marginTop: 7}}>{stored > 0.5 ? 'INDEXED ✓' : harvesting > 0.35 ? 'LOADING DB' : 'JSON-LD ✓'}</div></div>
      <div style={{display: 'flex', justifyContent: 'center', gap: 8, marginTop: 22}}>{[C.googleBlue, C.googleRed, C.googleYellow, C.googleGreen].map((color) => <span key={color} style={{width: 16, height: 16, borderRadius: 99, background: color}} />)}</div>
      <div style={{width: 90, height: 7, margin: '22px auto 0', borderRadius: 99, background: C.ink}} />
    </div>
    <div style={{position: 'absolute', left: 0, top: 204, width: 58, height: 20, borderRadius: 99, background: C.ink, transform: 'rotate(28deg)'}} />
    <div style={{position: 'absolute', right: 0, top: 204, width: 58, height: 20, borderRadius: 99, background: C.ink, transform: 'rotate(-28deg)'}} />
    <div style={{position: 'absolute', left: 55, top: 369, width: 67, height: 28, borderRadius: '0 0 14px 14px', background: C.ink}} />
    <div style={{position: 'absolute', right: 55, top: 369, width: 67, height: 28, borderRadius: '0 0 14px 14px', background: C.ink}} />
    <div style={{position: 'absolute', left: 49, bottom: 0, padding: '8px 12px', borderRadius: 8, background: C.dark, color: '#fff', fontSize: 12, fontWeight: 950, textTransform: 'uppercase', letterSpacing: 0.8, whiteSpace: 'nowrap'}}>{label}</div>
  </div>;
};

export const SEOPageFlip: React.FC = () => {
  const frame = useCurrentFrame();
  const scanner = tween(frame, 118, 198);
  const present = tween(frame, 210, 246);
  const harvesting = tween(frame, 224, 260);
  const stored = tween(frame, 264, 302);
  const logoOpacity = tween(frame, 12, 34);
  return <AbsoluteFill style={{fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', background: C.paper, overflow: 'hidden'}}>
    <Background />
    <div style={{position: 'absolute', left: 84, top: 54, display: 'flex', alignItems: 'center', gap: 12, opacity: logoOpacity, ...labelStyle}}><Img src={logo} style={{width: 42, height: 42, borderRadius: 9}} /><span style={{color: C.ink, fontSize: 20, fontWeight: 950}}>Web By Elie</span></div>
    <StageMarker frame={frame} />
    <div style={{position: 'absolute', left: 1450, top: 54, opacity: tween(frame, 170, 204), color: C.ink, fontSize: 14, fontWeight: 950, textTransform: 'uppercase', letterSpacing: 1, ...labelStyle}}>big Google robots</div>
    <PageFlip frame={frame} />
    <div style={{position: 'absolute', left: 151, top: 216, width: 580, height: 580, opacity: scanner * (1 - tween(frame, 204, 220)), pointerEvents: 'none', zIndex: 6, overflow: 'hidden', borderRadius: 18}}><div style={{position: 'absolute', left: 0, top: `${lerp(-40, 570, scanner)}px`, width: '100%', height: 5, background: C.googleBlue, boxShadow: '0 0 26px rgba(66,133,244,.9)'}} /></div>
    <MetadataPanel frame={frame} />
    <SignalChip frame={frame} delay={0} x={790} y={462} type="keyword" label="website refresh" color={C.googleRed} />
    <SignalChip frame={frame} delay={12} x={1018} y={446} type="keyword" label="Rueil" color={C.googleYellow} />
    <SignalChip frame={frame} delay={24} x={815} y={540} type="keyword" label="independent businesses" color={C.googleGreen} />
    <SignalChip frame={frame} delay={36} x={1052} y={530} type="keyword" label="clear next step" color={C.blue} />
    <JsonPanel frame={frame} />
    <DatabaseVault frame={frame} />
    <HarvestRoute frame={frame} />
    <SignalLines frame={frame} />
    <SearchRobot frame={frame} x={1410} y={260} scale={1.05} delay={0} label="Google robot / 01" />
    <SearchRobot frame={frame} x={1250} y={650} scale={0.62} delay={14} label="Google robot / 02" />
    <HarvestPackets frame={frame} />
    <div style={{position: 'absolute', left: 82, bottom: 48, opacity: tween(frame, 15, 34), ...labelStyle}}><div style={{color: C.muted, fontSize: 13, fontWeight: 950, letterSpacing: 1, textTransform: 'uppercase'}}>SEO / hidden words / page data / JSON-LD</div><div style={{marginTop: 8, color: C.ink, fontSize: 30, fontWeight: 950}}>{stored > 0.5 ? 'Harvested, indexed, ready to retrieve.' : harvesting > 0.35 ? 'The robot is harvesting the page.' : present > 0.5 ? 'Robots receive the signals.' : 'The page has more to say.'}</div></div>
  </AbsoluteFill>;
};
