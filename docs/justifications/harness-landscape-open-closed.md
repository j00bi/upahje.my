# Justification: harness-landscape-open-closed

## Claims

| # | claim | source URL | publisher | checked | basis |
|---|-------|------------|-----------|---------|-------|
| 1 | "OpenBot is not." | https://github.com/nightly-labs/openbot | GitHub | 2026-11-19 | source: repository licence field reads NOASSERTION, licence file is PolyForm Noncommercial 1.0.0 |
| 2 | "OpenBot (nightly-labs) | Local-first desktop workspace for persistent AI teammates, with a plugin marketplace | PolyForm Noncommercial 1.0.0; repo licence field reads NOASSERTION | Official source, read 2026-11-19 | Active, pushed 2026-11-19, 9,037 stars" | https://github.com/nightly-labs/openbot | GitHub | 2026-11-19 | source: repository metadata and LICENSE file |
| 3 | "MausBot (OpenMausBot) | Open-source Grok Bot alternative with a virtual machine bots can use | Apache-2.0 on the main repo; a separate download repo carries MIT | Official source, read 2026-11-19 | Active, pushed 2026-11-18, 25,485 stars" | https://github.com/milind-soni/OpenMausBot | GitHub | 2026-11-19 | source: repository metadata |
| 4 | "PolyForm Noncommercial 1.0.0, which covers OpenBot, permits noncommercial use only." | https://github.com/nightly-labs/openbot | GitHub | 2026-11-19 | source: LICENSE file heading and restriction terms |
| 5 | "The repository's licence file is PolyForm Noncommercial 1.0.0, and GitHub's licence field reports NOASSERTION because it does not recognise a standard licence." | https://github.com/nightly-labs/openbot | GitHub | 2026-11-19 | source: LICENSE file and repository licence field |
| 6 | "The `openmausbot` launcher is still on this machine, and running it fails with a Node `Cannot find module` error naming a payload path that no longer exists." | - | our measurement, this machine | 2026-11-19 | source: ran the launcher on 19 November 2026; `Cannot find module` for a missing payload |
| 7 | "`nightly-labs/openbot` is the desktop agent workspace in the table." | https://github.com/nightly-labs/openbot | GitHub | 2026-11-19 | source: repository description |
| 8 | "`CopilotKit/OpenBot` is an MIT project with 12,887 stars described as an open alternative to closed AI bots" | https://github.com/CopilotKit/OpenBot | GitHub | 2026-11-19 | source: repository metadata read by the scan on 19 November 2026 |
| 9 | "`ob-f/OpenBot` is a robotics project that puts smartphone brains in toy cars" | https://github.com/ob-f/OpenBot | GitHub | 2026-11-19 | source: repository description read by the scan on 19 November 2026 |
| 11 | "Grok Bot (xAI) | Always-on agents with their own computer, working inside apps | Closed; signed macOS app, no public repo | Official source, announcement dated 2026-08-11 | Beta" | https://x.ai/news/introducing-grok-bot | xAI | 2026-11-19 | source: Table row Grok Bot |
| 12 | "Dots (OpenAI) | Always-on agents inside ChatGPT, with their own cloud computer | Closed; no public repo | Official source, announcement dated 2026-09-29 | Live, rolling out to Enterprise from 2026-11-18" | https://openai.com/index/introducing-dots/ | OpenAI | 2026-11-19 | source: Table row Dots |
| 13 | "DeepSeek Harness | Harness run by a profile, with MCP servers per profile | npm package, see package metadata | Ran here; no longer re-verifiable end to end | Installed 0.2.2-rc.1 on 2026-11-19" | - | our measurement, this machine | 2026-11-19 | source: `dsh --version` printed 0.2.2-rc.1 on 19 November 2026 |
| 14 | "Claude Code, Codex CLI, OpenCode | CLI harnesses measured on this machine | Proprietary licences | Ran here, 2026-11-19 | Active" | - | our measurement, this machine | 2026-11-19 | source: `--version` on each binary, printed in the ranking piece |
| 15 | "Apache-2.0, which covers MausBot's main repository, permits commercial use, modification and redistribution, provided you keep the notices." | https://github.com/milind-soni/OpenMausBot | GitHub | 2026-11-19 | source: repository licence field Apache-2.0 |
| 16 | "OpenBot's code is readable and its site says "The source code of OpenBot is open", and its licence file says you may not use it commercially without paying." | https://openbot.run/ | OpenBot | 2026-11-19 | source: site wording, contradicted by the LICENSE file in the same article |
| 17 | "Repositori kedua yang menyebut dirinya repositori muat turun MIT pernah dipetik di sini sehingga 24 November 2026" | https://github.com/OpenMausBot/OpenMausBot | GitHub | 2026-11-24 | source: the URL returned 404 on 24 November 2026 and the organisation page returned 404 the same day, so the claim is now recorded as no longer checkable |
| 18 | "The payload is gone, there is no systemd unit under that name, and no data directory remains." | - | our measurement, this machine | 2026-11-19 | source: `systemctl status` returned no unit, and the data directories are absent |

## Sections

| H2 | why this section exists |
|----|-------------------------|
| What is on the market? | One table with licence and evidence level per product, so a reader can tell closed from source-available at a glance |
| What do the licences actually let a business do? | The commercial consequence of each licence, which is the piece's real value |
| Why does one name map to several projects? | The collision warning, including that the installed project is now unidentifiable |
| What did we lose, and how do we know? | The ran-here evidence level, with the orphaned launcher as its proof |
| Which word should I use? | One paragraph pointing to the vocabulary article instead of repeating it |
| FAQ | OpenBot licence, MausBot's two repos, and harness-versus-model licensing |
| Sources | The six URLs read, each dated |
