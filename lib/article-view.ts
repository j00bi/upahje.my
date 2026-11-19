import { cleanText } from './text'

export type TocItem = { id: string; label: string }

/** Same slug rule the Markdown renderer uses for heading ids. */
export function anchor(text: string): string {
  return cleanText(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

const words = (value: string) => value.split(/\s+/).filter(Boolean).length

/**
 * The short answer is the first body paragraph, moved above the body and cut to
 * 40 to 60 words. This is the block an answer engine lifts, so it is real copy
 * from the article, not a summary written for the template.
 */
export function splitShortAnswer(body: string): { short: string | null; rest: string } {
  const lines = body.split(/\r?\n/)
  const start = lines.findIndex(
    (line) => line.trim() && !/^#{1,6}\s/.test(line) && !/^```/.test(line) && !/^[>|]/.test(line) && !/^[-*]\s+/.test(line) && !/^\d+\.\s+/.test(line),
  )
  if (start < 0) return { short: null, rest: body }

  let end = start
  const paragraph: string[] = []
  while (end < lines.length && lines[end].trim()) {
    paragraph.push(lines[end].trim())
    end += 1
  }
  const text = paragraph.join(' ')
  const sentences = text.match(/[^.!?]+[.!?]+["')\]]*|\S[^.!?]*$/g) || [text]
  const picked: string[] = []
  let count = 0
  for (const sentence of sentences) {
    const next = count + words(sentence)
    if (count >= 40) break
    if (count > 0 && next > 60) break
    picked.push(sentence.trim())
    count = next
  }
  const short = picked.join(' ').trim()
  const remainder = sentences.slice(picked.length).join(' ').trim()
  const before = lines.slice(0, start)
  const after = lines.slice(end)
  const rest = [...before, ...(remainder ? [remainder] : []), ...after].join('\n').trim()
  return { short: short || null, rest }
}

/**
 * Split the FAQ section off the body so it can render with its own rhythm.
 * The section ends at the next H2, not at the end of the file: publishers put a
 * read-next block after the FAQ, and truncating there silently deleted it.
 */
export function splitFaq(body: string): { withoutFaq: string; faqSource: string | null } {
  const lines = body.split(/\r?\n/)
  const start = lines.findIndex((line) => /^##\s+(FAQ|Frequently asked questions)\s*$/i.test(line))
  if (start < 0) return { withoutFaq: body, faqSource: null }
  // The section ends at the next H2 or at the horizontal rule / bold label that
  // publishers use to open a read-next block after the FAQ.
  let end = lines.length
  for (let i = start + 1; i < lines.length; i++) {
    if (/^##\s+/.test(lines[i]) || /^---+$/.test(lines[i]) || /^\*\*[^*]+\*\*\s*$/.test(lines[i])) {
      end = i
      break
    }
  }
  const withoutFaq = [...lines.slice(0, start), ...lines.slice(end)].join('\n').trim()
  return { withoutFaq, faqSource: lines.slice(start, end).join('\n').trim() || null }
}

/** H2s of the body, minus the FAQ, as TOC entries. */
export function extractHeadings(body: string): TocItem[] {
  const items: TocItem[] = []
  for (const line of body.split(/\r?\n/)) {
    const heading = line.match(/^##\s+(.*)$/)
    if (!heading) continue
    const label = cleanText(heading[1].trim())
    if (/^(faq|frequently asked questions)$/i.test(label)) continue
    items.push({ id: anchor(label), label })
  }
  return items
}
