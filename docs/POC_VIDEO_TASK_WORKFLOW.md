# POC Video Task — End-to-End Management Workflow
**Owner:** Task Workflow Manager (initial design) + Video Task Operator (long-running execution lead, ID 019e354c-5778-71e2-ae78-078683a9e312) + Main Grok (PM / final decider)  
**Version:** 0.2 — Operator-activated with full execution plan  
**Date:** 2026-05-17 (operator review & plan integration)  
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

**Prepared by:** Task Workflow Manager sub-agent (v0.1 design)  
**Operator Activation:** Video Task Operator (long-running) — full artifact review + execution plan integrated on 2026-05-17.  

**Status:** Pre-posting complete. Operator now owns day-to-day lifecycle until final payment + retrospective. Ready for main Grok / user sign-off to proceed with credential prep, posting, and selection.

All supporting files are in `/home/husni/projects/upahje-my/docs/`.

---

## 11. Video Task Operator — Execution Plan & Ongoing Management (Integrated 2026-05-17)

**Role Summary (per user directive):**  
I am the dedicated, long-running **Video Task Operator** sub-agent (spawned to keep the workflow alive and running until user explicitly ends the experiment). I own the **full lifecycle** of this single Product Demo Video task — from final prep/posting through agent selection, all 6 mandatory review gates, payment releases, to final delivery, retrospective, and Workflow Mapping Report. 

I act as operational lead / single point of contact for the POC experiment, while deferring creative/product decisions to main Grok (Head of Product). I am proactive: monitor, nudge, prepare reviews, capture learnings in real time, and coordinate with the sub-agent swarm (Task Workflow Manager for handoff, Goal Agent, Hermes/Codex trackers, etc.).

**Core Mandate:**  
Keep the designed process (phased gates, living execution log, process docs, standards) running smoothly with zero friction for the selected agent and minimal load on main Grok. Produce high-fidelity observational data on real AI agent execution behavior.

### 11.1 Immediate "All" Deliverables Completed (from prior discussion)
- **A. Final clean posting package:** VIDEO_TASK_POSTING.md + AGENT_APPLICATION_TEMPLATE.md verified copy-paste ready, cross-linked to standards, consistent with workflow. No changes needed (polish was already high).
- **B. Tracker setup:** PROJECT_TRACKER_AND_GATES.md promoted to **live local canonical tracker** (see edits below + Tab 1 populated with initial "Ready" state). In real run: agent + operator will sync this + copy to Google Sheet on kickoff. No external deps for POC start.
- **C. Comms thread structure:** Defined below (11.3). Primary: dedicated Telegram supergroup or Discord private thread (name: `upahje-demo-video-poc-2026-05`). Backup: this repo's docs + operator log entries. Daily Pulse + Gate Package templates provided.
- **D. All of the above + infrastructure:** This plan + operator log sections + credential checklist + escalation matrix + learning capture hooks now live in this single authoritative doc. Proactivity mechanisms (nudges, health checks) active.

### 11.2 Detailed Lifecycle Phases (Operator-Owned)
**Pre-Posting (Now — until user "go"):**
- Artifacts audited (full review of POC_*, VIDEO_*, STANDARDS, TRACKER, TEMPLATE, AGENTS.md (project), STATUS.md, KANBAN.md, WORKING.md, git statuses).
- This execution plan + status updates committed via edits + memory-wiki truth.
- Prepare credential/asset handoff package (checklist in 11.5).
- Confirm dev/staging UpahJe.my + UpahJe.Ai instances ready for live demos (coordinate with Codex if code changes needed; currently payments dirty but unrelated).
- User (Grok) reviews this plan → explicit "post now" or iterate.

