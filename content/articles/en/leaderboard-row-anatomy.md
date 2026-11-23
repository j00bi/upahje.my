---
title: "What a leaderboard row actually measures"
description: "SWE-bench and Terminal-bench score a model inside someone else's harness. The DeepSeek row is the worked example, and the run behind it has its own reliability profile."
slug: leaderboard-row-anatomy
translationKey: leaderboard-row-anatomy
format: dev-note
audience: developer
reader: agent
date: 2026-11-23
updated: 2026-11-23
author: "Husni Ahmad"
category: buying-guides
tags: [dev-note, benchmarks, coding-agents]
canonical: https://upahje.my/en/articles/leaderboard-row-anatomy
draft: false
sources:
  - title: "SWE-bench leaderboard, Verified tab"
    url: "https://www.swebench.com/"
    checked: 2026-11-23
  - title: "Terminal-bench 4.1 leaderboard"
    url: "https://www.tbench.ai/"
    checked: 2026-11-23
  - title: "Internet Archive snapshot of the comparison site (25 October 2026)"
    url: "https://web.archive.org/web/20261025232027/https://nazzysar.github.io/deepseek-benchmarks/"
    checked: 2026-11-23
  - title: "nazzysar/commandcode-goat-ecosystem-sess, session transcripts"
    url: "https://github.com/nazzysar/commandcode-goat-ecosystem-sess"
    checked: 2026-11-23
  - title: "nazzysar/deepseek-benchmarks, repository and checksums"
    url: "https://github.com/nazzysar/deepseek-benchmarks"
    checked: 2026-11-23
---

# What a leaderboard row actually measures

Five things, and the score is only one of them: the model, the agent that drove it, the settings, the score, and the cost. Read the first two before the number. The Terminal-bench row for DeepSeek reads 38.5% ± 3.8% under Claude Code, with 8.2 billion tokens, which makes it a DeepSeek model's result inside someone else's harness.

## What is in a leaderboard row?

![A landscape diagram with columns for model, agent, settings, score and cost. The example row is DeepSeek V4.1 Flash 1017 at max, run under Claude Code on Terminal-bench 4.1, scoring 38.5 percent plus or minus 3.8 with 8.2 billion tokens. A footer states that neither CommandCode nor OpenCode appears in the agent column](/figures/leaderboard-row-anatomy.svg)
*Read the agent column first: it decides whose number the score is.*

The Terminal-bench page prints its columns as RANK, MODEL, AGENT, RESOLUTION RATE, RELEASE DATE, TOKENS and COST. The DeepSeek row reads:

| Field | Value as printed |
| --- | --- |
| Model | DeepSeek V4.1 Flash 1017 (max) |
| Agent | Claude Code |
| Resolution rate | 38.5% ± 3.8% |
| Tokens | 8.2B |
| Release date | Oct 17, 2026 |

Change the agent and the number changes, which is why the column exists.

## Which names appear on the boards at all

SWE-bench Verified's agent column lists only mini-SWE-agent. Terminal-bench 4.1 lists Claude Code, Codex, Antigravity CLI, GitHub Copilot, Grok Build and mini-SWE-agent. Neither board has CommandCode or OpenCode in the agent column.

The model names are a separate question, and thinner than the marketing suggests. SWE-bench Verified has DeepSeek V3.2 (high) at 70.00% resolved with an average cost of $0.45, and DeepSeek V3.2 Reasoner at 60.00% with an average cost of $0.03, both under mini-SWE-agent. SWE-bench has no entry for DeepSeek V4.1 Flash or V4 Pro: an absence on the board, not a bad score. Aider polyglot's newest visible run directory is dated 23 August 2025 and its top row is gpt-5 (high) at 88.0% for $29.08, which is not a current reading.

## What the comparison published, and what the run records

The archived page, snapshot 25 October 2026, lists three interactive demos for Round 1: DeepSeek Platform, OpenCode Go and CommandCode GOAT, each a demo path under a vivarium conceit. The catalog is the evidence: each entry carries a title, a description, a path and a tone, and no score, duration, token count or cost. The demos themselves live in `nazzysar/deepseek-benchmarks`, and their SHA-256 hashes match that repository's `rounds/checksums.json`; scanned for text, they carry in-game numbers only, with no build time, token count, cost or score caption.

The GOAT arm's own session records are more informative than its demo. Three redacted transcripts in `nazzysar/commandcode-goat-ecosystem-sess` carry 1,123, 582 and 1,091 records. The lead session retried 33 times: 23 SERVER, 10 TRANSPORT, 0 TIMEOUT; across the three, 94 retries split 57 / 37 / 0. Five turns lasted 7,565.5 s, 2,636.0 s, 150.5 s, 117.6 s and 3.9 s, totalling 10,473.5 s, about 2 h 55 m. The run made 161 tool calls, 140 steps, 138 assistant messages and 25 user messages, on `deepseek/deepseek-v4.1-flash` through provider `commandcode-goat`.

That is a reliability profile, and it says nothing about output quality. There are no token counts and no cost fields in those records, and the site's data model has no cost field, so no cost comparison can be built from them.

## FAQ

### Can a Terminal-bench score be compared with a SWE-bench score?

No. Different benchmark, different agent, different task set. The numbers do not share a scale.

### Why is the 38.5% figure not a CommandCode or OpenCode result?

Because the agent column says Claude Code. The model is DeepSeek's; the harness that drove it is not either CLI.

### What does the GOAT session record prove?

That the arm kept going through 94 retries and nearly three hours. It does not prove the output was good, and it contains no token or cost data.

---

**Read next**

[CommandCode, OpenCode, DeepSeek: three names, three different things](https://upahje.my/en/articles/commandcode-opencode-deepseek-numbers)

[More on buying and choosing tools](https://upahje.my/en/articles/category/buying-guides)
