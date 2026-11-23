import Link from 'next/link'
import { formatDate, isoDate } from '@/lib/articles.mjs'
import { mappingFor, pillarBySlug } from '@/lib/pillars.mjs'

/**
 * Archive preview with what a reader needs to choose: topic, headline,
 * standfirst, date, reading time. No card chrome; rows separated by hairlines.
 */
export default function ArticlePreview({ article, lang }: { article: any; lang: string }) {
  const map = mappingFor(article)
  const pillar = map ? pillarBySlug(map.pillar) : null
  const topic = pillar ? (lang === 'ms' ? pillar.nameMs : pillar.nameEn) : null
  return (
    <article className="py-8" style={{ borderTop: '1px solid var(--ui-rule)' }}>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        {topic && (
          <Link href={`/${lang}/articles/category/${pillar.slug}`} className="type-label ui-link" style={{ color: 'var(--ui-accent)' }}>
            {topic}
          </Link>
        )}
        <time dateTime={isoDate(article.date)} className="type-small" style={{ color: 'var(--ui-muted)' }}>
          {formatDate(article.date, lang)}
        </time>
        <span className="type-small" style={{ color: 'var(--ui-muted)' }}>{article.readingTime} min read</span>
      </div>
      <h2 className="type-h2 mt-2" style={{ color: 'var(--ui-ink)' }}>
        <Link href={`/${article.lang}/articles/${article.slug}`} className="ui-link" style={{ color: 'var(--ui-ink)' }}>
          {article.title}
        </Link>
      </h2>
      <p className="type-body mt-2" style={{ color: 'var(--ui-body)', maxWidth: 'var(--measure)' }}>
        {article.description}
      </p>
    </article>
  )
}
