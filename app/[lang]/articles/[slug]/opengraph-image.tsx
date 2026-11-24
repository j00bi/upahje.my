import { ImageResponse } from 'next/og'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { formatDate, getArticle, languageCodes, publishedArticles, verifiedOn } from '@/lib/articles.mjs'
import { TOPIC_MAPPING, topicBySlug } from '@/lib/topics.mjs'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'UpahJe.my article card'

/** Render every published article's card at build time, not per request. */
export function generateStaticParams() {
  return languageCodes.flatMap((lang) => publishedArticles(lang).map((article) => ({ lang, slug: article.slug })))
}

const font = (name: string) => readFileSync(path.join(process.cwd(), 'assets', 'fonts', name))
const fonts = [
  { name: 'Inter', data: font('inter-400.ttf'), weight: 400 as const, style: 'normal' as const },
  { name: 'Inter', data: font('inter-600.ttf'), weight: 600 as const, style: 'normal' as const },
  { name: 'Archivo', data: font('archivo-600.ttf'), weight: 600 as const, style: 'normal' as const },
  { name: 'Newsreader', data: font('newsreader-500.ttf'), weight: 500 as const, style: 'normal' as const },
]

/**
 * Per-article card in the site's own identity: paper canvas, forest and ink,
 * lime only as a rule, Archivo for the headline, Inter for labels, Newsreader
 * for the wordmark. The verified date is the newest `checked` among the
 * article's own sources, never today.
 */
export default async function Image({ params }: { params: { lang: string; slug: string } }) {
  const article = getArticle(params.lang, params.slug)
  const lang = params.lang
  const topic = article ? TOPIC_MAPPING[article.translationKey] : null
  const topicEntry = topic ? topicBySlug(topic.topic) : null
  const topicLabel = topicEntry ? (lang === 'ms' ? topicEntry.ms : topicEntry.en) : ''
  const verified = article ? verifiedOn(article) : null
  const title = article?.title ?? 'UpahJe.my'
  const checked = verified ? formatDate(verified, lang) : null

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#FAF9F5',
          color: '#242824',
          padding: '56px 64px',
          fontFamily: 'Inter',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '2px solid #25382B', paddingTop: 22 }}>
          <div style={{ display: 'flex', fontFamily: 'Newsreader', fontSize: 34, color: '#25382B' }}>UpahJe.my</div>
          <div style={{ display: 'flex', fontSize: 22, color: '#1A6B2E', fontWeight: 600 }}>
            {topicLabel}
          </div>
        </div>

        <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Archivo',
              fontWeight: 600,
              fontSize: 64,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              color: '#242824',
              maxWidth: 1010,
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', width: 120, height: 6, background: '#9FE870' }} />
          <div style={{ display: 'flex', fontSize: 20, color: '#6C7468' }}>
            {checked ? `${lang === 'ms' ? 'Disahkan pada' : 'Verified on'} ${checked}` : lang === 'ms' ? 'Penerbitan bebas Malaysia' : 'An independent Malaysian publication'}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  )
}