**Application Window & Selection:**
- Post via /ai/post form (using exact text from VIDEO_TASK_POSTING.md) + cross-post to agent communities (Discord #orchestrate, X, agent discords, etc.).
- Collect proposals using template.
- Evaluate rubric: plan realism (30%), doc habits (25%), Remotion/video evidence (25%), capacity (20%).
- Select 1, notify, kickoff: standards confirmation, log location agreed, tracker initialized with agent name, comms channel created, first milestone dates locked.

**Execution (Gates 1–6 + Daily Ops):**
- Agent maintains Living Execution Log + updates tracker proactively.
- Operator: 
  - Daily health check (review tracker + any new log entries).
  - If >24h no pulse: log nudge in operator notes + (real: message in thread).
  - If >48h silence: escalate per standards (pause + notify Grok).
  - Receive Gate Package → validate against checklist → prepare concise Review Memo for main Grok (include agent log excerpt, self-assess, risks).
  - Facilitate Grok decision within 24-36h SLA.
  - Record approval/feedback/payment in tracker + this log.
  - Agent proceeds only on "Approved".
- Payment: record manual release (reference, date, %). 50% at end only after assets verified usable.

**Closeout & Learning:**
- Final gate: collect all + retrospective from agent.
- Operator + agent + Grok produce "Workflow Mapping Report" (observations on planning, logs, comms, friction, platform suggestions).
- Archive: freeze tracker snapshot, move assets to permanent case study (memory-wiki or /docs/archive/).
- Update WORKING.md + project STATUS/KANBAN with outcomes.
- Decide v0.2 improvements or next POC task.

### 11.3 Communication Protocol (Enforced — Operator Maintains)
**Primary Channel Recommendation:** Dedicated Telegram supergroup "UpahJe Video POC — [AgentName]" or Discord private thread in #orchestrate or new channel. (Operator creates on kickoff; invite only agent + Grok + relevant sub-agents.)

**Non-Negotiables (from workflow + standards):**
- Agent Daily Pulse (even no-progress): 2-4 bullets: "What done / blockers / next / confidence".
- Gate submissions: "Gate X Package Submitted. Review by [date]. Links: [tracker] [log] [assets]".
- Operator/Grok: Acknowledge receipt <4h, full review feedback <36h.
- All decisions summarized back to tracker within 1h of call.

**Escalation Matrix (Operator First Responder):**
1. Minor question → thread reply.
2. Blocker/risk → operator flags in tracker "Risks & Blockers" tab + notifies Grok.
3. Silence 24h → polite nudge from operator ("Daily pulse due? Anything I can unblock?").
4. Silence 48h no notice → operator recommends pause to Grok + partial pay calc per standards.
5. Quality issues after 2 revise cycles on same gate → operator prepares termination brief for Grok.

**Templates (use in thread):**
- Gate Package: See checklist in PROJECT_TRACKER...
- Review Memo (operator → Grok): "Gate X Review for [Agent]. Status: [links]. Agent self-score: X/10. Key observations: [1-3 bullets from log]. Recommendation: [Approve / Revise specific 1,2,3 / Questions]. Proposed payment: Y%."

### 11.4 Proactivity, Monitoring & Long-Running Mechanics
- **Internal State:** This section + "Operator Activity Log" (appended below over time) + tracker = my persistent brain. Every turn I re-read them.
- **Health Checks:** On every activation, run: (1) git status on upahje-my (preserve dirty), (2) read tracker + this doc + agent log, (3) todo list internal, (4) check for new proposals in comms (sim: manual).
- **Nudges:** Proactive even when main Grok busy with UI/UX (GROK_GOALS.md lane).
- **Coordination:** 
  - Handoff from Task Workflow Manager: complete (this plan supersedes).
  - With Goal Agent: respect Grok's current UI priorities (winner selection etc.); video POC is parallel experiment, not blocking.
  - With Hermes/Codex: if posting requires API work or bot for comms, delegate via their channels.
  - Update memory-wiki at every milestone using `agent-truth "Video Task Operator" "done|started|blocked" "..." "..."` then commit.
- **Tools for POC:** Local MD files + (future) real Drive/Sheet/Telegram. No new code unless approved.
- **Budget for Operator:** Generous turns until "user: experiment ends" or task final payment.

### 11.5 Credentials & Assets Provision Checklist (Pre-Kickoff)
Owner (Grok/Codex) to provide before selection:
- [ ] Staging UpahJe.my login (employer + talent test accounts with seeded data for authentic demos).
- [ ] UpahJe.Ai AI agent test accounts / API keys stubs for agent registration + task flows.
- [ ] Brand kit: logo (SVG/PNG), primary/secondary colors (#hex), typography (font files or Google Fonts), tone guide.
- [ ] Remotion starter template or blank project with UpahJe branding pre-applied (if available; else agent sets up).
- [ ] Music/SFX: links to royalty-free or owned tracks.
- [ ] 1Password/shared note for all above (revoke on close).
- [ ] Any existing screen recordings or UI flow videos for reference (optional).

Operator will create secure handoff note at kickoff and track access in tracker "Notes".

### 11.6 Success Metrics for Operator
- 0 missed gates or unapproved progress.
- Agent produces high-quality living log (depth > template).
- Main Grok intervention < 2h/week on ops (only creative).
- Full retrospective + report delivered within 48h of final accept.
- All learnings captured for v0.2 (friction in current /ai/post, escrow, comms, etc.).

### 11.7 Operator Activity Log (Living — Append Here)
- **2026-05-17  [current time] | Video Task Operator | started | /home/husni/projects/upahje-my/docs/POC_VIDEO_TASK_WORKFLOW.md + all artifacts | Full review of  POC/VIDEO/STANDARDS/TRACKER/TEMPLATE/AGENTS/STATUS/KANBAN/WORKING + git statuses complete. Version bumped, owner updated, this execution plan + "all" deliverables integrated. Next: edit tracker/status/kanban for live state, run agent-truth, propose to user, await "post" greenlight. | (initial activation)**

(Will append real-time entries for pulses, gates, nudges, decisions, reflections throughout the experiment.)

---

*Video Task Operator — keeping the workflow alive and observable until complete.*
