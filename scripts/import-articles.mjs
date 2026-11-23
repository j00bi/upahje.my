#!/usr/bin/env node
/**
 * Import markdown (git, the source of truth) into the editorial tables.
 * One-way and idempotent: re-running it reports the same counts.
 *
 *   DATABASE_URL=... node scripts/import-articles.mjs [--dry-run]
 *
 * It fails loudly on an article whose translationKey has no pillar mapping:
 * defaulting to Technology would hide a content decision behind a template.
 */
import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'node:fs'
import { allArticles, languageCodes } from '../lib/articles.mjs'

const { pillars, mapping } = JSON.parse(readFileSync(new URL('../data/pillars.json', import.meta.url), 'utf8'))
const dryRun = process.argv.includes('--dry-run')
const prisma = new PrismaClient()

const BLOCK_START = /^(#{1,6}\s|```|>|\||!\[|-{3,}|\*{3,})/
const LIST_START = /^(\s*[-*]\s+|\s*\d+\.\s+)/

/** Prose blocks only: headings, lists, tables, code, quotes, figures, rules excluded. */
function countParagraphs(body) {
  let count = 0
  let inBlock = false
  for (const line of body.split(/\r?\n/)) {
    const text = line.trim()
    if (!text) { inBlock = false; continue }
    if (BLOCK_START.test(text) || LIST_START.test(text)) { inBlock = false; continue }
    if (!inBlock) { count += 1; inBlock = true }
  }
  return count
}

function extractFigures(body) {
  const lines = body.split(/\r?\n/)
  const figures = []
  for (let i = 0; i < lines.length; i += 1) {
    const match = lines[i].trim().match(/^!\[([^\]]*)\]\((\S+?)\)\s*$/)
    if (!match) continue
    const captionLine = lines[i + 1]?.trim().match(/^\*([^*]+)\*$/)
    figures.push({ src: match[2], alt: match[1], caption: captionLine ? captionLine[1] : null })
    if (captionLine) i += 1
  }
  return figures
}

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

async function pillarIds() {
  const rows = await prisma.editorialCategory.findMany()
  return new Map(rows.map((row) => [row.slug, row.id]))
}

