---
title: "Where the same data gets typed three times"
description: "Malaysian adoption is not the problem: 97.2% of establishments use computers. The duplication sits between a digitised front office and a manual back office, and e-Invoice now forces one record to be right at issuance."
slug: same-data-typed-three-times
translationKey: same-data-typed-three-times
date: 2026-11-23
updated: 2026-11-23
author: "UpahJe editorial"
category: buying-guides
tags: [operations, data-entry, e-invoice, malaysia]
canonical: https://upahje.my/en/articles/same-data-typed-three-times
draft: false
sources:
  - title: "DOSM, usage of ICT and e-commerce by establishment, 2025 release (data year 2024)"
    url: "https://www.dosm.gov.my/portal-main/release-content/usage-of-ict-and-e-commerce-by-establishment2025"
    checked: 2026-11-23
  - title: "Khazanah Research Institute with MDEC, from survival to scale (25 May 2026)"
    url: "https://www.krinstitute.org/press-release/from-survival-to-scale-digitalisation-among-malaysias-micro-and-small-enterprises-remains-broad-but-shallow"
    checked: 2026-11-23
  - title: "LHDN, MyInvois SDK document validation rules"
    url: "https://sdk.myinvois.hasil.gov.my/document-validation-rules/"
    checked: 2026-11-23
  - title: "LHDN, Garis Panduan e-Invois Versi 4.8"
    url: "https://www.hasil.gov.my/wp-content/uploads/Garis-Panduan-e-Invois-LHDNM.pdf"
    checked: 2026-11-23
  - title: "Friction, Malaysia SME digitalisation note (vendor article, no byline)"
    url: "https://friction.com.my/insights/malaysia-sme-digitalisation-from-survival-to-scale-2026"
    checked: 2026-11-23
---

# Where the same data gets typed three times

Adoption is not the problem. In 2024, 97.2% of Malaysian establishments reported using computers, 95.3% had internet access, and 74.4% had a web presence. The duplication happens one layer back: a customer-facing system that was digitised, and a back office that was not. The same order then exists in two places, and a person reconciles it.

## What do the official numbers actually say?

Three figures from DOSM's ICT and e-commerce release for establishments, data year 2024, published 2025. They measure adoption, and they measure it well.

| Measure | 2024 | Change from the previous year |
| --- | --- | --- |
| Establishments using computers | 97.2% | up 0.6 percentage points from 96.6% |
| Establishments with internet access | 95.3% | up from 94.0% |
| Establishments with a web presence | 74.4% | up from 72.7% |

Read them together and the picture is a business that already has a computer, a connection and often a website. What the release does not measure is how many separate systems those establishments run, or how much time goes into moving data between them. That absence matters, and it is the reason this article avoids a number for "hours lost".

## What does the research say about how it is used?

Khazanah Research Institute, with MDEC, published a finding in May 2026 that describes the pattern without counting it, so it is worth quoting rather than paraphrasing: digital tools "are often implemented in isolation and used reactively, driven by immediate operational needs rather than longer-term strategic planning".

The same paper describes "fragmented systems where customer-facing functions are digitised while back-end processes remain manual", and adds that technology use is "typically confined to basic infrastructure and standalone applications, with minimal use of analytics, automation, or enterprise systems". It also names the precursor: "many MSMEs operate with limited documentation, weak record-keeping, and constrained access to financing".

This is a think-tank finding, dated 25 May 2026, not a statistic. It says the shape of the problem, and it is careful not to put a number on it.

## Where does a single order get typed three times?

Follow one order. It arrives as a message, gets written into a quotation, becomes an invoice, and then a delivery order or a job sheet. Each of those documents exists in a system, and in most small businesses the systems do not talk.

The quotation lives in a template. The invoice is issued through accounting software. The delivery order is a form someone prints, or a note in a chat. The stock count is a spreadsheet that one person maintains. Four records of one event, and the only integration is a person remembering which one is current.

