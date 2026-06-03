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

const sceneStarts = [0, 180, 360, 540, 720, 930, 1110, 1290, 1500, 1710];
const sceneDuration = 180;

const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));

const sceneFrame = (frame: number, index: number) => frame - sceneStarts[index];

const fade = (frame: number, start = 0, end = 18) =>
  interpolate(frame, [start, end], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

const easeIn = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

const pop = (frame: number, delay = 0) => {
  const {fps} = useVideoConfig();
  return spring({frame: frame - delay, fps, config: {damping: 16, stiffness: 120}});
};

const Title: React.FC<{eyebrow?: string; children: React.ReactNode; light?: boolean}> = ({eyebrow, children, light}) => (
  <div>
    {eyebrow ? <div style={{fontSize: 24, fontWeight: 900, color: light ? '#b8d8ca' : C.green, textTransform: 'uppercase', letterSpacing: 1}}>{eyebrow}</div> : null}
    <div style={{fontSize: 76, lineHeight: 0.95, fontWeight: 950, color: light ? '#fff' : C.ink, letterSpacing: -2, marginTop: 12}}>{children}</div>
  </div>
);

const Footer: React.FC = () => (
  <div style={{position: 'absolute', left: 80, right: 80, bottom: 36, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: C.muted, fontWeight: 700, fontSize: 22}}>
    <div style={{display: 'flex', gap: 14, alignItems: 'center'}}>
      <Img src={logo} style={{width: 42, height: 42, borderRadius: 8}} />
      <span>Web By Elie</span>
    </div>
    <span>New look, better reach.</span>
  </div>
);

const CheckLine: React.FC<{text: string; crossed?: boolean; delay?: number; frame: number}> = ({text, crossed, delay = 0, frame}) => {
  const p = pop(frame, delay);
  const slash = easeIn(frame, delay + 12, delay + 30);
  return (
    <div style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 16, opacity: fade(frame, delay, delay + 16), transform: `translateY(${(1 - p) * 18}px)`}}>
      <div style={{width: 34, height: 34, borderRadius: 17, background: crossed ? C.red : C.green, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 24, fontWeight: 900}}>✓</div>
      <div style={{fontSize: 32, fontWeight: 850, color: crossed ? C.muted : C.ink}}>{text}</div>
      {crossed ? <div style={{position: 'absolute', left: 56, right: 0, top: 22, height: 5, background: C.red, transformOrigin: 'left center', transform: `scaleX(${slash}) rotate(-1deg)`}} /> : null}
    </div>
  );
};

const BrowserMock: React.FC<{frame: number; label?: string}> = ({frame, label}) => (
  <div style={{width: 690, height: 410, border: `4px solid ${C.line}`, borderRadius: 18, background: '#fff', boxShadow: '0 28px 70px rgba(16,32,39,.16)', overflow: 'hidden', opacity: fade(frame, 12, 30), transform: `scale(${0.96 + pop(frame, 10) * 0.04})`}}>
    <div style={{height: 56, background: C.dark, display: 'flex', alignItems: 'center', gap: 10, padding: '0 20px'}}>
      {[C.red, C.yellow, C.green].map((color) => <div key={color} style={{width: 16, height: 16, borderRadius: 8, background: color}} />)}
      <div style={{marginLeft: 18, color: '#d9e5e1', fontWeight: 800, fontSize: 18}}>{label || 'current website'}</div>
    </div>
    <div style={{padding: 34}}>
      <div style={{height: 38, width: 370, background: C.ink, borderRadius: 8}} />
      <div style={{height: 18, width: 510, background: C.line, borderRadius: 8, marginTop: 22}} />
      <div style={{height: 18, width: 470, background: C.line, borderRadius: 8, marginTop: 12}} />
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginTop: 42}}>
        {[0, 1, 2].map((i) => <div key={i} style={{height: 125, borderRadius: 10, background: [C.green, C.blue, C.rust][i], opacity: 0.72}} />)}
      </div>
    </div>
  </div>
);

