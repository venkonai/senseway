// VenKon AI Sense — Main app: canvas composition + tweaks panel

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "confidence": "high",
  "viz": "orb",
  "motion": "moving",
  "language": "english",
  "contrast": "normal"
}/*EDITMODE-END*/;

// Single iOS phone hosting a navigable flow
function Phone({ tweaks, initial = 'home', width = 360, height = 780 }) {
  const [screen, setScreen] = React.useState(initial);
  const go = (s) => setScreen(s);

  const screenEl = (() => {
    switch (screen) {
      case 'home':       return <HomeScreen tweaks={tweaks} go={go}/>;
      case 'guidance':   return <GuidanceScreen tweaks={tweaks} go={go}/>;
      case 'announce':   return <AnnouncementScreen tweaks={tweaks} go={go}/>;
      case 'shake':      return <ShakeScreen tweaks={tweaks} go={go}/>;
      case 'memory':     return <MemoryScreen tweaks={tweaks} go={go}/>;
      case 'privacy':    return <PrivacyScreen tweaks={tweaks} go={go}/>;
      case 'newjourney': return <NewJourneyScreen tweaks={tweaks} go={go}/>;
      case 'onboarding': return <OnboardingScreen tweaks={tweaks} go={go}/>;
      default:           return <HomeScreen tweaks={tweaks} go={go}/>;
    }
  })();

  return (
    <IOSDevice width={width} height={height} dark={true}>
      {screenEl}
    </IOSDevice>
  );
}

// Fixed-screen phone (no internal nav) for screens-grid sections
function FrozenPhone({ tweaks, screen, width = 320, height = 692, overrides = {} }) {
  const t = { ...tweaks, ...overrides };
  const go = () => {}; // no-op
  const el = (() => {
    switch (screen) {
      case 'home':       return <HomeScreen tweaks={t} go={go}/>;
      case 'home-listening': return <HomeScreen tweaks={t} go={go} state="listening"/>;
      case 'home-guidance':  return <HomeScreen tweaks={t} go={go} state="guidance"/>;
      case 'guidance':   return <GuidanceScreen tweaks={t} go={go}/>;
      case 'announce':   return <AnnouncementScreen tweaks={t} go={go}/>;
      case 'shake':      return <ShakeScreen tweaks={t} go={go}/>;
      case 'memory':     return <MemoryScreen tweaks={t} go={go}/>;
      case 'privacy':    return <PrivacyScreen tweaks={t} go={go}/>;
      case 'newjourney': return <NewJourneyScreen tweaks={t} go={go}/>;
      case 'onboarding': return <OnboardingScreen tweaks={t} go={go}/>;
      default:           return <HomeScreen tweaks={t} go={go}/>;
    }
  })();
  return <IOSDevice width={width} height={height} dark={true}>{el}</IOSDevice>;
}

