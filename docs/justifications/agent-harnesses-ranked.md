# Justification, `agent-harnesses-ranked`

Review only. Not rendered, not linked from the page.

## Claim-level

| Claim | Source | Checked |
| --- | --- | --- |
| DeepSeek Harness version 0.2.2-rc.1 | version read by running `--version` on 19 November 2026, cross-checked against the installed package metadata | 2026-11-19 |
| DSH install is `@deepseek-ai/dsh` booted by profile | wrapper package.json dependency, plus `~/.dsh/profiles` on disk | 2026-11-19 |
| DSH config is YAML patch layers under `$DSH_HOME/profiles` plus `cordis.patch.yml` | `~/.dsh/cordis.patch.yml` and `~/.dsh/profiles` exist | 2026-11-19 |
| DSH non-interactive route is a profile including a shipped `headless` one | supplied by Chief from the verified dataset, not re-measured by me | 2026-11-19 |
| DSH MCP servers are per profile and three were live | supplied by Chief from the verified dataset; three MCP servers were available in this session | 2026-11-19 |
| DSH provider route is any OpenAI-compatible or Anthropic route in the profile | supplied by Chief; this session runs an OpenAI-compatible gateway | 2026-11-19 |
| DSH extensibility: plugin bundles, profile composition, skills, agent teams | supplied by Chief from the verified dataset | 2026-11-19 |
| DSH footprint 3.2 GB | `du -sh ~/.dsh` reported by Chief | 2026-11-19 |
| Claude Code 2.1.296 at `~/.hermes/node/bin/claude`, 116 KB, `-p`/`--print`, `--mcp-config`, Anthropic models with `--model`, `~/.claude.json`, skills/subagents | supplied by Chief from the verified dataset | 2026-11-19 |
| Codex CLI 0.146.0 at `~/.hermes/node/bin/codex`, 246 MB, `codex exec`, `codex mcp`, `codex mcp-server`, OpenAI via `login`, `config.toml`, experimental `exec-server` | supplied by Chief from the verified dataset | 2026-11-19 |
| OpenCode 1.18.11 at `~/.opencode/bin/opencode`, 62 MB, `opencode run`, `opencode mcp`, `opencode providers`, `opencode agent`, ACP server, `opencode.jsonc` | supplied by Chief from the verified dataset | 2026-11-19 |
| OpenMausBot binary present, errors on launch, global install and data dir gone, systemd unit inactive | supplied by Chief from the verified dataset | 2026-11-19 |
| Criterion weights 30/20/20/15/15 | Chief's instruction for this piece, a stated editorial choice | 2026-11-19 |
| Footprint scale 5 under 100 MB, 4 under 500 MB, 2 under 5 GB | my scoring rule, stated in the article so a reader can reapply it | 2026-11-19 |
| Non-interactive all score 4 | our own scoring, because none of the four was tested on a scheduled run | 2026-11-19 |
| Weighted totals 4.35 / 4.15 / 3.70 / 3.45 | estimate: arithmetic over the score table above, not a measurement | 2026-11-19 |
| Answer to the 40% sensitivity question | estimate: recomputed from the same score table (0.40/0.20/0.20/0.15/0.05 gives DSH 4.35, OpenCode 3.95) | 2026-11-19 |
| All four run on the same machine on the same day | Chief's dataset statement; I did not independently launch Claude Code, Codex or OpenCode | 2026-11-19 |
| Version bump can change any cell | statement about the method, not a fact about any tool | 2026-11-19 |

Not verified, and therefore absent from the article: response quality, latency, token cost, weekly reliability, behaviour under load, and any pricing for the three tools I did not run myself.

## Choice-level

| Section | Why it exists, what it answers |
| --- | --- |
| Opening | Gives the ranking and the totals before any method, so a reader who wants only the answer has it in the first 50 words |
| How were the scores built? | Answers "by what right do you rank these", and states the weights before any score appears |
| What did we measure? | The raw observations, so every score can be traced back to a cell |
| What are the scores? | The numbers with weights applied, reproducible by hand |
| What does each tool win on? | One paragraph per tool naming its best and worst cell, so the ranking is not a single opaque number |
| What did we not verify? | States the excluded tool and the unmeasured dimensions, which is what a sceptical reader checks first |
| How can I re-run this check? | Four commands, so the reader can audit rather than trust |
| FAQ (2) | Only questions the body does not already answer: sensitivity to a weight change, and why rank at all |
