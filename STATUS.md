# UpahJe.My — Project Status

**Last Updated**: 2026-05-25
**Current Phase**: M2 (Marketplace Discovery) + M3 (Applications/Matching)
**Roadmap**: M0 to M7 active (see docs/M0-TO-M7-ROADMAP.md)
**Overall Progress**: ~70%
**Go-Live Target**: Late July – Early August 2026
**Deployed**: upahje-my.vercel.app

## Overall Progress

| Milestone | Status       | Progress | Lead Agent(s)     |
|-----------|--------------|----------|-------------------|
| M0        | Complete     | 100%     | Codex             |
| M1        | Complete     | 100%     | Hermes + Codex    |
| M2        | Partial      | ~55%     | Hermes + Codex    |
| M3        | In Progress  | ~45%     | Codex             |
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
- `/jobs` filter changes now sync back to the URL, and empty/error states no longer present sample jobs as live work
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
- Accepted applications now show a real email handoff for employer and talent dashboards; no fake chat/review claims are shown
- Employer job creation uses the shared Prisma auth bridge, resolves/upserts marketplace categories, and respects the selected Labour/Technical track

**Supabase / Prisma** — Partial
- Previous live `prisma db push` reported schema in sync; current `.env.local` `DATABASE_URL` fails Supabase authentication and blocks migration deploy/status checks
- Prisma schema now includes `Application`; a migration aligns the initial application table with the app model
- `npm run lint`, `npx tsc --noEmit`, `NODE_ENV=production npm run build`, and `npm run smoke:routes` pass locally
- Cookie-backed API routes used by auth/KYC/applications are explicitly marked dynamic to avoid noisy static-generation probes
- `/jobs/post` now uses server-side auth + employer-role gating before rendering
- `/api/jobs` returns only live database jobs; empty/error states no longer fall back to mock marketplace listings

## Recent Activity

- 2026-05-25: Removed fake job fallback from `/api/jobs`, made `/jobs` filters URL-synced, replaced fake quick chips with real filters, and moved job creation onto Prisma category resolution
- 2026-05-25: Added accepted-application contact handoff cards to employer proposal/job views and talent application tracking
- 2026-05-25: Added `npm run smoke:routes` production route smoke test and fixed `/jobs/post` so anonymous users are redirected before seeing the form
- 2026-05-24: Added real M3 application workflow: pending proposals, talent tracking, employer review/accept/reject, and Prisma application schema/migration
- 2026-05-24: Restored the lint gate with Next 14-compatible ESLint dependencies, fixed lint errors, removed dead dashboard sidebar links, and marked cookie-backed APIs dynamic
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

1. Refresh Supabase `DATABASE_URL`, apply the new application migration, and smoke-test with one employer and one talent account
2. Polish M2 discovery flow (more vertical mappings and category-page visual consistency)
3. Continue M3 matching: employer shortlist views, notification surfaces, and accepted-job project state
4. Implement trust & safety essentials for M4: reviews shell, escrow/payments hardening, and RLS verification

## Blockers

- Current `.env.local` `DATABASE_URL` reaches Supabase but fails authentication (`P1000`), blocking `prisma migrate status/deploy` and live auth/job/application smoke tests.

## Notes

Site deployed via Vercel. Git identity: Ahmad Husni (husnisarafi17@gmail.com).
Operating under Parallel Multi-Agent Orchestration model.
