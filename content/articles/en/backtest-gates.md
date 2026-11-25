---
title: "Four gates that kill a bad backtest before it costs money"
description: "Clean data, costs applied, walk-forward, permutation, with kill criteria a backtest must beat: win rate over 50%, profit factor over 1.2, at least 20 trades."
slug: backtest-gates
translationKey: backtest-gates
format: guide
reader: owner
date: 2026-11-25
updated: 2026-11-25
author: "UpahJe Desk"
category: side-income
tags: [side-income, trading, backtest, malaysia]
cardFigure: "Two of four gates most backtests fail"
canonical: https://upahje.my/en/articles/backtest-gates
draft: true
changelog:
  - date: 2026-11-25
    note: "First published."
sources:
  - title: "Hyperliquid docs, funding (the funding rate is paid every hour)"
    url: "https://hyperliquid.gitbook.io/hyperliquid-docs/trading/funding"
    checked: 2026-11-25
  - title: "Hyperliquid docs, perpetual assets (max leverage varies by asset, 3x to 40x; maintenance margin is half the initial margin at max leverage)"
    url: "https://hyperliquid.gitbook.io/hyperliquid-docs/trading/perpetual-assets.md"
    checked: 2026-11-25
---

# Four gates that kill a bad backtest before it costs money

A backtest is worth funding only after it passes four checks in order: clean data, costs applied, walk-forward, permutation. The kill criteria are blunt — win rate over 50%, profit factor over 1.2, at least 20 trades, then six months of forward survival — and most backtests that look profitable fail the second gate.

## Gate 1: the data has to survive a duplicate check

Load the candles, sort them, and count. Duplicates, gaps and symbols that start on different dates all inflate a result without appearing in the summary.

```python
rows = load(symbols, start, end)
rows = dedupe(rows)                    # same timestamp twice
gaps = rows.groupby("symbol").size()
keep = gaps[gaps >= 20 * 24 * 60]      # 20 days of minutes minimum
```

If a symbol has fewer than 20 days of usable data, drop it. A model trained on a symbol with three weeks of history is fitting the launch week.

## Gate 2: costs turn a winner into a loser

Apply the fee you actually pay and the funding you actually pay. On Hyperliquid, funding is paid every hour, and collateral is USDC; on Binance, the fee and funding pages returned an empty 202 on four URLs, so the taker fee in this article is **the fee we used, 0.045%**, stated as an assumption rather than quoted.

A strategy that trades twice a day pays that fee 730 times a year. At 0.045% a side, a 1% edge becomes a 0.91% edge before funding, and funding is hourly.

## Gate 3: the walk-forward is the only performance number

Split the data by time, not at random. Fit on the first 70%, test on the last 30%, and never let the test period influence a parameter.

| Gate | What it checks | Kill criterion |
| --- | --- | --- |
| 1. Data hygiene | duplicates, gaps, short histories | fewer than 20 trades in the sample |
| 2. Costs | taker fee and hourly funding applied | profit factor at or below 1.2 after costs |
| 3. Walk-forward | out-of-sample behaviour | win rate at or below 50% on the test window |
| 4. Permutation | whether the edge survives shuffled returns | shuffled series scores within 10% of the real one |

The win rate and profit factor are the thresholds I use: above 50% and above 1.2, on out-of-sample trades, with at least 20 of them. Fewer than 20 trades is a coin toss with a story attached.

## Gate 4: shuffle the outcome and see if the edge survives

Run the same strategy on returns shuffled in time, a hundred times. If the shuffled runs produce a profit factor close to the real one, the strategy found noise and the market had nothing to do with it.

```python
real = profit_factor(backtest(prices, params))
fake = [profit_factor(backtest(shuffle(prices), params)) for _ in range(100)]
kill = real <= percentile(fake, 90)
```

## The gates only buy you six months of patience

Passing all four is permission to trade small for six months, not permission to size up. Track the live win rate and profit factor on the same definitions, and stop if the live numbers fall below the gates for a month.

Leverage belongs here and only here: Hyperliquid's docs say max leverage "varies by asset, ranging from 3x to 40x", and maintenance margin is half the initial margin at max leverage. Starting at 3x on a strategy that passed four gates is still aggressive; starting at 40x is a different activity.

## What to do this week

1. Run gate 1 on the symbols you meant to trade and count what survives.
2. Put your real fee into the backtest and re-read the result.
3. Split by time and look only at the out-of-sample half.
4. Shuffle a hundred times and compare.
5. If it survives, trade the smallest size for six months.

My opinion, stated once: the gates are cheap and the alternative is not. A weekend spent failing a backtest on paper is cheaper than a month learning the same thing with money, and the second lesson usually costs more than the first.

---

**Read next**

[A trading bot is a data problem wearing a model's clothes](https://upahje.my/en/articles/trading-bot-reality-malaysia)

[More on side income](https://upahje.my/en/topics/freelance)
