import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/dashboard/', '/admin/', '/auth/callback'],
    },
    sitemap: 'https://upahje.my/sitemap.xml',
  }
}
