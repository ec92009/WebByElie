import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {Audio} from '@remotion/media';
import logo from '../assets/web-by-elie-logo.svg';
import workspace from '../assets/web-refresh-workspace.png';

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
  cream: '#fff7ea',
  red: '#d34a3a',
};

const TOTAL_FRAMES = 2798;
const scenes = [
  {start: 0, end: 480},
  {start: 480, end: 900},
  {start: 900, end: 1360},
  {start: 1360, end: 2040},
  {start: 2040, end: 2520},
  {start: 2520, end: TOTAL_FRAMES},
];

const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));
const localFrame = (frame: number, index: number) => frame - scenes[index].start;
const fade = (frame: number, start = 0, end = 20) =>
  interpolate(frame, [start, end], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
const ease = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

const usePop = (frame: number, delay = 0) => {
  const {fps} = useVideoConfig();
  return spring({frame: frame - delay, fps, config: {damping: 18, stiffness: 120}});
};

const SceneShell: React.FC<{children: React.ReactNode; dark?: boolean}> = ({children, dark}) => (
  <AbsoluteFill style={{background: dark ? C.dark : C.paper, padding: 76, fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif'}}>
    {children}
    <div style={{position: 'absolute', left: 76, right: 76, bottom: 34, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: dark ? '#d9e5e1' : C.muted, fontSize: 22, fontWeight: 800}}>
      <div style={{display: 'flex', gap: 14, alignItems: 'center'}}>
        <Img src={logo} style={{width: 42, height: 42, borderRadius: 8}} />
        <span>Web By Elie</span>
      </div>
      <span>New look, better reach.</span>
    </div>
  </AbsoluteFill>
);

const Title: React.FC<{eyebrow: string; children: React.ReactNode; light?: boolean}> = ({eyebrow, children, light}) => (
  <div>
    <div style={{fontSize: 24, fontWeight: 950, color: light ? '#b8d8ca' : C.green, textTransform: 'uppercase'}}>{eyebrow}</div>
    <div style={{fontSize: 82, lineHeight: 0.94, fontWeight: 950, color: light ? '#fff' : C.ink, marginTop: 12}}>{children}</div>
  </div>
);

const Gear: React.FC<{x: number; y: number; size: number; f: number; reverse?: boolean}> = ({x, y, size, f, reverse}) => (
  <div style={{position: 'absolute', left: x, top: y, width: size, height: size, borderRadius: size / 2, border: `${size * 0.12}px solid ${C.green}`, transform: `rotate(${(reverse ? -1 : 1) * f * 1.4}deg)`, opacity: 0.9}}>
    {Array.from({length: 8}).map((_, i) => (
      <div key={i} style={{position: 'absolute', left: size / 2 - 8, top: -size * 0.12, width: 16, height: size * 0.22, borderRadius: 8, background: C.green, transformOrigin: `8px ${size / 2 + size * 0.12}px`, transform: `rotate(${i * 45}deg)`}} />
    ))}
    <div style={{position: 'absolute', inset: size * 0.28, borderRadius: size, border: `${size * 0.09}px solid ${C.blue}`}} />
  </div>
);

const SurfaceAndMachine: React.FC<{f: number}> = ({f}) => {
  const reveal = ease(f, 70, 150);
  return (
    <div style={{position: 'relative', width: 820, height: 540, opacity: fade(f, 10, 34)}}>
      <div style={{position: 'absolute', inset: 0, borderRadius: 24, background: '#fff', border: `4px solid ${C.line}`, boxShadow: '0 34px 90px rgba(16,32,39,.18)', overflow: 'hidden'}}>
        <div style={{height: 72, background: C.dark, display: 'flex', alignItems: 'center', gap: 12, padding: '0 28px'}}>
          {[C.red, C.yellow, C.green].map((color) => <div key={color} style={{width: 18, height: 18, borderRadius: 9, background: color}} />)}
          <div style={{marginLeft: 18, color: '#d9e5e1', fontSize: 22, fontWeight: 900}}>current website</div>
        </div>
        <div style={{padding: 40}}>
          <div style={{height: 48, width: 420, background: C.ink, borderRadius: 10}} />
          <div style={{height: 20, width: 620, background: C.line, borderRadius: 10, marginTop: 28}} />
          <div style={{height: 20, width: 540, background: C.line, borderRadius: 10, marginTop: 14}} />
          <Img src={workspace} style={{width: 330, borderRadius: 14, marginTop: 42, boxShadow: '0 18px 42px rgba(16,32,39,.16)'}} />
        </div>
      </div>
      <div style={{position: 'absolute', inset: 0, borderRadius: 24, background: C.cream, border: `4px solid ${C.line}`, clipPath: `inset(${100 - reveal * 100}% 0 0 0)`, overflow: 'hidden'}}>
        <Gear x={110} y={155} size={170} f={f} />
        <Gear x={280} y={250} size={128} f={f} reverse />
        <Gear x={430} y={132} size={210} f={f} />
        <div style={{position: 'absolute', right: 55, top: 80, width: 235, display: 'grid', gap: 14}}>
          {['Structure', 'Search details', 'AI-readable facts', 'Costs'].map((item, i) => (
            <div key={item} style={{padding: '14px 18px', borderRadius: 12, background: '#fff', border: `3px solid ${C.line}`, color: C.ink, fontSize: 23, fontWeight: 900, opacity: fade(f, 112 + i * 14, 128 + i * 14)}}>{item}</div>
          ))}
        </div>
      </div>
      <div style={{position: 'absolute', left: 36, top: 36, padding: '12px 18px', borderRadius: 999, background: '#fff', border: `3px solid ${C.line}`, color: C.green, fontSize: 22, fontWeight: 950}}>visible + hidden</div>
    </div>
  );
};

const PaletteScene: React.FC<{f: number}> = ({f}) => (
  <div style={{display: 'grid', gridTemplateColumns: '1fr 820px', gap: 70, alignItems: 'center', height: '100%'}}>
    <div style={{opacity: fade(f, 0, 20)}}>
      <Title eyebrow="Refresh">Compare real options, then mix.</Title>
      <p style={{fontSize: 34, lineHeight: 1.24, color: C.muted, marginTop: 30, fontWeight: 700}}>The choice becomes concrete: layouts, type, colors, and useful pieces from the existing site.</p>
    </div>
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22}}>
      {[
        ['01', 'Practical', '#dfeee7'],
        ['02', 'Editorial', '#e9c879'],
        ['03', 'Bold trust', '#7893ad'],
      ].map(([num, title, color], i) => {
        const p = usePop(f, 28 + i * 12);
        const promote = i === 1 ? ease(f, 190, 250) : 0;
        return (
          <div key={title} style={{height: 430, borderRadius: 20, background: '#fff', border: `${4 + promote * 4}px solid ${i === 1 ? C.green : C.line}`, boxShadow: i === 1 ? '0 34px 90px rgba(79,131,115,.22)' : '0 20px 50px rgba(16,32,39,.12)', padding: 26, opacity: fade(f, 18 + i * 12, 34 + i * 12), transform: `translateY(${(1 - p) * 40 - promote * 26}px) scale(${1 + promote * 0.06})`}}>
            <div style={{fontSize: 30, fontWeight: 950, color: C.green}}>{num}</div>
            <div style={{height: 160, borderRadius: 14, background: color, marginTop: 22}} />
            <div style={{fontSize: 40, lineHeight: 1, fontWeight: 950, color: C.ink, marginTop: 28}}>{title}</div>
            <div style={{display: 'flex', gap: 8, marginTop: 22}}>
              {['look', 'flow'].map((tag) => <span key={tag} style={{fontSize: 18, fontWeight: 900, padding: '8px 12px', borderRadius: 99, background: C.paper, color: C.muted}}>{tag}</span>)}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const FactMap: React.FC<{f: number}> = ({f}) => {
  const scan = ease(f, 18, 160);
  const facts = [
    ['Who', 600, 190],
    ['Services', 850, 310],
    ['Where', 640, 430],
    ['Answers', 1060, 210],
  ] as const;
  return (
    <div style={{position: 'relative', height: '100%', opacity: fade(f, 0, 20)}}>
      <Title eyebrow="Search + AI-ready" light>Make the facts easy to understand.</Title>
      <div style={{position: 'absolute', left: 0, bottom: 130, width: 500, fontSize: 34, lineHeight: 1.23, color: '#d9e5e1', fontWeight: 700}}>Visible wording and behind-the-scenes page details help people, search engines, and AI assistants read the site.</div>
      <div style={{position: 'absolute', right: 30, top: 170, width: 930, height: 610, borderRadius: 28, background: 'rgba(255,255,255,.08)', border: '3px solid rgba(255,255,255,.18)'}}>
        <div style={{position: 'absolute', left: 70, top: 80, width: 420, height: 350, borderRadius: 20, background: '#fff', padding: 36}}>
          <div style={{height: 38, width: 260, borderRadius: 10, background: C.ink}} />
          {[0, 1, 2, 3].map((i) => <div key={i} style={{height: 18, width: 300 - i * 22, borderRadius: 9, background: C.line, marginTop: 24}} />)}
        </div>
        <div style={{position: 'absolute', left: 85 + scan * 300, top: 195, width: 130, height: 130, borderRadius: 65, border: `11px solid ${C.yellow}`, background: 'rgba(255,255,255,.2)'}} />
        {facts.map(([label, x, y], i) => (
          <div key={label} style={{position: 'absolute', left: x - 520, top: y - 120, padding: '16px 22px', borderRadius: 12, background: '#fff', color: C.ink, border: `3px solid ${C.line}`, fontSize: 26, fontWeight: 950, opacity: fade(f, 95 + i * 18, 112 + i * 18)}}>{label}</div>
        ))}
        <svg width="930" height="610" style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
          {facts.map(([, x, y], i) => {
            const on = fade(f, 118 + i * 18, 136 + i * 18);
            return <line key={i} x1="585" y1="305" x2={x - 520} y2={y - 120} stroke={C.yellow} strokeWidth="5" opacity={on} />;
          })}
        </svg>
        <div style={{position: 'absolute', left: 518, top: 262, padding: '24px 34px', borderRadius: 18, background: C.yellow, color: C.ink, fontSize: 32, fontWeight: 950}}>clear facts</div>
      </div>
    </div>
  );
};

const CostScene: React.FC<{f: number}> = ({f}) => {
  const items = ['Overlapping tools', 'Unused add-ons', 'Oversized tiers', 'Forgotten renewals'];
  return (
    <div style={{display: 'grid', gridTemplateColumns: '720px 1fr', gap: 74, alignItems: 'center', height: '100%'}}>
      <div>
        <Title eyebrow="Cost cleanup">Hunt waste, verify savings.</Title>
        <div style={{display: 'grid', gap: 18, marginTop: 46}}>
          {items.map((item, i) => {
            const strike = ease(f, 76 + i * 40, 100 + i * 40);
            return (
              <div key={item} style={{position: 'relative', height: 74, borderRadius: 14, background: '#fff', border: `3px solid ${strike > 0 ? '#efb2aa' : C.line}`, padding: '18px 24px', fontSize: 28, fontWeight: 950, color: strike > 0 ? C.muted : C.ink, opacity: fade(f, 18 + i * 10, 34 + i * 10)}}>
                {item}
                <div style={{position: 'absolute', left: 24, right: 24, top: 36, height: 5, borderRadius: 5, background: C.red, transformOrigin: 'left center', transform: `scaleX(${strike})`}} />
              </div>
            );
          })}
        </div>
      </div>
      <div style={{position: 'relative', height: 600}}>
        {Array.from({length: 18}).map((_, i) => {
          const out = ease(f, 8 + i * 3, 48 + i * 3);
          const back = ease(f, 100 + Math.floor(i / 4) * 40 + (i % 4) * 4, 132 + Math.floor(i / 4) * 40 + (i % 4) * 4);
          const x = lerp(180 + (i % 5) * 52, 590 + (i % 4) * 80, out);
          const y = lerp(390 + (i % 3) * 42, -130 - i * 4, out);
          return <div key={i} style={{position: 'absolute', left: lerp(x, 245 + (i % 5) * 42, back), top: lerp(y, 380 - Math.floor(i / 5) * 42, back), fontSize: 58, fontWeight: 950, color: C.green}}>$</div>;
        })}
        {Array.from({length: 5}).map((_, i) => {
          const show = fade(f, 114 + i * 38, 132 + i * 38);
          return <div key={i} style={{position: 'absolute', left: 235, bottom: 82 + i * 48, width: 245, height: 48, borderRadius: 10, background: i % 2 ? '#7fb391' : '#65a47a', border: '4px solid #3f7757', color: '#17351f', display: 'grid', placeItems: 'center', fontSize: 27, fontWeight: 950, opacity: show, transform: `translateY(${(1 - show) * 22}px)`}}>verified</div>;
        })}
      </div>
    </div>
  );
};

const BudgetScene: React.FC<{f: number}> = ({f}) => {
  const progress = ease(f, 70, 230);
  return (
    <div style={{display: 'grid', gridTemplateColumns: '1fr 760px', gap: 72, alignItems: 'center', height: '100%'}}>
      <div style={{opacity: fade(f, 0, 22)}}>
        <Title eyebrow="Budget">10 hours, visible progress.</Title>
        <p style={{fontSize: 34, lineHeight: 1.24, color: C.muted, marginTop: 30, fontWeight: 700}}>Tracked in $100/hour increments, with a manual check-in at 50% so the project stays grounded.</p>
      </div>
      <div style={{height: 520, borderRadius: 24, background: '#fff', border: `4px solid ${C.line}`, padding: 48, boxShadow: '0 34px 90px rgba(16,32,39,.16)', opacity: fade(f, 22, 44)}}>
        <div style={{fontSize: 34, fontWeight: 950, color: C.ink}}>Initial bundle</div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 10, marginTop: 36}}>
          {Array.from({length: 10}).map((_, i) => {
            const fill = progress * 10 > i ? 1 : 0.22;
            return <div key={i} style={{height: 145, borderRadius: 10, background: C.green, opacity: fill}} />;
          })}
        </div>
        <div style={{marginTop: 46, height: 28, borderRadius: 999, background: C.line, overflow: 'hidden'}}>
          <div style={{height: '100%', width: `${clamp(progress) * 100}%`, background: progress >= 0.5 ? C.yellow : C.green}} />
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 22, color: C.muted, fontSize: 24, fontWeight: 900}}>
          <span>$0</span>
          <span style={{color: progress >= 0.5 ? C.rust : C.muted}}>50% check-in</span>
          <span>10 hours</span>
        </div>
      </div>
    </div>
  );
};

const HeroScene: React.FC<{f: number}> = ({f}) => (
  <div style={{display: 'grid', gridTemplateColumns: '1fr 840px', gap: 70, alignItems: 'center', height: '100%'}}>
    <div style={{opacity: fade(f, 0, 20)}}>
      <Title eyebrow="Website refresh / Search / AI-ready / Spend cleanup">New look,<br />better reach.</Title>
      <p style={{fontSize: 35, lineHeight: 1.24, color: C.muted, marginTop: 30, fontWeight: 700}}>Modernize an existing site for people, search engines, and AI assistants without starting from scratch.</p>
    </div>
    <SurfaceAndMachine f={f} />
  </div>
);

const CtaScene: React.FC<{f: number}> = ({f}) => (
  <div style={{height: '100%', display: 'grid', placeItems: 'center', textAlign: 'center'}}>
    <div style={{opacity: fade(f, 0, 22)}}>
      <Img src={logo} style={{width: 112, height: 112, borderRadius: 20, margin: '0 auto 32px'}} />
      <Title eyebrow="Next" light>Send the link.<br />Get the first pass.</Title>
      <div style={{marginTop: 48, padding: '30px 52px', borderRadius: 999, background: '#fff', color: C.ink, fontSize: 38, fontWeight: 950, boxShadow: '0 34px 90px rgba(0,0,0,.22)', transform: `scale(${0.96 + usePop(f, 28) * 0.04})`}}>hello@web-by-elie.com</div>
    </div>
  </div>
);

export const NotebookLmExplainer: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneIndex = scenes.findIndex((scene) => frame >= scene.start && frame < scene.end);
  const index = sceneIndex === -1 ? scenes.length - 1 : sceneIndex;
  const f = localFrame(frame, index);
  const Scene = [HeroScene, PaletteScene, FactMap, CostScene, BudgetScene, CtaScene][index] || HeroScene;
  const dark = index === 2 || index === 5;
  return (
    <AbsoluteFill style={{background: dark ? C.dark : C.paper}}>
      <SceneShell dark={dark}>
        <Scene f={f} />
      </SceneShell>
      <Audio src={staticFile('notebooklm/modernize-business-website-ai.m4a')} volume={1.3} />
    </AbsoluteFill>
  );
};

export const NOTEBOOK_LM_TOTAL_FRAMES = TOTAL_FRAMES;
