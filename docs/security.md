# SenseWay — Security

## Threat Model

### Assets
- User's real-time camera feed (highest sensitivity)
- User's audio input
- User's location context (implicit from transit route)

### Threats mitigated

| Threat | Mitigation |
|---|---|
| Camera frames exfiltrated | On-device inference only; no network path from camera pipeline |
| Audio exfiltrated | Whisper runs locally; audio buffer cleared after transcription |
| Model tampering via OTA | Model packages are SHA-256 verified before load |
| Man-in-the-middle on model download | TLS 1.3 + certificate pinning on OTA endpoint |
| Malicious model injection | Model registry is write-protected; signed releases only |
| Analytics re-identification | No PII in telemetry; session IDs are ephemeral UUIDs |

## Privacy Controls

- **Zero image storage** — frames are never written to disk
- **Zero uploads** — no network requests from the inference pipeline
- **No account required** — no login, no user profile, no device fingerprinting
- **Opt-in telemetry** — aggregated metrics only, user can disable in settings
- **Session memory is RAM-only** — cleared on app restart or "New Journey"

## Supply Chain Security

- All dependencies pinned to exact versions in `package-lock.json`
- `npm audit` runs on every PR
- Snyk scans run on every merge to main
- GitHub Dependabot enabled for automated patch PRs
- SAST via CodeQL on every PR

## Model Security

```
Developer signs model artifact (GPG)
    ↓
Model pushed to S3 (private bucket, write via CI only)
    ↓
CloudFront serves with signed URLs (TTL: 1 hour)
    ↓
Device downloads → verifies SHA-256 + GPG signature
    ↓
Model loaded into memory only if verification passes
```

## Incident Response

See [deployment.md](deployment.md) for rollback runbook.

For a security incident:
1. Disable OTA endpoint (CloudFront behavior rule)
2. Rotate S3 signed URL key pair
3. Push emergency model update with fix
4. Notify via GitHub Security Advisory
