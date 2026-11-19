#!/usr/bin/env node
/**
 * Validates article files with the same loader the site uses.
 *
 *   node scripts/check-articles.mjs             # content/articles
 *   node scripts/check-articles.mjs --fixtures  # content/fixtures/articles
 */
import { ARTICLES_ROOT, LANGUAGES, allArticles, publishedArticles, translatedArticle } from '../lib/articles.mjs'

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

console.log(`root: ${ARTICLES_ROOT}`)
process.exit(failed ? 1 : 0)
