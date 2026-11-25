---
title: "What a rented GPU costs in ringgit, per hour"
description: "Cloud GPUs are quoted in dollars. Runpod's RTX 4090 row reads USD 0.89 an hour, which is RM3.66 at the rate read on 25 November 2026, so 20 minutes is RM1.22."
slug: rent-a-gpu-malaysia
translationKey: rent-a-gpu-malaysia
format: explainer
reader: owner
date: 2026-11-25
updated: 2026-11-25
author: "UpahJe Desk"
category: buying-guides
tags: [buying-guides, gpu, pricing, malaysia]
cardFigure: "RM3.66 an hour for an RTX 4090"
canonical: https://upahje.my/en/articles/rent-a-gpu-malaysia
draft: true
changelog:
  - date: 2026-11-25
    note: "First published."
sources:
  - title: "Runpod, GPU cloud pricing (rendered row: RTX 4090 24 GB, 41 GB RAM, 6 vCPUs, 0.89 USD per hour; metadata line also claims RTX 4090 from 0.34)"
    url: "https://www.runpod.io/pricing"
    checked: 2026-11-25
  - title: "Vast.ai, pricing page (no per-card rate published; states no minimum hours and no rounding up)"
    url: "https://vast.ai/pricing"
    checked: 2026-11-25
  - title: "Bank Negara Malaysia, exchange-rate API (USD middle rate 4.1175, read 25 November 2026 17:08:03)"
    url: "https://api.bnm.gov.my/public/exchange-rate"
    checked: 2026-11-25
---

# What a rented GPU costs in ringgit, per hour

Runpod's rendered price row for an RTX 4090 reads USD 0.89 an hour, which is RM3.66 at the Bank Negara middle rate of 4.1175 read on 25 November 2026. Twenty minutes is RM1.22. Our own 17.9-minute run cost USD 0.14, or RM0.58, because the instance we were given billed nearer USD 0.47 an hour.

## The row you can actually price

The page prints two things that look like a rate for the same card. The configuration row reads "RTX 4090 24 GB VRAM 41 GB RAM 6 vCPUs $0.89 /hr", with a per-hour and per-second toggle beside it. The page's metadata line says "RTX 4090 from $0.34/hr", and no configuration is shown to match that figure.

The row is what you can see, select and be billed for. The "from" line is the page's cheapest claim, and a claim without a configuration is not a quote.

| Item | USD per hour | Ringgit per hour at 4.1175 | 20-minute session in ringgit |
| --- | --- | --- | --- |
| RTX 4090, 24 GB, 41 GB RAM, 6 vCPUs | 0.89 | 3.66 | 1.22 |
| The page's "from" claim, no configuration shown | 0.34 | 1.40 | 0.47 |
| Our own run, billed duration | 0.47 implied | 1.93 | 0.58 |

The conversion is the table's caveat: it is fixed at one day's rate, and the ringgit figure moved within the day, from 4.1155 at midday to 4.1175 in the afternoon. That is why the date sits in the sentence rather than only in the sources.

## Two vendors, one readable price

Vast.ai is the other marketplace a Malaysian buyer will find, and it publishes no per-card rate: the page states "No minimum hours, no rounding up" and prices live per machine. That is a fair billing rule and not a number to budget from.

Lambda was opened for this article and sells no RTX 4090 at all, pricing an H100 instead, so it is not a comparison here. The result is one readable 4090 rate and one marketplace whose rate appears after the HTML loads.

## What we were actually billed

Our run took 17.9 minutes and cost USD 0.14. At the configuration row's rate, that duration should have come to about USD 0.27, so the instance we were given billed at roughly USD 0.47 an hour.

We did not record which variant it was, so the honest reading is that the row rate is not a promise about your invoice. Budget from the row, then compare the first bill with it.

## The session is the unit that decides

Twenty minutes on a 4090 is RM1.22, an hour is RM3.66, and a ten-hour job is RM36.60. The last of those is a number a business can approve or refuse, and the first is smaller than the drink next to the laptop.

Billing runs by the second on Runpod's toggle and under the policy Vast states, which is why 17.9 minutes is billed as 17.9 minutes rather than a rounded hour. It is also why an idle instance costs exactly as much as a busy one: the meter does not pause while you read the output, so an instance left running overnight can cost more than the job you meant to run.

## What to do before you rent

1. Convert the row rate at a dated rate, and write the date beside it.
2. Convert the session length you actually need, not the hourly rate.
3. Stop the instance when the run finishes, because idle time bills the same.
4. Compare the first invoice against the row, and note the variant.
5. Decide on the total for the job, not the hourly number.

My opinion, stated once: the hourly figure is the least useful number on the page. A Malaysian budget needs the job total, and for most small jobs that total is smaller than the subscription already being paid for something else.

---

**Read next**

[Why RM9.90 sells more than RM10, and stops working at RM99](https://upahje.my/en/articles/price-endings-nine)

[More on buying and choosing tools](https://upahje.my/en/articles/category/buying-guides)
