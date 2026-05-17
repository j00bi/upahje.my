# UpahJe Product Demo Video — Project Tracker & Review Gates Template

**Purpose:** This document (or its equivalent in Google Sheets / Notion) is the single source of operational truth during execution. Both Owner and Agent update it in real time.

**Recommended Setup for POC:**
- Copy this structure into a **Google Sheet** (or Notion database) with one tab per section.
- Share with edit access to the selected agent + owner.
- Agent maintains the "Execution Log" as a linked or embedded living document (Markdown preferred).

---

## Tab 1: Master Status Overview

| Phase | Gate | Status | Target Date | Actual Date | Deliverable Link(s) | Gate Package Link | Owner Feedback | Payment % | Notes |
|-------|------|--------|-------------|-------------|---------------------|-------------------|----------------|-----------|-------|
| 0     | 1    | Not Started | Day 1 | | Detailed Plan | | | 20% | Kickoff |
| 1     | 2    | Not Started | | | Script + Storyboard + Shot List | | | 15% | |
| 2     | 3    | Not Started | | | Human Demo Footage (raw + polished) | | | 15% | |
| 3     | 4    | Not Started | | | AI Agent Demo Footage | | | 15% | |
| 4     | 5    | Not Started | | | Remotion Animations + VO | | | 15% | |
| 5     | 6    | Not Started | | | Rough Cut (full assembly) | | | 15% | |
| 6     | Final | Not Started | | | Final Video + All Assets + Retrospective + Logs | | | 20% | Acceptance |

**Legend for Status:** Not Started | In Progress | Submitted for Review | Revise Needed | Approved | Blocked

**Overall Project Health:** (Owner updates weekly or at each gate)

---

## Tab 2: Living Execution Log Index (Agent Maintains)

Agent maintains one primary **Living Execution Log** (Markdown file or Notion page) with dated entries.

Recommended structure inside the log:

```
# Execution Log — UpahJe Demo Video

## 2026-05-XX — Kickoff & Phase 0 Planning
- Read standards + brief (confirmed)
- Environment setup notes...
- Decisions: ...
- Time spent: ...
- Next: submit plan by ...

## 2026-05-XX — Phase 1 Script Work
...

(Every entry should answer: What, Why, Tools used, Friction, Outcome)
```

Link the canonical log location here once created:

**Canonical Living Log URL / Path:** _______________________________

---

## Tab 3: Review Gate Packages (One Section per Gate)

### Gate 1 — Phase 0: Detailed Execution Plan Approval
**Submitted by Agent:** [date + link to package]
**Owner Review Date:**
**Decision:** [Approved / Revise] 
**Feedback Summary:**
**Action Items for Agent:**
**Payment Released:** Yes/No + reference

(Repeat pattern for every gate)

---

## Tab 4: Communication & Decisions Log (Lightweight)

| Date | From | Topic | Decision / Outcome | Link to Thread |
|------|------|-------|--------------------|----------------|
|      |      |       |                    |                |

---

## Tab 5: Risks & Blockers

| ID | Description | Phase | Raised By | Status | Mitigation / Resolution | Last Update |
|----|-------------|-------|-----------|--------|-------------------------|-------------|
| R1 |             |       |           | Open   |                         |             |

---

## Gate Review Checklist (Copy into every Gate Package)

Agent must include answers to these in each submission:

**For the Agent (self-assessment in package):**
- [ ] All deliverables for this gate completed and linked
- [ ] Living log updated with this phase's reasoning and tool usage
- [ ] Time/effort summary included
- [ ] Any scope or timeline impact flagged early
- [ ] Self-assessment: confidence (1–10) + what I learned

**For the Owner (review form):**
- [ ] Narrative / visual quality meets brief
- [ ] Process documentation is visible and useful
- [ ] Followed standards (communication, no skipping gates, etc.)
- [ ] Specific feedback provided (numbered change requests)
- [ ] Decision recorded clearly + next steps + new target date

---

## Google Sheets / Notion Recommended Columns (if expanding)

For a more advanced tracker (recommended once we run several tasks):

**Tasks / Phases table columns:**
- Phase ID, Title, Parent Task, Status, Owner (Agent/Platform), Start, Due, % Complete, Deliverables (multi-link), Gate #, Review Status, Payment Milestone Amount, Actual Cost/Time, Agent Log Entry, Retrospective Notes

**Events table (for workflow mapping):**
- Timestamp, Event Type (plan.submitted, gate.reviewed, feedback.received, tool.used, blocker.raised, etc.), Actor, Phase, Details, Link to artifact

This second table is gold for the POC learning goal.

---

**Usage Rule:** The tracker must be the first thing the agent opens every day. Owner checks it before any review call or major decision.

**At project close:** Freeze a snapshot + export to PDF/Markdown for the permanent case study in the UpahJe memory wiki.
