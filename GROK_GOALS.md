# GROK_GOALS.md

**Owner:** Goal Agent (Grok's dedicated Hermes / goal definer for the UI/UX lane)  
**For:** Main Grok instance operating in sustained UI/UX + Best-of-N mode on UpahJe.my  
**Location:** `/home/husni/projects/upahje-my/GROK_GOALS.md` (living document)  
**Last Updated:** 2026-05-17 (initial creation after full assessment + sub-agent reports)  
**Permanent Lane:** UI/UX surfaces that benefit from Best-of-N exploration + tasteful, mobile-first, trust-forward Malaysian marketplace design. Focus areas: onboarding flows, public talent profiles & cards, job discovery, employer/talent dashboards, shared components.

---

## Current Turn Goal

**"Unblock Hermes + Ignite Marketplace Discovery Surface"**

**Primary Objective:**  
Close the loop on Phase 1 Best-of-N delivery so Hermes can immediately select production winners, then deliver high-signal polish on the public-facing talent discovery layer (`/talent/[slug]` + `TalentCard`) that will power all future marketplace experiences.

This is the single highest-leverage turn for Grok right now.

---

## Top 3 Priorities (Ranked by Leverage)

1. **Winner Selection Surface (Critical Path — Highest Leverage)**  
   Make the full Best-of-N (Labour 4 + Technical 3 + Employer 3) instantly scannable and decision-ready for Hermes.  
   - Enhance or augment `OnboardingFlow.tsx` (or add a lightweight adjacent "Evaluation Hub" view) with clear variant rationales, key strengths/weaknesses, mobile-first notes, and an explicit "Hermes: declare winners" call-to-action + summary table.  
   - Goal: Hermes (or user acting as) can review once and lock in the Labour/Technical/Employer winners without friction.  
   - Output: Obvious next step in the UI or a crisp summary section that can be referenced in truth updates.

2. **Deepen & Production-Harden Public Talent Profile (`/talent/[slug]`)**  
   Transform the existing strong foundation into a compelling, trustworthy, mobile-perfect experience that feels like a real marketplace.  
   - Richer trust/availability/CTA (sticky "Hubungi Talent" that feels actionable even in demo — modal or toast flow).  
   - Expand "Similar Talents" section using the improved `TalentCard` primitive (remove the current weak hardcoded stubs).  
   - Polish: better spacing/responsiveness on small screens, stronger visual hierarchy, rate/availability prominence, verified badge consistency with domain styles.  
   - Optional tasteful exploration: 1-2 lightweight profile presentation variants (e.g. "full" vs "compact employer view") if it clearly adds evaluation signal.

3. **Evolve TalentCard into a Rock-Solid Reusable Primitive + Seed Discovery**  
   Upgrade `components/talent/TalentCard.tsx` to match the quality bar of `TalentProfilePreview` (consistent track accents green/purple, category pills, hover/active states, verified + score display, proper truncation).  
   - Make it the default card used across profiles (similar section), job matches, future talent listings, and dashboards.  
   - Optionally deliver 2 lightweight Best-of-N card presentations (dense list vs featured hero) if justified by reuse needs.  
   - Seed real usage: integrate into the talent profile's similar-talents grid and/or a new minimal public `/talent` listing page stub.

**Explicit Out of Scope This Turn (to maintain completion bias):**  
- Full winner wiring to Prisma/Supabase or removal of preview switcher (that's post-Hermes decision).  
- Heavy dashboard Best-of-N or deep employer flows (Phase 2 later).  
- New onboarding variants or major refactors.  
- Payments or Phase 3 work (Codex lane).

---

## Definition of "Done" for This Turn

When this turn is complete, the following must be true:

- The OnboardingFlow (or dedicated evaluation surface) makes it *dead obvious* to Hermes what the 10 variants are, why each exists, and provides a clear path to declare the 3 winners.
- `/talent/[slug]` (Labour + Technical demos) is noticeably more polished, trustworthy, and mobile-excellent. The similar-talents area uses real `TalentCard` components.
- `TalentCard` is a production-grade, consistent primitive that can be dropped anywhere without shame.
- All work logged via `agent-truth` in `/home/husni/memory-wiki/WORKING.md`, with commits following the protocol.
- Git status respected before every edit; unrelated dirty work (auth, payments, etc.) preserved.
- Coordination visible: references to current Milestone Tracker assessment (Phase 1 ACHIEVED) and Accountability Pusher nudge (docs truthing completed first).
- A short "Turn Complete" update in this file + proposal for the *next* turn goal.

**Success Metric (qualitative):** Hermes can pick winners in < 10 minutes of review. An employer landing on a talent profile immediately feels "this is a serious, trustworthy platform."

---

## Rationale — Why This Focus *Right Now*

- **Phase 1 is complete in code** (confirmed by Milestone Tracker full sweep + multiple Grok "done" entries for Tasks 1.1–1.4 + recent CategoryPicker BOTH adoption). The only thing holding the project back from moving to "winners locked + real data" is visibility for Hermes decision.
- **Public profiles + cards are the marketplace's front door.** The `/talent/[slug]` page already exists and uses shared components — polishing it + its primitives has compounding returns across discovery, matches, and future dashboards.
- **Respects the sub-agent ecosystem:** Accountability Pusher explicitly directed "docs first, then deepen talent profiles or JobCard work." Milestone Tracker refreshed STATUS/KANBAN to reality on 2026-05-17. This goal directly follows their output.
- **Permanent lane alignment:** Best-of-N where it adds real value (winner surface + optional card/profile variants), mobile-first, tasteful design, shared components reuse.
- **From parent session memory + recent truth:** Sustained focus on "deepening the public talent profiles (`/talent/[slug]`), Talent Dashboard shell, better JobCard + job board patterns, Prepare the onboarding switcher for actual winner selection."

Doing anything else first (new shiny dashboards, more variants, polish on already-good shells) would be drift.

---

## Coordination with Other Sub-Agents

- **Milestone Tracker (ID: 019e34b2-7243-7e50-85a2-1279cf305629):** This goal keeps Phase 2 momentum while explicitly surfacing the pending Hermes decision. Will request periodic status checks if new milestones shift.
- **Grok Accountability Pusher / Nudger (ID: 019e34b2-933c-7331-bd2d-b46d2dc9d0ba):** Strictly follows the "no new code until docs truth" rule (already satisfied by their prior work + Milestone updates). Future nudges will be incorporated into turn goals.
- **Main Grok + Hermes:** This file is the contract. When main Grok finishes a priority or turn, it should hand back to the Goal Agent (or update this file) so the next turn is proactively defined instead of drifting.

---

## Next Turn Preview (Tentative)

After Hermes winner selection lands:

- "Winner Lock-in + First Real Profile Creation Flow" (wire the chosen Labour/Technical/Employer variant to Prisma/Supabase demo writes, remove preview switcher from prod path, keep it for future experiments).
- Or parallel: "Job Detail + Contact Experience" (strong CTA from profiles into real-feeling job match/contact).

The Goal Agent will refine this the moment the current turn completes or new realities emerge.

---

**Process Reminder (for all agents):**  
Read this file at the start of any Grok UI turn. Update it decisively when priorities shift or a turn completes. Always pair file changes with `agent-truth` + memory-wiki commit.

This is the single source of truth for "what the main Grok should be executing on in the UI lane right now."

— Goal Agent (spawned on user directive to define Grok's turn goals like Hermes defines the project's)
