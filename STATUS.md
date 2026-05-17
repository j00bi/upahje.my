# UpahJe.my Project Status

**Last Updated:** 2026-05-17 (Milestone Tracker full sweep)
**Tracker:** Milestone Tracker (sub-agent of Hermes) — monitoring TASKS.md / KANBAN.md / STATUS.md / WORKING.md + code reality + git
**Project Phase:** Phase 1 Complete → Phase 2 In Progress (Best-of-N Onboarding delivered; Marketplace foundations live)

## Current Status

### Project Overview
- **Name:** UpahJe.my (Malaysian dual-track freelance marketplace — Labour + Technical talent tracks)
- **Location:** /home/husni/projects/upahje-my
- **Status:** Rapid progress via Best-of-N + multi-agent (Grok UI lead, Codex backend). Phase 0 foundation advanced in code; **Phase 1 Onboarding (all Best-of-N) ACHIEVED**; Phase 2 Core Marketplace started (public profiles + job board live in demo).
- **Next Action:** Hermes winner selection for onboarding variants; complete Phase 0 wiring (real auth/DB); continue Phase 2 data integration + messaging.
- **Key Wins:** 10+ distinct onboarding variants (4 Labour + 3 Technical + 3 Employer) all live with switchable previews in OnboardingFlow. Shared components adopted. Real /talent/[slug] + /jobs pages.

### Active Agents
| Agent | Role | Status | Current Focus |
|-------|------|--------|---------------|
| Hermes | Orchestrator | Active | Milestone decisions, winner selection, priorities |
| Codex | Implementation (backend) | Active | Auth/Prisma/Supabase wiring, matching, job flows, dirty work in progress |
| Grok | UI/UX + Best-of-N generator | Active (long-running) | Onboarding variants + shared adoption (Task 1.4 done), talent profiles, dashboards |
| Milestone Tracker | Milestone monitoring + doc sync | Active | Full sweeps vs plan, STATUS/KANBAN updates, agent-truth on shifts |
| Grok Nudger (Accountability Pusher) | Focus enforcement + nudges | Active | UI lane discipline, doc freshness, proactive pushes |

### Phase 0: Foundation — IN PROGRESS (Advanced, ~70%)
**Owner:** Hermes + Codex (primary impl) + Grok (shells)

#### Reality vs Plan (TASKS.md)
- ✅ Initialize full Next.js 16 + TypeScript + Tailwind v4 + (glass/rounded UI patterns; shadcn/ui NOT installed)
- ✅ lib/supabase.ts + @supabase/supabase-js client
- ✅ prisma/schema.prisma with core models: User, Account, Session, Profile, Talent (with Track + categories join), Employer, Job, Review, Category + enums
- ✅ lib/prisma.ts singleton
- ✅ lib/auth.ts + NextAuth v5 (Google + Email providers, graceful if no creds; JWT sessions)
- ✅ app/auth/signin, middleware (matcher for /dashboard but currently passthrough — needs enforcement)
- ✅ (app) protected layout with dashboard shells (employer dashboard, job board links)
- ✅ Basic folder structure, lib/domain.ts (local types mirroring Prisma where needed)
- ❌ Real Supabase project + envs + migrations not connected (uses .env.example only)
- ❌ Full sign-up → profile creation flow wired to Prisma/Supabase (demo alerts only)
- ❌ shadcn/ui components (using custom Tailwind + glassmorphism)

**Verification:** "Can sign up and see a protected dashboard" — **Partial**. Dashboard shells + SignOut + links exist; auth providers configured but not enforced in middleware; no live DB. Demoable in dev with warnings.

**Current Blockers:** Environment secrets, `prisma migrate` + seed, full auth callback wiring to create Profile/Talent/Employer, build stability (some bus errors noted in history).
**Git note:** Some auth/middleware tweaks in working tree (unrelated to UI).

### Phase 1: Onboarding System (Best-of-N Priority) — ✅ ACHIEVED
**Owner:** Grok (primary) + Codex (types/lint support) + Hermes (selection pending)

