---
title: "Your simulated customer says yes. Real ones leave."
description: "Two 2026 studies on synthetic shoppers: baskets as accurate as a household's own history, and a simulator that halves resistance because it never walks away."
slug: simulated-customer-says-yes
translationKey: simulated-customer-says-yes
format: research
reader: owner
date: 2026-11-26
updated: 2026-11-26
author: "UpahJe Desk"
category: definitions
audience: publication
tags: [ai, research, market-research, malaysia]
cardFigure: "Resistance 25.1% real, 13.5% simulated"
changelog:
  - date: 2026-11-26
    note: "First published."
canonical: https://upahje.my/en/articles/simulated-customer-says-yes
sources:
  - title: "Seeing Like a Shopper: Validating Vision-Language Models as Synthetic Consumers, arXiv 2611.09977"
    url: "https://arxiv.org/abs/2611.09977"
    checked: 2026-11-26
  - title: "Simulated Customers Never Walk Away: Decision Fidelity of LLM User Simulators Measured Against Real Purchase Outcomes, arXiv 2606.20708"
    url: "https://arxiv.org/abs/2606.20708"
    checked: 2026-11-26
  - title: "Twin-2K-500: A dataset for building digital twins of over 2,000 people, arXiv 2505.17479"
    url: "https://arxiv.org/abs/2505.17479"
    checked: 2026-11-26
  - title: "Out of One, Many: Using Language Models to Simulate Human Samples, Argyle et al., Political Analysis"
    url: "https://arxiv.org/abs/2209.06899"
    checked: 2026-11-26
---

# Your simulated customer says yes. Real ones leave.

Two studies published this year tested whether a language model can stand in for a customer. Both used real data. They reached opposite conclusions, and the difference between them is the whole article: the simulation is accurate about the average basket and dishonest about the person who walks out.

If you are being sold "AI market research" — or thinking of using it to test a price, a shelf, a brand deal or a sales script — the split matters more than any single accuracy figure.

## One: the simulation that matched the household's own history

The first study built shoppers out of household purchase records, gave them a store directory and photographs of shelves, and asked them to plan a trip and pick products. Then it compared their baskets against six public datasets from three countries.

The headline result is not "the model is good at shopping". It is that **the synthetic baskets predicted held-out purchases as well as the households' own past trips did**. A model that only reads text has no access to the store, the shelf or the label; add vision and it gets close to the best available predictor of what a household buys next, which is that household's own history.

Three more findings from that paper:

- **Group differences** produced by synthetic shoppers correlated with real ones **twice as strongly** as a trained regression did.
- Without fitting anything, the simulators reproduced **alcohol purchases by gender and age in Russia**, and **trip size by store distance in Taiwan**.
- At the level of a **single shelf choice**, the model confounded the product with **its position on the shelf and its letter label** — which is why the authors built a dataset of shelf renderings that vary product, position, label, viewpoint and price independently.

That last point is the useful warning for anyone designing packaging or shelf layout: the model's answer about your product may be an answer about where you put it.

## Two: the simulation that cannot walk away

The second study is harder to sell and more useful. It ignored surveys and used **2,790 real sales conversations**, **793 of them with verified payment outcomes** — actual money, actual yes and no.

They measured whether a simulator, playing the customer, reproduces the *decision dynamics* of the real person. It does, for buyers. For non-buyers it does not:

| Measure | Real non-buyers | Simulated non-buyers |
| --- | --- | --- |
| Pull toward the purchase frame | reference | **+0.40** (d = 0.38, p < 0.001) |
| Expressing resistance | 25.1% | **13.5%** |
| Continuing to deliberate instead | 21.9% | **40.1%** |

Buyers were reproduced almost exactly (bias +0.09). Non-buyers were pulled toward buying, their stated resistance roughly halved, and their hesitation converted into more questions about price rather than an exit. No simulated customer fabricated a purchase — the failure is subtler than lying. It is that they **do not leave**.

The authors name it the **disengagement deficit**, and then do the thing that makes the paper credible: they try to fix it. Telling the simulator explicitly that it may disengage cuts the marginal bias fivefold, but barely moves the outcome-conditioned contrast (d = 0.34, p = 0.008). The bias is not in the instructions you give the simulator; it is in the situation you put it in. It also replicates across model families (DeepSeek: d = 0.41, p = 0.002).

