---
title: "Twelve jobs a rented GPU finishes, and three it cannot"
description: "Fine-tuning, transcription, invoice extraction, product photos, embeddings, evals: what each needs in VRAM, how long it takes, what it costs."
slug: rented-gpu-jobs-malaysia
translationKey: rented-gpu-jobs-malaysia
format: explainer
reader: owner
date: 2026-11-26
updated: 2026-11-26
author: "UpahJe Desk"
category: buying-guides
audience: publication
tags: [buying-guides, gpu, compute, ai, malaysia]
cardFigure: "RM0.55 an hour, if you switch it off"
changelog:
  - date: 2026-11-26
    note: "First published."
canonical: https://upahje.my/en/articles/rented-gpu-jobs-malaysia
sources:
  - title: "Vast.ai live GPU pricing, read from the pricing page"
    url: "https://vast.ai/pricing"
    checked: 2026-11-26
  - title: "QLoRA: Efficient Finetuning of Quantized LLMs, Dettmers et al., arXiv 2305.14314"
    url: "https://arxiv.org/abs/2305.14314"
    checked: 2026-11-26
  - title: "Robust Speech Recognition via Large-Scale Weak Supervision (Whisper), arXiv 2212.04356"
    url: "https://arxiv.org/abs/2212.04356"
    checked: 2026-11-26
---

# Twelve jobs a rented GPU finishes, and three it cannot

A rented GPU is a tool with one shape: it is excellent at work that starts, finishes, and stops. Everything in this article is sorted by that. If a job has a beginning and an end, renting a card for it is now cheap enough to be unremarkable. If a job has to be awake at three in the morning, renting is usually the wrong answer and an API is usually the right one.

The rate, read from Vast.ai today: an RTX 5060 Ti with 16 GB of VRAM starts at USD 0.09 an hour with a median of USD 0.13, which is about 55 sen an hour at the rate we publish at. An H100 SXM is USD 1.73, about RM7.12. Every cost in this article is that rate multiplied by your time — a formula, not a quote, because your dataset is not ours.

## The memory ladder, which decides what you can attempt

VRAM, not price, is what rules jobs out. For models in four-bit precision, the working rule is roughly 0.6 GB per billion parameters, plus room for the context you feed in.

| VRAM | What it unlocks | Representative card | Rate from |
| --- | --- | --- | --- |
| 8 GB | Small classifiers, OCR, transcription, embedding a document set | RTX 5060 | USD 0.09/hr |
| 16 GB | 7B models at 4-bit, LoRA fine-tunes of small models, image generation | RTX 5060 Ti | USD 0.09/hr |
| 24 GB | 13B at 4-bit, larger fine-tunes, video work | RTX 4090 / 3090 | USD 0.07–0.09/hr |
| 48 GB | 34B at 4-bit, multi-GPU-free training runs | RTX 6000 class | quote by host |
| 80 GB | 70B at 4-bit, full fine-tunes of small models | H100 | USD 1.73/hr |

The jump from 16 GB to 80 GB costs nineteen times more per hour. Almost nothing a Malaysian SME needs sits on the far side of that jump.

## The twelve jobs

Each row is a job we would rent a card for. Time is a realistic band, not a benchmark, and the cost column is the median 16 GB rate applied to that band.

| # | Job | Time | Cost at USD 0.13/hr |
| --- | --- | --- | --- |
| 1 | Train a small classifier or regressor on your own rows | minutes | under USD 0.05 |
| 2 | Fine-tune a small language model on your own text (LoRA) | 1–4 hours | USD 0.13–0.52 |
| 3 | Build embeddings for a document set, for search or answers | 10–60 min | USD 0.02–0.13 |
| 4 | Transcribe a year of call recordings or voice notes | 1–6 hours | USD 0.13–0.78 |
| 5 | Extract fields from invoices, receipts, delivery orders at volume | 30–120 min | USD 0.07–0.26 |
| 6 | Generate or clean product photography at catalogue scale | 1–3 hours | USD 0.13–0.39 |
| 7 | Caption and subtitle video, including Malay | 2–8 hours | USD 0.26–1.04 |
| 8 | Deduplicate and normalise a messy customer or product table | 10–40 min | USD 0.02–0.09 |
| 9 | Synthetic data to test a rule or an assistant before launch | 1–2 hours | USD 0.13–0.26 |
| 10 | Evaluate two models against your own examples | 30–90 min | USD 0.07–0.20 |
| 11 | Render a Blender or CAD animation across many frames | 2–12 hours | USD 0.26–1.56 |
| 12 | Batch-process images: resize, background removal, watermark | 20–60 min | USD 0.04–0.13 |

