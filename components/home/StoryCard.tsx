import Link from 'next/link'

// A card figure that restates the headline ("A RM3,000 hire costs RM3,448.50 a
// month" under the same sentence) is noise. Keep it only when it adds a number
// the headline does not already carry.
const words = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().split(' ').filter(Boolean)
function repeatsTitle(title: string, figure: string) {
  const titleWords = new Set(words(title))
  const figureWords = words(figure)
  if (!figureWords.length) return false
  const overlap = figureWords.filter((word) => titleWords.has(word)).length / figureWords.length
  return overlap >= 0.7
}
import { formatDate, isoDate, verifiedOn } from '@/lib/articles.mjs'
import { TOPIC_MAPPING, topicLabel } from '@/lib/topics.mjs'

/**
 * Homepage card. Shows a verified-on line only when the article's own sources
 * carry dates, and a ringgit figure only when frontmatter `cardFigure` exists.
 * Nothing is derived from the body and nothing is invented.
 */
export default function StoryCard({ article, lang, copy }: { article: any; lang: string; copy: any }) {
  const map = TOPIC_MAPPING[article.translationKey]
  const topic = map ? topicLabel(map.topic, lang) : null
  const verified = verifiedOn(article)
  return (
    <article className="flex h-full flex-col" style={{ borderTop: '1px solid var(--ui-rule)', paddingTop: 'var(--space-4)' }}>
      {topic && <p className="type-label" style={{ color: 'var(--ui-accent)' }}>{topic}</p>}
      <h3 className="type-h4 mt-2" style={{ color: 'var(--ui-ink)' }}>
        <Link href={`/${article.lang}/articles/${article.slug}`} className="ui-link" style={{ color: 'var(--ui-ink)' }}>
          {article.title}
        </Link>
      </h3>
      <p
        className="type-small mt-2"
        style={{
          color: 'var(--ui-body)',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          lineClamp: 2,
          overflow: 'hidden',
        }}
      >
        {article.description}
      </p>
      {article.cardFigure && !repeatsTitle(article.title, article.cardFigure) && (
        <p className="type-small mt-2" style={{ color: 'var(--ui-ink)', fontWeight: 600 }}>{article.cardFigure}</p>
      )}
      <p className="type-small mt-2" style={{ color: 'var(--ui-muted)' }}>
        <time dateTime={isoDate(article.date)}>{formatDate(article.date, lang)}</time>
        {' · '}
        {article.readingTime} {copy.read}
      </p>
      {/* A re-check only means something when it happened after publication. */}
      {verified && verified > article.date && (
        <p className="type-small mt-1" style={{ color: 'var(--ui-muted)' }}>
          {copy.verifiedOn} <time dateTime={verified}>{formatDate(verified, lang)}</time>
        </p>
      )}
    </article>
  )
}
