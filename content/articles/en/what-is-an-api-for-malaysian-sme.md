---
title: "What is an API, explained for a Malaysian small business owner"
description: "An API is an agreed way for two software systems to exchange data on request. What that means for a Malaysian SME, open versus closed model APIs, and what it costs to have someone wire one up here."
slug: what-is-an-api-for-malaysian-sme
translationKey: what-is-an-api
date: 2026-11-19
updated: 2026-11-19
author: "UpahJe editorial"
category: definitions
tags: [definitions, api, sme, malaysia]
canonical: https://upahje.my/en/articles/what-is-an-api-for-malaysian-sme
draft: false
sources:
  - title: "MDN Web Docs — API (Glossary)"
    url: "https://developer.mozilla.org/en-US/docs/Glossary/API"
    checked: 2026-11-19
  - title: "Mistral AI — Models overview (open-weight catalogue and licences)"
    url: "https://docs.mistral.ai/models"
    checked: 2026-11-19
  - title: "OpenAI — API pricing (per-million-token rates)"
    url: "https://developers.openai.com/api/docs/pricing"
    checked: 2026-11-19
  - title: "OpenAI — API model catalogue"
    url: "https://developers.openai.com/api/docs/models"
    checked: 2026-11-19
---

# What is an API, explained for a Malaysian small business owner

An API is an agreed way for two pieces of software to exchange data on request, without a person copying it across by hand. For a Malaysian small business, it is the difference between a staff member retyping marketplace orders into a spreadsheet and your store passing each order straight to the courier's system.

## What does an API actually do for my business?

