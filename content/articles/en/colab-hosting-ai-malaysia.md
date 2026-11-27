---
title: "Colab will train your model. It will not host it"
description: "Google's own FAQ bans file hosting, media serving and web services on Colab, and blocks SSH on the free tier. What it does allow, and what hosting costs."
slug: colab-hosting-ai-malaysia
translationKey: colab-hosting-ai-malaysia
format: explainer
reader: owner
date: 2026-11-25
updated: 2026-11-25
author: "UpahJe Desk"
category: definitions
tags: [definitions, colab, hosting, malaysia]
cardFigure: "12-hour sessions, no web hosting"
canonical: https://upahje.my/en/articles/colab-hosting-ai-malaysia
draft: false
changelog:
  - date: 2026-11-25
    note: "First published."
sources:
  - title: "Google Colaboratory FAQ (free access to GPUs and TPUs, notebooks run at most 12 hours, restricted activities including file hosting, media serving, SSH shells and remote desktops on free runtimes)"
    url: "https://research.google.com/colaboratory/faq.html"
    checked: 2026-11-25
  - title: "Hugging Face pricing (Spaces CPU Basic free at 2 vCPU and 16 GB, PRO USD 9/month with 8x ZeroGPU quota)"
    url: "https://huggingface.co/pricing"
    checked: 2026-11-25
  - title: "Runpod pricing (RTX A5000 USD 0.27/hr, H100 PCIe USD 2.89/hr) for rented serving capacity"
    url: "https://www.runpod.io/pricing"
    checked: 2026-11-25
  - title: "Frankfurter, USD to MYR reference rate 4.1155 for 24 November 2026"
    url: "https://api.frankfurter.dev/v1/latest?base=USD&symbols=MYR"
    checked: 2026-11-25
---

# Colab will train your model. It will not host it

The question usually arrives as "how do I host my AI on Colab", and the honest answer is that hosting is the one thing Colab's terms single out. Google's FAQ lists file hosting, media serving and "other web service offerings not related to interactive compute" among the activities disallowed on managed runtimes. A free runtime also blocks remote control: SSH shells and remote desktops, and bypassing the notebook interface to work mainly through a web UI.

A tunnel routes around the notebook interface, not around the product's shape: the free runtime blocks remote control by design.

## What the free tier actually gives you

Colab is a hosted Jupyter notebook with free access to GPUs and TPUs. Notebooks run for at most 12 hours, availability and usage permitting, and the virtual machine is deleted after a period of idleness, with a maximum lifetime the service enforces. Nothing about that is guaranteed: the FAQ says resources are not guaranteed and not unlimited, and that limits fluctuate.

So the free tier is a generous batch machine that resets. It is not a server, and treating it as one produces the three failures below.

## The three failures everyone hits

1. **The tunnel that dies.** Point ngrok or cloudflared at a port inside the notebook and you get a public URL. It lives exactly as long as the VM, which is 12 hours at best and often less. Every restart means a new URL, and nobody who needs your model is going to chase a new link each morning.
2. **The keep-alive script.** A cell that clicks the UI or pings the runtime to defeat the idle timer is the behaviour the FAQ describes as bypassing anti-abuse policy. It also only postpones the 12-hour ceiling.
3. **The secret in the notebook.** Anyone with the link can read every cell, including the API key you pasted to reach a model. This one is not a rule being broken, it is a credential being published.

## What Colab is genuinely good at

It is excellent at the work it was built for, and that work is worth naming precisely:

- **Batch experiments.** Train, evaluate, throw the VM away. A model that takes 40 minutes to fine-tune fits comfortably inside one session.
- **Evaluation harnesses.** Run a fixed case set through a model and score it, with the notebook as the record of what was run.
- **Sharing a method.** A notebook someone can open and execute is a better handover document than a folder of scripts.

The pattern that stays inside the rules: train and tune on Colab, write checkpoints to Drive or object storage, and serve from somewhere designed for serving.

## Where hosting actually lives, with prices

| Option | What it is | Price as printed |
| --- | --- | --- |
| Hugging Face Spaces, CPU Basic | 2 vCPU, 16 GB, a Gradio or Docker app with a permanent URL | free |
| Hugging Face PRO | 8x ZeroGPU quota, higher queue priority, Docker and Gradio Spaces | USD 9/month, about RM37.04 |
| Runpod, per hour | A GPU you start and stop; billed per second | USD 0.27/hr for an RTX A5000, about RM1.11 |
| A local machine | Your own hardware behind a tunnel | hardware plus electricity |

The free Spaces tier covers a small model with a modest request rate, which needs no GPU at all, and a permanent URL costs nothing while it does. The RM37.04 for PRO is roughly three hours of an H100 PCIe on a rented platform, which puts the trade in plain terms: a month of hosting against an afternoon of training.

## A workflow that stays inside the rules

1. Do the training and evaluation on Colab, and check the run fits in a session with room to spare.
2. Save the weights to Drive or a model hub the moment a run improves, because the VM will not warn you.
3. Serve from Spaces, a rented GPU, or your own machine, whichever matches the request rate.
4. Keep tokens in notebook secrets or environment variables that are never printed in a cell.
5. Re-read the provider's restricted-activities list before you build a product on top of a free tier, because the list is the contract.

The confusion is not technical, it is about what a notebook is for. Colab sells spare interactive compute to people who are experimenting, and a served product is the opposite of an experiment, so the free tier spends its generosity on training and has none left for hosting.

---

**Read next**

[The same H100 rents for RM11.89 an hour, or RM7.12](https://upahje.my/en/articles/gpu-rental-cost-malaysia)

[More definitions, explained plainly](https://upahje.my/en/glossary)

[Colab will train your model. It will not host it](https://upahje.my/en/articles/self-hosted-clipping)

[Colab will train your model. It will not host it](https://upahje.my/en/articles/trading-bot-reality-malaysia)
