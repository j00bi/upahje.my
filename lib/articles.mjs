/**
 * Article content pipeline — plain ESM, no dependencies.
 *
 * upahje.my is bilingual: one file per language, in the language's own folder.
 *
 *   content/articles/en/<slug>.md
 *   content/articles/ms/<slug>.md
 *
 * Frontmatter (required unless marked optional):
 *
 *   ---
 *   title: "..."
 *   description: "..."
 *   slug: what-is-freelance-work
 *   translationKey: what-is-freelance-work   # same in both languages
 *   date: 2026-11-19
 *   updated: 2026-11-19
 *   author: "Name"
 *   category: definitions | buying-guides | side-income
 *   tags: [definitions, malaysia]
 *   canonical: https://upahje.my/en/articles/what-is-freelance-work
 *   draft: false
 *   sources:                                  # optional
 *     - title: "..."
 *       url: "https://..."
 *       checked: 2026-11-19                   # ISO date the page was verified
 *   ---
 *
 * The body is Markdown rendered by lib/markdown.tsx. `ARTICLES_ROOT` overrides
 * the content folder for fixture builds and the content checker.
 */
import fs from 'node:fs'
import path from 'node:path'

export const ARTICLES_ROOT = process.env.ARTICLES_ROOT
  ? path.resolve(process.env.ARTICLES_ROOT)
  : path.join(process.cwd(), 'content', 'articles')

export const ARTICLES_PER_PAGE = 6
const WORDS_PER_MINUTE = 220

export const LANGUAGES = [
  { code: 'en', htmlLang: 'en-MY', label: 'English', native: 'English' },
  { code: 'ms', htmlLang: 'ms-MY', label: 'Bahasa Melayu', native: 'Bahasa Melayu' },
]

export const DEFAULT_LANGUAGE = 'en'
export const languageCodes = LANGUAGES.map((l) => l.code)
export const isLanguage = (code) => languageCodes.includes(code)
export const languageByCode = (code) => LANGUAGES.find((l) => l.code === code) || LANGUAGES[0]
export const otherLanguage = (code) => (code === 'en' ? 'ms' : 'en')

/** The three editorial pillars, with copy per language. */
export const ARTICLE_CATEGORIES = [
  {
    slug: 'definitions',
    label: { en: 'Definitions', ms: 'Definisi' },
    blurb: {
      en: 'The words on a job post, a contract or a payslip — defined plainly.',
      ms: 'Istilah dalam iklan kerja, kontrak atau slip gaji — dijelaskan dengan mudah.',
    },
  },
  {
    slug: 'buying-guides',
    label: { en: 'Buying guides', ms: 'Panduan membeli' },
    blurb: {
      en: 'How to scope, compare and pay for local tech work.',
      ms: 'Cara menentu skop, membanding dan membayar kerja teknologi tempatan.',
    },
  },
  {
    slug: 'side-income',
    label: { en: 'Side income', ms: 'Pendapatan sampingan' },
    blurb: {
      en: 'Turning a skill into a second income, step by step.',
      ms: 'Menukar kemahiran menjadi pendapatan kedua, langkah demi langkah.',
    },
  },
]

export const categoryBySlug = (slug) => ARTICLE_CATEGORIES.find((c) => c.slug === slug)
export const categoryLabel = (slug, lang) => categoryBySlug(slug)?.label[lang] || slug
export const categoryBlurb = (slug, lang) => categoryBySlug(slug)?.blurb[lang] || ''

export const articlePath = (lang, slug) => `/${lang}/articles/${slug}`
export const categoryPath = (lang, slug) => `/${lang}/articles/category/${slug}`
export const indexHref = (lang, page = 1) => (page <= 1 ? `/${lang}/articles` : `/${lang}/articles/page/${page}`)

function parseScalar(value) {
  if (value === undefined) return ''
  const v = value.trim()
  if (v === '') return ''
  if (v.startsWith('"') && v.endsWith('"') && v.length >= 2) return v.slice(1, -1).replace(/\\"/g, '"')
  if (v.startsWith("'") && v.endsWith("'") && v.length >= 2) return v.slice(1, -1).replace(/''/g, "'")
  if (v.startsWith('[') && v.endsWith(']')) {
    const inner = v.slice(1, -1).trim()
    if (!inner) return []
    return inner.split(',').map((part) => parseScalar(part))
  }
  if (v === 'true') return true
  if (v === 'false') return false
  if (v === 'null') return null
  return v
}

/**
 * Parse the YAML subset the articles use: scalars, inline arrays, block lists of
 * strings and block lists of objects (sources).
 */
export function parseFrontmatter(raw, file = '<unknown>') {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---[ \t]*\r?\n?([\s\S]*)$/)
  if (!match) throw new Error(`[articles] ${file}: missing frontmatter (--- ... ---)`)
  const lines = match[1].split(/\r?\n/)
  const data = {}
  let key = null

  for (const line of lines) {
    if (!line.trim() || line.trim().startsWith('#')) continue
    const listItem = line.match(/^\s*-\s+(.*)$/)
    const kv = line.match(/^([A-Za-z0-9_-]+):[ \t]*(.*)$/)

    if (kv) {
      key = kv[1]
      const value = kv[2].trim()
      data[key] = value === '' ? [] : parseScalar(value)
      continue
    }
    if (listItem && key) {
      if (!Array.isArray(data[key])) data[key] = []
      const item = listItem[1].trim()
      const obj = item.match(/^([A-Za-z0-9_-]+):[ \t]*(.*)$/)
      if (obj) data[key].push({ [obj[1]]: parseScalar(obj[2]) })
      else data[key].push(parseScalar(item))
      continue
    }
    const nested = line.match(/^\s+([A-Za-z0-9_-]+):[ \t]*(.*)$/)
    if (nested && key && Array.isArray(data[key]) && data[key].length) {
      const last = data[key][data[key].length - 1]
      if (last && typeof last === 'object' && !Array.isArray(last)) last[nested[1]] = parseScalar(nested[2])
    }
  }

  return { data, body: match[2].trim() }
}