An API carries one defined piece of data between two systems, on request, in a format both sides already agreed on. MDN describes it as a contract between the application offering it and whatever calls it ([MDN, checked 19 Nov 2026](https://developer.mozilla.org/en-US/docs/Glossary/API)).

What that contract replaces in ordinary Malaysian SME operations:

- **Orders.** Your site books the courier when an order is paid, instead of staff copying the order into a courier portal.
- **Payments.** The payment gateway calls your site and marks an order paid, instead of someone checking the bank app to confirm a transfer.
- **Stock.** A WhatsApp bot asks your inventory system before answering, instead of an answer being written after checking stock by hand.
- **Accounts.** The accounting tool pulls invoices from your store, instead of invoices being retyped.

The common thread: the API removes a human step that exists only because two systems cannot talk. It does not make either system smarter.

## What is the difference between an open and a closed model API?

A closed model API is one you can call but never host yourself; an open-weight model API is one whose model files you can download and run on hardware you control.

Six differences decide the choice, in the order they matter to a business owner:

1. **Where the model runs.** Closed: the vendor's servers. Open-weight: your server, or a host you choose.
2. **Whether you can obtain the model.** Closed: no, you get a catalogue and per-token rates. Open-weight: yes, you download the weights.
3. **What governs use.** Closed: the vendor's terms of service. Open-weight: a model licence — Apache 2.0, MIT, or a vendor-specific licence.
4. **What you pay for.** Closed: tokens or requests, and nothing when nobody uses it. Open-weight: compute and hosting every month, plus someone to run it.
5. **Who can change the model under you.** Closed: the vendor can, within their deprecation policy. Open-weight: only when you update it yourself.
6. **Whether your data leaves your premises.** Closed: usually yes. Open-weight: not necessarily.

As of 19 November 2026, Mistral's own catalogue lists all three licence shapes side by side: Mistral Small 4 and the Ministral 3 models under Apache 2.0, Z.ai GLM 5.3 and DeepSeek V4.1 Flash under MIT, and Mistral Large 4 under a vendor-specific "Mistral Ecosystem Open Weight License" ([Mistral docs, checked 19 Nov 2026](https://docs.mistral.ai/models)). Closed vendors publish a model catalogue and rates instead of weights ([OpenAI model catalogue, checked 19 Nov 2026](https://developers.openai.com/api/docs/models)).

Neither is better in the abstract. A closed API is cheaper when your volume is small, because you pay per call and nothing when nobody uses it. An open-weight model only wins once your monthly usage is high enough to beat the cost of the server, and once you have someone who can run it — which for most Malaysian SMEs is the part that decides it.

## What does it cost to wire an API up in Malaysia?

There are two bills, not one: the build, paid once to a person, and the running cost, paid every month to the vendor.

**The build.** No public benchmark exists for what Malaysian developers charge specifically for API integration work as of November 2026. What is observable is that quotes vary with the same handful of factors: how many endpoints, whether you need write access or only read, how authentication works, what should happen when a call fails, and how messy your existing data is. Because that is how the price is set, a quote that arrives before those questions are asked is an estimate, not a price.

**The running cost.** This one can be worked out exactly, because vendors publish rates. Using OpenAI's standard rates for a small current model, GPT-6 Luna, at USD 0.10 per million input tokens and USD 0.50 per million output tokens ([OpenAI pricing, checked 19 Nov 2026](https://developers.openai.com/api/docs/pricing)), a WhatsApp FAQ bot handling 3,000 messages a month — about 600 tokens in and 200 out per message — costs roughly USD 0.48 a month in tokens. Hosting and the developer's time are separate, and the exchange rate you actually pay is set by your card, not by this figure.

**The bill people forget.** Maintenance. When a vendor retires a model version your integration stops working, and the repair is not free.

To price a job yourself, do this before you ask for a quote:

1. Write down every system that must talk to which, and in which direction.
2. Separate read-only work from anything that writes data or moves money.
3. Ask what happens on a failed call — silent loss of an order is the expensive outcome.
4. Ask for a fixed price per integration, not an hourly estimate.
5. Ask what happens to the code and credentials when the engagement ends.

## How do I know if I need an API, or just a person doing it manually?

If the task happens a few times a day and a mistake is cheap to fix, keep doing it manually; an API starts to pay when volume or the cost of an error crosses that line.

This next part is our judgement, not a published benchmark: the crossover is usually around the point where someone spends more than an hour a day on the copying, or where a single missed order costs more than a month of the vendor's fee. Below that, a part-time staff member who is careful is the cheaper and more reliable system.

## How do I protect myself when I pay someone to build this?

Five things to settle in writing before payment, in this order:

1. **Scope.** Which systems, which endpoints, read or write.
2. **Ownership of credentials.** API keys belong to your account, never to the developer's. Create a separate key per integration, with a spending limit, and revoke it when the work ends. A key is a password.
3. **Failure behaviour.** Retry, queue, or alert. Silence is not acceptable for anything involving money or orders.
4. **Exit.** You get the code and a working test environment, not just a running system on someone else's account.
5. **Deprecation.** Who updates the integration when the vendor retires the version, and at what price.

## FAQ

### Do I need my own server to use an API?

No. Using a closed API needs an internet connection and a small script or app, nothing more. You need a server only if you host an open-weight model yourself.

### What happens if a provider changes or shuts down their API?

Your integration stops working until it is updated. The window is the vendor's, not yours — OpenAI, for example, publishes a deprecation timeline linked from its pricing page ([checked 19 Nov 2026](https://developers.openai.com/api/docs/pricing)). The practical defence is keeping the integration thin so it can be pointed at another provider.

### Is it safe to give a freelancer my API keys?

Not your main key. Issue a separate key for that integration with a spending limit, keep it out of WhatsApp and email, and revoke it on the last day of the job. A revoked key costs nothing; a leaked one can cost your whole account.

### How long does a first integration take?

For a single read-only endpoint, a competent developer needs about a day. Anything that moves money or writes data needs a week, most of it spent on what happens when calls fail. No published dataset for Malaysian timelines exists, so treat those as working estimates, not measurements.

---

**Read next:** [the definitions pillar](/en/articles/category/definitions).