That is not a technology failure at the level DOSM measures. Every one of those tools is software. It is a fragmentation failure, exactly the pattern KRI describes, and it costs a business in rework rather than in licences.

## Why does e-Invoice force the point?

Because LHDN now checks the document, not the intent, and the check happens at issuance.

Three rules make that concrete, all from LHDN's own validation documentation and guidelines:

1. **Duplicates are checked.** The Duplicate Document Validator looks for documents submitted recently that are similar or identical, so a second submission of the same invoice is not invisible.
2. **The taxpayer must be valid on the date of issuance.** The Taxpayer Validator checks that the taxpayers referenced are valid at that date, not at the date someone corrected the record.
3. **Corrections are time-boxed.** A buyer may reject and a seller may cancel within 72 hours of validation. After that, the only correction is a new e-Invoice in the form of a credit, debit or refund note.

So the invoice data has to be right once, at the source, before an automated system touches it. An automation that copies a wrong supplier code into a submitted invoice does not create a small error; it creates a correction document with its own tax treatment. We covered the filing timeline in [what e-Invoice automation covers](https://upahje.my/en/articles/what-einvoice-automation-covers); this article is about why the data behind it has to be single.

## What does nobody publish?

Three gaps, and they are worth naming because they are the numbers every vendor deck uses.

No published figure gives the number of software systems a typical Malaysian SME runs. DOSM's release covers computers, internet and web presence; there is no application-count question in it.

No published Malaysian figure gives the ringgit cost of duplicated entry or of integration. Vendor pages assert savings without a baseline, which makes the percentage meaningless.

And the two famous "hours lost" numbers are not Malaysian. One is a vendor case study claiming "around 60%" of admin hours removed; another is a vendor case study claiming "20 hours of weekly manual work" cut. The widely repeated "12-16 hours per week" traces to an unsigned blog citing US labour-statistics and consultancy data, which is not a Malaysian measurement and should not be printed as one.

## The checklist you will see quoted

Written process, named owner, clean data source, exception path. That four-part framing is a Malaysian operations consultancy's article, published on its own site with no byline, written about the KRI/MDEC paper. It is a vendor's checklist, not an official one, and no government body publishes those four as a standard. Useful as a way to think; not citable as policy.

## What to do this week?

Five actions, none of which needs a purchase.

1. **Pick one document** you issue often: a quotation, an invoice, a delivery order.
2. **Follow it end to end**, and write down every place a person retypes something that already existed.
3. **Count the copies** of that one record, and name who owns which copy.
4. **Find the field that gets fixed by hand** most often, because that is where the source is wrong.
5. **Write the exception path** for the one case that happens weekly: what should the system say, and who decides.

## Try it yourself

The smallest runnable version is a one-page map, not a system: a spreadsheet with one row per step of the document, and columns for system, owner, and where the data is retyped.

You need the document, the person who handles it, and an hour. It costs nothing. The bite is that the map will show steps nobody admitted to, including the WhatsApp message that is currently the integration. Write it down anyway; the message is the real process, and automating around it without knowing it is how a project fails.

## FAQ

### Is this a software problem or a process problem?

It is a fragmentation problem, and KRI's wording is the accurate one: digitised in front, manual in back. Buying another tool before mapping the handoffs usually adds a fifth copy of the record.

### Do we have to fix this before e-Invoice?

You have to make the invoice data right at issuance, which is a smaller requirement than fixing everything. Start with the fields LHDN validates, then widen.

### How many systems is too many?

Nobody publishes a number, and the count is the wrong question. Two systems that disagree are worse than five that share one record.

### Can we just automate the copy step?

You can, and it is the most common first project. It also preserves the disagreement between systems, which is why the [piece on choosing a first automation](https://upahje.my/en/articles/your-first-automation-wrong-process) argues for mapping first.

---

**Read next**

[What e-Invoice automation covers, and what stays with a person](https://upahje.my/en/articles/what-einvoice-automation-covers)

[More on buying automation](https://upahje.my/en/articles/category/buying-guides)
