/** Shared article types for the app router pages and the FAQ extractor. */

export type ArticleFaq = { question: string; answer: string }

export type ArticleCategory = {
  slug: string
  label: Record<string, string>
  blurb: Record<string, string>
}

export type ArticleSource = { title: string; url: string; checked?: string; primary?: boolean }

export type Article = {
  lang: string
  slug: string
  translationKey: string
  title: string
  description: string
  date: string
  updated?: string
  author: string
  tags: string[]
  category: string
  canonical?: string
  sources: ArticleSource[]
  draft: boolean
  /** Optional short ringgit figure for homepage cards; must already appear in the body. */
  cardFigure?: string
  regulatory?: boolean
  opinion?: boolean
  changelog?: { date: string; note: string }[]
  body: string
  wordCount: number
  readingTime: number
  file: string
}

