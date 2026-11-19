import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import TopBar from '@/components/layout/TopBar'
import ArticleToc from '@/components/articles/ArticleToc'
import FaqList from '@/components/articles/FaqList'
import ReadNext from '@/components/articles/ReadNext'
import { Markdown } from '@/lib/markdown'
import { copyFor } from '@/lib/copy'
import { extractFaq } from '@/lib/faq'
import { cleanText } from '@/lib/text'
import { articleJsonLd, definedTermJsonLd, faqJsonLd } from '@/lib/jsonld'
import { extractHeadings, splitFaq, splitReadNext, splitShortAnswer } from '@/lib/article-view'
import { articleLanguages, absolute, SITE_NAME } from '@/lib/seo'
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
    },
    twitter: { card: 'summary', title, description },
  }
}

export default function ArticlePage({ params }: { params: { lang: string; slug: string } }) {
  const article = getArticle(params.lang, params.slug)
  if (!article) notFound()
  if (article.draft && process.env.NODE_ENV === 'production') notFound()

  const copy = copyFor(article.lang)
  const pair = translatedArticle(article)
  const category = categoryBySlug(article.category)
  const categoryLabel = category?.label[article.lang] || article.category
  const url = absolute(`/${article.lang}/articles/${article.slug}`)

  const body = bodyWithoutTitle(article.body, article.title)
  const { short, rest } = splitShortAnswer(body)
  const { withoutFaq } = splitFaq(rest)
  const { body: articleBody, items: readNext } = splitReadNext(withoutFaq)
  const headings = extractHeadings(articleBody)
  const faq = extractFaq(article.body)
  const otherHref = pair ? `/${pair.lang}/articles/${pair.slug}` : `/${article.lang === 'en' ? 'ms' : 'en'}/articles`

  return (
    <div className="ui-canvas min-h-screen">
      <TopBar lang={article.lang} otherHref={otherHref} />
      <main id="main" className="mx-auto max-w-6xl px-4 sm:px-6" style={{ paddingTop: 'var(--space-top)', paddingBottom: 'var(--space-section)' }}>
        <nav aria-label="Breadcrumb" className="text-[13px]" style={{ color: 'var(--ui-muted)' }}>
          <Link href={`/${article.lang}/articles`} className="ui-link">Articles</Link>
          <span aria-hidden> / </span>
          <Link href={`/${article.lang}/articles/category/${article.category}`} className="ui-link">
            {categoryLabel}
          </Link>
        </nav>

        <header style={{ marginTop: 'var(--space-sources)' }}>
          <h1 className="text-3xl leading-[1.12] tracking-[-0.02em] md:text-[36px]" style={{ color: 'var(--ui-ink)' }}>
            {cleanText(article.title)}
          </h1>
          <div
            className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]"
            style={{ color: 'var(--ui-muted)', marginTop: 'var(--space-title-meta)' }}
          >
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
        </header>

        <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12" style={{ marginTop: 'var(--space-first-h2)' }}>
          <aside className="article-toc hidden lg:block">
            <div className="sticky" style={{ top: '88px' }}>
              <ArticleToc items={headings} />
            </div>
          </aside>

          <div className="min-w-0">
            {short && (
              <div className="pl-5" style={{ borderLeft: '2px solid var(--ui-accent)', marginBottom: 'var(--space-section)' }}>
                <p className="text-[11px] uppercase tracking-[0.08em]" style={{ color: 'var(--ui-muted)' }}>
                  Short answer
                </p>
                <p className="mt-2 text-[17px] leading-[1.7]" style={{ color: 'var(--ui-body)' }}>
                  {cleanText(short)}
                </p>
              </div>
            )}

            <div className="article-body max-w-[68ch]">
              <Markdown source={articleBody} />
            </div>

            <div className="max-w-[68ch]">
              <ReadNext label={copy.readNext} items={readNext} />
            </div>

            <div className="max-w-[68ch]" style={{ marginTop: 'var(--space-section)' }}>
              <FaqList items={faq} />
            </div>

            {article.sources.length > 0 && (
              <section aria-labelledby="sources" className="max-w-[68ch]" style={{ marginTop: 'var(--space-sources)' }}>
                <h2 id="sources" className="text-[13px] font-semibold" style={{ color: 'var(--ui-ink)' }}>
                  Sources
                </h2>
                <ol className="mt-4 space-y-3 text-[13px] leading-6">
                  {article.sources.map((source, index) => (
                    <li key={source.url} id={`source-${index + 1}`} className="flex gap-3">
                      <a
                        href={`#source-${index + 1}`}
                        aria-label={`Source ${index + 1}`}
                        className="shrink-0 tabular-nums"
                        style={{ color: 'var(--ui-ink)' }}
                      >
                        {index + 1}
                      </a>
                      <span className="min-w-0">
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ui-link font-medium underline decoration-1 underline-offset-2"
                          style={{ color: 'var(--ui-ink)' }}
                        >
                          {cleanText(source.title)}
                        </a>
                        <span className="block break-all" style={{ color: 'var(--ui-muted)' }}>{source.url}</span>
                        {source.checked && (
                          <span className="mt-1 block text-[13px] tabular-nums" style={{ color: 'var(--ui-muted)' }}>
                            checked {source.checked}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            <footer className="flex flex-wrap items-center justify-between gap-4 border-t pt-6 text-[13px]" style={{ borderColor: 'var(--ui-rule)', color: 'var(--ui-muted)', marginTop: 'var(--space-section)' }}>
              <span>
                Last updated <time dateTime={isoDate(article.updated || article.date)}>{formatDate(article.updated || article.date, article.lang)}</time>
              </span>
              <Link href={`/${article.lang}/articles/category/${article.category}`} className="ui-link font-semibold" style={{ color: 'var(--ui-ink)' }}>
                More {categoryLabel}
              </Link>
            </footer>
          </div>
        </div>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article, url)) }} />
      {faq.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faq)) }} />
      )}
      {article.category === 'definitions' && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermJsonLd(article, url)) }} />
      )}
    </div>
  )
}
