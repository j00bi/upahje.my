# Justification: commandcode-opencode-deepseek-numbers

## Claims

| # | claim | source URL | publisher | checked | basis |
|---|-------|------------|-----------|---------|-------|
| 1 | "DeepSeek V4.1 Flash 1017 (max)" | https://www.tbench.ai/ | Terminal-bench | 2026-11-23 | source: Table 1 row for the DeepSeek entry, model column |
| 2 | "Claude Code" | https://www.tbench.ai/ | Terminal-bench | 2026-11-23 | source: Table 1 row, agent column |
| 3 | "38.5% ± 3.8%" | https://www.tbench.ai/ | Terminal-bench | 2026-11-23 | source: Table 1 row, resolution rate column |
| 4 | "8.2B tokens" | https://www.tbench.ai/ | Terminal-bench | 2026-11-23 | source: Table 1 row, tokens column |
| 5 | "DeepSeek V3.2 (high) at 70.00% resolved with an average cost of $0.45, and DeepSeek V3.2 Reasoner at 60.00% with an average cost of $0.03" | https://www.swebench.com/ | SWE-bench | 2026-11-23 | source: Table 1 rows 1 and 2, Verified tab, Bash Only, mini-SWE-agent |
| 6 | "SWE-bench has no entry for DeepSeek V4.1 Flash or V4 Pro" | https://www.swebench.com/ | SWE-bench | 2026-11-23 | source: Table 1 absence rows, checked against the board's model list |
| 7 | "The newest visible run directory is dated 23 August 2025 and the top row is gpt-5 (high) at 88.0% for $29.08" | https://aider.chat/docs/leaderboards/ | Aider | 2026-11-23 | source: Table 1 Aider row, stale board |
| 8 | "Go | $1/month + processing fee, $10 credits included" | https://commandcode.ai/pricing | CommandCode | 2026-11-23 | source: Table 4, Go row |
| 9 | "GOAT | $10/month + processing fee, up to $100 in credits" | https://commandcode.ai/pricing | CommandCode | 2026-11-23 | source: Table 4, GOAT row |
| 10 | "Go | $10/month" | https://opencode.ai/docs/console/go | OpenCode | 2026-11-23 | source: Table 4, OpenCode Go row |
| 11 | "the agent itself | Free, MIT licence" | https://github.com/anomalyco/opencode | OpenCode | 2026-11-23 | source: Table 4, OpenCode agent row; repository licence field |
| 12 | "deepseek-flash input, cache miss | $0.15 off-peak / $0.30 peak per 1M tokens" | https://api-docs.deepseek.com/quick_start/pricing | DeepSeek | 2026-11-23 | source: Table 4, DeepSeek input row |
| 13 | "Command Code GOAT, $10/month for $70 of credits across 30 models" | https://news.ycombinator.com/item?id=49188656 | Hacker News | 2026-11-23 | source: Table 2, the 5 August 2026 Show HN row |
| 14 | "`dsh` 0.2.2-rc.1 wrote a small feature in 95.4 seconds across 10 turns and 14 tool calls, produced two files, and the project's own tests passed 3 of 3" | - | our measurement, this machine | 2026-11-23 | source: one run recorded on 23 November 2026; `dsh --version` printed 0.2.2-rc.1 |
| 15 | "Both refused to write anything in their non-interactive defaults, and both still exited 0." | - | our measurement, this machine | 2026-11-23 | source: same run, exit-code observation on the two other arms |
| 16 | "The archived page, snapshot 25 October 2026, lists DeepSeek Platform, OpenCode Go and CommandCode GOAT, each as a demo path under a vivarium conceit: "A Closed Ecology", "Abyssal Vivarium", "Vivarium Nº 7"" | https://web.archive.org/web/20261025232027/https://nazzysar.github.io/deepseek-benchmarks/ | Internet Archive | 2026-11-23 | source: archived catalog.js, snapshot content dated 2026-10-25; three demo entries with titles and descriptions |
| 17 | "Each entry carries a title, a description, a path and a tone, and nothing else: no score, duration, token count or cost." | https://web.archive.org/web/20261025232027/https://nazzysar.github.io/deepseek-benchmarks/assets/catalog.js | Internet Archive | 2026-11-23 | source: field list of all three entries in the archived catalog, snapshot dated 2026-10-25 |
| 18 | "38.5% ± 3.8% | DeepSeek V4.1 Flash 1017 (max), under Claude Code, Terminal-bench 4.1 | Terminal-bench leaderboard, read 23 Nov 2026" | https://www.tbench.ai/ | Terminal-bench | 2026-11-23 | source: Table 1 DeepSeek row with its provenance in the cell |
| 19 | "$10/month GOAT + processing fee | Up to $100 in credits, CommandCode's tier as printed | Vendor pricing page, read 23 Nov 2026" | https://commandcode.ai/pricing | CommandCode | 2026-11-23 | source: Table 4 GOAT row |
| 20 | "95.4 s, 10 turns, 14 tool calls, 3/3 tests | One `dsh` run on one task, two files written | Our measurement, 23 Nov 2026" | - | our measurement, this machine | 2026-11-23 | source: the single run recorded on 23 November 2026, `dsh` 0.2.2-rc.1 |
| 21 | "The three `rounds/round-1/*/index.html` files are in `nazzysar/deepseek-benchmarks`, and their SHA-256 hashes match that repository's own `rounds/checksums.json`" | https://github.com/nazzysar/deepseek-benchmarks | our measurement, this machine | 2026-11-23 | source: fetched all three files and compared SHA-256 against rounds/checksums.json on 23 November 2026 |
| 22 | "They show how the run behaved: retries, elapsed time, steps." | https://github.com/nazzysar/commandcode-goat-ecosystem-sess | nazzysar (repository) | 2026-11-23 | source: repository README and the three session transcripts |
| 23 | "lead, critic, prover: 1,123 / 582 / 1,091 records" | https://github.com/nazzysar/commandcode-goat-ecosystem-sess | our measurement, this machine | 2026-11-23 | source: `zstd -dc` on each transcript, line count on 23 November 2026 |
| 24 | "33, of which 23 SERVER, 10 TRANSPORT, 0 TIMEOUT" | https://github.com/nazzysar/commandcode-goat-ecosystem-sess | nazzysar (repository) | 2026-11-23 | source: retry records in the lead transcript as decoded for this article |
| 25 | "5, lasting 7,565.5 s, 2,636.0 s, 150.5 s, 117.6 s and 3.9 s" | https://github.com/nazzysar/commandcode-goat-ecosystem-sess | nazzysar (repository) | 2026-11-23 | source: turn records in the transcripts; durations as printed |
| 26 | "10,473.5 s, about 2 h 55 m" | - | - | - | estimate: arithmetic, sum of the five printed durations |
| 27 | "161 tool calls, 140 steps, 138 assistant messages, 25 user messages" | https://github.com/nazzysar/commandcode-goat-ecosystem-sess | nazzysar (repository) | 2026-11-23 | source: record-type counts across the three transcripts |
| 28 | "`deepseek/deepseek-v4.1-flash`, provider `commandcode-goat`" | https://github.com/nazzysar/commandcode-goat-ecosystem-sess | nazzysar (repository) | 2026-11-23 | source: model and provider fields in the session records |
| 29 | "There are no token counts and no cost fields in those records." | https://github.com/nazzysar/commandcode-goat-ecosystem-sess | nazzysar (repository) | 2026-11-23 | source: search of every token field name across the decoded transcripts, and the site data model, both empty |

## Sections

| H2 | why this section exists |
|----|-------------------------|
| What is actually in a leaderboard row? | Teaches the four fields before any number, with the DeepSeek row as the example |
| Which names appear on the boards at all? | The absence finding, plus what SWE-bench does and does not list |
| What do the prices look like as published? | The tiers, and the processing fee that has no figure |
| Where did the numbers drift? | The August offer against today's page, both dated |
| What did we run ourselves? | The single labelled run, and the exit-code lesson |
| What to do this week? | Five no-purchase actions that produce the reader's own row |
| Try it yourself | Reproduce your own row, with the artefact check |
| What did the comparison actually publish? | The archived catalog, the checksum-verified demos, the field list as evidence, and the figures we do have with provenance |
| What do the GOAT sessions show? | The reliability profile from the run's own records, and the absence of token and cost fields |
| FAQ | Category error, cross-board comparison, stale Aider, demo check |
| Sources | Seven URLs, each dated |
