import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import TopBar from '@/components/layout/TopBar'
import { languageCodes } from '@/lib/articles.mjs'
import { REPO_TOPICS } from '@/lib/repos.mjs'
import { SITE_NAME, absolute, languagesFor, social } from '@/lib/seo'

export const dynamicParams = false
export function generateStaticParams() {
  return languageCodes.map((lang) => ({ lang }))
}

const COPY = {
  en: {
    title: 'Repo directory',
    description: 'Open-source repos for video generation, game development and studio pipelines, with licence, stars and last push read from the GitHub API.',
    intro: 'Repos worth running for a job, grouped by what you want to build. Licence, stars and last push come from the GitHub API on the day the page was built, not from a README.',
    articles: 'articles',
  },
  ms: {
    title: 'Direktori repo',
    description: 'Repo sumber terbuka untuk penjanaan video, pembangunan permainan dan saluran studio, dengan lesen, bintang dan tarikh push terakhir daripada API GitHub.',
    intro: 'Repo yang berbaloi dijalankan untuk sesuatu kerja, dikumpulkan mengikut apa yang anda mahu bina. Lesen, bintang dan tarikh push terakhir diambil daripada API GitHub pada hari halaman ini dibina, bukan daripada README.',
    articles: 'artikel',
  },
} as const

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = params.lang === 'ms' ? 'ms' : 'en'
  const copy = COPY[lang]
  return { title: copy.title, description: copy.description, alternates: { canonical: absolute(`/${lang}/repos`), languages: languagesFor('/repos') }, ...social(lang, `/${lang}/repos`, copy.title, copy.description) }
}

export default function RepoIndex({ params }: { params: { lang: string } }) {
  const lang = params.lang === 'ms' ? 'ms' : 'en'
  const copy = COPY[lang]
  const other = lang === 'en' ? 'ms' : 'en'
  const total = REPO_TOPICS.reduce((n, t) => n + t.entries.length, 0)
  return (
    <div className="ui-canvas min-h-screen">
      <TopBar lang={lang} otherHref={`/${other}/repos`} />
      <main id="main" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <nav aria-label="Breadcrumb" className="text-[13px]" style={{ color: 'var(--ui-muted)' }}>
          <Link href={`/${lang}`} className="ui-link">{SITE_NAME}</Link>
          <span aria-hidden> / </span>
          <span>{copy.title}</span>
        </nav>
        <h1 className="mt-6 text-3xl leading-[1.15] tracking-[-0.02em] md:text-[40px]" style={{ color: 'var(--ui-ink)' }}>{copy.title}</h1>
        <p className="mt-3 max-w-[75ch] text-[17px] leading-8" style={{ color: 'var(--ui-body)' }}>{copy.intro}</p>
        <p className="mt-2 text-[14px]" style={{ color: 'var(--ui-muted)' }}>
          {total} {lang === 'ms' ? 'repo' : 'repos'} · GitHub API, 23 November 2026
        </p>
        <ul className="mt-10">
          {REPO_TOPICS.map((topic) => (
            <li key={topic.slug} className="py-6" style={{ borderTop: '1px solid var(--ui-rule)' }}>
              <Link href={`/${lang}/repos/${topic.slug}`} className="text-[21px] font-semibold" style={{ color: 'var(--ui-ink)' }}>
                {topic.title[lang]}
              </Link>
              <span className="ml-3 text-[14px]" style={{ color: 'var(--ui-muted)' }}>
                {topic.entries.length} {lang === 'ms' ? 'repo' : 'repos'}
              </span>
              <p className="mt-1 max-w-[70ch] text-[15px] leading-7" style={{ color: 'var(--ui-body)' }}>{topic.blurb[lang]}</p>
            </li>
          ))}
        </ul>
      </main>
      <Footer lang={lang} />
    </div>
  )
}
