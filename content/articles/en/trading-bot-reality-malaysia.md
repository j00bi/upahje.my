---
title: "A trading bot is a data problem wearing a model's clothes"
description: "Nine symbols, 17.9 minutes of GPU time and RM0.58 of compute produced a model that made one decision for every coin. The model was never the problem."
slug: trading-bot-reality-malaysia
translationKey: trading-bot-reality-malaysia
format: perspective
reader: owner
date: 2026-11-25
updated: 2026-11-25
author: "UpahJe Desk"
category: side-income
tags: [side-income, trading, reinforcement-learning, malaysia]
cardFigure: "17.9 minutes, USD 0.14, one decision"
canonical: https://upahje.my/en/articles/trading-bot-reality-malaysia
draft: false
opinion: true
changelog:
  - date: 2026-11-25
    note: "First published."
sources:
  - title: "Binance, funding rate history endpoint used for the six-month window (schedule not read: the fee and funding pages returned an empty 202)"
    url: "https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Get-Funding-Rate-History"
    checked: 2026-11-25
  - title: "Binance, KLINE candlestick endpoint used for the price series"
    url: "https://developers.binance.com/docs/binance-spot-api-docs/rest-api/market-data-endpoints"
    checked: 2026-11-25
---

# A trading bot is a data problem wearing a model's clothes

A reinforcement-learning agent trained on nine FX and cryptocurrency symbols finished its full run in 17.9 minutes on rented GPU time, for USD 0.14. It then made exactly one decision per symbol, over and over: hold, or sell, whichever the reward gradient found first. That outcome is not a training bug. It is the honest answer to a badly posed question, and it is the outcome most bot projects reach after a year of buying better hardware.

## The cheap part was the training

Nine symbols, 17.9 minutes, USD 0.14. At Runpod's Secure Cloud rate of USD 4.39 an hour for an H100 SXM — and its Community Cloud rate is USD 2.69 for the same card — a run of that length costs less than a cup of coffee. Compute is not the constraint and has not been for years. Anyone who tells you their bot needs a bigger GPU is describing a data problem they have not diagnosed.

The constraint is that a model cannot learn an edge that is not in the data it was given. Feed it six months of minute candles and it will learn the shape of six months of minute candles, including every accident that happened to be in those months.

## What the collapse actually says

A policy that outputs the same action for every input has found the lowest-variance policy available. In a market series where most timesteps look alike, that is often the rational move: the reward signal barely distinguishes one action from another, so the gradient settles on the safest constant.

The fix is not a bigger network or a longer run. It is either a reward that separates good decisions from bad ones at the resolution you actually trade at, or an acceptance that the signal is too thin for a learned policy and a rule belongs there instead. Both answers are cheaper than another GPU and both are harder to accept.

## The part that did work was arithmetic

Where the same research did produce a usable edge, the method was not a model. It was a defined rule measured across six months of funding-rate data: when the funding rate sat above its own 90th percentile, the following periods produced 60 to 70 per cent win rates at 55 to 77 basis points per holding period, with venue fees and funding costs applied rather than assumed away.

That result has four properties a neural network does not give you. It is explainable in one sentence. It is measurable on a sample. It fails visibly when the regime changes. And it can be checked by someone who does not trust you.

## Four gates before any strategy gets money

A backtest is not evidence. These are the gates used before a strategy was allowed to move past paper:

1. **Win rate above 50 per cent** on the full window, not on the best month.
2. **Profit factor above 1.2**, so the wins are large enough to survive a losing run.
3. **At least 20 trades**, because ten trades is an anecdote with a chart.
4. **Survival across the whole window**, including the months the strategy did nothing.

Add decay measurement — how long an edge lasted, not just whether it appeared — and a strategy that passes all four is still only a candidate. Paper trading comes next, and it is not optional, because slippage and fills are where backtests die.

## What this costs a small operator

The honest budget for a bot that might work is not the subscription. It is the months of data work before the first trade: getting clean price series, modelling fees at the venue you will actually use, and writing the validation harness that stops you deploying the version that looked good in March.

Most projects skip that and buy the model instead. That is why they end with a chart that goes up in the past and a live account that does not.

## Where to start, if you are starting

1. Pick one instrument and one rule you can state in a sentence.
2. Get six months of data from the venue's own API, not from a screenshot.
3. Apply fees and funding before you look at the result, not after.
4. Write the four gates down before you see the numbers, so you cannot move them afterwards.
5. Paper trade for a month, and record fills rather than prices.

The bot is the easy part to build and the easiest part to be wrong about. The work that decides whether it makes money happens before a single order is sent, in a spreadsheet most people skip because it is not as interesting as the training loop.

---

**Read next**

[The same H100 rents for RM11.89 an hour, or RM7.12](https://upahje.my/en/articles/gpu-rental-cost-malaysia)

[More side income guides](https://upahje.my/en/glossary)
