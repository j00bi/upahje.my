import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Footer from '@/components/layout/Footer'
import PillarNav from '@/components/articles/PillarNav'
import ArticlePreview from '@/components/articles/ArticlePreview'
import TopBar from '@/components/layout/TopBar'
import Pagination from '@/components/articles/Pagination'
import { copyFor } from '@/lib/copy'
import { articlePageCount, articlesForPage, languageCodes } from '@/lib/articles.mjs'
import { SITE_NAME, absolute, languagesFor, social } from '@/lib/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return languageCodes.flatMap((lang) => {
    const pages = articlePageCount(lang)
    return Array.from({ length: Math.max(0, pages - 1) }, (_, i) => ({ lang, page: String(i + 2) }))
  })
}

const pageNumber = (value: string): number => (/^\d+$/.test(value) ? Number(value) : NaN)

export function generateMetadata({ params }: { params: { lang: string; page: string } }): Metadata {
  const copy = copyFor(params.lang)
  const n = pageNumber(params.page)
  return {
    title: `${copy.journal} - page ${n} - ${SITE_NAME}`,
    description: copy.intro,
    alternates: { canonical: absolute(`/${params.lang}/articles/page/${n}`), languages: languagesFor(`/articles/page/${n}`) },
    robots: { index: false, follow: true },
    ...social(params.lang, `/${params.lang}/articles/page/${n}`, `${copy.journal} - page ${n} - ${SITE_NAME}`, copy.intro),
  }
}

export default function ArticlesPage({ params }: { params: { lang: string; page: string } }) {
  const lang = params.lang
  const copy = copyFor(lang)
  const n = pageNumber(params.page)
  const pages = articlePageCount(lang)
  if (!Number.isFinite(n) || n < 2 || n > pages) notFound()
  const articles = articlesForPage(n, lang)

  return (
    <div className="ui-canvas min-h-screen">
      <TopBar lang={lang} otherHref={`/${lang === 'en' ? 'ms' : 'en'}/articles`} />
      <header className="container-editorial" style={{ paddingTop: 'var(--space-10)', paddingBottom: 'var(--space-6)' }}>
        <h1 className="type-h1" style={{ color: 'var(--ui-ink)' }}>{copy.journal}</h1>
        <div className="mt-6"><PillarNav lang={lang} /></div>
      </header>
      <main className="container-editorial" style={{ paddingBottom: 'var(--space-12)' }}>
        <div>{articles.map((article) => <ArticlePreview key={article.slug} article={article} lang={lang} />)}</div>
        <Pagination page={n} pageCount={pages} lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  )
}
