import type { Metadata } from 'next'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Privacy — what this site does and does not collect',
  description: 'No accounts, no sign-up, no newsletter. What is collected is server logs and anonymous page counts.',
  alternates: { canonical: 'https://upahje.my/privacy' },
}

export default function Privacy() {
  return (
    <div className="ui-canvas min-h-screen">
      <main id="main" className="container-editorial" style={{ paddingTop: 'var(--space-10)', paddingBottom: 'var(--space-12)' }}>
        <h1 className="type-h1" style={{ color: 'var(--ui-ink)' }}>Privacy</h1>
        <p className="type-small mt-2" style={{ color: 'var(--ui-muted)' }}>Last updated 25 November 2026</p>

        <div className="type-body mt-6" style={{ color: 'var(--ui-body)', maxWidth: 'var(--measure)' }}>
          <p>
            This is a publication. There is no account to create, no sign-up, no comment section, no newsletter and no
            paywall. We do not ask for your name or your email, so there is no personal data of yours for us to hold.
          </p>

          <h2 className="type-h2 mt-8" style={{ color: 'var(--ui-ink)' }}>What is collected</h2>
          <p>Two things, both anonymous:</p>
          <ul className="mt-3" style={{ listStyle: 'disc', paddingLeft: '1.2em' }}>
            <li>
              Server logs from our host, Vercel: the page requested, the time, the referring page and an approximate
              location derived from the IP address. Standard web logs, held by the host under its own policy.
            </li>
            <li>
              Anonymous page counts from Vercel Analytics, which records that a page was viewed — without cookies and
              without a persistent identifier for you.
            </li>
          </ul>

          <h2 className="type-h2 mt-8" style={{ color: 'var(--ui-ink)' }}>What is not collected</h2>
          <p>
            No advertising trackers. No third-party analytics. No cookies set by us for tracking or profiling. No
            affiliate links. Nothing sold, rented or shared for marketing.
          </p>

          <h2 className="type-h2 mt-8" style={{ color: 'var(--ui-ink)' }}>If you write to us</h2>
          <p>
            Email to <a className="ui-link" href="mailto:husni@upahje.my">husni@upahje.my</a> reaches the editor and is kept
            only as long as it takes to answer, or to record a correction if that is what the message is about. Ask us to
            delete it and we will.
          </p>

          <h2 className="type-h2 mt-8" style={{ color: 'var(--ui-ink)' }}>Corrections</h2>
          <p>
            If something published here is wrong, say so on the <a className="ui-link" href="/en/corrections">corrections
            page</a>. That page records what changed and when, publicly.
          </p>
        </div>
      </main>
      <Footer lang="en" />
    </div>
  )
}
