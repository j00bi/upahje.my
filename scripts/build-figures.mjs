#!/usr/bin/env node
/**
 * Render figures/<slug>.mmd to public/figures/<slug>.svg with mermaid-cli.
 *
 *   node scripts/build-figures.mjs            # render sources that changed
 *   node scripts/build-figures.mjs --force    # re-render everything
 *   node scripts/build-figures.mjs <slug>...  # only these slugs
 *
 * Manual on purpose: the rendered SVG is committed, and the Vercel build never
 * runs Puppeteer. Source of truth is the .mmd; the PII gate scans it.
 */
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const srcDir = path.join(root, 'figures')
const outDir = path.join(root, 'public', 'figures')
const args = process.argv.slice(2)
const force = args.includes('--force')
const only = new Set(args.filter((arg) => !arg.startsWith('--')))

if (!fs.existsSync(srcDir)) {
  console.log('no figures/ directory: nothing to render')
  process.exit(0)
}

const chromium = process.env.PUPPETEER_EXECUTABLE_PATH ||
  (fs.existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined)
const env = { ...process.env, PUPPETEER_SKIP_DOWNLOAD: 'true' }
if (chromium) env.PUPPETEER_EXECUTABLE_PATH = chromium

fs.mkdirSync(outDir, { recursive: true })

const sources = fs.readdirSync(srcDir).filter((file) => file.endsWith('.mmd')).sort()
if (!sources.length) {
  console.log('no figures/*.mmd sources: nothing to render')
  process.exit(0)
}

let rendered = 0
let skipped = 0
for (const file of sources) {
  const slug = file.slice(0, -4)
  if (only.size && !only.has(slug)) continue

  const src = path.join(srcDir, file)
  const out = path.join(outDir, `${slug}.svg`)
  if (!force && fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(src).mtimeMs) {
    console.log(`skip   ${slug}.svg (up to date)`)
    skipped += 1
    continue
  }

  console.log(`render ${file} -> public/figures/${slug}.svg`)
  execFileSync(
    'npx',
    ['--yes', '@mermaid-js/mermaid-cli', '-i', src, '-o', out],
    { cwd: root, env, stdio: 'inherit', timeout: 180000 },
  )
  if (!fs.existsSync(out)) {
    console.error(`[figures] ${slug}.svg was not written`)
    process.exit(1)
  }
  rendered += 1
}

console.log(`figures: ${rendered} rendered, ${skipped} up to date`)
