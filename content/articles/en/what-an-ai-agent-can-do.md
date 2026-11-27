---
title: "What an AI agent can and cannot do for a small business"
description: "An AI agent runs a loop on its own: reads a task, calls tools, checks, repeats. What that covers unattended, what needs a human, and what none should touch."
slug: what-an-ai-agent-can-do
translationKey: what-an-ai-agent-can-do
date: 2026-11-23
updated: 2026-11-23
author: "UpahJe Desk"
category: definitions
tags: [definitions, ai-agent, automation, malaysia]
canonical: https://upahje.my/en/articles/what-an-ai-agent-can-do
draft: false
changelog:
  - date: 2026-11-23
    note: "First published."
sources:
  - title: "Anthropic, Agent SDK overview (agent harness definition)"
    url: "https://code.claude.com/docs/en/agent-sdk/overview"
    checked: 2026-11-23
  - title: "Anthropic, Claude API pricing (Claude Haiku 5.5)"
    url: "https://docs.claude.com/en/docs/about-claude/pricing"
    checked: 2026-11-23
  - title: "Bank Negara Malaysia, exchange rates (the USD middle rate quoted is the one published 19 November 2026; the page shows the latest rate)"
    url: "https://www.bnm.gov.my/exchange-rates"
    checked: 2026-11-23
  - title: "Pang Jun Han, AI automation pricing (published project rates)"
    url: "https://pangjunhan.vercel.app/ai-automation"
    checked: 2026-11-23
  - title: "Autoflow Solutions, services (autonomous task execution pricing)"
    url: "https://www.autoflow-solutions.com/my/services"
    checked: 2026-11-23
  - title: "KodeSME, automation pricing"
    url: "https://kodesme.klyihao.com/"
    checked: 2026-11-23
---

# What an AI agent can and cannot do for a small business

An AI agent runs a loop by itself: it reads a task, calls tools, looks at the result and decides the next step until the job is done. That covers repetitive work with a clear finish line. It does not cover judgement, money it is not authorised to move, or anything a customer would need explained to them by a person.

## An agent acts; a chatbot answers

A chatbot answers. An agent answers, then does something about it, which is why it needs tools it can call (a tool is one thing it is allowed to do, such as look up an order or send an email), a loop that continues after a tool returns, and a transcript, meaning a written record of what it did.

Anthropic's own wording for the layer that runs this is an agent harness, which is the program that holds the conversation and runs the tools, defined as "runs the agent loop, with sessions in an Anthropic-managed cloud sandbox or a self-hosted sandbox on your own infrastructure" ([Claude Code docs, read 23 Nov 2026](https://code.claude.com/docs/en/agent-sdk/overview)). Two consequences follow for a small business: the agent can touch real systems, and the harness, not the model, decides what it is allowed to touch.

## Unattended work is a narrow list

![Three panels: work that runs unattended such as sorting an inbox; work the agent prepares for a human to approve such as refunds and customer messages; work that is not for an agent such as judgement calls and physical tasks](/figures/what-an-ai-agent-can-do.svg)
*Sort the work before you choose a tool: unattended, prepared, and not agent work.*

Unattended work is work where a wrong answer is cheap to spot and cheap to undo.

| What it does on its own | Why it qualifies |
| --- | --- |
| Read an inbox and sort messages into buckets | A misfiled email is visible and reversible |
| Extract fields from an invoice or delivery order and enter them | The source document stays available for comparison |
| Copy data between two systems on a schedule | A failed copy can be re-run |
| Draft replies, reports or summaries for someone to send | A person still presses send |
| Watch a queue and alert a human when a threshold trips | The agent escalates rather than acts |

## Approval work needs a human first

Approval work is work where the cost of a wrong action is not recoverable by re-running it.

| Needs a human | Why |
| --- | --- |
| Anything that moves money: refunds, payments, waivers | A wrong transfer is not undone by an apology |
| Sending a message to a customer on your behalf | Tone and commitment are business decisions |
| Deleting or overwriting a record | There is nothing to restore from |
| Changing prices, stock levels or availability | A wrong price is honoured, not corrected |
| Anything legal or regulatory: e-Invoice submissions, contracts, filings | The liability sits with the business, not the agent |

