// VenKon AI Sense — Deck slides

const DECK_DEFAULTS = { confidence: 'high', viz: 'orb', motion: 'moving', language: 'english', contrast: 'normal' };

// ─── Slide shell ─────────────────────────────────────────────────────
function Slide({ children, bg, label, padded = true, full = false }) {
  return (
    <section data-screen-label={label} style={{
      position: 'relative',
      width: 1920, height: 1080,
      background: bg || 'linear-gradient(160deg, #06090f 0%, #0a1424 70%, #15102a 100%)',
      color: '#f4f7fb',
      fontFamily: 'Geist, system-ui, sans-serif',
      overflow: 'hidden',
      padding: padded && !full ? '110px 130px' : 0,
      boxSizing: 'border-box',
      display: 'flex',
    }}>
      {/* corner brand mark */}
      {!full && (
        <div style={{ position: 'absolute', top: 60, left: 130, display:'flex', alignItems:'center', gap: 12, opacity: 0.6 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: 'radial-gradient(circle at 30% 30%, #6BE3A2, #1f9165)',
            boxShadow: '0 0 12px rgba(107,227,162,0.6)',
          }}/>
          <span style={{ fontSize: 16, letterSpacing: '0.16em', textTransform:'uppercase' }}>VenKon · AI Sense</span>
        </div>
      )}
      {children}
    </section>
  );
}

const TextCol = ({ children, style }) => (
  <div style={{ flex: 1, display:'flex', flexDirection:'column', justifyContent:'center', maxWidth: 880, ...style }}>{children}</div>
);

const PhoneCol = ({ children, style }) => (
  <div style={{ flex: '0 0 auto', display:'flex', alignItems:'center', justifyContent:'center', paddingLeft: 80, ...style }}>{children}</div>
);

const Eyebrow = ({ children, color = '#6BE3A2' }) => (
  <div style={{ fontSize: 18, letterSpacing: '0.22em', textTransform:'uppercase', color, fontWeight: 500, marginBottom: 28 }}>{children}</div>
);

const SlideTitle = ({ children, size = 96, color = '#f4f7fb' }) => (
  <div style={{ fontSize: size, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.02, color, marginBottom: 36 }}>{children}</div>
);

const Lede = ({ children, color = 'rgba(244,247,251,0.78)' }) => (
  <div style={{ fontSize: 30, lineHeight: 1.4, color, marginBottom: 40, maxWidth: 760 }}>{children}</div>
);

const Bullet = ({ icon, title, body }) => (
  <div style={{ display:'flex', gap: 22, alignItems:'flex-start', marginBottom: 28 }}>
    <div style={{
      width: 56, height: 56, borderRadius: 16, flexShrink: 0,
      background: 'rgba(107,227,162,0.10)',
      border: '1px solid rgba(107,227,162,0.3)',
      display:'flex', alignItems:'center', justifyContent:'center',
      color: '#6BE3A2',
    }}>{icon}</div>
    <div>
      <div style={{ fontSize: 24, fontWeight: 500, marginBottom: 6, letterSpacing: '-0.01em' }}>{title}</div>
      <div style={{ fontSize: 19, color: 'rgba(244,247,251,0.65)', lineHeight: 1.5, maxWidth: 540 }}>{body}</div>
    </div>
  </div>
);

