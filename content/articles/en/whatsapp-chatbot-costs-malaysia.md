---
title: "What a WhatsApp chatbot costs, per message"
description: "Free to 1,000 service messages a month and free for anything a customer sends. Marketing costs RM0.3467, and a Malaysian vendor adds RM200 to RM1,500."
cardFigure: "Free to 1,000 service messages; RM0.3467 marketing"
slug: whatsapp-chatbot-costs-malaysia
translationKey: whatsapp-chatbot-costs-malaysia
date: 2026-11-23
updated: 2026-11-24
author: "UpahJe Desk"
category: buying-guides
tags: [buying-guides, whatsapp, chatbot, pricing, malaysia]
canonical: https://upahje.my/en/articles/whatsapp-chatbot-costs-malaysia
draft: false
changelog:
  - date: 2026-11-23
    note: "First published."
  - date: 2026-11-24
    note: "Corrected the paid/free framing: Meta's MYR card is now cited directly, and the service-message clause is reconciled with the 1,000-message allowance instead of being reported as a disagreement."
sources:
  - title: "Meta, WhatsApp pricing (per-message billing, 24-hour window, free tier, FEP)"
    url: "https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing"
    checked: 2026-11-24
  - title: "Meta, MYR list rates for Malaysia linked from the pricing page, effective 1 October 2026"
    url: "https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing"
    checked: 2026-11-24
  - title: "WhatsApp Business, platform pricing (the free-service and 3-day FEP claims)"
    url: "https://whatsappbusiness.com/products/platform-pricing/"
    checked: 2026-11-23
  - title: "AIRS, WhatsApp AI chatbot price"
    url: "https://airs.my/answers/whatsapp-ai-chatbot-malaysia-price"
    checked: 2026-11-23
  - title: "The Crunch, WhatsApp chatbot Malaysia"
    url: "https://thecrunch.io/whatsapp-chatbot-malaysia/"
    checked: 2026-11-23
  - title: "AlwaysON, WhatsApp chatbot pricing"
    url: "https://alwayson.my/blog/whatsapp-chatbot-pricing"
    checked: 2026-11-23
---

# What a WhatsApp chatbot costs, per message

A WhatsApp bot in Malaysia costs nothing up to 1,000 service messages a month per business phone number, and nothing at all for messages a customer sends you. Past that allowance, a marketing template is RM0.3467, utility, authentication and service are RM0.0564 each, and a Malaysian vendor adds RM200 to RM1,500 a month to run the bot.

## What is free and what is billed

Three different bills arrive at a WhatsApp bot, and they come from two different companies. Meta's card covers the per-message charges; your vendor's invoice covers everything else.

| What | Status | Who bills it |
| --- | --- | --- |
| The WhatsApp Business app | Free | Nobody |
| Messages a customer sends you | Never charged | Nobody |
| The first 1,000 service messages per number per calendar month | Free, no rollover | Nobody |
| Any message inside the open 24-hour window | Free | Nobody |
| Marketing templates | RM0.3467 each | Meta |
| Authentication templates | RM0.0564 each | Meta |
| Utility templates outside the window | RM0.0564 each | Meta |
| Service messages past the 1,000 allowance | RM0.0564 each | Meta |
| Meta Business Agent messages | Billed per million tokens | Meta |
| BSP markup, hosting and seats | The vendor's own fee | Your vendor |

The allowance is per business phone number and resets each calendar month; unused messages do not carry over. Service messages past it have been charged since 1 October 2026.

Utility, authentication and service are RM0.0564, and the first 1,000 service messages per number per month are free.

## How does Meta charge for WhatsApp messages?

Per message, per category, and only when the message is delivered. The unit is not a conversation and not a session.

Three rules from Meta's pricing page set the bill, all effective from 1 October 2026 for the rate card used here:

1. **Charged on delivery only.** "Businesses are only charged when a message is delivered. Meta does not charge for messages sent."
2. **One direction only.** Business-to-user messages are charged; messages from users to the business are not.
3. **One category per message.** A message has one of five categories, so it can incur at most one charge.

The five categories are marketing, utility, authentication, service, and Meta Business Agent, which Meta introduced on 1 July 2026 and prices in tokens rather than per message.

## What does one message cost in Malaysia?

These are the published MYR prices, not conversions. Meta publishes a separate card for each currency, and the Malaysian buyer should quote the MYR one.

| Category | Price per delivered message (MYR) | Price on the USD card | What it is for |
| --- | --- | --- | --- |
| Marketing | 0.3467 | 0.086 | Promotions, re-engagement, offers |
| Utility | 0.0564 | 0.014 | Order updates, receipts, appointment reminders |
| Authentication | 0.0564 | 0.014 | One-time passcodes |
| Authentication, international | 0.1685 | 0.0418 | Passcodes delivered outside the domestic route |
| Service | 0.0564 | 0.014 | Replies inside the customer service window |

