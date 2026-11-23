# Superseded — marketplace roadmap

This roadmap predates the pivot to a publication and the deletion of the
marketplace routes it plans for (auth, onboarding, jobs, matching, escrow).
M1 to M5 no longer exist in the codebase. The live plan is
`docs/specs/editorial-redesign.md`, with the phase status in `docs/REBUILD.md`.
Kept only as history.

---

# UpahJe.my — M0 to M7 Milestone Roadmap (PM Goal)

**Created**: 2026-05-19
**Owner**: Hermes (Orchestrator)
**Status**: Active Standing Goal

---

## Current State Assessment (Honest)

| Area                    | Status          | Notes |
|-------------------------|------------------|-------|
| UI / Design             | Advanced        | Strong Best-of-N onboarding, talent profiles, dashboards |
| Onboarding              | Partially Wired | UI complete, backend wiring just started |
| Auth + Profile          | Partial         | Basic auth exists, full profile persistence incomplete |
| Job Posting & Discovery | Early           | Very minimal |
| Matching & Applications | Not Started     | - |
| Trust & Safety          | Early           | MyKad component exists but not integrated |
| Payments / Escrow       | Not Started     | - |
| Overall Readiness       | ~30-35%         | Heavy on design & onboarding, light on core marketplace flows |

**Go-Live Expectation**: Not close yet. Realistic target is **8–12 weeks** of focused work if we maintain momentum.

---

## M0 – M7 Milestone Plan

### M0: Foundation (Current Focus)
- Auth system (Supabase + NextAuth)
- Prisma schema + basic data models
- Role-based dashboards
- Basic project setup & CI
- **Target**: Stable, buildable base

### M1: Onboarding (Heavily Worked)
- Labour Hybrid (D) as primary
- Technical hybrid (B + A)
- Employer Simple (E1)
- Full data persistence to Prisma
- **Target**: Users can fully onboard and create profiles

### M2: Job Posting & Discovery
- Job posting form (Employer)
- Job listing & search (Talent)
- Category + location filtering
- Job detail pages
- **Target**: Employers can post, talents can browse

### M3: Applications & Matching
- Apply to jobs
- Proposal system
- Basic matching logic
- Application status tracking
- **Target**: Core hiring loop works

### M4: Trust & Safety
- MyKad verification flow
- Review & rating system
- Profile verification badges
- Basic dispute/reporting
- **Target**: Platform feels safe and trustworthy

### M5: Payments & Escrow
- Payment integration (testnet first)
- Escrow on job award
- Release on completion
- Basic invoicing
- **Target**: Money can move on the platform

### M6: Polish & Performance
- Mobile experience finalization
- Performance optimization
- Error handling & loading states
- Accessibility pass
- **Target**: Production-quality feel

### M7: Launch Preparation
- Final security & RLS audit
- Seed data & production setup
- Marketing site + landing pages
- Support flows & documentation
- Go-live checklist & monitoring
- **Target**: Ready for real users

---

## Go-Live Expectation

| Milestone | Estimated Effort | Realistic Timeline |
|-----------|------------------|--------------------|
| M0 + M1   | Done / In Progress | Current |
| M2 + M3   | 3–4 weeks        | Mid June |
| M4 + M5   | 3–4 weeks        | Early July |
| M6 + M7   | 2–3 weeks        | Mid–Late July |

**Earliest realistic public launch**: Late July – Early August 2026 (assuming consistent progress).

---

**Next Action**: Confirm this roadmap or adjust priorities (e.g. push Payments earlier, focus on Jobs first, etc.).
