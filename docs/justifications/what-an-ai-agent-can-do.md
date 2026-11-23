# Justification: what-an-ai-agent-can-do

## Claims

| # | claim | source URL | publisher | checked | basis |
|---|-------|------------|-----------|---------|-------|
| 1 | "Anthropic's own wording for the layer that runs this is an agent harness, which is the program that holds the conversation and runs the tools, defined as "runs the agent loop, with sessions in an Anthropic-managed cloud sandbox or a self-hosted sandbox on your own infrastructure"" | https://code.claude.com/docs/en/agent-sdk/overview | Anthropic | 2026-11-23 | source: quoted phrase on the Agent SDK overview page |
| 2 | "At 2,000 input and 500 output tokens per task, Claude Haiku 5.5 costs `0.002 million × USD 0.10 = USD 0.0002` for input plus `0.0005 million × USD 0.50 = USD 0.00025` for output, which is USD 0.00045 a task." | https://docs.claude.com/en/docs/about-claude/pricing | Anthropic | 2026-11-23 | estimate: arithmetic on the printed Haiku 5.5 rate at the stated token counts |
| 3 | "At the Bank Negara middle rate of **4.1145** (read 19 November 2026), that is about RM0.00185." | https://api.bnm.gov.my/public/exchange-rate | Bank Negara Malaysia | 2026-11-23 | estimate: arithmetic, USD 0.00045 × 4.1145 |
| 4 | "A thousand tasks a month is **RM1.85**, which is less than one teh tarik." | - | - | - | estimate: arithmetic, 1,000 × RM0.00185 |
| 5 | "Malaysian publishers quote project prices for automation work: **RM400** for a simple process build" | https://pangjunhan.vercel.app/ai-automation | Pang Jun Han | 2026-11-23 | source: published price list, simple process build RM400 to RM800 |
| 6 | "**RM6,000-plus** for autonomous task execution" | https://www.autoflow-solutions.com/my/services | Autoflow Solutions | 2026-11-23 | source: published AI task execution tier, RM6,000-plus per project |
| 7 | "A starter workflow build from a studio starts at **RM1,500**" | https://kodesme.klyihao.com/ | KodeSME | 2026-11-23 | source: published starter tier, RM1,500 from |
| 8 | "What the rate cards do not state is the monthly support fee after launch" | - | - | - | estimate: our reading of the price lists, which publish build tiers but no support line for this scope |
| 9 | "An agent acts between steps; a chatbot only answers." | - | - | - | estimate: our definition, built on the harness wording quoted above |
| 10 | "Every agent produces a plausible wrong answer sometimes." | - | - | - | estimate: our judgement from operating agents, stated as a limit rather than a measurement |
| 11 | "at 2,000 input and 500 output tokens per row, about **RM0.00185 a row**, so a hundred rows is under 20 sen" | https://docs.claude.com/en/docs/about-claude/models/overview | Anthropic | 2026-11-23 | estimate: arithmetic at the printed Haiku 5.5 rate and the BNM 4.1145 rate, same task size as above |
| 12 | "which is less than one teh tarik" | - | - | - | estimate: our comparison, priced against a typical RM2 to RM3 teh tarik in Kuala Lumpur, not a published index |
| 13 | "a model reading a CSV column will happily mis-parse an empty cell and invent a customer name" | - | - | - | estimate: our observation from running extractions over sparse rows, stated as the failure mode rather than a measurement |

## Sections

| H2 | why this section exists |
|----|-------------------------|
| What is an agent, as opposed to a chatbot? | The definition, before any capability claim, using a vendor's own wording |
| What can it do unattended? | The safe end of the table, with the reason each row qualifies |
| What needs a human before it happens? | The approval end, which is where a SME's risk actually sits |
| What can it not do at all? | Four hard limits, so the piece is not a sales sheet |
| What does it cost in ringgit? | Running arithmetic and published build prices, with the support gap named |
| How do I tell a demo from something that keeps running? | Six checks a buyer can run against a supplier's claim |
| FAQ | Agent versus automation, developer need, e-Invoice submission, first task |
| Sources | Six URLs, each dated |
