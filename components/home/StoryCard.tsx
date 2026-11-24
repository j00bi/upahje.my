import Link from 'next/link'
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
      {article.cardFigure && (
        <p className="type-small mt-2" style={{ color: 'var(--ui-ink)', fontWeight: 600 }}>{article.cardFigure}</p>
      )}
      <p className="type-small mt-2" style={{ color: 'var(--ui-muted)' }}>
        <time dateTime={isoDate(article.date)}>{formatDate(article.date, lang)}</time>
        {' · '}
        {article.readingTime} {copy.read}
      </p>
      {verified && (
        <p className="type-small mt-1" style={{ color: 'var(--ui-muted)' }}>
          {copy.verifiedOn} <time dateTime={verified}>{formatDate(verified, lang)}</time>
        </p>
      )}
    </article>
  )
}
