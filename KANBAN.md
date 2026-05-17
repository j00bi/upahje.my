# UpahJe.my — Kanban Board

**Last Updated:** 2026-05-17 (Milestone Tracker — reality-aligned sweep from code, git log, WORKING.md agent-truth, OnboardingFlow, app routes, lib/*)

**Focus:** Phase 1 Complete (Best-of-N delivered). Phase 0 advanced. Phase 2 foundations live. Hermes to select winners.

---

## 🔴 To Do (High Priority)

### Phase 0 — Foundation (Codex lead)
- [ ] Configure real Supabase project + populate .env (URL, keys, DATABASE_URL)
- [ ] Run Prisma migrations + seed (Talent/Employer/Category data)
- [ ] Enforce protected routes in middleware.ts (currently passthrough)
- [ ] Wire NextAuth callbacks → create User + Profile + Talent/Employer on signup
- [ ] Full sign-up flow + dashboard personalization (remove demo shells)
- [ ] Install shadcn/ui or formalize current glassmorphism design system (optional)

### Phase 1 — Onboarding (Best-of-N) — Selection & Lock-in
- [ ] **Hermes decision:** Pick winning Labour variant (A/B/C/D), Technical (A/B/C), Employer (E1/E2/E3)
- [ ] Move non-winners to `/variants/` or archive branch
- [ ] Wire winning variant(s) to real Prisma/Supabase `createProfile` mutation
- [ ] Remove Best-of-N preview switcher from production OnboardingFlow (keep for future experiments)
- [ ] Polish: MyKad real upload + validation, rate input consistency

### Phase 2 — Core Marketplace (immediate next)
- [ ] In-app messaging (Supabase Realtime channels between Talent ↔ Employer)
- [ ] Full Job detail page + "Hubungi Talent" flow (currently placeholder + matches page)
- [ ] Replace mocks: lib/mockJobs.ts + mockTalents.ts → live queries + filters
- [ ] Talent discovery / search page (list of public profiles, not just /[slug])
- [ ] Employer job posting form wired to DB + auto-matching trigger
- [ ] Job matches results UI polish + basic scoring display

---

## 🟡 In Progress

### Current Active Work
| Task | Agent | Reality Status | Notes |
|------|-------|----------------|-------|
| Phase 0 Auth + Prisma wiring | Codex | Partial (schema + client + auth lib present; enforcement + envs missing) | Recent edits to lib/auth.ts + middleware.ts (dirty) |
| Task 1.4 Shared Components adoption | Grok | ✅ COMPLETE | CategoryPicker (BOTH support), RateTierSelector, TalentProfilePreview adopted in Labour + Employer. See WORKING.md 14:48 |
| Phase 2 Job Board + Matching | Codex | Live demo (filters, cards, matches sub-route) | Recent commits: "feat: Create basic Job Board...", "feat: Add talent matching results..." + untracked mockTalents + jobs/[jobId] |
| Phase 2 Public Talent Profiles | Grok | ✅ Functional demo | /talent/[slug] using shared preview + trust + reviews + CTA. Foundation for marketplace |
| UI Lane discipline + nudges | Grok Nudger | Active | Spawned; first nudge delivered on Task 1.4 + docs freshness |
| Milestone tracking + doc sync | Milestone Tracker | Active (this update) | Full sweep; STATUS + KANBAN refreshed to actual shipped state |

### Best-of-N Variants (All Shipped — Preview Mode)
**Labour (Task 1.1 — 4 versions, all in OnboardingFlow):**
- A Stepper, B Cards, C Chat, D Hybrid — live selectable previews

**Technical (Task 1.2 — 3 versions):**
- A Stepper, B Showcase, C ProForm+Sidebar — live

**Employer (Task 1.3 — 3 versions):**
- E1 Simple, E2 Visual, E3 PostFirst — live

**Shared (Task 1.4):** CategoryPicker extended + adopted across flows. Ready for winner.

**Note:** All variants collect required fields, mobile-first, include trust copy. No winner selected yet.

---

## 🟢 Done

### Foundation & Setup
- [x] Repo init + Next.js 16 + TS + Tailwind + AGENTS.md + TASKS.md + initial STATUS/KANBAN
- [x] Prisma schema (User/Profile/Talent/Employer/Job/Review/Category + Track/Role enums)
- [x] Supabase client + NextAuth (Google/Email, optional creds)
- [x] Protected app layout + dashboard shells (employer + links)
- [x] lib/domain.ts (LABOUR_CATEGORIES + TECHNICAL_CATEGORIES + rate tiers + certs)

### Phase 1 Onboarding — Fully Delivered
- [x] Labour Best-of-N 4 variants (Stepper/Cards/Chat/Hybrid) + live preview
- [x] Technical Best-of-N 3 variants (Stepper/Showcase/ProForm)
- [x] Employer Best-of-N 3 variants (Simple/Visual/PostFirst)
- [x] Shared components: CategoryPicker (BOTH), RateTierSelector, TalentProfilePreview, Role/Track selectors, MyKadUpload
- [x] OnboardingFlow.tsx with 3-step role→track→profile + variant switchers (excellent for evaluation)
- [x] All agent-truth logged in WORKING.md (Grok multiple "done" for 1.1–1.4)

### Phase 2 Early Wins
- [x] Public Talent Profile page (`/talent/[slug]`) with full preview, trust, reviews, CTA
- [x] Job Board (`/jobs`) with track/category/location/search filters + JobCard
- [x] Basic matching scorer (`lib/matching.ts`)
- [x] Talent matching results page + supporting mocks (recent Codex)
- [x] TalentCard component + JobPostForm

### Agent Infrastructure
- [x] Multi-agent setup (Hermes/Codex/Grok + sub-agents: Milestone Tracker, Grok Nudger)
- [x] agent-truth protocol + WORKING.md sync (memory-wiki)
- [x] Sub-agent spawning for continuous tracking + accountability

---

## 📋 Backlog (Later Phases)

### Phase 2 Completion
- Real-time messaging
- Advanced matching (Layer 2+)
- Notifications, saved searches

### Phase 3: Trust & Payments
- MyKad verification flow (beyond upload)
- Billplz FPX + escrow-lite
- Two-way reviews (beyond demo)
- Dispute resolution
- KYC tiers enforcement

### Future
- PWA enhancements
- KL/Selangor geo focus
- Mobile apps (post PMF)

---

## Notes & Protocols
- **Best-of-N Rule:** Used successfully on all onboarding. Now apply to job cards, matching UI, messaging if ambiguity arises.
- **Git Hygiene:** Preserve unrelated dirty work (current: onboarding adoption files, auth/middleware, new job matches + mocks, nudger md). Commit UI + backend separately.
- **Truth Updates:** Every agent runs `agent-truth "Name" "done|started|..." "/path" "summary; next"` after work, then commits in `/home/husni/memory-wiki`.
- **Docs Sync:** STATUS.md + KANBAN.md now match shipped reality (previously frozen at kickoff). Tracker will re-sweep periodically.
- **Current Focus (post this update):** Winner selection (Hermes), Phase 0 completion (Codex), Phase 2 data wiring + messaging (team).

**Milestone Tracker Note:** Previous KANBAN claimed "Phase 1 NOT STARTED" and "Shared picker todo" — contradicted by code (OnboardingFlow + 10+ components + WORKING.md log). Now accurate.

---
*Maintained by Milestone Tracker sub-agent | Read WORKING.md first | Use agent-truth on changes*