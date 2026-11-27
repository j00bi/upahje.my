---
title: "USD 0.04 of GPU time, and the dataset was the work"
description: "A rented RTX 5060 Ti trained a trade filter in five seconds for four cents. The dataset took longer to build, and that is the lesson nobody sells."
slug: rented-gpu-what-it-finishes
translationKey: rented-gpu-what-it-finishes
format: field-test
reader: owner
date: 2026-11-26
updated: 2026-11-26
author: "UpahJe Desk"
category: buying-guides
audience: publication
tags: [buying-guides, gpu, compute, ai, malaysia]
cardFigure: "Four cents, twelve minutes, one experiment"
changelog:
  - date: 2026-11-26
    note: "First published."
canonical: https://upahje.my/en/articles/rented-gpu-what-it-finishes
sources:
  - title: "Vast.ai live GPU pricing, read from the pricing page"
    url: "https://vast.ai/pricing"
    checked: 2026-11-26
  - title: "QLoRA: Efficient Finetuning of Quantized LLMs, Dettmers et al., arXiv 2305.14314"
    url: "https://arxiv.org/abs/2305.14314"
    checked: 2026-11-26
  - title: "GeForce RTX 5060 Ti 16 GB specifications, TechPowerUp GPU database"
    url: "https://www.techpowerup.com/gpu-specs/geforce-rtx-5060-ti-16-gb.c4292"
    checked: 2026-11-26
---

# USD 0.04 of GPU time, and the dataset was the work

The bill for the whole run was four cents. Twelve minutes on a rented RTX 5060 Ti at USD 0.1981 an hour, of which the model trained for five seconds and the dataset took fourteen to build. The rest of the twelve minutes was a machine being rented while a person read logs.

That ratio is the point of this article. Almost everything written about renting a GPU is about the hourly rate, and the hourly rate is the least interesting number in the decision. What matters is how many minutes of billed time a finished job costs you, and for most small work that number is embarrassing in the other direction: the compute is cheap enough that the expensive part is being ready to use it.

## The hourly rate is the wrong unit

The same card, priced on Vast.ai today: an RTX 5060 Ti with 16 GB of VRAM lists from USD 0.09 an hour, with a median of USD 0.13. The instance in this article was rented in June 2026 at USD 0.1981 an hour, so the platform price has roughly halved in five months.

| Card | VRAM | Price from | Median | Source, read |
| --- | --- | --- | --- | --- |
| RTX 5060 Ti | 16 GB | USD 0.09/hr | USD 0.13/hr | Vast.ai pricing, 26 Nov 2026 |
| RTX 4090 | 24 GB | USD 0.07/hr | USD 0.47/hr | same |
| RTX 5090 | 32 GB | USD 0.39/hr | USD 0.67/hr | same |
| H100 SXM | 80 GB | USD 1.73/hr | USD 1.73/hr | same |

Two things in that table are worth reading twice. The floor and the median can be far apart, because a marketplace is a set of individual hosts with their own prices and their own reliability. And the H100, the card everyone reasons about, costs nineteen times the floor price of the card that did this job.

A twelve-minute job at today's floor is under two cents. A twelve-minute job on an H100 is thirty-five. Neither is a business expense; both are smaller than the coffee you drink while waiting.

## Job one: train something small enough to finish

The job was a filter, not a model that trades. A set of nine strategies had already generated 1,607 historical trade entries across currency pairs, and the question was whether a model could tell a winning entry from a losing one using only what was knowable at entry: the signal's strength, volatility, recent returns, the day of the week, the month, and which instrument and strategy fired.

Sixteen features per trade. Identity as embeddings, so the model learns symbol and strategy behaviour instead of being told. A two-layer network, 64 wide, no attention, no pretraining, no billion parameters.

Trained on the card in five seconds. Cross-validated five ways, out-of-sample AUC 0.6021, per fold 0.53, 0.66, 0.63, 0.60, 0.53. Not a good model in absolute terms. Good enough to act as a filter, which is what it was asked to be:

| Filter threshold | Trades kept | Win rate | Mean return | Sharpe per trade | Annualised |
| --- | --- | --- | --- | --- | --- |
| none | 1,607 | 44.8% | +1.29% | 0.167 | +2.64 |
| 0.40 | 1,081 | 50.4% | +2.12% | 0.271 | +3.51 |
| 0.55 | 310 | 54.5% | +3.91% | 0.362 | +2.52 |
| 0.60 | 137 | 55.5% | +4.46% | 0.369 | +1.70 |

At 0.40 the filter drops a third of the trades and the annualised figure rises from 2.64 to 3.51. At 0.60 the per-trade numbers look best and the annualised figure collapses, because there is nothing left to trade. That shape is the whole argument against optimising for accuracy: a filter that is right more often can still make less money.

