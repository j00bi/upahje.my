# Justification: backtest-gates

## Claims

| # | claim | source URL | publisher | checked | basis |
|---|-------|------------|-----------|---------|-------|
| 1 | "On Hyperliquid, funding is paid every hour" | https://hyperliquid.gitbook.io/hyperliquid-docs/trading/funding | Hyperliquid docs | 2026-11-25 | source: funding page, the rate is paid every hour |
| 2 | "collateral is USDC" | https://hyperliquid.gitbook.io/hyperliquid-docs/trading/margining.md | Hyperliquid docs | 2026-11-25 | source: margining page, depositing USDC |
| 3 | "varies by asset, ranging from 3x to 40x" | https://hyperliquid.gitbook.io/hyperliquid-docs/trading/perpetual-assets.md | Hyperliquid docs | 2026-11-25 | source: perpetual assets page, quoted verbatim |
| 4 | "maintenance margin is half the initial margin at max leverage" | https://hyperliquid.gitbook.io/hyperliquid-docs/trading/perpetual-assets.md | Hyperliquid docs | 2026-11-25 | source: same page, quoted |
| 5 | "on Binance, the fee and funding pages returned an empty 202 on four URLs" | - | our measurement, this machine | 2026-11-25 | estimate: four Binance URLs fetched, all 202 with an empty body |
| 6 | "the fee we used, 0.045%" | - | - | - | assumption: the taker fee used in the backtest, stated as our assumption because the published schedule could not be read |
| 7 | "A strategy that trades twice a day pays that fee 730 times a year" | - | - | 2026-11-25 | estimate: two trades a day over 365 days |
| 8 | "above 50% and above 1.2, on out-of-sample trades, with at least 20 of them" | - | - | - | opinion: our kill criteria, stated as the thresholds this article uses |
| 9 | "six months" | - | - | - | opinion: our forward-survival window, stated as such |

## Sections

| H2 | why this section exists |
|----|-------------------------|
| Gate 1: the data has to survive a duplicate check | The cheapest failure, with the code that shows it |
| Gate 2: costs turn a winner into a loser | The assumption stated, and the arithmetic of 730 fees |
| Gate 3: the walk-forward is the only performance number | Time split, the four-row table, and the kill thresholds |
| Gate 4: shuffle the outcome and see if the edge survives | Permutation, with the comparison rule |
| The gates only buy you six months of patience | What passing does and does not permit, and where leverage belongs |
| What to do this week | Five actions, in order |