Read the right-hand column twice. Twelve jobs, and the most expensive one in the table is under two ringgit. The reason to think about this at all is not the money — it is that a card you forget to switch off bills 24 hours a day, and a card left running for a month costs USD 94, which is more than a year of the API you were avoiding.

### 1. Train something small

The cheapest job on the list and the one most often overcomplicated. If your data fits in a spreadsheet, the model is minutes, not hours. We trained a 1,607-row filter in **five seconds** for four cents.

Worth renting when: the dataset is yours, the question is narrow, and the answer needs to be reproducible next year.

### 2. Fine-tune a small language model

Four-bit quantisation is what made this ordinary: a 7B model needs about 5 GB at four bits, so a 16 GB card can fine-tune a small model with room left for the optimiser state. The output is an adapter measured in tens of megabytes — ours was 73 MB.

What it is for: a model that writes in your voice, classifies your categories, or answers from your documents. What it is not for: teaching a model facts it never saw. Fine-tuning changes how a model talks and what it prefers; it does not reliably install a price list.

### 3. Embeddings for search

Point a card at a folder of PDFs, contracts, product sheets or past quotes and produce vectors you can search. This is the cheapest useful AI job there is, and it runs in minutes on a 16 GB card. The output is small, permanent and yours.

### 4. Transcription

Whisper-class models transcribe reliably and handle Malay better than the free tiers of most products, and the job is embarrassingly parallel: split the audio, run the pieces, join the transcripts. A year of recordings is an afternoon.

This is the job we would recommend first to almost any SME, because the input already exists — call recordings, voice notes, meeting audio — and the output is searchable text you can act on.

### 5. Invoice and document extraction

Malaysian businesses now generate structured e-Invoice data, but the incoming side is still PDFs, photographs of delivery orders, and supplier invoices in three languages. Extracting fields at volume is a batch job, it needs no large model, and it pays for itself the first month you stop typing.

### 6 and 12. Images

Product photography at catalogue scale, and bulk processing — resizing, background removal, watermarking. Both are batch, both fit on a 16 GB card, both are cheaper rented by the hour than subscribed by the month if the work is periodic rather than constant.

### 7. Video

Captioning and subtitling, including Malay, is the highest-value video job because it is the one that makes video searchable and accessible. It is also slow — hours, not minutes — which makes the hourly rate matter more here than anywhere else in the table.

### 8 to 10. The unglamorous ones that pay

Deduplicating a customer table, generating synthetic examples to test an assistant, and evaluating two models against your own cases. None of these produce anything a customer sees, and all three are why a launch does not embarrass you. They are also the jobs most often skipped, because they feel like overhead until the first wrong answer reaches a customer.

### 11. Rendering

Blender and CAD work is the classic GPU rental: frames are independent, the job is finite, and a card you rent for six hours beats a workstation you buy for six thousand ringgit if you render twice a year.

## The three it cannot do

1. **Stay awake.** A marketplace instance can be reclaimed. Anything that must answer at three in the morning needs a host that promises to be there, and that is a different product with a different bill.
2. **Be trusted with residency.** Nothing on a marketplace tells you which country the machine sits in. For customer data under Malaysian expectations, that is a decision, not a detail.
3. **Replace an API for small volume.** One image a day, a hundred chat messages a week, a single transcription a month: the API is cheaper, because you are paying for a card that idles between jobs.

## How to price your own job

Take the hourly rate, multiply by the hours you expect, then multiply by three. The first factor is published, the second is a guess, and the third is the correction everyone learns the hard way: dataset preparation, failed runs and the time you spend reading logs all bill as instance hours if you leave the machine on.

Two habits cut that multiplier:

- Write results after every unit of work, so a crash costs the last unit rather than the whole run.
- End the script with a shutdown command, so a finished job cannot keep billing.

## What we would do first, in Malaysia

1. **Transcribe your voice notes and calls.** Existing data, immediate value, an afternoon of compute.
2. **Extract fields from incoming invoices.** The pain is weekly and the job is batch.
3. **Embed your documents so search works.** Small, permanent, and it makes every later assistant better.

The order matters less than the first step: rent the card for a job with an end, switch it off, and look at the bill. It will be smaller than the caution that stopped you, and the second job will be easier than the first.

---

**Read next**

[USD 0.04 of GPU time, and the dataset was the work](https://upahje.my/en/articles/rented-gpu-what-it-finishes)

[The same H100 rents for RM11.89 an hour, or RM7.12](https://upahje.my/en/articles/gpu-rental-cost-malaysia)

[Twelve jobs a rented GPU finishes, and three it cannot](https://upahje.my/en/articles/trading-bot-reality-malaysia)
