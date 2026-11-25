# Justification: rent-a-gpu-malaysia

## Claims

| # | claim | source URL | publisher | checked | basis |
|---|-------|------------|-----------|---------|-------|
| 1 | "Runpod's rendered price row for an RTX 4090 reads USD 0.89 an hour" | https://www.runpod.io/pricing | Runpod | 2026-11-25 | source: configuration row, RTX 4090 24 GB, 41 GB RAM, 6 vCPUs, 0.89 USD per hour |
| 2 | "which is RM3.66 at the Bank Negara middle rate of 4.1175 read on 25 November 2026" | https://api.bnm.gov.my/public/exchange-rate | Bank Negara Malaysia | 2026-11-25 | estimate: 0.89 x 4.1175, the USD middle rate read at 17:08:03 |
| 3 | "Twenty minutes is RM1.22." | - | - | 2026-11-25 | estimate: 0.89 / 3 = 0.2967 USD, x 4.1175 |
| 4 | "Our own 17.9-minute run cost USD 0.14, or RM0.58" | - | our measurement, this machine | 2026-11-25 | source: one recorded run, 17.9 minutes, 0.14 USD; 0.14 x 4.1175 = 0.5765 |
| 5 | "The page's metadata line says" | https://www.runpod.io/pricing | Runpod | 2026-11-25 | source: metadata description line, RTX 4090 from 0.34 USD per hour, no configuration shown |
| 6 | "with a per-hour and per-second toggle beside it" | https://www.runpod.io/pricing | Runpod | 2026-11-25 | source: the pricing table's toggle control |
| 7 | "the page states" | https://vast.ai/pricing | Vast.ai | 2026-11-25 | source: Vast pricing page wording, no minimum hours and no rounding up |
| 8 | "0.47 implied" | - | - | 2026-11-25 | estimate: 0.14 USD for 17.9 minutes, scaled to an hour |
| 9 | "the ringgit figure moved within the day, from 4.1155 at midday to 4.1175 in the afternoon" | https://api.bnm.gov.my/public/exchange-rate | Bank Negara Malaysia | 2026-11-25 | source: two API reads that day, 12:08 and 17:08 |
| 10 | "the hourly figure is the least useful number on the page" | - | - | - | opinion: stated once in the reader's interest |

## Sections

| H2 | why this section exists |
|----|-------------------------|
| The row you can actually price | The rendered row against the metadata claim, and the table |
| Two vendors, one readable price | Vast's billing rule, and why Lambda is not a comparison |
| What we were actually billed | Our run against the row rate, and the variant we did not record |
| The session is the unit that decides | Job totals at 20 minutes, an hour and ten hours |
| What to do before you rent | Five actions, in order |