const SceneShell: React.FC<{children: React.ReactNode; dark?: boolean}> = ({children, dark}) => (
  <AbsoluteFill style={{background: dark ? C.dark : C.paper, padding: 80, fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif'}}>
    {children}
    <Footer />
  </AbsoluteFill>
);

const Scene1: React.FC<{f: number}> = ({f}) => (
  <SceneShell>
    <div style={{display: 'grid', gridTemplateColumns: '1fr 760px', gap: 80, alignItems: 'center', height: '100%'}}>
      <div style={{opacity: fade(f)}}>
        <Title eyebrow="Website refresh / Search / AI-ready / Spend cleanup">New look,<br />better reach.</Title>
        <div style={{fontSize: 34, lineHeight: 1.25, color: C.muted, marginTop: 28, maxWidth: 760}}>
          Upgrade your website so it looks better, is easier to find, and helps hunt wasteful costs.
        </div>
      </div>
      <Img src={workspace} style={{width: 760, borderRadius: 18, boxShadow: '0 34px 90px rgba(16,32,39,.22)', opacity: fade(f, 18, 42), transform: `translateX(${(1 - pop(f, 16)) * 60}px)`}} />
    </div>
  </SceneShell>
);

const Scene2: React.FC<{f: number}> = ({f}) => (
  <SceneShell>
    <div style={{height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center'}}>
      <div style={{opacity: fade(f)}}>
        <Title eyebrow="Intro">Decades of software judgment, applied practically.</Title>
      </div>
      <div style={{fontSize: 37, lineHeight: 1.23, color: C.ink, fontWeight: 750, opacity: fade(f, 28, 50)}}>
        A good site is more than a surface design problem.
        <br /><br />
        It also has structure, maintainability, search signals, tool choices, and costs underneath it.
      </div>
    </div>
  </SceneShell>
);

const Scene3: React.FC<{f: number}> = ({f}) => (
  <SceneShell>
    <Title eyebrow="The problem">You already did the work. The site just needs to catch up.</Title>
    <div style={{display: 'grid', gridTemplateColumns: '690px 1fr', gap: 72, marginTop: 76, alignItems: 'center'}}>
      <BrowserMock frame={f} />
      <div style={{display: 'grid', gap: 28}}>
        {['Dated look', 'Weak search signals', 'AI cannot extract clear facts', 'Quiet recurring costs'].map((text, i) => (
          <CheckLine key={text} text={text} crossed frame={f} delay={28 + i * 18} />
        ))}
      </div>
    </div>
  </SceneShell>
);

const Scene4: React.FC<{f: number}> = ({f}) => (
  <SceneShell dark>
    <Title eyebrow="Checklist overview" light>Four passes, one practical checklist.</Title>
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28, marginTop: 84}}>
      {[
        ['01', 'Refresh', 'Look and trust'],
        ['02', 'SEO', 'Search signals'],
        ['03', 'AI-ready', 'Clear facts'],
        ['04', 'Cost cleanup', 'Spend hygiene'],
      ].map(([num, title, sub], i) => (
        <div key={title} style={{height: 370, borderRadius: 14, border: '2px solid rgba(255,255,255,.18)', background: 'rgba(255,255,255,.08)', padding: 32, opacity: fade(f, 20 + i * 14, 38 + i * 14), transform: `translateY(${(1 - pop(f, 20 + i * 14)) * 35}px)`}}>
          <div style={{fontSize: 28, color: '#b8d8ca', fontWeight: 950}}>{num}</div>
          <div style={{fontSize: 47, lineHeight: 1, color: '#fff', fontWeight: 950, marginTop: 50}}>{title}</div>
          <div style={{fontSize: 27, color: '#d9e5e1', fontWeight: 650, marginTop: 24}}>{sub}</div>
          <div style={{fontSize: 56, color: C.yellow, fontWeight: 950, marginTop: 58}}>✓</div>
        </div>
      ))}
    </div>
  </SceneShell>
);

const ChooserCard: React.FC<{f: number; i: number; title: string; color: string; promoted?: boolean}> = ({f, i, title, color, promoted}) => {
  const p = pop(f, 18 + i * 12);
  const lift = promoted ? easeIn(f, 84, 118) : 0;
  return (
    <div style={{height: 320, borderRadius: 16, background: '#fff', border: `${promoted ? 7 : 3}px solid ${promoted ? C.green : C.line}`, boxShadow: promoted ? '0 34px 90px rgba(79,131,115,.25)' : '0 20px 50px rgba(16,32,39,.10)', padding: 22, opacity: fade(f, 14 + i * 10, 30 + i * 10), transform: `translateY(${(1 - p) * 40 - lift * 34}px) scale(${promoted ? 1 + lift * 0.08 : 1})`}}>
      <div style={{fontSize: 28, fontWeight: 950, color: C.green}}>0{i + 1}</div>
      <div style={{height: 120, borderRadius: 12, background: color, marginTop: 18}} />
      <div style={{fontSize: 34, fontWeight: 950, color: C.ink, marginTop: 22}}>{title}</div>
      <div style={{display: 'flex', gap: 8, marginTop: 18}}>
        {['calm', 'clear'].map((tag) => <span key={tag} style={{fontSize: 17, fontWeight: 850, padding: '7px 12px', borderRadius: 99, background: C.paper, color: C.muted}}>{tag}</span>)}
      </div>
    </div>
  );
};

const Scene5: React.FC<{f: number}> = ({f}) => (
  <SceneShell>
    <Title eyebrow="Checklist: Refresh">Chooser harness: compare real options.</Title>
    <div style={{display: 'grid', gridTemplateColumns: '1fr 520px', gap: 56, marginTop: 60, alignItems: 'center'}}>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22}}>
        <ChooserCard f={f} i={0} title="Quiet utility" color="#dfeee7" />
        <ChooserCard f={f} i={1} title="Editorial" color="#e9c879" promoted />
        <ChooserCard f={f} i={2} title="Bold trust" color="#7893ad" />
      </div>
      <div style={{display: 'grid', gap: 26}}>
        <div style={{fontSize: 30, lineHeight: 1.22, color: C.ink, fontWeight: 850, opacity: fade(f, 104, 126)}}>Promote one direction, then mix in useful pieces from the existing site.</div>
        {['Guessing from abstract descriptions', 'Losing existing work', 'No clear sign-off direction'].map((text, i) => (
          <CheckLine key={text} text={text} crossed frame={f} delay={126 + i * 15} />
        ))}
      </div>
    </div>
  </SceneShell>
);

