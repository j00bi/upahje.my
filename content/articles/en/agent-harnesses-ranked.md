---
title: "Agent harnesses ranked: four CLIs installed on one machine"
description: "DeepSeek Harness, Claude Code, Codex CLI and OpenCode installed on one machine, scored 1-5 on five weighted criteria using only what we could read from each on 19 November 2026."
slug: agent-harnesses-ranked
translationKey: agent-harnesses-ranked
date: 2026-11-19
updated: 2026-11-19
author: "UpahJe editorial"
category: buying-guides
tags: [buying-guides, agent-harness, comparison, malaysia]
canonical: https://upahje.my/en/articles/agent-harnesses-ranked
draft: false
sources:
  - title: "DeepSeek Harness package metadata (@deepseek-ai/dsh 0.2.2-rc.1)"
    url: "https://www.npmjs.com/package/@deepseek-ai/dsh"
    checked: 2026-11-19
  - title: "Claude Code CLI on this machine (version reported by the binary)"
    url: "https://docs.anthropic.com/en/docs/claude-code"
    checked: 2026-11-19
  - title: "Codex CLI on this machine (version reported by the binary)"
    url: "https://github.com/openai/codex"
    checked: 2026-11-19
  - title: "OpenCode CLI on this machine (version reported by the binary)"
    url: "https://opencode.ai/docs"
    checked: 2026-11-19
---

# Agent harnesses ranked: four CLIs installed on one machine

DeepSeek Harness scores highest at 4.35 out of 5, OpenCode second at 4.15, Claude Code third at 3.70 and Codex CLI fourth at 3.45. The scores come from five weighted criteria, each scored only from observations made on this machine on 19 November 2026. Nothing below is general knowledge about these tools.

## How were the scores built?

Each tool was scored 1 to 5 on five criteria, and the criteria were weighted for a Malaysian SME that wants automation and cost control.

| Criterion | Weight | Why it carries that weight |
| --- | --- | --- |
| Provider and cost control | 30% | The largest lever on a monthly bill is which model and which billing route you can use |
| Non-interactive automation | 20% | If it cannot run unattended, it cannot run on a schedule |
| MCP and tool integration | 20% | This decides whether the agent can touch your systems at all |
| Extensibility | 15% | Getting more behaviour without waiting for the vendor |
| Operational footprint | 15% | Disk, backups and machine cost for a small team |

A cell scores 5 only when the observation is explicit and complete. A criterion with nothing in our notes scores "not verified" and contributes nothing, rather than averaging to a polite middle. Provider and cost control, MCP and extensibility are editorial scores anchored to the line each tool has in the table, not measured quantities: the table says a tool supports a route, not how well it does it.

## What did we measure?

Four harnesses, one machine, one day. Version, install route, config, automation surface, MCP, provider choice, extensibility and disk footprint.

What that does and does not cover: all four were installed and configured on this machine, and every cell above was read from that installation by running `--version`, `--help` or inspecting the config path. I ran DeepSeek Harness end to end myself in this session. Claude Code, Codex and OpenCode were measured by Chief on the same machine the same day, and I did not use those three end to end. So this is a ranking of what we could inspect, not a claim that all four were driven through the same task.

| | DeepSeek Harness | Claude Code | Codex CLI | OpenCode |
| --- | --- | --- | --- | --- |
| Version | 0.2.2-rc.1 | 2.1.296 | 0.146.0 | 1.18.11 |
| Install | `@deepseek-ai/dsh` npm package, booted by profile | binary at `~/.hermes/node/bin/claude` | binary at `~/.hermes/node/bin/codex` | `~/.opencode/bin/opencode` |
| Config | YAML patch layers under `$DSH_HOME/profiles` plus `cordis.patch.yml` | `~/.claude.json` plus `~/.claude/{skills,sessions,projects}` | `~/.codex/config.toml` plus `auth.json` | `~/.config/opencode/opencode.jsonc` plus `opencode providers` |
| Non-interactive | profiles, including a shipped `headless` one | `-p` / `--print` | `codex exec` | `opencode run` |
| MCP | servers per profile; three were live in our session | `--mcp-config` | `codex mcp`, also `codex mcp-server` | `opencode mcp` |
| Provider choice | any OpenAI-compatible or Anthropic route defined in the profile | Anthropic models, `--model` | OpenAI auth via `login`, model settings in `config.toml` | `opencode providers` manages credentials |
| Extensibility | plugin bundles, profile composition, skills, agent teams | `~/.claude/skills`, `--agents` JSON, subagents | `config.toml`, MCP, experimental `exec-server` | `opencode agent`, MCP, ACP server |
| Local footprint | 3.2 GB | 116 KB | 246 MB | 62 MB |

