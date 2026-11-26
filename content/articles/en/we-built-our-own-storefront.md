---
title: "One person, one kitchen: we built the storefront and ran it"
description: "We stopped arguing about owning your shop and built one. husnieats takes orders, issues tickets and reconciles DuitNow payments from our own infrastructure."
slug: we-built-our-own-storefront
translationKey: we-built-our-own-storefront
format: field-test
reader: owner
date: 2026-11-26
updated: 2026-11-26
author: "UpahJe Desk"
category: buying-guides
audience: publication
tags: [buying-guides, storefront, sme, malaysia]
cardFigure: "Three dishes, one kitchen, zero platform"
changelog:
  - date: 2026-11-26
    note: "First published."
canonical: https://upahje.my/en/articles/we-built-our-own-storefront
sources:
  - title: "Billplz pricing: FPX, card and auto-deduct rates, plus settlement terms"
    url: "https://www.billplz.com/pricing"
    checked: 2026-11-26
  - title: "MyCC decision on foodpanda, 11 September 2023, commission bands in Table 3"
    url: "https://www.mycc.gov.my/"
    checked: 2026-11-26
---

# One person, one kitchen: we built the storefront and ran it

This is not an argument against delivery platforms. It is a demonstration of what a single person can now do without one.

We had been writing about the cost of owning your own shop — commission rates, payment fees, the discovery problem — and the writing was starting to feel like advice we had not tested. So we built the thing instead. **husnieats** is a working storefront for one kitchen: three dishes, cooked to order, pickup in Section 7 or delivered by a runner, taking real orders through a site that runs on our own infrastructure.

husnieats is ours; nothing else in this article is.

## What it actually does

Not a menu page with a WhatsApp link. A storefront with the three systems any shop needs to take money without a platform:

**1. Order taking.** The menu is three dishes — Buttermilk Chicken at RM12.90, Korean Chicken at RM13.90, Teh O at RM3.50 — each with a description and an Add button. The customer chooses pickup or delivery, and the delivery price appears **before** they commit, not after.

![The husnieats ordering flow: pick your food, pay by DuitNow, send the receipt on WhatsApp — three steps, no platform in between](/figures/screens/husnieats-ordering.webp)

**2. Ticketing.** Every order gets a short, speakable ticket — A001 through A999, then B001 — because the kitchen board and the runner's phone both need a handle a human can shout across a room. The customer's link uses a separate random token instead, because sequential numbers are guessable and a public URL must not be.

**3. Payment reconciliation.** The customer scans a DuitNow QR, pays the exact amount the order shows, and sends the receipt on WhatsApp. A human checks it, then the kitchen starts. That is the whole payment stack: one QR code, one message, one pair of eyes.

Orders and deliveries are tracked as two separate states, because a pickup order has no rider to wait for. And the money is stored as integer sen, rounded to the nearest ten — the smallest amount that appears on a Malaysian bill — rather than as a decimal that drifts.

![The husnieats menu at mobile width: three dishes, prices, add buttons. One kitchen, three dishes, because that is what can be cooked properly to order](/figures/screens/husnieats-menu.webp)

## The fraction

Here is what that replaces. A payment gateway charges **RM1.25** to collect RM30 by FPX on its free plan, or RM0.75 on a RM999-a-year plan. A card costs **1.8%**. Those are published prices, read from Billplz's page on 26 November 2026.

A delivery platform takes commission. Neither Grab nor foodpanda publishes a merchant rate card, so the only recorded numbers are the bands in the Competition Commission's foodpanda decision of 11 September 2023: **1–5%, 10–25%, 15–20% and 15–25%**, depending on the service. On a RM30 order, that is between RM4.50 and RM7.50.

husnieats pays **nothing per order**. There is no gateway, because the money moves bank-to-bank by QR. The cost is a person reading a receipt, which is the honest trade: at three dishes and a handful of orders a day, a human check is cheaper and more flexible than an integration. At fifty orders a day it would be the bottleneck, and the answer would be a gateway with a per-transaction fee.

So the claim is narrow and testable: **order taking, ticketing and payment reconciliation can be built and run by one person, at a fraction of a commission, with nothing but a domain, a host and a phone.**

## What it does not do

- **No cards.** If a customer only has a card, this shop cannot take the order. That is a real limit, not a design preference.
- **No rider network.** Delivery is arranged, not dispatched at scale.
- **No team.** The admin is one person's dashboard, not a back office for ten staff.
- **No automatic reconciliation.** Someone has to match the receipt to the order. The system makes that quick; it does not make it disappear.

Naming these is the point. A demonstration that hides its edges is a pitch.

## What it takes to do this yourself

Not much, and less than most people expect:

1. **A place to put it.** A domain and a host. The stack here is deliberately ordinary — a web app and a database, both self-hostable — because the point is reproducibility, not cleverness.
2. **A way to take money.** DuitNow QR costs nothing to display and nothing to receive. A gateway is the upgrade, not the starting point.
3. **A channel for the receipt.** WhatsApp, which your customers already use and already trust.
4. **The discipline.** Write the order down, check the payment, mark it cooking, mark it done. Software does not remove this step; it only makes it faster.

## The same idea at commercial scale

husnieats is a prototype. **mejamakan** is the same shape with a business behind it: a lauk delivery operation in KL and Selangor running its own site, a curated weekly menu grouped by day, accounts on its own domain, "From RM18/meal", Monday-to-Friday delivery, and a plan customers renew — a subscription rather than a one-off order. Their own site reports 3,000+ families served.

Two examples, one small and one trading: an individual can stand up a storefront, and a kitchen can run one commercially. Neither needs a marketplace in the middle to take an order.

## Why this matters more than the commission argument

The commission argument is arithmetic, and arithmetic can be argued with: platforms deliver customers, the fee pays for reach, and at low volume the maths often favours staying put. Fine.

The demonstration is different. It says the capability is no longer the barrier. Ten years ago, taking orders online meant either a marketplace or a developer and a five-figure build. Today it means a domain, a QR code and a weekend — and the only thing left to solve is the part no software sells you, which is getting someone to walk through the door.

**So: the storefront is solved. The audience is the work.**

---

**Read next**

[RM1.25 or 15%: what your own checkout costs](https://upahje.my/en/articles/own-checkout-vs-commission)

[What a WhatsApp chatbot costs, per message](https://upahje.my/en/articles/whatsapp-chatbot-costs-malaysia)