const Sleuth: React.FC<{f: number; ai?: boolean}> = ({f, ai}) => {
  const scan = easeIn(f, 58, 122);
  return (
    <div style={{position: 'relative', width: 760, height: 480}}>
      <BrowserMock frame={f} label={ai ? 'structured facts' : 'website page'} />
      <div style={{position: 'absolute', left: 52 + scan * 410, top: 116 + Math.sin(scan * Math.PI) * 55, width: 128, height: 128, borderRadius: 64, border: `12px solid ${ai ? C.blue : C.green}`, background: 'rgba(255,255,255,.22)', boxShadow: '0 18px 50px rgba(16,32,39,.2)'}} />
      <div style={{position: 'absolute', left: 155 + scan * 410, top: 220 + Math.sin(scan * Math.PI) * 55, width: 124, height: 18, background: ai ? C.blue : C.green, borderRadius: 12, transform: 'rotate(39deg)', transformOrigin: 'left center'}} />
      <div style={{position: 'absolute', right: 18, top: 84, display: 'grid', gap: 12}}>
        {(ai ? ['Who', 'What', 'Where', 'Answers'] : ['Headings', 'Titles', 'Links', 'Alt text']).map((item, i) => (
          <div key={item} style={{padding: '12px 16px', borderRadius: 10, background: '#fff', border: `2px solid ${C.line}`, color: C.ink, fontSize: 21, fontWeight: 900, opacity: fade(f, 70 + i * 12, 82 + i * 12)}}>{item}</div>
        ))}
      </div>
    </div>
  );
};

