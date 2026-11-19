# Justification: open-models-differences

## Claims

| # | claim | source URL | publisher | checked | basis |
|---|-------|------------|-----------|---------|-------|
| 1 | "DeepSeek-V4.1-Flash-1017 | MIT | "This repository and the model weights are licensed under the MIT License." | Not stated in card text" | https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017 | DeepSeek | 2026-11-19 | source: Table 6, licence cell |
| 2 | "Qwen3.8-2.4T-A95B | Custom, `license_name: qwen3.8-max` | Licence text in the repo's LICENSE file | 2.4T total, 95B activated" | https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B | Qwen | 2026-11-19 | source: Table 6, licence and parameter columns |
| 3 | "Mistral-Large-4-1T-A52B | Mistral Ecosystem Open-Weight License | Licence text in the repo's LICENSE file | 1 trillion" | https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B | Mistral AI | 2026-11-19 | source: Table 6, licence and parameter columns |
| 4 | "Kimi-K3.1-Pro | Kimi K3.1 Pro License | Licence text in the repo's LICENSE file | 2.8T total, 104B activated" | https://huggingface.co/moonshotai/Kimi-K3.1-Pro | Moonshot AI | 2026-11-19 | source: Table 6, licence and parameter columns |
| 5 | "Mistral's card carries the only first-party hardware note among them: "`--tp-size 8`: example tensor-parallel size for a node of 8 GPUs", and it is an example rather than a stated minimum." | https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B | Mistral AI | 2026-11-19 | source: Table 6 hardware-guidance cell |
| 6 | "deepseek-flash | 0.15 in / 0.60 out off-peak; 0.30 in / 1.20 out peak | Off-peak and peak differ" | https://api-docs.deepseek.com/quick_start/pricing | DeepSeek | 2026-11-19 | source: Table 6 hosted-price cell |
| 7 | "kimi-k3.1-pro | 2.00 in / 10.00 out | 1,048,576-token context" | https://platform.moonshot.ai/docs/pricing/chat | Moonshot AI | 2026-11-19 | source: Table 6 hosted-price cell |
| 8 | "Mistral's API lists it at 0.30 in / 1.20 out, against DeepSeek's own off-peak 0.15 / 0.60." | https://docs.mistral.ai/inference/pricing.md | Mistral AI | 2026-11-19 | source: Table 6 third-party hosting note |
| 9 | "deepseek-flash off-peak costs USD 0.00015 + USD 0.0003 = USD 0.00045 a task; kimi-k3.1-pro costs USD 0.002 + USD 0.005 = USD 0.007 a task" | - | - | - | estimate: arithmetic on the printed hosted prices at 1,000 input and 500 output tokens per task |
| 10 | "A node of GPUs is a real bill, and no card here states the minimum configuration, so any figure would be invented." | - | - | - | estimate: our judgement from the absence of a first-party hardware minimum in Table 6 |
| 11 | "DeepSeek-V4-Pro-0813 | MIT | Same wording as above | Not stated in card text" | https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813 | DeepSeek | 2026-11-19 | source: Table 6, licence and parameter columns |
| 12 | "deepseek-v4-pro | 0.66 in / 1.98 out off-peak; peak output 3.96 | Peak input not captured" | https://api-docs.deepseek.com/quick_start/pricing | DeepSeek | 2026-11-19 | source: Table 6, hosted-price cell |
| 13 | "qwen3.8-max | 1.50 in / 4.50 out | Card states this is the official version based on Qwen3.8-2.4T-A95B" | https://www.alibabacloud.com/help/en/model-studio/billing-for-model-studio | Alibaba Cloud | 2026-11-19 | source: Table 6, hosted-price cell |
| 14 | "mistral-large-4 | 0.70 in / 2.10 out | First-party Mistral API" | https://docs.mistral.ai/inference/pricing.md | Mistral AI | 2026-11-19 | source: Table 6, hosted-price cell |
| 15 | "MIT is the permissive one: commercial use, modification and redistribution, with the notice kept." | - | - | - | estimate: our summary of what MIT permits, as a licence, not a vendor claim |

## Sections

| H2 | why this section exists |
|----|-------------------------|
| What does each licence actually say? | The licence name and quoted restriction per model, which decides whether a business may use it |
| What does it take to run one? | Size and the absence of a first-party hardware minimum, stated as a limit rather than a plan |
| What does renting cost instead? | Every published hosted price, including a second host for the same model |
| Which model should a Malaysian SME start with? | One conditional recommendation with its conditions printed beside it |
| What could we not verify? | Licence files not opened, hardware not stated by any card, DeepSeek peak input not published |
| FAQ | Open weight versus commercial use, single GPU, and whether renting is worse |
| Sources | The five model cards and the pricing pages, each dated |
