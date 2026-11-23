import type { Metadata } from 'next'
import Footer from '@/components/layout/Footer'
import TopBar from '@/components/layout/TopBar'
import ArticlePreview from '@/components/articles/ArticlePreview'
import { copyFor } from '@/lib/copy'
import { developerArticles } from '@/lib/articles.mjs'
import { SITE_NAME, absolute, languagesFor, social } from '@/lib/seo'

/**
 * Developer notes: the only publication listing that includes
 * `audience: developer` pieces. The archive, homepage and topic pages exclude
 * them; their article URLs stay live and stay in the sitemap.
 */
export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const description = params.lang === 'ms'
    ? 'Nota teknikal untuk pembangun: ukuran, alat dan cara ia diuji.'
    : 'Technical notes for developers: measurements, tools and how they were tested.'
  return {
    title: { absolute: 'Developer notes' },
    description,
    alternates: { canonical: absolute(`/${params.lang}/dev-notes`), languages: languagesFor('/dev-notes') },
    ...social(params.lang, `/${params.lang}/dev-notes`, 'Developer notes', description),
  }
}

export default function DevNotes({ params }: { params: { lang: string } }) {
  const lang = params.lang
  const copy = copyFor(lang)
  const notes = developerArticles(lang)
  const heading = lang === 'ms' ? 'Nota pembangun' : 'Developer notes'
  const standfirst = lang === 'ms'
    ? 'Nota teknikal tentang ukuran, alat dan cara ia diuji. Ditulis untuk pembangun, bukan untuk pembeli.'
    : 'Technical notes about measurements, tools and how they were tested. Written for developers, not buyers.'

  return (
    <div className="ui-canvas min-h-screen">
      <TopBar lang={lang} otherHref={`/${lang === 'en' ? 'ms' : 'en'}/dev-notes`} />
      <header className="container-editorial" style={{ paddingTop: 'var(--space-10)', paddingBottom: 'var(--space-6)' }}>
        <p className="type-label" style={{ color: 'var(--ui-accent)' }}>{SITE_NAME}</p>
        <h1 className="type-h1 mt-3" style={{ color: 'var(--ui-ink)' }}>{heading}</h1>
        <p className="type-body mt-3" style={{ color: 'var(--ui-body)', maxWidth: 'var(--measure)' }}>{standfirst}</p>
      </header>

      <main className="container-editorial" style={{ paddingBottom: 'var(--space-12)' }}>
        {notes.length === 0 ? (
          <p className="type-body py-10" style={{ color: 'var(--ui-muted)', borderTop: '1px solid var(--ui-rule)' }}>
            {lang === 'ms' ? 'Belum ada nota pembangun.' : 'No developer notes yet.'}
          </p>
        ) : (
          <div>{notes.map((article) => <ArticlePreview key={article.slug} article={article} lang={lang} />)}</div>
        )}
      </main>

      <Footer lang={lang} />
    </div>
  )
}