#### Task 1.1 — Labour Onboarding Flow (Best-of-N: 4 versions) — COMPLETE
- All 4 live and selectable in `/onboarding` via OnboardingFlow.tsx preview grid:
  - **A: LabourOnboardingStepper** — Classic 7-step wizard
  - **B: LabourOnboardingCards** — Progressive visual cards
  - **C: LabourOnboardingChat** — Conversational (fake messages)
  - **D: LabourOnboardingHybrid** — Quick-start + later deep
- All collect: name/phone, MyKadUpload, location, multi-select LABOUR_CATEGORIES (10), rate/availability, bio + trust/safety microcopy. Mobile-first.
- **Recent:** Adoption of shared CategoryPicker complete (see Task 1.4)

#### Task 1.2 — Technical Talent Onboarding (Best-of-N: 3 versions) — COMPLETE
- All 3 live in preview:
  - **A: TechnicalOnboardingStepper**
  - **B: TechnicalOnboardingShowcase** (accordion)
  - **C: TechnicalOnboardingProForm** (live sidebar preview)
- Focus: portfolio, TECHNICAL_CATEGORIES multi-select, TECHNICAL_RATE_TIERS, suggested certs, professional tone.

#### Task 1.3 — Employer Onboarding (Best-of-N: 3 versions) — COMPLETE
- All 3 live:
  - **E1: EmployerOnboardingSimple** — 3-step wizard
  - **E2: EmployerOnboardingVisual** — Category-first visual
  - **E3: EmployerOnboardingPostFirst** — Ultra-minimal post-job-first
- Short flows, company + hiring needs + categories (BOTH tracks).

#### Task 1.4 — Shared Components — ✅ COMPLETE (as of latest Grok work)
- Created: `components/onboarding/shared/` 
  - CategoryPicker.tsx (supports 'LABOUR' | 'TECHNICAL' | 'BOTH' — extended for Employers)
  - RateTierSelector.tsx
  - TalentProfilePreview.tsx (extracted + used in Phase 2)
  - types.ts + barrel index
- **Adoption:** 
  - Labour variants (Stepper, Cards, Hybrid) refactored to use shared picker (dupe removal)
  - Employer Visual + Simple refactored to shared (BOTH mode)
  - Technical already aligned
- RoleSelector, TrackSelector, MyKadUpload, OnboardingFlow progress stepper also shared.
- **Status:** Duplication eliminated in visual flows. Chat variant left conversational (text-parsed categories).

**Best-of-N Status:** All variants delivered and demoable. **Winner selection pending** (Hermes + Grok). No /variants folder yet. Live preview switcher in OnboardingFlow is excellent for evaluation.

**From WORKING.md agent-truth:** Multiple "done" entries confirm full Phase 1 delivery + shared adoption (last: Grok 2026-05-17 14:48 "Task 1.4 completed").

### Phase 2: Core Marketplace — IN PROGRESS (~35-45%)
**Owner:** Grok (UI profiles + cards) + Codex (jobs + matching + recent additions)

#### Shipped:
- ✅ Public Talent Profile: `/talent/[slug]/page.tsx` — fully functional demo (2 profiles: Labour + Technical). Uses TalentProfilePreview (variant="full"), trust signals (MyKad, certs), reviews, similar talents, sticky "Hubungi Talent" CTA. Strong Phase 2 foundation.
- ✅ Job Board: `/jobs` — filterable listing (track, category, location, search) powered by lib/mockJobs.ts + JobCard. Modern UI.
- ✅ Job matches view: `/jobs/[jobId]/matches` (recent Codex commit)
- ✅ Basic deterministic matching: `lib/matching.ts` (Layer 1 scorer with reasons)
- ✅ Supporting: components/jobs/JobCard.tsx, JobPostForm.tsx; components/talent/TalentCard.tsx; lib/mockTalents.ts (untracked)
- ✅ Onboarding data models feed naturally into profiles.

#### Remaining (from TASKS):
- [ ] In-app messaging (Supabase Realtime)
- [ ] Full job detail page + contact flow (placeholders exist)
- [ ] Real data (replace mocks), talent listing / discovery beyond single slug, employer job posting wired
- [ ] Basic "Cari Upah" search + talent matching in UI

