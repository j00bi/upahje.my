import { readFileSync } from 'node:fs'
import path from 'node:path'
import { publishedArticles } from './articles.mjs'

/** Pillars and type mapping are data, not a database (decision on main). */
const DATA = JSON.parse(readFileSync(path.join(process.cwd(), 'data', 'pillars.json'), 'utf8'))

export const PILLARS = DATA.pillars
export const ARTICLE_TYPES = DATA.types
export const MAPPING = DATA.mapping

export const visiblePillars = () => PILLARS.filter((pillar) => !pillar.hidden)
export const pillarBySlug = (slug) => PILLARS.find((pillar) => pillar.slug === slug)

export function mappingFor(article) {
  return MAPPING[article.translationKey] || null
}

/** A pillar's topic page is every article whose primary or secondary is it. */
export function articlesForPillar(lang, slug) {
  return publishedArticles(lang).filter((article) => {
    const map = MAPPING[article.translationKey]
    return Boolean(map) && (map.pillar === slug || map.secondary === slug)
  })
}

export function pillarCounts(lang) {
  return visiblePillars()
    .map((pillar) => ({ ...pillar, count: articlesForPillar(lang, pillar.slug).length }))
    .filter((pillar) => pillar.count > 0)
}
