# SenseWay — Architecture

## Overview

SenseWay is an on-device, voice-first AI navigation assistant. All inference, processing, and decision-making runs locally on the user's device. No frames, audio, or personal data are sent to the cloud.

## Core Principles

1. **Confidence-first** — the system speaks only when confident. Silence is a valid, safe output.
2. **On-device only** — all AI runs on the Neural Engine / GPU. No cloud dependency.
3. **Multi-modal fusion** — camera, OCR, and audio are fused to produce a higher-confidence signal than any single source.
4. **Privacy by architecture** — frames are discarded immediately after inference; no storage path exists.

## Components

### EdgeBrain Runtime
The underlying AI execution layer. Manages model loading, quantization, inference scheduling, and the confidence engine. See [venkonai/edgebrain](https://github.com/venkonai/edgebrain).

### Vision Model
- Primary: YOLOv11 nano / MobileNet V3
- Detects: doors, seats, stairs, crowds, platforms, signage
- Output: bounding boxes + class confidence scores

### OCR Engine
- Primary: PaddleOCR (lightweight mobile build)
- Reads: coach labels, platform numbers, departure boards, signage
- Output: text + character-level confidence

### Speech-to-Text
- Primary: Whisper tiny / base (via whisper.cpp)
- Captures: PA announcements, user voice commands
- Output: transcript + word-level confidence

### Confidence Engine
Fuses outputs from all three modalities into a single score:

```
score = (vision_conf × 0.40) + (ocr_conf × 0.35) + (audio_conf × 0.25) + memory_boost
```

Where `memory_boost` is a small additive factor when the current frame matches objects already in scene memory (reduces hallucination risk from single-frame artifacts).

### Scene Memory
A rolling 5-minute spatial context store (in-memory only, cleared on "New Journey"):
- Stores detected objects with timestamps and confidence
- Used to disambiguate low-confidence frames
- Never persisted to disk

### Safety Policy
Terminal decision layer — no other component bypasses this:

| Score | Action |
|---|---|
| ≥ 0.85 | Speak guidance clearly |
| 0.50 – 0.84 | Speak with qualifier ("possibly…", "I think…") |
| < 0.50 | Silent — haptic pulse only |

## Data Flow

```
Camera → Frame → Vision Model → detections[]
Camera → Frame → OCR Engine  → text[]
Microphone → Audio → Whisper → transcript

detections[] + text[] + transcript → Fusion Layer
Scene Memory → context boost

Fusion Layer → Confidence Engine → score (0–1)
score → Safety Policy → TTS / Haptic / Silence
```

## Technology Choices

| Component | Technology | Rationale |
|---|---|---|
| Mobile runtime | React Native | Cross-platform, large ecosystem |
| Vision | YOLOv11 nano | Fastest inference on mobile NPU |
| OCR | PaddleOCR | Best accuracy on non-Latin scripts |
| STT | Whisper.cpp | Offline, multilingual, small footprint |
| Observability | OpenTelemetry | Vendor-neutral, standard |
| IaC | Terraform | Reproducible infra |
