---
title: "Claude, ChatGPT, Gemini and Grok: what actually differs between the closed models"
description: "Not the benchmark score, which no current leaderboard here can settle. What you are stuck with: context window, price per token, documented capabilities and the terms. Every cell sourced or marked not captured."
slug: closed-models-differences
translationKey: closed-models-differences
date: 2026-11-19
updated: 2026-11-19
author: "UpahJe editorial"
category: buying-guides
tags: [buying-guides, closed-models, pricing, malaysia]
canonical: https://upahje.my/en/articles/closed-models-differences
draft: true
sources:
  - title: "Anthropic, models overview"
    url: "https://docs.claude.com/en/docs/about-claude/models/overview"
    checked: 2026-11-19
  - title: "OpenAI, models documentation"
    url: "https://platform.openai.com/docs/models"
    checked: 2026-11-19
  - title: "OpenAI, API pricing"
    url: "https://developers.openai.com/api/docs/pricing"
    checked: 2026-11-19
  - title: "DeepSeek, API pricing"
    url: "https://api-docs.deepseek.com/quick_start/pricing"
    checked: 2026-11-19
---

# Claude, ChatGPT, Gemini and Grok: what actually differs between the closed models

What differs is not which model scores highest. No current, dated leaderboard could be reached for this article, so no performance ranking is offered. What a buyer is actually stuck with is four documented things: the context window, the published price per million tokens, the capabilities the vendor documents, and the terms you accept.

## What is actually documented per model?

The table below carries only what the vendors' own pages state. Where a page did not print a figure, the cell says "not captured" rather than a number.

| Model (vendor spelling) | Context window | Input / output, USD per million tokens | Tool calling | Structured output | Terms |
| --- | --- | --- | --- | --- | --- |
| Claude Fable 5.2 | 1M tokens | 8 / 40 | Documented | Documented | Anthropic commercial terms |
| Claude Opus 5.5 | 1M tokens | 4 / 20 | Documented | Documented | Anthropic commercial terms |
| Claude Sonnet 5.5 | 1M tokens | 2 / 10 | Documented | Documented | Anthropic commercial terms |
| Claude Haiku 5.5 | 1M tokens | 0.10 / 0.50, input qualified up to 100,000 tokens | Documented | Documented | Anthropic commercial terms |
| GPT-6.2 Astra | 128K tokens | 8.00 / 40.00 | Documented | Documented | OpenAI terms |
| GPT-6.2 Sol | 128K tokens | 2.00 / 10.00 | Documented | Documented | OpenAI terms |
| GPT-6.2 Luna | 128K tokens | not captured | Documented | Documented | OpenAI terms |
| deepseek-flash | 1M tokens | input captured, output not captured | Documented | Documented | DeepSeek terms |
| deepseek-v4-pro | 1M tokens | input captured, output not captured | Documented | Documented | DeepSeek terms |

The Anthropic rows come from its models overview, the OpenAI rows from its models documentation and pricing page, and the DeepSeek rows from its API pricing page, all read on 19 November 2026.

Two rows need a note rather than a number. Claude Haiku 5.5's input price is qualified on the page as applying to prompts up to 100,000 tokens. And the DeepSeek output prices sat below the page truncation point, so they are absent rather than guessed.

## What does a benchmark score not tell you?

Almost everything a buyer needs, and this article deliberately has no benchmark table because the ones we could reach were not current.

SWE-bench serves its leaderboards through script rather than static text, and no dated snapshot was captured. The Aider polyglot page's visible top row carries a run directory dated 23 August 2025, which is not a snapshot of November 2026. Rather than cite either as current, this piece compares what you get and pay. A benchmark number also would not tell you the context window, the price, whether structured output is documented, or what the terms allow, which are the four things this table measures.

## Where is the lock-in?

Three places, and each one shows up in the contract rather than the benchmark.

**Data retention.** Every closed model runs on the vendor's infrastructure. What happens to your prompts is governed by the terms, and the terms pages were not opened for this piece, so I am not going to characterise them. Read yours before you paste a client's document.

**Model deprecation.** A closed model can be retired on the vendor's schedule. The prices and names above are dated 19 November 2026 for exactly that reason: they are a snapshot of a moving target, not a permanent property.

**Export.** There is no weights file to take with you. Moving to another vendor means rebuilding prompts, tools and evaluation, which is a cost no table captures.

## Which vendor names drift?

OpenAI's pages disagree with each other, and the table keeps both spellings rather than picking one.

The consumer pricing page names GPT-6 and GPT-6 Astra. The platform documentation names GPT-6.2 Astra, GPT-6.2 Sol and GPT-6.2 Luna. Both spellings are recorded as printed, with each page as its own source. If you are briefing a supplier, quote the platform name, because that is the one the API documents.

## What did we not measure?

We did not run a benchmark, and we are not borrowing a stale one. There is no quality ranking in this article, no "smarter" and no "better at coding".

Also absent by design: the Anthropic and OpenAI and DeepSeek terms pages were listed but not opened, so no claim is made about what they permit; GPT-6.2 Luna's price and both DeepSeek output prices are "not captured"; and Gemini and Grok do not appear as rows because their model documentation was not read in this pass, which is a gap in our reading rather than evidence they lack the features.

## FAQ

### Can I compare these models by price alone?

Only if you know your token mix. Input and output are priced separately, the ratio differs per task, and Haiku 5.5's input price is qualified by prompt length. A model that looks cheapest per input token can cost more on a task that writes a lot.

### Why are some cells "not captured" instead of zero or a guess?

Because the page did not print the figure where we could read it. A zero would be wrong and a guess would be invented. "Not captured" is the truthful cell, and it tells you what to re-check on the vendor's page.

### Does a 1M token context window mean I should send 1M tokens?

No practical reason to. Cost scales with tokens and most tasks need far less. The window matters for the rare case of a long document or a long transcript, not as a default.

---

**Read next**

[What RM100 a month actually buys you in AI](https://upahje.my/en/articles/rm100-budget)

[More on buying and choosing tools](https://upahje.my/en/articles/category/buying-guides)
