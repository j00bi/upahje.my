import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import TopBar from '@/components/layout/TopBar'
import ArticleToc from '@/components/articles/ArticleToc'
import ReadingProgress from '@/components/articles/ReadingProgress'
import ShareControls from '@/components/articles/ShareControls'
import FaqList from '@/components/articles/FaqList'
import { Markdown } from '@/lib/markdown'
import { copyFor } from '@/lib/copy'
import { extractFaq } from '@/lib/faq'
import { cleanText } from '@/lib/text'
import { articleJsonLd, definedTermJsonLd, faqJsonLd } from '@/lib/jsonld'
import { extractHeadings, splitFaq, splitShortAnswer } from '@/lib/article-view'
import { articleLanguages, absolute, SITE_NAME, OG_IMAGE } from '@/lib/seo'
import { REPOS_BY_KEY } from '@/lib/article-repos'
import { TOPIC_MAPPING, topicBySlug, relatedFor } from '@/lib/topics.mjs'
import {
  bodyWithoutTitle,
  categoryBySlug,
  formatDate,
  getArticle,
  isoDate,
  languageCodes,
  publishedArticles,
  translatedArticle,
} from '@/lib/articles.mjs'

export const dynamicParams = true

export function generateStaticParams() {
  return languageCodes.flatMap((lang) => publishedArticles(lang).map((article) => ({ lang, slug: article.slug })))
}

export function generateMetadata({ params }: { params: { lang: string; slug: string } }): Metadata {
  const article = getArticle(params.lang, params.slug)
  if (!article) return {}
  const pair = translatedArticle(article)
  const url = absolute(`/${article.lang}/articles/${article.slug}`)
  const title = cleanText(article.title)
  const description = cleanText(article.description)
  return {
    title,
    description,
    alternates: { canonical: url, ...(pair ? { languages: articleLanguages(article, pair) } : {}) },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: article.lang === 'ms' ? 'ms_MY' : 'en_MY',
      publishedTime: article.date,
      modifiedTime: article.updated || article.date,
      authors: [cleanText(article.author)],
      tags: article.tags.map(cleanText),
      images: [OG_IMAGE],
    },
    twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE.url] },
  }
}

