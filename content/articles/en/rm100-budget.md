---
title: "What RM100 a month buys in AI"
description: "RM100 buys a seat in a subscription app or a meter of API tokens. The Bank Negara rate of 19 November 2026, three usage levels, and where tokens win."
cardFigure: "RM100 of tokens buys about 54,000 tasks a month"
slug: rm100-budget
translationKey: rm100-budget
date: 2026-11-19
updated: 2026-11-19
author: "UpahJe Desk"
category: buying-guides
tags: [buying-guides, pricing, subscriptions, malaysia]
canonical: https://upahje.my/en/articles/rm100-budget
draft: false
changelog:
  - date: 2026-11-19
    note: "First published."
sources:
  - title: "Claude, pricing"
    url: "https://claude.com/pricing"
    checked: 2026-11-24
  - title: "ChatGPT, pricing"
    url: "https://chatgpt.com/pricing"
    checked: 2026-11-24
  - title: "GitHub Copilot, plans"
    url: "https://github.com/features/copilot/plans"
    checked: 2026-11-24
  - title: "Anthropic, Claude API pricing"
    url: "https://docs.claude.com/en/docs/about-claude/pricing"
    checked: 2026-11-24
  - title: "Bank Negara Malaysia, exchange rates (the USD middle rate quoted is the one published 19 November 2026; the page shows the latest rate)"
    url: "https://www.bnm.gov.my/exchange-rates"
    checked: 2026-11-24
---

# What RM100 a month buys in AI

RM100 buys one of two things: a seat in someone's app, or a meter of tokens for software you run. Which model wins a leaderboard is a different question. At a stated 2,000-token task, RM100 of Claude Haiku 5.5 tokens is about 54,000 tasks a month, while ChatGPT Plus costs RM99.90 and includes no API key at all.

## A subscription sells a seat, not a meter

A consumer plan sells you a seat: a login, a usage allowance and the vendor's interface. It does not hand you an API key.

The vendor pages make the distinction plainly. Claude Pro and ChatGPT Plus list no API credits. Claude Max at USD 100 and Claude Ultra at USD 200 include API credits equal to their own price, and ChatGPT Pro includes monthly API credits up to its tier price. Copilot's credits are GitHub AI Credits for its own features, not API access. Nothing on these pages grants a third-party harness a key.

| Plan | Published price | In ringgit | API access included |
| --- | --- | --- | --- |
| ChatGPT Free | MYR 0 | 0.00 | No |
| ChatGPT Go | MYR 24 | 24.00 | No |
| ChatGPT Plus | MYR 99.90 | 99.90 | No |
| ChatGPT Pro, base tier | MYR 420 | 420.00 | Yes, up to MYR 2,100 monthly credits |
| Claude Pro | USD 20 per month | 82.29 | No API credits listed |
| Claude Pro, annual | USD 17 per month, USD 200 up front | 69.95 / 822.90 up front | No API credits listed |
| Claude Max | USD 100 per month | 411.45 | Yes, USD 100 monthly API credits |
| Claude Ultra | USD 200 per month | 822.90 | Yes, USD 200 monthly API credits |
| Copilot Pro | USD 10 per user per month | 41.15 | No, GitHub AI Credits only |

Every ringgit figure is either published in MYR by the vendor, or converted at the Bank Negara Malaysia middle rate of 4.1145 on 19 November 2026. Tax is excluded.

Claude's annual rate is USD 17 a month against USD 20 monthly, which is RM69.95 against RM82.29, and it costs USD 200 up front.

Claude publishes USD 20 and we converted at 4.1145 to RM82.29. OpenAI publishes MYR 99.90 directly for Malaysia.

## Haiku 5.5 costs USD 0.10 in and USD 0.50 out per million

Anthropic publishes Claude Haiku 5.5 at USD 0.10 per million input tokens and USD 0.50 per million output tokens, with the input figure qualified on the page as applying to prompts up to 100,000 tokens.

That is the meter. To compare it with a subscription, the article has to fix a task size, and the task size is an assumption rather than a measurement: 2,000 input tokens and 500 output tokens per task. If your tasks are longer, every number below falls proportionally.

1. Input: 2,000 tokens ÷ 1,000,000 = 0.002 million, × USD 0.10 = USD 0.0002.
2. Output: 500 tokens ÷ 1,000,000 = 0.0005 million, × USD 0.50 = USD 0.00025.
3. One task: USD 0.00045, which is RM0.00185 at 4.1145.
4. RM100 ÷ RM0.00185 = about 54,000 tasks.

## Three usage levels keep the meter small

The same meter cost is tiny at light use, trivial at daily use, and still small at heavy use, because text tokens are cheap and seats are priced for people rather than volume.

| Usage level | Tasks per day | Tasks a month | Token cost, RM |
| --- | --- | --- | --- |
| Light | 5 | 150 | 0.28 |
| Daily | 30 | 900 | 1.67 |
| Heavy | 200 | 6,000 | 11.11 |

Each row is tasks × RM0.00185. A 30-day month is assumed. At heavy use you are spending about RM11 a month on tokens, which leaves RM89 of the RM100 unspent, and that is the arithmetic that decides the question for most people.

![Six horizontal markers on a log scale from RM0.10 to RM100: token bills of RM0.28, RM1.67 and RM11.11 against seats at RM24, RM82.29 and RM99.90](/figures/rm100-month-cost.svg)
*A month of tokens costs under RM12 at every usage level, against the cheapest paid seat at RM24.*

## A seat plus a meter is two purchases

Then you are buying two things, and the cheapest version is a smaller seat plus tokens rather than the largest seat.

ChatGPT Go at RM24 leaves RM76 for tokens, about 41,000 tasks at the assumed size. Claude Pro at RM82.29 leaves RM17.71, about 9,500 tasks. The high tiers bundle API credits, which is useful if you want one bill, and expensive if you do not use the credits: Claude Max costs RM411.45 for USD 100 of API credits bundled inside it, which at the same rate is RM411.45 of tokens.

## The line sits near 900 tasks a month

Below roughly 900 tasks a month, a seat is the better buy if a human is doing the asking, because RM24 to RM99.90 buys an interface, memory, file uploads and a vendor's support, and RM1.67 of tokens buys none of that.

Above roughly 6,000 tasks a month, or any time software rather than a person is making the calls, tokens win: RM11.11 of API usage replaces a seat that cannot serve a harness at all. Between those two, the honest answer is that it depends on whether you need an interface or an integration, and the price difference is too small to decide it.

Both lines assume the 2,000-token task. They mark where the arithmetic changes sign, and nothing else.

## Gemini publishes no plan price we could read

Gemini's plan pricing: the page returned an empty body to our fetcher. Cursor and Windsurf plans: not reached. DeepSeek consumer pricing: only its API page was read, and its output-token prices were below the page truncation, so its rows are absent rather than estimated. Copilot Business and Enterprise: not priced on the plans page read, which now sells Free, Pro, Pro+ and Max.

Two benchmark leaderboards were also not captured for this piece, and this article makes no claim about model quality. That is deliberate: the question here is price and access, and a quality ranking would answer a different one.

**Read next**

[What automation work costs in Malaysia, from published rates](https://upahje.my/en/articles/automation-rates-malaysia-published)

[More on buying automation](https://upahje.my/en/topics/buying)

[Where the closed models actually differ](https://upahje.my/en/articles/closed-models-differences)
