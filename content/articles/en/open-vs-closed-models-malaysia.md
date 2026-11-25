---
title: "Open or closed models: what an SME can run in-house"
description: "An open-weight model can be downloaded and run on hardware you control: cost per month in Malaysia, the volume where it beats per-call pricing, and the skills."
slug: open-vs-closed-models-malaysia
translationKey: open-vs-closed-models
date: 2026-11-19
updated: 2026-11-19
author: "UpahJe Desk"
category: definitions
tags: [definitions, ai-models, self-hosting, malaysia]
canonical: https://upahje.my/en/articles/open-vs-closed-models-malaysia
draft: false
changelog:
  - date: 2026-11-19
    note: "First published."
sources:
  - title: "Mistral AI, Mistral Small 4 model page (parameters, licence, API price)"
    url: "https://docs.mistral.ai/models/mistral-small-4-0-26-03"
    checked: 2026-11-19
  - title: "Mistral AI, models overview (open-weight catalogue and licences)"
    url: "https://docs.mistral.ai/models"
    checked: 2026-11-19
  - title: "OpenAI, API pricing (per-million-token rates)"
    url: "https://developers.openai.com/api/docs/pricing"
    checked: 2026-11-19
  - title: "DigitalOcean, GPU Droplets pricing"
    url: "https://www.digitalocean.com/pricing/gpu-droplets"
    checked: 2026-11-19
---

# Open or closed models: what an SME can run in-house

An open-weight model is one you can download and run on hardware you control. A closed model is one you can only call. For most Malaysian SMEs the practical answer is still closed, because running a model in-house needs a rented GPU, someone who can operate it, and a volume high enough to matter.

## What does "open-weight" actually let me do?

It means the model files are published, so you can put them on your own machine instead of calling the vendor's servers. As of 19 November 2026, Mistral's catalogue lists open-weight models under three licence shapes: Apache 2.0 for Mistral Small 4 and the Ministral 3 models, MIT for Z.ai GLM 5.3 and DeepSeek V4.1 Flash, and a vendor-specific licence for Mistral Large 4 ([Mistral docs, checked 19 Nov 2026](https://docs.mistral.ai/models)).

Two things that fact does not give you: free inference, and permission to ignore the licence. Apache 2.0 is a permissive licence, but the terms are on the model page and they are what governs your use ([Mistral Small 4 page, checked 19 Nov 2026](https://docs.mistral.ai/models/mistral-small-4-0-26-03)).

## What does each option cost per month?

The per-call side can be computed exactly, because vendors publish rates. The self-hosted side depends on GPU rental, which we could verify for one supplier only.

| Cost line | Pay per call | Run it in-house |
| --- | --- | --- |
| What you pay for | Tokens on each request | GPU time, billed by the hour |
| Verified rate | GPT-6 Luna: USD 0.10 per million input tokens, USD 0.50 per million output tokens. Mistral Small 4: USD 0.15 input, USD 0.60 output | DigitalOcean HGX B300: USD 7.94 per GPU hour |
| Monthly cost at 730 hours | Zero when nobody uses it | About USD 5,796 a month, before storage or a second GPU |
| Who runs it | The vendor | You, or whoever you hire |
| Who can change the model | The vendor, within their deprecation policy | You, when you update it |
| Where the data sits | The vendor's region | Wherever you rent the GPU |

The token rates are from OpenAI's pricing page and from Mistral's own model page, both checked on 19 November 2026 ([OpenAI pricing](https://developers.openai.com/api/docs/pricing), [Mistral Small 4](https://docs.mistral.ai/models/mistral-small-4-0-26-03)). The GPU rate is DigitalOcean's list price for an HGX B300, checked the same day ([DigitalOcean GPU pricing](https://www.digitalocean.com/pricing/gpu-droplets)).

## At what volume does self-hosting pay?

At a volume that no small business reaches: about 36 million messages a month, at the rates above.

The arithmetic, using a WhatsApp FAQ bot handling 3,000 messages a month at roughly 600 tokens in and 200 out per message:

1. That is 1.8 million input and 0.6 million output tokens a month.
2. On GPT-6 Luna that costs USD 0.48 a month. On Mistral Small 4 it costs USD 0.63.
3. One GPU at USD 7.94 an hour for 730 hours a month costs USD 5,796.20.
4. To spend USD 5,796 on GPT-6 Luna tokens you would need roughly 36 million messages a month, or 12,000 times the example workload.

Two honest limits on that number. The GPU price is one supplier's list rate for a high-end card, not the cheapest GPU time available, so the crossover can move lower. And a 119B-parameter model like Mistral Small 4, with 6.5 billion parameters active per token, does not fit on one GPU at full precision, so the rate above is a reference for GPU time, not a capacity plan ([Mistral, checked 19 Nov 2026](https://docs.mistral.ai/models/mistral-small-4-0-26-03)).

The comparison is also arithmetic, not capability. A model you run yourself is not automatically as capable as the closed one you were paying for, and that gap is the real reason most SMEs stay on per-call pricing.

Self-hosting keeps data in Malaysia only when the hardware is in Malaysia. Renting a GPU in another region moves the data there exactly as an API call does, so check where the rented machine actually sits before you make location the reason to own the stack.

Mistral's own API prices Mistral Small 4 at USD 0.15 per million input tokens and USD 0.60 per million output tokens ([checked 19 Nov 2026](https://docs.mistral.ai/models/mistral-small-4-0-26-03)).

## What does running one in-house actually require?

Five jobs, and none of them is a one-off setup.

1. Serving the model. Deploying an inference server, deciding on precision and batching, and keeping latency acceptable.
2. Watching it. GPU memory, error rates, and what happens when a request queues behind a long one.
3. Updating it. Open weights change; someone has to test whether a new version is better before switching.
4. Securing it. An endpoint that takes requests is an endpoint strangers can find.
5. Paying for idle time. GPU billing does not pause because nobody used the bot this afternoon.

This list is our description of the work, not a salary survey or a job specification.

## What should a Malaysian SME do this quarter?

Call an open-weight model before you try to run one. Mistral serves its own open-weight models through an API at USD 0.15 and USD 0.60 per million tokens, which gets you the licence and the model behaviour without buying a GPU or hiring anyone. Self-hosting becomes a question worth asking when your monthly token spend approaches a GPU's monthly cost, or when a data location requirement forces your hand.

**Read next**

[What an API costs to wire up in Malaysia](https://upahje.my/en/articles/what-is-an-api-for-malaysian-sme)

[More on APIs and models](https://upahje.my/en/articles/category/definitions)
