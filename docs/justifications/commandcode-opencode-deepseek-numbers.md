# Justification: commandcode-opencode-deepseek-numbers

## Claims

| # | claim | source URL | publisher | checked | basis |
|---|-------|------------|-----------|---------|-------|
| 1 | "$1/month + processing fee, $10 credits included" | https://commandcode.ai/pricing | CommandCode | 2026-11-23 | source: price table, Go row |
| 2 | "$10/month + processing fee, up to $100 in credits" | https://commandcode.ai/pricing | CommandCode | 2026-11-23 | source: price table, GOAT row |
| 3 | "$20/month" | https://commandcode.ai/pricing | CommandCode | 2026-11-23 | source: price table, Pro row |
| 4 | "$100/month + processing fee, $150 credits" | https://commandcode.ai/pricing | CommandCode | 2026-11-23 | source: price table, Max 10x row |
| 5 | "$15/month + processing fee" | https://commandcode.ai/pricing | CommandCode | 2026-11-23 | source: price table, Provider row |
| 6 | "plus processing fee" | https://commandcode.ai/pricing | CommandCode | 2026-11-23 | source: price table, five paid tiers |
| 7 | "Free, MIT licence" | https://github.com/anomalyco/opencode | OpenCode | 2026-11-23 | source: price table, OpenCode agent row; repository licence field |
| 8 | "$10/month" | https://opencode.ai/docs/console/go | OpenCode | 2026-11-23 | source: price table, OpenCode Go row |
| 9 | "$40/month" | https://opencode.ai/docs/console/go | OpenCode | 2026-11-23 | source: price table, Go Plus row |
| 10 | "$20 per member per month, two-member minimum" | https://opencode.ai/docs/console/go | OpenCode | 2026-11-23 | source: price table, Go Teams row |
| 11 | "deepseek-flash input, cache miss" | https://api-docs.deepseek.com/quick_start/pricing | DeepSeek | 2026-11-23 | source: price table, input row |
| 12 | "$0.15 off-peak / $0.30 peak per 1M tokens" | https://api-docs.deepseek.com/quick_start/pricing | DeepSeek | 2026-11-23 | source: price table, input row |
| 13 | "$0.60 off-peak / $1.20 peak per 1M tokens" | https://api-docs.deepseek.com/quick_start/pricing | DeepSeek | 2026-11-23 | source: price table, output row |
| 14 | "Command Code GOAT, $10/month for $70 of credits across 30 models" | https://news.ycombinator.com/item?id=49188656 | Hacker News | 2026-11-23 | source: the 5 August 2026 Show HN post, quoted in the drift section |
| 15 | "`dsh` 0.2.2-rc.1 wrote a small feature in 95.4 seconds across 10 turns and 14 tool calls, produced two files, and the project's own tests passed 3 of 3" | - | our measurement, this machine | 2026-11-23 | source: one run recorded on 23 November 2026; `dsh --version` printed 0.2.2-rc.1 |
| 16 | "Both refused to write anything in their non-interactive defaults, and both still exited 0." | - | our measurement, this machine | 2026-11-23 | source: same run, exit-code observation on the two other arms |
| 17 | "An exit code of zero means the process finished. It does not mean the work happened." | - | our reading of the same run | 2026-11-23 | estimate: our interpretation of the observed exit codes, stated as the article's lesson |

## Sections

| H2 | why this section exists |
|----|-------------------------|
| What do the prices look like as published? | The tiers, and the processing fee that has no figure |
| Where did the numbers drift? | The August offer against today's page, both dated |
| What did we run ourselves? | The single labelled run, and the exit-code lesson |
| What to do this week? | Five no-purchase actions that produce the reader's own row |
| Try it yourself | Reproduce your own row, with the artefact check |
| FAQ | Category error, cross-board comparison, stale Aider, demo check |
| Sources | Seven URLs, each dated |