async function main() {
  if (dryRun) {
    const stats = languageCodes.map((lang) => {
      const articles = allArticles(lang)
      return { lang, articles: articles.length, paragraphs: articles.reduce((n, a) => n + countParagraphs(a.body), 0), sources: articles.reduce((n, a) => n + a.sources.length, 0), figures: articles.reduce((n, a) => n + extractFigures(a.body).length, 0) }
    })
    console.table(stats)
    return
  }

  const ids = await pillarIds()
  if (ids.size !== pillars.length) throw new Error(`expected ${pillars.length} pillar rows, found ${ids.size}; run prisma/seed-editorial.mjs first`)

  const groups = new Map()
  for (const lang of languageCodes) {
    for (const article of allArticles(lang)) {
      if (!groups.has(article.translationKey)) groups.set(article.translationKey, [])
      groups.get(article.translationKey).push(article)
    }
  }

  const unassigned = []
  let articlesWritten = 0

  for (const [key, translations] of groups) {
    const map = mapping[key]
    if (!map) { unassigned.push(key); continue }
    const primary = ids.get(map.pillar)
    const secondary = map.secondary ? ids.get(map.secondary) : null
    if (!primary) throw new Error(`${key}: pillar "${map.pillar}" is not seeded`)
    if (map.secondary && !secondary) throw new Error(`${key}: secondary pillar "${map.secondary}" is not seeded`)

    const primaryTranslation = translations.find((t) => t.lang === 'en') || translations[0]
    const authorSlug = slugify(primaryTranslation.author)
    const author = await prisma.author.upsert({
      where: { slug: authorSlug },
      create: { slug: authorSlug, name: primaryTranslation.author },
      update: { name: primaryTranslation.author },
    })

    const article = await prisma.article.upsert({
      where: { translationKey: key },
      create: {
        translationKey: key,
        type: map.type,
        primaryCategoryId: primary,
        secondaryCategoryId: secondary,
        authorId: author.id,
        publishedAt: new Date(primaryTranslation.date),
        updatedAt: primaryTranslation.updated ? new Date(primaryTranslation.updated) : null,
        draft: primaryTranslation.draft,
      },
      update: {
        type: map.type,
        primaryCategoryId: primary,
        secondaryCategoryId: secondary,
        authorId: author.id,
        publishedAt: new Date(primaryTranslation.date),
        updatedAt: primaryTranslation.updated ? new Date(primaryTranslation.updated) : null,
        draft: primaryTranslation.draft,
      },
    })

    for (const translation of translations) {
      const data = {
        slug: translation.slug,
        title: translation.title,
        description: translation.description,
        bodyMarkdown: translation.body,
        paragraphCount: countParagraphs(translation.body),
        readingMinutes: translation.readingTime,
        canonicalUrl: translation.canonical ?? null,
      }
      const row = await prisma.articleTranslation.upsert({
        where: { articleId_lang: { articleId: article.id, lang: translation.lang } },
        create: { articleId: article.id, lang: translation.lang, ...data },
        update: data,
      })

      await prisma.articleSource.deleteMany({ where: { translationId: row.id } })
      if (translation.sources.length) {
        await prisma.articleSource.createMany({
          data: translation.sources.map((source, index) => ({
            translationId: row.id,
            position: index,
            title: source.title,
            url: source.url,
            checkedAt: source.checked ? new Date(source.checked) : null,
          })),
        })
      }

      const figures = extractFigures(translation.body)
      await prisma.articleFigure.deleteMany({ where: { translationId: row.id } })
      if (figures.length) {
        await prisma.articleFigure.createMany({
          data: figures.map((figure, index) => ({
            translationId: row.id,
            position: index,
            src: figure.src,
            alt: figure.alt,
            caption: figure.caption,
          })),
        })
      }
    }
    articlesWritten += 1
  }

  const markdown = languageCodes.map((lang) => {
    const list = allArticles(lang)
    return { lang, articles: list.length, paragraphs: list.reduce((n, a) => n + countParagraphs(a.body), 0), sources: list.reduce((n, a) => n + a.sources.length, 0), figures: list.reduce((n, a) => n + extractFigures(a.body).length, 0) }
  })
  const db = await Promise.all(languageCodes.map(async (lang) => {
    const rows = await prisma.articleTranslation.findMany({ where: { lang }, include: { _count: { select: { sources: true, figures: true } } } })
    return { lang, articles: rows.length, paragraphs: rows.reduce((n, r) => n + r.paragraphCount, 0), sources: rows.reduce((n, r) => n + r._count.sources, 0), figures: rows.reduce((n, r) => n + r._count.figures, 0) }
  }))

  const table = markdown.map((md) => {
    const row = db.find((d) => d.lang === md.lang)
    const missing = md.articles - row.articles
    return { lang: md.lang, mdArticles: md.articles, dbArticles: row.articles, mdParagraphs: md.paragraphs, dbParagraphs: row.paragraphs, mdSources: md.sources, dbSources: row.sources, mdFigures: md.figures, dbFigures: row.figures, missing }
  })
  console.table(table)

  const failures = []
  for (const row of table) {
    for (const field of ['Articles', 'Paragraphs', 'Sources', 'Figures']) {
      if (row[`md${field}`] !== row[`db${field}`]) failures.push(`${row.lang}: ${field.toLowerCase()} ${row[`md${field}`]} in markdown, ${row[`db${field}`]} in database`)
    }
  }
  if (unassigned.length) {
    console.error(`[import] no pillar mapping for: ${unassigned.sort().join(', ')}`)
    failures.push(`${unassigned.length} article(s) have no pillar mapping`)
  }

  console.log(`articles written: ${articlesWritten}`)
  if (failures.length) {
    for (const failure of failures) console.error(`[import] ${failure}`)
    process.exitCode = 1
  } else {
    console.log('[import] parity ok: 0 missing')
  }
  await prisma.$disconnect()
}

main().catch(async (error) => { console.error(error); await prisma.$disconnect(); process.exit(1) })
