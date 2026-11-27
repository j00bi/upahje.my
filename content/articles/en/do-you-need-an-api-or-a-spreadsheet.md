---
title: "API or spreadsheet: which fits your volume"
description: "A spreadsheet wins at low volume with one owner; an API wins when two systems must sync. Three cases where a sheet is right, four signals it stopped scaling."
slug: do-you-need-an-api-or-a-spreadsheet
translationKey: do-you-need-an-api-or-a-spreadsheet
format: perspective
date: 2026-11-19
updated: 2026-11-19
author: "UpahJe Desk"
category: definitions
tags: [definitions, api, spreadsheet, decision, malaysia]
canonical: https://upahje.my/en/articles/do-you-need-an-api-or-a-spreadsheet
draft: false
changelog:
  - date: 2026-11-19
    note: "First published."
---

# API or spreadsheet: which fits your volume

A spreadsheet wins when the volume is small and one person owns the data. An API wins when two systems must stay in sync without a human copying between them. The size of the business does not decide it. Whether a copy step still exists decides it, along with what that step costs when it goes wrong.

## One sentence decides it, and it is what happens in the window

There is one test, and it is a sentence you can say out loud: what happens in the hour after a change, and who has to move it.

Write down the last three changes to that data and how each one travelled. If every one needed a person to open two windows and retype, you have a manual sync. A spreadsheet is a perfectly good manual sync. An API is what you buy when the same retyping happens often enough to be a cost, or once too often to be tolerable.

## A spreadsheet wins in three situations

A spreadsheet is the correct tool in three situations, and buying an API in any of them is money thrown at a problem you do not have.

1. **The volume is low.** If the data changes a few times a day, the labour is minutes and the error is visible the same afternoon. Automating minutes is not worth a build, a key, and a monthly bill.
2. **One person owns the data.** Shared ownership is where spreadsheets fail, not low technology. A single careful owner with a sheet beats a half-built integration that nobody understands.
3. **The input needs judgement.** If a person has to look at a message and decide what it means, no API will do that part. Automating the transport while leaving the decision manual gains you nothing.

## Four signals say the sheet has stopped scaling

Four signals, and any one of them is enough to start looking at an API.

1. **Two systems drift apart.** The sheet says one thing and the shop says another, and nobody can say which is right.
2. **The copy step has an owner, and that owner is a bottleneck.** When the sheet is only correct because one person is careful, you have built a dependency, not a system.
3. **A failure costs more than the fix.** A missed order, a double booking, an invoice sent twice. Once that happens monthly, the repair cost is real money.
4. **The data must move at night or at once.** A person cannot reconcile at 2am, and a batch of a hundred rows retyped by hand will contain errors you will not find.

## The two costs are shaped differently

Not a like-for-like number, because no public benchmark exists for what Malaysian developers charge for this work, and we will not invent one.

What can be said honestly is the shape of the bill. A spreadsheet costs time, every week, forever, and it costs the cleanup after each mistake. An API costs a build once, a monthly fee for whatever it calls, and a maintenance event whenever a provider changes something. The build is the visible cost. The time you already spend, and the mistake that already happened, are the ones nobody puts in the sum until the sheet stops being enough.

## A middle option sits between sheet and API

Plenty of Malaysian SMEs sit between the two, and it is worth naming the middle rather than pretending the choice is binary.

Exporting a CSV and importing it into the other tool is still a copy step, but a faster and more reliable one than retyping. A scheduled export with a fixed file layout, checked once a week by one person, can carry a business for years. It is not an API and it will not survive two-way sync, but it costs almost nothing and it fails visibly.

**Read next**

[What an API costs to wire up in Malaysia](https://upahje.my/en/articles/what-is-an-api-for-malaysian-sme)

[More on APIs and models](https://upahje.my/en/glossary)
