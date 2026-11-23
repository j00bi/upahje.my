import type { MetadataRoute } from 'next'
import { ARTICLE_CATEGORIES, LANGUAGES, publishedArticles } from '@/lib/articles.mjs'
import { SITE } from '@/lib/seo'
import { REPO_TOPICS } from '@/lib/repos.mjs'

/**
 * Content only. The marketplace routes (jobs, talent, categories, portfolio,
 * pay, ai, auth) are unlinked and carry `X-Robots-Tag: noindex`; advertising
 * them here would push dead pages to search engines.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const language of LANGUAGES) {
    const lang = language.code
    entries.push({ url: `${SITE}/${lang}`, changeFrequency: 'weekly', priority: 1 })
    entries.push({ url: `${SITE}/${lang}/articles`, changeFrequency: 'daily', priority: 0.9 })
    entries.push({ url: `${SITE}/${lang}/resources`, changeFrequency: 'weekly', priority: 0.6 })
    entries.push({ url: `${SITE}/${lang}/repos`, changeFrequency: 'weekly', priority: 0.7 })
    for (const topic of REPO_TOPICS) {
      entries.push({ url: `${SITE}/${lang}/repos/${topic.slug}`, changeFrequency: 'weekly', priority: 0.7 })
    }

    for (const category of ARTICLE_CATEGORIES) {
      entries.push({
        url: `${SITE}/${lang}/articles/category/${category.slug}`,
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }

    for (const article of publishedArticles(lang)) {
      entries.push({
        url: `${SITE}/${lang}/articles/${article.slug}`,
        lastModified: new Date(`${article.updated || article.date}T00:00:00Z`),
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    }
  }

  return entries
}
