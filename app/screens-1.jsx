// VenKon AI Sense — Home + Guidance screens

// ─── App shell wrapper ───────────────────────────────────────────────
function AppShell({ children, confidence = 'high', tweaks, dataLabel }) {
  return (
    <div className={`app confidence-${confidence} ${tweaks?.contrast === 'high' ? 'hc' : ''}`}
         data-screen-label={dataLabel}>
      <div className="app-content">
        {children}
      </div>
    </div>
  );
}

// ─── Top journey header (used by several screens) ────────────────────
function JourneyHeader({ tweaks, route = 'Mumbai CST → Pune Jn', coach = 'S3', time = '14:32', hindi = 'मुंबई → पुणे · कोच एस-3' }) {
  const hindi_on = tweaks?.language === 'hindi' || tweaks?.language === 'both';
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4, gap: 12 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="t-caption" style={{ marginBottom: 4 }}>Current journey</div>
        <div className="t-h2" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{route}</div>
        {hindi_on && <div className="t-hindi muted" style={{ fontSize: 14, marginTop: 2 }}>{hindi}</div>}
      </div>
      <div className="chip" aria-label="Coach and time">
        {Icon.train({ s: 14 })}
        <span style={{ fontWeight: 600 }}>Coach {coach}</span>
        <span className="dim" style={{ marginLeft: 4 }}>{time}</span>
      </div>
    </div>
  );
}

// ─── Status chip (Listening / Scanning / Guidance Active / Low Confidence) ───
function StatusChip({ state = 'idle', tweaks }) {
  const map = {
    idle:      { cls: 'chip',        label: 'Tap to listen',         icon: Icon.mic({s:14}) },
    listening: { cls: 'chip listen', label: 'Listening',              icon: Icon.mic({s:14}) },
    scanning:  { cls: 'chip scan',   label: 'Scanning surroundings',  icon: Icon.camera({s:14}) },
    guidance:  { cls: 'chip live',   label: 'Guidance active',        icon: Icon.sparkle({s:14}) },
    low:       { cls: 'chip uncertain', label: 'Low confidence · staying silent', icon: Icon.warning({s:14}) },
  };
  const m = map[state] || map.idle;
  return (
    <div className={m.cls} role="status" aria-live="polite">
      <span className="dot"/>
      {m.icon}
      <span>{m.label}</span>
    </div>
  );
}

