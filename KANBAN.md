# UpahJe.my — Kanban Board

**Last Updated:** Hermes (orchestrator)

---

## 🔴 To Do

### Phase 0 — Foundation
- [ ] Install dependencies (Prisma, Supabase, NextAuth, shadcn/ui)
- [ ] Create Supabase project + get credentials
- [ ] Set up Prisma schema with core models
- [ ] Configure NextAuth.js (Google + Email)
- [ ] Basic protected route + dashboard layout

### Phase 1 — Onboarding (Best-of-N)
- [x] **Grok:** Labour Onboarding — 4 versions (Best-of-N) ✅ live preview
- [ ] **Grok (sub-agent):** Technical Talent Onboarding — 3 versions (in parallel)
- [x] **Grok:** Employer Onboarding — 3 versions (Best-of-N) ✅ live preview
- [ ] Shared category picker + role selector components

---

## 🟡 In Progress

### Current Assignments

| Task | Agent | Status | Branch | Started |
|------|-------|--------|--------|---------|
| Phase 0 Foundation (Supabase + Prisma + Auth) | Codex | Not started | `foundation/supabase-prisma-auth` | - |
| Labour Onboarding Best-of-N (4 versions) | Grok | ✅ Done (live in flow) | `onboarding/labour-best-of-n` | - |
| Employer Onboarding Best-of-N (3 versions) | Grok | ✅ Done (live in flow) | - | - |
| Technical Talent Onboarding Best-of-N (3 versions) | Grok (sub-agent) | In Progress (parallel) | - | - |

---

## 🟢 Done

- [x] Project repo initialized (`/home/husni/projects/upahje-my`)
- [x] Next.js 14 base created
- [x] `AGENTS.md` created (multi-agent rules + Best-of-N)
- [x] `TASKS.md` created (initial breakdown)
- [x] `STATUS.md` created by tracker agent
- [x] Sub-agent spawned for continuous tracking

---

## 📋 Backlog (Later Phases)

### Phase 2 — Core Marketplace
- Talent public profile page
- Cari Upah job board
- Basic matching scorer (Layer 1)
- In-app messaging

### Phase 3 — Trust & Payments
- Billplz FPX + escrow
- MyKad verification
- Two-way review system
- Dispute flow

---

## Notes

- Use **Best-of-N** on all UI-heavy tasks
- Update this board after every task completion
- All agents must run `agent-truth` after finishing work
- PRs go through `#code-review` channel

**Current Focus:** Get Phase 0 + Labour Best-of-N started in parallel.
