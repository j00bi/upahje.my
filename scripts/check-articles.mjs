#!/usr/bin/env node
/**
 * Validates article files with the same loader the site uses.
 *
 *   node scripts/check-articles.mjs             # content/articles
 *   node scripts/check-articles.mjs --fixtures  # content/fixtures/articles
 */
import fs from 'node:fs'
import path from 'node:path'
import { ARTICLES_ROOT, LANGUAGES, allArticles, publishedArticles, translatedArticle } from '../lib/articles.mjs'
import os from 'node:os'
import { MS_LINT_ALLOW, MS_LINT_WORDS } from '../tools/ms-lint-words.mjs'
import { PII_PATTERNS } from '../tools/pii-patterns.mjs'


/**
 * Malay register lint: catch Indonesian-leaning forms in ms copy. Runs over the
 * source files (not the rendered page) so the writer gets file:line and a
 * suggested replacement. Per-line escape: `<!-- ms-lint: allow -->`.
 */
function lintMalay() {
  const dir = path.join(ARTICLES_ROOT, 'ms')
  if (!fs.existsSync(dir)) return 0
  let hits = 0
  const files = fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('.md') || name.endsWith('.mdx'))
    .sort()

  for (const name of files) {
    const file = path.join(dir, name)
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/)
    lines.forEach((line, index) => {
      if (line.includes(MS_LINT_ALLOW)) return
      for (const entry of MS_LINT_WORDS) {
        const pattern = entry.pattern || new RegExp(`\\b${entry.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
        pattern.lastIndex = 0
        const match = pattern.exec(line)
        if (!match) continue
        if (entry.ignore && entry.ignore(line, match)) continue
        hits += 1
        const relative = path.relative(process.cwd(), file)
        console.error(`${relative}:${index + 1}: "${match[0]}" -> "${entry.suggest}"`)
      }
    })
  }

  if (hits) console.error(`[ms-lint] ${hits} Indonesian-leaning form(s) in ms copy`)
  else console.log(`ms register: clean (${files.length} file${files.length === 1 ? '' : 's'})`)
  return hits
}


/** First six characters only: a key, path or address is never echoed whole. */
function redact(value) {
  const text = value.trim()
  return `${text.slice(0, 6)}…`
}

/** Denylist file plus the local machine's own names, so they cannot leak. */
function piiDenylist() {
  const file = path.join(process.cwd(), 'tools', 'pii-denylist.txt')
  const names = new Set([os.hostname(), process.env.USER || ''].filter(Boolean))
  if (fs.existsSync(file)) {
    for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
      const value = line.trim()
      if (value && !value.startsWith('#')) names.add(value)
    }
  }
  return [...names].filter((name) => name.length >= 3)
}

/**
 * PII and secret gate over the article sources. Any hit is a failure: these
 * files are published, and a path, a session id or a key in prose is a leak even
 * when the source is private.
 */
function lintPii() {
  const denylist = piiDenylist()
  const denylistPattern = denylist.length
    ? new RegExp(`\\b(?:${denylist.map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'gi')
    : null
  let hits = 0
  const walk = (dir, pattern) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    return entry.isDirectory() ? walk(full, pattern) : pattern.test(entry.name) ? [full] : []
  })
  const files = [...walk(ARTICLES_ROOT, /\.(md|mdx)$/)]
  const figuresDir = path.join(process.cwd(), 'figures')
  if (fs.existsSync(figuresDir)) files.push(...walk(figuresDir, /\.mmd$/))

  for (const file of files.sort()) {
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/)
    lines.forEach((line, index) => {
      const report = (category, match, fix) => {
        hits += 1
        console.error(`${path.relative(process.cwd(), file)}:${index + 1}: ${category}, "${redact(match)}" -> ${fix}`)
      }
      for (const entry of PII_PATTERNS) {
        entry.pattern.lastIndex = 0
        for (const match of line.matchAll(entry.pattern)) report(entry.category, match[0], entry.fix)
      }
      if (denylistPattern) {
        denylistPattern.lastIndex = 0
        for (const match of line.matchAll(denylistPattern)) {
          report('denylisted-name', match[0], 'remove the local username or hostname')
        }
      }
    })
  }
  if (hits) console.error(`[pii] ${hits} personal or secret string(s) in article sources`)
  else console.log('pii: clean')
  return hits
}

let failed = 0
for (const language of LANGUAGES) {
  const all = allArticles(language.code)
  const published = publishedArticles(language.code)
  console.log(`${language.code}: ${published.length} published, ${all.length - published.length} draft`)
  for (const article of all) {
    const pair = translatedArticle(article)
    console.log(`  ${article.draft ? 'draft' : 'live '} ${article.slug} [${article.category}] ${article.wordCount}w ${pair ? `pair:${pair.lang}` : 'unpaired'}`)
  }
}

for (const language of LANGUAGES) {
  for (const article of publishedArticles(language.code)) {
    if (!article.description || !article.date || !article.author) {
      console.error(`[fail] ${language.code}/${article.slug}: missing required frontmatter`)
      failed++
    }
    if (article.date > new Date().toISOString().slice(0, 10)) {
      console.error(`[fail] ${language.code}/${article.slug}: date is in the future`)
      failed++
    }
  }
}

const malayHits = lintMalay()
const piiHits = lintPii()
console.log(`root: ${ARTICLES_ROOT}`)
process.exit(failed || malayHits || piiHits ? 1 : 0)
