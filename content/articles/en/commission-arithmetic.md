---
title: "The commission arithmetic behind owning your shop"
description: "Break-even is a number of orders a month. With the published FPX fee and the regulator's recorded commission bands, here is where owning beats joining."
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
    note: "First published."
sources:
  - title: "Billplz, pricing (plan table: FPX B2C RM1.25 on Basic and RM0.75 on Standard per transaction, while the page headline says \"from as low as MYR 0.75\"; card MYR 1.8% and 1.5%; settlement next business day for FPX and T+2 for cards; RM999 annual plan)"
    url: "https://www.billplz.com/pricing"
    checked: 2026-11-26
  - title: "MyCC, final decision on foodpanda (Delivery Hero Malaysia), public non-confidential version, dated 11 September 2023, Table 3 commission bands"
    url: "https://www.mycc.gov.my/sites/default/files/pdf/decision/Foodpanda%20FD%20Public%20Non-Confidential.pdf"
    checked: 2026-11-26
---

# The commission arithmetic behind owning your shop

The number you need most is the one nobody prints. Neither delivery platform publishes a merchant commission, so the honest version of this decision is an identity: put in the commission from your own contract, the published payment fee, your fixed monthly cost and your average basket, and read the order count where owning beats joining.

## Two rates are published, and one is not

The payment side is published. Billplz prints both FPX figures in its plan table: RM1.25 per transaction on the free Basic plan and RM0.75 on the RM999-a-year Standard plan, while its headline advertises FPX "from as low as MYR 0.75". A MYR card is 1.8% on Basic or 1.5% on Standard, with settlement next business day for FPX and T+2 for cards.

The commission side is not published. The only regulator-recorded figures are the bands in the competition regulator's foodpanda decision of 11 September 2023, Table 3: 1% to 5%, 10% to 25%, 15% to 20%, and twice 15% to 25%, with merchant names redacted. Those are bands from a decision, not a platform's current rate card, and they are used here as the three points the arithmetic moves through.

## The identity, with the fee shape that actually applies

A commission scales with every order. A gateway fee does not always: FPX is a flat fee per transaction, and a card is a percentage. So there are two forms.

For FPX: `N = fixed monthly cost / (commission × basket − FPX fee)`

For a card: `N = fixed monthly cost / (basket × (commission − card rate))`

Both produce an order count per month. Both fail honestly: if the commission on a basket is smaller than the flat FPX fee, no order count breaks even, and that is a result worth having before you build a checkout.

## What the crossing looks like

The fixed cost and the basket below are stated assumptions so the rows move; replace RM150 a month and a RM30 basket with your own and the counts change. The commission column is the regulator's band; the payment columns are Billplz's published fees.

| Commission band | FPX at RM0.75, orders a month | FPX at RM1.25, orders a month | Card at 1.8%, orders a month |
| --- | --- | --- | --- |
| 5% | 200 | 600 | 157 |
| 15% | 40 | 47 | 38 |
| 25% | 23 | 24 | 22 |

Read the table by column, not by row. At the top of the regulator's widest band, owning beats joining after about 23 orders a month; at the bottom of the narrowest band it takes 200 on the cheapest FPX plan, and 600 on the free one. The spread between 200 and 23 is the whole argument of this series: the commission rate decides whether owning the shop is a rounding error or a different business.

## Three things the table does not price

The first is discovery. A marketplace sends orders you did not have to find, and this table treats every order as if it would have arrived anyway.

The second is the annual plan. The RM999 Standard plan is worth its fee only above a volume where the RM0.50 saving per FPX transaction covers it: at 2,000 FPX orders a year, the saving is RM1,000 and the plan pays for itself; at 500, it does not.

The third is time. A storefront that reaches break-even on fees still costs the hours spent running it, and no published rate prices those.

## What to do before you decide

1. Write your fixed monthly cost, with hosting, software and any annual plan broken into months.
2. Write your average basket from last month.
3. Take the commission from your own contract, in writing, per category.
4. Put the numbers into the form that matches your gateway: flat fee for FPX, percentage for cards.
5. If the count is far above your actual orders, the marketplace is cheaper; if it is below, the storefront is.

