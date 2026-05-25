# UpahJe.My — KANBAN (M0 Foundation + M2 Marketplace + M3 Applications)

**Last Updated**: 2026-05-25
**Roadmap**: M0–M7 active (see docs/M0-TO-M7-ROADMAP.md)
**Overall Progress**: ~68%
**Go-Live Target**: Late July – Early August 2026
**Deployed**: upahje-my.vercel.app

## M0 – Foundation

### Status Overview
- **Auth Track**: Complete (Auth context + sign-in/sign-up pages + auth-only middleware + protected routes + profile creation on signup)
- **Database Track**: Complete (Prisma schema validated locally; seed data exists; live DB push reaches Supabase and reports the schema is in sync)
- **Dashboard Track**: Complete (Role-aware dashboards present and compiling against real auth state; build/typecheck are green)
- **Job Posting Track**: Complete (Form connected to database, validation implemented, employerId properly resolved)
- **Overall Progress**: 100%

---

### Auth Track (Lead: Codex)

|| ID     | Task                                      | Status     | Owner   | Notes ||
||--------|-------------------------------------------|------------|---------|-------||
|| M0-A1  | Set up Supabase environment variables     | Done       | Codex   | Completed in earlier session ||
|| M0-A2  | Create Auth Context + Provider            | Done       | Codex   | lib/supabase/auth-context.tsx + role fetch ||
|| M0-A3  | Build Sign In / Sign Up pages             | Done       | Codex   | app/auth/signin/ + signup/ implemented ||
|| M0-A4  | Implement role-based authorization        | Done       | Codex   | Full middleware, guards, and validation implemented ||
|| M0-A5  | **Track 3: Protected Routes & Security**  | Done       | Codex   | Enhanced middleware, onboarding protection, webhook public routes ||
|| M0-A6  | **Track 4: Profile Creation on Signup**   | Done       | Codex   | Automatic profile creation with role via callback URL ||

---

### Database Track (Lead: Codex)

| ID     | Task                                      | Status     | Owner   | Notes |
|--------|-------------------------------------------|------------|---------|-------|
|| M0-D1  | Finalize Prisma schema                    | Done       | Codex   | prisma/schema.prisma present |
|| M0-D2  | Create initial migrations                 | Done       | Codex   | Prisma diff validated locally; seed aligned to current schema; live push reaches Supabase and reports the schema is in sync |
|| M0-D3  | Set up Supabase client utilities          | Done       | Codex   | lib/supabase/config.ts + client |
|| M0-D4  | Implement basic data access layer         | Done       | Codex   | lib/actions/jobs.ts + onboarding persistence wired; onboarding completion now uses the repo auth bridge and persists to Prisma models |

---

### Dashboard Track (Lead: Codex)

| ID     | Task                                      | Status     | Owner   | Notes |
|--------|-------------------------------------------|------------|---------|-------|
| M0-DS1 | Create main dashboard layout              | Done       | Codex   | Role-aware layout now redirects off real auth state |
| M0-DS2 | Build Employer dashboard page             | Done       | Codex   | Employer dashboard compiles and reads Prisma-backed data |
| M0-DS3 | Build Talent dashboard page               | Done       | Codex   | Talent dashboard scaffold present |
| M0-DS4 | Connect dashboard with real data          | Done       | Codex   | Data wiring works; live DB sync verified against Supabase |

---

## M1 – Onboarding

### Status Overview
- **Labour Flow**: Complete
- **Employer Flow**: Complete
- **KYC Track**: Complete
- **Overall Progress**: 100%

---

### Labour Flow (Lead: Hermes — took over from Grok)

| ID      | Task                                              | Status | Owner  | Notes |
|---------|---------------------------------------------------|--------|--------|-------|
| M1-L1   | Finalize Labour role selection screen             | Done   | Hermes | RoleSelector amber/teal colors, track split |
| M1-L2   | Design Labour quick registration (email + phone)  | Done   | Hermes | Browse-only path + sessionStorage proposal restore |
| M1-L3   | Design Labour full registration + KYC flow        | Done   | Hermes | MyKadUpload in all 4 onboarding variants |
| M1-L4   | Create Labour profile form (basic + advanced)     | Done   | Hermes | Accordion UI, /api/profile/talent CRUD |
| M1-L5   | Build MyKad upload + verification UI              | Done   | Codex  | Works in Stepper, Hybrid, Chat, Cards |
| M1-L6   | Implement progressive disclosure for Labour       | Done   | Hermes | Quick (browse) → Full (KYC+profile) flow |

---

### Employer Flow (Lead: Hermes — took over from Grok)

| ID      | Task                                              | Status | Owner  | Notes |
|---------|---------------------------------------------------|--------|--------|-------|
| M1-E1   | Design Employer role selection screen             | Done   | Codex  | Employer variants present in live onboarding flow |
| M1-E2   | Create Employer quick registration flow           | Done   | Hermes | Zap/quick-start mode: company + name only |
| M1-E3   | Design Employer full onboarding (company info)    | Done   | Hermes | Location, industry, companySize, volume fields |
| M1-E4   | Build job posting during onboarding (optional)    | Done   | Hermes | Step 4 with jobTitle, budget, timeline, fastPost |

---

### KYC & Verification (Lead: Hermes — took over from Codex)

