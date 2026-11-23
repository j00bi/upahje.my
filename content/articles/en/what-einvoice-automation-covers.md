---
title: "What e-Invoice automation covers, and what stays with a person"
description: "Since 1 January 2026 every band is in force, and the RM3m to RM5m gap is in scope. What an automated submission does, what the 72-hour window changes, and which decisions no tool should take."
slug: what-einvoice-automation-covers
translationKey: what-einvoice-automation-covers
date: 2026-11-23
updated: 2026-11-23
author: "UpahJe editorial"
category: buying-guides
tags: [buying-guides, e-invoice, myinvois, malaysia]
canonical: https://upahje.my/en/articles/what-einvoice-automation-covers
draft: false
sources:
  - title: "LHDN, e-Invoice implementation timeline (updated 30 August 2026)"
    url: "https://www.hasil.gov.my/e-invois/pelaksanaan-e-invois-di-malaysia/garis-masa-pelaksanaan-e-invois/"
    checked: 2026-11-23
  - title: "MyInvois SDK, developer documentation"
    url: "https://sdk.myinvois.hasil.gov.my/"
    checked: 2026-11-23
  - title: "MyInvois SDK, document validation rules"
    url: "https://sdk.myinvois.hasil.gov.my/document-validation-rules/"
    checked: 2026-11-23
  - title: "MyInvois SDK, FAQ (sandbox availability)"
    url: "https://sdk.myinvois.hasil.gov.my/faq/"
    checked: 2026-11-23
  - title: "LHDN, Garis Panduan Spesifik e-Invois Versi 4.8 (penalties, relaxation, PKPS)"
    url: "https://www.hasil.gov.my/e-invois/"
    checked: 2026-11-23
---

# What e-Invoice automation covers, and what stays with a person

Every taxpayer band is now in force, including the band between RM3 million and RM5 million, which sits inside phase 4 and outside the exemption. Automation can create, validate and submit the document and handle the 72-hour correction window. It cannot decide whether a transaction is unusual, and it cannot carry the legal liability for a wrong one.

## Who has to file, and since when?

The bands below are LHDN's own, from a timeline page that states its update date as 30 August 2026.

| Phase | Annual income or sales | Started | Status |
| --- | --- | --- | --- |
| 1 | more than RM100 million | 1 August 2024 | In force |
| 2 | more than RM25 million up to RM100 million | 1 January 2025 | In force |
| 3 | more than RM5 million up to RM25 million | 1 July 2025 | In force |
| 4 | up to RM5 million | 1 January 2026 | In force |
| Exemption | less than RM3 million | — | Exempt as printed |

The gap worth reading twice is between RM3 million and RM5 million. The exemption covers less than RM3 million, and phase 4 covers up to RM5 million, so a business turning over RM4 million is in scope. That is not an interpretation: it is what the two lines on the same page say together.

## What is actually submitted?

![Four steps the machine performs: build the document from your records, check the TIN, pass eight validators, submit to MyInvois. Below, two outcomes: within 72 hours a buyer may reject or a seller cancel and reissue; after 72 hours cancellation is closed and a correction needs a credit, debit or refund note](/figures/what-einvoice-automation-covers.svg)
*Four steps run every submission. What happens after a mistake depends on the clock.*

An e-Invoice is the digital version of the document a seller issues, recorded with LHDN rather than only filed in your own accounts, covering business-to-business, business-to-consumer and business-to-government, and it goes to LHDN through the MyInvois system.

Four document types are named in the guideline: invoice, credit note, debit note and refund note. Two routes exist. The MyInvois Portal is manual entry by the taxpayer. The API route is documented for taxpayer ERP systems, in LHDN's own words, to "integrate with MyInvois System to automate the document processing" ([MyInvois SDK, read 23 Nov 2026](https://sdk.myinvois.hasil.gov.my/)). Authentication is separate for taxpayer systems and for intermediary systems acting on a taxpayer's behalf, and there is a TIN validation step available before submission. TIN is the taxpayer identification number LHDN issues to a business; the API is the connection your software uses to hand a document to MyInvois without anyone retyping it.

## What can be automated?

Eight validators run on every submission, and they are the reason a machine does this better than a person retyping: structure, core fields, signature, taxpayer validity, referenced documents, codes, duplicates and currency.

