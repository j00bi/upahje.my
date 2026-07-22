import type { MetadataRoute } from 'next'
import { MARKETPLACE_CATEGORIES } from '@/lib/categories'
import { TALENT_PROFILES } from '@/data/talentProfiles'

const BASE = 'https://upahje.my'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${BASE}/jobs`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/talent`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/categories`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/jobs/post`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const categoryPages: MetadataRoute.Sitemap = MARKETPLACE_CATEGORIES.map((cat) => ({
    url: `${BASE}/categories/${cat.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const talentPages: MetadataRoute.Sitemap = TALENT_PROFILES.map((t) => ({
    url: `${BASE}/talent/${t.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...categoryPages, ...talentPages]
}
