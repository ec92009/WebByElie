import React from 'react';
import {AbsoluteFill, Img, interpolate, useCurrentFrame} from 'remotion';
import logo from '../assets/web-by-elie-logo.svg';

export const SAVINGS_CAT_FRAMES = 330;

const C = {
  ink: '#102027',
  muted: '#526870',
  paper: '#f7faf8',
  line: '#c9d8d2',
  dark: '#1e3035',
  green: '#4f8373',
  mint: '#d9eae2',
  rust: '#c87345',
  rustLight: '#f4ded2',
  gold: '#d4a34e',
  goldLight: '#f8e9bb',
  cat: '#d9854d',
  catLight: '#f2c99e',
  catDark: '#a95738',
  pocket: '#744839',
  pageBlue: '#5d82ad',
};

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number) => value * value * (3 - 2 * value);
const tween = (frame: number, start: number, end: number) => smooth(clamp(interpolate(frame, [start, end], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})));
const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount;
const labelStyle: React.CSSProperties = {fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', letterSpacing: 0.5};

const Background: React.FC = () => <AbsoluteFill style={{background: `radial-gradient(circle at 54% 42%, #ffffff 0%, ${C.paper} 54%, #e9f0ed 100%)`}}>
  <div style={{position: 'absolute', inset: 0, opacity: 0.32, backgroundImage: 'linear-gradient(rgba(79,131,115,.09) 1px, transparent 1px), linear-gradient(90deg, rgba(79,131,115,.09) 1px, transparent 1px)', backgroundSize: '48px 48px', maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)'}} />
</AbsoluteFill>;

const StageMarker: React.FC<{frame: number}> = ({frame}) => {
  const stages = [
    {label: 'clear the noise', start: 0, end: 86, color: C.rust},
    {label: 'scan the page', start: 86, end: 154, color: C.gold},
    {label: 'catch the leaks', start: 154, end: 238, color: C.cat},
    {label: 'pocket the savings', start: 238, end: 306, color: C.green},
  ];
  const active = stages.find((stage) => frame >= stage.start && frame < stage.end);
  const opacity = tween(frame, 14, 32);
  return <div style={{position: 'absolute', left: 760, top: 46, width: 410, opacity, ...labelStyle}}>
    <div style={{display: 'flex', justifyContent: 'space-between', color: C.muted, fontSize: 12, fontWeight: 950, textTransform: 'uppercase'}}><span>web spend</span><span>more kept</span></div>
    <div style={{height: 5, marginTop: 10, borderRadius: 99, background: '#dbe5e0'}}><div style={{height: '100%', width: `${clamp(frame / 306) * 100}%`, borderRadius: 99, background: active?.color || C.green}} /></div>
    <div style={{height: 22, marginTop: 8, color: active?.color || C.green, fontSize: 14, fontWeight: 950, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1}}>{active?.label || 'savings found'}</div>
  </div>;
};

const ToolStack: React.FC<{frame: number}> = ({frame}) => {
  const exit = tween(frame, 48, 118);
  const opacity = 1 - tween(frame, 98, 132);
  const left = lerp(540, 2210, exit);
  return <div style={{position: 'absolute', left, top: 266, width: 286, height: 422, padding: 18, borderRadius: 18, background: '#fff', border: `3px solid ${C.line}`, boxShadow: '0 24px 55px rgba(16,32,39,.14)', opacity, transform: `rotate(${lerp(-2, 9, exit)}deg)`, zIndex: 6, ...labelStyle}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 9, height: 40, padding: '0 12px', borderRadius: 9, background: C.dark, color: '#fff'}}><span style={{width: 10, height: 10, borderRadius: 99, background: C.rust}} /><span style={{fontSize: 13, fontWeight: 950, textTransform: 'uppercase'}}>tool stack</span><span style={{marginLeft: 'auto', color: '#f4c3a8', fontSize: 10, fontWeight: 950}}>overhead</span></div>
    <div style={{marginTop: 22, color: C.muted, fontSize: 11, fontWeight: 950, textTransform: 'uppercase', letterSpacing: 1}}>things to review</div>
    <div style={{display: 'grid', gap: 10, marginTop: 12}}>{[
      ['unused tool', '$ 29 / mo', C.rust],
      ['duplicate tier', '$ 18 / mo', C.gold],
      ['silent renewal', '$ 49 / yr', C.pageBlue],
      ['old account', '$ 12 / mo', C.green],
    ].map(([label, amount, color]) => <div key={label} style={{display: 'flex', alignItems: 'center', gap: 9, minHeight: 51, padding: '0 11px', borderRadius: 8, background: '#edf4f0'}}><span style={{width: 10, height: 10, borderRadius: 99, background: color as string}} /><span style={{color: C.ink, fontSize: 11, fontWeight: 950, textTransform: 'uppercase'}}>{label}</span><span style={{marginLeft: 'auto', color: color as string, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 12, fontWeight: 950}}>{amount}</span></div>)}</div>
    <div style={{position: 'absolute', left: 18, right: 18, bottom: 18, display: 'flex', justifyContent: 'space-between', color: C.rust, fontSize: 11, fontWeight: 950, textTransform: 'uppercase'}}><span>everything else</span><span>→ right</span></div>
  </div>;
};

const PagePanel: React.FC<{frame: number}> = ({frame}) => {
  const scan = tween(frame, 112, 166);
  const saved = tween(frame, 246, 292);
  const rows = [
    ['service copy', 'clear offer / audience', C.pageBlue],
    ['contact path', 'one next step', C.green],
    ['proof', 'claim + evidence', C.gold],
    ['FAQ', 'answers people need', C.rust],
  ];
  return <div style={{position: 'absolute', left: 820, top: 226, width: 900, height: 590, padding: 22, borderRadius: 20, background: '#fff', border: `4px solid ${C.ink}`, boxShadow: '0 26px 70px rgba(16,32,39,.15)', zIndex: 3, ...labelStyle}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 10, height: 42, padding: '0 13px', borderRadius: 9, background: '#eef5f1'}}><span style={{width: 11, height: 11, borderRadius: 99, background: C.green}} /><span style={{color: C.ink, fontSize: 14, fontWeight: 950, textTransform: 'uppercase'}}>current page</span><span style={{marginLeft: 'auto', color: C.muted, fontSize: 11, fontWeight: 950, textTransform: 'uppercase'}}>page / business</span></div>
    <div style={{display: 'flex', gap: 22, marginTop: 24}}>
      <div style={{width: 318, padding: 20, borderRadius: 14, background: '#f4f8f6', border: `2px solid ${C.line}`}}><div style={{color: C.muted, fontSize: 11, fontWeight: 950, textTransform: 'uppercase', letterSpacing: 1}}>the page earns attention</div><div style={{marginTop: 16, color: C.ink, fontSize: 29, fontWeight: 950, lineHeight: 1.04}}>Clear facts.<br />Useful next steps.</div><div style={{width: 190, height: 9, marginTop: 26, borderRadius: 99, background: C.green}} /><div style={{width: 132, height: 8, marginTop: 11, borderRadius: 99, background: '#c6d8d1'}} /><div style={{width: 158, height: 8, marginTop: 11, borderRadius: 99, background: '#d8e5df'}} /></div>
      <div style={{flex: 1}}><div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: C.muted, fontSize: 11, fontWeight: 950, textTransform: 'uppercase', letterSpacing: 1}}><span>signals worth keeping</span><span style={{color: saved > .5 ? C.green : scan > .5 ? C.rust : C.muted}}>{saved > .5 ? 'leak sealed' : scan > .5 ? 'leak detected' : 'scan ready'}</span></div><div style={{display: 'grid', gap: 10, marginTop: 12}}>{rows.map(([label, value, color]) => <div key={label} style={{display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, padding: '0 12px', borderRadius: 8, background: '#f4f8f6'}}><span style={{width: 10, height: 10, borderRadius: 99, background: color as string}} /><span style={{width: 112, color: C.ink, fontSize: 11, fontWeight: 950, textTransform: 'uppercase'}}>{label}</span><span style={{color: C.muted, fontSize: 12, fontWeight: 800}}>{value}</span></div>)}</div></div>
    </div>
    <div style={{position: 'absolute', left: 22, right: 22, bottom: 22, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 13px', height: 44, borderRadius: 9, background: saved > .5 ? C.mint : C.goldLight, color: saved > .5 ? C.green : C.gold, fontSize: 12, fontWeight: 950, textTransform: 'uppercase', letterSpacing: 0.8}}><span>{saved > .5 ? 'cost leak sealed' : 'money can leave quietly'}</span><span>{saved > .5 ? 'savings found ✓' : 'look closer →'}</span></div>
  </div>;
};

const Cat: React.FC<{frame: number}> = ({frame}) => {
  const enter = tween(frame, 0, 78);
  const catchLift = tween(frame, 176, 224) * (1 - tween(frame, 244, 266));
  const pocketed = tween(frame, 254, 294);
  const blink = frame % 84 > 78 ? 0.18 : 1;
  const left = lerp(-380, 185, enter) + Math.sin(frame * .06) * 2 * enter;
  const top = 410;
  return <div style={{position: 'absolute', left, top, width: 380, height: 430, opacity: tween(frame, 0, 24), zIndex: 8, ...labelStyle}}>
    <div style={{position: 'absolute', left: -32, top: 166, width: 118, height: 170, border: `18px solid ${C.cat}`, borderRight: 0, borderBottom: 0, borderRadius: '70% 0 0 0', transform: 'rotate(-27deg)'}} /><div style={{position: 'absolute', left: 19, top: 38, width: 76, height: 78, background: C.cat, clipPath: 'polygon(0 100%, 18% 0, 100% 74%)', transform: 'rotate(-11deg)'}} /><div style={{position: 'absolute', left: 234, top: 35, width: 76, height: 78, background: C.cat, clipPath: 'polygon(0 75%, 82% 0, 100% 100%)', transform: 'rotate(10deg)'}} />
    <div style={{position: 'absolute', left: 44, top: 0, width: 285, height: 205, borderRadius: '48% 48% 45% 45%', background: C.cat, border: `5px solid ${C.ink}`, boxShadow: '0 18px 35px rgba(16,32,39,.14)'}}><div style={{position: 'absolute', left: 56, top: 80, width: 52, height: 52, borderRadius: 99, background: C.ink, border: `12px solid ${C.catLight}`, transform: `scaleY(${blink})`}}><span style={{position: 'absolute', left: 17, top: 17, width: 14, height: 14, borderRadius: 99, background: '#fff'}} /></div><div style={{position: 'absolute', right: 56, top: 80, width: 52, height: 52, borderRadius: 99, background: C.ink, border: `12px solid ${C.catLight}`, transform: `scaleY(${blink})`}}><span style={{position: 'absolute', left: 17, top: 17, width: 14, height: 14, borderRadius: 99, background: '#fff'}} /></div><div style={{position: 'absolute', left: 132, top: 132, width: 24, height: 18, borderRadius: '50% 50% 55% 55%', background: C.catDark}} /><div style={{position: 'absolute', left: 118, top: 153, width: 55, height: 8, borderRadius: 99, background: C.ink}} /><div style={{position: 'absolute', left: -50, top: 142, width: 82, height: 4, background: C.ink, transform: 'rotate(-9deg)'}} /><div style={{position: 'absolute', right: -50, top: 142, width: 82, height: 4, background: C.ink, transform: 'rotate(9deg)'}} /></div>
    <div style={{position: 'absolute', left: 18, top: 158, width: 342, height: 242, borderRadius: '47% 47% 30% 30%', background: C.cat, border: `5px solid ${C.ink}`, boxShadow: '0 22px 38px rgba(16,32,39,.14)'}}><div style={{position: 'absolute', left: 67, top: 37, width: 202, height: 156, borderRadius: '50%', background: C.catLight, border: `3px solid ${C.catDark}`}}><div style={{position: 'absolute', left: 66, top: 35, width: 72, height: 55, borderRadius: '50%', background: '#f8dfb9', opacity: .8}} /></div><div style={{position: 'absolute', left: 69, top: 135, width: 92, height: 54, borderRadius: '0 0 18px 18px', background: C.pocket, border: `4px solid ${C.ink}`, transform: 'rotate(-4deg)'}} /><div style={{position: 'absolute', right: 69, top: 135, width: 92, height: 54, borderRadius: '0 0 18px 18px', background: C.pocket, border: `4px solid ${C.ink}`, transform: 'rotate(4deg)'}} /></div>
    <div style={{position: 'absolute', left: 66, top: 330 + lerp(0, -45, catchLift), width: 90, height: 62, borderRadius: '48% 48% 42% 42%', background: C.cat, border: `5px solid ${C.ink}`, transform: `rotate(${lerp(8, -23, catchLift)}deg)`}}><span style={{position: 'absolute', left: 31, top: 20, width: 28, height: 22, borderRadius: '50%', background: C.catLight}} /></div><div style={{position: 'absolute', right: 66, top: 330 + lerp(0, -45, catchLift), width: 90, height: 62, borderRadius: '48% 48% 42% 42%', background: C.cat, border: `5px solid ${C.ink}`, transform: `rotate(${lerp(-8, 23, catchLift)}deg)`}}><span style={{position: 'absolute', left: 31, top: 20, width: 28, height: 22, borderRadius: '50%', background: C.catLight}} /></div>
    <div style={{position: 'absolute', left: 94, bottom: 0, padding: '8px 13px', borderRadius: 9, background: C.catDark, color: '#fff', fontSize: 12, fontWeight: 950, textTransform: 'uppercase', letterSpacing: 0.8, whiteSpace: 'nowrap'}}>fat cat / {pocketed > .5 ? 'savings pocketed' : catchLift > .3 ? 'bare paws catching' : 'cost detective'}</div>
  </div>;
};

const Magnifier: React.FC<{frame: number}> = ({frame}) => {
  const search = tween(frame, 100, 176);
  const visible = tween(frame, 82, 102) * (1 - tween(frame, 184, 202));
  const x = lerp(480, 1265, search);
  const y = lerp(500, 385, search) + Math.sin(search * Math.PI * 2) * 45;
  return <div style={{position: 'absolute', left: x, top: y, width: 118, height: 118, opacity: visible, transform: `rotate(${lerp(-28, 18, search)}deg)`, zIndex: 9, pointerEvents: 'none'}}><div style={{position: 'absolute', inset: 0, borderRadius: 99, border: `9px solid ${C.ink}`, background: `${C.goldLight}cc`, boxShadow: `0 0 0 8px ${C.gold}55, 0 15px 25px rgba(16,32,39,.18)`}}><div style={{position: 'absolute', inset: 28, borderRadius: 99, border: `3px dashed ${C.gold}`}} /></div><div style={{position: 'absolute', left: 88, top: 92, width: 26, height: 108, borderRadius: 99, background: C.ink, transform: 'rotate(-10deg)', transformOrigin: 'top center'}} /><div style={{position: 'absolute', left: -10, top: -38, padding: '7px 10px', borderRadius: 99, background: C.goldLight, color: C.gold, fontSize: 11, fontWeight: 950, textTransform: 'uppercase', whiteSpace: 'nowrap', ...labelStyle}}>found a leak</div></div>;
};

const EvaporatingDollars: React.FC<{frame: number}> = ({frame}) => {
  const signs = [
    {x: 1190, y: 390, delay: 0},
    {x: 1400, y: 450, delay: 11},
    {x: 1530, y: 520, delay: 22},
    {x: 1280, y: 590, delay: 33},
  ];
  return <div style={{position: 'absolute', inset: 0, zIndex: 7, pointerEvents: 'none'}}>{signs.map((sign) => { const rise = tween(frame, 140 + sign.delay, 194 + sign.delay); const visible = tween(frame, 132 + sign.delay, 142 + sign.delay) * (1 - tween(frame, 202 + sign.delay, 226 + sign.delay)); const y = sign.y - rise * 128; return <div key={`${sign.x}-${sign.y}`} style={{position: 'absolute', left: sign.x, top: y, opacity: visible, transform: `scale(${lerp(.7, 1.12, rise)}) rotate(${lerp(-8, 9, rise)}deg)`, color: C.rust, fontSize: 39, fontWeight: 950, textShadow: '0 8px 14px rgba(200,115,69,.22)', ...labelStyle}}><span>$</span><span style={{position: 'absolute', left: 12, top: -34, color: C.gold, fontSize: 18}}>·</span><span style={{position: 'absolute', left: 45, top: -52, color: C.gold, fontSize: 13}}>·</span><span style={{position: 'absolute', left: 69, top: -25, color: C.gold, fontSize: 10}}>·</span></div>; })}</div>;
};

const CapturedDollars: React.FC<{frame: number}> = ({frame}) => {
  const signs = [
    {x: 1190, y: 260, delay: 0, pawX: 288, pawY: 650, pocketX: 268, pocketY: 704},
    {x: 1400, y: 315, delay: 11, pawX: 472, pawY: 650, pocketX: 405, pocketY: 704},
    {x: 1530, y: 385, delay: 22, pawX: 310, pawY: 665, pocketX: 304, pocketY: 704},
    {x: 1280, y: 455, delay: 33, pawX: 450, pawY: 665, pocketX: 441, pocketY: 704},
  ];
  return <div style={{position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none'}}>{signs.map((sign) => { const appear = tween(frame, 192 + sign.delay, 202 + sign.delay); const catchProgress = tween(frame, 202 + sign.delay, 238 + sign.delay); const pocketProgress = tween(frame, 238 + sign.delay, 276 + sign.delay); const pocketed = pocketProgress > .5; const x = pocketed ? lerp(sign.pawX, sign.pocketX, pocketProgress) : lerp(sign.x, sign.pawX, catchProgress); const y = pocketed ? lerp(sign.pawY, sign.pocketY, pocketProgress) : lerp(sign.y, sign.pawY, catchProgress) - Math.sin(catchProgress * Math.PI) * 72; return <div key={`${sign.x}-${sign.y}`} style={{position: 'absolute', left: x, top: y, opacity: appear, transform: `scale(${lerp(.74, 1, catchProgress)}) rotate(${lerp(8, -10, catchProgress)}deg)`, color: C.gold, fontSize: 38, fontWeight: 950, textShadow: '0 6px 12px rgba(212,163,78,.28)', ...labelStyle}}>$</div>; })}</div>;
};

export const SavingsCat: React.FC = () => {
  const frame = useCurrentFrame();
  const ready = tween(frame, 276, 306);
  const logoOpacity = tween(frame, 12, 34);
  return <AbsoluteFill style={{fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', background: C.paper, overflow: 'hidden'}}>
    <Background />
    <div style={{position: 'absolute', left: 84, top: 54, display: 'flex', alignItems: 'center', gap: 12, opacity: logoOpacity, ...labelStyle}}><Img src={logo} style={{width: 42, height: 42, borderRadius: 9}} /><span style={{color: C.ink, fontSize: 20, fontWeight: 950}}>Web By Elie</span></div>
    <StageMarker frame={frame} />
    <div style={{position: 'absolute', left: 1430, top: 54, opacity: tween(frame, 34, 62), color: C.ink, fontSize: 14, fontWeight: 950, textTransform: 'uppercase', letterSpacing: 1, ...labelStyle}}>SAVINGS / COST CLEANUP</div>
    <ToolStack frame={frame} />
    <PagePanel frame={frame} />
    <EvaporatingDollars frame={frame} />
    <Cat frame={frame} />
    <Magnifier frame={frame} />
    <CapturedDollars frame={frame} />
    <div style={{position: 'absolute', left: 82, bottom: 48, opacity: tween(frame, 14, 34), ...labelStyle}}><div style={{color: C.muted, fontSize: 13, fontWeight: 950, letterSpacing: 1, textTransform: 'uppercase'}}>COST CLEANUP / FIND THE QUIET LEAKS</div><div style={{marginTop: 8, color: C.ink, fontSize: 30, fontWeight: 950}}>{ready > .5 ? 'Keep more of what you earn.' : 'A closer look can put money back.'}</div></div>
    <div style={{position: 'absolute', right: 82, bottom: 52, opacity: ready, padding: '9px 13px', borderRadius: 99, background: C.mint, color: C.green, fontSize: 12, fontWeight: 950, textTransform: 'uppercase', letterSpacing: 0.8, ...labelStyle}}>savings found ✓</div>
  </AbsoluteFill>;
};