| Task | Automated? | Why |
| --- | --- | --- |
| Building the document from your sales or purchase record | Yes | The data already exists in your system |
| Checking the TIN before submission | Yes | It is an API call, not a judgement |
| Passing the eight validators | Yes | They are deterministic rules |
| Submitting and storing the LHDN response | Yes | A receipt to keep, not a decision |
| Flagging a failed validation with the rule that failed | Yes | The rule name is in the response |
| Deciding whether a transaction is fake or genuinely unusual | No | A judgement, and one a human is liable for |
| Choosing consolidated invoicing under the relaxation | No | A policy decision with tax consequences |
| Approving a correction after 72 hours | No | Needs a reason a person can defend |

## What does the 72-hour window change?

It changes who fixes a mistake, and when. A buyer may request rejection within 72 hours of validation, and a seller may cancel within the same window. After 72 hours, cancellation is not allowed, and a correction requires a new e-Invoice in the form of a credit, debit or refund note.

That has a practical consequence for automation design: the tool should watch the clock, not just the submission. An integration that only posts documents and forgets them will leave corrections to whoever notices, which is how businesses end up issuing a note months late.

## What happens if you get it wrong?

The guidelines cite Section 120 of the Income Tax Act 1967, and they do not print a penalty figure on any page that could be read. That is a gap, not a small detail: this article will not quote a ringgit penalty, because no published amount was found.

Two dated mechanisms do soften the exposure. An interim relaxation period applies per phase, during which taxpayers may issue consolidated e-Invoices for all activities and consolidated self-billed e-Invoices without a document per transaction, and LHDN states it will not prosecute under Section 120 during that period provided the conditions are met. Separately, the voluntary disclosure programme, PKPS (Program Pengesahan Sukarela, a window for taxpayers who missed their start date to come forward), runs from **7 July 2026 to 31 December 2027** for taxpayers who missed their mandatory start date, using document versions PKPS 1.2 or 1.3, and covers reviews and enforcement unless the disclosure breaches requirements or involves fraud, wilful default or negligence.

## What to do this week?

Five actions, none of which needs a purchase.

1. **Find your band** in the table above by your annual sales, and write the date your phase started next to it.
2. **Check your TIN is live** before anything else: a wrong taxpayer number fails validation later, not at signing.
3. **Export one month of invoices** as a file. That file is the input any tool will need, and knowing how bad it is shapes the quote.
4. **Ask your accountant whether the interim relaxation applies to you**, and get the answer in writing.
5. **Pick three invoices you issued last month** and rehearse the 72-hour question: who would have noticed, and how fast?

## Try it yourself

The smallest runnable version is the MyInvois sandbox: LHDN's developer site runs a sandbox where the APIs and their validation errors can be exercised, and it states that the production portal cannot be used there ([MyInvois SDK FAQ, read 23 Nov 2026](https://sdk.myinvois.hasil.gov.my/faq/)).

- **What it needs:** a sandbox login from LHDN's SDK site, a sample document, and a tool that can POST JSON, which is just structured text. No paid software.
- **What it costs:** nothing on the sandbox. No per-submission fee appears on any LHDN page read for this article, so the production cost is your time, not a charge.
- **The one thing that will bite you:** the signature validator. A document that looks correct to you can fail because the signature is missing or malformed, and the error text does not always say which field caused it.

## What could we not verify?

The MyInvois Portal itself could not be read: a connection timeout, then only the page title, because it is a client-side application. LHDN's FAQ answers are loaded by script and were not present in the served HTML. The per-phase dates inside the relaxation table appear to be a graphic in the PDF and were not extracted. And the general guideline read was version 4.8; a newer general version may exist and was not confirmed.

**Read next**

[What an AI agent can and cannot do for a Malaysian SME](https://upahje.my/en/articles/what-an-ai-agent-can-do)

[More on buying automation](https://upahje.my/en/articles/category/buying-guides)

## FAQ

### I turn over RM4 million a year. Am I exempt?

No. The exemption is below RM3 million, and phase 4 covers up to RM5 million, so RM4 million is in scope and has been since 1 January 2026.

### Can my accountant's system file it for me?

The submission route supports intermediaries: LHDN documents separate authentication for systems acting on a taxpayer's behalf. Liability stays with the taxpayer, so the question is who reviews failures, not who presses submit.

### Does automation remove the need for a person?

It removes the typing, the TIN check and the validator round trips. It does not remove the person who decides whether a transaction is genuine, or who signs off a correction after the 72-hour window closes.

### What happens to invoices I issued before my phase started?

The published mechanism for a missed start is the voluntary disclosure programme, running 7 July 2026 to 31 December 2027. Whether your case qualifies is a question for LHDN or your tax agent, not for this article.