## What are the scores?

The ranking comes out of the arithmetic below, and the arithmetic is reproducible from the table above.

| Criterion (weight) | DeepSeek Harness | Claude Code | Codex CLI | OpenCode |
| --- | --- | --- | --- | --- |
| Provider and cost control (30%) | 5 | 2 | 2 | 4 |
| Non-interactive automation (20%) | 4 | 4 | 4 | 4 |
| MCP and tool integration (20%) | 5 | 4 | 5 | 4 |
| Extensibility (15%) | 5 | 5 | 3 | 4 |
| Operational footprint (15%) | 2 | 5 | 4 | 5 |
| Weighted total | 4.35 | 3.70 | 3.45 | 4.15 |

Footprint was scored on a stated scale: 5 for under 100 MB, 4 for under 500 MB, 2 for under 5 GB. Non-interactive automation scores 4 rather than 5 for all four because each has one documented route and we did not test a scheduled run for any of them.

## What does each tool win on?

DeepSeek Harness wins on provider choice, MCP and extensibility, and loses on disk.

Its provider line is the only one that reads "any OpenAI-compatible or Anthropic route", which is the 30% criterion doing most of the work. Its MCP is per-profile with three servers live during our session. Extensibility covers plugin bundles, profile composition, skills and agent teams. Against that, 3.2 GB is about 13.3 times Codex and roughly 28,900 times Claude Code on disk, which is why it takes a 2 on footprint.

OpenCode is the most even tool in the set: 4, 4, 4, 4, 5, with no single weak cell.

It has no 5 outside footprint, and no 3 or lower anywhere. For a small team that would rather not have a surprise, that shape is the argument.

Claude Code wins on footprint and extensibility and is restricted on provider.

At 116 KB it is the smallest install of the four, about 550 times smaller than OpenCode's 62 MB, and its skills plus subagents are the most complete extensibility story we observed. The provider line, "Anthropic models, `--model`", is what holds it to 3.70 despite that.

Codex CLI wins on MCP, because it is the only one of the four documented here as both an MCP client and an MCP server.

Its automation route (`codex exec`) is solid and its footprint is mid-pack. The provider line is OpenAI-only through `login`, and `exec-server` is marked experimental, which is what puts it fourth.

## What did we not verify?

OpenMausBot is out, and not because it lost. The binary is present but errors on launch, its global install and data directory are gone, and its systemd unit is inactive. We tested it and it could not run, so it is not scored and it is not ranked last.

Not verified for any of the four: response quality, latency, token cost, reliability over a week, or behaviour under load. We measured what is in the table and nothing else. A version bump can change any cell here, which is the risk in publishing version-pinned numbers: 0.146.0 and 1.18.11 are today's values, not permanent properties.

## How can I re-run this check?

Four commands and a filesystem check, and you can audit every number in the tables.

1. Run `--version` on each binary to get the four version strings.
2. Run `--help` on each to see the non-interactive flags and MCP subcommands listed above.
3. Read the config paths in the table: `$DSH_HOME/profiles`, `~/.claude.json`, `~/.codex/config.toml`, `~/.config/opencode/opencode.jsonc`.
4. Run `du -sh` on `~/.dsh`, `~/.claude`, `~/.codex` and `~/.config/opencode` for the footprints.

**Read next**

[What an agent harness does with your request](https://upahje.my/en/articles/using-the-harness)

[More on buying and choosing tools](https://upahje.my/en/articles/category/buying-guides)
## FAQ

### Does the ranking change if I care about cost more than 30%?

Yes, and the table lets you recompute it. Raising provider and cost control to 40% and dropping footprint to 5% keeps DeepSeek Harness first and widens its lead over OpenCode, because the gap between them sits almost entirely in that criterion. Recomputed on the same cells, that weighting gives DeepSeek Harness 4.65 and OpenCode 4.05.

### Why rank at all if the numbers are version-pinned?

Because a buyer still has to choose this week, and a stated method with a re-run recipe is checkable. The alternative, an unranked list with no weights, hides the same judgement behind prose where nobody can audit it.

