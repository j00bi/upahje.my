import Link from 'next/link'
import type { ReactNode } from 'react'

/**
 * The article body renderer.
 *
 * Articles are .mdx files but the site has no MDX runtime (and this task adds no
 * dependencies), so the body is a deliberately small Markdown subset rendered to
 * React elements on the server: headings, paragraphs, lists, blockquotes, rules,
 * fenced code, inline code, bold, italic and links. Nothing is injected as HTML,
 * so a body cannot carry script or markup.
 *
 * If authors need embedded JSX/components later, the lightest upgrade is
 * next-mdx-remote + @mdx-js/react — until then, keep bodies to this subset.
 */

const P = 'mb-5 text-[17px] leading-[1.75] text-body'
const H2 = 'font-display-lg mt-12 mb-4 text-ink scroll-mt-24'
const H3 = 'font-display-sm mt-8 mb-3 text-ink scroll-mt-24'
const UL = 'mb-6 list-disc space-y-2 pl-6 text-[17px] leading-[1.75] text-body marker:text-emerald-600'
const OL = 'mb-6 list-decimal space-y-2 pl-6 text-[17px] leading-[1.75] text-body marker:text-emerald-600'
const QUOTE =
  'my-8 rounded-md border-l-4 border-primary bg-canvas-soft px-5 py-4 text-[17px] leading-[1.7] text-ink'
const INLINE_CODE =
  'rounded bg-canvas-warm px-1.5 py-0.5 font-mono text-[0.9em] text-ink'
const LINK =
  'font-medium text-emerald-700 underline decoration-emerald-300 underline-offset-2 hover:text-emerald-800'
const PRE =
  'mb-6 overflow-x-auto rounded-md bg-green-deep p-4 text-sm leading-6 text-canvas'

function anchor(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

const TOKEN = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const parts = text.split(TOKEN).filter((part) => part !== '')
  return parts.map((part, index) => {
    const key = `${keyPrefix}-${index}`
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) {
      const [, label, href] = link
      const external = /^https?:\/\//.test(href)
      if (external) {
        return (
          <a key={key} href={href} className={LINK} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        )
      }
      return (
        <Link key={key} href={href} className={LINK}>
          {label}
        </Link>
      )
    }
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={key} className="font-semibold text-ink">{part.slice(2, -2)}</strong>
    if (part.startsWith('*') && part.endsWith('*')) return <em key={key}>{part.slice(1, -1)}</em>
    if (part.startsWith('`') && part.endsWith('`')) return <code key={key} className={INLINE_CODE}>{part.slice(1, -1)}</code>
    return <span key={key}>{part}</span>
  })
}

const isBlockStart = (line: string) =>
  /^#{1,3}\s/.test(line) ||
  /^```/.test(line) ||
  /^>\s?/.test(line) ||
  /^[-*]\s+/.test(line) ||
  /^\d+\.\s+/.test(line) ||
  /^---+$/.test(line) ||
  /^\*\*\*+$/.test(line)

/** Render an article body to React nodes. Server-only; no client JS. */
export function Markdown({ source }: { source: string }): ReactNode {
  const lines = source.split(/\r?\n/)
  const blocks: ReactNode[] = []
  let i = 0
  let key = 0

  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim()) {
      i += 1
      continue
    }

    const fence = line.match(/^```([\w-]*)\s*$/)
    if (fence) {
      const code: string[] = []
      i += 1
      while (i < lines.length && !/^```\s*$/.test(lines[i])) {
        code.push(lines[i])
        i += 1
      }
      i += 1
      blocks.push(
        <pre key={key++} className={PRE}>
          <code className="font-mono">{code.join('\n')}</code>
        </pre>,
      )
      continue
    }

    const heading = line.match(/^(#{1,3})\s+(.*)$/)
    if (heading) {
      const level = heading[1].length
      const text = heading[2].trim()
      const id = anchor(text)
      if (level === 1) blocks.push(<h2 key={key++} id={id} className={H2}>{renderInline(text, `h${key}`)}</h2>)
      else if (level === 2) blocks.push(<h2 key={key++} id={id} className={H2}>{renderInline(text, `h${key}`)}</h2>)
      else blocks.push(<h3 key={key++} id={id} className={H3}>{renderInline(text, `h${key}`)}</h3>)
      i += 1
      continue
    }

    if (/^---+$/.test(line) || /^\*\*\*+$/.test(line)) {
      blocks.push(<hr key={key++} className="my-10 border-t border-canvas-warm" />)
      i += 1
      continue
    }

    if (/^>\s?/.test(line)) {
      const quote: string[] = []
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quote.push(lines[i].replace(/^>\s?/, ''))
        i += 1
      }
      blocks.push(
        <blockquote key={key++} className={QUOTE}>
          {renderInline(quote.join(' '), `q${key}`)}
        </blockquote>,
      )
      continue
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, ''))
        i += 1
      }
      blocks.push(
        <ul key={key++} className={UL}>
          {items.map((item, index) => (
            <li key={index} className="pl-1">{renderInline(item, `li${key}-${index}`)}</li>
          ))}
        </ul>,
      )
      continue
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ''))
        i += 1
      }
      blocks.push(
        <ol key={key++} className={OL}>
          {items.map((item, index) => (
            <li key={index} className="pl-1">{renderInline(item, `oli${key}-${index}`)}</li>
          ))}
        </ol>,
      )
      continue
    }

    const paragraph: string[] = [line.trim()]
    i += 1
    while (i < lines.length && lines[i].trim() && !isBlockStart(lines[i])) {
      paragraph.push(lines[i].trim())
      i += 1
    }
    blocks.push(
      <p key={key++} className={P}>
        {renderInline(paragraph.join(' '), `p${key}`)}
      </p>,
    )
  }

  return <>{blocks}</>
}
