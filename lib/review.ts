import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { notFound } from 'next/navigation'

/**
 * Fail closed. No token configured, no token supplied, or a mismatch all render
 * the normal 404: the route must not confirm that a review surface exists.
 */
export function requireReview(k: string | undefined): void {
  const token = process.env.REVIEW_TOKEN
  if (!token || !k || k !== token) notFound()
}

/** List items under the article's own could-not-verify heading. */
export function couldNotVerifyCount(body: string): number {
  const lines = body.split(/\r?\n/)
  const start = lines.findIndex((line) => /^##\s+.*(could.{0,20}not verify|not verify|cannot verify|tidak dapat.{0,20}sahkan)/i.test(line))
  if (start < 0) return 0
  const section: string[] = []
  for (let i = start + 1; i < lines.length; i += 1) {
    if (/^##\s+/.test(lines[i])) break
    section.push(lines[i])
  }
  const bullets = section.filter((line) => /^\s*(?:[-*]|\d+\.)\s+\S/.test(line)).length
  if (bullets) return bullets
  // The corpus writes this section as prose; count its sentences, which are
  // the entries a reader sees. Never infer an entry that is not there.
  const text = section.join(' ').replace(/\s+/g, ' ').trim()
  return text ? (text.match(/[^.!?]+[.!?]+/g) || []).length : 0
}

/**
 * Last commit date for a file. Git is the truth when the build has history;
 * otherwise the file mtime is returned and the caller says so on the page.
 */
export function lastTouched(file: string): { date: string; source: 'git' | 'mtime' } {
  const relative = path.relative(process.cwd(), file)
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', relative], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
    if (out) return { date: out, source: 'git' }
  } catch {
    // no git in this environment
  }
  return { date: fs.statSync(file).mtime.toISOString().slice(0, 10), source: 'mtime' }
}

/** The one-line thesis used in the approvals list and the Telegram ping. */
export function thesis(description: string): string {
  return (description.split(/(?<=[.!?])\s+/)[0] || description).trim()
}
