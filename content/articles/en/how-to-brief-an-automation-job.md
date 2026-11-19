---
title: "How to brief an automation job so you don't pay twice"
description: "Five things a freelancer needs before quoting, a reusable brief template, and the acceptance test to agree before work starts. Written for a Malaysian SME buying automation for the first time."
slug: how-to-brief-an-automation-job
translationKey: how-to-brief-an-automation-job
date: 2026-11-19
updated: 2026-11-19
author: "UpahJe editorial"
category: buying-guides
tags: [buying-guides, automation, briefing, freelancer, malaysia]
canonical: https://upahje.my/en/articles/how-to-brief-an-automation-job
draft: false
sources:
  - title: "MDN, API glossary (definition of the integration referred to here)"
    url: "https://developer.mozilla.org/en-US/docs/Glossary/API"
    checked: 2026-11-19
---

# How to brief an automation job so you don't pay twice

A brief that keeps you from paying twice names five things before anyone quotes: inputs, outputs, failure behaviour, the acceptance test, and who owns the credentials. A freelancer who quotes without those five is guessing. You then pay for the guess twice, once to build the wrong thing and once to repair it.

## What five things does a freelancer need before quoting?

Every one of these changes the price, which is why a quote that arrives without them is not a quote.

1. **Inputs.** Which system the data comes from, in what format, and whether you can give a sample of it. A sample file beats a description every time.
2. **Outputs.** Where the result goes and what it must look like on arrival. "Into my accounting software" is not an output; "a row in this sheet with these six columns" is.
3. **Failure behaviour.** What should happen when the source is down, the data is malformed, or a call times out. Retry, queue, or alert. Silence is a decision too, and an expensive one.
4. **The acceptance test.** The exact check that decides the job is done, agreed before work starts.
5. **Credentials and ownership.** Whose accounts the keys belong to, where they are stored, and what happens to them at the end.

## What does a brief look like?

Copy this, fill it in, and send the same document to every freelancer you ask. The point of sending one document is that you can compare quotes afterwards.

```
JOB: [one sentence, what should happen automatically]

INPUT
- Source: [system name]
- Access: [export file / API / manual upload]
- Sample: [attached file name, or "none available"]
- Volume: [rows per day, and peak]

OUTPUT
- Destination: [system or file]
- Shape: [columns or fields, exactly]
- Timing: [immediately / hourly / nightly]

FAILURE
- If source unavailable: [retry / queue / alert me]
- If a row is invalid: [skip and log / stop and alert]
- Who is alerted: [name, channel]

TEST
- Done when: [the check, on real data]
- Test data: [where it comes from]

ACCESS AND HANDOVER
- Keys belong to: [my account]
- Handover: [code, docs, a working test environment]
- Support after handover: [days, and what is covered]

BUDGET
- Fixed price required: yes
- Excluded: [anything you do not want included]
```

## What acceptance test should I agree up front?

One test, on real data, that either passes or fails without an argument.

The strongest version compares a known-correct result against the automated one. Take last week's completed orders, run them through the new automation, and require the totals to match the sheet a human produced. That test catches the failures that matter: a swapped column, a rounding difference, a status that never updates.

Agree the test before the work starts, in writing, and agree what happens if it fails. A brief with no test hands the definition of "finished" to whoever is being paid to finish it.

## What goes wrong when the brief is thin?

The same three things, in the same order, on almost every job.

The freelancer builds what is easiest to build rather than what you needed, because the brief left room. Then the price rises once the real inputs appear, because the quote was based on a guess. Then the handover leaves you with a working system and no way to change it, because ownership was never discussed.

None of that requires a dishonest freelancer. It requires a brief that could be read two ways, and two people reading it differently.

## How do I compare two quotes on the same brief?

Compare line by line against the brief, and treat an unanswered line as a gap rather than a bonus.

Ask each freelancer to price the same five sections and to mark anything excluded. Two quotes are only comparable when they cover the same work. A quote that is 40 percent cheaper usually excludes a section, and the section it excludes is usually failure handling.

Then ask both to walk you through the acceptance test. The one who can describe how it runs on your data has understood the job. The one who cannot has quoted a description.

## FAQ

### Should I write the brief myself or let the freelancer propose one?

Write it yourself, even badly. A brief you wrote is the only document that states what you actually want, and it is the baseline every quote can be measured against. A freelancer's proposal is a price and an interpretation, and you want the interpretation to come second.

### What if I do not know the output format?

Get one real example first. Export the report or the row you want reproduced, and attach it. Most of the ambiguity in a brief disappears once there is a file that shows the target.

### Is a fixed price always better than hourly?

Not always, but for this kind of work it usually is, because the scope can be written down. Hourly suits work where the scope genuinely cannot be known in advance, such as investigating why a third-party service fails. If the brief is clear and the quote is still hourly only, ask what part is unknown.

---

**Read next**

[Buying guides](https://upahje.my/en/articles/category/buying-guides)

[what an API costs to wire up](https://upahje.my/en/articles/what-is-an-api-for-malaysian-sme)