export default function ArticlePage({ params }: { params: { lang: string; slug: string } }) {
  const article = getArticle(params.lang, params.slug)
  if (!article) notFound()
  if (article.draft && process.env.NODE_ENV === 'production') notFound()

  const copy = copyFor(article.lang)
  const pair = translatedArticle(article)
  const legacyCategory = categoryBySlug(article.category)
  const mapping = TOPIC_MAPPING[article.translationKey]
  const topicEntry = mapping ? topicBySlug(mapping.topicEntry) : null
  const topicLabel = topicEntry ? (article.lang === 'ms' ? topicEntry.nameMs : topicEntry.nameEn) : legacyCategory?.label[article.lang] || article.category
  const topicHref = topicEntry ? `/${article.lang}/topics/${topicEntry.slug}` : `/${article.lang}/topics`
  const url = absolute(`/${article.lang}/articles/${article.slug}`)

  const body = bodyWithoutTitle(article.body, article.title)
  const { short, rest } = splitShortAnswer(body)
  const { withoutFaq } = splitFaq(rest)
  const headings = extractHeadings(withoutFaq)
  const faq = extractFaq(article.body)
  const related = relatedFor(article)
  const otherHref = pair ? `/${pair.lang}/articles/${pair.slug}` : `/${article.lang === 'en' ? 'ms' : 'en'}/articles`

  return (
    <div className="ui-canvas min-h-screen">
      <ReadingProgress />
      <TopBar lang={article.lang} otherHref={otherHref} />

      <main id="main" className="container-editorial" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-12)' }}>
        <nav aria-label="Breadcrumb" className="type-small" style={{ color: 'var(--ui-muted)' }}>
          <Link href={`/${article.lang}/articles`} className="ui-link">Articles</Link>
          <span aria-hidden> / </span>
          <Link href={topicHref} className="ui-link">{topicLabel}</Link>
        </nav>

        <header style={{ marginTop: 'var(--space-5)', maxWidth: 'var(--measure)' }}>
          <h1 className="type-h1 mt-3" style={{ color: 'var(--ui-ink)' }}>{cleanText(article.title)}</h1>
          <p className="type-body mt-4" style={{ color: 'var(--ui-body)' }}>{cleanText(article.description)}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 type-small" style={{ color: 'var(--ui-muted)' }}>
            <span>{cleanText(article.author)}</span>
            <span className="sm:border-l sm:pl-3" style={{ borderColor: 'var(--ui-rule)' }}>
              Published <time dateTime={isoDate(article.date)}>{formatDate(article.date, article.lang)}</time>
            </span>
            {article.updated && article.updated !== article.date && (
              <span className="sm:border-l sm:pl-3" style={{ borderColor: 'var(--ui-rule)' }}>
                Updated <time dateTime={isoDate(article.updated)}>{formatDate(article.updated, article.lang)}</time>
              </span>
            )}
            <span className="sm:border-l sm:pl-3" style={{ borderColor: 'var(--ui-rule)' }}>
              {article.readingTime} {copy.read}
            </span>
          </div>

          <div className="mt-5">
            <ShareControls
              title={cleanText(article.title)}
              url={url}
              labels={{ share: copy.share, copy: copy.copyLink, copied: copy.copied, failed: copy.copyFailed }}
            />
          </div>
        </header>

        <div className="mt-10 lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-12">
          <aside className="article-toc mb-8 lg:mb-0">
            <div className="lg:sticky" style={{ top: '88px' }}>
              <p className="type-label mb-2" style={{ color: 'var(--ui-muted)' }}>{copy.contents}</p>
              <ArticleToc items={headings} />
            </div>
          </aside>

          <div className="min-w-0">
            {short && (
              <div className="pl-5" style={{ borderLeft: '2px solid var(--ui-lime)', marginBottom: 'var(--space-section)', maxWidth: 'var(--measure)' }}>
                <p className="type-label" style={{ color: 'var(--ui-muted)' }}>Short answer</p>
                <p className="type-body mt-2" style={{ color: 'var(--ui-body)' }}>{cleanText(short)}</p>
              </div>
            )}

            <div className="article-body" style={{ maxWidth: 'var(--measure)' }}>
              <Markdown source={withoutFaq} />
            </div>

            <div style={{ maxWidth: 'var(--measure)', marginTop: 'var(--space-section)' }}>
              <FaqList items={faq} />
            </div>

            {REPOS_BY_KEY[article.translationKey] && (
              <section aria-labelledby="repos" style={{ maxWidth: 'var(--measure)', marginTop: 'var(--space-sources)' }}>
                <h2 id="repos" className="type-small" style={{ color: 'var(--ui-ink)', fontWeight: 600 }}>
                  {article.lang === 'ms' ? 'Repo dan SDK' : 'Repos and SDKs'}
                </h2>
                <ul className="mt-4 space-y-2 type-small">
                  {REPOS_BY_KEY[article.translationKey]!.map((repo) => (
                    <li key={repo.url} className="flex flex-wrap gap-x-2">
                      <a href={repo.url} target="_blank" rel="noopener noreferrer" className="ui-link" style={{ color: 'var(--ui-accent)', fontWeight: 600 }}>
                        {repo.name}
                      </a>
                      <span style={{ color: 'var(--ui-muted)' }}>{repo.note[article.lang === 'ms' ? 'ms' : 'en']}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {article.sources.length > 0 && (
              <section aria-labelledby="sources" style={{ maxWidth: 'var(--measure)', marginTop: 'var(--space-sources)' }}>
                <h2 id="sources" className="type-small" style={{ color: 'var(--ui-ink)', fontWeight: 600 }}>Sources</h2>
                <ol className="mt-4 space-y-3 type-small">
                  {article.sources.map((source, index) => (
                    <li key={source.url} id={`source-${index + 1}`} className="flex gap-3">
                      <a href={`#source-${index + 1}`} aria-label={`Source ${index + 1}`} className="shrink-0 tabular-nums" style={{ color: 'var(--ui-ink)' }}>
                        {index + 1}
                      </a>
                      <span className="min-w-0">
                        <a href={source.url} target="_blank" rel="noopener noreferrer" className="ui-link underline decoration-1 underline-offset-2" style={{ color: 'var(--ui-ink)', fontWeight: 500 }}>
                          {cleanText(source.title)}
                        </a>
                        <span className="block break-all" style={{ color: 'var(--ui-muted)' }}>{source.url}</span>
                        {source.checked && <span className="mt-1 block tabular-nums" style={{ color: 'var(--ui-muted)' }}>checked {source.checked}</span>}
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {related.length > 0 && (
              <section aria-labelledby="related" style={{ maxWidth: 'var(--measure)', marginTop: 'var(--space-section)' }}>
                <h2 id="related" className="type-h3" style={{ color: 'var(--ui-ink)' }}>{copy.related}</h2>
                <ul className="mt-4" style={{ borderTop: '1px solid var(--ui-rule)' }}>
                  {related.map((item) => (
                    <li key={item.slug} className="py-4" style={{ borderBottom: '1px solid var(--ui-rule)' }}>
                      <Link href={`/${item.lang}/articles/${item.slug}`} className="ui-link type-h4" style={{ color: 'var(--ui-ink)' }}>
                        {cleanText(item.title)}
                      </Link>
                      <p className="type-small mt-1" style={{ color: 'var(--ui-muted)' }}>{item.readingTime} {copy.read}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <footer className="flex flex-wrap items-center justify-between gap-4 border-t pt-6 type-small" style={{ borderColor: 'var(--ui-rule)', color: 'var(--ui-muted)', marginTop: 'var(--space-section)' }}>
              <span>
                Last updated <time dateTime={isoDate(article.updated || article.date)}>{formatDate(article.updated || article.date, article.lang)}</time>
              </span>
              <Link href={topicHref} className="ui-link" style={{ color: 'var(--ui-ink)', fontWeight: 600 }}>More {topicLabel}</Link>
            </footer>
          </div>
        </div>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article, url)) }} />
      {faq.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faq)) }} />}
      {article.category === 'definitions' && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermJsonLd(article, url)) }} />}
    </div>
  )
}