const Scene6: React.FC<{f: number}> = ({f}) => (
  <SceneShell>
    <Title eyebrow="Checklist: Search sleuth">Visible and hidden issues both matter.</Title>
    <div style={{display: 'grid', gridTemplateColumns: '760px 1fr', gap: 72, marginTop: 68, alignItems: 'center'}}>
      <Sleuth f={f} />
      <div style={{display: 'grid', gap: 22}}>
        {['Missing titles', 'Vague headings', 'Weak service/location signals', 'Images with no useful labels'].map((text, i) => (
          <CheckLine key={text} text={text} crossed frame={f} delay={70 + i * 18} />
        ))}
      </div>
    </div>
  </SceneShell>
);

const Scene7: React.FC<{f: number}> = ({f}) => (
  <SceneShell>
    <Title eyebrow="Checklist: AI-ready sleuth">AI assistants need clear facts to compare.</Title>
    <div style={{display: 'grid', gridTemplateColumns: '760px 1fr', gap: 72, marginTop: 68, alignItems: 'center'}}>
      <Sleuth f={f} ai />
      <div style={{display: 'grid', gap: 22}}>
        {['AI cannot tell what you do', 'Services are buried', 'Important facts are scattered', 'No clean answers'].map((text, i) => (
          <CheckLine key={text} text={text} crossed frame={f} delay={70 + i * 18} />
        ))}
      </div>
    </div>
  </SceneShell>
);

const Dollar: React.FC<{f: number; i: number}> = ({f, i}) => {
  const out = easeIn(f, 20 + i * 6, 80 + i * 6);
  const back = easeIn(f, 96 + i * 4, 145 + i * 4);
  const x = interpolate(out, [0, 1], [0, 620]) - interpolate(back, [0, 1], [0, 650]);
  const y = Math.sin((i + out) * 1.6) * 42 - back * 80;
  return <div style={{position: 'absolute', left: 480 + x, top: 230 + y + i * 12, fontSize: 50, fontWeight: 950, color: C.green, opacity: clamp(0.3 + out - back * 0.1)}}>$</div>;
};

const Scene8: React.FC<{f: number}> = ({f}) => {
  const stack = Math.floor(easeIn(f, 104, 162) * 7);
  return (
    <SceneShell>
      <Title eyebrow="Checklist: Cost cleanup sleuth">Bring quiet waste back under control.</Title>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 520px', gap: 70, marginTop: 70, alignItems: 'center'}}>
        <div style={{position: 'relative', height: 520}}>
          {['Domains', 'Hosting', 'Plugins', 'Email tools', 'Booking', 'Analytics', 'AI/Image tools'].map((item, i) => (
            <div key={item} style={{position: 'absolute', left: 40 + i * 42, top: 55 + i * 48, width: 350, height: 58, borderRadius: 10, background: '#fff', border: `3px solid ${C.line}`, display: 'flex', alignItems: 'center', paddingLeft: 24, fontSize: 24, fontWeight: 900, color: C.ink, opacity: fade(f, i * 7, i * 7 + 18)}}>{item}</div>
          ))}
          {Array.from({length: 12}).map((_, i) => <Dollar key={i} f={f} i={i} />)}
          <div style={{position: 'absolute', right: 20, bottom: 58, width: 230, height: 210}}>
            {Array.from({length: stack + 1}).map((_, i) => (
              <div key={i} style={{position: 'absolute', left: 0, bottom: i * 15, width: 220, height: 42, borderRadius: 8, background: i % 2 ? '#7fb391' : '#65a47a', border: '4px solid #3f7757', display: 'grid', placeItems: 'center', color: '#17351f', fontSize: 26, fontWeight: 950}}>$100</div>
            ))}
          </div>
        </div>
        <div style={{display: 'grid', gap: 22}}>
          {['Unused subscriptions', 'Duplicate tools', 'Mystery renewals', 'Scattered logins'].map((text, i) => (
            <CheckLine key={text} text={text} crossed frame={f} delay={82 + i * 17} />
          ))}
        </div>
      </div>
    </SceneShell>
  );
};

