---
title: "An empty reply with a length finish still bills you"
description: "Three of four calls returned zero characters, each having spent 4,000 tokens thinking. The status was 200 and the money left the account anyway."
slug: empty-reply-length-finish
translationKey: empty-reply-length-finish
format: field-test
reader: owner
date: 2026-11-27
updated: 2026-11-27
author: "Husni Ahmad"
category: definitions
audience: publication
tags: [definitions, api, cost, reasoning-models]
cardFigure: "4,000 reasoning tokens, 0 characters returned"
canonical: https://upahje.my/en/articles/empty-reply-length-finish
changelog:
  - date: 2026-11-27
    note: "First published."
sources:
  - title: "OpenAI, reasoning guide (reasoning tokens are not visible via the API, occupy the context window and are billed as output tokens)"
    url: "https://platform.openai.com/docs/guides/reasoning"
    checked: 2026-11-27
  - title: "Anthropic, extended thinking (usage.output_tokens_details.thinking_tokens reports how many billed output tokens were internal reasoning)"
    url: "https://docs.claude.com/en/docs/build-with-claude/extended-thinking"
    checked: 2026-11-27
  - title: "DeepSeek, models and pricing (output USD 1.20 per 1M tokens at peak, 0.60 off-peak; cache-miss input 0.30 peak)"
    url: "https://api-docs.deepseek.com/quick_start/pricing"
    checked: 2026-11-27
---

# An empty reply with a length finish still bills you

Four requests went out on 27 November 2026. Three came back with **HTTP 200**, `finish_reason: "length"`, **zero characters of content**, and **4,000 reasoning tokens** spent on each. The fourth returned 8,345 characters. All four were billed.

The failure is quiet in the worst way. Nothing errored, no exception fired, and a client that checks `response.status_code == 200` would have written three empty strings into a database and moved on.

## What the four calls returned

Same prompt, same 4,000-token ceiling, two models, with the thinking budget set and unset:

| Model | Effort set | Seconds | Finish | Content | Reasoning tokens |
| --- | --- | --- | --- | --- | --- |
| deepseek-v4.1-flash | unset | 26.2 | length | **0 chars** | 4,000 |
| deepseek-v4.1-flash | low | 24.5 | length | **0 chars** | 4,000 |
| glm-5.3-flash | unset | 60.4 | length | **0 chars** | 4,000 |
| glm-5.3-flash | low | 25.0 | stop | 8,345 chars | **27** |

Read the reasoning column against the ceiling. Each failed call produced exactly 4,000 reasoning tokens, which is exactly `max_tokens`. The model spent the entire budget thinking and had nothing left to say.

## Length is a ceiling, not an error

`finish_reason: "length"` means generation stopped because it hit `max_tokens`. It is not a warning about output quality and it is not an HTTP error. When a reasoning model runs into that ceiling while still thinking, you get a well-formed response envelope containing an empty message.

The thinking is invisible and still charged. OpenAI states it directly: reasoning tokens *"are not visible via the API"* but *"occupy space in the model's context window and are billed as output tokens."* Anthropic exposes the same thing as a number: `usage.output_tokens_details.thinking_tokens` reports how many of the billed output tokens were internal reasoning.

So the money moved, the account was debited, and the payload was an empty string.

## What nothing costs

At DeepSeek's published peak rate of **USD 1.20 per million output tokens**, 4,000 reasoning tokens is **USD 0.0048**, or about **two sen** at 4.1165 ringgit to the dollar.

Two sen is not the problem. The problem is what happens around it. A batch job that loops over 400 rows at two sen a row spends eight ringgit producing nothing, and a scheduled job that does that nightly spends 240 ringgit a month on empty strings. Nobody notices, because every call succeeded.

## Setting effort low fixed one model and not the other

This is the part worth carrying into your own code, because it contradicts the obvious fix.

I had assumed that lowering the reasoning effort solves the whole class of failure. On 27 November it did not. `glm-5.3-flash` dropped from 4,000 reasoning tokens to **27**, and returned 8,345 characters in 25 seconds. `deepseek-v4.1-flash` spent **4,000 reasoning tokens anyway** and returned nothing in both configurations.

Same parameter, same prompt, opposite result. Whatever a provider does with `reasoning_effort`, it is not a guaranteed budget, and it is not portable between models. Treat it as a hint you must verify per model, not a setting you configure once.

## Check the content, not the status

The guard is four lines and it belongs in the client, not in the caller:

```python
msg = resp["choices"][0]
content = (msg.get("message") or {}).get("content") or ""
usage = (msg.get("message") or {})
details = (resp.get("usage") or {}).get("completion_tokens_details") or {}

if not content.strip():
    raise RuntimeError(
        f"empty content: finish={msg.get('finish_reason')} "
        f"reasoning={details.get('reasoning_tokens')} "
        f"completion={resp['usage']['completion_tokens']}"
    )
```

Two details make the error message useful later. `finish_reason` tells you which ceiling was hit. `reasoning_tokens` tells you whether the budget went into thinking, which distinguishes a truncated answer from a genuinely empty one.

Log the reasoning token count on every call, not only on failures. A model whose reasoning share climbs from 5% to 90% of output tokens is drifting toward this failure before it arrives, and the trend shows up in the log days before the empty string does.

## Raise the ceiling and read the bill

There are two honest fixes and they point in opposite directions. Raise `max_tokens` so thinking and answering both fit, which costs more per call and hides nothing. Or keep the ceiling and switch to a model that respects the effort hint, which the table above shows is a real difference between two models given identical input.

What does not work is treating a 200 as success. The status code describes the transport, and this failure travels perfectly.

---

**Read next**

[Where an API key goes in a harness, and where never](https://upahje.my/en/articles/harness-api-keys)

[What RM100 a month buys in AI](https://upahje.my/en/articles/rm100-budget)

[Test one order on your phone before you send the link](https://upahje.my/en/articles/test-one-order-before-launch)
