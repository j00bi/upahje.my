import type { Metadata } from 'next'
import Footer from '@/components/layout/Footer'
import TopBar from '@/components/layout/TopBar'
import { allArticles, formatDate, languageCodes } from '@/lib/articles.mjs'
import { copyFor } from '@/lib/copy'
import { requireReview, couldNotVerifyCount, lastTouched, thesis } from '@/lib/review'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Draft review',
  robots: { index: false, follow: false },
}

export default function ReviewIndex({ params, searchParams }: { params: { lang: string }; searchParams: { k?: string } }) {
  requireReview(searchParams.k)
  const lang = params.lang
  const copy = copyFor(lang)
  // One list, both languages: a language column is only meaningful if the page
  // is not already filtered by language, and an approver should see everything.
  const drafts = languageCodes
    .flatMap((code) => allArticles(code).filter((article) => article.draft))
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))

  return (
    <div className="ui-canvas min-h-screen">
      <TopBar lang={lang} otherHref={`/${lang === 'en' ? 'ms' : 'en'}/review?k=${searchParams.k}`} />
      <main id="main" className="container-editorial" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-12)' }}>
        <h1 className="type-h1" style={{ color: 'var(--ui-ink)' }}>Drafts awaiting approval</h1>
        <p className="type-small mt-2" style={{ color: 'var(--ui-muted)' }}>
          {lang === 'ms' ? 'Pratonton draf. Tidak diterbitkan.' : 'Draft previews. Not published.'}
        </p>

        {drafts.length === 0 ? (
          <p className="type-body mt-8">{lang === 'ms' ? 'Tiada draf.' : 'No drafts.'}</p>
        ) : (
          <div className="mt-8" style={{ borderTop: '1px solid var(--ui-rule)' }}>
            {drafts.map((article) => {
              const touched = lastTouched(article.file)
              return (
                <article key={article.slug} className="py-6" style={{ borderBottom: '1px solid var(--ui-rule)' }}>
                  <p className="type-label" style={{ color: 'var(--ui-accent)' }}>{article.lang === 'ms' ? 'Bahasa Melayu' : 'English'} · {lang === 'ms' ? 'draf' : 'draft'}</p>
                  <h2 className="type-h3 mt-2" style={{ color: 'var(--ui-ink)' }}>
                    <a href={`/${article.lang}/review/${article.slug}?k=${searchParams.k}`} className="ui-link" style={{ color: 'var(--ui-ink)' }}>{article.title}</a>
                  </h2>
                  <p className="type-small mt-2" style={{ color: 'var(--ui-body)' }}>{thesis(article.description)}</p>
                  <dl className="type-small mt-3 flex flex-wrap gap-x-6 gap-y-1" style={{ color: 'var(--ui-muted)' }}>
                    <div><dt className="inline">{lang === 'ms' ? 'Perkataan' : 'Words'}: </dt><dd className="inline">{article.wordCount}</dd></div>
                    <div><dt className="inline">{lang === 'ms' ? 'Sumber' : 'Sources'}: </dt><dd className="inline">{article.sources.length}</dd></div>
                    <div><dt className="inline">{lang === 'ms' ? 'Belum dapat disahkan' : 'Could not verify'}: </dt><dd className="inline">{couldNotVerifyCount(article.body)}</dd></div>
                    <div>
                      <dt className="inline">{lang === 'ms' ? 'Kemas kini' : 'Last commit'}: </dt>
                      <dd className="inline"><time dateTime={touched.date}>{formatDate(touched.date, lang)}</time>{touched.source === 'mtime' ? ' (file date)' : ''}</dd>
                    </div>
                  </dl>
                </article>
              )
            })}
          </div>
        )}
        <p className="type-small mt-8" style={{ color: 'var(--ui-muted)' }}>
          {lang === 'ms'
            ? 'Tarikh sentuh terakhir datang daripada git apabila tersedia; jika tidak, tarikh fail digunakan dan ditanda “(file date)”.'
            : 'Last-touched dates come from git where available; otherwise the file date is used and marked “(file date)”.'}
        </p>
      </main>
      <Footer lang={lang} />
    </div>
  )
}