const Scene9: React.FC<{f: number}> = ({f}) => {
  const pen = easeIn(f, 82, 134);
  return (
    <SceneShell>
      <Title eyebrow="How we work">A real conversation becomes visible progress.</Title>
      <div style={{display: 'grid', gridTemplateColumns: '430px 470px 1fr', gap: 44, marginTop: 80, alignItems: 'center'}}>
        <div style={{height: 430, borderRadius: 18, background: '#fff', border: `3px solid ${C.line}`, padding: 34, opacity: fade(f, 14, 30)}}>
          <div style={{fontSize: 120}}>☎</div>
          <div style={{fontSize: 38, fontWeight: 950, color: C.ink}}>Intake interview</div>
          <div style={{fontSize: 25, color: C.muted, marginTop: 18, fontWeight: 650}}>What is working? What must be preserved?</div>
        </div>
        <BrowserMock frame={f - 20} label="current site" />
        <div style={{position: 'relative', height: 430, borderRadius: 18, background: '#fff', border: `3px solid ${C.line}`, padding: 34, opacity: fade(f, 46, 64)}}>
          {['What works', 'What to preserve', 'Where visitors get stuck', 'First design directions'].map((item, i) => (
            <CheckLine key={item} text={item} frame={f} delay={74 + i * 15} />
          ))}
          <div style={{position: 'absolute', right: 44 - pen * 210, top: 260 + pen * 30, width: 260, height: 18, background: C.rust, borderRadius: 12, transform: 'rotate(-28deg)', boxShadow: '0 10px 24px rgba(16,32,39,.18)'}} />
        </div>
      </div>
    </SceneShell>
  );
};

const Cookie: React.FC<{x: number; y: number; eaten: boolean; delay: number; f: number}> = ({x, y, eaten, delay, f}) => {
  const bite = easeIn(f, delay, delay + 12);
  return (
    <div style={{position: 'absolute', left: x, top: y, width: 70, height: 70, borderRadius: 35, background: '#c9874d', border: '5px solid #9b5b2d', opacity: eaten ? 1 - bite : 1, transform: `scale(${eaten ? 1 - bite * 0.25 : 1})`}}>
      {[12, 31, 49].map((cx, i) => <div key={i} style={{position: 'absolute', left: cx, top: [20, 43, 26][i], width: 10, height: 10, borderRadius: 5, background: '#3b2114'}} />)}
    </div>
  );
};

const MessageBubble: React.FC<{text: string; f: number; delay: number; y: number}> = ({text, f, delay, y}) => (
  <div style={{position: 'absolute', right: 70, top: y, width: 430, padding: '18px 24px', borderRadius: 18, background: '#fff', border: `3px solid ${C.line}`, boxShadow: '0 18px 40px rgba(16,32,39,.12)', fontSize: 25, fontWeight: 850, color: C.ink, opacity: fade(f, delay, delay + 16), transform: `translateX(${(1 - pop(f, delay)) * 60}px)`}}>{text}</div>
);

const Engineer: React.FC<{f: number}> = ({f}) => {
  const eat = Math.sin(easeIn(f, 40, 132) * Math.PI * 5);
  return (
    <div style={{position: 'absolute', left: 430, top: 276, width: 260, height: 190, opacity: fade(f, 12, 28)}}>
      <div style={{position: 'absolute', left: 44, top: 0, width: 76, height: 76, borderRadius: 38, background: '#f0c7a2', border: `5px solid ${C.ink}`}} />
      <div style={{position: 'absolute', left: 28, top: 72, width: 112, height: 96, borderRadius: '30px 30px 12px 12px', background: C.blue, border: `5px solid ${C.ink}`}} />
      <div style={{position: 'absolute', left: 124, top: 98, width: 90, height: 16, borderRadius: 8, background: '#f0c7a2', border: `4px solid ${C.ink}`, transformOrigin: 'left center', transform: `rotate(${-20 - eat * 24}deg)`}} />
      <div style={{position: 'absolute', left: 190, top: 66 - Math.max(0, eat) * 16, width: 42, height: 42, borderRadius: 21, background: '#c9874d', border: '4px solid #9b5b2d'}} />
      <div style={{position: 'absolute', left: 0, bottom: 0, width: 245, height: 28, borderRadius: 8, background: C.ink}} />
      <div style={{position: 'absolute', left: 36, bottom: 25, width: 130, height: 72, borderRadius: '10px 10px 0 0', background: '#fff', border: `5px solid ${C.ink}`}} />
    </div>
  );
};

