---
title: "The commission arithmetic behind owning your shop"
description: "Break-even is a number of orders a month, not a feeling: four variables decide where owning the storefront beats paying a marketplace commission."
slug: commission-arithmetic
translationKey: commission-arithmetic
format: guide
reader: owner
date: 2026-11-26
updated: 2026-11-26
author: "UpahJe Desk"
category: buying-guides
tags: [buying-guides, storefront, commission, malaysia]
canonical: https://upahje.my/en/articles/commission-arithmetic
draft: true
changelog:
  - date: 2026-11-26
    note: "Skeleton: arithmetic and table structure only, rates pending."
sources: []
---

# The commission arithmetic behind owning your shop

Owning the storefront replaces a percentage with a fixed bill, so the comparison is not marketing against marketing. It is a commission that scales with every order against a monthly cost that does not, and the only honest answer is the number of orders where the two cross.

## Four variables decide the crossing

The arithmetic needs four inputs, and a shop that cannot write all four down cannot answer the question yet.

1. **Monthly fixed cost of owning**: hosting, the storefront software, maintenance, and any gateway subscription that is charged whether you sell or not.
2. **Marketplace commission**: the percentage the platform keeps per order, as published.
3. **Payment cost on your own checkout**: the merchant discount rate the gateway charges per transaction, as published.
4. **Average basket**: what one order is worth before any fee is taken.

With those four, the break-even order count is:

`N = fixed monthly cost / ((commission − MDR) × average basket)`

The formula only works when commission is larger than the payment cost, because a storefront whose payment rate is higher than the marketplace commission never breaks even on fees alone. That is a result, not a mistake, and it is worth knowing before you build anything.

## What the table has to show

The table has one row per scenario and the same columns every time, so a reader can replace the assumptions with their own numbers and see the crossing move.

| Scenario | Fixed monthly cost | Commission | Payment MDR | Average basket | Break-even orders a month |
| --- | --- | --- | --- | --- | --- |
| Low basket |  |  |  |  |  |
| Mid basket |  |  |  |  |  |
| High basket |  |  |  |  |  |

Empty cells are deliberate: the rates are not in this draft until they carry a source and a checked date, and a filled cell with an unsourced rate is worse than a blank one.

## Two costs the formula leaves out

The formula compares fees. It does not price the discovery a marketplace was providing, and it does not price the time spent running a storefront that nobody visits.

A shop that reaches the break-even count on fees can still lose money on the orders it no longer receives, which is why the count is the beginning of the argument rather than the end of it.

## What to do with the formula before the rates arrive

1. Write down your fixed monthly cost, with nothing rounded away.
2. Write down your average basket from last month, not from your best week.
3. Ask the platform for the commission in writing, per category.
4. Ask the gateway for the MDR and settlement terms in writing.
5. Put the four numbers in the formula and read the count.

