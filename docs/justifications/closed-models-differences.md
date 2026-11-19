# Justification: closed-models-differences

## Claims

| # | claim | source URL | publisher | checked | basis |
|---|-------|------------|-----------|---------|-------|
| 1 | "Claude Fable 5.2 | 1M tokens | 8 / 40 | Documented | Documented | Image and file documented" | https://docs.claude.com/en/docs/about-claude/models/overview | Anthropic | 2026-11-19 | source: Table 5, row Claude Fable 5.2 |
| 2 | "Claude Haiku 5.5 | 1M tokens | 0.10 / 0.50, input qualified up to 100,000 tokens | Documented | Documented | Image and file documented" | https://docs.claude.com/en/docs/about-claude/models/overview | Anthropic | 2026-11-19 | source: Table 5, row Claude Haiku 5.5 |
| 3 | "GPT-6.2 Astra | 128K tokens short context | Short context 8 / 40, long context 16 / 60 | Documented | Documented | Image and file documented" | https://developers.openai.com/api/docs/pricing | OpenAI | 2026-11-19 | source: Table 5, row GPT-6.2 Astra |
| 4 | "gpt-6-luna | not captured | 0.10 / 0.50 | Documented | Documented | Image and file documented" | https://developers.openai.com/api/docs/pricing | OpenAI | 2026-11-19 | source: Table 5, row gpt-6-luna |
| 5 | "deepseek-v4-pro | 1M tokens | 0.66 in off-peak, 1.98 out off-peak | Documented | Documented | Image not supported" | https://api-docs.deepseek.com/quick_start/pricing | DeepSeek | 2026-11-19 | source: Table 5, row deepseek-v4-pro |
| 6 | "gemini-4-carbon | 1M tokens | 2.00 / 10.00 until 2026-11-30, then 4.00 / 20.00 | Documented | Documented | Image and file documented" | https://aistudio.google.com/docs/pricing | Google | 2026-11-19 | source: Table 5, row Gemini 4 Carbon |
| 7 | "grok-4.7 | 500k tokens | 2.00 / 6.00 under 200k context, 4.00 / 12.00 above | Documented | Documented | Image yes, file not documented" | https://docs.x.ai/docs/pricing | xAI | 2026-11-19 | source: Table 5, row grok-4.7 |
| 8 | "SWE-bench Verified was read with the Bash Only setting and the mini-SWE-agent agent filter, sorted by percent resolved." | https://www.swebench.com/ | SWE-bench | 2026-11-19 | source: Table 2a settings line |
| 9 | "Claude 4.5 Opus (high) | 76.80 | 0.75" | https://www.swebench.com/ | SWE-bench | 2026-11-19 | source: Table 2a row 1, with the same settings |
| 10 | "Aider polyglot's visible top row is gpt-5 (high) at 88.0% pass rate for a total run cost of USD 29.08, but its run directory is dated 2025-08-23 and none of the visible rows is newer than August 2025" | https://aider.chat/docs/leaderboards/ | Aider | 2026-11-19 | source: Table 2b, stale board |
| 11 | "SWE-bench serves its leaderboards through script rather than static text, and no dated snapshot was captured." | - | our measurement, this machine | 2026-11-19 | source: attempt recorded during the collection pass; no static snapshot obtained |
| 12 | "What happens to your prompts is governed by the terms, and the terms pages were listed but not opened for this piece, so I am not going to characterise them." | - | our measurement, this machine | 2026-11-19 | source: collection log; terms URLs recorded as not opened |
| 13 | "1. Claude Haiku 5.5: 0.1 million input × USD 0.10 = USD 0.01, plus 0.02 million output × USD 0.50 = USD 0.01, so USD 0.02 per task." | - | - | - | estimate: arithmetic on the printed Haiku 5.5 rate at the stated 100,000 input and 20,000 output tokens |
| 14 | "2. Claude Fable 5.2: 0.1 million input × USD 8.00 = USD 0.80, plus 0.02 million output × USD 40.00 = USD 0.80, so USD 1.60 per task." | - | - | - | estimate: arithmetic on the printed Fable 5.2 rate at the same assumed task size |
| 15 | "That is an 80 times spread between the cheapest and most expensive row on the same task" | - | - | - | estimate: arithmetic, USD 1.60 divided by USD 0.02 |
| 16 | "Claude Opus 5.5 | 1M tokens | 4 / 20 | Documented | Documented | Image and file documented" | https://docs.claude.com/en/docs/about-claude/models/overview | Anthropic | 2026-11-19 | source: Table 5, row Claude Opus 5.5 |
| 17 | "Claude Sonnet 5.5 | 1M tokens | 2 / 10 | Documented | Documented | Image and file documented" | https://docs.claude.com/en/docs/about-claude/models/overview | Anthropic | 2026-11-19 | source: Table 5, row Claude Sonnet 5.5 |
| 18 | "GPT-6.2 Sol | 128K tokens short context | Short 2 / 10, long 4 / 15 | Documented | Documented | Image and file documented" | https://developers.openai.com/api/docs/pricing | OpenAI | 2026-11-19 | source: Table 5, row GPT-6.2 Sol |
| 19 | "deepseek-flash | 1M tokens | 0.15 / 0.60 off-peak, 0.30 / 1.20 peak | Documented | Documented | Vision yes, file not verified" | https://api-docs.deepseek.com/quick_start/pricing | DeepSeek | 2026-11-19 | source: Table 5, row deepseek-flash |
| 20 | "gemini-4-neon | 1M tokens | 3.00 / 15.00 | Documented | Documented | Image and file documented" | https://aistudio.google.com/docs/pricing | Google | 2026-11-19 | source: Table 5, row Gemini 4 Neon |
| 21 | "Gemini 3 Flash (high) | 75.80 | 0.36" | https://www.swebench.com/ | SWE-bench | 2026-11-19 | source: Table 2a row 2, same settings (Verified, Bash Only, mini-SWE-agent) |
| 22 | "MiniMax M2.5 (high) | 75.80 | 0.07" | https://www.swebench.com/ | SWE-bench | 2026-11-19 | source: Table 2a row 3, same settings |
| 23 | "Claude 4.6 Opus | 75.60 | 0.55" | https://www.swebench.com/ | SWE-bench | 2026-11-19 | source: Table 2a row 4, same settings |
| 24 | "3. gemini-4-carbon at the current rate: 0.1 million input × USD 2.00 = USD 0.20, plus 0.02 million output × USD 10.00 = USD 0.20, so USD 0.40 per task." | - | - | - | estimate: arithmetic on the printed gemini-4-carbon rate at the same assumed task size |

## Sections

| H2 | why this section exists |
|----|-------------------------|
| What does each vendor document? | The only comparable facts: context, price, documented capabilities, file and image support |
| What do the benchmarks actually say? | Quotes two leaderboards with their settings and names, and states that they do not reconcile with vendor names |
| What does a benchmark score not tell you? | Separates the leaderboard number from the buying decision |
| What does one task cost at these rates? | The worked example, so the price table is usable without the reader doing the arithmetic unguided |
| Where is the lock-in? | Retention, deprecation and export, which no benchmark measures |
| Which vendor names drift? | The printed-name drift, so a buyer quotes the id the API uses |
| What did we not measure? | Declares no benchmark run and lists every gap rather than filling it |
| FAQ | Price comparisons, not-captured cells, and the Gemini bundle warning |
| Sources | The five vendor URLs and the two leaderboards, each dated |