| ID      | Task                                              | Status | Owner  | Notes |
|---------|---------------------------------------------------|--------|--------|-------|
| M1-K1   | Design KYC submission flow                        | Done   | Hermes | MyKadUpload in all labour onboarding flows |
| M1-K2   | Implement MyKad upload + preview                  | Done   | Hermes | Upload to /uploads/mykad/, inline preview link |
| M1-K3   | Create backend verification status tracking       | Done   | Codex  | kycStatus/kycFileUrl on Profile, API returns status |
| M1-K4   | Add KYC gate for job applications                 | Done   | Hermes | Apply API checks kycStatus, returns KYC_REQUIRED |
| M1-K5   | Build admin KYC review interface                  | Done   | Codex  | /admin/kyc page + list/patch APIs live |

---

## M2 – Marketplace Frontend (May 20 push)

### Status Overview
- **Homepage**: Complete (broad marketplace positioning, intro animation, green brand, 8 categories, step connectors, LiveJobFeed, trust section)
- **Portfolio System**: Complete (Behance/Figma-inspired project cards, grid, detail pages, 9 mock projects)
- **Category Pages**: In progress (live Prisma-backed jobs for mapped verticals, slug-based routing)
- **Visual Identity**: Complete (neutral #f8f8f8 / #f9f9f9 scheme, video backgrounds, green brand)
- **Overall Progress**: ~55% (pages exist, live DB wiring landed for the main discovery paths, and `/jobs` no longer uses fake fallback listings)

---

| ID     | Task                                                | Status     | Owner  | Notes |
|--------|-----------------------------------------------------|------------|--------|-------|
| M2-H1  | Design & build marketplace homepage                 | Done       | Hermes | Broad positioning: "Upah sesiapa. Untuk apa sahaja." 8 categories, green brand |
| M2-H2  | Build intro animation (first-session only)          | Done       | Hermes | LoadingLogo + mix-blend-multiply + MP4/WebM fallback |
| M2-H3  | Implement LiveJobFeed component                     | Done       | Hermes | Real avatars (pravatar), stronger hovers, trust section flip |
| M2-H4  | Build category pages with slug routing              | Done       | Hermes | 7 category pages; app/categories/[slug]/ |
| M2-H5  | Build portfolio system (Behance/Figma style)        | Done       | Hermes | ProjectCard, PortfolioGrid, detail pages, 9 mock projects |
| M2-H6  | Implement video backgrounds                         | Done       | Hermes | MP4 + WebM fallback for hero/intro |
| M2-H7  | Unify colour scheme                                 | Done       | Hermes | Neutral #f8f8f8 bg, no orange/amber, green brand |
| M2-H8  | Wire categories with live Prisma data               | Done       | Hermes | Category pages query live Prisma jobs for mapped verticals |
| M2-H9  | Build vertical landing pages for all categories     | In Progress | Hermes | 7 done, more verticals pending |
| M2-H10 | Implement job discovery + search                    | Done       | Codex | `/jobs` reads and writes query-string filters; quick chips now apply real category/track filters |
| M2-H11 | Build job listing detail pages                      | Done       | Hermes | Live /jobs/[jobId] page + apply CTA wired to job APIs |
| M2-H12 | Remove fake job fallback                            | Done       | Codex | `/api/jobs` now returns only live DB rows or a real error; no sample listings are presented as traction |

---

## M3 – Applications & Matching

### Status Overview
- **Apply Flow**: In Progress (pending applications now persist instead of directly matching)
- **Talent Application Tracking**: In Progress (`/dashboard/talent/applications` lists and withdraws proposals)
- **Employer Review**: In Progress (`/dashboard/employer/applications` and `/dashboard/employer/jobs` can review, reject, and accept)
- **Matching State**: Partial (accepting a proposal assigns `Job.talentId`, marks job `MATCHED`, and rejects other pending/reviewed applications)
- **Overall Progress**: ~35%

---

| ID     | Task                                      | Status      | Owner | Notes |
|--------|-------------------------------------------|-------------|-------|-------|
| M3-A1  | Add application data model to Prisma      | Done        | Codex | `Application` model added; migration aligns initial table to app model |
| M3-A2  | Persist job applications                  | Done        | Codex | `/api/jobs/[jobId]/apply` creates pending proposals and blocks duplicates |
| M3-A3  | Preserve KYC gate for applications        | Done        | Codex | Labour applicants need `SUBMITTED` or `VERIFIED` KYC status |
| M3-A4  | Talent application tracking page          | Done        | Codex | `/dashboard/talent/applications` lists and withdraws applications |
| M3-A5  | Employer application review page          | Done        | Codex | `/dashboard/employer/applications` lists proposals with accept/reject actions |
| M3-A6  | Employer job-level applications page      | Done        | Codex | `/dashboard/employer/jobs` groups proposals by posted job |
| M3-A7  | Accepted-job project/contact handoff      | Pending     | Codex | Needs post-match project/contact workflow after `MATCHED` |
| M3-A8  | Live Supabase migration + smoke test      | Pending     | Codex | Apply migration and test employer/talent end-to-end on live DB |
| M3-A9  | Production route smoke coverage           | Done        | Codex | `npm run smoke:routes` covers public routes, protected redirects, and unauthenticated auth/application/KYC APIs |
| M3-A10 | Employer job creation category resolution | Done        | Codex | Posting uses Prisma auth bridge, selected track, required description, and resolves/upserts domain category IDs |

---

## Parallel Execution Notes

- M0 and M1 can run in parallel.
- M2 frontend is largely independent of M1 backend wiring.
- KYC system (M1-K1 to M1-K5) should be usable by both Labour and Employer flows.
- Quick registration paths (M1-L2, M1-E2) should be prioritized for early testing.

---

## Blockers

- Current `DATABASE_URL` in `.env.local` fails Supabase authentication for Prisma migration status/deploy. Needs valid DB credentials before applying `20260524_application_relations`.

## Next Review

After next milestone check-in.
