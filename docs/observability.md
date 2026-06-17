# SenseWay — Observability

## Philosophy

SenseWay must be observable without compromising privacy. No user content (frames, audio, transcripts) is ever sent. Telemetry is **aggregated, anonymized, and opt-in**.

## Signal Types

### Metrics (Prometheus)

| Metric | Type | Description |
|---|---|---|
| `senseway_confidence_score` | Histogram | Distribution of confidence scores per guidance session |
| `senseway_silence_events_total` | Counter | Times AI stayed silent (key safety indicator) |
| `senseway_guidance_latency_ms` | Histogram | End-to-end response time (frame → voice output) |
| `senseway_ocr_accuracy_ratio` | Gauge | OCR match rate against cross-validated sources |
| `senseway_battery_impact_pct_per_hr` | Gauge | Battery consumption per hour of active use |
| `senseway_model_inference_ms` | Histogram | Per-model inference latency (vision/ocr/stt) |
| `senseway_sessions_total` | Counter | Guidance sessions started |
| `senseway_announcements_captured_total` | Counter | PA announcements successfully transcribed |

### Traces (OpenTelemetry → Tempo)

Trace per guidance session:
```
guidance_session
├── vision_inference (span)
├── ocr_inference (span)
├── audio_capture (span)
│   └── whisper_transcription (span)
├── confidence_fusion (span)
└── tts_output (span)
```

### Logs (Loki)

Structured JSON only. Fields:
```json
{
  "event": "silence_triggered",
  "confidence": 0.42,
  "modality_scores": { "vision": 0.38, "ocr": 0.51, "audio": 0.40 },
  "session_id": "<anonymous-uuid>",
  "device_class": "mid-range-android"
}
```

No user identifiers. No location data. No image hashes.

## Alert Rules

```yaml
# silence_rate spike — model degradation signal
- alert: HighSilenceRate
  expr: rate(senseway_silence_events_total[5m]) / rate(senseway_sessions_total[5m]) > 0.30
  for: 10m
  annotations:
    summary: "Silence rate above 30% — possible model degradation or input issue"

# latency regression
- alert: GuidanceLatencyHigh
  expr: histogram_quantile(0.95, senseway_guidance_latency_ms) > 800
  for: 5m
  annotations:
    summary: "P95 guidance latency > 800ms — user experience degraded"

# crash spike after model update
- alert: CrashRateSpike
  expr: rate(senseway_crash_total[5m]) > 0.01
  for: 2m
  annotations:
    summary: "Crash rate > 1% — rollback model update"
```

## Grafana Dashboards

1. **Real-time Confidence Distribution** — histogram of scores across live sessions
2. **Silence Rate Over Time** — the primary safety SLI
3. **Model Inference Latency** — per-model P50/P95/P99
4. **Battery Impact by Device Class** — mid-range vs flagship
5. **OTA Rollout Progress** — % of fleet on latest model version

## SLOs

| SLI | Target |
|---|---|
| Guidance latency P95 | < 500ms |
| Silence rate (low confidence suppression working) | > 10% (healthy — means model is being appropriately cautious) |
| Silence rate (model broken) | < 50% (alert above this) |
| App crash rate | < 0.5% of sessions |
| OTA model update success rate | > 99.5% |
