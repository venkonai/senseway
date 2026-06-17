# ADR-002: On-Device Inference Only

**Status:** Accepted  
**Date:** 2026-06-17

## Context

Transit environments (tunnels, trains, rural stations) have unreliable connectivity. Sending camera frames to a cloud API introduces latency, privacy risk, and a hard dependency on network availability.

## Decision

All AI inference (vision, OCR, speech-to-text) runs on the device. No frames or audio are transmitted to any external service.

## Consequences

- Model size is constrained to what fits on a mid-range device (~500MB total)
- Requires quantized models (4-bit / 8-bit) via EdgeBrain runtime
- App works fully offline — stronger trust guarantee for users
