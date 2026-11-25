---
title: "A spare laptop is a server only after you measure it"
description: "Idle watts, a battery that is not a UPS, and a tariff you have to read yourself. The arithmetic that decides whether the free machine is actually free."
slug: spare-laptop-home-server-malaysia
translationKey: spare-laptop-home-server-malaysia
format: explainer
reader: owner
date: 2026-11-25
updated: 2026-11-25
author: "UpahJe Desk"
category: definitions
tags: [definitions, self-hosting, hardware, malaysia]
cardFigure: "RM79 a year at 20W and 45 sen"
canonical: https://upahje.my/en/articles/spare-laptop-home-server-malaysia
draft: false
changelog:
  - date: 2026-11-25
    note: "First published."
sources:
  - title: "Tenaga Nasional Berhad, residential pricing and tariffs (the domestic tariff schedule a household reads to find its own per-kWh rate)"
    url: "https://www.tnb.com.my/residential/pricing-tariffs"
    checked: 2026-11-25
  - title: "Ubuntu Server, system requirements and installation guide for a spare machine"
    url: "https://ubuntu.com/server/docs/installation"
    checked: 2026-11-25
  - title: "Tailscale, pricing (personal plans, device-based access without opening an inbound port)"
    url: "https://tailscale.com/pricing"
    checked: 2026-11-25
---

# A spare laptop is a server only after you measure it

A laptop that is already in a drawer costs nothing to acquire, which is why the idea appeals: one service, no monthly fee, no cloud account. The catch is that "free hardware" is a statement about purchase price, and running a machine for a year is a statement about electricity, uptime and your own evenings.

None of that is a reason to avoid it. It is a reason to do four measurements before you commit an evening to it.

## What it actually draws

Modern laptops idle low. A machine with the lid shut, no display output and one service listening will sit somewhere between a nightlight and a light bulb, and the only number that counts is the one your meter shows.

The label on the power brick does not tell you. It states the maximum the adapter can deliver, not what the machine consumes at rest, and the two differ by a factor of five or more.

A plug-in power meter costs about RM30 at any hardware shop, and it converts the whole decision from an argument into a reading. Run the laptop at idle for an hour with the service up, write the watt figure down, and use that.

## The arithmetic, with assumptions stated

Take 20 watts at idle — a plausible figure for a laptop serving one lightweight service — and a domestic rate of 45 sen per kWh. Both are assumptions, and you should replace both with your own.

- 20 W for 24 hours is 480 Wh, or 0.48 kWh a day.
- At 45 sen, that is about 21.6 sen a day.
- Over a year, 175 kWh, or about RM79.

Change the wattage and the answer scales with it: 40 W doubles it to about RM158 a year, 10 W halves it to about RM40. The tariff you should use is printed in your own bill, and TNB publishes the domestic schedule if the bill is not clear enough.

Compare that with the cheapest monthly rent that does the same job. A small cloud instance is often around RM20 to RM40 a month, which is RM240 to RM480 a year. The laptop wins on money at any of the wattages above, and it stops winning the moment your time is priced at more than a few hours a year.

## The battery is not a UPS

A laptop has a built-in battery, and it is tempting to treat that as free protection against a power cut. It is not, for two reasons.

First, a battery that spends its life at 100 per cent and warm degrades quickly, and a swollen battery in a machine running unattended is a fire risk rather than an inconvenience. Most laptops let you cap charging at 60 to 80 per cent in firmware, and a self-hosted machine should.

Second, a graceful shutdown is worth more than five minutes of runtime. Set the machine to shut down when the battery hits a threshold, and assume the power will go out while you are away.

## What to install, and what to skip

1. **A server distribution, not a desktop.** Ubuntu Server or Debian, no graphical session. A desktop environment on a headless machine is memory you are paying for and an attack surface you are not using.
2. **The lid behaviour, set explicitly.** Most laptops suspend when the lid closes, which is the opposite of what a server should do.
3. **`systemd` units with restart policies**, so a service that dies comes back without you.
4. **One way in, not three.** Tailscale or a Cloudflare tunnel gives you remote access without opening a port on the router, and neither needs a static IP.
5. **A backup that leaves the machine.** A server with one copy of its data on one disk is a scheduled loss, whatever the uptime.

Skip the RAID conversation. Two disks in a laptop is rare, and a backup elsewhere solves the problem RAID does not.

## Where this stops working

A spare laptop is the right answer for a personal service, a small internal tool, or a place to run scheduled jobs. It is the wrong answer for anything a customer depends on, for three reasons that no amount of configuration fixes:

- **Residential power and internet.** Both fail, and neither comes with an SLA.
- **A dynamic address.** Tunnels solve reachability, not reliability.
- **One machine, no redundancy.** When it dies, it is down until you are home.

If the service matters to someone else, the RM240 a year for a small instance is the cheapest part of the decision.

## The order to do it in

1. Measure idle watts with a meter, with the service running.
2. Read your own tariff, then calculate the year.
3. Compare it against a small cloud instance at the same workload.
4. Cap the battery charge and set a shutdown threshold.
5. Install a server distribution, set lid behaviour, and add one tunnel.
6. Point a backup at storage outside the machine before you trust it with anything.

That sequence takes an evening and produces a number rather than an opinion, which is the difference between a hobby and a decision.

---

**Read next**

[Colab will train your model. It will not host it](https://upahje.my/en/articles/colab-hosting-ai-malaysia)

[More definitions, explained plainly](https://upahje.my/en/glossary)
