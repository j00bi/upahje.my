# Justification: leaderboard-row-anatomy

## Claims

| # | claim | source URL | publisher | checked | basis |
|---|-------|------------|-----------|---------|-------|
| 1 | "Five things, and the score is only one of them: the model, the agent that drove it, the settings, the score, and the cost." | https://www.tbench.ai/ | Terminal-bench | 2026-11-23 | source: column list of the leaderboard table, read 23 Nov 2026 |
| 2 | "The Terminal-bench row for DeepSeek reads 38.5% ± 3.8% under Claude Code, with 8.2 billion tokens" | https://www.tbench.ai/ | Terminal-bench | 2026-11-23 | source: the DeepSeek row, resolution rate, agent and tokens columns |
| 3 | "DeepSeek V4.1 Flash 1017 (max)" | https://www.tbench.ai/ | Terminal-bench | 2026-11-23 | source: leaderboard table, model column |
| 4 | "Claude Code" | https://www.tbench.ai/ | Terminal-bench | 2026-11-23 | source: leaderboard table, agent column |
| 5 | "38.5% ± 3.8%" | https://www.tbench.ai/ | Terminal-bench | 2026-11-23 | source: leaderboard table, resolution rate column |
| 6 | "8.2B" | https://www.tbench.ai/ | Terminal-bench | 2026-11-23 | source: leaderboard table, tokens column |
| 7 | "Oct 17, 2026" | https://www.tbench.ai/ | Terminal-bench | 2026-11-23 | source: leaderboard table, release date column |
| 8 | "RANK, MODEL, AGENT, RESOLUTION RATE, RELEASE DATE, TOKENS and COST" | https://www.tbench.ai/ | Terminal-bench | 2026-11-23 | source: the table's column headers as printed |
| 9 | "SWE-bench Verified's agent column lists only mini-SWE-agent." | https://www.swebench.com/ | SWE-bench | 2026-11-23 | source: Verified tab, agent column |
| 10 | "Terminal-bench 4.1 lists Claude Code, Codex, Antigravity CLI, GitHub Copilot, Grok Build and mini-SWE-agent." | https://www.tbench.ai/ | Terminal-bench | 2026-11-23 | source: agent column, distinct values |
| 11 | "Neither board has CommandCode or OpenCode in the agent column." | https://www.swebench.com/ | SWE-bench and Terminal-bench | 2026-11-23 | source: absence check of both agent columns on 23 Nov 2026 |
| 12 | "DeepSeek V3.2 (high) at 70.00% resolved with an average cost of $0.45, and DeepSeek V3.2 Reasoner at 60.00% with an average cost of $0.03, both under mini-SWE-agent." | https://www.swebench.com/ | SWE-bench | 2026-11-23 | source: Verified tab, Bash Only, rows for the two DeepSeek entries |
| 13 | "SWE-bench has no entry for DeepSeek V4.1 Flash or V4 Pro" | https://www.swebench.com/ | SWE-bench | 2026-11-23 | source: absence check against the board's full model list |
| 14 | "Aider polyglot's newest visible run directory is dated 23 August 2025 and its top row is gpt-5 (high) at 88.0% for $29.08" | https://aider.chat/docs/leaderboards/ | Aider | 2026-11-23 | source: leaderboard page, newest dated run directory and top row |
| 15 | "The archived page, snapshot 25 October 2026, lists three interactive demos for Round 1: DeepSeek Platform, OpenCode Go and CommandCode GOAT, each a demo path under a vivarium conceit." | https://web.archive.org/web/20261025232027/https://nazzysar.github.io/deepseek-benchmarks/ | Internet Archive | 2026-11-23 | source: archived catalog.js, snapshot content dated 2026-10-25 |
| 16 | "each entry carries a title, a description, a path and a tone, and no score, duration, token count or cost" | https://web.archive.org/web/20261025232027/https://nazzysar.github.io/deepseek-benchmarks/assets/catalog.js | Internet Archive | 2026-11-23 | source: field list of all three entries in the archived catalog, snapshot dated 2026-10-25 |
| 17 | "their SHA-256 hashes match that repository's `rounds/checksums.json`" | https://github.com/nazzysar/deepseek-benchmarks | our measurement, this machine | 2026-11-23 | source: fetched all three files and compared SHA-256 against rounds/checksums.json on 23 November 2026 |
| 18 | "scanned for text, they carry in-game numbers only, with no build time, token count, cost or score caption" | https://github.com/nazzysar/deepseek-benchmarks | our measurement, this machine | 2026-11-23 | source: text scan of the three checksum-verified files on 23 November 2026 |
| 19 | "Three redacted transcripts in `nazzysar/commandcode-goat-ecosystem-sess` carry 1,123, 582 and 1,091 records" | https://github.com/nazzysar/commandcode-goat-ecosystem-sess | our measurement, this machine | 2026-11-23 | source: `zstd -dc` on each transcript, line count on 23 November 2026 |
| 20 | "The lead session retried 33 times: 23 SERVER, 10 TRANSPORT, 0 TIMEOUT" | https://github.com/nazzysar/commandcode-goat-ecosystem-sess | nazzysar (repository) | 2026-11-23 | source: retry records in the lead transcript, grouped by error class |
| 21 | "across the three, 94 retries split 57 / 37 / 0" | https://github.com/nazzysar/commandcode-goat-ecosystem-sess | nazzysar (repository) | 2026-11-23 | source: retry records across all three transcripts |
| 22 | "Five turns lasted 7,565.5 s, 2,636.0 s, 150.5 s, 117.6 s and 3.9 s" | https://github.com/nazzysar/commandcode-goat-ecosystem-sess | nazzysar (repository) | 2026-11-23 | source: turn records in the transcripts; durations as printed |
| 23 | "totalling 10,473.5 s, about 2 h 55 m" | - | - | - | estimate: arithmetic, sum of the five printed durations |
| 24 | "The run made 161 tool calls, 140 steps, 138 assistant messages and 25 user messages" | https://github.com/nazzysar/commandcode-goat-ecosystem-sess | nazzysar (repository) | 2026-11-23 | source: record-type counts across the three transcripts |
| 25 | "on `deepseek/deepseek-v4.1-flash` through provider `commandcode-goat`" | https://github.com/nazzysar/commandcode-goat-ecosystem-sess | nazzysar (repository) | 2026-11-23 | source: model and provider fields in the session records |
| 26 | "That is a reliability profile, and it says nothing about output quality." | - | - | - | opinion: the article's own framing of what the records measure |
| 27 | "There are no token counts and no cost fields in those records" | https://github.com/nazzysar/commandcode-goat-ecosystem-sess | nazzysar (repository) | 2026-11-23 | source: search of every token field name across the decoded transcripts, and the site data model, both empty |

## Sections

| H2 | why this section exists |
|----|-------------------------|
| What is in a leaderboard row? | Teaches the five fields before any number, with the DeepSeek row as the example |
| Which names appear on the boards at all | The absence finding, plus what SWE-bench does and does not list |
| What the comparison published, and what the run records | The archived catalog, the checksum-verified demos, and the GOAT reliability profile with the no-token, no-cost limit |
| FAQ | Cross-board comparison, whose result the 38.5% is, what the records prove |