So let the agent prepare and let a person approve. An agent that drafts a refund and waits for a click saves the typing and takes none of the risk. I would not run one any other way, and the vendor demos that skip the approval step are the ones to be suspicious of.

## Four categories stay out of reach

Four categories, and no amount of prompting changes them.

1. **Judgement calls with no rule to follow.** Whether a complaint is fair, whether a supplier is trustworthy, whether to keep a client. An agent can gather the facts; the decision is not a fact.
2. **Anything physical.** Deliveries, installations, inspections. A WhatsApp bot can book a technician; it cannot change a part.
3. **Knowledge it does not have.** An agent answers from what it can reach. If your stock is in someone's head, the agent will be confidently wrong.
4. **Guaranteed accuracy.** Every agent produces a plausible wrong answer sometimes. That is why the approval column exists.

## Two bills, in ringgit

Two bills. The smaller one gets the attention.

**Running it.** Token rates are published, so this is arithmetic rather than a guess. At 2,000 input and 500 output tokens per task, Claude Haiku 5.5 costs `0.002 million × USD 0.10 = USD 0.0002` for input plus `0.0005 million × USD 0.50 = USD 0.00025` for output, which is USD 0.00045 a task. At the Bank Negara middle rate of **4.1145** (read 19 November 2026), that is about RM0.00185. A thousand tasks a month is **RM1.85**. A teh tarik at a mamak is RM2 to RM3, which is our own comparison, not a published index.

**Building it.** Malaysian publishers quote project prices for automation work: **RM400** for a simple process build ([Pang Jun Han, read 23 Nov 2026](https://pangjunhan.vercel.app/ai-automation)) and **RM6,000-plus** for autonomous task execution ([Autoflow Solutions, read 23 Nov 2026](https://www.autoflow-solutions.com/my/services)). A starter workflow build from a studio starts at **RM1,500** ([KodeSME, read 23 Nov 2026](https://kodesme.klyihao.com/)).

So the build is hundreds to thousands of ringgit and the running cost is a few ringgit. If a supplier quotes a large monthly token bill for a small workflow, ask them to show the arithmetic against the published rate; ours takes three lines. What the rate cards do not state is the monthly support fee after launch, so ask for it before you compare quotes.

## Where to start this week
Five actions, none of which needs a purchase or a developer.

1. **Write down the one task you would automate first**, and what "done" looks like for it, in one sentence.
2. **Count how often it happens** for a week, on paper. Under five times a day, the case is weak.
3. **List the systems it touches** and whether the agent would only read from them or also write.
4. **Find the failure that would hurt**, and decide whether a person should approve before it happens.
5. **Ask two suppliers the six checks below**, and compare the answers rather than the prices.

Begin with a script that reads a CSV of support emails, calls one model per row, and writes a draft reply into a second CSV. It is not an agent yet. That is deliberate, because it proves the loop before you add tools.

- **What it needs:** a file of sample rows, an API key (a string that identifies your account to the model provider), and about 20 lines of Python. No server.
- **What it costs:** at 2,000 input and 500 output tokens per row, about **RM0.00185 a row**, so a hundred rows is under 20 sen.
- **Where it breaks first:** a model reading a CSV column will happily mis-parse an empty cell and invent a customer name. Log every input row beside its output, or you will debug the wrong half.

## A demo works once, in front of you

A demo works once, in front of you. Something that keeps running survives a bad day. Six checks. Each answer should be a thing someone can show you.

1. **Show me the transcript.** A working agent records what it did, step by step. If there is no log, there is no evidence it ran.
2. **What happens when a step fails?** Retry, queue or alert. Silence is not an answer.
3. **What is it allowed to touch?** The list of systems, read or write, should be short enough to say aloud.
4. **Who owns the keys and the accounts?** Yours, in your account, revocable.
5. **What happens when the vendor changes something?** Ask who fixes it and at what price.
6. **Who is watching it next month?** An agent with no owner stops being maintained the week after the invoice is paid.

**Read next**

[What automation work costs in Malaysia, from published rates](https://upahje.my/en/articles/automation-rates-malaysia-published)

[More on APIs and models](https://upahje.my/en/glossary)

[What an AI agent can and cannot do for a small business](https://upahje.my/en/articles/simulated-customer-says-yes)
