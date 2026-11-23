import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Footer from '@/components/layout/Footer'
import TopBar from '@/components/layout/TopBar'
import { languageCodes } from '@/lib/articles.mjs'
import { REPO_TOPICS } from '@/lib/repos.mjs'
import { SITE_NAME, absolute, languagesFor, social } from '@/lib/seo'

export const dynamicParams = false
export function generateStaticParams() {
  return languageCodes.flatMap((lang) => REPO_TOPICS.map((t) => ({ lang, topic: t.slug })))
}

const L = {
  en: { repo: 'Repo', what: 'What it is', licence: 'Licence', stars: 'Stars', pushed: 'Last push', status: 'Status', left: 'What we left out, and why', gaps: 'No open repo for these jobs', note: 'Descriptions are the repositories\' own words, quoted; licence, stars and last push are the GitHub API fields read on 23 November 2026.', api: 'no licence reported' },
  ms: { repo: 'Repo', what: 'Apa ia', licence: 'Lesen', stars: 'Bintang', pushed: 'Push terakhir', status: 'Status', left: 'Apa yang kami tinggalkan, dan mengapa', gaps: 'Tiada repo terbuka untuk kerja ini', note: 'Penerangan ialah kata-kata repo itu sendiri, dipetik; lesen, bintang dan push terakhir ialah medan API GitHub yang dibaca pada 23 November 2026.', api: 'tiada lesen dilaporkan' },
} as const

export function generateMetadata({ params }: { params: { lang: string; topic: string } }): Metadata {
  const lang = params.lang === 'ms' ? 'ms' : 'en'
  const topic = REPO_TOPICS.find((t) => t.slug === params.topic)
  if (!topic) return {}
  const path = `/${lang}/repos/${topic.slug}`
  return { title: `${topic.title[lang]} repos`, description: topic.blurb[lang], alternates: { canonical: absolute(path), languages: languagesFor(`/repos/${topic.slug}`) }, ...social(lang, path, `${topic.title[lang]} repos`, topic.blurb[lang]) }
}

export default function TopicRepos({ params }: { params: { lang: string; topic: string } }) {
  const lang = params.lang === 'ms' ? 'ms' : 'en'
  const copy = L[lang]
  const topic = REPO_TOPICS.find((t) => t.slug === params.topic)
  if (!topic) notFound()
  const other = lang === 'en' ? 'ms' : 'en'

  return (
    <div className="ui-canvas min-h-screen">
      <TopBar lang={lang} otherHref={`/${other}/repos/${topic.slug}`} />
      <main id="main" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <nav aria-label="Breadcrumb" className="text-[13px]" style={{ color: 'var(--ui-muted)' }}>
          <Link href={`/${lang}`} className="ui-link">{SITE_NAME}</Link>
          <span aria-hidden> / </span>
          <Link href={`/${lang}/repos`} className="ui-link">{lang === 'ms' ? 'Direktori repo' : 'Repo directory'}</Link>
          <span aria-hidden> / </span>
          <span>{topic.title[lang]}</span>
        </nav>
        <h1 className="mt-6 text-3xl leading-[1.15] tracking-[-0.02em] md:text-[40px]" style={{ color: 'var(--ui-ink)' }}>{topic.title[lang]}</h1>
        <p className="mt-3 max-w-[75ch] text-[17px] leading-8" style={{ color: 'var(--ui-body)' }}>{topic.blurb[lang]}</p>
        <p className="mt-2 text-[13px]" style={{ color: 'var(--ui-muted)' }}>{topic.entries.length} repos · GitHub API, 23 November 2026</p>

        <div className="mt-8 max-w-full overflow-x-auto">
          <table className="w-full border-collapse text-left text-[14px] leading-6" style={{ borderTop: '1px solid var(--ui-rule)', borderBottom: '1px solid var(--ui-rule)' }}>
            <thead>
              <tr>
                {[copy.repo, copy.what, copy.licence, copy.stars, copy.pushed, copy.status].map((h) => (
                  <th key={h} scope="col" className="px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: 'var(--ui-muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topic.entries.map((r: { repo: string; url: string; desc: string; licence: string; stars: number; pushed: string; activity: string; docs: string }) => (
                <tr key={r.repo}>
                  <td className="px-3 py-3 align-top" style={{ borderTop: '1px solid var(--ui-rule)' }}>
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="font-medium" style={{ color: 'var(--ui-accent)' }}>{r.repo}</a>
                    {r.docs.startsWith('http') && (
                      <span className="mt-1 block text-[12px]"><a href={r.docs} target="_blank" rel="noopener noreferrer" className="ui-link" style={{ color: 'var(--ui-muted)' }}>docs</a></span>
                    )}
                  </td>
                  <td className="px-3 py-3 align-top" style={{ color: 'var(--ui-body)', borderTop: '1px solid var(--ui-rule)' }}>{r.desc}</td>
                  <td className="px-3 py-3 align-top text-[13px]" style={{ color: r.licence === 'NOASSERTION' ? '#8a5a00' : 'var(--ui-muted)', borderTop: '1px solid var(--ui-rule)' }}>
                    {r.licence === 'NOASSERTION' ? `NOASSERTION (${copy.api})` : r.licence}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 align-top text-[13px] tabular-nums" style={{ color: 'var(--ui-muted)', borderTop: '1px solid var(--ui-rule)' }}>{r.stars.toLocaleString('en-US')}</td>
                  <td className="whitespace-nowrap px-3 py-3 align-top text-[13px] tabular-nums" style={{ color: 'var(--ui-muted)', borderTop: '1px solid var(--ui-rule)' }}>{r.pushed}</td>
                  <td className="px-3 py-3 align-top text-[13px]" style={{ color: r.activity.startsWith('quiet') ? '#8a5a00' : 'var(--ui-body)', borderTop: '1px solid var(--ui-rule)' }}>{r.activity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 max-w-[80ch] text-[13px] leading-6" style={{ color: 'var(--ui-muted)' }}>{copy.note}</p>

        {topic.gaps && topic.gaps.length > 0 && (
          <section className="mt-10" aria-labelledby="gaps">
            <h2 id="gaps" className="text-[18px] font-semibold" style={{ color: 'var(--ui-ink)' }}>{copy.gaps}</h2>
            <table className="mt-3 w-full border-collapse text-left text-[14px] leading-6">
              <tbody>
                {topic.gaps.map((g: { job: string; note: string }) => (
                  <tr key={g.job}>
                    <td className="w-48 px-3 py-2 align-top" style={{ color: 'var(--ui-ink)', borderTop: '1px solid var(--ui-rule)' }}>{g.job}</td>
                    <td className="px-3 py-2 align-top" style={{ color: 'var(--ui-body)', borderTop: '1px solid var(--ui-rule)' }}>{g.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {topic.rejected.length > 0 && (
          <details className="mt-10">
            <summary className="cursor-pointer text-[16px] font-semibold" style={{ color: 'var(--ui-ink)' }}>{copy.left}</summary>
            <ul className="mt-3 space-y-2 text-[14px] leading-6" style={{ color: 'var(--ui-body)' }}>
              {topic.rejected.map((r: { repo: string; reason: string }) => (
                <li key={r.repo}><span className="font-medium" style={{ color: 'var(--ui-ink)' }}>{r.repo}</span> — {r.reason}</li>
              ))}
            </ul>
          </details>
        )}
      </main>
      <Footer lang={lang} />
    </div>
  )
}
