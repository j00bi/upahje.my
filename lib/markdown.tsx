import fs from 'node:fs'
import path from 'node:path'
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

const P = 'mb-[1.15em] text-[17px] leading-[1.65] text-[color:var(--ui-body)]'
const H2 = 'mt-14 mb-3 text-[21px] font-semibold leading-[1.3] tracking-[-0.01em] text-[color:var(--ui-ink)] scroll-mt-24'
const H3 = 'mt-8 mb-2 text-[17px] font-semibold leading-6 text-[color:var(--ui-ink)]'
const UL = 'mb-6 list-disc space-y-2 pl-6 text-[17px] leading-[1.65] text-[color:var(--ui-body)] marker:text-[color:var(--ui-muted)]'
const OL = 'mb-6 list-decimal space-y-2 pl-6 text-[17px] leading-[1.65] text-[color:var(--ui-body)] marker:text-[color:var(--ui-muted)]'
const QUOTE =
  'my-6 border-l-2 border-[color:var(--ui-rule)] pl-5 text-[17px] leading-[1.65] text-[color:var(--ui-ink)]'
const INLINE_CODE =
  'rounded px-1.5 py-0.5 font-mono text-[0.9em] text-[color:var(--ui-ink)]'
const LINK =
  'font-medium text-[color:var(--ui-accent)] underline decoration-1 underline-offset-2 hover:opacity-80'
const PRE =
  'mb-6 overflow-x-auto rounded-[10px] border border-[color:var(--ui-rule)] bg-[color:var(--ui-surface)] p-4 text-sm leading-6 text-[color:var(--ui-ink)]'
const TABLE = 'w-full border-collapse text-left text-[15px] leading-6'
const TH = 'px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-[color:var(--ui-muted)]'
const TD = 'px-3 py-3 align-top text-[color:var(--ui-body)]'

const TOKEN = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const parts = cleanText(text).split(TOKEN).filter((part) => part !== '')
  return parts.map((part, index) => {
    const key = `${keyPrefix}-${index}`
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) {
      const [, label, href] = link
      const absoluteInternal = href.startsWith('https://upahje.my')
      const external = /^https?:\/\//.test(href) && !absoluteInternal
      if (absoluteInternal) {
        return (
          <Link key={key} href={href.replace('https://upahje.my', '')} className={LINK}>
            {label}
          </Link>
        )
      }
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
    if (part.startsWith('`') && part.endsWith('`')) return <code key={key} className={INLINE_CODE} style={{ background: 'color-mix(in oklab, var(--ui-ink) 6%, transparent)' }}>{part.slice(1, -1)}</code>
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

/* Figure sizes come from the file itself, so the <img> never ships without
   intrinsic dimensions (no CLS). SVGs only; a raster figure would need its own
   size in the alt syntax and is not supported yet. */
const figureSizes = new Map<string, { width: number; height: number } | null>()
function figureSize(src: string) {
  if (!src.startsWith('/') || !src.endsWith('.svg')) return null
  if (figureSizes.has(src)) return figureSizes.get(src) ?? null
  try {
    const svg = fs.readFileSync(path.join(process.cwd(), 'public', src), 'utf8')
    const width = Number(svg.match(/\bwidth="(\d+)"/)?.[1])
    const height = Number(svg.match(/\bheight="(\d+)"/)?.[1])
    const view = svg.match(/\bviewBox="[\d.]+[\s,]+[\d.]+[\s,]+([\d.]+)[\s,]+([\d.]+)"/)
    const size = width && height
      ? { width, height }
      : view ? { width: Number(view[1]), height: Number(view[2]) } : null
    figureSizes.set(src, size)
    return size
  } catch {
    figureSizes.set(src, null)
    return null
  }
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
      const text = quote.join(' ').trim()
      const special = text.match(/^\*\*(takeaway|callout)(?::\*\*|\*\*:)\s*([\s\S]*)$/i)
      if (special) {
        const kind = special[1].toLowerCase()
        blocks.push(
          <aside
            key={key++}
            className={`editorial-block editorial-${kind}`}
            aria-label={kind === 'takeaway' ? 'Takeaway' : 'Note'}
          >
            <p className="type-label" style={{ color: 'var(--ui-muted)' }}>{kind === 'takeaway' ? 'Takeaway' : 'Note'}</p>
            <p className="type-body mt-2">{renderInline(special[2].trim(), `q${key}`)}</p>
          </aside>,
        )
      } else {
        blocks.push(
          <blockquote key={key++} className={QUOTE}>
            {renderInline(text, `q${key}`)}
          </blockquote>,
        )
      }
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

    const image = line.match(/^!\[([^\]]*)\]\((\S+?)(?:\s+"[^"]*")?\)\s*$/)
    if (image) {
      const [, alt, src] = image
      let caption: string | null = null
      if (i + 1 < lines.length) {
        const next = lines[i + 1].match(/^\*([^*]+)\*\s*$/)
        if (next) { caption = cleanText(next[1].trim()); i += 1 }
      }
      i += 1
      const size = figureSize(src)
      blocks.push(
        <figure key={key++} className="my-6">
          <img
            src={src}
            alt={cleanText(alt)}
            {...(size ? { width: size.width, height: size.height } : {})}
            loading="lazy"
            decoding="async"
            style={{ display: 'block', width: '100%', height: 'auto' }}
          />
          {caption && caption.toLowerCase() !== cleanText(alt).toLowerCase() && (
            <figcaption className="mt-2 text-[13px]" style={{ color: 'var(--ui-muted)' }}>
              {caption}
            </figcaption>
          )}
        </figure>,
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
        <div key={key++} className="my-6 max-w-full overflow-x-auto">
          <table
            className={TABLE}
            style={{ borderTop: '1px solid var(--ui-rule)', borderBottom: '1px solid var(--ui-rule)' }}
          >
            <caption className="sr-only">{lastHeading || 'Table'}</caption>
            <thead>
              <tr>
                {header.map((cell, index) => (
                  <th key={index} scope="col" className={TH} style={{ fontFamily: 'var(--ui-font)' }}>
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
