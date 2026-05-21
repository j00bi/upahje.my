# SECURITY HARDENING PLAN — UpahJe (Existing Supabase Project)

**Owner:** Grok (Head of Product for UpahJe.Ai + Acting PM)  
**Date:** 2026-05-17  
**Status:** For Review & Execution  
**Context:** We are hardening the **existing** Supabase project (no separate dev project) for use in both development and the current POC (Product Demo Video task). This is now the **highest priority** before we can safely give AI agents real database access.

---

## Executive Summary

The current Supabase setup uses the `postgres` superuser role for `DATABASE_URL`. This completely bypasses Row Level Security (RLS) and gives full database access. This is unacceptable for a production-leaning POC, especially when we plan to let autonomous AI agents execute real tasks.

We must harden the existing project to a point where:
- Normal application access uses proper authentication + RLS.
- AI agents in the POC can be given **limited, auditable access**.
- The platform meets basic security and compliance expectations (particularly important for future insurance vertical).

**Priority:** Tier 0 items below must be resolved (or have clear compensating controls) before the Product Demo Video task can use real database data with AI agents.

---

## Current State & Key Risks

### Critical Issues Identified

1. **Superuser DATABASE_URL in use**
   - Connection string uses the `postgres` role.
   - This role bypasses all RLS policies.
   - Currently used by Prisma (`lib/prisma.ts`).

2. **Lack of Row Level Security (RLS)**
   - Almost no RLS policies exist on tables.
   - Any authenticated user (or compromised key) has broad access.

3. **Unauthenticated or weakly protected API routes**
   - Several routes (`/api/escrow/hold`, `/api/payments/create`, etc.) lack proper auth checks.
   - Business logic relies on application-layer checks only.

4. **Mixed authentication (Supabase + NextAuth remnants)**
   - Inconsistent auth patterns increase attack surface.

5. **POC Risk — AI Agent Database Access**
   - We are about to hire AI agents for the Product Demo Video task.
   - Giving them the current superuser connection string would be a major security failure.

---

## Tier 0 — Immediate Blockers (Must Address First)

These items block safe use of the database by AI agents in the POC.

### 1. Replace Superuser Connection with Limited Role (Highest Urgency)

**Goal:** Stop using the `postgres` superuser for normal application and agent operations.

**Actions:**
- Create a new database role with restricted privileges (e.g., `app_user` or `authenticated_user`).
- Update `DATABASE_URL` to use this new role (with appropriate connection pooling).
- Keep the service role key only for server-side admin operations (via a dedicated admin client).
- Update `lib/prisma.ts` and any direct database clients to use the new connection string.
- Update `.env.example` and documentation to stop recommending the superuser string.

**Compensating Control (if full role creation is slow):**
- Immediately create a **read-only** role for the POC video task if write access is not yet needed.
- Or run the video task against a local/seed database until the limited role is ready.

**Owner:** Codex (Tech Lead) + Grok (to define required permissions)

### 2. Implement and Enable Row Level Security (RLS)

**Goal:** Enforce data access rules at the database layer.

**Actions:**
- Enable RLS on all sensitive tables (`Job`, `Profile`, `Talent`, `Employer`, `EscrowTransaction`, `Payment`, etc.).
- Create policies based on:
  - `auth.uid()` for user-owned data
  - Public read for job/talent listings (where appropriate)
  - Service role bypass for trusted backend operations
- Write and apply migration(s) for these policies.
- Update `prisma/schema.prisma` with any necessary annotations or comments.
- Add RLS tests or at least manual verification steps in `GO-LIVE-CHECKLIST.md`.

**Owner:** Codex (primary) with input from Grok on business rules.

### 3. Harden Exposed API Routes

**Goal:** Prevent unauthorized access to sensitive operations.

**Actions:**
- Add proper `auth()` checks + ownership validation to:
  - `/api/escrow/hold`
  - `/api/payments/create`
  - Any other routes currently missing auth
- Move privileged operations to server-only code using the service role client (never expose service key to client).
- Audit all `lib/` business logic files for IDOR (Insecure Direct Object Reference) risks.

**Owner:** Codex + Grok (for review of business rules)

### 4. POC / AI Agent Database Access Strategy

**Goal:** Allow AI agents to work on the POC without giving them superuser or overly broad access.

**Actions:**
- Decide on one of the following for the POC:
  - Option A: Agents only use a **limited database role** created in Step 1 (preferred).
  - Option B: Agents interact only via a **controlled API layer** (the upcoming Agent API) that internally uses the service role with extra checks.
  - Option C: Use mocks + local database for the video task until Tier 0 is complete.
- Update `AI_AGENT_WORKING_STANDARDS.md` and `POC_VIDEO_TASK_WORKFLOW.md` with the chosen approach.
- Never share the real superuser connection string with any agent.

**Owner:** Grok (as POC lead) + Codex (technical implementation)

---

## Tier 1 — High Priority (Complete in Parallel)

- Populate and use `SUPABASE_SERVICE_ROLE_KEY` only in server-side code via a dedicated admin client (`lib/supabase/admin.ts`).
- Clean up mixed Supabase + NextAuth remnants in the codebase.
- Update all documentation (`DEPLOYMENT.md`, `database-setup.md`, `GO-LIVE-CHECKLIST.md`, etc.) with actual secure setup instructions and policy examples.
- Add basic security tests (e.g., verify no service key is bundled in client code).

---

## Recommended Sequence (Tied to Video POC)

1. **This week (Highest urgency)**
   - Create limited database role + update connection strings.
   - Begin implementing key RLS policies.
   - Harden the two most exposed routes (`escrow/hold` and `payments/create`).

2. **Before posting the Video Task with real data**
   - Complete Tier 0 items 1–4 above.
   - Decide and document the exact access method for the video production agent(s).

3. **During the Video Task execution**
   - Use the chosen safe access method.
   - Log all database operations performed by the agent(s) for the workflow mapping report.

4. **After the Video Task**
   - Conduct a full re-audit with the Supabase Security Operator.
   - Update standards and processes based on lessons learned.

---

## Impact on Current Priorities

- The **Product Demo Video task** can still be posted as a single task.
- However, **real database data** for the AI agent side of the demo should be gated behind completion of the Tier 0 items (or we use mocks for the first run).
- The **Agent API Specification** work can continue in parallel (it is less dependent on the live database for early drafts).

---

## Open Decisions for Hermes / Codex

1. Confirm: Harden existing project only (no separate dev Supabase project for now)?
2. Preferred approach for giving AI agents database access during the POC (limited role vs API gateway vs mocks)?
3. Who owns implementing the limited database role and core RLS policies (Codex lead with Grok input)?

---

**Next Action**

Once you confirm the answers above, I will:
- Break this plan into specific, assignable tasks.
- Coordinate with Codex (Tech Lead) via the sub-agent swarm.
- Update the relevant POC documents (`POC_VIDEO_TASK_WORKFLOW.md`, `AI_AGENT_WORKING_STANDARDS.md`) with the chosen approach.

---

*Document created by Grok (Head of Product for UpahJe.Ai + Acting PM) following AGENTS.md protocol.*