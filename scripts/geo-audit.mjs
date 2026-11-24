#!/usr/bin/env node
/**
 * GEO / AI-search audit for the live site.
 *
 * Built from what the open-source SEO skill packs actually check before they
 * score a page: crawler access, llms.txt, structured data, citation density,
 * an answer near the top, and a canonical + hreflang pair. No vendor keys.
 *
 *   BASE=https://upahje.my node scripts/geo-audit.mjs [--sample=6]
 */
const BASE = (process.env.BASE || 'https://upahje.my').replace(/\/$/, '')
const sampleArg = process.argv.find((arg) => arg.startsWith('--sample='))
const SAMPLE = sampleArg ? Number(sampleArg.split('=')[1]) : 6

const results = []
const record = (scope, check, ok, detail = '') => results.push({ scope, check, ok, detail })

async function text(path) {
  const res = await fetch(BASE + path)
  return { status: res.status, body: await res.text() }
}

// 1. Site-level: crawler access and machine-readable entry points.
const robots = await text('/robots.txt')
record('site', 'robots.txt answers 200', robots.status === 200, `HTTP ${robots.status}`)
for (const bot of ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended']) {
  record('site', `robots names ${bot}`, robots.body.includes(bot))
}
record('site', 'review routes disallowed', robots.body.includes('/review'))

const llms = await text('/llms.txt')
record('site', 'llms.txt answers 200', llms.status === 200, `HTTP ${llms.status}`)
const llmsLinks = (llms.body.match(/https:\/\/upahje\.my/g) || []).length
record('site', 'llms.txt lists articles', llmsLinks > 20, `${llmsLinks} links`)

const llmsFull = await text('/llms-full.txt')
record('site', 'llms-full.txt answers 200', llmsFull.status === 200, `${Math.round(llmsFull.body.length / 1024)} KB`)

for (const feed of ['/en/feed.xml', '/ms/feed.xml']) {
  const res = await text(feed)
  record('site', `${feed} answers 200`, res.status === 200, `HTTP ${res.status}`)
}

const sitemap = await text('/sitemap.xml')
const sitemapUrls = (sitemap.body.match(/<loc>/g) || []).length
record('site', 'sitemap answers 200', sitemap.status === 200, `${sitemapUrls} URLs`)

// 2. Page-level: pick articles from the sitemap itself, so the audit follows the site.
const urls = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((match) => new URL(match[1]).pathname)
  .filter((path) => /\/articles\/[a-z0-9-]+$/.test(path))
const sample = urls.slice(0, SAMPLE)

for (const path of sample) {
  const page = await text(path)
  const body = page.body
  const types = [...body.matchAll(/"@type":"([A-Za-z]+)"/g)].map((m) => m[1])
  const has = (type) => types.includes(type)
  const citations = (body.match(/"citation":/g) || []).length

  record(path, 'answers 200', page.status === 200, `HTTP ${page.status}`)
  record(path, 'canonical present', /rel="canonical"/.test(body))
  record(path, 'hreflang pair present', /hreflang="ms-MY"/i.test(body) && /hreflang="en-MY"/i.test(body))
  record(path, 'Article schema', has('Article'))
  record(path, 'BreadcrumbList schema', has('BreadcrumbList'))
  const hasFaqSection = /id="faq"|>FAQ<|Soalan lazim/i.test(body)
  record(path, hasFaqSection ? 'FAQPage schema (page has an FAQ)' : 'FAQPage schema (no FAQ, not required)', !hasFaqSection || has('FAQPage'))
  record(path, 'citations in schema', citations > 0, `${citations}`)
  record(path, 'answer near the top', /Short answer|Jawapan ringkas/i.test(body))
}

// 3. Report.
const pass = results.filter((r) => r.ok).length
const byScope = new Map()
for (const r of results) {
  if (!byScope.has(r.scope)) byScope.set(r.scope, [])
  byScope.get(r.scope).push(r)
}
console.log(`GEO audit — ${BASE}`)
console.log(`${pass}/${results.length} checks passed\n`)
for (const [scope, checks] of byScope) {
  const failed = checks.filter((c) => !c.ok)
  console.log(`${failed.length ? '✗' : '✓'} ${scope}  (${checks.length - failed.length}/${checks.length})`)
  for (const f of failed) console.log(`    ✗ ${f.check}${f.detail ? ` — ${f.detail}` : ''}`)
}
if (pass !== results.length) {
  console.log(`\n${results.length - pass} check(s) failed.`)
  process.exit(1)
}
console.log('\nevery check passed')
