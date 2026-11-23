---
title: "What an AI agent can and cannot do for a Malaysian SME"
description: "An AI agent runs a loop on its own: it reads a task, calls tools, checks the result and repeats. What that covers unattended, what needs a human signature, and what no agent should touch."
slug: what-an-ai-agent-can-do
translationKey: what-an-ai-agent-can-do
date: 2026-11-23
updated: 2026-11-23
author: "UpahJe editorial"
category: definitions
tags: [definitions, ai-agent, automation, malaysia]
canonical: https://upahje.my/en/articles/what-an-ai-agent-can-do
draft: false
sources:
  - title: "Anthropic, Agent SDK overview (agent harness definition)"
    url: "https://code.claude.com/docs/en/agent-sdk/overview"
    checked: 2026-11-23
  - title: "Anthropic, models overview (Claude Haiku 5.5 pricing)"
    url: "https://docs.claude.com/en/docs/about-claude/models/overview"
    checked: 2026-11-23
  - title: "Bank Negara Malaysia, public exchange-rate API (USD/MYR middle rate 4.1145, 19 November 2026)"
    url: "https://api.bnm.gov.my/public/exchange-rate"
    checked: 2026-11-23
  - title: "Pang Jun Han, AI automation pricing (published project rates)"
    url: "https://pangjunhan.vercel.app/ai-automation"
    checked: 2026-11-23
  - title: "KodeSME, automation pricing"
    url: "https://kodesme.klyihao.com/"
    checked: 2026-11-23
---

# What an AI agent can and cannot do for a Malaysian SME

An AI agent runs a loop by itself: it reads a task, calls tools, looks at the result and decides the next step until the job is done. That covers repetitive work with a clear finish line. It does not cover judgement, money it is not authorised to move, or anything a customer would need explained to them by a person.

## What is an agent, as opposed to a chatbot?

An agent acts between steps; a chatbot only answers. The difference is that an agent has tools it can call, a loop that continues after a tool returns, and a transcript of what it did.

Anthropic's own wording for the layer that runs this is an agent harness that "runs the agent loop, with sessions in an Anthropic-managed cloud sandbox or a self-hosted sandbox on your own infrastructure" ([Claude Code docs, read 23 Nov 2026](https://code.claude.com/docs/en/agent-sdk/overview)). Two consequences follow for a small business: the agent can touch real systems, and the harness, not the model, decides what it is allowed to touch.

## What can it do unattended?

![A decision diagram: a task that is reversible with data in hand runs unattended; a task that moves money or cannot be undone is prepared by the agent and approved by a person; a task that needs judgement, law or a physical presence is not agent work](/figures/what-an-ai-agent-can-do.svg)
*Three outcomes, decided before any tool is chosen.*

Unattended work is work where a wrong answer is cheap to spot and cheap to undo.

| What it does on its own | Why it qualifies |
| --- | --- |
| Read an inbox and sort messages into buckets | A misfiled email is visible and reversible |
| Extract fields from an invoice or delivery order and enter them | The source document stays available for comparison |
| Copy data between two systems on a schedule | A failed copy can be re-run |
| Draft replies, reports or summaries for someone to send | A person still presses send |
| Watch a queue and alert a human when a threshold trips | The agent escalates rather than acts |

## What needs a human before it happens?

Approval work is work where the cost of a wrong action is not recoverable by re-running it.

| Needs a human | Why |
| --- | --- |
| Anything that moves money: refunds, payments, waivers | A wrong transfer is not undone by an apology |
| Sending a message to a customer on your behalf | Tone and commitment are business decisions |
| Deleting or overwriting a record | There is nothing to restore from |
| Changing prices, stock levels or availability | A wrong price is honoured, not corrected |
| Anything legal or regulatory: e-Invoice submissions, contracts, filings | The liability sits with the business, not the agent |

The practical shape is: let the agent prepare, and let a person approve. An agent that drafts a refund and waits for a click saves the typing without taking the risk.

## What can it not do at all?

Four categories, and no amount of prompting changes them.

1. **Judgement calls with no rule to follow.** Whether a complaint is fair, whether a supplier is trustworthy, whether to keep a client. An agent can gather the facts; the decision is not a fact.
2. **Anything physical.** Deliveries, installations, inspections. A WhatsApp bot can book a technician; it cannot change a part.
3. **Knowledge it does not have.** An agent answers from what it can reach. If your stock is in someone's head, the agent will be confidently wrong.
4. **Guaranteed accuracy.** Every agent produces a plausible wrong answer sometimes. That is why the approval column exists.

## What does it cost in ringgit?

Two bills, and the smaller one is the one people worry about.

**Running it.** Token rates are published, so this is arithmetic rather than a guess. At 2,000 input and 500 output tokens per task, Claude Haiku 5.5 costs `0.002 million × USD 0.10 = USD 0.0002` for input plus `0.0005 million × USD 0.50 = USD 0.00025` for output, which is USD 0.00045 a task. At the Bank Negara middle rate of **4.1145** (read 19 November 2026), that is about RM0.00185. A thousand tasks a month is **RM1.85**.

**Building it.** Malaysian studios publish project prices for automation work, from **RM400** for a simple process build to **RM6,000-plus** for autonomous task execution ([Pang Jun Han, read 23 Nov 2026](https://pangjunhan.vercel.app/ai-automation)). A starter workflow build from a studio starts at **RM1,500** ([KodeSME, read 23 Nov 2026](https://kodesme.klyihao.com/)).

So the build is hundreds to thousands of ringgit and the running cost is a few ringgit. Anyone quoting you a large monthly token bill for a small business workflow is either wrong or selling something else. What the rate cards do not state is the monthly support fee after launch, so ask for it before you compare quotes.

## How do I tell a demo from something that keeps running?

A demo works once, in front of you. Something that keeps running survives a bad day. Six checks, and the answers are things, not adjectives.

1. **Show me the transcript.** A working agent records what it did, step by step. If there is no log, there is no evidence it ran.
2. **What happens when a step fails?** Retry, queue or alert. Silence is not an answer.
3. **What is it allowed to touch?** The list of systems, read or write, should be short enough to say aloud.
4. **Who owns the keys and the accounts?** Yours, in your account, revocable.
5. **What happens when the vendor changes something?** Ask who fixes it and at what price.
6. **Who is watching it next month?** An agent with no owner stops being maintained the week after the invoice is paid.

## FAQ

### Is an AI agent the same as automation software?

No. Classic automation follows rules you wrote, exactly, in order. An agent decides the next step itself within the tools and permissions it has, which is why the permissions column matters more than the model choice.

### Do I need a developer to run one?

To build the integrations, usually yes: an agent is only as useful as the systems it can reach. To operate one, no, if the work is approval-based: a staff member reviewing the queue is the human in the loop.

### Can an agent file my e-Invoice submissions?

It can prepare them, and it should not submit them unreviewed. The liability for a wrong submission is the business's, not the tool's, so the accountable person signs off until you have months of clean runs.

### What is the first thing worth automating?

The task your team does most often that has a clear finish line and a cheap mistake: invoice entry, order copying, or triaging an inbox. Start where a wrong result is visible the same afternoon.

---

**Read next**

[What automation work costs in Malaysia, from published rates](https://upahje.my/en/articles/automation-rates-malaysia-published)

[More on APIs and models](https://upahje.my/en/articles/category/definitions)
