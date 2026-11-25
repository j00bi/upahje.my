#!/usr/bin/env node
/**
 * Editorial review aid. Flags patterns that make the corpus read as generated.
 * It never fails the build on its own: run it, read the report, decide.
 *
 *   node scripts/editorial-check.mjs
 *   node scripts/editorial-check.mjs --strict   # exit 1 when a P0 pattern appears
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, basename } from 'node:path'

const ROOT = 'content/articles'
const strict = process.argv.includes('--strict')

// P0: phrases that are editorial apparatus leaking into prose.
const P0 = [
  'My opinion, stated once',
  'Pendapat saya, dinyatakan sekali',
  'The honest version is',
  'The honest answer is',
  'That is the honest limit',
  'The part worth remembering',
  'The smallest runnable version',
  '[VERIFY]',
  '[TODO]',
]

// P1: templated structure. A few are fine; many means the corpus is one shape.
const P1 = [
  'What to do this week',
  'Apa yang perlu dibuat minggu ini',
  'Try it yourself',
  'The lesson is not',
  'The real cost is',
  'The bite is',
  'The shape of the bill',
]

// P2: headline and description formula shapes.
const P2 = [
  'and not much else',
  'or nothing at all',
  'and nobody tells',
]

function walk(dir) {
  const out = []
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) out.push(...walk(p))
    else if (name.endsWith('.md') && name !== 'README.md') out.push(p)
  }
  return out
}

const files = walk(ROOT)
const hits = { p0: [], p1: [], p2: [], openings: new Map(), closings: new Map() }

for (const file of files) {
  const raw = readFileSync(file, 'utf8')
  const [front, ...rest] = raw.split(/^---$/m).slice(1)
  const body = rest.join('---')
  const meta = front || ''
  const lang = file.includes('/ms/') ? 'ms' : 'en'
  const slug = basename(file, '.md')

  for (const [level, list] of [['p0', P0], ['p1', P1], ['p2', P2]]) {
    for (const phrase of list) {
      if (body.includes(phrase) || meta.includes(phrase)) {
        hits[level].push({ file: `${lang}/${slug}`, phrase })
      }
    }
  }

  // First sentence of the first paragraph, normalised: repeated openings show up here.
  const para = body.split('\n').find((l) => l.trim() && !l.startsWith('#') && !l.startsWith('|') && !l.startsWith('-'))
  if (para) {
    const first = para.trim().split(/[.:?]/)[0].toLowerCase().split(' ').slice(0, 5).join(' ')
    const key = `${lang}: ${first}`
    hits.openings.set(key, (hits.openings.get(key) || 0) + 1)
  }

  // Headings used as section openers, per language.
  for (const h of body.match(/^## .+$/gm) || []) {
    const key = `${lang}: ${h.slice(3).trim()}`
    hits.closings.set(key, (hits.closings.get(key) || 0) + 1)
  }
}

const repeat = (map, min) => [...map.entries()].filter(([, n]) => n >= min).sort((a, b) => b[1] - a[1])

console.log(`editorial check: ${files.length} articles\n`)
for (const [level, label] of [['p0', 'P0 apparatus in prose'], ['p1', 'P1 templated phrasing'], ['p2', 'P2 headline formula']]) {
  const list = hits[level]
  console.log(`${label}: ${list.length}`)
  for (const h of list) console.log(`  ${h.file}  "${h.phrase}"`)
}

const dupHeadings = repeat(hits.closings, 4)
console.log(`\nsection headings used 4+ times: ${dupHeadings.length}`)
for (const [k, n] of dupHeadings.slice(0, 12)) console.log(`  ${n}x  ${k}`)

const dupOpenings = repeat(hits.openings, 3)
console.log(`\nopening phrases used 3+ times: ${dupOpenings.length}`)
for (const [k, n] of dupOpenings.slice(0, 12)) console.log(`  ${n}x  ${k}`)

console.log('\nThis is a review aid, not a gate. Fix what reads as a template and leave the rest.')
if (strict && hits.p0.length) process.exit(1)
