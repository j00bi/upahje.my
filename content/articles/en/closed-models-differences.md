---
title: "Claude, ChatGPT, Gemini and Grok: what actually differs between the closed models"
description: "Not the benchmark score, which no current leaderboard here can settle. What you are stuck with: context window, price per token and the documented capabilities. Every cell sourced or marked not captured, and where the terms pages were not opened, the article says so."
slug: closed-models-differences
translationKey: closed-models-differences
date: 2026-11-19
updated: 2026-11-19
author: "UpahJe Desk"
category: buying-guides
tags: [buying-guides, closed-models, pricing, malaysia]
canonical: https://upahje.my/en/articles/closed-models-differences
draft: false
sources:
  - title: "Anthropic, models overview"
    url: "https://docs.claude.com/en/docs/about-claude/models/overview"
    checked: 2026-11-19
  - title: "OpenAI, API pricing"
    url: "https://developers.openai.com/api/docs/pricing"
    checked: 2026-11-19
  - title: "DeepSeek, API pricing"
    url: "https://api-docs.deepseek.com/quick_start/pricing"
    checked: 2026-11-19
  - title: "Google, AI Studio pricing"
    url: "https://aistudio.google.com/docs/pricing"
    checked: 2026-11-19
  - title: "xAI, models pricing"
    url: "https://docs.x.ai/docs/pricing"
    checked: 2026-11-19
  - title: "Anthropic, PDF support (files)"
    url: "https://docs.claude.com/en/docs/build-with-claude/pdf-support"
    checked: 2026-11-19
  - title: "OpenAI, file inputs"
    url: "https://developers.openai.com/api/docs/guides/file-inputs"
    checked: 2026-11-19
  - title: "xAI, function calling"
    url: "https://docs.x.ai/developers/tools/function-calling"
    checked: 2026-11-19
---

# Claude, ChatGPT, Gemini and Grok: what actually differs between the closed models

What differs is not which model scores highest. Two leaderboards were reachable and are printed below with their settings, but neither is treated here as a quality ranking. What a buyer is stuck with is four documented things: the context window, the price per million tokens, whether tool calling and structured output are documented, and whether file and image input are supported.

## What does each vendor document?

Only what the vendor's own pages state. Where a page did not print a figure, the cell says "not captured" rather than a number.

| Model (vendor spelling) | Context window | Input / output, USD per million | Tool calling | Structured output | File and image input |
| --- | --- | --- | --- | --- | --- |
| Claude Fable 5.2 | 1M tokens | 8 / 40 | Documented | Documented | Image and file documented |
| Claude Opus 5.5 | 1M tokens | 4 / 20 | Documented | Documented | Image and file documented |
| Claude Sonnet 5.5 | 1M tokens | 2 / 10 | Documented | Documented | Image and file documented |
| Claude Haiku 5.5 | 1M tokens | 0.10 / 0.50, input qualified up to 100,000 tokens | Documented | Documented | Image and file documented |
| GPT-6.2 Astra | 128K tokens short context | Short context 8 / 40, long context 16 / 60 | Documented | Documented | Image and file documented |
| GPT-6.2 Sol | 128K tokens short context | Short 2 / 10, long 4 / 15 | Documented | Documented | Image and file documented |
| gpt-6-luna | not captured | 0.10 / 0.50 | Documented | Documented | Image and file documented |
| deepseek-flash | 1M tokens | 0.15 / 0.60 off-peak, 0.30 / 1.20 peak | Documented | Documented | Vision yes, file not verified |
| deepseek-v4-pro | 1M tokens | 0.66 in off-peak, 1.98 out off-peak | Documented | Documented | Image not supported |
| gemini-4-neon | 1M tokens | 3.00 / 15.00 | Documented | Documented | Image and file documented |
| gemini-4-carbon | 1M tokens | 2.00 / 10.00 until 2026-11-30, then 4.00 / 20.00 | Documented | Documented | Image and file documented |
| grok-4.7 | 500k tokens | 2.00 / 6.00 under 200k context, 4.00 / 12.00 above | Documented | Documented | Image yes, file not documented |

The figures come from Anthropic's models overview, OpenAI's API pricing page, DeepSeek's pricing page, Google's AI Studio pricing page and xAI's models pricing page, all read on 19 November 2026.

Two cells need a note rather than a number. Haiku 5.5's input price is qualified on the page as applying to prompts up to 100,000 tokens. And GPT-6.2 Astra and Sol price short and long context separately, so both are printed. The capability cells are backed by the vendor documentation listed in Sources: PDF support for the Claude rows, file inputs for the GPT rows, and function calling for grok-4.7.

## What does a benchmark score not tell you?

Almost everything in the table above. The two leaderboards further down are printed with their settings, and neither is treated as a quality verdict.

SWE-bench serves its leaderboards through script rather than static text, and no dated snapshot was captured. The Aider polyglot page's visible top row carries a run directory dated 23 August 2025, which is not a snapshot of November 2026. Rather than cite either as current, this piece compares what you get and pay. A benchmark number also would not tell you the context window, the price, whether structured output is documented, or what the terms allow.

## What does one task cost at these rates?

Because input and output are priced separately, one worked example makes the table usable. The assumption is 100,000 input and 20,000 output tokens per task, and the rate is the printed price above.

