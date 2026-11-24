#!/usr/bin/env node
/**
 * Corpus hygiene checks for CI (T11):
 *  - staleness: 90 days for regulatory pieces, 365 days otherwise
 *  - missing BM translation for a published EN pair (and vice versa)
 *  - dead source URLs: HEAD then GET, 10s timeout; 403/429 are "unverified"
 * Prints one line per problem and exits 1 when any hard problem exists.
 *   node scripts/check-staleness.mjs [--no-links]
 */
import { allArticles, languageCodes } from '../lib/articles.mjs'

const noLinks = process.argv.includes('--no-links')
const now = new Date()
const days = (date) => Math.floor((now - new Date(date)) / 86400000)
const failures = []
const unverified = []

const groups = new Map()
for (const lang of languageCodes) {
  for (const article of allArticles(lang)) {
    if (article.draft) continue
    if (!groups.has(article.translationKey)) groups.set(article.translationKey, {})
    groups.get(article.translationKey)[lang] = article
  }
}

for (const [key, pair] of [...groups].sort()) {
  const langs = Object.keys(pair)
  if (langs.length < languageCodes.length) {
    const missing = languageCodes.filter((l) => !langs.includes(l))
    failures.push(`translation-missing: ${key} has ${langs.join('+') || 'nothing'}, missing ${missing.join(', ')}`)
  }
  for (const lang of langs) {
    const article = pair[lang]
    const regulatory = article.regulatory === true || /regulatory|compliance|pematuhan/i.test(`${article.category} ${article.tags.join(' ')}`)
    const limit = regulatory ? 90 : 365
    const age = days(article.updated || article.date)
    if (age > limit) {
      failures.push(`stale: ${lang}/${article.slug} last dated ${article.updated || article.date} (${age} days, limit ${limit}${regulatory ? ', regulatory' : ''})`)
    }
  }
}

const urls = new Map()
for (const lang of languageCodes) {
  for (const article of allArticles(lang)) {
    if (article.draft) continue
    for (const source of article.sources) {
      if (!urls.has(source.url)) urls.set(source.url, [])
      urls.get(source.url).push(`${lang}/${article.slug}`)
    }
  }
}

async function checkUrl(url) {
  const attempt = async (method) => {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 10000)
    try {
      const response = await fetch(url, { method, redirect: 'follow', signal: controller.signal, headers: { 'user-agent': 'UpahJe.my link check (contact: editorial@upahje.my)' } })
      return response.status
    } catch (error) {
      return error.name === 'AbortError' ? 'timeout' : `error:${error.code || error.name}`
    } finally {
      clearTimeout(timer)
    }
  }
  let status = await attempt('HEAD')
  if (typeof status === 'string' || status >= 400) status = await attempt('GET')
  return status
}

if (!noLinks) {
  const entries = [...urls.entries()]
  const concurrency = 8
  let cursor = 0
  async function worker() {
    while (cursor < entries.length) {
      const [url, citedBy] = entries[cursor++]
      const status = await checkUrl(url)
      if (status === 403 || status === 429) unverified.push(`unverified (${status}): ${url} cited by ${citedBy.join(', ')}`)
      else if (typeof status !== 'number' || status >= 400) failures.push(`dead-link (${status}): ${url} cited by ${citedBy.join(', ')}`)
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker))
}

for (const line of failures) console.error(line)
for (const line of unverified) console.log(line)
console.log(`\nstaleness: ${failures.length} problem(s), ${unverified.length} unverified source URL(s), ${groups.size} published pair(s) checked`)
if (failures.length) process.exit(1)
