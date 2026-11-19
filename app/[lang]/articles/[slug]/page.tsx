import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import TopBar from '@/components/layout/TopBar'
import ArticleToc from '@/components/articles/ArticleToc'
import ApiFlowFigure from '@/components/articles/ApiFlowFigure'
import FaqList from '@/components/articles/FaqList'
import { Markdown } from '@/lib/markdown'
import { copyFor } from '@/lib/copy'
import { extractFaq } from '@/lib/faq'
import { cleanText } from '@/lib/text'
import { articleJsonLd, definedTermJsonLd, faqJsonLd } from '@/lib/jsonld'
import { extractHeadings, splitFaq, splitShortAnswer } from '@/lib/article-view'
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
  const headings = extractHeadings(withoutFaq)
  const faq = extractFaq(article.body)
  const otherHref = pair ? `/${pair.lang}/articles/${pair.slug}` : `/${article.lang === 'en' ? 'ms' : 'en'}/articles`

  return (
    <div className="ui-canvas min-h-screen">
      <TopBar lang={article.lang} otherHref={otherHref} />
      <main id="main" className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <nav aria-label="Breadcrumb" className="ui-mono text-[12px]" style={{ color: 'var(--ui-muted)' }}>
          <Link href={`/${article.lang}/articles`} className="ui-link">Articles</Link>
          <span aria-hidden> / </span>
          <Link href={`/${article.lang}/articles/category/${article.category}`} className="ui-link">
            {categoryLabel}
          </Link>
        </nav>

        <header className="mt-6">
          <h1 className="text-3xl leading-[1.1] tracking-tight md:text-4xl" style={{ color: 'var(--ui-ink)' }}>
            {cleanText(article.title)}
          </h1>
          <div
            className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]"
            style={{ color: 'var(--ui-muted)' }}
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

        <div className="mt-10 lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
          <aside className="hidden lg:block">
            <div className="sticky" style={{ top: '88px' }}>
              <ArticleToc items={headings} />
            </div>
          </aside>

          <div className="min-w-0">
            {short && (
              <div className="mb-10 pl-5" style={{ borderLeft: '2px solid var(--ui-accent)' }}>
                <p className="ui-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: 'var(--ui-muted)' }}>
                  Short answer
                </p>
                <p className="mt-2 text-[17px] leading-[1.7]" style={{ color: 'var(--ui-body)' }}>
                  {cleanText(short)}
                </p>
              </div>
            )}

            <ApiFlowFigure />

            <div className="max-w-[68ch]">
              <Markdown source={withoutFaq} />
            </div>

            <div className="max-w-[68ch]">
              <FaqList items={faq} />
            </div>

            {article.sources.length > 0 && (
              <section aria-labelledby="sources" className="mt-14 max-w-[68ch]">
                <h2 id="sources" className="ui-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: 'var(--ui-muted)' }}>
                  Sources
                </h2>
                <ol className="mt-4 space-y-3 text-[13px] leading-6">
                  {article.sources.map((source, index) => (
                    <li key={source.url} id={`source-${index + 1}`} className="flex gap-3">
                      <a
                        href={`#source-${index + 1}`}
                        aria-label={`Source ${index + 1}`}
                        className="ui-mono shrink-0 tabular-nums"
                        style={{ color: 'var(--ui-accent)' }}
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
                          <span className="ui-mono mt-1 block text-[11px]" style={{ color: 'var(--ui-muted)' }}>
                            checked {source.checked}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            <footer className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t pt-6 text-[13px]" style={{ borderColor: 'var(--ui-rule)', color: 'var(--ui-muted)' }}>
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
