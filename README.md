# SenseWay

**Confidence-aware AI navigation for blind and low-vision travelers.**

> *Silence is safer than a wrong instruction.*

SenseWay is an on-device, voice-first AI assistant that guides blind and low-vision passengers through public transit — trains, metros, buses, and stations — anywhere in the world. It fuses camera vision, OCR, and audio capture into a confidence engine that speaks only when it is certain, and stays silent when it is not.

[![CI](https://github.com/venkonai/senseway/actions/workflows/ci.yml/badge.svg)](https://github.com/venkonai/senseway/actions/workflows/ci.yml)
[![Security Scan](https://github.com/venkonai/senseway/actions/workflows/security.yml/badge.svg)](https://github.com/venkonai/senseway/actions/workflows/security.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## The Problem

Existing navigation apps for blind users share one critical flaw: **they always output an answer**, even when the AI is only 40% confident. In transit environments — noisy stations, moving trains, crowded platforms — a wrong instruction is not just unhelpful. It is dangerous.

SenseWay is built on a different contract with the user:

| Confidence | Action |
|---|---|
| High (≥ 85%) | Speak clearly |
| Medium (50–84%) | Speak with qualifier: *"possibly…"* |
| Low (< 50%) | **Stay silent** |

---

## System Architecture

```mermaid
graph TB
    subgraph Device["📱 On-Device (No Cloud)"]
        CAM[Camera Feed]
        MIC[Microphone]
        OCR[OCR Engine]
        VIS[Vision Model]
        STT[Speech-to-Text\nWhisper]

        subgraph EB["EdgeBrain Runtime"]
            FUSE[Multi-Modal Fusion]
            CONF[Confidence Engine]
            MEM[Scene Memory]
            SAFE[Safety Policy]
        end

        TTS[Text-to-Speech]
        HAP[Haptic Feedback]
    end

    CAM --> VIS
    CAM --> OCR
    MIC --> STT

    VIS --> FUSE
    OCR --> FUSE
    STT --> FUSE

    FUSE --> CONF
    CONF --> MEM
    CONF --> SAFE

    SAFE -->|confidence >= 0.85| TTS
    SAFE -->|confidence 0.50-0.84| TTS
    SAFE -->|confidence < 0.50| HAP

    TTS --> USER((👤 User))
    HAP --> USER
```

---

## Confidence Engine

```mermaid
flowchart LR
    subgraph Inputs
        A[Camera Frame]
        B[OCR Text]
        C[PA Announcement]
        D[Scene Memory]
    end

    subgraph Fusion["Multi-Modal Fusion"]
        W[Weighted Score\nper modality]
        X[Cross-validation\nbetween sources]
        Y[Context boost\nfrom memory]
    end

    subgraph Decision["Confidence Decision"]
        H{Score >= 0.85?}
        M{Score >= 0.50?}
        S[SILENT\nHaptic only]
        P[SPEAK\nwith qualifier]
        C2[SPEAK\nclearly]
    end

    A --> W
    B --> W
    C --> W
    D --> Y

    W --> X
    X --> Y
    Y --> H

    H -->|Yes| C2
    H -->|No| M
    M -->|Yes| P
    M -->|No| S
```

---

## Multi-Modal Sensor Fusion

```mermaid
graph LR
    subgraph Sensors
        V[Vision\nYOLO / MobileNet\nDoors · Seats · Crowds]
        O[OCR\nPaddleOCR\nCoach · Platform · Signs]
        A[Audio\nWhisper\nPA Announcements]
    end

    subgraph Memory
        SM[Scene Memory\nSpatial context\nLast 5 minutes]
    end

    subgraph Engine
        FU[Fusion Layer\nWeighted confidence\nper source]
        CE[Confidence Engine\nFinal score 0–1]
        SP[Safety Policy\nSpeak · Qualify · Silence]
    end

    V -->|weight: 0.40| FU
    O -->|weight: 0.35| FU
    A -->|weight: 0.25| FU
    SM -->|context boost| FU

    FU --> CE
    CE --> SP
```

---

## CI/CD Pipeline

```mermaid
graph LR
    subgraph PR["Pull Request"]
        L[Lint\nESLint]
        T[Unit Tests]
        SA[SAST\nCodeQL]
        DA[Dependency Audit\nnpm audit]
    end

    subgraph Merge["On Merge to main"]
        B[Build\nReact Native]
        SI[Security Scan\nSnyk]
        ST[Staging Deploy]
        IT[Integration Tests]
    end

    subgraph Release["Release Tag"]
        AB[Android Build\nAPK / AAB]
        IB[iOS Build\nIPA]
        MU[Model Update\nOTA Package]
        GR[GitHub Release]
    end

    L --> T --> SA --> DA
    DA --> B --> SI --> ST --> IT
    IT --> AB
    IT --> IB
    IT --> MU
    AB --> GR
    IB --> GR
    MU --> GR
```

---

## Observability Stack

```mermaid
graph TB
    subgraph App["SenseWay App"]
        OT[OpenTelemetry SDK]
    end

    subgraph Signals["Telemetry Signals"]
        TR[Traces\nGuidance sessions]
        ME[Metrics\nConfidence scores\nLatency · Battery]
        LO[Logs\nSilence events\nError events]
    end

    subgraph Backend["Observability Backend"]
        OC[OTel Collector]
        PR[Prometheus]
        LK[Loki]
        TM[Tempo]
        GF[Grafana\nDashboards]
        AL[Alert Manager]
    end

    OT --> TR
    OT --> ME
    OT --> LO

    TR --> OC
    ME --> OC
    LO --> OC

    OC --> PR
    OC --> LK
    OC --> TM

    PR --> GF
    LK --> GF
    TM --> GF
    PR --> AL
```

Key metrics tracked:
- `senseway_confidence_score` — distribution of scores per session
- `senseway_silence_events_total` — how often AI stays silent (safety indicator)
- `senseway_guidance_latency_ms` — end-to-end response time
- `senseway_battery_impact_pct` — battery consumption per hour of use
- `senseway_ocr_accuracy` — OCR match rate against ground truth

---

## Scaling Architecture

```mermaid
graph TB
    subgraph Edge["Edge Layer (Device)"]
        D1[Device: Android]
        D2[Device: iOS]
        D3[Device: Tablet]
    end

    subgraph CDN["Distribution Layer"]
        MR[Model Registry\nS3 + CloudFront]
        FF[Feature Flags\nLaunchDarkly]
        OTA[OTA Update Service]
    end

    subgraph Platform["Platform Layer"]
        API[Config API\nECS Fargate]
        AN[Analytics Ingest\nKinesis]
        MON[Monitoring\nGrafana Cloud]
    end

    subgraph DR["DR / Multi-Region"]
        US[us-east-1]
        EU[eu-west-1]
        AP[ap-south-1]
    end

    D1 <-->|model pull| OTA
    D2 <-->|model pull| OTA
    D3 <-->|model pull| OTA

    OTA --> MR
    D1 -->|telemetry| AN
    D2 -->|telemetry| AN
    D3 -->|telemetry| AN

    API --> FF
    AN --> MON

    MR --> US
    MR --> EU
    MR --> AP
```

### Scale targets

| Stage | Users | Strategy |
|---|---|---|
| MVP | 100 | Single region, manual deploys |
| Growth | 10,000 | CDN model distribution, auto-scaling API |
| Scale | 1,000,000 | Multi-region, canary model rollouts, edge caching |

---

## Screens

| Screen | Description |
|---|---|
| 01 · Home | Tap or say "Sense" to activate — pulsing orb voice visualizer |
| 02 · Real-time Guidance | Camera viewfinder with confidence-colored detection overlays |
| 03 · Announcement Capture | PA audio transcription + AI simplification |
| 04 · Shake to Describe | Instant scene snapshot on phone shake with haptic confirm |
| 05 · Scene Memory | Orbital spatial map of detected objects from last 5 minutes |
| 06 · Privacy & Safety | On-device guarantees — 0 images stored, 0 uploads, ever |
| 07 · New Journey | Reset scene memory between transit legs |
| 08 · Onboarding | 3-slide intro: Voice first · Confidence-aware · Yours alone |

---

## Key Design Decisions

See [`docs/adr/`](docs/adr/) for full Architecture Decision Records.

- **[ADR-001](docs/adr/001-confidence-first-design.md)** — Confidence-first silence over best-effort output
- **[ADR-002](docs/adr/002-on-device-only.md)** — On-device inference: no frames leave the phone
- **[ADR-003](docs/adr/003-multimodal-fusion.md)** — Multi-modal fusion over single-sensor input

---

## Roadmap

- [ ] React Native mobile app (Android + iOS)
- [ ] On-device vision model integration (YOLOv11 / MobileNet)
- [ ] On-device OCR (PaddleOCR)
- [ ] On-device speech (Whisper.cpp)
- [ ] EdgeBrain confidence engine integration
- [ ] Multi-language support (Hindi, Spanish, Japanese, French)
- [ ] OTA model update pipeline
- [ ] Prometheus + Grafana observability

---

## Repository Structure

```
senseway/
├── app/                        # UI prototype (React / JSX)
├── .github/
│   └── workflows/
│       ├── ci.yml              # Lint, test, security on PR
│       ├── security.yml        # SAST + dependency scan
│       └── release.yml         # Build + OTA model package on tag
├── docs/
│   ├── architecture.md         # Deep architecture detail
│   ├── scaling.md              # Scale from 100 → 1M users
│   ├── observability.md        # Metrics, traces, alerting
│   ├── security.md             # Threat model + controls
│   ├── deployment.md           # Deploy runbook
│   └── adr/                    # Architecture Decision Records
├── infra/                      # Terraform (coming)
└── README.md
```

---

## Part of VenKon AI

SenseWay is powered by [EdgeBrain](https://github.com/venkonai/edgebrain) — VenKon AI's trust-aware on-device AI runtime.

```
VenKon AI
├── senseway      ← You are here
├── edgebrain     ← On-device AI runtime
└── opspilot      ← AI for DevOps/SRE (coming)
```

---

## License

MIT © [VenKon AI](https://github.com/venkonai)
