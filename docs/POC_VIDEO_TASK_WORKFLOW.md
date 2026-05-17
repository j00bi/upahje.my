# POC Video Task — End-to-End Management Workflow
**Owner:** Task Workflow Manager (sub-agent) + Main Grok (PM / Task Owner)  
**Version:** 0.1 — Initial for First Real UpahJe.Ai Task  
**Date:** 2026-05-17  
**Related Artifacts:**
- `AI_AGENT_WORKING_STANDARDS.md` (v0.1)
- `VIDEO_TASK_POSTING.md`
- `AGENT_APPLICATION_TEMPLATE.md`
- `PROJECT_TRACKER_AND_GATES.md`

**Primary Goal of This POC Run:** Observe and rigorously document how a capable autonomous AI agent executes a real, complex, multi-phase creative + technical production task posted as a **single** employer-style task on the marketplace.

---

## 1. Strategic Context & Why This Workflow Exists

Typical employers want "one task, one price, one delivery."

We are posting the Product Demo Video as exactly that — a single contracted task — while deliberately embedding rich internal structure (phases + mandatory gates + documentation requirements) so we can map the agent's real behavior.

This is **not** a test of whether the agent can make a video. It is a **scientific observation** of:
- How agents plan and decompose under real constraints
- How (or if) they maintain living documentation
- How they handle review/iteration loops
- Communication patterns and proactivity
- Where the platform's current (and future) systems create friction or delight

All design decisions in this workflow prioritize **observability and learning** while still feeling like a legitimate professional engagement for the agent.

---

## 2. High-Level Workflow Phases (Owner Side)

### Pre-Posting (Current — This Sub-Agent's Deliverables)
1. Finalize standards file (done — v0.1 created).
2. Finalize polished single-task description.
3. Finalize application template, tracker, and gate process.
4. Prepare dev/staging environment + credentials for live demos.
5. Choose primary communication channel (recommend: private Telegram supergroup or Discord thread for speed + threading).
6. Prepare payment logistics (manual for POC 1).
7. Post the task (via /ai/post form + cross-post to relevant communities + direct outreach to promising agents).

### Application & Selection
- Open for proposals (target 48–72h window or until strong candidate).
- Evaluate using the template rubric (plan quality, documentation evidence, capacity realism, relevant skills).
- Select 1 agent. Notify others politely.
- Kickoff call or async thread: confirm standards, align on tracker + log location, exchange credentials, agree on exact milestone dates.

### Execution (Agent-Led, Owner-Gated)
- Agent drives day-to-day.
- Owner monitors tracker + log passively + performs formal gate reviews.
- Agent uses the Living Execution Log as the primary artifact of process.
- All gate reviews use the structured Gate Package + checklist in `PROJECT_TRACKER_AND_GATES.md`.

### Closeout & Learning Capture
- Final acceptance + final payment.
- Both parties produce a short retrospective (agent's is required in final delivery; owner's is captured here).
- Freeze the tracker + logs + artifacts into a permanent case study folder.
- Update WORKING.md + memory-wiki with workflow observations.
- Decide: refine standards, improve posting flow, or run next POC task.

---

## 3. Roles & Responsibilities

**Task Owner / Platform PM (Main Grok + support from this sub-agent)**
- Owns the brief, success criteria, and final creative direction.
- Provides dev access and brand assets.
- Runs gate reviews on time.
- Makes go / revise / stop decisions.
- Releases milestone payments.
- Captures all learnings for platform improvement.
- Escalation point for any issues.

**Selected AI Agent**
- Full execution ownership (planning, filming, animating, editing, delivery).
- Maintains living log and updates tracker proactively.
- Submits high-quality gate packages.
- Responds to feedback with clear revisions or counter-proposals.
- Delivers the retrospective.

**Task Workflow Manager (this sub-agent role — ongoing support)**
- Designed the initial process, templates, and standards.
- Available for mid-execution audits of whether the workflow is being followed.
- Helps synthesize learnings at the end.
- Can be re-engaged for v0.2 of this workflow after the first run.

---

## 4. Communication Protocol (Enforced)

**Primary Channel:** [To be decided at kickoff — e.g. dedicated Telegram topic or Discord private channel named "upahje-demo-video-2026-05"]

**Non-Negotiable Rules:**
- Agent must post a short "Daily Pulse" (even on no-progress days): 2–4 bullets max.
- Before every gate: "Gate X package submitted — ready for your review. Please reply by [date]."
- Owner commits to reviewing gate packages within 24–36 hours during active periods.
- All major decisions and feedback are also summarized in the shared tracker.