Their closing sentence is the one to remember: **real non-buyers say "not now" and stop; simulated non-buyers ask about price.**

## How accurate is accurate

The number usually quoted comes from a third project, Twin-2K-500: digital twins built for **2,058 US participants**, answering the same survey questions their real counterparts answered. Across **17 tasks the twins' predictions were 71.72% accurate**, and the paper is careful to compare that against how much a person's own answers change when asked twice.

That comparison is the honest frame for all of this. An accuracy figure means nothing until you know the **test-retest ceiling** — how much the real human varies against themselves. A simulator that matches a person 72% of the time sounds impressive; if that person only matches themselves 75% of the time, the simulator is nearly at the ceiling. If the ceiling is 95%, there is a large gap.

Earlier work in this line — conditioning a model on a real person's survey backstory to reproduce their answers — found the same shape: **aggregate distributions reproduce well, individuals less so**. Two years of results now point the same way.

## Where you can actually apply it

The split above gives a clean rule. **Use simulation where the question is about a population and the answer is a distribution. Distrust it where the question is about a decision and the answer is a rate.**

| Use | What you simulate | Evidence strength |
| --- | --- | --- |
| **Shelf and pack tests** | Your product against competitors on a rendered shelf, at different facings, positions and prices | Strong — this is exactly what the first study validated, with the position/label confound noted |
| **Price perception** | Whether a price reads as cheap or premium next to named alternatives | Moderate — display and price responses were within measured ranges, not exact |
| **Brand image** | Descriptions of how a brand is perceived, before and after a change of logo, colour or copy | Moderate — aggregate survey fidelity is the best-supported claim in this line of work |
| **Brand deals** | How a partnership or sponsorship announcement reads to a segment; which objections surface first | Weak but useful — generates the objection list, does not measure approval |
| **Sales scripts** | Which objection a script invites, and which phrasing reduces friction | Weak on rates, useful on variety — the simulator will overstate progress |
| **Conversion estimates** | "How many of 100 would buy" | **Don't.** This is precisely the quantity the disengagement deficit corrupts |

### Running a brand-deal simulation honestly

1. Write the deal down the way a customer would encounter it — a post, a shelf talker, a press line — not the way a deck describes it.
2. Give each simulated respondent a **backstory from your own customers**, not a demographic stereotype. The strongest results in this literature come from conditioning on real records.
3. Ask open questions and count the **objections**, not the approvals.
4. Run the same prompt against **two model families**. If the objection list does not survive that, it was a prompt artefact.
5. Take the top three objections to **ten real customers** before you decide anything.

Step five is the whole method. The simulation is a hypothesis generator with a good hit rate on distributions; the ten conversations are the measurement.

### For brand image specifically

Simulation is at its best when you have **a corpus of real things people said** and you want to know how a change lands. Feed the model your reviews, your DMs, your complaint emails — then ask what the same population would say about the new logo, the new price, the new packaging. What you get is a plausible distribution of reactions, not a measurement of them.

What it cannot tell you is whether the brand will be *talked about*, because that depends on reach, novelty and timing, none of which live in the model.

## The Malaysian caveat

None of these studies used Malaysian shoppers, and none used Bahasa Melayu. The mechanisms are general; the numbers are not. Treat every figure in this article as evidence about the method, not as a parameter for your shop.

Two specific risks here: shelf conventions differ (a top-shelf position is not universal), and a model's Malay is drawn from a different mix of text than your customers' Malay. A simulation in Malay should be treated as a rougher instrument than the same simulation in English, and the papers give no figure for how much rougher.

## The rule, in one line

Simulate the **population**, measure the **decision**. A synthetic customer is a good way to find out what people might say and a bad way to find out how many will pay — and the papers above are the receipt for both halves of that sentence.

---

**Read next**

[Twelve jobs a rented GPU finishes, and three it cannot](https://upahje.my/en/articles/rented-gpu-jobs-malaysia)

[What an AI agent can and cannot do for a small business](https://upahje.my/en/articles/what-an-ai-agent-can-do)