// ─── Cover / context card on the canvas ──────────────────────────────
function CoverCard() {
  return (
    <div style={{
      width: '100%', height: '100%', boxSizing: 'border-box',
      padding: '48px 56px',
      background: 'linear-gradient(160deg, #06090f 0%, #0a1424 70%, #1a1230 100%)',
      borderRadius: 0, color: '#f4f7fb',
      fontFamily: 'Geist, system-ui, sans-serif',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position:'absolute', top: -80, right: -60, width: 360, height: 360, borderRadius:'50%',
        background: 'radial-gradient(circle, rgba(107,227,162,0.20), transparent 60%)',
      }}/>
      <div style={{
        position:'absolute', bottom: -100, left: -60, width: 320, height: 320, borderRadius:'50%',
        background: 'radial-gradient(circle, rgba(184,160,255,0.15), transparent 60%)',
      }}/>
      <div style={{ position:'relative' }}>
        <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom: 36 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 18,
            background: 'radial-gradient(circle at 30% 30%, #6BE3A2, #1f9165)',
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow: '0 0 30px rgba(107,227,162,0.5)',
          }}>{Icon.sparkle({s:28, style:{color:'#06120c'}})}</div>
          <div>
            <div style={{ fontSize: 13, letterSpacing: '0.16em', color: 'rgba(244,247,251,0.5)', textTransform:'uppercase' }}>VenKon</div>
            <div style={{ fontSize: 26, fontWeight: 500, letterSpacing:'-0.02em' }}>AI Sense</div>
          </div>
        </div>

        <div style={{ fontSize: 56, fontWeight: 500, lineHeight: 1.05, letterSpacing:'-0.025em', marginBottom: 24 }}>
          An AI guide for the moments<br/>
          a map can't help with.
        </div>
        <div style={{ fontSize: 19, lineHeight: 1.5, color: 'rgba(244,247,251,0.7)', maxWidth: 560 }}>
          Voice-first accessibility for blind and low-vision passengers
          on Indian Railways. Camera vision, OCR, scene memory, and on-device AI —
          guided by one rule:
        </div>
        <div style={{
          marginTop: 28, padding: '18px 22px',
          background: 'rgba(107,227,162,0.08)',
          border: '1px solid rgba(107,227,162,0.3)',
          borderRadius: 18,
          display:'inline-flex', alignItems:'center', gap: 14,
        }}>
          <div style={{ color:'#6BE3A2' }}>{Icon.shield({s:24})}</div>
          <div style={{ fontSize: 20, fontWeight: 500, color: '#6BE3A2', letterSpacing:'-0.01em' }}>
            Silence is safer than a wrong instruction.
          </div>
        </div>

        <div style={{ display:'flex', gap: 12, marginTop: 36, flexWrap:'wrap' }}>
          {['Voice-first', 'Confidence-aware', 'On-device', 'Indian Railways context', 'WCAG AAA dark'].map(t => (
            <div key={t} style={{
              padding: '8px 14px', borderRadius: 9999,
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)',
              fontSize: 13, letterSpacing: '0.01em',
            }}>{t}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Flow strip — annotated horizontal flow ─────────────────────────
function FlowArrow() {
  return (
    <div style={{ display:'flex', alignItems:'center', color: 'rgba(0,0,0,0.35)', padding: '0 4px' }}>
      <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
        <path d="M2 10 H 32" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3"/>
        <path d="M28 4 L 36 10 L 28 16" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

// ─── Tweaks Panel ────────────────────────────────────────────────────
function VKTweaks({ tweaks, setTweak }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="State">
        <TweakRadio label="Confidence" value={tweaks.confidence}
          options={[{value:'high',label:'High'},{value:'med',label:'Med'},{value:'low',label:'Low'}]}
          onChange={(v) => setTweak('confidence', v)}/>
        <TweakRadio label="Train motion" value={tweaks.motion}
          options={[{value:'moving',label:'Moving'},{value:'stopped',label:'Stopped'}]}
          onChange={(v) => setTweak('motion', v)}/>
      </TweakSection>

      <TweakSection label="Visual">
        <TweakSelect label="Voice viz" value={tweaks.viz}
          options={[
            {value:'orb',label:'Pulsing orb'},
            {value:'ripple',label:'Concentric ripples'},
            {value:'wave',label:'Waveform bars'},
            {value:'particles',label:'Particle field'},
          ]}
          onChange={(v) => setTweak('viz', v)}/>
        <TweakRadio label="Contrast" value={tweaks.contrast}
          options={[{value:'normal',label:'Normal'},{value:'high',label:'High'}]}
          onChange={(v) => setTweak('contrast', v)}/>
      </TweakSection>

      <TweakSection label="Language">
        <TweakRadio label="Captions" value={tweaks.language}
          options={[
            {value:'english',label:'English'},
            {value:'both',label:'EN + हिं'},
          ]}
          onChange={(v) => setTweak('language', v)}/>
      </TweakSection>
    </TweaksPanel>
  );
}

// ─── App root: design canvas composition ─────────────────────────────
function App() {
  const { values: tweaks, setTweak } = useTweaks(TWEAK_DEFAULTS);

  // For "All Screens" section we render every screen as a static FrozenPhone
  const allScreens = [
    { id: 'home',       label: '01 · Home (idle)' },
    { id: 'guidance',   label: '02 · Real-time guidance' },
    { id: 'announce',   label: '03 · Announcement capture' },
    { id: 'shake',      label: '04 · Shake to describe' },
    { id: 'memory',     label: '05 · Scene memory' },
    { id: 'privacy',    label: '06 · Privacy & safety' },
    { id: 'newjourney', label: '07 · New journey reset' },
    { id: 'onboarding', label: '08 · Onboarding' },
  ];

  return (
    <>
      <DesignCanvas>
        {/* COVER */}
        <DCSection id="cover" title="VenKon AI Sense" subtitle="Voice-first AI accessibility for Indian public transport">
          <DCArtboard id="cover" label="Concept" width={720} height={620}>
            <CoverCard/>
          </DCArtboard>
          <DCArtboard id="flow-hero" label="Try it · interactive (tap the orb)" width={400} height={862}>
            <Phone tweaks={tweaks} initial="home" width={400} height={862}/>
          </DCArtboard>
        </DCSection>

        {/* MAIN USER FLOW */}
        <DCSection id="flow" title="User flow" subtitle="Tap through the prototype · Sense → Guidance → Announcement">
          <DCArtboard id="onb"    label="Launch · Onboarding" width={320} height={692}>
            <FrozenPhone tweaks={tweaks} screen="onboarding"/>
          </DCArtboard>
          <DCArtboard id="home1"  label="Home · idle" width={320} height={692}>
            <FrozenPhone tweaks={tweaks} screen="home"/>
          </DCArtboard>
          <DCArtboard id="guide1" label="Guidance · active" width={320} height={692}>
            <FrozenPhone tweaks={tweaks} screen="guidance"/>
          </DCArtboard>
          <DCArtboard id="ann1"   label="Announcement captured" width={320} height={692}>
            <FrozenPhone tweaks={tweaks} screen="announce"/>
          </DCArtboard>
          <DCArtboard id="mem1"   label="Memory updated" width={320} height={692}>
            <FrozenPhone tweaks={tweaks} screen="memory"/>
          </DCArtboard>
        </DCSection>

        {/* CONFIDENCE STATES */}
        <DCSection id="conf" title="Confidence states" subtitle="Same screen, three states. Silence is safer than a wrong instruction.">
          <DCArtboard id="cf-high" label="High · clear voice guidance" width={320} height={692}>
            <FrozenPhone tweaks={tweaks} screen="guidance" overrides={{confidence:'high'}}/>
          </DCArtboard>
          <DCArtboard id="cf-med"  label="Medium · 'possibly…'"        width={320} height={692}>
            <FrozenPhone tweaks={tweaks} screen="guidance" overrides={{confidence:'med'}}/>
          </DCArtboard>
          <DCArtboard id="cf-low"  label="Low · silent"                 width={320} height={692}>
            <FrozenPhone tweaks={tweaks} screen="guidance" overrides={{confidence:'low'}}/>
          </DCArtboard>
        </DCSection>

        {/* VOICE VIZ OPTIONS */}
        <DCSection id="viz" title="Voice visualization options" subtitle="Pick the orb style in Tweaks">
          <DCArtboard id="vz-orb"   label="Pulsing orb · default" width={300} height={650}>
            <FrozenPhone tweaks={tweaks} screen="home" overrides={{viz:'orb'}} width={300} height={650}/>
          </DCArtboard>
          <DCArtboard id="vz-rip"   label="Concentric ripples"    width={300} height={650}>
            <FrozenPhone tweaks={tweaks} screen="home" overrides={{viz:'ripple'}} width={300} height={650}/>
          </DCArtboard>
          <DCArtboard id="vz-wave"  label="Waveform"              width={300} height={650}>
            <FrozenPhone tweaks={tweaks} screen="home" overrides={{viz:'wave'}} width={300} height={650}/>
          </DCArtboard>
          <DCArtboard id="vz-part"  label="Particle field"        width={300} height={650}>
            <FrozenPhone tweaks={tweaks} screen="home" overrides={{viz:'particles'}} width={300} height={650}/>
          </DCArtboard>
        </DCSection>

        {/* ALL SCREENS */}
        <DCSection id="all" title="All screens" subtitle="Every screen in the prototype">
          {allScreens.map(s => (
            <DCArtboard key={s.id} id={`all-${s.id}`} label={s.label} width={320} height={692}>
              <FrozenPhone tweaks={tweaks} screen={s.id}/>
            </DCArtboard>
          ))}
        </DCSection>

        {/* ACCESSIBILITY: HIGH-CONTRAST */}
        <DCSection id="a11y" title="Accessibility · high-contrast" subtitle="Toggle 'Contrast: High' in Tweaks to push everything app-wide">
          <DCArtboard id="hc-home" label="Home · WCAG AAA" width={320} height={692}>
            <FrozenPhone tweaks={tweaks} screen="home" overrides={{contrast:'high'}}/>
          </DCArtboard>
          <DCArtboard id="hc-guide" label="Guidance · WCAG AAA" width={320} height={692}>
            <FrozenPhone tweaks={tweaks} screen="guidance" overrides={{contrast:'high'}}/>
          </DCArtboard>
          <DCArtboard id="hc-priv" label="Privacy · WCAG AAA" width={320} height={692}>
            <FrozenPhone tweaks={tweaks} screen="privacy" overrides={{contrast:'high'}}/>
          </DCArtboard>
        </DCSection>
      </DesignCanvas>
      <VKTweaks tweaks={tweaks} setTweak={setTweak}/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