// Phone wrapper — picks the right screen and wraps it in an iOS device
function DeckPhone({ screen, tweaks = {}, scale = 1.05, overrides = {} }) {
  const t = { ...DECK_DEFAULTS, ...tweaks, ...overrides };
  const w = 380, h = 822;
  const go = () => {};
  const el = (() => {
    switch (screen) {
      case 'home':       return <HomeScreen tweaks={t} go={go}/>;
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
  return (
    <div style={{ width: w*scale, height: h*scale, position:'relative' }}>
      <div style={{ position:'absolute', top: 0, left: 0, transformOrigin:'top left', transform:`scale(${scale})` }}>
        <IOSDevice width={w} height={h} dark={true}>{el}</IOSDevice>
      </div>
    </div>
  );
}

// ─── SLIDE 1 — TITLE ─────────────────────────────────────────────────
function S_Title() {
  return (
    <Slide label="01 Title" full>
      <div style={{
        position:'absolute', inset: 0,
        background:
          'radial-gradient(50% 50% at 80% 20%, rgba(107,227,162,0.22), transparent 60%),' +
          'radial-gradient(50% 50% at 15% 85%, rgba(184,160,255,0.18), transparent 65%),' +
          'linear-gradient(160deg, #06090f 0%, #0a1424 70%, #15102a 100%)',
      }}/>

      <div style={{ position:'relative', padding: '110px 130px', display:'flex', flexDirection:'column', height:'100%', width:'100%', boxSizing:'border-box' }}>
        <div style={{ display:'flex', alignItems:'center', gap: 18 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 20,
            background: 'radial-gradient(circle at 30% 30%, #6BE3A2, #1f9165)',
            boxShadow: '0 0 40px rgba(107,227,162,0.55)',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>{Icon.sparkle({s:34, style:{color:'#06120c'}})}</div>
          <div>
            <div style={{ fontSize: 16, letterSpacing: '0.22em', textTransform:'uppercase', opacity: 0.55 }}>VenKon</div>
            <div style={{ fontSize: 32, fontWeight: 500, letterSpacing:'-0.02em' }}>AI Sense</div>
          </div>
        </div>

        <div style={{ flex: 1, display:'flex', alignItems:'center' }}>
          <div>
            <div style={{ fontSize: 132, fontWeight: 500, lineHeight: 0.96, letterSpacing: '-0.035em', marginBottom: 48 }}>
              An AI guide for the moments<br/>
              <span style={{ color: '#6BE3A2' }}>a map can't help with.</span>
            </div>
            <div style={{ fontSize: 30, lineHeight: 1.45, color: 'rgba(244,247,251,0.65)', maxWidth: 900 }}>
              Voice-first accessibility for blind and low-vision passengers on Indian Railways.
              Camera vision, OCR, scene memory, on-device AI.
            </div>
          </div>
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
          <div style={{ fontSize: 18, letterSpacing: '0.15em', color: 'rgba(244,247,251,0.4)' }}>PROTOTYPE · MOBILE</div>
          <div style={{ fontSize: 18, letterSpacing: '0.15em', color: 'rgba(244,247,251,0.4)' }}>2026</div>
        </div>
      </div>
    </Slide>
  );
}

// ─── SLIDE 2 — THE PRINCIPLE ─────────────────────────────────────────
function S_Principle() {
  return (
    <Slide label="02 Principle">
      <div style={{ width: '100%', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', textAlign:'center' }}>
        <Eyebrow>Engineering principle</Eyebrow>
        <div style={{
          fontSize: 130, fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.03em',
          maxWidth: 1500, marginBottom: 60,
        }}>
          Silence is safer than<br/>
          <span style={{ color: '#6BE3A2' }}>a wrong instruction.</span>
        </div>
        <div style={{ fontSize: 28, lineHeight: 1.5, color: 'rgba(244,247,251,0.6)', maxWidth: 1100 }}>
          Every decision in this product follows from that one rule.
          When confidence drops, Sense stays quiet — never guesses.
        </div>

        {/* Confidence ladder */}
        <div style={{ display:'flex', gap: 28, marginTop: 90 }}>
          {[
            { c: '#6BE3A2', label: 'High confidence', sub: 'Clear voice guidance' },
            { c: '#F5C44A', label: 'Medium confidence', sub: '"Possibly a door ahead"' },
            { c: '#FF6F6F', label: 'Low confidence', sub: 'Stays silent · retry prompt' },
          ].map((b, i) => (
            <div key={i} style={{
              padding: '28px 36px', borderRadius: 24,
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${b.c}40`,
              minWidth: 340,
            }}>
              <div style={{ display:'flex', alignItems:'center', gap: 12, marginBottom: 12 }}>
                <span style={{ width: 14, height: 14, borderRadius:'50%', background: b.c, boxShadow:`0 0 14px ${b.c}` }}/>
                <span style={{ fontSize: 20, fontWeight: 500, color: b.c, letterSpacing: '0.04em', textTransform:'uppercase' }}>{b.label}</span>
              </div>
              <div style={{ fontSize: 22, color: 'rgba(244,247,251,0.85)' }}>{b.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

// ─── SLIDE 3 — HOME ──────────────────────────────────────────────────
function S_Home() {
  return (
    <Slide label="03 Home">
      <TextCol>
        <Eyebrow>01 · Home</Eyebrow>
        <SlideTitle>Voice-first.<br/>Nothing to read.</SlideTitle>
        <Lede>
          Tap the orb or say "Sense". Listening, scanning, guidance active, or low-confidence — every state is announced.
        </Lede>
        <div style={{ marginTop: 12 }}>
          <Bullet icon={Icon.mic({s:24})} title="One target, always centered" body="A 156-pixel orb works one-handed, eyes-closed. The whole screen is a hit zone if you miss it." />
          <Bullet icon={Icon.haptic({s:24})} title="Haptic + audio status" body="Every state — listening, scanning, speaking, silent — has a distinct haptic pattern paired with the voice." />
          <Bullet icon={Icon.refresh({s:24})} title="Start fresh, on demand" body="One huge button resets scene memory between coaches, stations, or trips." />
        </div>
      </TextCol>
      <PhoneCol><DeckPhone screen="home" scale={1.05}/></PhoneCol>
    </Slide>
  );
}

// ─── SLIDE 4 — GUIDANCE ─────────────────────────────────────────────
function S_Guidance() {
  return (
    <Slide label="04 Guidance">
      <TextCol>
        <Eyebrow>02 · Real-time guidance</Eyebrow>
        <SlideTitle>What the camera<br/>sees, spoken aloud.</SlideTitle>
        <Lede>
          Object detection + OCR + motion awareness running on-device.
          Detections only become spoken instructions when confidence clears the bar.
        </Lede>
        <div style={{ marginTop: 12 }}>
          <Bullet icon={Icon.train({s:24})} title="Motion-aware" body="Knows when the train is moving vs. stopped — guidance phrasing adjusts accordingly." />
          <Bullet icon={Icon.type({s:24})} title="OCR for coach + platform signage" body="Reads 'COACH S-3' or 'PLATFORM 4' off real-world signs and confirms the journey context." />
          <Bullet icon={Icon.sparkle({s:24})} title="Color-coded confidence" body="A green / amber / red ring around every detection makes the silence audible to sighted helpers too." />
        </div>
      </TextCol>
      <PhoneCol><DeckPhone screen="guidance" scale={1.05} overrides={{confidence:'high'}}/></PhoneCol>
    </Slide>
  );
}

// ─── SLIDE 5 — CONFIDENCE STATES ─────────────────────────────────────
function S_ConfidenceStates() {
  return (
    <Slide label="05 Confidence states">
      <div style={{ width: '100%', display:'flex', flexDirection:'column' }}>
        <Eyebrow>Same screen · three states</Eyebrow>
        <SlideTitle size={84}>Confidence shapes the voice.</SlideTitle>
        <div style={{ display:'flex', gap: 50, marginTop: 30, justifyContent:'center', alignItems:'flex-start' }}>
          {[
            { c: 'high', color:'#6BE3A2', label:'HIGH', say:'"Door slightly to your right, four steps."' },
            { c: 'med',  color:'#F5C44A', label:'MEDIUM', say:'"Possibly a doorway ahead. Not fully sure."' },
            { c: 'low',  color:'#FF6F6F', label:'LOW', say:'— silent — "Hold the camera steady."' },
          ].map((s, i) => (
            <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap: 22 }}>
              <DeckPhone screen="guidance" scale={0.78} overrides={{confidence: s.c}}/>
              <div style={{ textAlign:'center', maxWidth: 380 }}>
                <div style={{ fontSize: 18, fontWeight: 600, color: s.color, letterSpacing:'0.16em', marginBottom: 10 }}>{s.label}</div>
                <div style={{ fontSize: 22, lineHeight: 1.4, color: 'rgba(244,247,251,0.78)' }}>{s.say}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

// ─── SLIDE 6 — ANNOUNCEMENT ──────────────────────────────────────────
function S_Announcement() {
  return (
    <Slide label="06 Announcement">
      <TextCol>
        <Eyebrow>03 · Audio announcement mode</Eyebrow>
        <SlideTitle>Garbled PA?<br/>Sense translates.</SlideTitle>
        <Lede>
          Raw railway announcements are captured, transcribed, then simplified into one sentence the rider actually needs.
        </Lede>

        {/* Before/after pair */}
        <div style={{ display:'flex', flexDirection:'column', gap: 18, marginTop: 16, maxWidth: 760 }}>
          <div style={{
            padding: '22px 26px', borderRadius: 20,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)',
          }}>
            <div style={{ fontSize: 14, letterSpacing: '0.18em', color: 'rgba(244,247,251,0.5)', marginBottom: 8 }}>RAW · STATION PA</div>
            <div style={{ fontSize: 22, lineHeight: 1.45, color: 'rgba(244,247,251,0.75)' }}>
              "Train number one two seven two three, Hyderabad Express, is arriving on platform four. Passengers are requested to…"
            </div>
          </div>
          <div style={{
            padding: '24px 26px', borderRadius: 20,
            background: 'linear-gradient(135deg, rgba(184,160,255,0.14), rgba(123,217,245,0.08))',
            border: '1px solid rgba(184,160,255,0.35)',
          }}>
            <div style={{ fontSize: 14, letterSpacing: '0.18em', color: '#B8A0FF', marginBottom: 8, display:'flex', alignItems:'center', gap: 8 }}>
              {Icon.sparkle({s:14})} SIMPLIFIED BY SENSE
            </div>
            <div style={{ fontSize: 32, fontWeight: 500, lineHeight: 1.25, letterSpacing:'-0.01em' }}>
              "Your train is arriving at <span style={{ color: '#7BD9F5' }}>platform 4</span>."
            </div>
          </div>
        </div>
      </TextCol>
      <PhoneCol><DeckPhone screen="announce" scale={1.0}/></PhoneCol>
    </Slide>
  );
}

// ─── SLIDE 7 — SHAKE ─────────────────────────────────────────────────
function S_Shake() {
  return (
    <Slide label="07 Shake">
      <TextCol>
        <Eyebrow>04 · Shake to describe</Eyebrow>
        <SlideTitle>Shake.<br/>Get the scene.</SlideTitle>
        <Lede>
          A quick shake captures one frame and returns one sentence about what's around.
          For when you don't want to talk and don't need a full session.
        </Lede>
        <div style={{ marginTop: 12 }}>
          <Bullet icon={Icon.haptic({s:24})} title="Haptic confirms capture" body="A short double-tap pattern fires as soon as Sense locks the frame — you know it heard you." />
          <Bullet icon={Icon.shake({s:24})} title="No screen contact required" body="The gesture works one-handed with the phone at chest height, pointing forward." />
          <Bullet icon={Icon.brain({s:24})} title="One-sentence summaries" body="Outputs respect the confidence ladder — 'Crowded coach detected', 'Possibly a door', or silence." />
        </div>
      </TextCol>
      <PhoneCol><DeckPhone screen="shake" scale={1.0}/></PhoneCol>
    </Slide>
  );
}

// ─── SLIDE 8 — MEMORY ────────────────────────────────────────────────
function S_Memory() {
  return (
    <Slide label="08 Memory">
      <TextCol>
        <Eyebrow>05 · Scene memory</Eyebrow>
        <SlideTitle>Aware,<br/>not surveillant.</SlideTitle>
        <Lede>
          Sense remembers what it just saw — coach number, door position, crowd density —
          but only as labels. No images, no map, no upload.
        </Lede>
        <div style={{ marginTop: 12 }}>
          <Bullet icon={Icon.brain({s:24})} title="Object labels, not pixels" body="Memory holds 'Coach S3 · door · 8 people standing' — never a photograph." />
          <Bullet icon={Icon.refresh({s:24})} title="Resets between journeys" body="Tapping 'Start new journey' wipes scene memory in one tap. Clean slate every trip." />
          <Bullet icon={Icon.lock({s:24})} title="Lives only in RAM" body="Nothing is ever written to disk. Close the app and the memory is gone." />
        </div>
      </TextCol>
      <PhoneCol><DeckPhone screen="memory" scale={1.05}/></PhoneCol>
    </Slide>
  );
}

// ─── SLIDE 9 — PRIVACY ───────────────────────────────────────────────
function S_Privacy() {
  return (
    <Slide label="09 Privacy">
      <TextCol>
        <Eyebrow>06 · Privacy & safety</Eyebrow>
        <SlideTitle>Your surroundings<br/>stay yours.</SlideTitle>
        <Lede>
          On-device by default. No login. No cloud. No retained frames — ever.
          The trust contract is short on purpose.
        </Lede>

        <div style={{ display:'flex', gap: 32, marginTop: 30 }}>
          <div>
            <div style={{ fontSize: 64, fontWeight: 500, color: '#6BE3A2', fontFamily: 'Geist Mono, monospace', letterSpacing:'-0.02em' }}>47,328</div>
            <div style={{ fontSize: 16, letterSpacing: '0.14em', color: 'rgba(244,247,251,0.5)', textTransform:'uppercase' }}>Frames discarded today</div>
          </div>
          <div style={{ width: 1, background: 'rgba(255,255,255,0.12)' }}/>
          <div>
            <div style={{ fontSize: 64, fontWeight: 500, fontFamily: 'Geist Mono, monospace', letterSpacing:'-0.02em' }}>0</div>
            <div style={{ fontSize: 16, letterSpacing: '0.14em', color: 'rgba(244,247,251,0.5)', textTransform:'uppercase' }}>Images saved, ever</div>
          </div>
        </div>

        <div style={{ marginTop: 50 }}>
          <Bullet icon={Icon.cpu({s:24})} title="All processing on-device" body="Object detection, OCR, and the LLM all run in the Neural Engine." />
          <Bullet icon={Icon.nostore({s:24})} title="Frames discarded instantly" body="A frame lives ~16ms — long enough to caption, never long enough to store." />
        </div>
      </TextCol>
      <PhoneCol><DeckPhone screen="privacy" scale={1.05}/></PhoneCol>
    </Slide>
  );
}

// ─── SLIDE 10 — INDIAN CONTEXT ───────────────────────────────────────
function S_Indian() {
  return (
    <Slide label="10 Indian context">
      <div style={{ width:'100%', display:'flex', flexDirection:'column' }}>
        <Eyebrow>Built for Indian Railways</Eyebrow>
        <SlideTitle size={84}>The chaos is the design brief.</SlideTitle>
        <Lede>
          Crowded coaches, multilingual signage, broken PA systems, unstable framing.
          Sense is built for the conditions, not for a clean lab.
        </Lede>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap: 28, marginTop: 50 }}>
          {[
            { t: 'Coach context', sub: 'S3 · A1 · B2', body: 'OCR pulls coach numbers off Indian Railways signage to confirm position.' },
            { t: 'Station PA', sub: 'Platform 4 · 12723', body: 'Captures the announcement, simplifies the sentence, repeats on demand.' },
            { t: 'Multilingual', sub: 'EN · हिंदी', body: 'Bilingual captions and TTS. Regional languages on the roadmap.' },
            { t: 'Crowd density', sub: 'Moving · stopped', body: 'Motion + crowd estimation tells the rider what kind of step they\'re taking.' },
          ].map((b, i) => (
            <div key={i} style={{
              padding: '32px 30px', borderRadius: 24,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.10)',
            }}>
              <div style={{ fontSize: 18, letterSpacing: '0.16em', textTransform:'uppercase', color: '#6BE3A2', marginBottom: 16 }}>{b.t}</div>
              <div style={{ fontSize: 36, fontWeight: 500, fontFamily: 'Geist Mono, monospace', marginBottom: 18, letterSpacing:'-0.01em' }}>{b.sub}</div>
              <div style={{ fontSize: 18, lineHeight: 1.5, color: 'rgba(244,247,251,0.62)' }}>{b.body}</div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

// ─── SLIDE 11 — DESIGN SYSTEM ────────────────────────────────────────
function S_DesignSystem() {
  return (
    <Slide label="11 Design system">
      <div style={{ width:'100%', display:'flex', flexDirection:'column' }}>
        <Eyebrow>Design system</Eyebrow>
        <SlideTitle size={84}>Calm, dark, accessible.</SlideTitle>

        <div style={{ display:'grid', gridTemplateColumns:'1.2fr 1fr 1fr', gap: 40, marginTop: 40 }}>

          {/* Color */}
          <div>
            <div style={{ fontSize: 16, letterSpacing: '0.16em', textTransform:'uppercase', color: 'rgba(244,247,251,0.5)', marginBottom: 20 }}>Confidence palette</div>
            {[
              { c:'#6BE3A2', name:'High · Mint',  hex:'#6BE3A2' },
              { c:'#F5C44A', name:'Medium · Amber', hex:'#F5C44A' },
              { c:'#FF6F6F', name:'Low · Soft red', hex:'#FF6F6F' },
              { c:'#7BD9F5', name:'Listening · Cyan', hex:'#7BD9F5' },
              { c:'#B8A0FF', name:'AI voice · Lavender', hex:'#B8A0FF' },
              { c:'#0a0f17', name:'Background · Frame', hex:'#0a0f17' },
            ].map((s, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap: 18, marginBottom: 14 }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: s.c, boxShadow: `0 0 18px ${s.c}40`, border:'1px solid rgba(255,255,255,0.1)' }}/>
                <div>
                  <div style={{ fontSize: 19, fontWeight: 500 }}>{s.name}</div>
                  <div style={{ fontSize: 15, fontFamily:'Geist Mono, monospace', color:'rgba(244,247,251,0.5)' }}>{s.hex}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Typography */}
          <div>
            <div style={{ fontSize: 16, letterSpacing: '0.16em', textTransform:'uppercase', color: 'rgba(244,247,251,0.5)', marginBottom: 20 }}>Typography</div>
            <div style={{ fontFamily:'Geist', fontSize: 64, fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1, marginBottom: 4 }}>Geist</div>
            <div style={{ fontSize: 15, color: 'rgba(244,247,251,0.5)', marginBottom: 24 }}>Display & UI · weights 400/500/600</div>
            <div style={{ fontFamily:'Hind', fontSize: 48, fontWeight: 500, lineHeight: 1, marginBottom: 4 }}>हिंदी · Hind</div>
            <div style={{ fontSize: 15, color: 'rgba(244,247,251,0.5)', marginBottom: 24 }}>Devanagari · weights 400/500/600</div>
            <div style={{ fontFamily:'Geist Mono, monospace', fontSize: 36, marginBottom: 4 }}>0.94 · OCR</div>
            <div style={{ fontSize: 15, color: 'rgba(244,247,251,0.5)' }}>Geist Mono · confidence values, IDs</div>

            <div style={{ marginTop: 36, fontSize: 16, color: 'rgba(244,247,251,0.55)', lineHeight: 1.55 }}>
              <div>Display · 64 / 96 / 132 px</div>
              <div>Body · 19 / 22 px (min 18 on phone)</div>
              <div>Caption · 13 px · tracking 0.04em</div>
            </div>
          </div>

          {/* Components */}
          <div>
            <div style={{ fontSize: 16, letterSpacing: '0.16em', textTransform:'uppercase', color: 'rgba(244,247,251,0.5)', marginBottom: 20 }}>Components</div>

            {/* status chips */}
            <div style={{ display:'flex', flexDirection:'column', gap: 12, marginBottom: 24 }}>
              <div className="chip listen"><span className="dot"/>Listening</div>
              <div className="chip scan"><span className="dot"/>Scanning</div>
              <div className="chip live"><span className="dot"/>Guidance active</div>
              <div className="chip uncertain"><span className="dot"/>Low confidence</div>
            </div>

            {/* button samples */}
            <div style={{ display:'flex', flexDirection:'column', gap: 12, marginBottom: 24, maxWidth: 320 }}>
              <button className="btn solid huge btn-full">Start guidance</button>
              <button className="btn glass large btn-full">New journey</button>
              <button className="btn danger large btn-full">Pause guidance</button>
            </div>

            <div style={{ fontSize: 14, color: 'rgba(244,247,251,0.45)', lineHeight: 1.5 }}>
              Radii · 8 / 14 / 20 / 28 / 36 / 9999<br/>
              Touch targets ≥ 56px · WCAG AAA contrast<br/>
              Glass surfaces · blur 20 · saturate 1.1
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}

// ─── SLIDE 12 — CLOSING ──────────────────────────────────────────────
function S_Closing() {
  return (
    <Slide label="12 Closing" full>
      <div style={{
        position:'absolute', inset: 0,
        background:
          'radial-gradient(40% 40% at 50% 50%, rgba(107,227,162,0.18), transparent 60%),' +
          'linear-gradient(160deg, #06090f 0%, #0a1424 80%)',
      }}/>
      <div style={{ position:'relative', width:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding: '110px 130px', textAlign:'center' }}>
        <div style={{
          width: 120, height: 120, borderRadius: 36, marginBottom: 60,
          background: 'radial-gradient(circle at 30% 30%, #6BE3A2, #1f9165)',
          boxShadow: '0 0 80px rgba(107,227,162,0.6)',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>{Icon.shield({s:60, style:{color:'#06120c'}})}</div>

        <div style={{ fontSize: 120, fontWeight: 500, lineHeight: 1, letterSpacing:'-0.03em', marginBottom: 40 }}>
          Silence is safer<br/>
          <span style={{ color:'#6BE3A2' }}>than a wrong instruction.</span>
        </div>

        <div style={{ fontSize: 28, color: 'rgba(244,247,251,0.55)', maxWidth: 1000, lineHeight: 1.4 }}>
          VenKon AI Sense — voice-first accessibility for the Indian transit reality.
        </div>

        <div style={{ position:'absolute', bottom: 80, left: 130, right: 130, display:'flex', justifyContent:'space-between', alignItems:'center', color:'rgba(244,247,251,0.4)', fontSize:16, letterSpacing:'0.16em', textTransform:'uppercase' }}>
          <span>venkon.ai · sense</span>
          <span>Prototype · 2026</span>
        </div>
      </div>
    </Slide>
  );
}

// ─── DECK ROOT ───────────────────────────────────────────────────────
function Deck() {
  return (
    <deck-stage>
      <S_Title/>
      <S_Principle/>
      <S_Home/>
      <S_Guidance/>
      <S_ConfidenceStates/>
      <S_Announcement/>
      <S_Shake/>
      <S_Memory/>
      <S_Privacy/>
      <S_Indian/>
      <S_DesignSystem/>
      <S_Closing/>
    </deck-stage>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Deck/>);
