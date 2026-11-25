---
title: "Two free tools against OpusClip: the Malay caption gap"
description: "OpusClip charges USD 15 a month, or RM61.78 converted. Two open-source projects clip locally for no licence fee, and neither has shown reliable Malay captions."
slug: self-hosted-clipping
translationKey: self-hosted-clipping
format: teardown
reader: owner
date: 2026-11-24
updated: 2026-11-24
author: "UpahJe Desk"
category: buying-guides
tags: [buying-guides, video, clipping, self-hosted, malaysia]
cardFigure: "USD 15 a month is RM61.78, if you convert it"
canonical: https://upahje.my/en/articles/self-hosted-clipping
draft: false
changelog:
  - date: 2026-11-24
    note: "First published."
sources:
  - title: "OpusClip, pricing (Starter at USD 15 per month, USD only)"
    url: "https://www.opus.pro/pricing"
    checked: 2026-11-24
  - title: "Bank Negara Malaysia, exchange-rate API (USD middle rate 4.1185)"
    url: "https://api.bnm.gov.my/public/exchange-rate"
    checked: 2026-11-24
  - title: "iamajmeena/neonclipping, repository (MIT, created 19 November 2026)"
    url: "https://github.com/iamajmeena/neonclipping"
    checked: 2026-11-24
  - title: "haziqahmedqasmi/PeakCut, repository (MIT, created 14 November 2026)"
    url: "https://github.com/haziqahmedqasmi/PeakCut"
    checked: 2026-11-24
---

# Two free tools against OpusClip: the Malay caption gap

OpusClip's Starter plan is USD 15 a month, which is RM61.78 at Bank Negara's middle rate of 4.1185 on 24 November 2026, and no Malaysian publisher prints a ringgit price for a clipping subscription at all. Two MIT-licensed repos that appeared in the same week clip on your own machine for nothing, and neither has demonstrated a Malay caption.

## The subscription is priced in dollars

OpusClip prints "USD 15/mo" for Starter and sells it monthly only. That is the only unambiguous price on the page read; the Pro tier sits behind a yearly/monthly toggle and a pack selector, and its figure was not captured as a static number.

The ringgit figure above is a conversion, not a Malaysian price. No publisher selling clipping subscriptions to Malaysians printed one on any page read, and presenting a converted dollar as a local price is how a RM45 subscription turns into RM62 in a budget.

## Two repos arrived in the same week

`neonclipping` was created on 19 November 2026 and has 2,313 stars as of 24 November 2026: MIT, Python, "paste a link, get captioned 9:16 clips in about two minutes". `PeakCut` was created on 14 November 2026 and has 1,848 stars as of 24 November 2026: MIT, Python, self-hosted, bring your own AI key.

Both are young, both are moving, and both are already past the star counts that circulated when they launched, which is a reminder that a star count is true for the minute it is read: `neonclipping` moved by one between the packet and this check.

## What the free path costs instead

A machine with a GPU, the electricity, and an evening to install and tune it. neonclipping's own measured table reports 97 seconds to clip an 85-minute stream in Fast mode, on one machine with an RTX 2060 and 16 threads.

That figure is the author's machine, not yours and not a Malaysian laptop's. A slower card means a longer wait, and no test of either repo on Malaysian hardware exists.

## The numbers, side by side

| Item | OpusClip Starter | neonclipping | PeakCut |
| --- | --- | --- | --- |
| Price as printed | USD 15/month | 0 | 0 |
| Ringgit per month, converted at 4.1185 | 61.78 | 0 | 0 |
| Licence fee | n/a | 0, MIT | 0, MIT |
| Time per clip, as published | not printed | 97 s for an 85-minute stream | not printed |
| GitHub stars, as of 24 November 2026 | n/a | 2,313 | 1,848 |
| Malay captions demonstrated | n/a | unproven | English only |

The two zeroes are licence costs, not total costs. Your time and the machine are real, and the table cannot price them for you.

## Where the free path breaks

**Malay captions.** neonclipping claims 52 caption languages through Whisper and does not name Malay among them, and publishes no Malay sample or accuracy figure. PeakCut "hears English by default" and states that "captions on the clips are in English", with Arabic as the only documented non-English path. If your audience reads captions in Malay, neither repo has shown you it works.

**What the model can see.** neonclipping's own limits section says the local LLM "sees text only; it cannot see the screen", and its optional visual review is off by default and can add CPU time. PeakCut clips by loudness when no key is supplied.

## The volume where cancelling pays

The arithmetic: RM61.78 buys four clips a month at RM15.45 each, eight at RM7.72, and twelve at RM5.15. The free path's marginal cost is 97 seconds of GPU per 85-minute source, so twelve clips cost about nineteen minutes of machine time for the month.

Twelve clips is the number I would use, and it is a judgement rather than a sourced finding. Below it, you are paying RM5 to RM15 a clip for convenience; above it, the free path's cost is fixed and the subscription buys nothing you cannot do on the machine you already own.

The instalment is one evening either way. That is the real cost on the free side, and it is paid once.

## What to count before cancelling

1. Count the clips you published last month, not the ones you meant to.
2. Install one repo on the machine you already own and clip one long video.
3. Watch the output for Malay words if your captions are in Malay; no repo will tell you how good they are.
4. Time the run, and compare that time against RM61.78 of subscription.
5. Decide on the count, not on the demo.

The cheapest mistake here is paying for a year of clips you never post.

---

**Read next**

[What automation work costs in Malaysia, from published rates](https://upahje.my/en/articles/automation-rates-malaysia-published)

[More on buying and choosing tools](https://upahje.my/en/articles/category/buying-guides)
