---
title: "Google Business Profile: the fields that decide whether you show up"
description: "Google documents the name rules, the category rules, hours, service areas and what triggers suspension. What an SME should fix first, and the four fields that get profiles restricted."
slug: google-business-profile-fields
translationKey: google-business-profile-fields
date: 2026-11-23
updated: 2026-11-23
author: "UpahJe editorial"
category: buying-guides
tags: [marketing, google-business-profile, local-seo, malaysia]
canonical: https://upahje.my/en/articles/google-business-profile-fields
draft: false
sources:
  - title: "Google, guidelines for representing your business on Google"
    url: "https://support.google.com/business/answer/3038177"
    checked: 2026-11-23
  - title: "Google, service-area businesses"
    url: "https://support.google.com/business/answer/3038163"
    checked: 2026-11-23
  - title: "Google, fix suspended or disabled profiles"
    url: "https://support.google.com/business/answer/4569145"
    checked: 2026-11-23
  - title: "Google, appeal Business Profile content and profile restrictions"
    url: "https://support.google.com/business/answer/13597551"
    checked: 2026-11-23
  - title: "Google, Business Profile API reference (locations resource)"
    url: "https://developers.google.com/my-business/reference/rest/v4/accounts.locations"
    checked: 2026-11-23
---

# Google Business Profile: the fields that decide whether you show up

Google's own rules decide this, and they are specific. Your name must be the name customers use in the real world, you get one profile per business, and categories must describe the business rather than its keywords. Get those wrong and the profile can be restricted; get them right and the rest is filling documented fields.

## What does Google actually check first?

Four things, and they are all wording rules rather than technical settings.

| What Google documents | What it means for your profile |
| --- | --- |
| "Your name should reflect your business's real-world name, as used consistently on your storefront, website, stationery, and as known to customers." | No keyword stuffing in the name. "Kedai Kasut Ali" is a name; "Kedai Kasut Ali Murah KL Best" is a rule violation |
| "Use as few categories as possible to describe your overall core business from the provided list." | The category answers "this business IS a…", so it is a shoe shop, not "shoe shop near me with parking" |
| "Do not use categories solely as keywords or to describe attributes of your business." | Attributes have their own fields. Using categories for them is what leads to restrictions |
| "There should only be one profile per business, as this can cause problems with how your information displays on Google Maps and Search." | Two profiles for one shop, usually created by two people, is a documented problem rather than a growth tactic |

All four are quoted from Google's guidelines page, read 23 November 2026.

## What about the address, or no address at all?

A service-area business and a shopfront are different configurations, and Google documents both.

The location resource carries `address` and `serviceArea`, and a service-area business manages areas instead of a storefront. Google's own example is delivery-only brands working from shared kitchens, which "must hide their address and add service areas to that specific brand". If you deliver and do not have a walk-in counter, running a storefront profile is the mismatch to fix first.

## Which fields are worth filling this month?

Hours and the sub-resources Google documents, in the order they change a customer's decision.

1. **Regular hours** — `regularHours` on the location resource. Wrong hours generate the one-star review that says "closed when it says open".
2. **Special hours** — `specialHours`, for public holidays and the week you close for a family event. Malaysia has enough public holidays that leaving this empty guarantees at least one wrong visit.
3. **More hours** — `moreHours`, for departments or services inside the same premises, such as a workshop counter with different hours from the retail floor.
4. **Attributes** — managed as a sub-resource through `getAttributes` / `updateAttributes`. This is where "parking available" and "wheelchair accessible" belong, not in the category.
5. **Photos and media** — `accounts.locations.media`, with content governed by Google's prohibited-content policy.
6. **Posts** — `accounts.locations.localPosts`, useful for offers with an expiry rather than permanent information.
7. **Q&A** — `accounts.locations.questions` with `answers`, which is the field most businesses leave for strangers to fill.
8. **Review replies** — `accounts.locations.reviews`, the API surface for what customers actually read.

All of those are documented in Google's Business Profile API reference, read 23 November 2026. The API names matter even if you never write code: they are the fields the form on the website is editing.

## What gets a profile suspended, and what do you do?

Google documents both the suspension process and the appeal, and the appeal page contains the sentence to read before anything else.

A suspended profile is handled through "Fix suspended or disabled profiles", which asks for a spreadsheet of Business Profile IDs plus supporting documents such as business registration, licence or tax certificates, or utility bills. For content restrictions, the appeal page states: "If you haven't verified your Business Profile, content associated with your Business Profile might not appear across Google. Before you submit an appeal, check your verification status."

That sentence is the whole reason to keep verification current. An appeal filed before verification is resolved is an appeal that stalls.

## What could we not verify?

Google publishes nothing in these pages about how profiles are ranked in local search, so this article makes no claim about ranking factors beyond the documented fields. Several help-centre IDs returned "Sorry, this page can't be found" during the pass, so only the pages Google itself links, or that the scan surfaced, are cited. There is also no published figure for how long verification or an appeal takes.

## What to do this week?

Five actions, none of which needs an agency.

1. **Read your own business name** against the real-world rule, and fix it in the profile rather than the listing on a directory.
2. **Check there is exactly one profile** for the business, including one someone created years ago and forgot.
3. **Decide storefront or service area**, and make the address and service areas match that decision.
4. **Fill regular and special hours** for the next two months of public holidays.
5. **Check your verification status** and keep the document that proves your business exists, because a suspension would ask for it.

## Try it yourself

The smallest version is an audit, not an integration: open your profile, and go field by field against Google's guidelines page, marking each one as documented-and-correct, documented-but-wrong, or empty.

You need the guidelines page, your own profile, and a spare hour. It costs nothing. The bite is that some corrections trigger re-verification, so change the name and category last, once the rest is right, and do not change them again the same week.

## FAQ

### Should I put my keywords in my business name?

No. Google's rule is the name as used in the real world and known to customers, and stuffing keywords is the documented way to get a profile restricted.

### Storefront or service area, if I do both?

One profile, with the address if customers can walk in, and service areas for where you travel. Google's rule is that a business with a storefront does not use service-area-only settings to hide it.

### Can I have two profiles for two outlets?

Two real outlets at two addresses are two businesses as far as the profile is concerned. Two profiles for the same outlet is the documented problem.

### How long does an appeal take?

Google does not publish a timeframe on the pages read for this article. What it does publish is the order: resolve verification first, then appeal.

---

**Read next**

[What an AI agent can and cannot do for a Malaysian SME](https://upahje.my/en/articles/what-an-ai-agent-can-do)

[More on buying automation](https://upahje.my/en/articles/category/buying-guides)
