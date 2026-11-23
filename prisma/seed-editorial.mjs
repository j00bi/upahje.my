#!/usr/bin/env node
/**
 * Seed the six editorial pillars and the byline. Idempotent: safe to re-run.
 * Empty pillars stay hidden; the reader surface never lists them.
 */
import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'node:fs'

const prisma = new PrismaClient()
const { pillars } = JSON.parse(readFileSync(new URL('../data/pillars.json', import.meta.url), 'utf8'))

let created = 0
let updated = 0
for (const pillar of pillars) {
  const existing = await prisma.editorialCategory.findUnique({ where: { slug: pillar.slug } })
  await prisma.editorialCategory.upsert({
    where: { slug: pillar.slug },
    create: {
      slug: pillar.slug,
      nameEn: pillar.nameEn,
      nameMs: pillar.nameMs,
      descriptionEn: pillar.descriptionEn,
      descriptionMs: pillar.descriptionMs,
      sortOrder: pillar.sortOrder,
      hidden: pillar.hidden,
    },
    update: {
      nameEn: pillar.nameEn,
      nameMs: pillar.nameMs,
      descriptionEn: pillar.descriptionEn,
      descriptionMs: pillar.descriptionMs,
      sortOrder: pillar.sortOrder,
      hidden: pillar.hidden,
    },
  })
  existing ? (updated += 1) : (created += 1)
}

await prisma.author.upsert({
  where: { slug: 'upahje-editorial' },
  create: { slug: 'upahje-editorial', name: 'UpahJe editorial' },
  update: { name: 'UpahJe editorial' },
})

const rows = await prisma.editorialCategory.findMany({ orderBy: { sortOrder: 'asc' } })
console.log(`pillars: ${rows.length} (${created} created, ${updated} updated)`)
console.log(`hidden: ${rows.filter((r) => r.hidden).map((r) => r.slug).join(', ') || 'none'}`)
await prisma.$disconnect()
