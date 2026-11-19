# Justification: open-vs-closed-models-malaysia

## Claims

| # | claim | source URL | publisher | checked | basis |
|---|-------|------------|-----------|---------|-------|
| 1 | "As of 19 November 2026, Mistral's catalogue lists open-weight models under three licence shapes:" | https://docs.mistral.ai/models | Mistral AI | 2026-11-19 | source |
| 2 | "Mistral Small 4 has 119 billion parameters with 6.5 billion active" | https://docs.mistral.ai/models/mistral-small-4-0-26-03 | Mistral AI | 2026-11-19 | source |
| 3 | "USD 0.15 per million input tokens and USD 0.60 per million output tokens" | https://docs.mistral.ai/models/mistral-small-4-0-26-03 | Mistral AI | 2026-11-19 | source |
| 4 | "GPT-6 Luna: USD 0.10 per million input tokens, USD 0.50 per million output tokens" | https://developers.openai.com/api/docs/pricing | OpenAI | 2026-11-19 | source |
| 5 | "DigitalOcean HGX B300: USD 7.94 per GPU hour" | https://www.digitalocean.com/pricing/gpu-droplets | DigitalOcean | 2026-11-19 | source |
| 6 | "3. One GPU at USD 7.94 an hour for 730 hours a month costs USD 5,796.20." | https://www.digitalocean.com/pricing/gpu-droplets | DigitalOcean | 2026-11-19 | estimate: arithmetic, 7.94 per hour x 730 hours |
| 7 | "On GPT-6 Luna that costs USD 0.48 a month. On Mistral Small 4 it costs USD 0.63." | https://developers.openai.com/api/docs/pricing | OpenAI | 2026-11-19 | estimate: arithmetic on the two published rate cards at 1.8M input and 0.6M output tokens |
| 8 | "To spend USD 5,796 on GPT-6 Luna tokens you would need roughly 36 million messages a month, or 12,000 times the example workload." | - | - | - | estimate: arithmetic, 5,796.20 divided by 0.00016 per message |
| 9 | "And a 119B-parameter model like Mistral Small 4 does not fit on one GPU at full precision, so the rate above is a reference for GPU time, not a capacity plan." | - | - | - | estimate: our judgement from the parameter count against GPU memory, stated as a limit in the article |
| 10 | "Five jobs, and none of them is a one-off setup." | - | - | - | estimate: our description of the work, labelled as description rather than a survey |
| 11 | "What you pay for | Tokens on each request | GPU time, billed by the hour" | - | - | - | estimate: our reasoning from the published billing model, not a measured bill |

## Sections

| H2 | why this section exists |
|----|-------------------------|
| What does "open-weight" actually let me do? | Separates "you can download it" from "it is free", the two things readers conflate |
| What does each option cost per month? | The comparison the piece exists for, every cell traceable to a rate card |
| At what volume does self-hosting pay? | The crossover, computed rather than asserted, with its limits stated in the same section |
| What does running one in-house actually require? | Cost alone decides nothing if nobody on the team can operate it |
| What should a Malaysian SME do this quarter? | One actionable recommendation grounded in open weights also being sold per token |
| FAQ | Availability without self-hosting, hardware reality, data location. None answered in the body |
| Sources | The four URLs, each dated |
