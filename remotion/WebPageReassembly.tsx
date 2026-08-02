import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import logo from '../assets/web-by-elie-logo.svg';

export const WEB_PAGE_REASSEMBLY_FRAMES = 330;

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
};

type Rect = {x: number; y: number; width: number; height: number};
type PieceKind = 'nav' | 'hero' | 'copy' | 'cta' | 'image' | 'proof' | 'footer';
type PieceData = {
  id: string;
  kind: PieceKind;
  old: Rect;
  scatter: Rect;
  fresh: Rect;
  oldColor: string;
  freshColor: string;
  oldLabel: string;
  freshLabel: string;
  oldRotation: number;
  scatterRotation: number;
  freshRotation: number;
};

const pieces: PieceData[] = [
  {id: 'nav', kind: 'nav', old: {x: 178, y: 305, width: 575, height: 46}, scatter: {x: 865, y: 160, width: 265, height: 48}, fresh: {x: 1146, y: 286, width: 602, height: 56}, oldColor: C.ink, freshColor: C.dark, oldLabel: 'menu / pages / links', freshLabel: 'clear path', oldRotation: 0, scatterRotation: -7, freshRotation: 0},
  {id: 'hero', kind: 'hero', old: {x: 178, y: 392, width: 374, height: 88}, scatter: {x: 820, y: 390, width: 340, height: 92}, fresh: {x: 1146, y: 374, width: 395, height: 124}, oldColor: C.rust, freshColor: C.green, oldLabel: 'headline', freshLabel: 'make the next step obvious', oldRotation: -1, scatterRotation: 5, freshRotation: 0},
  {id: 'copy', kind: 'copy', old: {x: 178, y: 500, width: 460, height: 38}, scatter: {x: 968, y: 563, width: 270, height: 40}, fresh: {x: 1146, y: 522, width: 465, height: 48}, oldColor: C.line, freshColor: C.blue, oldLabel: 'paragraphs', freshLabel: 'facts people can find', oldRotation: 0, scatterRotation: -4, freshRotation: 0},
  {id: 'cta', kind: 'cta', old: {x: 178, y: 554, width: 166, height: 50}, scatter: {x: 770, y: 508, width: 178, height: 50}, fresh: {x: 1146, y: 590, width: 220, height: 56}, oldColor: C.ink, freshColor: C.ink, oldLabel: 'contact', freshLabel: 'next step', oldRotation: 0, scatterRotation: 9, freshRotation: 0},
  {id: 'image', kind: 'image', old: {x: 603, y: 392, width: 150, height: 212}, scatter: {x: 925, y: 758, width: 182, height: 112}, fresh: {x: 1640, y: 374, width: 108, height: 220}, oldColor: C.blue, freshColor: C.yellow, oldLabel: 'image', freshLabel: 'proof', oldRotation: 0, scatterRotation: 4, freshRotation: 0},
  {id: 'proof', kind: 'proof', old: {x: 178, y: 654, width: 310, height: 82}, scatter: {x: 1170, y: 698, width: 254, height: 60}, fresh: {x: 1146, y: 694, width: 602, height: 72}, oldColor: C.yellow, freshColor: C.mint, oldLabel: 'three cards', freshLabel: 'proof / signal / trust', oldRotation: 0, scatterRotation: -5, freshRotation: 0},
  {id: 'footer', kind: 'footer', old: {x: 515, y: 654, width: 238, height: 82}, scatter: {x: 1304, y: 138, width: 220, height: 42}, fresh: {x: 1146, y: 780, width: 602, height: 40}, oldColor: C.muted, freshColor: C.muted, oldLabel: 'details', freshLabel: 'quietly maintainable', oldRotation: 0, scatterRotation: 6, freshRotation: 0},
];

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number) => value * value * (3 - 2 * value);
const tween = (frame: number, start: number, end: number) => smooth(clamp(interpolate(frame, [start, end], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})));
const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount;
const rectLerp = (from: Rect, to: Rect, amount: number): Rect => ({
  x: lerp(from.x, to.x, amount),
  y: lerp(from.y, to.y, amount),
  width: lerp(from.width, to.width, amount),
  height: lerp(from.height, to.height, amount),
});

