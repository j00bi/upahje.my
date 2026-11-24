#!/usr/bin/env node
/**
 * Parse every data/*.json before anything else runs.
 *
 * The schema gate reads Markdown, so a rebase that truncates a JSON data file
 * passes it and only fails later, in the loader, in a way that looks unrelated.
 * This turns that class of mistake into a named error at the first step.
 */
import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'

const dir = path.join(process.cwd(), 'data')
let checked = 0
const problems = []

for (const name of readdirSync(dir).filter((file) => file.endsWith('.json'))) {
  const file = path.join(dir, name)
  try {
    const parsed = JSON.parse(readFileSync(file, 'utf8'))
    if (!parsed || typeof parsed !== 'object') problems.push(`${name}: not an object`)
    checked += 1
  } catch (error) {
    problems.push(`${name}: ${error instanceof Error ? error.message : String(error)}`)
  }
}

if (problems.length) {
  console.error('data: invalid JSON in data/')
  for (const problem of problems) console.error(`  ${problem}`)
  process.exit(1)
}
console.log(`data: ${checked} JSON file(s) parsed`)
