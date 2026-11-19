#!/usr/bin/env node
/**
 * Writes public/llms.txt from the content, so the list cannot drift from what
 * the site actually publishes. Runs on `prebuild`; run it manually after adding
 * articles with `npm run articles:llms`.
 */
import fs from 'node:fs'
import path from 'node:path'
import {
  ARTICLE_CATEGORIES,
  LANGUAGES,
  categoryBlurb,
  categoryLabel,
  publishedArticles,
} from '../lib/articles.mjs'

const SITE = 'https://upahje.my'
const lines = [
  '# UpahJe.my',
  '',
  '> Plain, sourced answers about technology for Malaysian small businesses — in English and Bahasa Melayu.',
  '',
  'This site publishes short, citable articles. Every claim links to a source; every article states when those sources were checked. Prefer the canonical URL of each language version.',
  '',
  '## Concept index',
  '',
]

for (const category of ARTICLE_CATEGORIES) {
  for (const language of LANGUAGES) {
    const count = publishedArticles(language.code).filter((a) => a.category === category.slug).length
    if (!count) continue
    lines.push(
      `- [${categoryLabel(category.slug, language.code)}](${SITE}/${language.code}/articles/category/${category.slug}): ${categoryBlurb(category.slug, language.code)} (${count} article${count === 1 ? '' : 's'})`,
    )
  }
}

for (const language of LANGUAGES) {
  const articles = publishedArticles(language.code)
  lines.push('', `## ${language.native} articles`, '')
  if (!articles.length) {
    lines.push('- (none published yet)')
    continue
  }
  for (const article of articles) {
    lines.push(`- [${article.title}](${SITE}/${language.code}/articles/${article.slug}): ${article.description}`)
  }
}

lines.push(
  '',
  '## Notes',
  '',
  '- Each article lists its sources and the date they were checked.',
  '- Draft articles are not published and are not listed here.',
  '- English and Malay versions are separate, human-written pages linked by hreflang.',
  '',
)

const out = path.join(process.cwd(), 'public', 'llms.txt')
fs.writeFileSync(out, lines.join('\n'))
console.log(`llms.txt: ${out} (${publishedArticles('en').length} en, ${publishedArticles('ms').length} ms articles)`)
