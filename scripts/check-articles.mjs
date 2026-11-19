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
import { MS_LINT_ALLOW, MS_LINT_WORDS } from '../tools/ms-lint-words.mjs'


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
console.log(`root: ${ARTICLES_ROOT}`)
process.exit(failed || malayHits ? 1 : 0)