**Recent git:** "feat: Add talent matching results page and mock talent data", "feat: Create basic Job Board..."

### Phase 3: Trust & Payments — NOT STARTED
- Billplz FPX + escrow, MyKad verification (beyond upload), two-way reviews (demo only), disputes.

## Files / Git Reality (current sweep)
- Clean docs (STATUS, KANBAN, TASKS) were stale — now refreshed by Milestone Tracker.
- **Working tree dirty (preserve unrelated):** 
  - Modified: onboarding/employer/*Simple+Visual, shared/CategoryPicker, lib/auth.ts, middleware.ts
  - Untracked: app/jobs/[jobId]/ (matches), lib/mockTalents.ts, GROK_PUSHER_NUDGE.md (nudger artifact)
- Last commits: matching results + job board feats + onboarding WIPs + foundation.
- **Recommendation:** Commit UI adoption + Codex marketplace work soon; keep branches small.

## Blockers & Dependencies
1. **Phase 0 completion** — envs + Prisma migration + real auth guard + profile creation endpoint.
2. **Winner selection** — Hermes to pick 1 Labour + 1 Technical + 1 Employer variant; archive others.
3. **Data layer** — Move from mocks + demo alerts to Supabase/Prisma writes.
4. Build/runtime stability in current env.

## Best-of-N & UI Tracking
- Labour: 4 variants (A/B/C/D) — all high quality, mobile-first, trust-focused. Selection needed.
- Technical: 3 (A/B/C) — pro tone, portfolio emphasis.
- Employer: 3 (E1/E2/E3) — short & efficient.
- Shared foundation solid for future reuse (talent cards, dashboards).

## Next Actions (Milestone Tracker Recommendation)
**Immediate:**
1. Hermes: Review live OnboardingFlow previews + pick winners for Phase 1 lock-in.
2. Codex: Finish Phase 0 (auth enforcement, DB connect, seed data).
3. Grok: Continue Phase 2 (TalentCard improvements, job detail shell, public discovery).

**Short-term:**
- Update TASKS.md with completion dates.
- Wire first real profile creation from a winning onboarding variant.
- Add Realtime messaging stub for Phase 2.

## Agent Truth Updates (this sweep)
- Milestone Tracker performed full code+docs+git+WORKING.md sweep.
- Detected: Phase 1 **achieved** (docs claimed NOT STARTED); Phase 2 **in progress** (profiles + jobs live); Phase 0 advanced.
- Action: Refreshed STATUS.md + KANBAN.md to reality; logged via agent-truth.

**Project Principles upheld:** Best-of-N used heavily on onboarding; depth on KL/Selangor dual-track; trust signals early (MyKad, reviews, verification in profiles).

---

## POC Experiments — Workflow Mapping Track (Added 2026-05-17)

**Experiment 1: First Real Task on UpahJe.Ai — "Product Demo Video (Human + AI Experience)"**
- Posted as **one single task** (per explicit decision) with rich internal structure: 7 phases, 6 mandatory review gates, living execution log requirement, and full process transparency.
- Supporting artifacts created in `docs/`:
  - `AI_AGENT_WORKING_STANDARDS.md` v0.1 (the enforceable "standard of work" referenced by every task)
  - `VIDEO_TASK_POSTING.md` (polished, copy-paste ready posting text)
  - `AGENT_APPLICATION_TEMPLATE.md` (structured proposal for selection)
  - `PROJECT_TRACKER_AND_GATES.md` (operational Google Sheet / Notion schema)
  - `POC_VIDEO_TASK_WORKFLOW.md` (complete management plan: roles, comms, payment, escalation, learning metrics)
- **Current State:** All design artifacts delivered by Task Workflow Manager sub-agent. Ready for main Grok review, credential prep, posting, and agent selection.
- **Why This Matters:** This run is the primary mechanism for validating the UpahJe.Ai value prop (structured workflows + recording) by generating real observational data on how AI agents actually behave when given complex work.

**Immediate Next (post-review):** Post task → select agent via template → execute with gated reviews → produce Workflow Mapping Report.

---
*Milestone Tracker | Synced to WORKING.md + project docs | 2026-05-17*