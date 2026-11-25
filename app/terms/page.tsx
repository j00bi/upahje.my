import type { Metadata } from 'next'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Terms — how this publication works',
  description: 'UpahJe.my is a publication, not a marketplace. No accounts, no transactions. What you may quote, and what the writing is and is not.',
  alternates: { canonical: 'https://upahje.my/terms' },
}

export default function Terms() {
  return (
    <div className="ui-canvas min-h-screen">
      <main id="main" className="container-editorial" style={{ paddingTop: 'var(--space-10)', paddingBottom: 'var(--space-12)' }}>
        <h1 className="type-h1" style={{ color: 'var(--ui-ink)' }}>Terms</h1>
        <p className="type-small mt-2" style={{ color: 'var(--ui-muted)' }}>Last updated 25 November 2026</p>

        <div className="type-body mt-6" style={{ color: 'var(--ui-body)', maxWidth: 'var(--measure)' }}>
          <p>
            UpahJe.my is a publication about running a small business in Malaysia. It is not a marketplace, a job board
            or a payment service. Nothing is sold here, no account exists, and no transaction takes place on this site.
          </p>

          <h2 className="type-h2 mt-8" style={{ color: 'var(--ui-ink)' }}>The writing is information, not advice</h2>
          <p>
            Articles explain rules, rates and arithmetic as they stood on the date shown, with the primary source cited.
            They are not legal, tax or accounting advice for your particular business, and reading one does not create a
            professional relationship. Rules change; verify against the source we cite before you act.
          </p>

          <h2 className="type-h2 mt-8" style={{ color: 'var(--ui-ink)' }}>Accuracy and corrections</h2>
          <p>
            Every article carries a verification date. When we get something wrong we correct it and record the change
            on the <a className="ui-link" href="/en/corrections">corrections page</a>. If you find an error, write to
            <a className="ui-link" href="mailto:husni@upahje.my"> husni@upahje.my</a>.
          </p>

          <h2 className="type-h2 mt-8" style={{ color: 'var(--ui-ink)' }}>Quoting us</h2>
          <p>
            Quote freely, with attribution and a link to the article. Short excerpts are welcome. Republishing a whole
            article is not — ask first. Where a piece is itself a credited repost of someone else&apos;s work, the
            original author&apos;s rights apply, not ours.
          </p>

          <h2 className="type-h2 mt-8" style={{ color: 'var(--ui-ink)' }}>Independence</h2>
          <p>
            We do not accept payment for coverage, placement or reviews. Where a piece mentions a product we have used,
            nothing was given to us in exchange for the mention.
          </p>

          <h2 className="type-h2 mt-8" style={{ color: 'var(--ui-ink)' }}>How the writing is produced</h2>
          <p>
            Some articles are researched and drafted with AI assistance, then checked, edited and signed off by a human
            editor against primary sources. The byline tells you who stands behind the piece: a named editor, or the
            UpahJe Desk for house writing. The <a className="ui-link" href="/en/about">about page</a> sets out the
            process.
          </p>
        </div>
      </main>
      <Footer lang="en" />
    </div>
  )
}
