---
title: "CommandCode, OpenCode, DeepSeek: what the published numbers actually measure"
description: "No leaderboard runs CommandCode or OpenCode as the agent. SWE-bench and Terminal-bench score a model inside someone else's harness, so a head-to-head between two CLIs is a category error."
slug: commandcode-opencode-deepseek-numbers
translationKey: commandcode-opencode-deepseek-numbers
date: 2026-11-23
updated: 2026-11-23
author: "UpahJe editorial"
category: buying-guides
tags: [buying-guides, coding-agents, benchmarks, malaysia]
canonical: https://upahje.my/en/articles/commandcode-opencode-deepseek-numbers
draft: false
sources:
  - title: "SWE-bench leaderboard, Verified tab"
    url: "https://www.swebench.com/"
    checked: 2026-11-23
  - title: "Terminal-bench 4.1 leaderboard"
    url: "https://www.tbench.ai/"
    checked: 2026-11-23
  - title: "Aider polyglot leaderboard"
    url: "https://aider.chat/docs/leaderboards/"
    checked: 2026-11-23
  - title: "CommandCode, pricing"
    url: "https://commandcode.ai/pricing"
    checked: 2026-11-23
  - title: "OpenCode, Go subscription docs"
    url: "https://opencode.ai/docs/console/go"
    checked: 2026-11-23
  - title: "DeepSeek, API pricing"
    url: "https://api-docs.deepseek.com/quick_start/pricing"
    checked: 2026-11-23
  - title: "Hacker News, Show HN: Command Code GOAT (5 August 2026)"
    url: "https://news.ycombinator.com/item?id=49188656"
    checked: 2026-11-23
---

# CommandCode, OpenCode, DeepSeek: what the published numbers actually measure

These are three different kinds of thing. CommandCode is a paid coding CLI. OpenCode is a free, MIT-licensed coding CLI with an optional subscription. DeepSeek is a model vendor with an API. No published leaderboard in this pass ran either CLI as the agent, so a "CommandCode vs OpenCode" score comparison does not exist to be quoted. What exists is DeepSeek's model scored inside someone else's harness.

## What is actually in a leaderboard row?

![A landscape diagram with columns for model, agent, settings, score and cost. The example row is DeepSeek V4.1 Flash 1017 at max, run under Claude Code on Terminal-bench 4.1, scoring 38.5 percent plus or minus 3.8 with 8.2 billion tokens. A footer states that neither CommandCode nor OpenCode appears in the agent column](/figures/leaderboard-row-anatomy.svg)
*Read the agent column first: it decides whose number the score is.*

Five things, and the score is only one of them: the model, the agent that drove it, the settings, the score, and the cost. Read the first two before the number.

The Terminal-bench 4.1 page makes this visible because its columns are RANK, MODEL, AGENT, RESOLUTION RATE, RELEASE DATE, TOKENS and COST. The DeepSeek row reads:

| Field | Value as printed |
| --- | --- |
| Model | DeepSeek V4.1 Flash 1017 (max) |
| Agent | Claude Code |
| Resolution rate | 38.5% ± 3.8% |
| Tokens | 8.2B |
| Release date | Oct 17, 2026 |

So the number belongs to a DeepSeek model running under Claude Code. It is not a CommandCode result and not an OpenCode result. Change the agent and the number changes, which is the whole reason the agent column exists.

## Which names appear on the boards at all?

SWE-bench Verified's agent column lists only mini-SWE-agent. Terminal-bench 4.1 lists Claude Code, Codex, Antigravity CLI, GitHub Copilot, Grok Build and mini-SWE-agent. Neither board has CommandCode or OpenCode in the agent column.

The model names are a separate question, and here the answer is thinner than the marketing suggests:

- **SWE-bench Verified** has DeepSeek V3.2 (high) at 70.00% resolved with an average cost of $0.45, and DeepSeek V3.2 Reasoner at 60.00% with an average cost of $0.03. Both under mini-SWE-agent, with the Verified tab, Bash Only checked, sorted by percent resolved.
- **SWE-bench has no entry for DeepSeek V4.1 Flash or V4 Pro.** That is an absence on the board, not a bad score.
- **Aider polyglot is stale.** The newest visible run directory is dated 23 August 2025 and the top row is gpt-5 (high) at 88.0% for $29.08. A board that has not seen a 2026 model cannot rank one, so this article does not cite it as current.

The honest summary: the only published score that names DeepSeek's current model puts it at 38.5% ± 3.8% on Terminal-bench 4.1, under Claude Code, with 8.2B tokens. Everything else that sounds like a comparison is a vendor claim or a discussion thread.

## What do the prices look like as published?

CommandCode sells monthly tiers, and every paid tier carries a processing fee with no figure attached.

| Offering | Tier | Price as printed |
| --- | --- | --- |
| CommandCode | Go | $1/month + processing fee, $10 credits included |
| CommandCode | GOAT | $10/month + processing fee, up to $100 in credits |
| CommandCode | Pro | $20/month |
| CommandCode | Max 10× | $100/month + processing fee, $150 credits |
| CommandCode | Provider (API plan) | $15/month + processing fee |
| OpenCode | the agent itself | Free, MIT licence |
| OpenCode | Go | $10/month |
| OpenCode | Go Plus | $40/month |
| OpenCode | Go Teams | $20 per member per month, two-member minimum |
| DeepSeek | deepseek-flash input, cache miss | $0.15 off-peak / $0.30 peak per 1M tokens |
| DeepSeek | deepseek-flash output | $0.60 off-peak / $1.20 peak per 1M tokens |

