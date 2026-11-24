import { publishedArticles } from './articles.mjs'
import { SITE_NAME, absolute } from './seo'

const esc = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const rfc822 = (iso) => new Date(`${iso}T00:00:00+08:00`).toUTCString()

const TITLES = { en: 'UpahJe.my', ms: 'UpahJe.my' }
const DESCRIPTIONS = {
  en: 'Plain answers about technology for Malaysian small businesses. Every claim carries a source and the date it was checked.',
  ms: 'Jawapan mudah tentang teknologi untuk perniagaan kecil Malaysia. Setiap dakwaan membawa sumber dan tarikh semakan.',
}
const SECTION = { en: 'Articles', ms: 'Artikel' }

/**
 * One RSS 2.0 feed per language, built from the corpus at build time, so a
 * publish updates it on the next deploy with no manual step. Summary rather
 * than full content: the article page carries the sources and the changelog,
 * and a feed that strips them would be the wrong reading of the piece.
 */
export function feedXml(lang) {
  const articles = publishedArticles(lang)
    .slice()
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
  const self = absolute(`/${lang}/feed.xml`)
  const home = absolute(`/${lang}/articles`)
  const updated = articles[0]?.updated || articles[0]?.date

  const items = articles
    .map((article) => {
      const url = absolute(`/${lang}/articles/${article.slug}`)
      return [
        '    <item>',
        `      <title>${esc(article.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${rfc822(article.date)}</pubDate>`,
        `      <description>${esc(article.description)}</description>`,
        `      <dc:creator xmlns:dc="http://purl.org/dc/elements/1.1/">${esc(article.author)}</dc:creator>`,
        ...(article.tags || []).slice(0, 4).map((tag) => `      <category>${esc(tag)}</category>`),
        '    </item>',
      ].join('\n')
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(`${TITLES[lang]} — ${SECTION[lang]}`)}</title>
    <link>${home}</link>
    <description>${esc(DESCRIPTIONS[lang])}</description>
    <language>${lang === 'ms' ? 'ms-MY' : 'en-MY'}</language>
    <atom:link href="${self}" rel="self" type="application/rss+xml"/>
    ${updated ? `<lastBuildDate>${rfc822(updated)}</lastBuildDate>` : ''}
    <copyright>© ${new Date().getUTCFullYear()} ${SITE_NAME}</copyright>
${items}
  </channel>
</rss>
`
}
