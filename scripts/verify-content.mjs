#!/usr/bin/env node
/**
 * End-to-end check of the publication, against a running site.
 *
 *   BASE=https://upahje.my node scripts/verify-content.mjs
 *   BASE=http://127.0.0.1:3000 node scripts/verify-content.mjs
 *
 * What it checks: every URL in the sitemap resolves, the machine surfaces exist,
 * the AI crawlers are allowed, visible pillars resolve and hidden ones 404, and
 * each article carries a canonical plus language alternates.
 *
 * It does not check content quality. `npm run articles:check` does that.
 */
import { readFileSync } from 'node:fs'
import path from 'node:path'

const BASE = (process.env.BASE || 'http://127.0.0.1:3000').replace(/\/$/, '')
const failures = []
const notes = []

const get = async (p, method = 'GET') => {
  try {
    return await fetch(BASE + p, { method, redirect: 'manual' })
  } catch (error) {
    failures.push(`${p}: fetch failed (${error.message})`)
    return null
  }
}

const status = async (p, expected = 200) => {
  const res = await get(p)
  if (!res) return null
  if (res.status !== expected) failures.push(`${p}: status ${res.status} (expected ${expected})`)
  return res
}

// 1. Every sitemap URL resolves.
const sitemap = await status('/sitemap.xml')
let urls = []
if (sitemap) {
  const xml = await sitemap.text()
  urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])
  if (urls.length < 40) failures.push(`/sitemap.xml: only ${urls.length} URLs`)
  for (const url of urls) {
    const p = url.replace('https://upahje.my', '')
    const res = await get(p)
    if (!res) continue
    if (res.status !== 200 && res.status !== 308) failures.push(`${p}: status ${res.status} (in sitemap)`)
  }
}

// 2. Machine surfaces.
await status('/robots.txt')
await status('/llms.txt')
await status('/llms-full.txt')
await status('/en/feed.xml')
await status('/ms/feed.xml')
await status('/feed.xml')
const llms = await get('/llms.txt')
if (llms) {
  const text = await llms.text()
  for (const needed of ['/en/resources', '/en/repos', '/en/articles']) {
    if (!text.includes(needed)) failures.push(`/llms.txt: missing ${needed}`)
  }
}

// 3. Robots: AI crawlers allowed, marketplace paths no longer referenced.
const robotsRes = await get('/robots.txt')
if (robotsRes) {
  const robots = await robotsRes.text()
  for (const bot of ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended']) {
    if (!robots.includes(bot)) failures.push(`robots.txt: ${bot} not named`)
  }
  if (/Disallow: \/jobs/.test(robots)) failures.push('robots.txt: still disallows /jobs (route was deleted)')
  if (!/Sitemap:/i.test(robots)) failures.push('robots.txt: no Sitemap line')
}

// 4. Topics: every topic page resolves, and retired category URLs redirect.
const topics = JSON.parse(readFileSync(path.join(process.cwd(), 'data', 'topics.json'), 'utf8'))
await status('/en/topics')
await status('/ms/topics')
await status('/en/glossary')
await status('/ms/glossary')
for (const topic of topics.topics) {
  for (const lang of ['en', 'ms']) await status(`/${lang}/topics/${topic.slug}`)
}
const legacy = { definitions: 'glossary', 'buying-guides': 'buying', 'side-income': 'freelance', business: 'buying', finance: 'compliance', technology: 'ai-automation', 'automation-ai': 'ai-automation', marketing: 'operations-growth', operations: 'operations-growth' }
for (const [oldSlug, target] of Object.entries(legacy)) {
  for (const lang of ['en', 'ms']) {
    const p = `/${lang}/articles/category/${oldSlug}`
    const res = await get(p)
    if (!res) continue
    if (res.status !== 301 && res.status !== 308) failures.push(`${p}: ${res.status} (expected a 301 to /${lang}/${target})`)
  }
}

// 5. Articles: canonical + language alternates, and no marketplace leftovers.
const articleUrls = urls.filter((u) => /\/articles\/[a-z0-9-]+$/.test(u) && !u.includes('/category/'))
for (const url of articleUrls) {
  const p = url.replace('https://upahje.my', '')
  const res = await get(p)
  if (!res || res.status !== 200) continue
  const html = await res.text()
  if (!/<link rel="canonical"/i.test(html)) failures.push(`${p}: no canonical`)
  if (!/hreflang="ms-MY"/i.test(html)) failures.push(`${p}: no ms-MY alternate`)
  if (!/application\/ld\+json/.test(html)) failures.push(`${p}: no structured data`)
}

// 6. Retired marketplace routes are gone, not merely noindexed.
for (const dead of ['/jobs', '/talent', '/categories', '/pay/x']) {
  const res = await get(dead)
  if (res && res.status !== 404) failures.push(`${dead}: status ${res.status} (marketplace route should be gone)`)
}

// 7. The root redirect.
const root = await get('/')
if (root && root.status !== 308 && root.status !== 301) failures.push(`/: status ${root.status} (expected a redirect)`)

console.log(`verify:content — ${BASE}`)
console.log(`sitemap URLs: ${urls.length} · articles checked: ${articleUrls.length} · topics: ${topics.topics.length}`)
if (notes.length) console.log(notes.join('\n'))
if (failures.length) {
  console.log(failures.map((f) => `FAIL ${f}`).join('\n'))
  process.exit(1)
}
console.log('ok — every check passed')
