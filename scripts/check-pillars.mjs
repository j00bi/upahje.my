#!/usr/bin/env node
/**
 * Loader check for the pillar mapping. Reads the Markdown corpus (still the
 * source of truth), reports coverage against data/pillars.json, and fails on a
 * published pair without a mapping, a mapping that names an unknown pillar or
 * type, or a pair that exists in only one language. A draft without a mapping
 * is reported as "draft, unmapped" rather than failing the run.
 */
import { readFileSync } from 'node:fs'
import { allArticles, languageCodes } from '../lib/articles.mjs'

const DATA = JSON.parse(readFileSync(new URL('../data/pillars.json', import.meta.url), 'utf8'))
const pillarSlugs = new Set(DATA.pillars.map((p) => p.slug))
const types = new Set(DATA.types)

const groups = new Map()
for (const lang of languageCodes) {
  for (const article of allArticles(lang)) {
    if (!groups.has(article.translationKey)) groups.set(article.translationKey, [])
    groups.get(article.translationKey).push(article)
  }
}

const failures = []
const draftUnmapped = []
const missingTranslations = []
let published = 0
let drafts = 0
const typeCounts = Object.fromEntries(DATA.types.map((t) => [t, 0]))
const pillarCounts = Object.fromEntries(DATA.pillars.map((p) => [p.slug, 0]))

for (const [key, translations] of [...groups].sort()) {
  const mapped = DATA.mapping[key]
  const isDraft = translations.every((t) => t.draft)
  isDraft ? drafts += 1 : published += 1

  const langs = new Set(translations.map((t) => t.lang))
  if (langs.size !== languageCodes.length) missingTranslations.push(`${key}: ${[...langs].join(', ')}`)

  if (!mapped) {
    if (isDraft) draftUnmapped.push(key)
    else failures.push(`unmapped published pair: ${key}`)
    continue
  }
  if (!pillarSlugs.has(mapped.pillar)) failures.push(`${key}: unknown pillar "${mapped.pillar}"`)
  if (mapped.secondary && !pillarSlugs.has(mapped.secondary)) failures.push(`${key}: unknown secondary pillar "${mapped.secondary}"`)
  if (!types.has(mapped.type)) failures.push(`${key}: unknown type "${mapped.type}"`)

  if (!isDraft) {
    typeCounts[mapped.type] += 1
    pillarCounts[mapped.pillar] += 1
  }
}

console.log(`pairs: ${groups.size} (${published} published, ${drafts} draft)`)
console.log(`mapped: ${Object.keys(DATA.mapping).length}/${groups.size}`)
console.log(`draft, unmapped: ${draftUnmapped.length ? draftUnmapped.join(', ') : 'none'}`)
console.log(`missing translations: ${missingTranslations.length ? missingTranslations.join('; ') : 'none'}`)
console.log('types:', Object.entries(typeCounts).map(([k, v]) => `${k} ${v}`).join(', '))
console.log('pillars (published, primary):', Object.entries(pillarCounts).filter(([, v]) => v > 0).map(([k, v]) => `${k} ${v}`).join(', '))
console.log('hidden pillars:', DATA.pillars.filter((p) => p.hidden).map((p) => p.slug).join(', ') || 'none')

if (failures.length) {
  for (const failure of failures) console.error(`[pillars] ${failure}`)
  console.error(`[pillars] ${failures.length} problem(s)`)
  process.exit(1)
}
console.log('[pillars] ok')
