import { NextResponse } from 'next/server'
import { getArticle } from '@/lib/articles.mjs'

const REPO = 'j00bi/upahje.my'
const BRANCH = 'main'
const DECISIONS = 'data/review-decisions.json'

const gh = (path: string) => `https://api.github.com/repos/${REPO}/contents/${encodeURI(path)}`
const headers = () => ({
  authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  accept: 'application/vnd.github+json',
  'user-agent': 'upahje-review-deck',
})

async function readFile(path: string): Promise<{ content: string; sha: string } | null> {
  const res = await fetch(`${gh(path)}?ref=${BRANCH}`, { headers: headers() })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`GitHub read ${path}: ${res.status}`)
  const json = (await res.json()) as { content: string; sha: string }
  return { content: Buffer.from(json.content, 'base64').toString('utf8'), sha: json.sha }
}

async function writeFile(path: string, content: string, message: string, sha?: string) {
  const res = await fetch(gh(path), {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify({ message, content: Buffer.from(content).toString('base64'), branch: BRANCH, ...(sha ? { sha } : {}) }),
  })
  if (!res.ok) throw new Error(`GitHub write ${path}: ${res.status} ${(await res.text()).slice(0, 160)}`)
  return (await res.json()) as { commit: { sha: string } }
}

function withReviewBlock(source: string, block: string): string {
  const stripped = source.replace(/\nreview:\n(?: {2}[^\n]*\n?)*/g, '\n')
  const match = stripped.match(/^draft:.*$/m)
  if (match) return stripped.replace(match[0], `${match[0]}\n${block.trimEnd()}`)
  return `${stripped.trimEnd()}\n${block.trimEnd()}\n`
}

export async function POST(request: Request) {
  if (!process.env.REVIEW_TOKEN) return NextResponse.json({ error: 'not found' }, { status: 404 })
  let body: any
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'bad request' }, { status: 400 })
  }
  if (body.k !== process.env.REVIEW_TOKEN) return NextResponse.json({ error: 'not found' }, { status: 404 })

  const { lang, slug, action, reason, note } = body
  if (!['approve', 'reject', 'needs-work'].includes(action)) return NextResponse.json({ error: 'unknown action' }, { status: 400 })
  const article = getArticle(lang, slug)
  if (!article || !article.draft) return NextResponse.json({ error: 'no such draft' }, { status: 404 })

  const verify = article.body.split(/\r?\n/).findIndex((line) => line.includes('[VERIFY]'))
  if (action === 'approve' && verify >= 0) {
    return NextResponse.json({ error: 'blocked: unresolved [VERIFY]', line: `${article.file}:${verify + 1}` }, { status: 409 })
  }

  if (!process.env.GITHUB_TOKEN) {
    return NextResponse.json({ ok: false, configured: false, message: 'publishing is not configured yet (GITHUB_TOKEN missing)' })
  }

  try {
    const decided_at = new Date().toISOString()
    const rel = article.file.replace(`${process.cwd()}/`, '')
    const nextReview = action === 'approve'
      ? null
      : action === 'reject'
        ? `review:\n  state: rejected\n  reason: ${JSON.stringify(reason || 'other')}\n  at: ${decided_at}`
        : `review:\n  state: needs-work\n  note: ${JSON.stringify(note || '')}\n  at: ${decided_at}`

    let next = article.body
    const file = await readFile(rel)
    if (!file) return NextResponse.json({ error: `file not found in repo: ${rel}` }, { status: 502 })

    const raw = (await readFile(rel))!.content
    const headEnd = raw.indexOf('\n---', 4) + 4
    const frontmatter = raw.slice(0, headEnd)
    const rest = raw.slice(headEnd)
    let newFrontmatter = frontmatter
    if (action === 'approve') newFrontmatter = newFrontmatter.replace(/^draft:\s*true\s*$/m, 'draft: false')
    if (nextReview) newFrontmatter = withReviewBlock(newFrontmatter, nextReview)
    next = newFrontmatter + rest

    const articleCommit = await writeFile(rel, next, `review(${lang}/${slug}): ${action}${reason ? ` (${reason})` : ''}`)

    const decisionsFile = await readFile(DECISIONS)
    const decisions = decisionsFile ? JSON.parse(decisionsFile.content) : []
    decisions.push({ slug, lang, action, reason: reason || null, note: note || null, decided_at, commit: articleCommit.commit.sha })
    await writeFile(DECISIONS, JSON.stringify(decisions, null, 2) + '\n', `review(${lang}/${slug}): record ${action}`, decisionsFile?.sha)

    return NextResponse.json({ ok: true, configured: true, action, commit: articleCommit.commit.sha })
  } catch (error) {
    return NextResponse.json({ ok: false, configured: true, error: String(error).slice(0, 200) }, { status: 502 })
  }
}
