# UpahJe.my — PR Review Checklist

**Reviewer:** Hermes (or delegate)  
**Purpose:** Maintain high quality and consistency across all agents (Codex, Grok, etc.)

---

## Pre-Review Checks

- [ ] PR title follows format: `[Agent] Short description`
- [ ] PR has clear description of what was done and why
- [ ] Linked to task in `TASKS.md` or KANBAN
- [ ] Branch name is descriptive (`feature/xxx` or `fix/xxx`)

---

## Code Quality

- [ ] Code is clean, readable, and well-commented where needed
- [ ] No obvious duplication or over-engineering
- [ ] Uses existing patterns from the codebase (check AGENTS.md)
- [ ] TypeScript types are properly defined (no `any` abuse)
- [ ] No console.logs or debug code left in

---

## Best-of-N Consideration (When Applicable)

- [ ] If this was a Best-of-N task, all N versions are present and clearly labeled
- [ ] Rationale for each version is included
- [ ] The chosen version is well justified

---

## Architecture & Alignment

- [ ] Changes align with decisions in `AGENTS.md` and strategy docs
- [ ] Follows dual-track (Labour + Technical) structure where relevant
- [ ] Mobile-first / PWA considerations applied (if UI)
- [ ] No major deviations from the planned tech stack

---

## Testing & Verification

- [ ] Manual testing was done (especially for onboarding, payments, matching)
- [ ] No obvious bugs in happy path
- [ ] Edge cases considered (e.g. Labour vs Technical differences)

---

## Documentation & Tracking

- [ ] `agent-truth` was run and committed after the work
- [ ] KANBAN.md / STATUS.md updated if needed
- [ ] Any new components or patterns documented briefly

---

## Security & Trust (Important for UpahJe)

- [ ] No sensitive data exposed
- [ ] MyKad / KYC flows handled carefully (if applicable)
- [ ] Payment-related code is cautious and well-isolated

---

## Final Decision

**Options:**
- **Approve & Merge** — Ready to go
- **Approve with Minor Patches** — Small fixes assigned back
- **Request Changes** — Major issues found, task reassigned with clear feedback

**Reviewer Notes:**

---

*Use this checklist on every PR. Consistency > speed.*

## Review token
The review routes read `REVIEW_TOKEN` from the environment, so a change to that variable only takes effect on the next deployment. Rotate it by updating the Vercel env var, then shipping any commit.