1. Claude Haiku 5.5: 0.1 million input × USD 0.10 = USD 0.01, plus 0.02 million output × USD 0.50 = USD 0.01, so USD 0.02 per task.
2. Claude Fable 5.2: 0.1 million input × USD 8.00 = USD 0.80, plus 0.02 million output × USD 40.00 = USD 0.80, so USD 1.60 per task.
3. gemini-4-carbon at the price printed for Malaysia through 30 November 2026 (it doubles to USD 4.00 / 20.00 on 1 December): 0.1 million input × USD 2.00 = USD 0.20, plus 0.02 million output × USD 10.00 = USD 0.20, so USD 0.40 per task today and USD 0.80 after the change.

That is an 80 times spread between the cheapest and most expensive row on the same task, and every figure is checkable against the printed price. Change the assumption and the totals change proportionally; the multiplication is what makes it auditable.

![Three bars to scale: Claude Haiku 5.5 at USD 0.02, Gemini 4 Carbon at USD 0.40, Claude Fable 5.2 at USD 1.60 per task](/figures/closed-task-cost.svg)
*The same 100,000-in, 20,000-out task costs USD 0.02 on Haiku 5.5 and USD 1.60 on Fable 5.2.*

## Where is the lock-in?

Three places, and each shows up in the contract rather than the benchmark.

**Data retention.** Every closed model runs on the vendor's infrastructure. What happens to your prompts is governed by the terms, and the terms pages were listed but not opened for this piece, so I am not going to characterise them. Read yours before you paste a client's document.

**Model deprecation.** A closed model can be retired on the vendor's schedule. The prices and names above are dated for exactly that reason: they are a snapshot of a moving target.

**Export.** There is no weights file to take with you. Moving vendors means rebuilding prompts, tools and evaluation, which is a cost no table captures.

## Which vendor names drift?

The pages disagree with each other, and the table keeps the printed names rather than tidying them.

OpenAI's platform documentation sells GPT-6.2 Astra and GPT-6.2 Sol, and prints the cheap model as gpt-6-luna, while its consumer page calls the family GPT-6. Gemini's marketing names differ from the API ids shown underneath them, which is why the table uses the API ids. If you are briefing a supplier, quote the API id, because that is what the documentation and billing use.

## What do the benchmarks actually say?

Two leaderboards, each readable only with its settings printed beside the number, and neither reconciling with the vendor names above.

SWE-bench Verified was read with the Bash Only setting and the mini-SWE-agent agent filter, sorted by percent resolved. Its top row is Claude 4.5 Opus (high) at 76.80% resolved for an average cost of USD 0.75 ([swebench.com, read 19 Nov 2026](https://www.swebench.com/)). The page states that its defaults are part of the figure, so a score quoted without those settings is not comparable to another SWE-bench number.

| Model (as the leaderboard prints it) | Percent resolved | Average cost, USD |
| --- | --- | --- |
| Claude 4.5 Opus (high) | 76.80 | 0.75 |
| Gemini 3 Flash (high) | 75.80 | 0.36 |
| MiniMax M2.5 (high) | 75.80 | 0.07 |
| Claude 4.6 Opus | 75.60 | 0.55 |

Aider polyglot's visible top row is gpt-5 (high) at 88.0% pass rate for a total run cost of USD 29.08, but its run directory is dated 2025-08-23 and none of the visible rows is newer than August 2025 ([aider.chat, read 19 Nov 2026](https://aider.chat/docs/leaderboards/)). Those numbers cannot be presented as the state of the art in November 2026.

The names do not reconcile, and that is a finding rather than a formatting problem. The SWE-bench board prints "Claude 4.5 Opus", "Gemini 3 Flash" and "GPT 5.2", while the vendor table above lists Claude Opus 5.5, gemini-4-neon and gpt-6-luna. Different naming generations may not be the same models, so this article never claims that a vendor model in its table scores a leaderboard number.

## What did we not measure?

We did not run a benchmark ourselves. We read two, with their settings, and we are not treating either as a quality verdict: there is no "smarter" and no "better at coding" here.

Also absent by design: the Anthropic, OpenAI, DeepSeek and Google terms pages were listed but not opened, so no claim is made about what they permit; gpt-6-luna's context window is "not captured"; grok-4.7's file input is not documented on the pages checked, deepseek-flash's file input is unverified, and Gemini's terms link was listed in the documentation nav but not opened.

## FAQ

### Can I compare these models by price alone?

Only if you know your token mix. Input and output are priced separately, long context costs more on OpenAI and xAI, and Haiku 5.5's input figure is qualified by prompt length. A model that looks cheapest per input token can cost more on a task that writes a lot.

### Why are some cells "not captured" instead of zero or a guess?

Because the page did not print the figure where it could be read. A zero would be wrong and a guess would be invented. "Not captured" is the truthful cell, and it tells you what to re-check on the vendor's page.

### Does Gemini belong in a comparison like this?

Only with a warning. Google sells it through a bundle that includes storage and other services, so its plan price is not line-for-line comparable with a bare chat plan. The API price above is comparable; the consumer bundle is not, and this article does not rank it.

---

**Read next**

[What RM100 a month actually buys you in AI](https://upahje.my/en/articles/rm100-budget)

[More on buying and choosing tools](https://upahje.my/en/articles/category/buying-guides)
