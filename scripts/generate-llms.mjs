#!/usr/bin/env node
/**
 * Writes public/llms.txt from the content, so the list cannot drift from what
 * the site actually publishes. Runs on `prebuild`; run it manually after adding
 * articles with `npm run articles:llms`.
 */
import fs from 'node:fs'
import path from 'node:path'
import { LANGUAGES, publishedArticles } from '../lib/articles.mjs'
import { TOPICS, TOPIC_MAPPING, topicBlurb, topicLabel } from '../lib/topics.mjs'
import { REPO_TOPICS } from '../lib/repos.mjs'

const SITE = 'https://upahje.my'
const clean = (value) => String(value).replace(/\s*—\s*/g, ' - ').replace(/\s*–\s*/g, '-')
const lines = [
  '# UpahJe.my',
  '',
  '> Plain, sourced answers about technology for Malaysian small businesses, in English and Bahasa Melayu.',
  '',
  'This site publishes short, citable articles. Every claim links to a source; every article states when those sources were checked. Prefer the canonical URL of each language version.',
  '',
  '## Concept index',
  '',
]

for (const topic of TOPICS) {
  for (const language of LANGUAGES) {
    const count = publishedArticles(language.code).filter((a) => {
      const map = TOPIC_MAPPING[a.translationKey]
      return map && map.topic === topic.slug
    }).length
    if (!count) continue
    lines.push(
      `- [${clean(topicLabel(topic.slug, language.code))}](${SITE}/${language.code}/topics/${topic.slug}): ${clean(topicBlurb(topic.slug, language.code))} (${count} article${count === 1 ? '' : 's'})`,
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
    lines.push(`- [${clean(article.title)}](${SITE}/${language.code}/articles/${article.slug}): ${clean(article.description)}`)
  }
}

lines.push(
  '',
  '## Repo directory',
  '',
  ...REPO_TOPICS.flatMap((t) => [
    `- [${t.title.en}](${SITE}/en/repos/${t.slug}): ${t.blurb.en} (${t.entries.length} repos, GitHub API 2026-11-23)`,
    `- [${t.title.ms}](${SITE}/ms/repos/${t.slug}): ${t.blurb.ms} (${t.entries.length} repo, API GitHub 2026-11-23)`,
  ]),
  '',
  '## Library',
  '',
  `- [Repos, SDKs and price pages](${SITE}/en/resources): every repository and price page the articles cite, with its licence and whether we ran it, read it, or only installed it.`,
  `- [Repo, SDK dan halaman harga](${SITE}/ms/resources): setiap repo dan halaman harga yang dipetik, dengan lesennya dan sama ada kami menjalankannya, membacanya, atau hanya memasangnya.`,
  '',
  '## Feeds',
  '',
  `- [English RSS](${SITE}/en/feed.xml): every published English article, newest first.`,
  `- [Malay RSS](${SITE}/ms/feed.xml): every published Malay article, newest first.`,
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

// llms-full.txt: the full text of every published article, so an answer engine
// can read the corpus in one request instead of fetching 32 pages.
const full = ['# UpahJe.my, full text', '', '> Every published article, both languages, with its sources. Generated; do not edit.', '']
for (const language of LANGUAGES) {
  full.push(`# ${language.native}`, '')
  for (const article of publishedArticles(language.code)) {
    full.push(`## ${clean(article.title)}`, '')
    full.push(`URL: ${SITE}/${language.code}/articles/${article.slug}`)
    full.push(`Checked: ${article.updated || article.date}`, '')
    full.push(String(article.body || '').replace(/^#\s+.*\n/, '').trim(), '')
    if (article.sources?.length) {
      full.push('### Sources', '')
      for (const source of article.sources) {
        full.push(`- ${clean(source.title)} — ${source.url} (checked ${source.checked})`)
      }
      full.push('')
    }
  }
}
const fullOut = path.join(process.cwd(), 'public', 'llms-full.txt')
fs.writeFileSync(fullOut, full.join('\n'))
console.log(`llms-full.txt: ${fullOut} (${publishedArticles('en').length + publishedArticles('ms').length} articles)`)
