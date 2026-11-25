---
title: "Agent harness, AI harness, agent framework: what they mean"
description: "An agent harness runs the loop: it executes tool calls, holds the transcript, applies permissions. Vendors say agent harness; AI harness is not their term."
slug: agent-harness-vs-ai-harness
translationKey: agent-harness-vs-ai-harness
date: 2026-11-19
updated: 2026-11-19
author: "UpahJe Desk"
category: definitions
tags: [definitions, agent-harness, terminology, malaysia]
canonical: https://upahje.my/en/articles/agent-harness-vs-ai-harness
draft: false
changelog:
  - date: 2026-11-19
    note: "First published."
sources:
  - title: "Claude Code docs, Agent SDK overview (hosted agent harness)"
    url: "https://code.claude.com/docs/en/agent-sdk/overview"
    checked: 2026-11-19
  - title: "DeepSeek Harness package README, installed on this machine (Harness home)"
    url: "https://www.npmjs.com/package/@deepseek-ai/dsh"
    checked: 2026-11-19
  - title: "OpenBot repository and site"
    url: "https://openbot.run/"
    checked: 2026-11-19
  - title: "MausBot site"
    url: "https://mausbot.com/"
    checked: 2026-11-19
---

# Agent harness, AI harness, agent framework: what the words mean

An agent harness is the runtime that runs a model's agent loop: it holds the system prompt, executes tool calls, manages context, applies permissions and supplies a working environment. Vendors use "agent harness" or just "harness". "AI harness" is not a phrase the official sources I opened use, and "agent framework" is a different thing again.

## Who actually says "harness"?

Anthropic says "hosted agent harness", and the DeepSeek Harness package uses the bare word as its product noun.

Anthropic's own definition is the clearest: a hosted agent harness "runs the agent loop, with sessions in an Anthropic-managed cloud sandbox or a self-hosted sandbox on your own infrastructure" ([Claude Code docs, read 19 Nov 2026](https://code.claude.com/docs/en/agent-sdk/overview)). The installed DeepSeek Harness package uses the word the same way, as in "Harness home" for its config directory ([package README, read 19 Nov 2026](https://www.npmjs.com/package/@deepseek-ai/dsh)). Neither treats it as a metaphor.

## What does the term imply, in practice?

Four things, and each one is a line rather than a walkthrough.

1. **Tool execution.** The harness runs the tool, not the model. The model chooses a tool and arguments, and the harness performs the call.
2. **A turn and step loop.** One message becomes a turn; the turn contains steps; each step is another exchange with the model when a tool result needs to go back.
3. **A transcript on disk.** The conversation is written to a file you can read: in this harness, compressed JSON Lines under `.dsh/sessions`.
4. **Permissions and approvals.** A harness decides what a tool is allowed to do, and records the policy. Without that, it is a chat client with extra steps.

How it walks through one message, step by step, is covered in [what an agent harness does with your request](https://upahje.my/en/articles/using-the-harness). This article is about the vocabulary, not the loop.

## Where does "AI harness" come from?

Not from the vendors I could read. Across the four official sources opened for this article, the phrase "AI harness" does not appear.

The method has a limit and I will state it: a search-engine query for the exact phrase returned a bot-check page instead of results, so I cannot claim no page anywhere uses it. What I can say is narrower and still useful: Anthropic says "agent harness", DeepSeek Harness says "harness", and neither uses "AI harness" on the pages I opened. When a blog uses "AI harness", it is borrowing the vendor word and adding a modifier that the vendors do not use.

| Term | Who uses it | What it means in that context |
| --- | --- | --- |
| Harness | DeepSeek Harness, Anthropic | The runtime that runs the agent loop and owns the environment |
| Agent harness | Anthropic, most vendor docs | The same runtime with the agent parts named: sessions, subagents, tool routing, approvals |
| AI harness | Marketing pages and blogs | No fixed meaning; on the sources read here, not a vendor term at all |
| Agent framework | Library authors | A code library for building agents, not a runtime that runs one |
| Agent workspace | OpenBot, MausBot | The product's own word for a harness plus a desktop or a machine per bot |

## Why does the distinction matter when buying?

Because the words describe what the product does to your machine and your data, and a framework is not that.

A framework is something a developer imports; it does not give you a running environment, a transcript you can read, or an approval gate. A harness does, and that is why the questions you ask a vendor differ: where does the transcript live, what may the tools touch, and who approves an action. If a product calls itself an "AI harness" and cannot answer those three, the label is decoration.

**Read next**

[What an agent harness does with your request](https://upahje.my/en/articles/using-the-harness)

[More on agent harnesses](https://upahje.my/en/articles/category/definitions)

