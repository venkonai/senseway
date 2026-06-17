# SenseWay — Scaling Strategy

## Current State (MVP): 100 users

- Single AWS region (ap-south-1)
- Manual model deploys via S3 upload
- No telemetry aggregation
- SQLite for config storage

## Growth Stage: 10,000 users

### Infrastructure changes
- CloudFront CDN for model distribution (faster downloads globally)
- ECS Fargate for config/feature-flag API (auto-scaling 1–10 tasks)
- Kinesis Data Streams for telemetry ingest
- RDS PostgreSQL for analytics storage

### Model delivery
```
Model Registry (S3)
    ↓
CloudFront CDN (edge caching)
    ↓
Device OTA pull (delta updates)
```

### Cost estimate
- S3 + CloudFront: ~$20/month at 10K users pulling 50MB model once/month
- ECS Fargate (2 tasks): ~$30/month
- Kinesis: ~$15/month
- Total: ~$65/month

## Scale Stage: 1,000,000 users

### Multi-region active/active
| Region | Users | Purpose |
|---|---|---|
| ap-south-1 | 500K | India, South Asia |
| eu-west-1 | 300K | Europe |
| us-east-1 | 200K | Americas |

### Model update strategy: canary rollout
```
New model validated in staging
    ↓
5% canary (random device cohort)
    ↓
Monitor: confidence_score p50/p95, silence_rate, crash_rate
    ↓
If metrics stable for 24h → 25% → 100%
    ↓
Automatic rollback if silence_rate spikes > 2σ above baseline
```

### Auto-scaling rules
- ECS tasks: scale out at 70% CPU, scale in at 30% CPU
- Kinesis shards: auto-scale based on incoming record rate
- RDS: Multi-AZ with read replicas for analytics queries

### DR strategy
- RTO: 1 hour
- RPO: 15 minutes
- Strategy: S3 model bucket cross-region replication, RDS automated backups to secondary region

## Database evolution

| Stage | Storage | Why |
|---|---|---|
| MVP | SQLite / JSON | No ops overhead |
| 10K | RDS PostgreSQL | ACID, analytics queries |
| 1M | RDS + ElastiCache | Read replicas + cache for hot config |

## Cost at 1M users

| Service | Monthly cost |
|---|---|
| CloudFront (model CDN) | ~$800 |
| ECS Fargate (10 tasks × 3 regions) | ~$450 |
| Kinesis (10 shards) | ~$150 |
| RDS Multi-AZ | ~$300 |
| ElastiCache | ~$150 |
| S3 storage | ~$50 |
| **Total** | **~$1,900/month** |

$0.0019 per user per month — extremely cost-efficient for an accessibility platform.
