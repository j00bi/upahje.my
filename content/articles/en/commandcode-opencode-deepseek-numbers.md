---
title: "CommandCode, OpenCode, DeepSeek: not the same kind of tool"
description: "One is a paid CLI, one is a free CLI, one is an API. Their published prices, their drift, and one run that shows an exit code of zero is not success."
slug: commandcode-opencode-deepseek-numbers
translationKey: commandcode-opencode-deepseek-numbers
date: 2026-11-23
updated: 2026-11-23
author: "Husni Ahmad"
category: buying-guides
audience: developer
format: dev-note
tags: [buying-guides, coding-agents, pricing]
canonical: https://upahje.my/en/articles/commandcode-opencode-deepseek-numbers
draft: false
changelog:
  - date: 2026-11-23
    note: "First published."
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

# CommandCode, OpenCode and DeepSeek are not the same kind of tool

These are three different kinds of thing, and the words matter before the prices do. `dsh` is DeepSeek Harness, the command-line harness we run here. An "arm" is one of the products tried on the same task, and this run had three: CommandCode, OpenCode and DeepSeek through `dsh`. CommandCode is a paid coding CLI. OpenCode is a free, MIT-licensed coding CLI with an optional subscription. DeepSeek is a model vendor with an API. What follows is what each publishes as a price, where those numbers have moved, and what one run showed. The benchmark half, and the reason a "CommandCode vs OpenCode" score does not exist, is a separate developer note.

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

The 38.5% figure that circulates for DeepSeek belongs to Terminal-bench 4.1, where it is DeepSeek V4.1 Flash 1017 run under Claude Code, so it is a result for the model inside someone else's harness and not a result for either CLI named here, and it cannot be compared with a SWE-bench figure because the benchmark, the agent and the task set are different.

## What did we run ourselves?

One task, in one harness, printed as a sidebar and not as a head-to-head: `dsh` 0.2.2-rc.1 wrote a small feature in 95.4 seconds across 10 turns and 14 tool calls, produced two files, and the project's own tests passed 3 of 3.

What happened in the other two arms matters more than the arm that worked. Both refused to write anything in their non-interactive defaults, and both still exited 0. An exit code of zero means the process finished. It does not mean the work happened. Any CI job or nightly script that trusts the exit code alone is measuring the wrong thing, and this is the failure mode to test for on the first day.

We did not run the other two arms successfully, so this article makes no claim about their output quality.

## What to check before you pay
Five actions, none of which needs a subscription.

1. **Pick one real task from your own backlog**, small enough to finish in an hour, and run it in whichever harness you already have.
2. **Time it**, and count the turns and tool calls the harness reports. Those three numbers describe the run better than any leaderboard.
3. **Check whether the files landed**, not whether the process exited cleanly.
4. **Run it twice** with the same prompt. A harness that succeeds once and fails once is a different purchase.
5. **Before paying for a tier, ask what the processing fee is** in ringgit, and get it in writing.

There is no honest way to reproduce a leaderboard. What you can reproduce is your own row.

Take one task, run it in one harness, and write down the same five fields the boards print: the model, the agent, the settings, the score (did the tests pass), and the cost in tokens or ringgit. That is your benchmark, it is comparable to itself next month, and it does not depend on anyone's marketing page.

The one thing that will bite you is the exit code. A run that exits 0 without writing files looks like a pass in every log you have. Check the artefact, every time.

