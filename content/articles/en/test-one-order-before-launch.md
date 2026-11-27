---
title: "Test one order on your phone before you send the link"
description: "RM35 item plus RM8 delivery is RM43. Place that order as a signed-out buyer, then find it where you actually work. Six checks decide if the shop is ready."
slug: test-one-order-before-launch
translationKey: test-one-order-before-launch
format: guide
reader: owner
date: 2026-11-27
updated: 2026-11-27
author: "UpahJe Desk"
category: buying-guides
audience: publication
tags: [buying-guides, checkout, orders, testing]
cardFigure: "RM35 + RM8 = RM43, and one test order"
canonical: https://upahje.my/en/articles/test-one-order-before-launch
changelog:
  - date: 2026-11-27
    note: "First published."
sources:
  - title: "Stripe, testing (test transactions do not move funds; test cards simulate declines, 3DS and disputes)"
    url: "https://docs.stripe.com/testing"
    checked: 2026-11-27
  - title: "CHIP, pricing (FPX settles next business day; card payments two business days; DuitNow next day)"
    url: "https://chip-in.asia/pricing/"
    checked: 2026-11-26
  - title: "Billplz, pricing (FPX next business day; card payments T+2 business days)"
    url: "https://www.billplz.com/pricing"
    checked: 2026-11-26
---

# Test one order on your phone before you send the link

One product, one delivery option, one payment method: that is **one** route to test, not twenty. If the item is **RM35** and delivery is **RM8**, the buyer should see **RM43** before paying, and your order record should say the same thing afterwards.

The point is not to test every order you might ever receive. It is to answer one question before a customer asks it: when someone orders, will they know it went through, and will you know whether to pack it?

## Write the expected total down first

Pick the combination you expect your first real customers to use, then write the numbers on paper: item price, any discount, delivery charge, final total. Write down what you expect to see afterwards too, where the buyer's confirmation appears, where the order reaches you, and what tells you it is ready to fulfil.

Having the total written down is what makes the test a test. Without it you are admiring the screens instead of comparing them against something independent.

If the payment provider offers a test mode, use it, with one caveat that people get wrong. A test-mode payment checks the flow, and it does **not** prove that real money will settle into your account. Stripe documents it plainly: test transactions don't move funds. Keep a note of which mode you used, so you never read a passing test as a working cash flow.

## Place the order from a phone, signed out

Open the storefront on a phone while signed out of the seller account. Start from the link you would actually share with a customer, not from an admin preview.

Complete checkout without switching to your dashboard to fill in something a customer cannot see. Before you submit, check three things:

- **Item and quantity are right**, and if the product has options, the chosen size, flavour or colour is still visible.
- **Handover details are complete.** For delivery, the buyer can enter an address you can use. For pickup, the buyer can tell where to go and whether to wait for a message.
- **The total matches your note.** If you wrote RM43 and the screen says RM35 or RM51, stop and find out why before testing anything else.

Then stay on the buyer side for a moment. Can you tell whether the order was received, whether payment is complete or still due, and what happens next? If the shop promises an email or a message, check that it arrives and that it says the same thing as the confirmation screen. Keep the order reference, you need it in the next step.

## Find the order where you will actually work

Open whatever you really use on a busy day: a dashboard, an inbox, a WhatsApp thread, a spreadsheet. Find the order without going back to the buyer's screen.

Match the reference, item and quantity, total, and handover details. Then ask the question that decides whether the shop works: **could you hand this order to someone else to fulfil without first messaging the buyer for missing information?**

## Order received is not payment confirmed

These are two different facts and shopping carts love to blur them.

If you take payment upfront, check the system you rely on for payment confirmation and verify that the status belongs to **this** order, not to the previous one. If you take payment on pickup or delivery, make sure the order says plainly that payment is still due and when it should be collected.

The settlement timing makes this sharper than it sounds. FPX settles next business day; a card payment settles in two business days at [CHIP and Billplz](https://upahje.my/en/articles/taking-money-malaysia). An order can sit in your inbox looking paid while the money is still in transit, and a refund issued on the same day behaves differently again.

You do not need to dispatch a parcel. Stop once you can state the next action without hesitating: pack it, get it ready for pickup, or wait for payment.

## Six checks decide whether the test passed

- [ ] A buyer completed checkout on a phone without help.
- [ ] Item, quantity and final total matched what you wrote down.
- [ ] The buyer could tell the order was received and what happens next.
- [ ] You found the same order where you normally work.
- [ ] You could tell a confirmed payment from one still pending or due later.
- [ ] You had enough information to fulfil without chasing the buyer.

If one fails, fix it and run that route again from the phone. Editing the wording in an admin screen is not the same as seeing it on a new order.

If all six pass, write down exactly what you tested: the product, the payment method, and the delivery or pickup option. A passing pickup order says nothing about delivery charges, and a passing test-mode payment says nothing about live settlement. The checklist keeps its value the next time you change a payment method, a delivery charge or a confirmation message, because the failure you are trying to avoid is the customer who finds the change before you do.

---

**Read next**

[One person, one kitchen: we built the storefront and ran it](https://upahje.my/en/articles/we-built-our-own-storefront)

[FPX costs a ringgit; cards cost 2% to 3%](https://upahje.my/en/articles/taking-money-malaysia)

[RM1.25 or 15%: what own checkout costs](https://upahje.my/en/articles/own-checkout-vs-commission)