function countWords(body) {
  return body
    .replace(/```[\s\S]*?```/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length
}

/**
 * @param {string} file
 * @param {string} lang
 */
export function readArticleFile(file, lang) {
  const raw = fs.readFileSync(file, 'utf8')
  const base = path.basename(file, path.extname(file))
  const { data, body } = parseFrontmatter(raw, file)
  const slug = typeof data.slug === 'string' && data.slug ? data.slug : base
  for (const field of ['title', 'description', 'date', 'author']) {
    if (!data[field] || typeof data[field] !== 'string') {
      throw new Error(`[articles] ${file}: frontmatter needs a non-empty "${field}"`)
    }
  }
  const category = data.category ? String(data.category) : undefined
  if (category && !categoryBySlug(category)) {
    throw new Error(`[articles] ${file}: category "${category}" is not one of ${ARTICLE_CATEGORIES.map((c) => c.slug).join(', ')}`)
  }
  if (!category) throw new Error(`[articles] ${file}: frontmatter needs a "category"`)
  const tags = Array.isArray(data.tags) ? data.tags.map(String) : []
  const sources = Array.isArray(data.sources)
    ? data.sources
        .filter((s) => s && typeof s === 'object' && s.url)
        .map((s) => ({
          title: String(s.title || s.url),
          url: String(s.url),
          checked: s.checked ? String(s.checked) : undefined,
        }))
    : []
  const words = countWords(body)
  return {
    lang,
    slug,
    translationKey: data.translationKey ? String(data.translationKey) : slug,
    title: data.title,
    description: data.description,
    date: String(data.date),
    updated: data.updated ? String(data.updated) : undefined,
    author: data.author,
    tags,
    category,
    canonical: data.canonical ? String(data.canonical) : undefined,
    sources,
    draft: data.draft === true,
    body,
    wordCount: words,
    readingTime: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    file,
  }
}

const cache = new Map()

function readLanguage(lang) {
  if (!isLanguage(lang)) throw new Error(`[articles] unknown language "${lang}"`)
  return (() => {
    const dir = path.join(ARTICLES_ROOT, lang)
    if (!fs.existsSync(dir)) return []
    const articles = fs
      .readdirSync(dir)
      .filter((name) => name.endsWith('.md') || name.endsWith('.mdx'))
      .map((name) => readArticleFile(path.join(dir, name), lang))
    const seen = new Set()
    for (const article of articles) {
      if (seen.has(article.slug)) throw new Error(`[articles] duplicate slug "${article.slug}" in ${lang} (${article.file})`)
      seen.add(article.slug)
    }
    return articles.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)))
  })()
}

/** Every article in a language, drafts included, newest first. */
export function allArticles(lang = DEFAULT_LANGUAGE) {
  if (!cache.has(lang)) cache.set(lang, readLanguage(lang))
  return cache.get(lang)
}

/** Articles that may be linked, indexed and shipped. */
export function publishedArticles(lang = DEFAULT_LANGUAGE) {
  return allArticles(lang).filter((a) => !a.draft)
}

export function getArticle(lang, slug) {
  return allArticles(lang).find((a) => a.slug === slug)
}

export function getPublishedArticle(lang, slug) {
  return publishedArticles(lang).find((a) => a.slug === slug)
}

/** The published counterpart in the other language, if the pair is complete. */
export function translatedArticle(article) {
  return publishedArticles(otherLanguage(article.lang)).find((a) => a.translationKey === article.translationKey)
}

/** Published articles in one pillar, newest first. */
export function articlesInCategory(category, lang = DEFAULT_LANGUAGE) {
  return publishedArticles(lang).filter((a) => a.category === category)
}

export function articlePageCount(lang = DEFAULT_LANGUAGE) {
  return Math.max(1, Math.ceil(publishedArticles(lang).length / ARTICLES_PER_PAGE))
}

export function articlesForPage(page, lang = DEFAULT_LANGUAGE) {
  const list = publishedArticles(lang)
  const start = (Math.max(1, page) - 1) * ARTICLES_PER_PAGE
  return list.slice(start, start + ARTICLES_PER_PAGE)
}

/** The page renders the title as its H1, so a leading matching `# Title` is dropped. */
export function bodyWithoutTitle(body, title) {
  return body
    .replace(/^#\s+(.+?)\s*\r?\n/, (full, heading) =>
      heading.trim().toLowerCase() === title.trim().toLowerCase() ? '' : full,
    )
    .trim()
}

export function formatDate(value, lang = DEFAULT_LANGUAGE) {
  const date = new Date(`${value}T00:00:00Z`)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat(lang === 'ms' ? 'ms-MY' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

export function isoDate(value) {
  const date = new Date(`${value}T00:00:00Z`)
  return Number.isNaN(date.getTime()) ? value : date.toISOString().slice(0, 10)
}
