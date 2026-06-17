# SenseWay — Deployment Runbook

## Environments

| Environment | Branch | Purpose |
|---|---|---|
| Development | `feature/*` | Local dev, no CI deploy |
| Staging | `main` | Auto-deployed on merge |
| Production | `v*` tag | Manual trigger via GitHub Release |

## Normal Release

1. Merge feature branch to `main` → staging auto-deploys
2. Verify staging: confidence scores nominal, no crash spike
3. Create tag: `git tag v1.2.0 && git push origin v1.2.0`
4. GitHub Actions builds APK/IPA + OTA model package
5. OTA package pushed to S3 model registry
6. Canary: 5% of devices receive update automatically
7. Monitor `senseway_silence_rate` and `senseway_crash_total` for 2 hours
8. Promote to 100% via feature flag in LaunchDarkly

## Model-Only Update (no app release required)

1. Quantize new model: `edgebrain quantize --model phi3-mini --target android`
2. Run EdgeBench validation suite — must pass all thresholds
3. Sign artifact: `gpg --sign model-v1.2.0.bin`
4. Push to S3: `aws s3 cp model-v1.2.0.bin s3://venkonai-models/senseway/`
5. Update model manifest: bump `latestVersion` in `model-manifest.json`
6. Canary rollout via OTA service (same as above)

## Rollback

### App rollback
```bash
# Re-tag previous version as latest release
git tag v1.1.9-hotfix v1.1.9
git push origin v1.1.9-hotfix
# GitHub Actions rebuilds and redeploys
```

### Model rollback (< 5 minutes)
```bash
# Point manifest back to previous version
aws s3 cp s3://venkonai-models/senseway/model-manifest-v1.1.9.json \
          s3://venkonai-models/senseway/model-manifest.json
# Devices will pull previous model on next check-in
```

## Rollback Triggers (automatic)

The release pipeline monitors for 2 hours post-deploy:
- `senseway_silence_rate > 50%` → auto-rollback model
- `senseway_crash_total rate > 1%` → pause rollout + alert

## Health Checks

Post-deploy checklist:
- [ ] Confidence score distribution matches baseline (p50 ≈ 0.78)
- [ ] Silence rate between 10–30%
- [ ] Guidance latency P95 < 500ms
- [ ] No new crash symbolication patterns in Sentry
- [ ] OTA model manifest checksum valid
