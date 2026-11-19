---
title: "What an agent harness is, and what it does with your request"
description: "A harness sits between you and the model: it holds the conversation, runs the tools, sends each request and streams the answer. What one message looks like inside DeepSeek Harness 0.2.2-rc.1."
slug: using-the-harness
translationKey: using-the-harness
date: 2026-11-19
updated: 2026-11-19
author: "UpahJe editorial"
category: definitions
tags: [definitions, agent-harness, deepseek-harness, malaysia]
canonical: https://upahje.my/en/articles/using-the-harness
draft: false
sources:
  - title: "DeepSeek Harness package metadata (@deepseek-ai/dsh 0.2.2-rc.1, installed on this machine)"
    url: "https://www.npmjs.com/package/@deepseek-ai/dsh"
    checked: 2026-11-19
---

# What an agent harness is, and what it does with your request

An agent harness is the program between you and the model. It holds the conversation, runs the tools, sends each request to the model and streams the answer back. In DeepSeek Harness 0.2.2-rc.1 on this machine, one typed message becomes a turn, a turn becomes steps, and every step is written to a file on disk.

Everything below comes from reading the harness installed on this machine on 19 November 2026: its package metadata, and the session transcripts it writes. The installed version is 0.2.2-rc.1, which is what the package file inside the install reports. Where this page describes a flow, the record names are the ones the transcript actually contains.

## What happens to one message, from typing to answer?

The harness records the message as a turn, then works through steps; each step can produce a tool call, and the turn ends when the model stops asking for tools.

The transcript for this machine contains these record types, in the order a single exchange produces them:

1. `turn/start` marks the moment your message is accepted.
2. `step/start` begins one model exchange.
3. `request/header` and `request/context` record what was sent to the model for that step.
4. `assistant/message` holds the reply, which may be prose or a tool call.
5. `tool/call` names the tool and carries its arguments.
6. `tool/result` holds what the tool returned.
7. `step/end` closes the step, and the next step begins if the model wants another tool.
8. `turn/end` closes the turn, and the answer streams back to you.

The important detail for a business owner is number 7. A task that needs four tools is not one exchange with the model, it is several, because the model cannot see a tool's result until the harness has run it and sent the result back.

## Where is the conversation stored?

Every session is a directory under `.dsh/sessions`, named after the folder you were working in, and it holds one compressed transcript file plus a lock file.

The path has three parts: `~/.dsh/sessions/<workspace>/<session>/session.v4.jsonl.zstd`. The workspace placeholder is a slug built from the folder you were working in, the session placeholder is a unique identifier, and the last part is the transcript file. The real values on your machine will differ from anyone else's, which is the point of the placeholders. The transcript is Zstandard-compressed JSON Lines, one record per line before compression, and `session.lock` sits beside it.

That is worth knowing before you paste a client's contract into a chat window. The conversation is a file on your own disk, in a folder named after your project, and it is readable with one command.

## What does a tool call look like in that flow?

A tool call record carries the turn number, the step number, a call identifier, the tool name, and the arguments, and the harness, not the model, is what executes it.

The `tool/call` record in the transcript has exactly these data fields: `turn`, `step`, `callId`, `name`, `arguments`. The matching `tool/result` arrives after the harness has actually done the work. So when you read that an agent "ran a command", the sequence is: the model chose the tool and the arguments, the harness executed them, and the result went back to the model in the next step.

## What can I check myself?

Three commands, and you do not need to trust this page to run them.

1. `ls ~/.dsh/sessions` lists one directory per working folder.
2. `ls ~/.dsh/sessions/<folder>/<session>` shows the transcript file and its lock.
3. `zstd -dc ~/.dsh/sessions/<folder>/<session>/session.v4.jsonl.zstd | head -40` prints the first records in plain text.

## FAQ

### Is the transcript human-readable?

Yes, once decompressed. It is JSON Lines: one JSON object per line, each with a `type`, a `seq`, a `time` and a `data` payload. The `zstd` command above turns it back into text without any special tool.

### Does the harness keep my conversation after I close it?

The session directory stays on disk with its transcript, so the file persists after the window closes. Whether your installation deletes old sessions on a schedule is a setting on your machine, not something this page can claim for yours; check the sessions folder before assuming either way.

### Does every request send the whole conversation to the model?

The harness records a `request/header` and a `request/context` per step, so each step is a separate request rather than one long exchange. What exactly the provider receives inside that request is not something this page measures, and we are not going to guess at it.

---

**Read next**

[Definitions, in plain terms](https://upahje.my/en/articles/category/definitions)
