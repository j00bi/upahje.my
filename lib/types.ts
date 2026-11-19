/** Shared article types for the app router pages and the FAQ extractor. */

export type ArticleFaq = { question: string; answer: string }

export type ArticleCategory = {
  slug: string
  label: Record<string, string>
  blurb: Record<string, string>
}

export type ArticleSource = { title: string; url: string; checked?: string }

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
  body: string
  wordCount: number
  readingTime: number
  file: string
}

