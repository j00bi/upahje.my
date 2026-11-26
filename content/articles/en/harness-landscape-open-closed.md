---
title: "Agent harnesses: who makes them, what is open"
description: "Grok Bot and Dots are closed hosted products. OpenBot and MausBot are source-available, and only one is open source on its own licence; a licence row for each."
slug: harness-landscape-open-closed
translationKey: harness-landscape-open-closed
date: 2026-11-19
updated: 2026-11-19
author: "UpahJe Desk"
category: buying-guides
tags: [buying-guides, agent-harness, licence, malaysia]
canonical: https://upahje.my/en/articles/harness-landscape-open-closed
draft: false
changelog:
  - date: 2026-11-19
    note: "First published."
sources:
  - title: "nightly-labs/openbot, repository metadata and licence file (PolyForm Noncommercial 1.0.0)"
    url: "https://github.com/nightly-labs/openbot"
    checked: 2026-11-19
  - title: "OpenBot site (the claim that the source is open)"
    url: "https://openbot.run/"
    checked: 2026-11-19
  - title: "MausBot site"
    url: "https://mausbot.com/"
    checked: 2026-11-19
  - title: "milind-soni/OpenMausBot, repository metadata (Apache-2.0)"
    url: "https://github.com/milind-soni/OpenMausBot"
    checked: 2026-11-19
  - title: "xAI, introducing Grok Bot"
    url: "https://x.ai/news/introducing-grok-bot"
    checked: 2026-11-19
  - title: "OpenAI, introducing Dots"
    url: "https://openai.com/index/introducing-dots/"
    checked: 2026-11-19
  - title: "DeepSeek Harness package metadata, installed on this machine"
    url: "https://www.npmjs.com/package/@deepseek-ai/dsh"
    checked: 2026-11-19
---

# Agent harnesses: who makes them, what is open

The four products a reader is likely to name are two different kinds of thing. Grok Bot from xAI and Dots from OpenAI are closed, hosted products you use through someone else's service. OpenBot and MausBot are source-available projects you can run yourself, and only MausBot's main repository is open source on its own licence. OpenBot is not.

## One row per product, with the evidence level stated

One row per product, with the evidence level stated, because three of these were read from official sources and one was installed here and is now gone.

| Product | What it is | Licence or terms | Evidence level | Status | Source |
| --- | --- | --- | --- | --- | --- |
| OpenBot (nightly-labs) | Local-first desktop workspace for persistent AI teammates, with a plugin marketplace | PolyForm Noncommercial 1.0.0; repo licence field reads NOASSERTION | Official source, read 2026-11-19 | Active, pushed 2026-11-19, 9,037 stars | [github.com/nightly-labs/openbot](https://github.com/nightly-labs/openbot) |
| MausBot (OpenMausBot) | Open-source Grok Bot alternative with a virtual machine bots can use | Apache-2.0 on the main repo; the MIT download repo previously cited here no longer resolves | Official source, read 2026-11-19 | Active, pushed 2026-11-18, 25,485 stars | [github.com/milind-soni/OpenMausBot](https://github.com/milind-soni/OpenMausBot) |
| Grok Bot (xAI) | Always-on agents with their own computer, working inside apps | Closed; signed macOS app, no public repo | Official source, announcement dated 2026-08-11 | Beta | [x.ai/news/introducing-grok-bot](https://x.ai/news/introducing-grok-bot) |
| Dots (OpenAI) | Always-on agents inside ChatGPT, with their own cloud computer | Closed; no public repo | Official source, announcement dated 2026-09-29 | Live, rolling out to Enterprise from 2026-11-18 | [openai.com/index/introducing-dots](https://openai.com/index/introducing-dots/) |
| DeepSeek Harness | Harness run by a profile, with MCP servers per profile | npm package, see package metadata | Ran here; no longer re-verifiable end to end | Installed 0.2.2-rc.1 on 2026-11-19 | [npmjs.com/package/@deepseek-ai/dsh](https://www.npmjs.com/package/@deepseek-ai/dsh) |
| OpenMausBot launcher (this machine) | A launcher whose payload is missing | Not applicable | Ran here; cannot run now | Orphaned | local, 2026-11-19 |
| Claude Code, Codex CLI, OpenCode | CLI harnesses measured on this machine | Proprietary licences | Ran here, 2026-11-19 | Active | see [agent harnesses ranked](https://upahje.my/en/articles/agent-harnesses-ranked) |

A second MausBot repository described itself as an MIT download repo and was cited in this article until 24 November 2026, when the link returned 404 and the GitHub organisation behind it no longer resolved. The main repository above is the one that can still be checked.

## The licences decide what a business may do

This is the part worth reading twice, because "open source" and "source available" are not the same permission.

Apache-2.0, which covers MausBot's main repository, permits commercial use, modification and redistribution, provided you keep the notices. For a Malaysian SME that means you can run it in a business, change it, and put it in a product, without paying the project.

PolyForm Noncommercial 1.0.0, which covers OpenBot, permits noncommercial use only. A business using it commercially needs a paid licence. That is the single most useful sentence in this article: OpenBot's code is readable and its site says "The source code of OpenBot is open", and its licence file says you may not use it commercially without paying. Read the licence, not the homepage.

Closed hosted products, Grok Bot and Dots, grant neither. You get access under terms of service, on the vendor's infrastructure, with the vendor's retention rules, and you cannot run them yourself or read the source.

![Three zones: closed and hosted for Dots and Grok Bot, source available for OpenBot under PolyForm Noncommercial, open source for MausBot under Apache-2.0](/figures/harness-licence-line.svg)
*Source available is not open source: OpenBot's licence is noncommercial, MausBot's main repo is Apache-2.0.*

## One name maps to four unrelated projects

Because "OpenBot" is at least four unrelated projects, and the one installed on this machine cannot now be identified.

That is not a rhetorical caveat. `nightly-labs/openbot` is the desktop agent workspace in the table. Separately, `CopilotKit/OpenBot` is an MIT project with 12,887 stars described as an open alternative to closed AI bots, `ob-f/OpenBot` is a robotics project that puts smartphone brains in toy cars, and there are smaller projects under the same name. The directory that was installed here is gone, so which of them it was is unknowable now. A reader searching "OpenBot" today will find the robotics project first, and it has nothing to do with agent harnesses.

"GrokBot" has a milder version of the same problem: the GitHub repositories under that name are mostly community guides and clones about xAI's product, not independent harnesses. "Dots" also collides with an unrelated agent repository.

## One harness is now an orphan, and the failure names it

One harness that used to be installed here is now an orphan, and the failure message is the evidence.

The `openmausbot` launcher is still on this machine, and running it fails with a Node `Cannot find module` error naming a payload path that no longer exists. The payload is gone, there is no systemd unit under that name, and no data directory remains. So MausBot appears in the table from its repository, not from our use of it: we ran it earlier in this project and cannot now re-verify that experience.

## Use the vendor word when you quote the vendor

"Agent harness" if you want the vendor's own term, "harness" if you are talking to someone who already knows. "AI harness" is a modifier the vendors we read do not use. The vocabulary is covered in [agent harness, AI harness, agent framework](https://upahje.my/en/articles/agent-harness-vs-ai-harness).

**Read next**

[Agent harness, AI harness, agent framework: what the words mean](https://upahje.my/en/articles/agent-harness-vs-ai-harness)

[More on buying and choosing tools](https://upahje.my/en/articles/category/buying-guides)

