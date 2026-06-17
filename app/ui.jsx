// VenKon AI Sense — shared utilities, icons, voice visualizations

// ─── Icons ───────────────────────────────────────────────────────────
const Icon = {
  mic:   (p={}) => <svg viewBox="0 0 24 24" width={p.s||22} height={p.s||22} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>,
  ear:   (p={}) => <svg viewBox="0 0 24 24" width={p.s||22} height={p.s||22} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 9a6 6 0 1 1 12 0c0 3-2 4-3 5s-1 3-3 3-2-1.5-3-2.5"/><path d="M9 11a3 3 0 0 1 6 0c0 1.5-1 2-2 2.5"/></svg>,
  camera:(p={}) => <svg viewBox="0 0 24 24" width={p.s||22} height={p.s||22} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 8h3l2-2h4l2 2h3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z"/><circle cx="12" cy="13" r="3.5"/></svg>,
  shake: (p={}) => <svg viewBox="0 0 24 24" width={p.s||22} height={p.s||22} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="8" y="3" width="8" height="18" rx="2"/><path d="M3 9l1.5 3L3 15M21 9l-1.5 3L21 15"/></svg>,
  brain: (p={}) => <svg viewBox="0 0 24 24" width={p.s||22} height={p.s||22} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 3a3 3 0 0 0-3 3v0a3 3 0 0 0-3 3v0a3 3 0 0 0 3 3v0a3 3 0 0 0 3 3v0a3 3 0 0 0 3-3v-9z"/><path d="M15 3a3 3 0 0 1 3 3v0a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3v0a3 3 0 0 1-3 3v0a3 3 0 0 1-3-3v-9z"/></svg>,
  shield:(p={}) => <svg viewBox="0 0 24 24" width={p.s||22} height={p.s||22} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"/><path d="M9 12l2.2 2.2L15 10.4"/></svg>,
  pause: (p={}) => <svg viewBox="0 0 24 24" width={p.s||22} height={p.s||22} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M9 5v14M15 5v14"/></svg>,
  stop:  (p={}) => <svg viewBox="0 0 24 24" width={p.s||22} height={p.s||22} fill="currentColor" {...p}><rect x="6" y="6" width="12" height="12" rx="2"/></svg>,
  play:  (p={}) => <svg viewBox="0 0 24 24" width={p.s||22} height={p.s||22} fill="currentColor" {...p}><path d="M7 5v14l12-7-12-7z"/></svg>,
  refresh:(p={})=> <svg viewBox="0 0 24 24" width={p.s||22} height={p.s||22} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 12a9 9 0 0 1 15.5-6.3L21 8M21 4v4h-4M21 12a9 9 0 0 1-15.5 6.3L3 16M3 20v-4h4"/></svg>,
  arrow: (p={}) => <svg viewBox="0 0 24 24" width={p.s||22} height={p.s||22} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  chev:  (p={}) => <svg viewBox="0 0 24 24" width={p.s||16} height={p.s||16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 6l6 6-6 6"/></svg>,
  train: (p={}) => <svg viewBox="0 0 24 24" width={p.s||22} height={p.s||22} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="6" y="3" width="12" height="14" rx="3"/><path d="M6 11h12M9 7h6M8 21l2-3M16 21l-2-3"/><circle cx="9" cy="14" r=".7" fill="currentColor"/><circle cx="15" cy="14" r=".7" fill="currentColor"/></svg>,
  door:  (p={}) => <svg viewBox="0 0 24 24" width={p.s||22} height={p.s||22} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="6" y="3" width="12" height="18" rx="1"/><circle cx="14" cy="12" r="1" fill="currentColor"/></svg>,
  people:(p={}) => <svg viewBox="0 0 24 24" width={p.s||22} height={p.s||22} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.5"/><path d="M14 20a5 5 0 0 1 7 0"/></svg>,
  seat:  (p={}) => <svg viewBox="0 0 24 24" width={p.s||22} height={p.s||22} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 10v7M20 10v7M4 17h16M7 10V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v5"/></svg>,
  haptic:(p={}) => <svg viewBox="0 0 24 24" width={p.s||22} height={p.s||22} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v2M12 19v2M5 12H3M21 12h-2M6 6l1.4 1.4M16.6 16.6L18 18M18 6l-1.4 1.4M7.4 16.6L6 18"/><circle cx="12" cy="12" r="4"/></svg>,
  type:  (p={}) => <svg viewBox="0 0 24 24" width={p.s||22} height={p.s||22} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 7V5h14v2M9 19h6M12 5v14"/></svg>,
  lock:  (p={}) => <svg viewBox="0 0 24 24" width={p.s||22} height={p.s||22} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>,
  cpu:   (p={}) => <svg viewBox="0 0 24 24" width={p.s||22} height={p.s||22} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="6" y="6" width="12" height="12" rx="2"/><rect x="10" y="10" width="4" height="4"/><path d="M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2"/></svg>,
  nostore:(p={}) => <svg viewBox="0 0 24 24" width={p.s||22} height={p.s||22} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="9"/><path d="M5 5l14 14"/></svg>,
  globe: (p={}) => <svg viewBox="0 0 24 24" width={p.s||22} height={p.s||22} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>,
  warning:(p={})=> <svg viewBox="0 0 24 24" width={p.s||22} height={p.s||22} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3l10 18H2L12 3z"/><path d="M12 10v5M12 18v.5"/></svg>,
  check: (p={}) => <svg viewBox="0 0 24 24" width={p.s||22} height={p.s||22} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12.5l4 4L19 7"/></svg>,
  sparkle:(p={})=> <svg viewBox="0 0 24 24" width={p.s||22} height={p.s||22} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3z"/><path d="M19 16l.9 2 2 .9-2 .9L19 22l-.9-2-2-.9 2-.9L19 16z"/></svg>,
  close: (p={}) => <svg viewBox="0 0 24 24" width={p.s||22} height={p.s||22} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M6 6l12 12M18 6L6 18"/></svg>,
  settings:(p={})=>(<svg viewBox="0 0 24 24" width={p.s||22} height={p.s||22} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>),
};

// ─── Voice visualizations ────────────────────────────────────────────
function VoiceOrb({ confidence = 'high', viz = 'orb', active = true, size = 240 }) {
  const colors = {
    high: { c1: '#3df0a3', c2: '#5dd9c4', glow: 'rgba(107, 227, 162, 0.45)' },
    med:  { c1: '#f5c44a', c2: '#ff9d4a', glow: 'rgba(245, 196, 74, 0.45)' },
    low:  { c1: '#ff6f6f', c2: '#ff8aa0', glow: 'rgba(255, 111, 111, 0.45)' },
    listen: { c1: '#7BD9F5', c2: '#8a7cff', glow: 'rgba(123, 217, 245, 0.5)' },
  };
  const c = colors[confidence] || colors.listen;
  const orbStyle = { '--orb-c1': c.c1, '--orb-c2': c.c2, '--orb-glow': c.glow };

  if (viz === 'ripple') {
    return (
      <div className="ripple-stage" style={{...orbStyle, width: size, height: size}}>
        <div className="ripple"/>
        <div className="ripple r2"/>
        <div className="ripple r3"/>
        <div className="orb" style={{ width: size*0.45, height: size*0.45, animation: active ? undefined : 'none' }}/>
      </div>
    );
  }

  if (viz === 'wave') {
    return (
      <div className="orb-stage" style={{...orbStyle, width: size, height: size}}>
        <div className="orb" style={{ width: size*0.65, height: size*0.65 }}/>
        <div className="bars" style={{ position: 'absolute', height: size*0.4, color: c.c1, gap: 6 }}>
          {[40, 80, 100, 60, 90, 50, 70].map((h,i) => (
            <span key={i} style={{ width: 5, animationDelay: `${i*0.12}s`, height: '60%' }}/>
          ))}
        </div>
      </div>
    );
  }

  if (viz === 'particles') {
    return (
      <div className="orb-stage" style={{...orbStyle, width: size, height: size}}>
        <div className="orb" style={{ width: size*0.6, height: size*0.6 }}/>
        <div className="particles">
          {Array.from({length: 14}).map((_,i)=>{
            const angle = (i / 14) * Math.PI * 2;
            const r = 90 + (i % 3) * 18;
            const x = 50 + Math.cos(angle) * (r/240*50);
            const y = 50 + Math.sin(angle) * (r/240*50);
            const dx = Math.cos(angle) * 8;
            const dy = Math.sin(angle) * 8;
            return <span key={i} style={{
              left: `${x}%`, top: `${y}%`,
              '--dx': `${dx}px`, '--dy': `${dy}px`,
              animationDelay: `${i*0.4}s`,
              width: 3 + (i%3), height: 3 + (i%3),
            }}/>;
          })}
        </div>
      </div>
    );
  }

  // default: orb with breathing rings
  return (
    <div className="orb-stage" style={{...orbStyle, width: size, height: size}}>
      <div className="orb-ring"/>
      <div className="orb-ring r2"/>
      <div className="orb-ring r3"/>
      <div className="orb"/>
    </div>
  );
}

// Small ear icon waveform used as inline AI activity indicator
function VoiceWave({ color = 'currentColor', n = 5, height = 36 }) {
  return (
    <div className="voice-wave" style={{ color, height }}>
      {Array.from({length: n}).map((_,i) => (
        <span key={i} style={{
          height: `${30 + (i%3)*25}%`,
          animationDelay: `${i*0.12}s`,
        }}/>
      ))}
    </div>
  );
}

// confidence color helper
function confColor(c) {
  return c === 'high' ? 'var(--c-high)' : c === 'med' ? 'var(--c-med)' : 'var(--c-low)';
}
function confLabel(c) {
  return c === 'high' ? 'Confident' : c === 'med' ? 'Uncertain' : 'Unable to detect';
}

Object.assign(window, { Icon, VoiceOrb, VoiceWave, confColor, confLabel });
