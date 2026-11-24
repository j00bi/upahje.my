/** @type {import('next').NextConfig} */
const nextConfig = {
  // Review pages read drafts from disk at request time; trace the corpus so a
  // serverless build can render them (git history is not traced).
  experimental: {
    cpus: 1,
    webpackBuildWorker: false,
    outputFileTracingIncludes: {
      '/[lang]/review': ['./content/articles/**', './data/**'],
      '/[lang]/review/[slug]': ['./content/articles/**', './data/**'],
    },
  },
  images: { remotePatterns: [] },
  async redirects() {
    // Topic taxonomy: the old category URLs are retired and every one of them
    // 301s to its replacement. Nothing that works today may 404.
    const legacy = {
      definitions: 'glossary',
      'buying-guides': 'buying',
      'side-income': 'freelance',
      business: 'buying',
      finance: 'compliance',
      technology: 'ai-automation',
      'automation-ai': 'ai-automation',
      marketing: 'operations-growth',
      operations: 'operations-growth',
    }
    return [
      { source: '/', destination: '/en', permanent: true },
      ...Object.entries(legacy).flatMap(([oldSlug, target]) => {
        const path = target === 'glossary' ? 'glossary' : `topics/${target}`
        return [
          { source: `/en/articles/category/${oldSlug}`, destination: `/en/${path}`, permanent: true },
          { source: `/ms/articles/category/${oldSlug}`, destination: `/ms/${path}`, permanent: true },
        ]
      }),
    ]
  },
}

export default nextConfig
