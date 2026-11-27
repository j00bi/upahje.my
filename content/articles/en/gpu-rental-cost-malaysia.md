---
title: "The same H100 rents for RM11.89 an hour, or RM7.12"
description: "Runpod lists an H100 SXM at USD 4.39 an hour and Vast.ai at USD 1.73 for the same silicon. The spread is billing model and idle capacity, not hardware."
slug: gpu-rental-cost-malaysia
translationKey: gpu-rental-cost-malaysia
format: comparison
reader: owner
date: 2026-11-25
updated: 2026-11-25
author: "UpahJe Desk"
category: buying-guides
tags: [buying-guides, gpu, compute, malaysia]
cardFigure: "RM7.12 to RM18.07 for one H100 hour"
canonical: https://upahje.my/en/articles/gpu-rental-cost-malaysia
draft: false
changelog:
  - date: 2026-11-25
    note: "First published."
sources:
  - title: "Runpod, GPU cloud pricing (H100 PCIe USD 2.89/hr, H100 SXM USD 4.39/hr, H100 NVL USD 3.19/hr, B200 USD 7.99/hr, RTX A5000 USD 0.27/hr)"
    url: "https://www.runpod.io/pricing"
    checked: 2026-11-25
  - title: "Vast.ai, GPU pricing (H100 SXM from USD 1.73/hr, median USD 2.40/hr; H100 PCIe from USD 2.31/hr; billed to the second, no minimum hours)"
    url: "https://vast.ai/pricing"
    checked: 2026-11-25
  - title: "Frankfurter, USD to MYR reference rate 4.1155 for 24 November 2026"
    url: "https://api.frankfurter.dev/v1/latest?base=USD&symbols=MYR"
    checked: 2026-11-25
---

# The same H100 rents for RM11.89 an hour, or RM7.12

An Nvidia H100 SXM rents for USD 4.39 an hour on Runpod and from USD 1.73 on Vast.ai. At the reference rate of RM4.1155 to the dollar, that is RM18.07 against RM7.12 for the same model of card. Nothing about the hardware differs. The price differs because one marketplace sells a reservation and the other sells whatever a stranger's machine happens to be idle.

## The published rates, converted

Runpod publishes a fixed card per model. Vast publishes a floor and a median, because each listing is a different host with a different reliability record. Both are quoted below in dollars as printed, then in ringgit at the 24 November 2026 rate.

| Card | Runpod, as printed | In ringgit | Vast from | In ringgit | Vast median |
| --- | --- | --- | --- | --- | --- |
| H100 SXM, 80 GB | USD 4.39/hr | RM18.07 | USD 1.73/hr | RM7.12 | USD 2.40/hr |
| H100 PCIe, 80 GB | USD 2.89/hr | RM11.89 | USD 2.31/hr | RM9.51 | USD 2.53/hr |
| H100 NVL, 94 GB | USD 3.19/hr | RM13.13 | USD 2.57/hr | RM10.58 | — |
| B200, 180 GB | USD 7.99/hr | RM32.88 | — | — | — |
| RTX A5000, 24 GB | USD 0.27/hr | RM1.11 | — | — | — |

The H100 PCIe row is the interesting one: the gap narrows from 2.5 times to 1.25 times the moment you compare the same variant rather than the flagship. A firm that prices a project off the fastest card on one platform and the cheapest card on another is comparing two different products.

## Per-second billing is where the money actually moves

Runpod bills per second on its secure cloud, and Vast bills to the second with no minimum hours. That matters more than the headline rate for work that finishes early, because a training run that ends after 18 minutes should not cost an hour.

An 18-minute run on an H100 PCIe at RM11.89 an hour comes to RM3.57. The same run bought in whole hours costs RM11.89, and the difference across twenty experiments is RM166 rather than RM714.

## A month of continuous rent, in ringgit

Nobody runs an H100 continuously to serve a small business, but the monthly figure is the one that ends the argument about buying a card. At 720 hours:

| Configuration | Monthly, in ringgit |
| --- | --- |
| Vast H100 SXM at the floor | RM5,126 |
| Vast H100 SXM at the median | RM7,114 |
| Runpod H100 PCIe | RM8,561 |
| Runpod H100 SXM | RM13,010 |
| Runpod B200 | RM23,674 |

A single H100 card bought outright costs more than a year of the cheapest monthly rent above, before power, cooling and the fact that it is obsolete the moment the next generation ships. That arithmetic is the whole case for renting, and it holds at every row in the table.

## What the cheap listings cost you

The floor price on a marketplace is a machine in someone's data centre, and the listing tells you which. Check three things before running anything with a deadline:

1. **Interruptible or not.** The lowest rates are usually preemptible, which means the job stops when the host needs the card back.
2. **Network speed.** A cheap card behind a slow link is the wrong tool for anything that moves a dataset.
3. **Verification and reliability score.** A host with a short track record is cheaper for a reason, and an interrupted 6-hour run costs more than the difference in rate.

Runpod's fixed price buys a known card and a known region. Vast's floor buys capacity somebody else did not want this hour. Both are legitimate purchases; they are not the same purchase.

## What to do before you rent anything

1. Price the same card variant on both platforms, not the flagship on one and the budget card on the other.
2. Convert at a rate you can cite, and write the date next to it, because a ringgit figure without a date is a rumour.
3. Estimate the run in minutes, not hours, and check whether billing is per second.
4. For anything with a deadline, price the interruptible rate out of the comparison entirely.

The ringgit figure that matters for a Malaysian business is not the hourly rate, it is the cost of the experiment that fails. At RM7 an hour you can afford to be wrong four times on a Saturday, and that is worth more than a guarantee of the fastest card.

---

**Read next**

[What an AI agent can do for a small business](https://upahje.my/en/articles/what-an-ai-agent-can-do)

[More buying guides, with prices in ringgit](https://upahje.my/en/glossary)

[The same H100 rents for RM11.89 an hour, or RM7.12](https://upahje.my/en/articles/self-hosted-clipping)

[The same H100 rents for RM11.89 an hour, or RM7.12](https://upahje.my/en/articles/spare-laptop-home-server-malaysia)
