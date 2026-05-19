# UpahJe.My — KANBAN (M0 Foundation)

**Last Updated**: 2026-05-19
**Orchestration Model**: Parallel Multi-Agent
**Active Goal**: Drive M0 + Onboarding Integration to clean M2 handoff
**Winner Selection**: Completed — Labour D (Hybrid), Technical B+A mix, Employer E1 (see ONBOARDING-WINNER-SELECTION.md)

## M0 – Foundation

### Status Overview
- **Auth Track**: Complete (Auth context + sign-in/sign-up pages + auth-only middleware + protected routes + profile creation on signup)
- **Database Track**: In Progress (Prisma schema validated locally; seed data exists; live DB push blocked by Supabase auth credentials)
- **Dashboard Track**: In Progress (Role-aware dashboards present and compiling against real auth state)
- **Job Posting Track**: Complete (Form connected to database, validation implemented, employerId properly resolved)
- **Overall Progress**: ~85% (foundation mostly complete locally; live database sync remains the blocker)

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
|| M0-D2  | Create initial migrations                 | In Progress | Codex   | Prisma diff validated locally; seed aligned to current AiTask schema; live push blocked by DATABASE_URL auth |
|| M0-D3  | Set up Supabase client utilities          | Done       | Codex   | lib/supabase/config.ts + client |
|| M0-D4  | Implement basic data access layer         | In Progress | Codex   | lib/actions/jobs.ts + onboarding persistence wired; onboarding completion now uses the repo auth bridge and persists to Prisma models |

---

### Dashboard Track (Lead: Codex)

| ID     | Task                                      | Status     | Owner   | Notes |
|--------|-------------------------------------------|------------|---------|-------|
| M0-DS1 | Create main dashboard layout              | Done       | Codex   | Role-aware layout now redirects off real auth state |
| M0-DS2 | Build Employer dashboard page             | Done       | Codex   | Employer dashboard compiles and reads Prisma-backed data |
| M0-DS3 | Build Talent dashboard page               | Done       | Codex   | Talent dashboard scaffold present |
| M0-DS4 | Connect dashboard with real data          | In Progress | Codex   | Data wiring works locally; build is green, but live DB sync verification is still blocked |

---

## M1 – Onboarding

### Status Overview
- **Labour Flow**: In Progress
- **Employer Flow**: In Progress
- **KYC Track**: In Progress
- **Overall Progress**: ~50%

---

### Labour Flow (Lead: Grok)

| ID      | Task                                              | Status | Owner | Notes |
|---------|---------------------------------------------------|--------|-------|-------|
| M1-L1   | Finalize Labour role selection screen             | In Progress | Grok  | Best-of-N variants present in live onboarding flow |
| M1-L2   | Design Labour quick registration (email + phone)  | To Do  | Grok  | Browse-only path |
| M1-L3   | Design Labour full registration + KYC flow        | To Do  | Grok  | Full access path |
| M1-L4   | Create Labour profile form (basic + advanced)     | To Do  | Grok  | - |
| M1-L5   | Build MyKad upload + verification UI              | To Do  | Grok  | - |
| M1-L6   | Implement progressive disclosure for Labour       | To Do  | Grok  | - |

---

### Employer Flow (Lead: Grok)

| ID      | Task                                              | Status | Owner | Notes |
|---------|---------------------------------------------------|--------|-------|-------|
| M1-E1   | Design Employer role selection screen             | In Progress | Grok  | Best-of-N employer variants present in live onboarding flow |
| M1-E2   | Create Employer quick registration flow           | To Do  | Grok  | - |
| M1-E3   | Design Employer full onboarding (company info)    | To Do  | Grok  | - |
| M1-E4   | Build job posting during onboarding (optional)    | To Do  | Grok  | - |

---

### KYC & Verification (Lead: Codex)

| ID      | Task                                              | Status | Owner  | Notes |
|---------|---------------------------------------------------|--------|--------|-------|
| M1-K1   | Design KYC submission flow                        | In Progress | Codex  | Onboarding completion path is wired; MyKad path still needs DB/verification finish |
| M1-K2   | Implement MyKad upload + OCR/preview              | To Do  | Codex  | - |
| M1-K3   | Create backend verification status tracking       | To Do  | Codex  | - |
| M1-K4   | Add KYC gate for job applications                 | To Do  | Codex  | Full access only |
| M1-K5   | Build admin KYC review interface                  | To Do  | Codex  | - |

---

## Parallel Execution Notes

- M0 and M1 can run in parallel.
- KYC system (M1-K1 to M1-K5) should be usable by both Labour and Employer flows.
- Quick registration paths (M1-L2, M1-E2) should be prioritized for early testing.

---

## Blockers

- Live Supabase database sync is blocked by invalid `DATABASE_URL` credentials.

## Next Review

After first 3–4 days of execution.
