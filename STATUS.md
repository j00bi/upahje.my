# UpahJe.My — Project Status

**Last Updated**: 2026-05-24
**Current Phase**: M2 (Marketplace Discovery) + M3 (Applications/Matching)
**Roadmap**: M0 to M7 active (see docs/M0-TO-M7-ROADMAP.md)
**Overall Progress**: ~64%
**Go-Live Target**: Late July – Early August 2026
**Deployed**: upahje-my.vercel.app

## Overall Progress

| Milestone | Status       | Progress | Lead Agent(s)     |
|-----------|--------------|----------|-------------------|
| M0        | Complete     | 100%     | Codex             |
| M1        | Complete     | 100%     | Hermes + Codex    |
| M2        | Partial      | ~45%     | Hermes + Codex    |
| M3        | In Progress  | ~35%     | Codex             |
| M4        | Not Started  | 0%       | Grok + Codex      |

## Current Focus

**M0 – Foundation** — Complete
- Auth System: Core context + pages complete, role-aware auth wired, middleware auth-only
- Database / Prisma: Schema finalized, seed data present, `prisma db push` verified against Supabase
- Dashboard Layout: Multiple role-aware dashboards compiling against real auth state
- Onboarding Integration: Best-of-N Labour / Technical / Employer flows persist through `/api/onboarding/complete`

**M1 – Onboarding / KYC** — Complete
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

**M3 – Matching / Applications** — In progress
- `/api/jobs/[jobId]/apply` creates pending application records instead of directly matching jobs
- Duplicate applications are blocked per job/talent pair
- Labour applicants remain KYC-gated before applying
- Talent can track and withdraw applications from `/dashboard/talent/applications`
- Employers can review, reject, and accept applications from `/dashboard/employer/applications` and `/dashboard/employer/jobs`
- Accepting an application moves the job to `MATCHED`, assigns `talentId`, and rejects other pending/reviewed proposals

**Supabase / Prisma** — Green
- Live `prisma db push` reports schema in sync
- Prisma schema now includes `Application`; a migration aligns the initial application table with the app model
- `NODE_ENV=production npm run build` and `npx tsc --noEmit` pass locally
- `npm run lint` currently opens the legacy `next lint` setup prompt because ESLint is not installed/configured for that command

## Recent Activity

- 2026-05-24: Added real M3 application workflow: pending proposals, talent tracking, employer review/accept/reject, and Prisma application schema/migration
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

1. Apply the new application migration to Supabase and smoke-test with one employer and one talent account
2. Polish M2 discovery flow (more vertical mappings, quick filter chips, route-level URL sync)
3. Continue M3 matching: employer shortlist views, talent notifications/contact handoff, and accepted-job project state
4. Implement trust & safety essentials for M4: reviews shell, escrow/payments hardening, and RLS verification

## Blockers

- No code blockers. Deployment still needs Supabase migration application and live auth/job/application smoke tests.

## Notes

Site deployed via Vercel. Git identity: Ahmad Husni (husnisarafi17@gmail.com).
Operating under Parallel Multi-Agent Orchestration model.
