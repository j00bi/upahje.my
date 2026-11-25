---
title: "Open weights, four licence types: what each model allows"
description: "Four open-weight families, five model cards, four licence shapes: MIT on DeepSeek, a custom Qwen licence, Mistral's own. What each permits and its rental cost."
slug: open-models-differences
translationKey: open-models-differences
date: 2026-11-19
updated: 2026-11-19
author: "UpahJe Desk"
category: buying-guides
tags: [buying-guides, open-weight, licence, malaysia]
canonical: https://upahje.my/en/articles/open-models-differences
draft: false
changelog:
  - date: 2026-11-19
    note: "First published."
sources:
  - title: "DeepSeek-V4.1-Flash-1017 model card and licence"
    url: "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017"
    checked: 2026-11-19
  - title: "DeepSeek-V4-Pro-0813 model card and licence"
    url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813"
    checked: 2026-11-19
  - title: "Qwen3.8-2.4T-A95B model card and licence"
    url: "https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B"
    checked: 2026-11-19
  - title: "Mistral-Large-4-1T-A52B model card and licence"
    url: "https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B"
    checked: 2026-11-19
  - title: "Kimi-K3.1-Pro model card and licence"
    url: "https://huggingface.co/moonshotai/Kimi-K3.1-Pro"
    checked: 2026-11-19
  - title: "DeepSeek, API pricing"
    url: "https://api-docs.deepseek.com/quick_start/pricing"
    checked: 2026-11-19
  - title: "Moonshot AI, Kimi chat pricing"
    url: "https://platform.moonshot.ai/docs/pricing/chat"
    checked: 2026-11-19
  - title: "Mistral AI, inference pricing"
    url: "https://docs.mistral.ai/inference/pricing.md"
    checked: 2026-11-19
---

# Open weights do not mean one licence: five models, four licence types

The licence is the difference that decides whether you can use a model in a business at all. Of the five open-weight models read for this article, two are MIT, one carries a custom Qwen licence, one carries Mistral's own open-weight licence, and one carries a Kimi licence. "Open weight" tells you the files are downloadable; it does not tell you what you may do with them.

## What does each licence actually say?

The licence name and the restriction, quoted from the model card or its licence file, not from a summary.

| Model (vendor spelling) | Licence as published | What the card states | Parameters |
| --- | --- | --- | --- |
| DeepSeek-V4.1-Flash-1017 | MIT | "This repository and the model weights are licensed under the MIT License." | Not stated in card text |
| DeepSeek-V4-Pro-0813 | MIT | Same wording as above | Not stated in card text |
| Qwen3.8-2.4T-A95B | Custom, `license_name: qwen3.8-max` | Licence text in the repo's LICENSE file | 2.4T total, 95B activated |
| Mistral-Large-4-1T-A52B | Mistral Ecosystem Open-Weight License | Licence text in the repo's LICENSE file | 1 trillion |
| Kimi-K3.1-Pro | Kimi K3.1 Pro License | Licence text in the repo's LICENSE file | 2.8T total, 104B activated |

MIT is the permissive one: commercial use, modification and redistribution, with the notice kept. The other three are custom licences whose terms live in the repository's LICENSE file. Those files were not opened, so this article names the licences without summarising their terms. Either way, a custom licence is a document you read, not a label you assume.

## What does it take to run one?

Size is the first wall, and the hardware guidance on the cards does not give a minimum anyone can price against.

The cards state parameter counts of 95B activated within 2.4T for Qwen, 1T for Mistral Large 4, and 104B activated within 2.8T for Kimi. Mistral's card carries the only first-party hardware note among them: "`--tp-size 8`: example tensor-parallel size for a node of 8 GPUs", and it is an example rather than a stated minimum. The Qwen and DeepSeek cards point at vLLM recipes and the SGLang cookbook, which is community deployment guidance, not a first-party minimum. Kimi's card has a deployment section but the hardware figures were not captured.

So this article cannot tell you what self-hosting costs. A node of GPUs is a real bill, and no card here states the minimum configuration, so any figure would be invented. What it can tell you is what renting the same model costs.

## What does renting cost instead?

Every one of these models is also sold per token by its publisher, and the prices differ enough to matter.

| Model | Publisher's hosted price, USD per million | Note |
| --- | --- | --- |
| deepseek-flash | 0.15 in / 0.60 out off-peak; 0.30 in / 1.20 out peak | Off-peak and peak differ |
| deepseek-v4-pro | 0.66 in / 1.98 out off-peak; peak output 3.96 | Peak input not captured |
| qwen3.8-max | 1.50 in / 4.50 out | Card states this is the official version based on Qwen3.8-2.4T-A95B |
| mistral-large-4 | 0.70 in / 2.10 out | First-party Mistral API |
| kimi-k3.1-pro | 2.00 in / 10.00 out | 1,048,576-token context |

A second host also sells DeepSeek V4.1 Flash: Mistral's API lists it at 0.30 in / 1.20 out, against DeepSeek's own off-peak 0.15 / 0.60. Same model card, two prices, which is the practical reason to shop the host rather than the model.

The arithmetic a buyer can do from here, at 1,000 input and 500 output tokens per task: deepseek-flash off-peak costs USD 0.00015 + USD 0.0003 = USD 0.00045 a task; kimi-k3.1-pro costs USD 0.002 + USD 0.005 = USD 0.007 a task. That is about 15 times the per-task cost, and both numbers are checkable against the table above.

## Which model should a Malaysian SME start with?

The cheapest per token that the licence plainly permits business use. On the rows read here, that is DeepSeek-V4.1-Flash-1017 at MIT, rented at 0.15 in / 0.60 out off-peak, before anyone buys a GPU.

That is a conditional recommendation, not a verdict: it assumes your task tolerates a Chinese vendor's API and that you do not need a custom licence review. If either condition fails, the next step is the Mistral or Qwen rows, both of which cost more per token and carry licences you must read.

## What could we not verify?

No card states a minimum hardware configuration, so no self-hosting cost is claimed. Kimi's hardware figures were not captured, and DeepSeek's peak input price is not published on the page read.

**Read next**

[Open or closed models: what a Malaysian SME can actually run in-house](https://upahje.my/en/articles/open-vs-closed-models-malaysia)

[More on buying and choosing tools](https://upahje.my/en/articles/category/buying-guides)

## FAQ

### Does open weight mean free to use commercially?

No. The licence decides that. MIT permits commercial use; a custom licence may restrict it, and you have to read the text in the repository's LICENSE file rather than trusting the words "open weight".

### Can I run one of these on a single GPU?

Not usefully for the models in this table. They run from 95B to 1T activated parameters, and Mistral's own example names a node of 8 GPUs. A single-GPU model would be a much smaller one, which this table does not cover.

### Is renting always worse than running it yourself?

No, and for most businesses renting wins because the node is expensive and idle most of the day. Running it yourself becomes a question when usage is high enough to beat the node's monthly cost, or when data location forces your hand. This article cannot price the node, so it does not pretend to draw that line.