const Scene10: React.FC<{f: number}> = ({f}) => {
  const eaten = Math.min(5, Math.floor(easeIn(f, 26, 128) * 5));
  return (
    <SceneShell>
      <Title eyebrow="Budget + next step">Visible work, visible retainer.</Title>
      <div style={{display: 'grid', gridTemplateColumns: '780px 1fr', gap: 72, marginTop: 70, alignItems: 'center'}}>
        <div style={{position: 'relative', height: 540, borderRadius: 18, background: C.cream, border: `3px solid ${C.line}`}}>
          <div style={{position: 'absolute', left: 60, top: 58, fontSize: 37, fontWeight: 950, color: C.ink}}>10 cookies = 10-hour initial bundle</div>
          {Array.from({length: 10}).map((_, i) => (
            <Cookie key={i} x={90 + (i % 5) * 92} y={160 + Math.floor(i / 5) * 95} eaten={i < eaten} delay={36 + i * 18} f={f} />
          ))}
          <Engineer f={f} />
          <div style={{position: 'absolute', left: 76, bottom: 64, width: 260, height: 110, borderRadius: '0 0 130px 130px', background: '#fff', border: `6px solid ${C.line}`}} />
          <div style={{position: 'absolute', left: 630, bottom: 76, fontSize: 70, opacity: fade(f, 142, 160)}}>☎</div>
          <div style={{position: 'absolute', left: 505, top: 380, width: 230, padding: '14px 18px', borderRadius: 18, background: '#fff', border: `3px solid ${C.line}`, fontSize: 24, lineHeight: 1.08, fontWeight: 950, color: C.rust, opacity: fade(f, 146, 164)}}>Cookies are getting low.</div>
        </div>
        <div style={{position: 'relative', height: 540}}>
          {[
            'Reviewed current site',
            'Built first look option',
            'Checked page titles',
            'Found unused tool',
            'Prepared next pass',
          ].map((text, i) => <MessageBubble key={text} text={text} f={f} delay={48 + i * 20} y={30 + i * 82} />)}
          <div style={{position: 'absolute', right: 70, bottom: 28, fontSize: 42, fontWeight: 950, color: C.ink, opacity: fade(f, 158, 176)}}>Send the link.<br />Get the first pass.</div>
          <div style={{position: 'absolute', right: 70, bottom: 0, fontSize: 25, fontWeight: 850, color: C.green, opacity: fade(f, 166, 184)}}>hello@web-by-elie.com</div>
        </div>
      </div>
    </SceneShell>
  );
};

export const WebByElieExplainer: React.FC = () => {
  const frame = useCurrentFrame();
  const scenes = [Scene1, Scene2, Scene3, Scene4, Scene5, Scene6, Scene7, Scene8, Scene9, Scene10];
  const index = sceneStarts.findLastIndex((start) => frame >= start);
  const Scene = scenes[index] || Scene1;
  const f = sceneFrame(frame, index);
  const leaving = frame - sceneStarts[index] > sceneDuration - 24 && index < scenes.length - 1;
  const o = leaving ? interpolate(frame - sceneStarts[index], [sceneDuration - 24, sceneDuration], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 1;
  return (
    <AbsoluteFill style={{background: C.paper}}>
      <div style={{opacity: o}}>
        <Scene f={f} />
      </div>
    </AbsoluteFill>
  );
};
