# UpahJe.my — Initial Task Breakdown (Best-of-N Focus)

Status: Project kickoff — Week 0

## Phase 0: Foundation (This Week)

**Owner:** Hermes (coordination) + Codex (implementation)

- [ ] Initialize full Next.js 14 + TypeScript + Tailwind + shadcn/ui + Prisma + Supabase
- [ ] Set up Supabase project, auth, and first schema migrations
- [ ] Create `lib/supabase` and `prisma/schema.prisma` with core models (User, Profile, Talent, Employer, Job, Review)
- [ ] Configure NextAuth.js with Google + Email
- [ ] Set up folder structure and shared types

**Verification:** Can sign up and see a protected dashboard.

---

## Phase 1: Onboarding System (Best-of-N Priority)

**Owner:** Grok (primary) + Codex (integration support)

### Task 1.1 — Labour Onboarding Flow (Best-of-N)

**Best-of-N: 4 versions required**

Grok must produce **4 distinct versions** of the Labour talent onboarding flow:

1. **Version A** — Stepper (traditional wizard, 6–7 steps)
2. **Version B** — Card-based progressive disclosure (more visual, fewer steps)
3. **Version C** — Chat-style conversational onboarding
4. **Version D** — Hybrid (quick start + deep profile later)

**Requirements for all versions:**
- Collect: name, phone, MyKad upload, location, categories (multi-select from 10 Labour categories), rate, availability, bio
- Include trust/safety micro-copy
- Mobile-first design
- Clear progress indicator

**Deliverable:** 4 separate components in `/components/onboarding/labour/` + short rationale for each.

**Selection:** Hermes + Grok will pick the winner by end of task.

### Task 1.2 — Technical Talent Onboarding

**Best-of-N: 3 versions**

- Focus on portfolio links, skills (multi-select), rate tiers, certifications
- Must feel professional but not overwhelming

### Task 1.3 — Employer Onboarding

**Best-of-N: 3 versions**

- Much shorter flow (3–4 steps max)
- Focus on company name, hiring needs, and preferred categories

### Task 1.4 — Shared Components

- Role selector (Employer vs Talent)
- Track toggle (Labour vs Technical)
- Category picker components (reusable)
- Progress bar / stepper

**After selection:** Winning versions are integrated into the main app. Losers moved to `/variants`.

---

## Phase 2: Core Marketplace (Next 2 Weeks)

- [ ] Talent public profile page (with trust signals)
- [ ] Cari Upah job board (post + list)
- [ ] Basic matching scorer (Layer 1 – deterministic)
- [ ] In-app messaging (Supabase Realtime)
- [ ] Job detail + "Hubungi Talent" flow

---

## Phase 3: Trust & Payments (Critical)

- [ ] Billplz FPX integration + escrow-lite
- [ ] MyKad verification flow (Labour)
- [ ] Two-way review system
- [ ] Basic dispute flow

---

## Notes for Agents

- Always read `AGENTS.md` before starting work
- Use Best-of-N on any UI-heavy or high-ambiguity task
- Update `agent-truth` after every completed task
- Keep branches small and focused

**Current Focus:** Get Phase 0 + Task 1.1 (Labour Onboarding Best-of-N) done first.

---
*Last updated: Hermes — Project kickoff*