The MYR and USD cards move together at about 4.03, but the MYR figure is the one Meta publishes for Malaysia, so no exchange rate is applied in this article. Both cards carry the same effective date: 1 October 2026.

## Why does the 24-hour window change the bill?

![A left-to-right diagram: a customer message opens a 24-hour window; a reply inside it is a service message at RM0.0564 with the first 1,000 per number per month free; a message after the window closes must be a template, at RM0.3467 for marketing or RM0.0564 for utility and authentication](/figures/whatsapp-chatbot-costs-malaysia.svg)
*The clock, not the message text, decides which rate applies.*

Because a free-form reply is only allowed inside it, and outside it you must use a paid template.

The customer service window opens and resets with each user message, and lasts 24 hours. Inside it, a business may send non-template messages, which are service messages. Outside it, the only way to start a conversation is a template, which falls into marketing, utility or authentication.

The practical shape: a customer asks a question, you answer inside 24 hours as a service message, and that answer sits inside the free tier for the first 1,000 a month. If you follow up three days later with a promotion, that is a marketing template at RM0.3467 per delivered message.

## Why the two Meta pages look like they disagree

The WhatsApp Business marketing site says "we do not charge for service messages, or for utility messages businesses send in response to users". Meta's developer pricing page prices service at RM0.0564 with the first 1,000 free.

There is no contradiction once the allowance and the clock are applied. A reply to a customer sits inside the open 24-hour window, where nothing is charged, and the first 1,000 service messages each month are free on top of that. The marketing page is describing the common case; the developer page is describing the tariff behind it. A business only meets the RM0.0564 service rate after 1,000 service messages in a month.

One genuine difference remains. Meta's documentation says a free entry point window "may remain open for up to 7 days", while the marketing site says "for the following 3 days (72 hours), all of your messages are not charged". Plan on 3 days, because that is the shorter promise and the only one a business can rely on without overestimating free volume.

## What does a Malaysian vendor charge?

Three publishers, three shapes. These are build-and-subscription prices, not message rates, and Meta bills its messages separately.

| Publisher | What is published | Price | Unit |
| --- | --- | --- | --- |
| AIRS | AI agent on the business's own WhatsApp number, no setup fee for standard onboarding | from RM599 | per month, per outlet |
| The Crunch | Self-serve route | up to RM999 | per month; built systems quoted on scope |
| AlwaysON | Total cost of a chatbot for a Malaysian small business | RM200 to RM1,500 | per month, total range |

AIRS also states the market band as RM300 to RM3,000-plus per month, and AlwaysON notes that platform fees are "only 40-60% of the total cost", which is a useful warning: the subscription is not the whole bill.

## What to count before you sign
Five actions, none of which needs a purchase.

1. **Export last month's outbound WhatsApp messages** and tag each one marketing, utility, authentication or service.
2. **Count the service messages** and compare against 1,000 per number. If you are under it, most of your bill may be zero.
3. **Find the messages you send outside the 24-hour window.** Those are the marketing templates at RM0.3467 each, and they dominate small bills.
4. **Multiply the marketing count by 0.3467** and the paid service count by 0.0564, and compare that total with RM200 to RM1,500 of vendor fees.
5. **Ask each vendor whether their price includes Meta's message charges**, and get the answer in writing, because the two bills come from different companies.

Before talking to a vendor, price your own last month from the published card with a script, so you know the volume before you talk to a vendor.

- **What it needs:** a CSV of your outbound messages with a category column, and a spreadsheet or 15 lines of Python that multiplies counts by 0.3467 and 0.0564. No Meta account.
- **What it costs:** nothing, and it answers the only question that matters, which is whether your volume is a rounding error or a real monthly cost.
- **The one thing that will bite you:** counting messages you *sent* rather than messages *delivered*, and counting user-to-business messages, which Meta does not charge at all.

There is no honest free sandbox path documented in the pages read for this article, so this block stops at pricing your own data rather than inventing a test setup.

## What could we not verify?

The dedicated international-authentication page was not opened, so that row rests on the Malaysia card alone. Utility and authentication volume tiers exist, but the tier files were not parsed, so any figure above list price is absent. Meta Business Agent is priced per million tokens with no Malaysia-specific per-message figure published, so no per-interaction cost is claimed. Only one of the three Malaysian vendors publishes a from-price with no setup fee; the other two quote on scope, so no market-wide build fee can be stated.

