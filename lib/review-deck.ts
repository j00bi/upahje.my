import { allArticles, languageCodes } from './articles.mjs'
import { couldNotVerifyCount } from './review'

export type DeckCard = {
  slug: string
  lang: string
  file: string
  title: string
  standfirst: string
  excerpt: string
  words: number
  sources: number
  gaps: number
  verify: string | null
}

/** Plain-text excerpt of the opening, at most `limit` words. */
export function excerpt(body: string, limit = 200): string {
  const text = body
    .replace(/^#.*$/gm, '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_>#|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return text.split(' ').slice(0, limit).join(' ')
}

export function deckCards(): DeckCard[] {
  const cards: DeckCard[] = []
  for (const lang of languageCodes) {
    for (const article of allArticles(lang)) {
      if (!article.draft) continue
      const verifyLine = article.body.split(/\r?\n/).findIndex((line) => line.includes('[VERIFY]'))
      cards.push({
        slug: article.slug,
        lang,
        file: article.file,
        title: article.title,
        standfirst: article.description,
        excerpt: excerpt(article.body),
        words: article.wordCount,
        sources: article.sources.length,
        gaps: couldNotVerifyCount(article.body),
        verify: verifyLine >= 0 ? `[VERIFY] at ${article.file}:${verifyLine + 1}` : null,
      })
    }
  }
  return cards.sort((a, b) => a.title.localeCompare(b.title))
}
