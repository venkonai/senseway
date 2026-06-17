// VenKon AI Sense — Announcement, Shake, Memory, Privacy, NewJourney, Onboarding

// ─── Back header used by sub-screens ─────────────────────────────────
function SubHeader({ title, back, hindi, tweaks, accent = 'var(--text-primary)', subtitle }) {
  const showHindi = (tweaks?.language === 'hindi' || tweaks?.language === 'both') && hindi;
  return (
    <div style={{ display:'flex', alignItems:'center', gap: 12, marginBottom: 16 }}>
      {back && (
        <button onClick={back} className="btn glass"
          style={{ padding: 10, borderRadius: 14, minWidth: 44, minHeight: 44 }} aria-label="Back">
          {Icon.chev({s:18, style:{transform:'rotate(180deg)'}})}
        </button>
      )}
      <div style={{ flex:1, minWidth:0 }}>
        <div className="t-title" style={{ color: accent }}>{title}</div>
        {subtitle && <div className="muted" style={{ fontSize: 14, marginTop: 2 }}>{subtitle}</div>}
        {showHindi && <div className="t-hindi dim" style={{ fontSize: 14, marginTop: 2 }}>{hindi}</div>}
      </div>
    </div>
  );
}

// ─── ANNOUNCEMENT SCREEN ─────────────────────────────────────────────
function AnnouncementScreen({ tweaks, go }) {
  const confidence = tweaks?.confidence || 'high';
  const hindi = tweaks?.language === 'hindi' || tweaks?.language === 'both';

  return (
    <AppShell confidence={confidence} tweaks={tweaks} dataLabel="03 Announcement">
      <SubHeader title="Announcement" subtitle="Captured from the station PA" back={() => go?.('home')} tweaks={tweaks}/>

      {/* live capture indicator */}
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom: 14 }}>
        <div className="chip listen">
          <span className="dot"/>
          {Icon.ear({s:14})}
          <span>Capturing audio</span>
        </div>
        <div className="dim t-mono" style={{ fontSize: 12 }}>0:08 elapsed</div>
        <div style={{ flex: 1 }}/>
        <div style={{ color: 'var(--a-listen)' }}>
          <VoiceWave color="var(--a-listen)" n={5} height={24}/>
        </div>
      </div>

      {/* Raw transcript */}
      <div className="glass" style={{ padding: 18 }}>
        <div className="t-caption" style={{ marginBottom: 8 }}>Live transcription</div>
        <div className="t-body" style={{ lineHeight: 1.45 }}>
          <span className="dim">"…</span>
          Train number <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>one two seven two three</span>,
          Hyderabad Express, is arriving on <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>platform four</span>.
          Passengers are requested to…<span className="dim">"</span>
        </div>
        {hindi && (
          <div className="t-hindi muted" style={{ fontSize: 15, marginTop: 12, lineHeight: 1.5 }}>
            "गाड़ी संख्या एक दो सात दो तीन, हैदराबाद एक्सप्रेस, प्लेटफ़ार्म नंबर चार पर आ रही है…"
          </div>
        )}
      </div>

      {/* Arrow / sparkle separator */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', margin: '14px 0', gap: 8, color: 'var(--a-ai)' }}>
        {Icon.sparkle({s:16})}
        <span className="t-caption" style={{ color: 'var(--a-ai)' }}>Simplified by Sense</span>
        {Icon.sparkle({s:16})}
      </div>

      {/* Simplified output (hero card) */}
      <div className="glass glass-elev" style={{
        padding: 22,
        background: 'linear-gradient(160deg, rgba(184,160,255,0.10), rgba(123,217,245,0.06))',
        borderColor: 'rgba(184,160,255,0.25)',
      }}>
        <div className="t-display" style={{ fontWeight: 500, lineHeight: 1.1 }}>
          Your train is arriving at <span style={{ color: 'var(--a-listen)' }}>platform 4</span>.
        </div>
        {hindi && (
          <div className="t-hindi muted" style={{ fontSize: 22, marginTop: 12, lineHeight: 1.3 }}>
            आपकी ट्रेन प्लेटफ़ॉर्म <span style={{ color: 'var(--a-listen)' }}>चार</span> पर आ रही है।
          </div>
        )}

        <div style={{ display:'flex', gap:8, marginTop: 18, flexWrap: 'wrap' }}>
          <div className="chip"><span className="dot" style={{ background:'var(--c-high)' }}/>Platform 4</div>
          <div className="chip">Train 12723</div>
          <div className="chip">Arriving now</div>
        </div>
      </div>

      <div style={{ flex: 1 }}/>

      <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
        <button className="btn solid huge" style={{ flex: 2 }}>
          {Icon.play({s:22})} Replay voice
        </button>
        <button className="btn glass huge" style={{ flex: 1 }} aria-label="Dismiss">
          {Icon.close({s:22})}
        </button>
      </div>
    </AppShell>
  );
}

