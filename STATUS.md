# UpahJe.My — Project Status

**Last Updated**: 2026-05-22
**Current Phase**: M1 (Onboarding/KYC) + M2 (Marketplace Discovery)
**Roadmap**: M0 to M7 active (see docs/M0-TO-M7-ROADMAP.md)
**Overall Progress**: ~58%
**Go-Live Target**: Late July – Early August 2026
**Deployed**: upahje-my.vercel.app

## Overall Progress

| Milestone | Status       | Progress | Lead Agent(s)     |
|-----------|--------------|----------|-------------------|
| M0        | Complete     | 100%     | Codex             |
| M1        | In Progress  | ~75%     | Grok + Codex      |
| M2        | Partial      | ~45%     | Hermes + Codex    |
| M3        | Not Started  | 0%       | Codex             |
| M4        | Not Started  | 0%       | Grok + Codex      |

## Current Focus

**M0 – Foundation** — Complete
- Auth System: Core context + pages complete, role-aware auth wired, middleware auth-only
- Database / Prisma: Schema finalized, seed data present, `prisma db push` verified against Supabase
- Dashboard Layout: Multiple role-aware dashboards compiling against real auth state
- Onboarding Integration: Best-of-N Labour / Technical / Employer flows persist through `/api/onboarding/complete`

**M1 – Onboarding / KYC** — Meaningfully integrated
- Email registration/login, Google SSO, confirmation resend, password recovery,
  safe return intents, and role-prefilled onboarding now share one post-auth
  resolver. Live provider verification awaits a reachable Supabase project.
- OnboardingFlow writes to Prisma-backed profile records
- Labour / Technical / Employer variant selection preserved through completion
- MyKad upload/status tracking is live and admin review can verify/reject submissions
- Public dashboard and job routes compile cleanly

**M2 – Marketplace Discovery** — In progress
- Homepage redesigned: broad marketplace positioning + green brand + 8 categories + step connectors
- Intro animation (first-session only) + LoadingLogo + matched soft canvas
- LiveJobFeed with real avatars, stronger hovers, trust section flip
- Category pages now query live Prisma jobs for mapped verticals
- Jobs list and detail pages are live, including query-string search from the nav bar
- Behance/Figma-inspired portfolio system with project cards, grid, detail pages, 9 mock projects
- Video background support (MP4 + WebM fallback)
- Neutral colour scheme (#f8f8f8 / #f9f9f9 unified backgrounds)

**Supabase / Prisma** — Green
- Live `prisma db push` reports schema in sync
- Prisma client regenerates cleanly
- Build + lint + typecheck all pass

## Recent Activity

- 2026-05-20: Redesigned homepage — broad marketplace, green brand, single nav, gallery callout, 8 categories, step connectors. Deployed to upahje-my.vercel.app
- 2026-05-20: Behance/Figma portfolio system built & deployed (ProjectCard, PortfolioGrid, project detail page, 9 mock projects)
- 2026-05-22: M1 KYC review UI landed, category pages switched to live Prisma jobs, and jobs search now respects query-string navigation
- 2026-05-20: Marketplace homepage + category nav + 7 category pages built & deployed
- 2026-05-20: Deployed neutral colour scheme (no orange/amber), fixed git identity
- 2026-05-20: Intro animation first-session only + LoadingLogo + video bg (MP4/WebM)
- 2026-05-20: LiveJobFeed with real avatars, trust section flip, stronger hovers
- 2026-05-19: M0 foundation green end-to-end (Prisma + Supabase live db push + lint/build clean)
- 2026-05-19: Major cleanup — 54 files committed, .Ai POC parked, swarm clutter purged
- 2026-05-19: Thin Agent API POC built (register, tasks, accept, submit endpoints)
- 2026-05-19: M0–M7 milestone roadmap created

## Next Actions

1. Finish MyKad OCR/preview and tighten KYC review workflow
2. Polish M2 discovery flow (more vertical mappings, quick filter chips, route-level URL sync)
3. Start M3 Matching & Applications after onboarding/discovery is solid
4. Implement trust & safety (reviews, escrow) for M4

## Blockers

- No active blockers. Supabase live DB connectivity resolved.

## Notes

Site deployed via Vercel. Git identity: Ahmad Husni (husnisarafi17@gmail.com).
Operating under Parallel Multi-Agent Orchestration model.