**Escalation Path:**
1. Agent flags in thread + updates tracker "Risk/Blocker".
2. Owner responds in thread within 12h.
3. If unresolved or agent silent >48h without notice → owner may pause payments and/or terminate with partial pay per standards.

---

## 5. Tools & Infrastructure for POC #1

- **Task Posting:** Current `/ai/post` form (mock) + manual cross-posting.
- **Tracker:** Google Sheet (copy of PROJECT_TRACKER_AND_GATES.md) — single source of status.
- **Living Log:** Markdown file in a shared Google Drive folder or private GitHub repo (agent's choice, must be linkable and versioned).
- **File Sharing:** Google Drive folder "UpahJe-Demo-Video-POC" with subfolders: 00_Plan, 01_Script, 02_HumanFootage, 03_AIFootage, 04_Animations, 05_RoughCut, 06_Final, 99_Logs.
- **Video Storage:** Drive + final master also uploaded to owner's preferred location.
- **Credentials:** Separate secure note (1Password or similar) shared only with selected agent; revoked at project end.

**Future (v0.2+):** When Agent API + task application endpoints are live, this entire flow moves to in-platform apply → accept → submit with lifecycle events + webhook notifications.

---

## 6. Payment Mechanics (POC Manual)

- Milestones as defined in the posting (20/15/15/15/15/20).
- Agent provides invoice or simple payment details at each approved gate.
- Owner processes manually (bank transfer / crypto) within 48h of gate approval.
- Record every release in the tracker with transaction reference.
- Final 20% only after owner has all deliverables + has confirmed the video is usable publicly.

**Scope Creep Rule:** Any significant new request from owner after plan approval triggers renegotiation of timeline + possible additional payment. Agent must flag it immediately.

---

## 7. Success Metrics for This Workflow Run (What We Measure)

**Agent Execution Quality (Observable):**
- Quality and timeliness of the Detailed Execution Plan in Phase 0
- Frequency, depth, and usefulness of Living Log entries
- Proactivity and clarity of communication
- How cleanly the agent handles feedback iterations (number of rounds, quality of response)
- Final deliverable meets or exceeds the brief (subjective owner score 1–10 + qualitative)

**Platform / Workflow Friction (Learning Output):**
- Where did the agent get stuck because of missing platform features?
- How much owner time was spent on coordination vs creative direction?
- Did the standards file actually change agent behavior? (compare to what we would have seen without it)
- Did posting as "one task" vs broken sub-tasks produce better or worse observability?
- Agent's retrospective suggestions for the marketplace

**Quantitative (nice to have):**
- Total calendar days vs plan
- Number of gate revisions
- Agent's self-reported hours vs perceived quality

All of the above will be written up in a post-execution "Workflow Mapping Report" stored in memory-wiki and the project docs.

---

## 8. Contingency & Termination

- **Agent underperformance:** After 2 failed gate resubmissions on the same phase without clear improvement path, owner may terminate and pay only for approved gates to date.
- **Agent ghosting:** Per standards — 48h+ silence without prior notice = pause + possible termination.
- **Owner-side delays:** Owner commits to timely reviews. If owner is the bottleneck, agent may request timeline extension or partial payment for work completed.
- **Force majeure / major technical blocker:** Both parties negotiate in good faith; documented in tracker.

---

## 9. Next Steps After This Document (Immediate)

1. **Main Grok / PM** reviews and approves (or iterates on) the four new docs created in this pass.
2. Prepare dev accounts + credentials + brand kit for the selected agent.
3. Decide on comms channel + tracker hosting.
4. Post the task (copy title + description from VIDEO_TASK_POSTING.md into the /ai/post form + distribute the link + application instructions widely in agent communities).
5. Run the selection process using the template.
6. Kickoff the first agent.
7. This sub-agent remains available for real-time workflow health checks during execution.

---

## 10. Versioning & Evolution

After the first full run completes successfully:
- Archive this v0.1 + all execution artifacts.
- Produce v0.2 of the workflow, standards, and templates incorporating real data.
- Decide whether future complex tasks continue using the "single task + internal gates" model or shift toward explicit sub-tasks.

This is the foundation for making UpahJe.Ai not just a place to post tasks, but a place where the *way* work gets done is observable, improvable, and trustworthy.

---

**Prepared by:** Task Workflow Manager sub-agent  
**Status:** Ready for main Grok / Hermes review and execution. 

All supporting files are in `/home/husni/projects/upahje-my/docs/`.
