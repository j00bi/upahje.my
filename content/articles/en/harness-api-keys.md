---
title: "Where an API key goes in a harness, and where never"
description: "A harness reads your key from an environment variable or its store. What the key authenticates, four places it must never appear, and what to do if it leaks."
slug: harness-api-keys
translationKey: harness-api-keys
date: 2026-11-19
updated: 2026-11-19
author: "Husni Ahmad"
category: buying-guides
tags: [buying-guides, api-keys, security, agent-harness]
canonical: https://upahje.my/en/articles/harness-api-keys
draft: false
changelog:
  - date: 2026-11-19
    note: "First published."
sources:
  - title: "DeepSeek Harness package metadata (credential storage behaviour observed on this machine)"
    url: "https://www.npmjs.com/package/@deepseek-ai/dsh"
    checked: 2026-11-19
  - title: "OpenAI, best practices for API key safety"
    url: "https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety"
    checked: 2026-11-24
---

# Where your API key goes in a harness, and where it must never go

A harness keeps your key outside the conversation. It reads the key from an environment variable or from its own credential store at the moment it calls the provider. The key identifies your account, not each request, which is why it must never appear in a chat message, a committed file, a screenshot, or code that runs in a browser.

![A flow diagram: your app calls the harness, the harness reads the key from an environment variable or a secret store, sends it in an HTTPS request header, and the provider checks it against your account before the model answers. A second panel lists four places the key must never appear: a chat message, a committed file, a screenshot or log, and client-side code](/figures/harness-api-keys.svg)
*The key travels with the request but belongs to the account, and four places are permanently out of bounds.*

## Where does the key actually live?

In two places only: an environment variable that the process can read, or the harness's own credential store, which is a file on your machine.

Environment variables are the simplest form. In this harness a saved secret reaches the process as an environment variable named after the secret, and the harness reads it when it needs to call a provider. The credential store is the alternative, a file kept on disk rather than in your shell profile, which is why it can be backed up, permissions-restricted, and rotated in one place.

Either way, the key is a file or an environment, never a line in the conversation. That distinction is the whole article: the model never needs to see the key, and a harness that did put it in the prompt would be leaking it on every request.

## What does the key authenticate?

The account, not the request. The provider looks up the key, finds the account it belongs to, and applies that account's permissions and billing to whatever the request asks for.

Three consequences follow, and each one changes how you handle keys.

1. **One key is not one request.** A key used a thousand times is still one credential with one set of permissions. Revoking it breaks every caller that uses it, which is why you want separate keys per purpose rather than one key for everything.
2. **Spend limits belong to the account.** A leaked key spends your money at the provider's rate until you notice, not until the next request ends.
3. **The key does not say which tool asked.** The provider knows the account, not the script. So the audit trail starts with your own logs, not the provider's dashboard.

## Where must the key never go?

Four places, and they cover almost every real leak: a chat message, a committed file, a screenshot or log, and client-side code.

1. **A chat message.** Pasting a key into a conversation sends it to the model provider as part of the prompt, and the harness writes the conversation to disk. The key then lives in a transcript, possibly in backups, possibly in a ticket someone opens later.
2. **A committed file.** `.env` in a repository is the single most common leak. Even after deletion, the value sits in git history, and a public push is a permanent disclosure.
3. **A screenshot or a log.** Debug output that prints a whole request header, or a screenshot of a settings screen, carries the key without anyone intending it. Log redaction is a setting worth checking before you share output with a contractor.
4. **Client-side code.** Anything that reaches a browser is public. A key in front-end JavaScript, a mobile app, or a static page is available to anyone who opens developer tools, regardless of how it is obfuscated.

## What do I do when a key leaks?

Revoke first, then rotate, then investigate, in that order. Revoking is the only step that stops the spend.

1. **Revoke the key at the provider immediately.** Not delete the file, not change the password. Revoke the credential itself, because the file copy is not what the attacker uses.
2. **Issue a new key and update the one place it lives.** If it was in an environment variable, update the variable and restart the process. If it was in the credential store, replace it there.
3. **Check the provider's usage for the window between the leak and the revoke.** A key that was exposed for a week may have been used. The usage page, not the error log, tells you.
4. **Find out how it left.** Search your repository history, the transcript folder, and any shared documents. A leak with no identified cause will happen again.
5. **Narrow the new key.** If your provider supports scopes or spend limits, use them. A new key with the same broad permissions and no cap repeats the exposure.

The order matters more than the thoroughness. Teams that rotate first and revoke later usually keep paying for the same key.

**Read next**

[What an agent harness does with your request](https://upahje.my/en/articles/using-the-harness)

[More on buying and choosing tools](https://upahje.my/en/articles/category/buying-guides)
