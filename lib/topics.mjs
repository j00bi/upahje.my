import { readFileSync } from 'node:fs'
import path from 'node:path'
import { publishedArticles } from './articles.mjs'

/** Five reader-facing topics, mapped by translationKey. Data, not a database. */
const DATA = JSON.parse(readFileSync(path.join(process.cwd(), 'data', 'topics.json'), 'utf8'))

export const TOPICS = DATA.topics
export const TOPIC_MAPPING = DATA.mapping
export const GLOSSARY = DATA.glossary

export const topicBySlug = (slug) => TOPICS.find((t) => t.slug === slug)
export const topicLabel = (slug, lang) => {
  const t = topicBySlug(slug)
  return t ? (lang === 'ms' ? t.ms : t.en) : slug
}
export const topicBlurb = (slug, lang) => {
  const t = topicBySlug(slug)
  return t ? (lang === 'ms' ? t.blurbMs : t.blurbEn) : ''
}

/** Articles in a topic, primary or secondary, drafts excluded. */
export function articlesForTopic(lang, slug) {
  return publishedArticles(lang).filter((article) => {
    const map = TOPIC_MAPPING[article.translationKey]
    return Boolean(map) && (map.topic === slug || map.secondary === slug)
  })
}

export function topicCounts(lang) {
  return TOPICS.map((topic) => ({ ...topic, count: articlesForTopic(lang, topic.slug).length }))
    .filter((topic) => topic.count > 0)
}

export const isGlossaryEntry = (translationKey) => GLOSSARY.includes(translationKey)

export function glossaryArticles(lang) {
  return publishedArticles(lang).filter((a) => isGlossaryEntry(a.translationKey))
}

/** Related: same topic first, then a shared secondary, never the article itself. */
export function relatedFor(article, lang, limit = 4) {
  const map = TOPIC_MAPPING[article.translationKey]
  if (!map) return []
  const scored = publishedArticles(lang)
    .filter((a) => a.translationKey !== article.translationKey)
    .map((a) => {
      const other = TOPIC_MAPPING[a.translationKey]
      if (!other) return { a, score: 0 }
      let score = 0
      if (other.topic === map.topic) score += 2
      if (map.secondary && (other.topic === map.secondary || other.secondary === map.secondary)) score += 1
      if (map.secondary && other.topic === map.secondary) score += 1
      return { a, score }
    })
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score)
  return scored.slice(0, limit).map((x) => x.a)
}
