---
title: "Don't rewrite your site. Rewrite the 5%."
description: "Two MIT repos five days apart, 11,327 stars between them, prescribe opposite fixes for a slow app. The disagreement tells you which fix your problem needs."
slug: rewrite-the-five-percent
translationKey: rewrite-the-five-percent
format: teardown
reader: all
date: 2026-11-23
updated: 2026-11-23
author: "Husni Ahmad"
category: buying-guides
tags: [teardown, performance, rust, malaysia]
canonical: https://upahje.my/en/articles/rewrite-the-five-percent
draft: true
changelog:
  - date: 2026-11-23
    note: "First published."
sources:
  - title: "rust-anything, repository and README (MIT)"
    url: "https://github.com/erkamyaman/rust-anything"
    checked: 2026-11-23
  - title: "fast-anything, repository and README (MIT)"
    url: "https://github.com/EL4CTEO/fast-anything"
    checked: 2026-11-23
---

# Don't rewrite your site. Rewrite the 5%.

Two repositories published five days apart carry 11,327 stars and give opposite advice. One says port the whole app to Rust, piece by piece. The other says port only the 5% that is slow. Both are MIT, and both are right. What decides which one you need is not your stack.

## Two MIT repos, five days apart, argue opposite fixes

`rust-anything`, created 16 November 2026, has 8,516 stars. Its description promises the whole application: rewrite it in Rust one piece at a time, checked against the original's recorded behaviour at every step. Its README claims one port: Prettier, "19x faster", with "15,861 of 17,224 recorded runs" in Rust and every run byte-identical.

`fast-anything`, created 21 November 2026, has 2,811 stars. Its description argues against that scope: don't rewrite it in Rust, rewrite the 5% that's slow, port the hot functions, prove they behave the same.

They disagree about scope, and money follows scope.

## One ports the whole app; the other ports one function

`rust-anything` records what your app does, your agent writes the replacement piece by piece, and each piece is checked against the recording before the next.

`fast-anything` profiles the app, ranks functions by time and portability, records up to 500 real calls of the function it picks, derives edge cases, and replays them. Nothing is enabled until every case matches, floats to within 1e-9, errors where the original errors. Its recorder caps at 500 calls; the README shows a wrong port caught by "148 of 500" recorded calls.

Neither repo was executed for this article. The figures are theirs; the mechanisms show in their source.

## The test is whether the slowness is one function or every request

One question decides the camp, and it is not app size.

If ten requests pass through one function, you have a 5% problem in a whole-app costume. Profile it, port that function, prove equivalence, ship. The rest of the app stays put, so the blast radius is one function and the rollback is a flag.

If every part is uniformly mediocre, there is no single hot function; there are forty, each slow by the same margin. That is a rewrite problem, and one function moves the number by almost nothing.

| Your symptom | The camp that fits | What it publishes as evidence | What goes wrong if you pick wrong |
| --- | --- | --- | --- |
| One endpoint, one script, one image transform dominates the runtime | fast-anything | 500 recorded calls replayed per port; 148 of 500 caught one wrong port | Nothing, if the function is pure. If it touches I/O, it will refuse and you have lost a day |
| The same code path appears in every request | fast-anything, applied twice | Same 500-call verification, per function | You fix the first hotspot and the second appears; two ports, not one |
| Every screen feels slow, no single hotspot | rust-anything | 15,861 of 17,224 recorded runs in Rust, every run byte-identical | Months of porting, a compile step in the loop, and a rewrite still half done |
| The slow part is a query or an unoptimised asset | neither | — | You port code around a database problem and the database stays slow |

The last row is the common mistake: a 4-second page can be one uncompressed hero image, and no amount of Rust will touch it.

## For an SME site, the answer is the 5%

My opinion, stated once: for a Malaysian small-business site, the slow thing is almost always one image, one query, or one blocking script, and the correct response is to fix that and stop. A full port is a decision for a team with a profiling budget and a release process. For a shop with five pages and a product list, an eleven-thousand-star framework is not the constraint.

Before you accept a quote to rebuild, ask which function or query is slow and what number it produces. A developer who cannot name it is quoting a rewrite, and a rewrite has no end date.

## Measure three things before you believe either camp

Three numbers, any one of which can end the project.

1. **Largest contentful paint** for your product page on a throttled 4G profile. If the image is the element, the fix is an image, not a language.
2. **The slowest query in your database log** for a normal week. If one query is seconds and the rest milliseconds, you have found the 5%.
3. **The largest asset the page downloads**, by byte size. A 2 MB image on a five-page site is a five-minute fix that beats a rewrite.

They cost nothing, take an evening, and give you the vocabulary to reject the expensive answer.

## A rewrite has no end date; a five-percent port does

A whole-app port ends when the last module is checked, a date nobody can promise. A single-function port ends when the recorded calls match: a condition, not a schedule.

If your slowness is one function, take the small port. If it is everywhere, price the rewrite honestly, months included. The expensive mistake is buying the big fix for the small problem.

---

**Read next**

[What automation work costs in Malaysia, from published rates](https://upahje.my/en/articles/automation-rates-malaysia-published)

[More on buying automation](https://upahje.my/en/articles/category/buying-guides)