const usePop = (frame: number, delay: number) => {
  const {fps} = useVideoConfig();
  return spring({frame: frame - delay, fps, config: {damping: 18, stiffness: 130}});
};

const mixHex = (from: string, to: string, amount: number) => {
  const channel = (offset: number) => Math.round(lerp(parseInt(from.slice(offset, offset + 2), 16), parseInt(to.slice(offset, offset + 2), 16), amount)).toString(16).padStart(2, '0');
  return `#${channel(1)}${channel(3)}${channel(5)}`;
};

const labelStyle: React.CSSProperties = {fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', letterSpacing: 0.5};

const BrowserShell: React.FC<{x: number; y: number; fresh: boolean; opacity: number}> = ({x, y, fresh, opacity}) => (
  <div style={{position: 'absolute', left: x, top: y, width: 690, height: fresh ? 680 : 570, border: `3px solid ${fresh ? C.green : C.line}`, borderRadius: 18, background: C.panel, boxShadow: fresh ? '0 28px 74px rgba(79,131,115,.22)' : '0 24px 64px rgba(16,32,39,.12)', overflow: 'hidden', opacity}}>
    <div style={{height: 54, display: 'flex', alignItems: 'center', gap: 9, padding: '0 18px', background: fresh ? C.dark : '#e8efeb'}}>
      {[C.rust, C.yellow, C.green].map((color) => <div key={color} style={{width: 13, height: 13, borderRadius: 99, background: color}} />)}
      <span style={{...labelStyle, marginLeft: 12, color: fresh ? '#d9e5e1' : C.muted, fontSize: 17, fontWeight: 850}}>{fresh ? 'new structure' : 'current page'}</span>
      <span style={{marginLeft: 'auto', color: fresh ? '#b8d8ca' : C.muted, fontSize: 14, fontWeight: 900}}>{fresh ? 'rebuilt' : 'audit'}</span>
    </div>
    <div style={{position: 'relative', height: 'calc(100% - 54px)', padding: 30, background: fresh ? '#f5faf7' : '#fff'}}>
      <div style={{position: 'absolute', inset: 28, opacity: fresh ? 0.5 : 0.78}}>
        <div style={{height: fresh ? 126 : 72, width: fresh ? '100%' : '78%', borderRadius: 10, background: fresh ? C.mint : '#eef2f0'}} />
        <div style={{display: 'grid', gridTemplateColumns: fresh ? '1fr 0.35fr' : '1fr 1fr', gap: 18, marginTop: 20}}>
          <div style={{height: fresh ? 176 : 142, borderRadius: 10, background: fresh ? '#fff' : '#f4f7f5', border: `2px solid ${C.line}`}} />
          <div style={{height: fresh ? 176 : 142, borderRadius: 10, background: fresh ? '#e8f1ec' : '#f4f7f5', border: `2px solid ${C.line}`}} />
        </div>
        <div style={{height: 48, marginTop: 20, borderRadius: 10, background: fresh ? '#e8f1ec' : '#f4f7f5'}} />
      </div>
    </div>
  </div>
);

const PieceContent: React.FC<{piece: PieceData; fresh: boolean; opacity: number}> = ({piece, fresh, opacity}) => {
  const text = fresh ? piece.freshLabel : piece.oldLabel;
  if (piece.kind === 'image') {
    return <div style={{position: 'absolute', inset: 0, opacity, display: 'grid', gridTemplateRows: fresh ? '1fr 0.22fr' : 'repeat(3, 1fr)', gap: 5, padding: fresh ? 9 : 7, background: fresh ? C.yellow : C.blue, borderRadius: fresh ? 14 : 8}}>
      {fresh ? <><div style={{display: 'grid', placeItems: 'center', borderRadius: 8, background: '#fff7df', color: C.ink, fontSize: 26, fontWeight: 950}}>proof</div><div style={{borderRadius: 6, background: C.green}} /></> : <><div style={{borderRadius: 5, background: '#cfe0ea'}} /><div style={{borderRadius: 5, background: '#7c9ab0'}} /><div style={{borderRadius: 5, background: '#e4eef2'}} /></>}
    </div>;
  }
  if (piece.kind === 'cta') {
    return <div style={{position: 'absolute', inset: 0, opacity, display: 'grid', placeItems: 'center', borderRadius: 99, background: fresh ? C.ink : C.ink, color: '#fff', fontSize: fresh ? 20 : 18, fontWeight: 950}}>{text}</div>;
  }
  if (piece.kind === 'hero') {
    return <div style={{position: 'absolute', inset: 0, opacity, display: 'flex', alignItems: 'center', padding: fresh ? '0 18px' : '0 14px', borderRadius: fresh ? 13 : 8, background: fresh ? C.green : C.rust, color: '#fff', fontSize: fresh ? 25 : 20, lineHeight: 1.05, fontWeight: 950}}>{text}</div>;
  }
  if (piece.kind === 'proof') {
    return <div style={{position: 'absolute', inset: 0, opacity, display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px', borderRadius: fresh ? 12 : 8, background: fresh ? '#e2f0e8' : '#fff8e6', color: C.ink, fontSize: fresh ? 18 : 17, fontWeight: 900}}>{fresh ? <><span style={{width: 11, height: 11, borderRadius: 99, background: C.green}} /><span>{text}</span></> : <>{[C.yellow, C.rust, C.blue].map((color) => <span key={color} style={{width: 24, height: 24, borderRadius: 6, background: color}} />)}</>}</div>;
  }
  return <div style={{position: 'absolute', inset: 0, opacity, display: 'flex', alignItems: 'center', gap: fresh ? 14 : 10, padding: fresh ? '0 18px' : '0 13px', borderRadius: fresh ? 11 : 7, background: fresh ? (piece.kind === 'nav' ? '#fff' : '#edf4f0') : piece.oldColor, color: fresh ? C.ink : '#fff', fontSize: fresh ? 18 : 16, fontWeight: 900, overflow: 'hidden'}}>
    {piece.kind === 'nav' ? <><span style={{width: 26, height: 3, background: fresh ? C.green : '#fff', boxShadow: `0 8px 0 ${fresh ? C.green : '#fff'}, 0 -8px 0 ${fresh ? C.green : '#fff'}`}} /><span>{text}</span></> : piece.kind === 'copy' ? <><span style={{display: 'grid', gap: 5, flex: 1}}><i style={{height: 5, width: '88%', background: fresh ? C.blue : '#fff', opacity: 0.9}} /><i style={{height: 5, width: fresh ? '62%' : '72%', background: fresh ? C.blue : '#fff', opacity: 0.55}} /></span><span style={{whiteSpace: 'nowrap'}}>{text}</span></> : <><span style={{width: 10, height: 10, borderRadius: 99, background: fresh ? C.green : '#fff'}} /><span style={{whiteSpace: 'nowrap'}}>{text}</span></>}
  </div>;
};

const MovingPiece: React.FC<{piece: PieceData; frame: number; index: number}> = ({piece, frame, index}) => {
  const reveal = tween(frame, 20 + index * 3, 58 + index * 3);
  const scatter = tween(frame, 78 + index * 2, 142 + index * 2);
  const transform = tween(frame, 146 + index * 2, 194 + index * 2);
  const assemble = tween(frame, 194 + index * 2, 258 + index * 2);
  const exit = tween(frame, 315, WEB_PAGE_REASSEMBLY_FRAMES);
  const firstRect = rectLerp(piece.old, piece.scatter, scatter);
  const rect = rectLerp(firstRect, piece.fresh, assemble);
  const rotation = frame < 194 ? lerp(piece.oldRotation, piece.scatterRotation, scatter) : lerp(piece.scatterRotation, piece.freshRotation, assemble);
  const freshOpacity = tween(frame, 160, 194);
  const oldOpacity = 1 - tween(frame, 146, 176);
  const opacity = reveal * (1 - exit);
  const background = mixHex(piece.oldColor, piece.freshColor, freshOpacity);
  const pop = usePop(frame, 20 + index * 3);
  return <div style={{position: 'absolute', left: rect.x, top: rect.y, width: rect.width, height: rect.height, opacity, transform: `rotate(${rotation}deg) scale(${0.92 + pop * 0.08})`, transformOrigin: 'center', background, borderRadius: piece.kind === 'cta' ? 99 : piece.kind === 'hero' ? 13 : 9, boxShadow: frame > 72 && frame < 268 ? '0 16px 36px rgba(16,32,39,.15)' : '0 8px 22px rgba(16,32,39,.08)', overflow: 'hidden'}}>
    <PieceContent piece={piece} fresh={false} opacity={oldOpacity} />
    <PieceContent piece={piece} fresh opacity={freshOpacity} />
  </div>;
};

const StageMarker: React.FC<{frame: number}> = ({frame}) => {
  const stages = [
    {label: 'pick apart', start: 72, end: 142, color: C.rust},
    {label: 'transform', start: 142, end: 198, color: C.blue},
    {label: 'reassemble', start: 198, end: 274, color: C.green},
  ];
  const active = stages.find((stage) => frame >= stage.start && frame < stage.end);
  const opacity = tween(frame, 24, 50) * (1 - tween(frame, 292, 320));
  return <div style={{position: 'absolute', left: 828, top: 48, width: 264, opacity, ...labelStyle}}>
    <div style={{display: 'flex', justifyContent: 'space-between', color: C.muted, fontSize: 12, fontWeight: 950, textTransform: 'uppercase'}}><span>current page</span><span>new structure</span></div>
    <div style={{position: 'relative', height: 5, marginTop: 10, borderRadius: 99, background: '#dbe5e0'}}>
      <div style={{height: '100%', width: `${clamp((frame - 72) / 204) * 100}%`, borderRadius: 99, background: active?.color || C.green}} />
    </div>
    <div style={{height: 20, marginTop: 8, color: active?.color || C.green, fontSize: 14, fontWeight: 950, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1}}>{active?.label || (frame < 72 ? 'audit the useful pieces' : 'rebuilt to be useful')}</div>
  </div>;
};

const Background: React.FC = () => <AbsoluteFill style={{background: `radial-gradient(circle at 50% 46%, #ffffff 0%, ${C.paper} 52%, #e9f1ed 100%)`}}><div style={{position: 'absolute', inset: 0, opacity: 0.32, backgroundImage: 'linear-gradient(rgba(79,131,115,.09) 1px, transparent 1px), linear-gradient(90deg, rgba(79,131,115,.09) 1px, transparent 1px)', backgroundSize: '48px 48px', maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)'}} /></AbsoluteFill>;

export const WebPageReassembly: React.FC = () => {
  const frame = useCurrentFrame();
  const oldOpacity = 1 - tween(frame, 76, 150) * 0.74;
  const freshOpacity = tween(frame, 188, 236);
  const fade = 1 - tween(frame, 316, WEB_PAGE_REASSEMBLY_FRAMES);
  const logoOpacity = tween(frame, 18, 44) * fade;
  return <AbsoluteFill style={{fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', background: C.paper, overflow: 'hidden'}}>
    <Background />
    <div style={{position: 'absolute', left: 84, top: 54, display: 'flex', alignItems: 'center', gap: 12, opacity: logoOpacity, ...labelStyle}}>
      <Img src={logo} style={{width: 42, height: 42, borderRadius: 9}} />
      <span style={{color: C.ink, fontSize: 20, fontWeight: 950}}>Web By Elie</span>
    </div>
    <StageMarker frame={frame} />
    <BrowserShell x={130} y={220} fresh={false} opacity={oldOpacity * fade} />
    <BrowserShell x={1100} y={180} fresh opacity={freshOpacity * fade} />
    {pieces.map((piece, index) => <MovingPiece key={piece.id} piece={piece} frame={frame} index={index} />)}
    <div style={{position: 'absolute', left: 82, bottom: 50, opacity: tween(frame, 22, 50) * fade, ...labelStyle}}>
      <div style={{color: C.muted, fontSize: 13, fontWeight: 950, letterSpacing: 1, textTransform: 'uppercase'}}>website refresh / search / AI-ready / spend cleanup</div>
      <div style={{marginTop: 8, color: C.ink, fontSize: 30, fontWeight: 950}}>Change the pieces. Keep the purpose.</div>
    </div>
  </AbsoluteFill>;
};
