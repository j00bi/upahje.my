# Justification: rm100-budget

## Claims

| # | claim | source URL | publisher | checked | basis |
|---|-------|------------|-----------|---------|-------|
| 1 | "RM100 buys one of two things: a seat in someone's app, or a meter of tokens for software you run." | - | - | - | estimate: our framing of the seat-versus-meter distinction, no external source claimed |
| 2 | "Claude Pro and ChatGPT Plus list no API credits." | https://claude.com/pricing | Anthropic | 2026-11-19 | source: Table 1 rows Claude Pro and ChatGPT Plus, API access column "No" |
| 3 | "Claude Max at USD 100 and Claude Ultra at USD 200 include API credits equal to their own price" | https://claude.com/pricing | Anthropic | 2026-11-19 | source: Table 1 rows Claude Max and Claude Ultra |
| 4 | "Copilot's credits are GitHub AI Credits for its own features, not API access." | https://github.com/features/copilot/plans | GitHub | 2026-11-19 | source: Table 1, Copilot Pro row |
| 5 | "ChatGPT Plus at RM99.90 includes no API credits" | https://chatgpt.com/pricing | OpenAI | 2026-11-19 | source: Table 1, ChatGPT Plus row |
| 6 | "Anthropic publishes Claude Haiku 5.5 at USD 0.10 per million input tokens and USD 0.50 per million output tokens" | https://docs.claude.com/en/docs/about-claude/pricing | Anthropic | 2026-11-19 | source: Table 3, Claude Haiku 5.5 row |
| 7 | "Every ringgit figure is either published in MYR by the vendor, or converted at the Bank Negara Malaysia middle rate of 4.1145 on 19 November 2026." | https://www.bnm.gov.my/exchange-rates | Bank Negara Malaysia | 2026-11-24 | source: Table 7 rate line and conversion column |
| 8 | "One task: USD 0.00045, which is RM0.00185 at 4.1145." | - | - | - | estimate: arithmetic, (2,000/1,000,000 x 0.10) + (500/1,000,000 x 0.50), multiplied by 4.1145 |
| 9 | "RM100 ÷ RM0.00185 = about 54,000 tasks." | - | - | - | estimate: arithmetic, 100 divided by 0.00185 |
| 10 | "Light | 5 | 150 | 0.28" | - | - | - | estimate: arithmetic, 150 tasks x RM0.00185 |
| 11 | "Daily | 30 | 900 | 1.67" | - | - | - | estimate: arithmetic, 900 tasks x RM0.00185 |
| 12 | "Heavy | 200 | 6,000 | 11.11" | - | - | - | estimate: arithmetic, 6,000 tasks x RM0.00185 |
| 13 | "ChatGPT Go at RM24 leaves RM76 for tokens, about 41,000 tasks at the assumed size." | https://chatgpt.com/pricing | OpenAI | 2026-11-19 | estimate: arithmetic, plan price from Table 7, tasks at RM0.00185 |
| 14 | "Gemini's plan pricing: the page returned an empty body to our fetcher." | - | our measurement, this machine | 2026-11-19 | source: collection log, empty response body recorded 19 November 2026 |
| 15 | "Claude Max costs RM411.45 for USD 100 of API credits bundled inside it, which at the same rate is RM411.45 of tokens." | https://claude.com/pricing | Anthropic | 2026-11-19 | source: Table 1 Claude Max row (USD 100 per month, USD 100 monthly API credits) and Table 7 conversion |

## Sections

| H2 | why this section exists |
|----|-------------------------|
| What does a subscription actually include? | Establishes seat-not-key with the plan table before any arithmetic |
| What do tokens cost instead? | The meter, with the task-size assumption printed before the multiplication |
| What does that mean at three usage levels? | The three bands a reader can place themselves in |
| What if I want both a seat and a meter? | The hybrid, costed as a smaller seat plus tokens |
| Where is the line? | The crossover stated as arithmetic thresholds, not a recommendation |
| What could we not verify? | Names blocked pages and the two missing leaderboards instead of implying absence |
| FAQ | Subscription-as-key, the MYR/USD difference, annual plans. None answered in the body |
| Sources | The five URLs used, each dated |
