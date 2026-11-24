#!/usr/bin/env node
/**
 * Content schema gate.
 *
 *   node content/schema.mjs                 baseline mode (default): fail on any
 *                                           violation not listed in schema-baseline
 *   node content/schema.mjs --strict        fail on every violation
 *   STRICT_SCHEMA=1 node content/schema.mjs same as --strict
 *   node content/schema.mjs --write-baseline regenerate the baseline file
 *
 * Field names are the corpus's own: date, checked, canonical, translationKey.
 * No zod: the rules are straight-line checks, so no dependency is added.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { parseFrontmatter } from '../lib/articles.mjs'

const ROOT = path.join(process.cwd(), 'content', 'articles')
const BASELINE_PATH = path.join(process.cwd(), 'content', 'schema-baseline.json')
const strict = process.argv.includes('--strict') || process.env.STRICT_SCHEMA === '1'
const writeBaseline = process.argv.includes('--write-baseline')

const DATE = /^\d{4}-\d{2}-\d{2}$/
const violation = (file, field, rule, actual, expected) => ({
  file, field, rule,
  message: `${file}: ${field} = ${actual}; expected ${expected}`,
})

function length(value) {
  return typeof value === 'string' ? value.length : 0
}

function readFiles() {
  const files = []
  for (const lang of readdirSync(ROOT)) {
    if (lang !== 'en' && lang !== 'ms') continue
    for (const name of readdirSync(path.join(ROOT, lang))) {
      if (name.endsWith('.md')) files.push({ lang, file: `${lang}/${name}`, full: path.join(ROOT, lang, name) })
    }
  }
  return files.sort((a, b) => a.file.localeCompare(b.file))
}

const files = readFiles()
const violations = []
const keysByLang = new Map()

for (const { lang, file, full } of files) {
  const raw = readFileSync(full, 'utf8')
  let data
  try {
    ;({ data } = parseFrontmatter(raw, file))
  } catch (error) {
    violations.push(violation(file, 'frontmatter', 'parse', 'unparseable', '--- frontmatter ---'))
    continue
  }

  for (const field of ['title', 'description', 'slug', 'translationKey', 'date', 'canonical', 'author']) {
    if (typeof data[field] !== 'string' || !data[field].trim()) {
      violations.push(violation(file, field, 'required', data[field] === undefined ? 'missing' : JSON.stringify(data[field]), 'a non-empty string'))
    }
  }

  if (typeof data.title === 'string' && data.title.length > 60) {
    violations.push(violation(file, 'title', 'title-length', `${length(data.title)} chars`, 'at most 60'))
  }
  if (typeof data.description === 'string' && (data.description.length < 110 || data.description.length > 160)) {
    violations.push(violation(file, 'description', 'description-length', `${length(data.description)} chars`, '110 to 160'))
  }

  const perspective = data.format === 'perspective' || data.opinion === true
  const sources = Array.isArray(data.sources) ? data.sources.filter((s) => s && typeof s === 'object') : []
  if (!perspective && data.draft !== true && sources.length < 2) {
    violations.push(violation(file, 'sources', 'sources-minimum', `${sources.length} entries`, 'at least 2 (or format: perspective / opinion: true, or draft: true)'))
  }
  sources.forEach((source, index) => {
    const where = `sources[${index}]`
    if (!source.title) violations.push(violation(file, where, 'source-title', 'missing', 'a non-empty title'))
    if (typeof source.url !== 'string' || !/^https?:\/\//.test(source.url)) {
      violations.push(violation(file, `${where}.url`, 'source-url', JSON.stringify(source.url ?? 'missing'), 'an http(s) URL'))
    }
    if (typeof source.checked !== 'string' || !DATE.test(source.checked)) {
      violations.push(violation(file, `${where}.checked`, 'source-checked', JSON.stringify(source.checked ?? 'missing'), 'a YYYY-MM-DD date'))
    }
  })

  if (data.regulatory === true && !sources.some((s) => s.primary === true)) {
    violations.push(violation(file, 'sources', 'regulatory-primary', 'no primary source', 'at least one source with primary: true'))
  }

  const changelog = Array.isArray(data.changelog) ? data.changelog : []
  if (!changelog.length) {
    violations.push(violation(file, 'changelog', 'changelog-required', 'missing', 'at least one { date, note } entry'))
  }
  changelog.forEach((entry, index) => {
    if (!entry || typeof entry.date !== 'string' || !DATE.test(entry.date)) {
      violations.push(violation(file, `changelog[${index}].date`, 'changelog-date', JSON.stringify(entry?.date ?? 'missing'), 'a YYYY-MM-DD date'))
    }
    if (!entry || typeof entry.note !== 'string' || !entry.note.trim()) {
      violations.push(violation(file, `changelog[${index}].note`, 'changelog-note', 'missing', 'a non-empty note'))
    }
  })

  if (typeof data.canonical === 'string' && typeof data.slug === 'string') {
    const derived = `https://upahje.my/${lang}/articles/${data.slug}`
    if (data.canonical !== derived) {
      violations.push(violation(file, 'canonical', 'canonical-route', data.canonical, derived))
    }
  }

  if (typeof data.translationKey === 'string') {
    const seen = keysByLang.get(lang) || new Map()
    if (seen.has(data.translationKey)) {
      violations.push(violation(file, 'translationKey', 'translationKey-duplicate', data.translationKey, `unique in ${lang} (also in ${seen.get(data.translationKey)})`))
    } else {
      seen.set(data.translationKey, file)
    }
    keysByLang.set(lang, seen)
  }
}

const keyOf = (v) => `${v.file}::${v.field}`
const sorted = violations.slice().sort((a, b) => keyOf(a).localeCompare(keyOf(b)) || a.rule.localeCompare(b.rule))

if (writeBaseline) {
  const unique = [...new Set(sorted.map(keyOf))].sort()
  writeFileSync(BASELINE_PATH, JSON.stringify({ generatedFrom: files.length + ' files', entries: unique }, null, 2) + '\n')
  console.log(`schema: baseline written with ${unique.length} known file+field entries from ${files.length} files`)
  process.exit(0)
}

if (strict) {
  const byRule = new Map()
  for (const v of sorted) byRule.set(v.rule, (byRule.get(v.rule) || 0) + 1)
  console.log(`schema: strict mode, ${files.length} files, ${sorted.length} violation(s)`)
  for (const [rule, count] of [...byRule].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))) {
    console.log(`  ${rule}: ${count}`)
  }
  for (const v of sorted) console.error(v.message)
  process.exit(sorted.length ? 1 : 0)
}

let baseline = { entries: [] }
try {
  baseline = JSON.parse(readFileSync(BASELINE_PATH, 'utf8'))
} catch {
  console.error('schema: content/schema-baseline.json is missing; run node content/schema.mjs --write-baseline')
  process.exit(1)
}
const known = new Set(baseline.entries || [])
const fresh = sorted.filter((v) => !known.has(keyOf(v)))

if (fresh.length) {
  console.error(`schema: ${fresh.length} new violation(s) not in the baseline`)
  for (const v of fresh) console.error(v.message)
  process.exit(1)
}

console.log(`schema: ok, ${sorted.length} known violation(s), run \`npm run schema:strict\` to see them`)