The processing fee is the line to ask about, because "plus processing fee" is printed on five of the tiers and the fee appears nowhere on the page in a figure or a link.

## Where did the numbers drift?

CommandCode's own offer has moved since August, and both versions are still quotable.

A Hacker News post on **5 August 2026** announced "Command Code GOAT, $10/month for $70 of credits across 30 models". Today's pricing page shows the same $10/month GOAT tier with "up to $100 in credits", and the models page says "All 107" models. Same tier, same price, more credits and more models. That is a normal promotional drift, and it matters because a review written in August is describing an offer that no longer exists.

The lesson is not that one number is wrong. It is that a dated figure needs its date, or it becomes a claim about today that nobody can check.

## What did we run ourselves?

One task, in one harness, printed as a sidebar and not as a head-to-head: `dsh` 0.2.2-rc.1 wrote a small feature in 95.4 seconds across 10 turns and 14 tool calls, produced two files, and the project's own tests passed 3 of 3.

The part worth remembering is what happened in the other two arms. Both refused to write anything in their non-interactive defaults, and both still exited 0. An exit code of zero means the process finished. It does not mean the work happened. Any CI job or nightly script that trusts the exit code alone is measuring the wrong thing, and this is the failure mode to test for on the first day.

We did not run the other two arms successfully, so this article makes no claim about their output quality.

## What to do this week?

Five actions, none of which needs a subscription.

1. **Pick one real task from your own backlog**, small enough to finish in an hour, and run it in whichever harness you already have.
2. **Time it**, and count the turns and tool calls the harness reports. Those three numbers describe the run better than any leaderboard.
3. **Check whether the files landed**, not whether the process exited cleanly.
4. **Run it twice** with the same prompt. A harness that succeeds once and fails once is a different purchase.
5. **Before paying for a tier, ask what the processing fee is** in ringgit, and get it in writing.

## Try it yourself

There is no honest way to reproduce a leaderboard. What you can reproduce is your own row.

Take one task, run it in one harness, and write down the same five fields the boards print: the model, the agent, the settings, the score (did the tests pass), and the cost in tokens or ringgit. That is your benchmark, it is comparable to itself next month, and it does not depend on anyone's marketing page.

The one thing that will bite you is the exit code. A run that exits 0 without writing files looks like a pass in every log you have. Check the artefact, every time.

## What did the comparison actually publish?

Three interactive demos for Round 1, and no numbers. The archived page, snapshot 25 October 2026, lists DeepSeek Platform, OpenCode Go and CommandCode GOAT, each as a demo path under a vivarium conceit: "A Closed Ecology", "Abyssal Vivarium", "Vivarium Nº 7" ([archive, read 23 Nov 2026](https://web.archive.org/web/20261025232027/https://nazzysar.github.io/deepseek-benchmarks/)).

The catalog is the evidence. Each entry carries a title, a description, a path and a tone, and nothing else: no score, duration, token count or cost. That is why loading all three cannot settle speed or price for you.

A demo settles two things. Whether the thing runs in your browser, and whether you like what it made. It does not settle score, cost, tokens or reliability, because none of those was published.

The figures we do have, each with where it came from:

| Figure | What it says | Provenance |
| --- | --- | --- |
| 38.5% ± 3.8% | DeepSeek V4.1 Flash 1017 (max), under Claude Code, Terminal-bench 4.1 | Terminal-bench leaderboard, read 23 Nov 2026 |
| $10/month GOAT + processing fee | Up to $100 in credits, CommandCode's tier as printed | Vendor pricing page, read 23 Nov 2026 |
| $10/month Go, agent under MIT | OpenCode's optional subscription, and the agent's licence | Vendor docs and repository, read 23 Nov 2026 |
| 95.4 s, 10 turns, 14 tool calls, 3/3 tests | One `dsh` run on one task, two files written | Our measurement, 23 Nov 2026 |

Two numbers are still absent, and both are narrow. DeepSeek's release note prints a chart with no values in the page text, and CommandCode's processing fee has no figure on any page read.

## FAQ

### Is CommandCode better than OpenCode?

No published benchmark answers that, because neither product appears as an agent on either board. The boards score models inside fixed harnesses. Anything else is a vendor claim or one person's run.

### Can I compare the 38.5% DeepSeek figure with a SWE-bench figure?

No. Different benchmark, different agent, different task set. The two numbers do not share a scale, and pairing them is how a table becomes misleading.

### Why does the article not cite Aider's leaderboard?

Because its newest visible run is dated 23 August 2025. A stale board cannot say anything about a 2026 model, and citing it would be worse than leaving it out.

### What is the one thing to check before trusting a coding-agent demo?

Whether files were written and tests passed, not whether the command exited 0. Our own run showed two harnesses exiting cleanly without writing anything.

---

**Read next**

[Agent harnesses: who makes them, and what is actually open source](https://upahje.my/en/articles/harness-landscape-open-closed)

[More on buying and choosing tools](https://upahje.my/en/articles/category/buying-guides)
