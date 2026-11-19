import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/seo'

/** Everything that is not content. Kept in sync with next.config.mjs headers. */
const MARKETPLACE = [
  '/jobs',
  '/talent',
  '/categories',
  '/portfolio',
  '/pay',
  '/payment',
  '/ai',
  '/onboarding',
  '/dashboard',
  '/auth',
]

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
  const privatePaths = [...new Set(['/api/', '/admin/', '/auth/callback', ...MARKETPLACE])]
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