// ─── SHAKE-TO-DESCRIBE SCREEN ────────────────────────────────────────
function ShakeScreen({ tweaks, go }) {
  const confidence = tweaks?.confidence || 'high';
  const hindi = tweaks?.language === 'hindi' || tweaks?.language === 'both';

  const results = [
    { time: 'just now', text: 'Crowded coach detected — about eight people standing.',     hi: 'भीड़भाड़ वाला कोच मिला — लगभग आठ लोग खड़े हैं।',     conf: 'high' },
    { time: '12s ago',  text: 'Possibly a doorway two steps ahead.',                       hi: 'शायद दो कदम आगे एक दरवाज़ा है।',                 conf: 'med' },
    { time: '34s ago',  text: 'No clear path ahead — I\'ll stay quiet.',                   hi: 'आगे साफ़ रास्ता नहीं — मैं चुप रहूंगा।',           conf: 'low' },
    { time: '1m ago',   text: 'Seat row detected on your left.',                           hi: 'आपके बायें तरफ़ सीट की कतार।',                    conf: 'high' },
  ];

  return (
    <AppShell confidence={confidence} tweaks={tweaks} dataLabel="04 Shake">
      <SubHeader title="Shake to describe" subtitle="Quick scene description, anywhere" hindi="हिला कर पूछिए" back={() => go?.('home')} tweaks={tweaks}/>

      {/* shake illustration */}
      <div style={{
        position: 'relative',
        background: 'radial-gradient(ellipse at 50% 40%, rgba(123,217,245,0.10), transparent 60%)',
        borderRadius: 'var(--r-lg)',
        padding: '24px 16px 28px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        border: '1px solid var(--border-soft)',
        marginBottom: 16,
      }}>
        <div className="phone-shake" style={{ position: 'relative', display:'flex', alignItems:'center', justifyContent:'center' }}>
          {/* tiny phone */}
          <div style={{
            width: 88, height: 156, borderRadius: 20,
            background: 'linear-gradient(180deg, #1a2236, #0c1422)',
            border: '1.5px solid var(--border-mid)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.35)',
            position: 'relative',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <div style={{
              position: 'absolute', top: 6, left: '50%', transform:'translateX(-50%)',
              width: 32, height: 8, borderRadius: 4, background: '#000',
            }}/>
            <div style={{ color: 'var(--c-high)' }}>
              {Icon.sparkle({s:24})}
            </div>
          </div>
          {/* motion arcs */}
          <svg viewBox="0 0 200 160" width="200" height="160" style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
            <path d="M30 80 Q 50 30 80 30" stroke="rgba(123,217,245,0.5)" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M170 80 Q 150 30 120 30" stroke="rgba(123,217,245,0.5)" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M30 80 Q 50 130 80 130" stroke="rgba(123,217,245,0.3)" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M170 80 Q 150 130 120 130" stroke="rgba(123,217,245,0.3)" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="t-h2" style={{ marginTop: 18 }}>Shake your phone</div>
        <div className="muted t-body" style={{ fontSize: 15, marginTop: 4, textAlign:'center', maxWidth: 260 }}>
          A quick shake captures a single frame and tells you what's around.
        </div>
        <div className="chip" style={{ marginTop: 14, fontSize: 12 }}>
          {Icon.haptic({s:14})} <span>Haptic confirms capture</span>
        </div>
      </div>

      {/* result history */}
      <div className="t-caption" style={{ marginBottom: 8 }}>Recent shakes</div>
      <div className="glass" style={{ overflow: 'hidden', flex: 1, display:'flex', flexDirection:'column' }}>
        {results.map((r, i) => (
          <div key={i} className="row" style={{ alignItems: 'flex-start' }}>
            <div className="icon-box" style={{
              borderColor: r.conf === 'high' ? 'rgba(107,227,162,0.4)' : r.conf === 'med' ? 'rgba(245,196,74,0.4)' : 'rgba(255,111,111,0.4)',
              color: confColor(r.conf),
            }}>
              {r.conf === 'high' ? Icon.check({s:18}) : r.conf === 'med' ? Icon.warning({s:18}) : Icon.close({s:18})}
            </div>
            <div className="meta">
              <div className="title" style={{ fontSize: 15, lineHeight: 1.35 }}>{r.text}</div>
              {hindi && <div className="t-hindi" style={{ fontSize: 13, color: 'var(--text-tertiary)', marginTop: 4 }}>{r.hi}</div>}
              <div className="sub" style={{ marginTop: 6, color: confColor(r.conf), fontWeight: 600, letterSpacing: 0.04+'em', textTransform:'uppercase', fontSize: 11 }}>
                {r.time} · {confLabel(r.conf)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

// ─── MEMORY SCREEN ───────────────────────────────────────────────────
function MemoryScreen({ tweaks, go }) {
  const confidence = tweaks?.confidence || 'high';

  // surrounding nodes positioned by angle/radius
  const nodes = [
    { label: 'Door',         icon: Icon.door({s:14}),   conf: 'high', angle: -60, radius: 40 },
    { label: 'Seat row',     icon: Icon.seat({s:14}),   conf: 'high', angle: 150, radius: 36 },
    { label: 'Crowd',        icon: Icon.people({s:14}), conf: 'med',  angle: 30,  radius: 44 },
    { label: 'Coach board',  icon: Icon.type({s:14}),   conf: 'high', angle: -110,radius: 42 },
    { label: 'Window light', icon: Icon.sparkle({s:14}),conf: 'med',  angle: 100, radius: 38 },
  ];

  return (
    <AppShell confidence={confidence} tweaks={tweaks} dataLabel="05 Memory">
      <SubHeader title="Journey memory" subtitle="What Sense is currently aware of" hindi="यात्रा की स्मृति" back={() => go?.('home')} tweaks={tweaks}/>

      {/* journey meta strip */}
      <div style={{ display:'flex', gap:8, marginBottom: 14, flexWrap:'wrap' }}>
        <div className="chip live"><span className="dot"/>Live</div>
        <div className="chip">{Icon.train({s:14})}<span>Coach S3</span></div>
        <div className="chip">Northbound</div>
        <div className="chip">12m into journey</div>
      </div>

      {/* orbital memory map */}
      <div className="glass" style={{ padding: 16, marginBottom: 14 }}>
        <div className="mem-stage" style={{ height: 280 }}>
          <div className="mem-ring"/>
          <div className="mem-ring r2"/>
          <div className="mem-ring r3"/>

          {/* direction arrow */}
          <svg width="180" height="180" viewBox="0 0 180 180" style={{ position:'absolute' }}>
            <defs>
              <linearGradient id="dirGrad" x1="0" y1="100%" x2="0" y2="0">
                <stop offset="0%" stopColor="rgba(158,182,255,0)"/>
                <stop offset="100%" stopColor="rgba(158,182,255,0.7)"/>
              </linearGradient>
            </defs>
            <path d="M90 90 L130 30" stroke="url(#dirGrad)" strokeWidth="3" strokeLinecap="round"/>
            <path d="M130 30 L120 38 M130 30 L122 42" stroke="rgba(158,182,255,0.7)" strokeWidth="3" strokeLinecap="round" fill="none"/>
          </svg>

          {/* central "you" node */}
          <div className="mem-center">
            <div style={{ textAlign: 'center', lineHeight: 1 }}>
              <div style={{ fontSize: 9, opacity: 0.7 }}>YOU</div>
              <div style={{ fontSize: 11 }}>Coach S3</div>
            </div>
          </div>

          {/* surrounding nodes */}
          {nodes.map((n, i) => {
            const r = (n.angle) * Math.PI / 180;
            const x = 50 + Math.cos(r) * n.radius;
            const y = 50 + Math.sin(r) * n.radius;
            return (
              <div key={i} className="mem-node" style={{
                left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)',
                color: confColor(n.conf),
                borderColor: n.conf === 'high' ? 'rgba(107,227,162,0.35)' : 'rgba(245,196,74,0.35)',
              }}>
                {n.icon}<span style={{ color: 'var(--text-primary)' }}>{n.label}</span>
              </div>
            );
          })}
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', marginTop: 8, fontSize: 12 }} className="dim">
          <span>· · ·  3m radius</span>
          <span>Updated 1s ago</span>
        </div>
      </div>

      {/* observation log */}
      <div className="t-caption" style={{ marginBottom: 8 }}>Recent observations</div>
      <div className="glass" style={{ overflow:'hidden' }}>
        <div className="row">
          <div className="icon-box" style={{ color: 'var(--c-high)' }}>{Icon.type({s:18})}</div>
          <div className="meta">
            <div className="title" style={{ fontSize: 15 }}>OCR · "Coach S-3"</div>
            <div className="sub">8s ago · confident</div>
          </div>
          <div className="t-mono dim" style={{ fontSize: 11 }}>0.94</div>
        </div>
        <div className="row">
          <div className="icon-box" style={{ color: 'var(--c-high)' }}>{Icon.ear({s:18})}</div>
          <div className="meta">
            <div className="title" style={{ fontSize: 15 }}>Announcement · Platform 4</div>
            <div className="sub">2m ago · confident</div>
          </div>
          <div className="t-mono dim" style={{ fontSize: 11 }}>0.91</div>
        </div>
        <div className="row">
          <div className="icon-box" style={{ color: 'var(--c-med)' }}>{Icon.people({s:18})}</div>
          <div className="meta">
            <div className="title" style={{ fontSize: 15 }}>Crowd density · medium</div>
            <div className="sub">4m ago · uncertain</div>
          </div>
          <div className="t-mono dim" style={{ fontSize: 11 }}>0.58</div>
        </div>
      </div>

      <div style={{ flex: 1 }}/>
      <button className="btn glass btn-full large" style={{ marginTop: 14 }} onClick={() => go?.('newjourney')}>
        {Icon.refresh({s:20})} Reset scene memory
      </button>
    </AppShell>
  );
}

// ─── PRIVACY SCREEN ──────────────────────────────────────────────────
function PrivacyScreen({ tweaks, go }) {
  const confidence = tweaks?.confidence || 'high';
  const items = [
    { icon: Icon.cpu({s:22}),    title: 'All processing happens on-device',     sub: 'No frames leave your phone. The model runs in the Neural Engine.' },
    { icon: Icon.nostore({s:22}),title: 'No images stored',                      sub: 'Frames are discarded the instant a description is generated.' },
    { icon: Icon.lock({s:22}),   title: 'No account required',                   sub: 'Sense works fully offline. No login, no tracking.' },
    { icon: Icon.shield({s:22}), title: 'Silence is safer than a wrong answer', sub: 'Low-confidence detections never become spoken instructions.' },
  ];
  return (
    <AppShell confidence={confidence} tweaks={tweaks} dataLabel="06 Privacy">
      <SubHeader title="Privacy & safety" subtitle="The contract Sense keeps with you" hindi="गोपनीयता और सुरक्षा" back={() => go?.('home')} tweaks={tweaks}/>

      {/* hero shield card */}
      <div className="glass" style={{
        padding: 24, textAlign: 'center', marginBottom: 14,
        background: 'radial-gradient(ellipse at 50% 0%, rgba(107,227,162,0.15), transparent 70%)',
        borderColor: 'rgba(107,227,162,0.25)',
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%', margin: '0 auto 14px',
          background: 'radial-gradient(circle at 30% 30%, rgba(107,227,162,0.4), rgba(107,227,162,0.05))',
          border: '1px solid rgba(107,227,162,0.4)',
          display:'flex', alignItems:'center', justifyContent:'center',
          color: 'var(--c-high)',
        }}>
          {Icon.shield({s:34})}
        </div>
        <div className="t-title" style={{ marginBottom: 6 }}>Your surroundings stay yours</div>
        <div className="muted t-body" style={{ fontSize: 15 }}>
          Sense never uploads, stores, or remembers images.
        </div>

        {/* live counters */}
        <div style={{ display:'flex', gap:12, marginTop: 18, justifyContent:'center' }}>
          <div style={{ textAlign:'center' }}>
            <div className="t-mono" style={{ fontSize: 22, fontWeight: 500, color: 'var(--c-high)' }}>47,328</div>
            <div className="t-caption" style={{ fontSize: 10 }}>frames discarded today</div>
          </div>
          <div style={{ width: 1, background: 'var(--border-soft)' }}/>
          <div style={{ textAlign:'center' }}>
            <div className="t-mono" style={{ fontSize: 22, fontWeight: 500 }}>0</div>
            <div className="t-caption" style={{ fontSize: 10 }}>images saved, ever</div>
          </div>
        </div>
      </div>

      {/* trust list */}
      <div className="glass" style={{ overflow:'hidden' }}>
        {items.map((it, i) => (
          <div key={i} className="row" style={{ alignItems: 'flex-start' }}>
            <div className="icon-box" style={{ color: 'var(--c-high)' }}>{it.icon}</div>
            <div className="meta">
              <div className="title" style={{ fontSize: 15 }}>{it.title}</div>
              <div className="sub" style={{ marginTop: 4, lineHeight: 1.4 }}>{it.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }}/>
      <button className="btn glass btn-full large" style={{ marginTop: 14 }}>
        Read full privacy statement {Icon.chev({s:14})}
      </button>
    </AppShell>
  );
}

// ─── NEW JOURNEY (reset confirmation) ─────────────────────────────────
function NewJourneyScreen({ tweaks, go }) {
  const confidence = tweaks?.confidence || 'high';
  const hindi = tweaks?.language === 'hindi' || tweaks?.language === 'both';

  return (
    <AppShell confidence={confidence} tweaks={tweaks} dataLabel="07 New Journey">
      <SubHeader title="Start new journey?" subtitle="This clears scene memory" hindi="नई यात्रा शुरू करें?" back={() => go?.('home')} tweaks={tweaks}/>

      {/* current journey summary */}
      <div className="glass" style={{ padding: 18, marginBottom: 14 }}>
        <div className="t-caption" style={{ marginBottom: 10 }}>Current journey</div>
        <div style={{ display:'flex', alignItems:'center', gap: 14, marginBottom: 14 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14,
            background: 'linear-gradient(135deg, #4a80ff, #6a4fff)',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>{Icon.train({s:24})}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="t-h2">Mumbai CST → Pune Jn</div>
            <div className="muted" style={{ fontSize: 14 }}>Coach S3 · started 14:20</div>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap: 12, paddingTop: 14, borderTop: '1px solid var(--border-soft)' }}>
          <div>
            <div className="t-mono" style={{ fontSize: 22, fontWeight: 500 }}>12<span className="dim" style={{ fontSize: 14 }}>m</span></div>
            <div className="t-caption" style={{ fontSize: 10 }}>elapsed</div>
          </div>
          <div>
            <div className="t-mono" style={{ fontSize: 22, fontWeight: 500, color: 'var(--c-high)' }}>47</div>
            <div className="t-caption" style={{ fontSize: 10 }}>observations</div>
          </div>
          <div>
            <div className="t-mono" style={{ fontSize: 22, fontWeight: 500 }}>3</div>
            <div className="t-caption" style={{ fontSize: 10 }}>announcements</div>
          </div>
        </div>
      </div>

      {/* What gets cleared */}
      <div className="glass" style={{ padding: 18, marginBottom: 14, borderColor: 'rgba(245,196,74,0.25)' }}>
        <div style={{ display:'flex', alignItems:'center', gap: 10, marginBottom: 12 }}>
          <div style={{ color: 'var(--c-med)' }}>{Icon.warning({s:18})}</div>
          <div className="t-h2" style={{ fontSize: 17 }}>This will reset:</div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap: 10 }}>
          {['Scene memory · all detected objects', 'Coach context · "S3, northbound"', 'Captured announcements', 'Confidence baseline calibration'].map((t,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap: 10 }}>
              <span style={{ width: 6, height: 6, borderRadius:'50%', background: 'var(--text-tertiary)' }}/>
              <span className="t-body" style={{ fontSize: 15 }}>{t}</span>
            </div>
          ))}
        </div>
        <div className="muted" style={{ fontSize: 13, marginTop: 14, lineHeight: 1.5 }}>
          Privacy isn't affected — nothing was stored to begin with.
        </div>
      </div>

      <div style={{ flex: 1 }}/>

      <div style={{ display:'flex', flexDirection:'column', gap: 10 }}>
        <button className="btn solid huge btn-full" onClick={() => go?.('home')}>
          {Icon.refresh({s:22})} Yes, start fresh
        </button>
        <button className="btn glass large btn-full" onClick={() => go?.('home')}>
          Cancel
        </button>
        {hindi && <div className="t-hindi dim" style={{ textAlign:'center', marginTop: 4, fontSize: 13 }}>नई यात्रा शुरू करें या रद्द करें</div>}
      </div>
    </AppShell>
  );
}

// ─── ONBOARDING (3-slide intro) ──────────────────────────────────────
function OnboardingScreen({ tweaks, go }) {
  const [slide, setSlide] = React.useState(0);
  const slides = [
    {
      title: 'Voice first.',
      sub: 'No menus to read. Tap once or say "Sense" and ask anything about what\'s around you.',
      viz: <VoiceOrb confidence="listen" viz="orb" size={220}/>,
      color: 'var(--a-listen)',
    },
    {
      title: 'Confidence-aware.',
      sub: 'When Sense is sure, it speaks clearly. When it isn\'t, it stays silent — never a wrong direction.',
      viz: (
        <div style={{ display:'flex', gap: 16, alignItems:'center' }}>
          <div style={{ display:'flex', flexDirection:'column', gap: 12, alignItems:'flex-end' }}>
            <div className="chip confident"><span className="dot"/>Confident → spoken</div>
            <div className="chip uncertain"><span className="dot"/>Uncertain → "possibly…"</div>
            <div className="chip unsafe"><span className="dot"/>Unsafe → silent</div>
          </div>
        </div>
      ),
      color: 'var(--c-high)',
    },
    {
      title: 'Yours alone.',
      sub: 'Every frame is processed on-device and discarded instantly. Nothing leaves your phone. Ever.',
      viz: (
        <div style={{
          width: 180, height: 180, borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, rgba(107,227,162,0.35), rgba(107,227,162,0.02))',
          border: '1px solid rgba(107,227,162,0.4)',
          display:'flex', alignItems:'center', justifyContent:'center',
          color: 'var(--c-high)',
        }}>
          {Icon.shield({s:80})}
        </div>
      ),
      color: 'var(--c-high)',
    },
  ];
  const s = slides[slide];

  return (
    <AppShell confidence="high" tweaks={tweaks} dataLabel="08 Onboarding">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 8 }}>
        <div className="t-mono dim" style={{ fontSize: 12, letterSpacing: '0.06em' }}>SENSE · 0{slide+1} / 03</div>
        <button onClick={() => go?.('home')} className="btn glass" style={{ padding: '8px 14px', fontSize: 13 }}>Skip</button>
      </div>

      <div style={{ flex: 1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', gap: 28, padding: '20px 4px' }}>
        <div style={{ minHeight: 220, display:'flex', alignItems:'center', justifyContent:'center' }}>{s.viz}</div>
        <div>
          <div className="t-display" style={{ marginBottom: 14, color: s.color }}>{s.title}</div>
          <div className="muted t-body-l" style={{ maxWidth: 320, lineHeight: 1.45 }}>{s.sub}</div>
        </div>
      </div>

      {/* dots */}
      <div style={{ display:'flex', justifyContent:'center', gap: 8, marginBottom: 18 }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setSlide(i)} aria-label={`Slide ${i+1}`}
            style={{
              width: i === slide ? 28 : 8, height: 8, borderRadius: 4,
              background: i === slide ? 'var(--text-primary)' : 'var(--text-quaternary)',
              border: 0, padding: 0, transition: 'all 0.2s', cursor: 'pointer',
            }}/>
        ))}
      </div>

      <button className="btn solid huge btn-full" onClick={() => slide < 2 ? setSlide(slide+1) : go?.('home')}>
        {slide < 2 ? <>Continue {Icon.arrow({s:22})}</> : <>{Icon.check({s:22})} I'm ready</>}
      </button>
    </AppShell>
  );
}

Object.assign(window, { AnnouncementScreen, ShakeScreen, MemoryScreen, PrivacyScreen, NewJourneyScreen, OnboardingScreen });