And the first model tried was a transformer, which overfitted immediately on 1,607 rows. The architecture was chosen by the size of the dataset, not by what was fashionable. Five seconds of compute is not the constraint here. 1,607 examples is.

## Job two: sweep, and know when to stop

The second job is the one that eats money: trying configurations. A sweep script scoped **324** combinations (model width, depth, sequence length, forecast horizon, seeds) over ten chronological folds, up to 200 epochs each, effective batch 512 through 256 with gradient accumulation, mixed precision to fit a small card.

Twenty-two finished. The instance was destroyed deliberately to stop paying for storage, and that decision is the part worth copying. The results were not nothing:

| Setting | Value |
| --- | --- |
| Best width and depth | d_model 32, 2 layers |
| Best sequence length | 12 bars |
| Best forecast horizon | 12 bars |
| Validation accuracy | 0.7432 |
| Test accuracy | 0.7495 |
| Test AUC | 0.8212 |

Three findings came out of 22 runs rather than 324. Small models won: `d_model` above 64 added overfit risk, not signal. A twelve-hour horizon beat twenty-four and forty-eight, because the further out you predict the more noise you are asking the model to memorise. And the result was stable across seeds, the same configuration with seeds 42, 123 and 7777 gave AUCs between 0.814 and 0.821, which is what tells you the number is a property of the data rather than of one lucky initialisation.

The infrastructure that made stopping safe is unglamorous and worth a paragraph. The driver script set up the environment, pulled the code, logged `nvidia-smi` every sixty seconds, wrote results after every completed configuration so a crash resumed rather than restarted, and ended by shutting the instance down itself. A full sweep was scoped at about two days; the quick three-configuration check at about two hours. The stop command is what turns a two-day plan into a two-hour decision.

## Job three: fine-tune on your own text

The third job is the one a small business actually has. Not training from scratch, teaching a small model your own words. A four-bit quantised 1.5-billion-parameter model, fine-tuned with QLoRA on trade annotations, produced a 73 MB adapter file. That is the entire deliverable: not a model, a 73 MB delta that sits on top of a base model you did not pay to train.

The economics are why this is now ordinary. Quantising the base model to four bits, which is what QLoRA does, is what makes a 1.5B model fit alongside its own gradients on a consumer card. The method is published and the tooling is free.

For a Malaysian SME the equivalent job is a classifier or a writer over your own material: WhatsApp replies, product descriptions, e-Invoice line items, supplier emails. Static data, small volume, one card, an afternoon.

## Job four: hosting, which is where this breaks

The first three jobs are batch work: start the box, run, stop it, pay for minutes. Hosting is the opposite and it is where a rented GPU is the wrong tool.

- **Interruption.** Marketplace instances can be reclaimed. A price-sensitive instance is a bet on staying up.
- **Storage.** Data sitting on a rented disk bills by the hour whether or not anything computes. That is exactly the reason the sweep above stopped at 22 configurations.
- **State.** A hosted assistant needs the model resident, which means a card idle most of the day at the hourly rate.
- **Residency.** Nothing in this arrangement tells you which country the machine is in, and for customer data that is not a footnote.

If the requirement is a model that answers at three in the morning, an API priced per million tokens is almost always cheaper than a card priced per hour. Renting a GPU wins when the work is finished and the instance is off.

## The bill

| Run | Billed time | Cost |
| --- | --- | --- |
| Trade filter, 1,607 rows, 5-fold | ~12 min at USD 0.1981/hr | USD 0.04 |
| Sweep, 22 of 324 configurations | instance hours, plus storage | not itemised here |
| LoRA adapter, 73 MB | one session | not itemised here |

Four cents is about sixteen sen at the rate we publish at, 4.1155 ringgit to the dollar on 24 November 2026. That four cents buys one experiment against a dataset that already existed, on a card rented by the minute. Training a trading model is a different bill, and the honest version of the claim is the narrow one.

## What to do first

1. Pick a job that finishes in minutes, not hours. Classification, extraction, a small regression, a fine-tune over a thousand rows.
2. Build the dataset before you rent anything. In our run it took three times as long as the training.
3. Cap the budget, not the ambition: an hourly card plus a self-destruct command is a smaller commitment than a subscription.
4. Write results to disk after every unit of work, so an interrupted instance costs you the last unit rather than all of it.
5. Keep the dataset. It is the only asset here that does not bill by the hour.

---

**Read next**

[The same H100 rents for RM11.89 an hour, or RM7.12](https://upahje.my/en/articles/gpu-rental-cost-malaysia)

[Colab will train your model. It will not host it](https://upahje.my/en/articles/colab-hosting-ai-malaysia)
