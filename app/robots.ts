import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/seo'

/**
 * Nothing is off-limits now that the marketplace routes are gone. The API
 * prefix stays disallowed for tidiness if an endpoint is added later.
 */
const PRIVATE = ['/api/', '/en/review', '/ms/review', '/*/review/*']

const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'PerplexityBot',
  'Google-Extended',
]

export default function robots(): MetadataRoute.Robots {
  const privatePaths = PRIVATE
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: privatePaths },
      // The site exists to be quoted by answer engines: name them explicitly so
      // a platform-level "block AI" default has to override something visible.
      { userAgent: AI_CRAWLERS, allow: '/', disallow: privatePaths },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  }
}
