import Link from 'next/link'
import type { ReactNode } from 'react'
import { cleanText } from './text'
import { anchor } from './article-view'

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

const P = 'mb-5 text-[17px] leading-[1.7] text-[color:var(--ui-body)]'
const H2 = 'mt-12 mb-3 text-xl font-semibold leading-7 text-[color:var(--ui-ink)] scroll-mt-24'
const H3 = 'mt-8 mb-2 text-[16px] font-semibold text-[color:var(--ui-ink)]'
const UL = 'mb-6 list-disc space-y-2 pl-6 text-[17px] leading-[1.7] text-[color:var(--ui-body)] marker:text-[color:var(--ui-muted)]'
const OL = 'mb-6 list-decimal space-y-2 pl-6 text-[17px] leading-[1.7] text-[color:var(--ui-body)] marker:text-[color:var(--ui-muted)]'
const QUOTE =
  'my-8 border-l-2 border-[color:var(--ui-accent)] pl-5 text-[17px] leading-[1.7] text-[color:var(--ui-ink)]'
const INLINE_CODE =
  'rounded bg-[color:var(--ui-accent-soft)] px-1.5 py-0.5 font-mono text-[0.9em] text-[color:var(--ui-ink)]'
const LINK =
  'font-medium text-[color:var(--ui-accent)] underline decoration-1 underline-offset-2 hover:opacity-80'
const PRE =
  'mb-6 overflow-x-auto rounded-[10px] border border-[color:var(--ui-rule)] bg-[color:var(--ui-surface)] p-4 text-sm leading-6 text-[color:var(--ui-ink)]'
const TABLE = 'w-full border-collapse text-left text-[15px] leading-6'
const TH = 'ui-mono px-3 py-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-[color:var(--ui-muted)]'
const TD = 'px-3 py-3 align-top text-[color:var(--ui-body)]'

const TOKEN = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const parts = cleanText(text).split(TOKEN).filter((part) => part !== '')
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

const TABLE_SEPARATOR = /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/

/** `| a | b |` -> ['a', 'b'], keeping escaped pipes inside a cell. */
function splitRow(line: string): string[] {
  return line
    .replace(/^\s*\|/, '')
    .replace(/\|\s*$/, '')
    .split(/(?<!\\)\|/)
    .map((cell) => cell.trim().replace(/\\\|/g, '|'))
}

const startsTable = (line: string, next: string | undefined) =>
  line.includes('|') && !!next && TABLE_SEPARATOR.test(next)

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
  let lastHeading = ''

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
      lastHeading = cleanText(text)
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

    if (startsTable(line, lines[i + 1])) {
      const header = splitRow(line)
      const rows: string[][] = []
      i += 2
      while (i < lines.length && lines[i].includes('|') && lines[i].trim() && !isBlockStart(lines[i])) {
        rows.push(splitRow(lines[i]))
        i += 1
      }
      const numeric = (value: string) => /^\s*(?:RM|MYR|USD|\$)?\s*\d[\d.,]*\s*(?:%|px|ms|s|GB|MB)?\s*$/i.test(value)
      blocks.push(
        <div key={key++} className="my-8 max-w-full overflow-x-auto">
          <table
            className={TABLE}
            style={{ borderTop: '1px solid var(--ui-rule)', borderBottom: '1px solid var(--ui-rule)' }}
          >
            <caption className="sr-only">{lastHeading || 'Table'}</caption>
            <thead>
              <tr>
                {header.map((cell, index) => (
                  <th key={index} scope="col" className={TH}>
                    {renderInline(cell, `th${key}-${index}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {header.map((_, cellIndex) => {
                    const value = row[cellIndex] || ''
                    return (
                      <td
                        key={cellIndex}
                        className={`${TD} ${numeric(value) ? 'text-right tabular-nums' : ''}`}
                      >
                        {renderInline(value, `td${key}-${rowIndex}-${cellIndex}`)}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
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
