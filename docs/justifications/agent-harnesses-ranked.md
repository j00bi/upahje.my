# Justification: agent-harnesses-ranked

## Claims

| # | claim | source URL | publisher | checked | basis |
|---|-------|------------|-----------|---------|-------|
| 1 | "DeepSeek Harness scores highest at 4.35 out of 5, OpenCode second at 4.15, Claude Code third at 3.70 and Codex CLI fourth at 3.45." | - | - | - | estimate: arithmetic over the score table in the article, weights 30/20/20/15/15 |
| 2 | "Four harnesses, one machine, one day." | - | our measurement, this machine | 2026-11-19 | source: versions read with `--version` on each binary on 19 November 2026 |
| 3 | "Version 0.2.2-rc.1" (DeepSeek Harness) | - | our measurement, this machine | 2026-11-19 | source: `dsh --version` printed 0.2.2-rc.1 |
| 4 | "Version 2.1.296" (Claude Code) | - | our measurement, this machine | 2026-11-19 | source: `claude --version` printed 2.1.296 |
| 5 | "Version 0.146.0" (Codex CLI) | - | our measurement, this machine | 2026-11-19 | source: `codex --version` printed 0.146.0 |
| 6 | "Version 1.18.11" (OpenCode) | - | our measurement, this machine | 2026-11-19 | source: `opencode --version` printed 1.18.11 |
| 7 | "Local footprint: 3.2 GB, 116 KB, 246 MB, 62 MB" | - | our measurement, this machine | 2026-11-19 | source: `du -sh` ran on ~/.dsh, ~/.claude, ~/.codex and ~/.config/opencode on 19 November 2026 |
| 8 | "3.2 GB is about 13.3 times Codex and roughly 28,900 times Claude Code on disk" | - | - | - | estimate: arithmetic on the footprint row (3,276.8 MB / 246 MB; 3,276,800 KB / 116 KB) |
| 9 | "Recomputed on the same cells, that weighting gives DeepSeek Harness 4.65 and OpenCode 4.05." | - | - | - | estimate: arithmetic at weights 40/20/20/15/05 over the same score table |
| 10 | "OpenMausBot binary is present, errors on launch, its global install and data directory are gone, and its systemd unit is inactive." | - | our measurement, this machine | 2026-11-19 | source: launch attempt and `systemctl status` on 19 November 2026, recorded in the dataset supplied by Chief |
| 11 | "Five criteria were weighted 30/20/20/15/15 for a Malaysian SME that wants automation and cost control." | - | - | - | estimate: editorial weighting chosen for this piece, stated in the article so a reader can change it |

## Sections

| H2 | why this section exists |
|----|-------------------------|
| How were the scores built? | States the weights and the scoring rule before any score appears, so the ranking cannot be read as arbitrary |
| What did we measure? | The raw observations, plus who measured what, so every score traces to a cell |
| What are the scores? | The weighted numbers, reproducible by hand from the table above them |
| What does each tool win on? | Names each tool's best and worst cell, so the ranking is not one opaque total |
| What did we not verify? | Declares the excluded tool and the unmeasured dimensions, which is what a sceptical buyer checks first |
| How can I re-run this check? | Four commands, so a reader audits rather than trusts |
| FAQ | Two questions the body does not answer: sensitivity to a weight change, and why rank at all |
| Sources | Lists the four documentation URLs used for tool identity, and nothing else |