// ─── Bottom nav dock — used on Home only ─────────────────────────────
function BottomDock({ active = 'home', go }) {
  const items = [
    { id: 'home',    label: 'Sense',     icon: Icon.mic({s:22}) },
    { id: 'announce',label: 'Announce',  icon: Icon.ear({s:22}) },
    { id: 'shake',   label: 'Shake',     icon: Icon.shake({s:22}) },
    { id: 'memory',  label: 'Memory',    icon: Icon.brain({s:22}) },
    { id: 'privacy', label: 'Privacy',   icon: Icon.shield({s:22}) },
  ];
  return (
    <div className="glass" style={{
      display: 'flex', justifyContent: 'space-between', padding: '10px 8px',
      borderRadius: 24, marginTop: 12,
    }}>
      {items.map(it => (
        <button key={it.id} onClick={() => go?.(it.id)}
          style={{
            flex: 1, background: 'transparent', border: 0, color: it.id === active ? 'var(--text-primary)' : 'var(--text-tertiary)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '10px 6px',
            borderRadius: 16,
            fontFamily: 'inherit',
            cursor: 'pointer',
            position: 'relative',
            transition: 'color 0.15s',
          }}>
          {it.id === active && (
            <span style={{ position: 'absolute', top: 4, width: 24, height: 3, borderRadius: 2, background: 'var(--c-high)' }}/>
          )}
          {it.icon}
          <span style={{ fontSize: 11, fontWeight: 500 }}>{it.label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── HOME SCREEN ─────────────────────────────────────────────────────
function HomeScreen({ tweaks, go, state = 'idle' }) {
  const confidence = tweaks?.confidence || 'high';
  const viz = tweaks?.viz || 'orb';
  const hindi = tweaks?.language === 'hindi' || tweaks?.language === 'both';

  // map confidence to orb mode
  const orbConfidence = state === 'guidance' ? confidence : 'listen';

  return (
    <AppShell confidence={confidence} tweaks={tweaks} dataLabel="01 Home">
      <JourneyHeader tweaks={tweaks}/>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, position: 'relative' }}>
        <button onClick={() => go?.('guidance')} aria-label="Tap to listen"
          style={{ background:'transparent', border:0, padding:0, cursor:'pointer' }}>
          <VoiceOrb confidence={orbConfidence} viz={viz} active={true} size={240}/>
        </button>

        <div style={{ textAlign: 'center', padding: '0 8px' }}>
          <div className="t-title" style={{ marginBottom: 8 }}>Tap or say "Sense"</div>
          <div className="muted t-body" style={{ maxWidth: 280, margin: '0 auto' }}>
            I'll guide you with voice. I stay quiet when I'm not sure.
          </div>
          {hindi && (
            <div className="t-hindi dim" style={{ fontSize: 15, marginTop: 10 }}>
              "सेन्स" बोलिए या टैप कीजिए
            </div>
          )}
        </div>

        <StatusChip state={state} tweaks={tweaks}/>
      </div>

      {/* Primary CTAs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 4 }}>
        <button className="btn solid btn-full huge" onClick={() => go?.('guidance')}>
          {Icon.play({s:22})} Start guidance
        </button>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn glass large" style={{ flex: 1 }} onClick={() => go?.('newjourney')}>
            {Icon.refresh({s:20})} New journey
          </button>
          <button className="btn danger large" style={{ flex: 1 }}>
            {Icon.stop({s:20})} Stop
          </button>
        </div>
      </div>

      <BottomDock active="home" go={go}/>
    </AppShell>
  );
}

// ─── GUIDANCE SCREEN (real-time) ─────────────────────────────────────
function GuidanceScreen({ tweaks, go }) {
  const confidence = tweaks?.confidence || 'high';
  const motion = tweaks?.motion || 'moving';
  const hindi = tweaks?.language === 'hindi' || tweaks?.language === 'both';

  // tag color matches confidence
  const corner = confidence === 'high' ? 'rgba(107,227,162,0.8)'
              : confidence === 'med' ? 'rgba(245,196,74,0.8)'
              : 'rgba(255,111,111,0.7)';
  const scanColor = confidence === 'high' ? 'rgba(107,227,162,0.16)'
                 : confidence === 'med' ? 'rgba(245,196,74,0.14)'
                 : 'rgba(255,111,111,0.12)';

  const utterance = {
    high: { en: 'Coach S3 detected. Door slightly to your right, four steps.', hi: 'कोच एस-3 मिला। दरवाज़ा थोड़ा दायें, चार कदम।' },
    med:  { en: 'Possibly a doorway ahead. I\'m not fully sure.', hi: 'शायद आगे एक दरवाज़ा है। पूरा यकीन नहीं है।' },
    low:  { en: 'I can\'t see clearly. Hold the camera steady.', hi: 'मुझे साफ़ नहीं दिख रहा। कैमरा स्थिर रखिए।' },
  }[confidence];

  return (
    <AppShell confidence={confidence} tweaks={tweaks} dataLabel="02 Guidance">

      {/* top status row */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
        <button onClick={() => go?.('home')} className="btn glass"
          style={{ padding: 10, borderRadius: 14, minWidth: 44, minHeight: 44 }} aria-label="Back">
          {Icon.chev({s:18, style: {transform:'rotate(180deg)'}})}
        </button>
        <div className="chip" style={{ background: 'rgba(158, 182, 255, 0.10)', borderColor: 'rgba(158, 182, 255, 0.25)' }}>
          {Icon.train({s:14, style:{color:'var(--a-motion)'}})}
          <span style={{ color: 'var(--a-motion)' }}>{motion === 'moving' ? 'Train moving' : 'Train stopped'}</span>
          {motion === 'moving' && <span className="dim t-mono" style={{ marginLeft: 4 }}>42 km/h</span>}
        </div>
        <div style={{ flex: 1 }}/>
        <StatusChip state={confidence === 'low' ? 'low' : 'guidance'} tweaks={tweaks}/>
      </div>

      {/* viewfinder */}
      <div className="viewfinder" style={{ '--vf-corner': corner, '--scan-color': scanColor }}>
        <div className="vf-bg"/>
        <div className="vf-figures"/>
        <div className="vf-grid"/>
        <div className="vf-scanline"/>
        <div className="vf-corners"><i/></div>

        {/* Confidence pill top-center */}
        <div style={{ position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)' }}>
          <div className="chip" style={{ background: 'rgba(8,14,24,0.85)', borderColor: corner, color: corner }}>
            <span className="dot" style={{ background: corner, boxShadow: `0 0 8px ${corner}` }}/>
            <span style={{ fontWeight: 600 }}>{confLabel(confidence)}</span>
          </div>
        </div>

        {/* Detected object tags (only when not low) */}
        {confidence !== 'low' && (
          <>
            <div className="vf-tag" style={{ top: '20%', left: '8%' }}>
              {Icon.door({s:14})}
              <span>{confidence === 'med' ? 'Possibly door' : 'Door · right'}</span>
            </div>
            <div className="vf-tag" style={{ top: '54%', right: '12%', borderStyle: confidence === 'med' ? 'dashed' : 'solid' }}>
              {Icon.people({s:14})}
              <span>Crowded area</span>
            </div>
            <div className="vf-tag" style={{ bottom: '20%', left: '14%', borderStyle: confidence === 'med' ? 'dashed' : 'solid' }}>
              {Icon.seat({s:14})}
              <span>Seat row · left</span>
            </div>
          </>
        )}
        {confidence === 'low' && (
          <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div className="glass" style={{ padding: '20px 24px', maxWidth: 260, textAlign: 'center', borderColor: 'rgba(255,111,111,0.4)' }}>
              <div style={{ color: 'var(--c-low)', marginBottom: 8, display:'flex', justifyContent:'center' }}>{Icon.warning({s:28})}</div>
              <div className="t-h2" style={{ marginBottom: 6 }}>Holding silent</div>
              <div className="muted t-body" style={{ fontSize: 14 }}>I'm not confident enough to speak. Move the camera slowly.</div>
            </div>
          </div>
        )}

        {/* OCR coach label (small chip at bottom of viewfinder) */}
        {confidence === 'high' && (
          <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16, display:'flex', justifyContent:'center' }}>
            <div className="glass" style={{ padding: '10px 16px', borderRadius: 18, display: 'inline-flex', gap: 8, alignItems: 'center' }}>
              {Icon.type({s:16, style:{color:'var(--c-high)'}})}
              <span className="t-mono" style={{ fontSize: 13, color: 'var(--c-high)' }}>OCR · "COACH S-3"</span>
            </div>
          </div>
        )}
      </div>

      {/* AI utterance card */}
      <div className="glass glass-elev" style={{ marginTop: 14, padding: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #c8b8ff, #6a4fff)',
            display:'flex', alignItems:'center', justifyContent:'center',
            color:'#fff', fontWeight: 700, fontSize: 13, letterSpacing: 0.5,
          }}>AI</div>
          <div style={{ flex: 1 }}>
            <div className="t-caption">AI guide</div>
            <div style={{ color: confColor(confidence), fontSize: 12, fontWeight: 600, letterSpacing: 0.04 + 'em' }}>
              {confidence === 'high' ? 'SPEAKING NOW' : confidence === 'med' ? 'UNCERTAIN' : 'SILENT'}
            </div>
          </div>
          {confidence !== 'low' && (
            <div style={{ color: confColor(confidence) }}>
              <VoiceWave color={confColor(confidence)} n={6} height={32}/>
            </div>
          )}
        </div>
        <div className="t-body-l" style={{ lineHeight: 1.35 }}>
          {confidence === 'low' ? <span className="dim">— silent —</span> : utterance.en}
        </div>
        {hindi && confidence !== 'low' && (
          <div className="t-hindi muted" style={{ fontSize: 16, marginTop: 8 }}>{utterance.hi}</div>
        )}
      </div>

      {/* Bottom: emergency stop */}
      <button className="btn danger huge btn-full" style={{ marginTop: 10 }}>
        {Icon.pause({s:22})} Pause guidance
      </button>
    </AppShell>
  );
}

Object.assign(window, { AppShell, JourneyHeader, StatusChip, BottomDock, HomeScreen, GuidanceScreen });
