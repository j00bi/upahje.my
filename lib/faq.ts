import type { ArticleFaq } from './types'
import { cleanText } from './text'

/**
 * The FAQ is content, not a second hand-written JSON-LD block: it is read out of
 * the article body so the visible questions and the FAQPage structured data can
 * never disagree.
 *
 * Contract with the publisher: an `## FAQ` (or "Frequently asked questions")
 * section, each question as `### Question?`, each answer as the paragraph(s)
 * under it, until the next heading.
 */
export function extractFaq(body: string): ArticleFaq[] {
  const lines = body.split(/\r?\n/)
  const faq: ArticleFaq[] = []
  let inFaq = false
  let question: string | null = null
  let answer: string[] = []

  const flush = () => {
    if (question && answer.length) faq.push({ question: plain(question), answer: plain(answer.join(' ')) })
    question = null
    answer = []
  }

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.*)$/)
    if (h2) {
      flush()
      inFaq = /faq|frequently asked/i.test(h2[1])
      continue
    }
    if (!inFaq) continue
    const h3 = line.match(/^###\s+(.*)$/)
    if (h3) {
      flush()
      question = h3[1].trim()
      continue
    }
    if (!question) continue
    if (!line.trim()) {
      if (answer.length) answer.push(' ')
      continue
    }
    if (/^[-*]\s+/.test(line) || /^\d+\.\s+/.test(line)) {
      answer.push(` ${line.replace(/^([-*]|\d+\.)\s+/, '')}`)
      continue
    }
    answer.push(line.trim())
  }
  flush()
  return faq
}

/** Markdown inline syntax to the plain text a search engine should index. */
export function plain(markdown: string): string {
  return markdown
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\s*—\s*/g, ' - ')
    .replace(/\s*–\s*/g, '-')
}
