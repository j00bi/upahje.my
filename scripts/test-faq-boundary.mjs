#!/usr/bin/env node
/**
 * Regression test for the FAQ boundary, end to end.
 *
 *   node scripts/test-faq-boundary.mjs
 *
 * Builds a fixture article with `## FAQ`, then `---`, then a read-next block, and
 * asserts from the server-rendered HTML that:
 *   a) the read-next anchor exists and is outside the FAQ;
 *   b) the FAQPage question count equals the number of `###` entries in source;
 *   c) no FAQ answer swallowed the rule or the read-next text.
 * The two halves of the bug (dead links, corrupted schema) are both covered.
 * Also checks the figure branch: <figure><img> with intrinsic dimensions.
 */
import { execFileSync, spawn } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'faq-boundary-'))
const port = 3299
const failures = []

const fixture = `---
title: "FAQ boundary fixture"
description: "Proves the read-next block stays outside the FAQ and FAQPage matches the source."
slug: faq-boundary
translationKey: faq-boundary
date: 2026-11-19
updated: 2026-11-19
author: "Fixtures"
category: definitions
tags: [fixture]
canonical: https://upahje.my/en/articles/faq-boundary
draft: false
---

# FAQ boundary fixture

A short opening paragraph that gives the page a short answer block and enough words to read.

## FAQ

### First question?

First answer.

### Second question?

Second answer.

### Third question?

Third answer.

---

**Read next**

[definitions](/en/articles/category/definitions)

![Where the API key sits](/figures/api-key-flow.svg)
*The key travels from the harness to the provider.*
`

function run(command, args, env = {}) {
  return execFileSync(command, args, { cwd: ROOT, env: { ...process.env, ...env }, stdio: 'pipe', encoding: 'utf8' })
}

try {
  const articles = path.join(tmp, 'content', 'articles', 'en')
  fs.mkdirSync(articles, { recursive: true })
  fs.writeFileSync(path.join(articles, 'faq-boundary.md'), fixture)
  const sourceQuestions = (fixture.match(/^### /gm) || []).length

  run('npx', ['next', 'build'], { ARTICLES_ROOT: path.join(tmp, 'content', 'articles'), NODE_ENV: 'production' })
  const server = spawn('npx', ['next', 'start', '-p', String(port)], {
    cwd: ROOT,
    env: { ...process.env, NODE_ENV: 'production', ARTICLES_ROOT: path.join(tmp, 'content', 'articles') },
    stdio: 'pipe',
  })
  const started = Date.now()
  let html = ''
  while (Date.now() - started < 30000) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/en/articles/faq-boundary`)
      if (res.status === 200) { html = await res.text(); break }
    } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 300))
  }
  server.kill('SIGTERM')
  if (!html) throw new Error('fixture page did not serve')

  const faqScript = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
    .map((m) => JSON.parse(m[1]))
    .find((d) => d['@type'] === 'FAQPage')
  const questions = faqScript?.mainEntity?.length ?? 0
  const answers = (faqScript?.mainEntity ?? []).map((q) => q.acceptedAnswer.text).join(' ')
  const readNext = /<a[^>]*href="\/en\/articles\/category\/definitions"[^>]*>definitions<\/a>/.test(html)
  const figure = /<figure[^>]*>[\s\S]*?<img[^>]*src="\/figures\/api-key-flow\.svg"[^>]*>/.test(html)
  const dimensions = /<img[^>]*src="\/figures\/api-key-flow\.svg"[^>]*width="1080"[^>]*height="620"/.test(html)
  const caption = /<figcaption[^>]*>The key travels from the harness to the provider\.<\/figcaption>/.test(html)

  if (!readNext) failures.push('read-next anchor missing from server HTML')
  if (questions !== sourceQuestions) failures.push(`FAQPage questions ${questions} != source ### count ${sourceQuestions}`)
  if (/Read next|Where the API key sits/.test(answers)) failures.push('FAQ answer swallowed the read-next text')
  if (/\u2014|\u2013/.test(answers)) failures.push('FAQ answer contains an em/en dash')
  if (!figure) failures.push('figure/img for the SVG missing')
  if (!dimensions) failures.push('img lacks intrinsic width/height')
  if (!caption) failures.push('figcaption missing from the italic line')

  console.log(JSON.stringify({ sourceQuestions, questions, readNext, figure, dimensions, caption, failures }, null, 1))
  process.exit(failures.length ? 1 : 0)
} finally {
  fs.rmSync(tmp, { recursive: true, force: true })
}
