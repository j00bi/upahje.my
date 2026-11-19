#!/usr/bin/env node
/**
 * Content-surface sweep with the status code first.
 *
 *   BASE=https://… node scripts/verify-content.mjs
 *
 * Every count this prints belongs to a 200. A non-200 is a failure, not a pass,
 * and article URLs are discovered from the indexes and the sitemap instead of a
 * hand-written list, so a renamed slug cannot go unnoticed.
 */
const BASE = process.env.BASE || 'http://127.0.0.1:3000'
const digits = (s) => (s.match(/[\u2014\u2013]/g) || []).length
const rows = []
const seen = new Set()
const failures = []

async function get(path) {
  const res = await fetch(BASE + path, { redirect: 'manual' })
  const text = res.status >= 200 && res.status < 300 ? await res.text() : ''
  return { path, status: res.status, location: res.headers.get('location') || '', text, dashes: digits(text) }
}

function record(path, res, extra = '') {
  if (seen.has(path)) return
  seen.add(path)
  rows.push({ path, status: res.status, dashes: res.dashes, extra })
  if (res.status < 200 || res.status >= 300) failures.push(`${path}: status ${res.status}`)
  else if (res.dashes > 0) failures.push(`${path}: ${res.dashes} em/en dash(es)`)
}

// root: 308 to /en
const root = await get('/')
rows.push({ path: '/', status: root.status, dashes: root.dashes, extra: `-> ${root.location}` })
if (![301, 307, 308].includes(root.status) || !root.location.endsWith('/en')) {
  failures.push(`/: expected 3xx to /en, got ${root.status} ${root.location}`)
}

// fixed surface
for (const path of ['/en', '/ms', '/en/articles', '/ms/articles', '/sitemap.xml', '/robots.txt', '/llms.txt']) {
  record(path, await get(path))
}
const sitemap = (await get('/sitemap.xml')).text
const robots = (await get('/robots.txt')).text
const llms = (await get('/llms.txt')).text

// every path the sitemap advertises gets a status and a dash count
const sitemapPaths = [...sitemap.matchAll(/<loc>https:\/\/upahje\.my(\/[^<]+)<\/loc>/g)].map((m) => m[1])
for (const path of sitemapPaths) {
  if (!['/en', '/ms', '/en/articles', '/ms/articles'].includes(path)) record(path, await get(path))
}

// discover article paths from the indexes and the sitemap
const articlePaths = new Set()
for (const prefix of ['/en', '/ms']) {
  const index = (await get(`${prefix}/articles`)).text
  for (const match of index.matchAll(new RegExp(`href="${prefix}/articles/([a-z0-9-]+)"`, 'g'))) {
    if (!['category', 'page', 'feed.xml'].includes(match[1])) articlePaths.add(`${prefix}/articles/${match[1]}`)
  }
}
for (const match of sitemap.matchAll(/<loc>https:\/\/upahje\.my(\/[^<]+)<\/loc>/g)) {
  if (/^\/(en|ms)\/articles\/[a-z0-9-]+$/.test(match[1])) articlePaths.add(match[1])
}
for (const path of [...articlePaths].sort()) {
  const res = await get(path)
  const extra = []
  if (res.status === 200) {
    if (!res.text.includes('"@type":"Article"')) extra.push('no Article JSON-LD')
    if (!res.text.includes('"@type":"FAQPage"')) extra.push('no FAQPage JSON-LD')
  }
  record(path, res, extra.join(', '))
  if (extra.length) failures.push(`${path}: ${extra.join(', ')}`)
}

// sitemap / robots / llms contracts
const marketplace = /<loc>https:\/\/upahje\.my\/(jobs|talent|categories|portfolio|pay|payment|ai|onboarding|auth|dashboard)/
if (marketplace.test(sitemap)) failures.push('sitemap: marketplace URL present')
for (const path of articlePaths) {
  if (!sitemap.includes(`<loc>https://upahje.my${path}</loc>`)) failures.push(`sitemap: ${path} missing`)
  if (!llms.includes(path)) failures.push(`llms.txt: ${path} missing`)
}
for (const bot of ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended']) {
  if (!robots.includes(bot)) failures.push(`robots.txt: ${bot} not allowed`)
}
if (!/Disallow: \/jobs/.test(robots)) failures.push('robots.txt: /jobs not disallowed')

// marketplace header
const jobs = await fetch(`${BASE}/jobs`, { method: 'HEAD' })
const tag = jobs.headers.get('x-robots-tag') || ''
if (!/noindex/i.test(tag)) failures.push(`/jobs: x-robots-tag "${tag}" (expected noindex)`)

const pad = (v, n) => String(v).padEnd(n)
console.log(`${pad('path', 62)} ${pad('status', 6)} ${pad('dashes', 7)} note`)
for (const row of rows) console.log(`${pad(row.path, 62)} ${pad(row.status, 6)} ${pad(row.dashes, 7)} ${row.extra}`)
console.log(`\n${rows.length} URLs, ${articlePaths.size} article pages, ${failures.length} failure(s)`)
for (const failure of failures) console.error(`FAIL ${failure}`)
process.exit(failures.length ? 1 : 0)
