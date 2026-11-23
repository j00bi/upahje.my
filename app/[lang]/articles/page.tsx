import type { Metadata } from 'next'
import Footer from '@/components/layout/Footer'
import PillarNav from '@/components/articles/PillarNav'
import ArticlePreview from '@/components/articles/ArticlePreview'
import TopBar from '@/components/layout/TopBar'
import Pagination from '@/components/articles/Pagination'
import { copyFor } from '@/lib/copy'
import { articlePageCount, articlesForPage } from '@/lib/articles.mjs'
import { SITE_NAME, absolute, languagesFor, social } from '@/lib/seo'

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const copy = copyFor(params.lang)
  return {
    title: copy.journal,
    description: copy.intro,
    alternates: { canonical: absolute(`/${params.lang}/articles`), languages: languagesFor('/articles') },
    ...social(params.lang, `/${params.lang}/articles`, `${copy.journal} - ${SITE_NAME}`, copy.intro),
  }
}

export default function ArticlesIndex({ params }: { params: { lang: string } }) {
  const lang = params.lang
  const copy = copyFor(lang)
  const articles = articlesForPage(1, lang)
  const pages = articlePageCount(lang)

  return (
    <div className="ui-canvas min-h-screen">
      <TopBar lang={lang} otherHref={`/${lang === 'en' ? 'ms' : 'en'}/articles`} />
      <header className="container-editorial" style={{ paddingTop: 'var(--space-10)', paddingBottom: 'var(--space-6)' }}>
        <h1 className="type-h1" style={{ color: 'var(--ui-ink)' }}>{copy.journal}</h1>
        <p className="type-body mt-3" style={{ color: 'var(--ui-body)', maxWidth: 'var(--measure)' }}>{copy.intro}</p>
        <div className="mt-6"><PillarNav lang={lang} /></div>
      </header>

      <main className="container-editorial" style={{ paddingBottom: 'var(--space-12)' }}>
        {articles.length === 0 ? (
          <p className="type-body py-10" style={{ color: 'var(--ui-muted)', borderTop: '1px solid var(--ui-rule)' }}>{copy.empty}</p>
        ) : (
          <div>{articles.map((article) => <ArticlePreview key={article.slug} article={article} lang={lang} />)}</div>
        )}
        <Pagination page={1} pageCount={pages} lang={lang} />
      </main>

      <Footer lang={lang} />
    </div>
  )
}
