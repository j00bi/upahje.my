---
title: "What AI made cheap, and what stayed rented"
description: "A 26B model on a laptop, a 68 MB offline checker and 30 SEO skills cost nothing now; the growth numbers used to sell AI services are still rented."
slug: ai-cheap-and-rented
translationKey: ai-cheap-and-rented
format: explainer
reader: owner
date: 2026-11-24
updated: 2026-11-24
author: "UpahJe Desk"
category: buying-guides
tags: [buying-guides, open-models, seo, malaysia]
canonical: https://upahje.my/en/articles/ai-cheap-and-rented
draft: true
changelog:
  - date: 2026-11-24
    note: "First published."
sources:
  - title: "atomic.chat on X, Inkling 2 Mini engine thread (23 November 2026)"
    url: "https://x.com/atomic_chat_hq/status/2124953436055564594"
    checked: 2026-11-24
  - title: "AtomicBot-ai/atomic-engine, repository"
    url: "https://github.com/AtomicBot-ai/atomic-engine"
    checked: 2026-11-24
  - title: "yazin on X, Tilawa release thread (23 November 2026)"
    url: "https://x.com/yazinsai/status/2124839905306222875"
    checked: 2026-11-24
  - title: "yazinsai/tilawa, repository"
    url: "https://github.com/yazinsai/tilawa"
    checked: 2026-11-24
  - title: "ILIAS ISM on X, SEO skills stack thread"
    url: "https://x.com/illyism/status/2123675279210242167"
    checked: 2026-11-24
  - title: "Illyism/seo-skills, repository and README"
    url: "https://github.com/Illyism/seo-skills"
    checked: 2026-11-24
  - title: "Discovered Labs, Granola case study"
    url: "https://discoveredlabs.com/case-studies/granola"
    checked: 2026-11-24
  - title: "mal on X, the recycled Granola post and its community note"
    url: "https://x.com/mal_shaik/status/2124575070391865528"
    checked: 2026-11-24
---

# What AI made cheap, and what stayed rented

Three things became cheap enough this month for a Malaysian small business to own outright: a 26-billion-parameter model that runs on a laptop, a 68 MB model that does a real job with no server, and thirty SEO workflows that end in a merged pull request. The numbers used to sell AI services did not get cheap. One viral growth figure turned out to be someone else's case study, resold.

## A 26B model now fits on a laptop

atomic.chat's launch thread claims its engine runs Inkling 2 Mini, a 26.4B mixture-of-experts model, at 122 tokens per second on an M5 Max against 40 tokens per second on llama.cpp, with 50% less RAM, by streaming experts from an SSD. The smallest quantised build they list is 6.88 GB, and their earlier post says it runs on an 8 GB laptop.

Every one of those figures is a vendor claim, and the thread does not print the conditions behind the comparison: the quantisation, the context length, or which llama.cpp build was the baseline. The code is MIT, created 26 March 2026, with 528 stars on the day I read it.

The hardware matters for a Malaysian buyer. An M5 Max is a high-end laptop chip, not the RM2,000 machine in the back office, so the speed number describes the best case rather than the office case.

## A 68 MB model does a real job offline

Tilawa uses the same tiny model, 68 MB full and 25 MB lite, for two jobs: tracking a recitation word by word and flagging memorisation mistakes as they happen. It runs in the browser or on Node, makes no API calls, and the audio never leaves the device. Code is MIT, weights are CC BY 4.0, and the repository had 461 stars when I read it.

The author publishes the numbers and their limits together: 90.3% precision and 87.5% of mistakes caught on a held-out learner set, false alarms at 0.05 to 0.3 per five minutes on clean audio, and about 1.1 per five minutes on messy phone audio. It flags memorisation mistakes only, does not grade tajweed, and does not support fast recitation or children's voices.

That is what a small model doing a narrow job looks like in practice: an honest ceiling, published, with the failure cases named.

## Thirty SEO skills do a retainer's monthly checklist

The `seo-skills` repository packages 30 workflows for an agent such as Claude Code or Cursor, installable with one command, and 2,057 stars on the day I read it. The author's own summary is that most SEO retainers are five of these checklists run manually once a month.

Treat that as his opinion rather than a measurement. Two facts are checkable: there are 30 skill files, and the licence situation is untidy. The README carries an MIT badge, and GitHub reports no licence for the repository, so the legal text is missing from the tree. If you plan to ship these inside a product, ask for the licence file rather than trusting the badge.

## What a retainer still buys

An accountable name, judgement about which checklist applies, and someone to argue with when the site still does not rank. A folder of 30 workflows does not tell you which five matter for your business, and it will not sit in a meeting with your web developer.

The honest split: the checklists are now free, and the judgement is what the invoice buys.

## The growth stat that travelled without its author

A post promoting a growth service claimed Granola "grew new users from AI search by 4,600% in 7 months". The figure exists in a Discovered Labs case study, whose own title says monthly activated users, not new users. A community note on the post says the case study was recycled by someone who did not do the work.

So the number is real, the metric changed in transit, and the credit was borrowed. That is a more common failure than an invented figure, and it is easier to fall for because a genuine case study sits behind it.

## The four checks before you pay

1. Open the licence file, not the badge.
2. Ask whether the benchmark was run by the vendor, and ask for its conditions.
3. Ask what the metric was, and who ran the study.
4. Run the free version on your own machine this week, on your own data.

## What is not known

No independent test of Inkling 2 Mini against llama.cpp exists that I could find, on SME hardware or anywhere else. Tilawa's false-alarm rate on Malaysian accents is untested; the author is asking for exactly those recordings. And no published Malaysian SEO retainer price was read for this article, so no figure for one appears here.

## FAQ

### Can I run a 26B model on an 8 GB laptop?

The vendor says its quantised build does. I did not run it, so treat that as their claim until you try it on your own machine.

### Is MIT code the same as open weights?

No. Tilawa separates them: the code is MIT and the model weights are CC BY 4.0, which are different permissions with different conditions.

### Should I cancel an SEO retainer over this?

Only if someone on your side will run the workflows and merge the changes. The checklists are free; the person who reads the output is not.

---

**Read next**

[What automation work costs in Malaysia, from published rates](https://upahje.my/en/articles/automation-rates-malaysia-published)

[More on buying and choosing tools](https://upahje.my/en/articles/category/buying-guides)
