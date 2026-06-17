# ADR-001: Confidence-First Silence Over Best-Effort Output

**Status:** Accepted  
**Date:** 2026-06-17

## Context

In accessibility navigation, a wrong instruction can cause physical harm. Most AI systems attempt to always provide an output, even at low confidence. For a blind transit passenger, a hallucinated "door is on your left" when the door is actually on the right is worse than no guidance at all.

## Decision

SenseWay will stay **silent** when the confidence engine score falls below 0.50. Between 0.50 and 0.85, it speaks with a qualifier ("possibly…"). Above 0.85, it speaks clearly.

## Consequences

- Users must trust that silence means uncertainty, not failure — addressed in onboarding
- Silence rate becomes a key SLI (healthy range: 10–30%)
- This is a fundamental product differentiator vs. all existing navigation apps
