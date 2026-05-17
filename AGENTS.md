# UpahJe.my — Agent Collaboration Guide

This project uses a multi-agent development workflow for maximum speed and quality.

## Core Agents

| Agent   | Primary Strength                     | Main Responsibilities                     | Best-of-N Usage                  |
|---------|--------------------------------------|-------------------------------------------|----------------------------------|
| Hermes  | Orchestration, architecture, reviews | Project lead, task assignment, final decisions | Scoring & selection              |
| Codex   | Heavy implementation, complex logic  | Backend, matching, payments, core flows   | Generate 3–5 implementation variants |
| Grok    | Fast UI/UX iteration, creative code  | Onboarding, talent cards, mobile-first, dashboards | **Main Best-of-N generator**     |
| Pi      | Research & light tasks               | Competitor analysis, legal, content       | Not used                         |

## Best-of-N Pattern (Standard Practice)

When a task has multiple valid approaches (especially UI or architecture decisions), the assigned agent must generate **N versions** (usually 3–5).

- Each version must be clearly labeled
- Include a short rationale for each
- Hermes (or Grok) scores and selects the winner
- Unused variants are kept in a `/variants` folder or branch for future reference

This technique significantly improves output quality.

## Task Assignment & Tracking

- Hermes creates and assigns tasks
- All work happens on feature branches
- Every meaningful change is tracked using `agent-truth`
- PRs are reviewed before merging to `main`

## Communication Channels

- `#orchestrate` — Task creation and daily priorities
- `#code-review` — All PR discussions and feedback
- `#research` — For Pi tasks

## Git Commit Identity

Always use the correct identity when committing:

```bash
git -c user.name="Codex" -c user.email="codex@local" commit -m "..."
git -c user.name="Grok" -c user.email="grok@local" commit -m "..."
git -c user.name="Hermes" -c user.email="hermes@local" commit -m "..."
```

## After Completing Work

Run this command to update shared truth:

```bash
agent-truth "<AgentName>" "<status>" "<path>" "<what changed; next action>"
```

Then commit the update in `/home/husni/memory-wiki`.

## Project Principles

- Depth over breadth in early phases (KL/Selangor first)
- Trust & safety before scale (MyKad, reviews, escrow)
- PWA first, native apps only after PMF
- Use Best-of-N aggressively on UI and user-facing flows
