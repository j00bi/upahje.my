# Justification, `open-vs-closed-models-malaysia`

Review only. Not rendered, not linked from the page.

## Claim-level

| Claim | Source | Checked |
| --- | --- | --- |
| Open-weight means model files are published and can run on your hardware | https://docs.mistral.ai/models | 2026-11-19 |
| Licence shapes: Apache 2.0 (Mistral Small 4, Ministral 3), MIT (Z.ai GLM 5.3, DeepSeek V4.1 Flash), vendor-specific (Mistral Large 4) | https://docs.mistral.ai/models | 2026-11-19 |
| Mistral Small 4 is 119B parameters with 6.5B active, Apache 2.0, USD 0.15 input / USD 0.60 output per million tokens | https://docs.mistral.ai/models/mistral-small-4-0-26-03 | 2026-11-19 |
| GPT-6 Luna is USD 0.10 input / USD 0.50 output per million tokens | https://developers.openai.com/api/docs/pricing | 2026-11-19 |
| DigitalOcean HGX B300 is USD 7.94 per GPU hour | https://www.digitalocean.com/pricing/gpu-droplets | 2026-11-19 |
| 730 hours a month costs about USD 5,796.20 | estimate: arithmetic, 7.94 x 730 | 2026-11-19 |
| 3,000 messages at 600 in / 200 out is 1.8M input and 0.6M output tokens | estimate: arithmetic on the stated workload | 2026-11-19 |
| That workload costs USD 0.48 a month on GPT-6 Luna and USD 0.63 on Mistral Small 4 | estimate: arithmetic from the two published rate cards | 2026-11-19 |
| Crossover is about 36 million messages a month | estimate: arithmetic, 5,796.20 divided by the per-message cost | 2026-11-19 |
| A 119B model does not fit one GPU at full precision | statement of the parameter size against GPU memory, marked as a limit in the article | 2026-11-19 |
| Five operational jobs for running in-house | our own description of the work, labelled as such in the article | 2026-11-19 |

## Choice-level

| Section | Why it exists, what it answers |
| --- | --- |
| Opening | Answers "can I run this myself" in 55 words, including the practical no |
| What does open-weight let me do? | Separates "you can download it" from "it is free", the two things readers conflate |
| What does each option cost per month? | The comparison table the brief asked for, with every cell traceable to a rate card |
| At what volume does self-hosting pay? | The crossover, computed rather than asserted, with its limits stated |
| What does running it require? | The skills answer, since cost alone decides nothing if nobody can operate it |
| What should an SME do this quarter? | One recommendation, grounded in the fact that open weights are also sold per token |
| FAQ (3) | Availability without self-hosting, hardware reality, and data location. None is answered in the body |
