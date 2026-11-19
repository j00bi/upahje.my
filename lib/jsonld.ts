import type { Article, ArticleFaq } from './types'
import { cleanText } from './text'
import { SITE, SITE_NAME, absolute } from './seo'

const publisher = { '@type': 'Organization', name: SITE_NAME, url: SITE }

/** Article + the sources it cites, as schema.org CreativeWork citations. */
export function articleJsonLd(article: Article, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: cleanText(article.title),
    description: cleanText(article.description),
    datePublished: article.date,
    dateModified: article.updated || article.date,
    inLanguage: article.lang === 'ms' ? 'ms-MY' : 'en-MY',
    author: { '@type': 'Person', name: cleanText(article.author) },
    publisher,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    ...(article.tags.length ? { keywords: article.tags.map(cleanText).join(', ') } : {}),
    ...(article.sources.length
      ? { citation: article.sources.map((source) => ({ '@type': 'CreativeWork', name: cleanText(source.title), url: source.url })) }
      : {}),
  }
}

/** FAQPage generated from the visible FAQ section, never hand-written. */
export function faqJsonLd(faq: ArticleFaq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: cleanText(item.question),
      acceptedAnswer: { '@type': 'Answer', text: cleanText(item.answer) },
    })),
  }
}

/** A definition article is also a DefinedTerm in the site's concept set. */
export function definedTermJsonLd(article: Article, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: article.title,
    description: cleanText(article.description),
    url,
    inLanguage: article.lang === 'ms' ? 'ms-MY' : 'en-MY',
    inDefinedTermSet: { '@type': 'DefinedTermSet', name: `${SITE_NAME} - definitions`, url: absolute(`/${article.lang}/articles/category/definitions`) },
  }
}

/** The concept index as a DefinedTermSet, for the definitions category page. */
export function definedTermSetJsonLd(name: string, url: string, articles: Article[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name,
    url,
    hasDefinedTerm: articles.map((article) => ({
      '@type': 'DefinedTerm',
      name: cleanText(article.title),
      url: absolute(`/${article.lang}/articles/${article.slug}`),
    })),
  }
}
