import { LANGUAGES, categoryPath } from './articles.mjs'
import type { Article } from './types'

export const SITE = 'https://upahje.my'
export const SITE_NAME = 'UpahJe.my'

export const absolute = (path: string) => `${SITE}${path.startsWith('/') ? path : `/${path}`}`

/**
 * hreflang set for a page that exists in both languages, with `x-default`
 * pointing at English. Call with the path *without* the language prefix.
 */
export function languagesFor(path: string, locales: { en: string; ms: string } = { en: path, ms: path }) {
  return {
    'en-MY': absolute(`/en${locales.en}`),
    'ms-MY': absolute(`/ms${locales.ms}`),
    'x-default': absolute(`/en${locales.en}`),
  }
}

/** hreflang for a content page: both languages only when the pair exists. */
export function articleLanguages(article: Article, pair?: Article) {
  if (!pair) return undefined
  return {
    'en-MY': absolute(`/en/articles/${article.lang === 'en' ? article.slug : pair.slug}`),
    'ms-MY': absolute(`/ms/articles/${article.lang === 'ms' ? article.slug : pair.slug}`),
    'x-default': absolute(`/en/articles/${article.lang === 'en' ? article.slug : pair.slug}`),
  }
}

export const categoryLanguages = (category: string) => ({
  'en-MY': absolute(categoryPath('en', category)),
  'ms-MY': absolute(categoryPath('ms', category)),
  'x-default': absolute(categoryPath('en', category)),
})

export const htmlLang = (lang: string) => LANGUAGES.find((l) => l.code === lang)?.htmlLang || 'en-MY'
