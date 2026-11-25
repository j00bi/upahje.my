---
title: "What is an API, for a small business owner"
description: "An API is a contract that lets two systems exchange data without a human copying it. What it means for a Malaysian SME, open versus closed models, and the cost."
slug: what-is-an-api-for-malaysian-sme
translationKey: what-is-an-api
date: 2026-11-19
updated: 2026-11-19
author: "UpahJe Desk"
category: definitions
tags: [definitions, api, sme, malaysia]
canonical: https://upahje.my/en/articles/what-is-an-api-for-malaysian-sme
draft: false
changelog:
  - date: 2026-11-19
    note: "First published."
sources:
  - title: "MDN Web Docs, API glossary"
    url: "https://developer.mozilla.org/en-US/docs/Glossary/API"
    checked: 2026-11-19
  - title: "Mistral AI, models overview (open-weight catalogue and licences)"
    url: "https://docs.mistral.ai/models"
    checked: 2026-11-19
  - title: "OpenAI, API pricing (per-million-token rates)"
    url: "https://developers.openai.com/api/docs/pricing"
    checked: 2026-11-19
  - title: "OpenAI, API model catalogue"
    url: "https://developers.openai.com/api/docs/models"
    checked: 2026-11-19
---

# What is an API, for a small business owner

An API is an agreed way for two pieces of software to exchange data on request, without a person copying it across by hand. For a Malaysian small business, it is the difference between a staff member retyping marketplace orders into a spreadsheet and your store passing each order straight to the courier's system.

## What does an API actually do for my business?

An API carries one defined piece of data between two systems, on request, in a format both sides agreed on. MDN describes it as a contract between the application offering it and whatever calls it ([MDN, checked 19 Nov 2026](https://developer.mozilla.org/en-US/docs/Glossary/API)).

- Your site books the courier when an order is paid, instead of staff copying the order into a courier portal.
- The payment gateway calls your site and marks an order paid, instead of someone checking the bank app to confirm a transfer.
- A WhatsApp bot asks your inventory system before answering, instead of an answer being written after checking stock by hand.
- The accounting tool pulls invoices from your store, instead of invoices being retyped.

![Your store sends an order to the API, the API passes it to the courier, and the delivery status comes back the same way](/figures/what-is-an-api.svg)
*One order, out through the API and back as a status.*

## What is the difference between an open and a closed model API?

A closed model API is one you can call but never host yourself. An open-weight model API is one whose model files you can download and run on hardware you control.

| What decides it | Closed model API | Open-weight model API |
| --- | --- | --- |
| Where the model runs | The vendor's servers | Your server, or a host you choose |
| Whether you can obtain the model | No. You get a catalogue and per-token rates | Yes. You download the weights |
| What governs use | The vendor's terms of service | A model licence: Apache 2.0, MIT, or a vendor-specific licence |
| What you pay for | Tokens or requests, and nothing when nobody uses it | Compute and hosting every month, plus someone to run it |
| Who can change the model under you | The vendor can, within their deprecation policy | Only when you update it yourself |
| Whether your data leaves your premises | Usually yes | Not necessarily |

As of 19 November 2026, Mistral's own catalogue lists all three licence shapes side by side: Mistral Small 4 and the Ministral 3 models under Apache 2.0, Z.ai GLM 5.3 and DeepSeek V4.1 Flash under MIT, and Mistral Large 4 under a vendor-specific "Mistral Ecosystem Open Weight License" ([Mistral docs, checked 19 Nov 2026](https://docs.mistral.ai/models)). Closed vendors publish a model catalogue and rates instead of weights ([OpenAI model catalogue, checked 19 Nov 2026](https://developers.openai.com/api/docs/models)).

## Which one should a small business start with?

Pay per call costs nothing when the volume is zero. A server costs every month whether anyone uses it. That arithmetic is why a closed API is the cheaper start for most small businesses. An open-weight model wins only once your monthly usage is high enough to beat the cost of the machine, and someone on your side can run it. For most Malaysian SMEs the second condition decides it.

## What does it cost to have someone wire an API up in Malaysia?

No public benchmark exists for what Malaysian developers charge for API integration work as of November 2026. Quotes vary with how many endpoints you need, whether the integration writes data or only reads it, how authentication works, what should happen when a call fails, and how messy your existing data is. A price given before those five questions are answered is an estimate.

## How do I price the job myself?

Pricing starts before you ask for a quote, with five facts that decide the number.

1. List every system that must talk to which, and in which direction.
2. Separate read-only work from anything that writes data or moves money.
3. Ask what happens on a failed call. Silent loss of an order is the expensive outcome.
4. Ask for a fixed price per integration, not an hourly estimate.
5. Ask what happens to the code and credentials when the engagement ends.

## What does the bill look like each month?

Vendors publish their rates, so the monthly bill can be calculated rather than guessed. OpenAI's standard rate for a small current model, GPT-6 Luna, is USD 0.10 per million input tokens and USD 0.50 per million output tokens ([OpenAI pricing, checked 19 Nov 2026](https://developers.openai.com/api/docs/pricing)). A WhatsApp FAQ bot handling 3,000 messages a month, at roughly 600 tokens in and 200 out per message, costs about USD 0.48 a month in tokens. Add hosting if the integration runs on your own server, and add the exchange rate your card charges, which is not in these figures. Maintenance belongs in this bill too, because a retired model version stops the integration until someone repairs it.

## How do I know if I need an API, or just a person doing it manually?

If the task happens a few times a day and a mistake is cheap to fix, do it manually. An API starts to pay when volume or the cost of an error crosses that line. No published benchmark fixes that line, so this is our judgement: it sits around the point where someone spends more than an hour a day copying, or where one missed order costs more than a month of the vendor's fee. Below that, a careful part-time staff member is cheaper and more reliable.

## How do I protect myself when I pay someone to build this?

Settle three things in writing before you pay.

1. Scope. Which systems, which endpoints, read or write.
2. Failure behaviour. Retry, queue, or alert. Silence is not acceptable for anything involving money or orders.
3. Exit. You get the code and a working test environment, not a running system on someone else's account.

**Read next**

[Open or closed models, and which to start with](https://upahje.my/en/articles/open-vs-closed-models-malaysia)

[More on APIs and models](https://upahje.my/en/articles/category/definitions)
