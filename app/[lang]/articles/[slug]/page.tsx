import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Footer from '@/components/layout/Footer'
import LanguageSwitch from '@/components/articles/LanguageSwitch'
import { Markdown } from '@/lib/markdown'
import { copyFor } from '@/lib/copy'
import { extractFaq } from '@/lib/faq'
import { articleJsonLd, definedTermJsonLd, faqJsonLd } from '@/lib/jsonld'
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
  // The route is the canonical URL. A frontmatter `canonical` is kept for
  // publishers but never trusted here: a stale one silently de-indexes the page.
  const url = absolute(`/${article.lang}/articles/${article.slug}`)
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: url, ...(pair ? { languages: articleLanguages(article, pair) } : {}) },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      url,
      siteName: SITE_NAME,
      locale: article.lang === 'ms' ? 'ms_MY' : 'en_MY',
      publishedTime: article.date,
      modifiedTime: article.updated || article.date,
      authors: [article.author],
      tags: article.tags,
    },
    twitter: {
      card: 'summary',
      title: article.title,
      description: article.description,
    },
  }
}

export default function ArticlePage({ params }: { params: { lang: string; slug: string } }) {
  const article = getArticle(params.lang, params.slug)
  if (!article) notFound()
  // A draft is never public. In `next dev` it still renders so an author can
  // read it; a production build does not generate it and it 404s on demand.
  if (article.draft && process.env.NODE_ENV === 'production') notFound()

  const copy = copyFor(article.lang)
  const pair = translatedArticle(article)
  const body = bodyWithoutTitle(article.body, article.title)
  const faq = extractFaq(body)
  const category = categoryBySlug(article.category)
  const url = absolute(`/${article.lang}/articles/${article.slug}`)

  return (
    <div className="min-h-screen bg-canvas">
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href={`/${article.lang}/articles`} className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
            ← {copy.back}
          </Link>
          <LanguageSwitch
            lang={article.lang}
            hrefs={pair ? { en: `/en/articles/${article.lang === 'en' ? article.slug : pair.slug}`, ms: `/ms/articles/${article.lang === 'ms' ? article.slug : pair.slug}` } : { en: '/en/articles', ms: '/ms/articles' }}
          />
        </div>

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.14em]">
            <Link href={`/${article.lang}/articles/category/${article.category}`} className="text-emerald-700 hover:text-emerald-800">
              {category?.label[article.lang] || article.category}
            </Link>
            {article.draft && <span className="rounded-pill bg-warning px-2 py-0.5 text-ink">draft</span>}
          </div>
          <h1 className="font-display-xl mt-4 text-ink">{article.title}</h1>
          <p className="mt-4 text-lg leading-8 text-body">{article.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-y border-neutral-200 py-3 text-sm text-mute">
            <span className="font-medium text-ink">{article.author}</span>
            <span aria-hidden>·</span>
            <span>
              {copy.published} <time dateTime={isoDate(article.date)}>{formatDate(article.date, article.lang)}</time>
            </span>
            {article.updated && article.updated !== article.date && (
              <>
                <span aria-hidden>·</span>
                <span>
                  {copy.updated} <time dateTime={isoDate(article.updated)}>{formatDate(article.updated, article.lang)}</time>
                </span>
              </>
            )}
            <span aria-hidden>·</span>
            <span>{article.readingTime} {copy.read}</span>
          </div>
        </header>

        <div className="mt-8">
          <Markdown source={body} />
        </div>

        {article.sources.length > 0 && (
          <section aria-labelledby="sources" className="mt-12 rounded-lg border border-neutral-200 bg-canvas-soft p-6">
            <h2 id="sources" className="font-display-sm text-ink">{copy.sources}</h2>
            <ol className="mt-4 space-y-3 text-sm leading-6 text-body">
              {article.sources.map((source) => (
                <li key={source.url} className="flex flex-col gap-0.5">
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="font-medium text-emerald-700 underline decoration-emerald-300 underline-offset-2 hover:text-emerald-800">
                    {source.title}
                  </a>
                  <span className="break-all text-mute">{source.url}</span>
                  {source.checked && <span className="text-xs text-mute">checked {source.checked}</span>}
                </li>
              ))}
            </ol>
          </section>
        )}

        {article.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span key={tag} className="rounded-pill border border-neutral-200 px-3 py-1 text-xs text-mute">
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article, url)) }} />
      {faq.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faq)) }} />
      )}
      {article.category === 'definitions' && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermJsonLd(article, url)) }} />
      )}

      <Footer lang={article.lang} />
    </div>
  )
}
