import { languageCodes, publishedArticles } from '@/lib/articles.mjs'
import { SITE_NAME, absolute } from '@/lib/seo'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return languageCodes.map((lang) => ({ lang }))
}

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function GET(_request: Request, { params }: { params: { lang: string } }) {
  const lang = params.lang
  const articles = publishedArticles(lang)
  const home = absolute(`/${lang}/articles`)
  const feed = absolute(`/${lang}/articles/feed.xml`)
  const items = articles
    .map((article) => {
      const url = absolute(`/${lang}/articles/${article.slug}`)
      return `    <item>
      <title>${escape(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(article.description)}</description>
      <pubDate>${new Date(`${article.date}T00:00:00Z`).toUTCString()}</pubDate>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xml:lang="${lang === 'ms' ? 'ms-MY' : 'en-MY'}">
  <channel>
    <title>${SITE_NAME} — ${lang === 'ms' ? 'Artikel' : 'Articles'}</title>
    <link>${home}</link>
    <description>${lang === 'ms' ? 'Jawapan mudah tentang teknologi untuk perniagaan kecil Malaysia.' : 'Plain answers about technology for Malaysian small businesses.'}</description>
    <language>${lang === 'ms' ? 'ms-MY' : 'en-MY'}</language>
    <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${feed}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}

