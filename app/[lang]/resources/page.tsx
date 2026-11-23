import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import TopBar from '@/components/layout/TopBar'
import { languageCodes, languageByCode } from '@/lib/articles.mjs'
import { RESOURCES, evidenceLabel } from '@/lib/resources'
import { SITE_NAME, absolute, languagesFor, social } from '@/lib/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return languageCodes.map((lang) => ({ lang }))
}

const COPY = {
  en: {
    title: 'Library: the repos, SDKs and price pages behind the articles',
    description:
      'Every repository, SDK and price page the articles cite, with a licence note and whether we ran it, read it, or only installed it.',
    heading: 'Library',
    intro:
      'The repos, SDKs and price pages behind the articles. Each row says what it is, what licence it carries where we could read one, and how far we got with it: run here, read, or installed and not run.',
    name: 'Name',
    what: 'What it is',
    licence: 'Licence',
    evidence: 'Evidence',
    checked: 'Checked',
  },
  ms: {
    title: 'Pustaka: repo, SDK dan halaman harga di sebalik artikel',
    description:
      'Setiap repo, SDK dan halaman harga yang dipetik artikel, dengan nota lesen dan sama ada kami menjalankannya, membacanya, atau hanya memasangnya.',
    heading: 'Pustaka',
    intro:
      'Repo, SDK dan halaman harga di sebalik artikel. Setiap baris menyatakan apa ia, lesen yang dibawanya jika kami dapat membacanya, dan sejauh mana kami menggunakannya: dijalankan di sini, dibaca, atau dipasang tetapi tidak dijalankan.',
    name: 'Nama',
    what: 'Apa ia',
    licence: 'Lesen',
    evidence: 'Bukti',
    checked: 'Disemak',
  },
} as const

type Lang = keyof typeof COPY

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (params.lang === 'ms' ? 'ms' : 'en') as Lang
  const copy = COPY[lang]
  const path = `/${lang}/resources`
  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: absolute(path), languages: languagesFor('/resources') },
    ...social(lang, path, copy.title, copy.description),
  }
}

export default function ResourcesPage({ params }: { params: { lang: string } }) {
  const lang = (params.lang === 'ms' ? 'ms' : 'en') as Lang
  const copy = COPY[lang]
  const other = lang === 'en' ? 'ms' : 'en'

  return (
    <div className="ui-canvas min-h-screen">
      <TopBar lang={lang} otherHref={`/${other}/resources`} />
      <main id="main" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <nav aria-label="Breadcrumb" className="text-[13px]" style={{ color: 'var(--ui-muted)' }}>
          <Link href={`/${lang}`} className="ui-link">{SITE_NAME}</Link>
          <span aria-hidden> / </span>
          <span>{copy.heading}</span>
        </nav>
        <header className="mt-6 max-w-3xl">
          <h1 className="text-3xl leading-[1.15] tracking-[-0.02em] md:text-[40px]" style={{ color: 'var(--ui-ink)' }}>
            {copy.heading}
          </h1>
          <p className="mt-4 text-[17px] leading-8" style={{ color: 'var(--ui-body)' }}>{copy.intro}</p>
        </header>

        {RESOURCES.map((group) => (
          <section key={group.id} className="mt-12" aria-labelledby={`g-${group.id}`}>
            <h2 id={`g-${group.id}`} className="text-[22px] font-semibold tracking-[-0.01em]" style={{ color: 'var(--ui-ink)' }}>
              {group.title[lang]}
            </h2>
            <p className="mt-2 max-w-[70ch] text-[15px] leading-7" style={{ color: 'var(--ui-muted)' }}>{group.note[lang]}</p>
            <div className="mt-5 max-w-full overflow-x-auto">
              <table className="w-full border-collapse text-left text-[15px] leading-6" style={{ borderTop: '1px solid var(--ui-rule)', borderBottom: '1px solid var(--ui-rule)' }}>
                <thead>
                  <tr>
                    {[copy.name, copy.what, copy.licence, copy.evidence, copy.checked].map((h) => (
                      <th key={h} scope="col" className="px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: 'var(--ui-muted)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {group.entries.map((entry) => (
                    <tr key={entry.name}>
                      <td className="px-3 py-3 align-top" style={{ borderTop: '1px solid var(--ui-rule)' }}>
                        <a href={entry.url} target="_blank" rel="noopener noreferrer" className="font-medium" style={{ color: 'var(--ui-accent)' }}>{entry.name}</a>
                        {entry.repo && (
                          <span className="mt-1 block text-[13px]" style={{ color: 'var(--ui-muted)' }}>
                            <a href={entry.repo} target="_blank" rel="noopener noreferrer" className="ui-link">source</a>
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-3 align-top" style={{ color: 'var(--ui-body)', borderTop: '1px solid var(--ui-rule)' }}>{entry.what[lang]}</td>
                      <td className="px-3 py-3 align-top text-[14px]" style={{ color: 'var(--ui-muted)', borderTop: '1px solid var(--ui-rule)' }}>{entry.licence ?? 'not published'}</td>
                      <td className="px-3 py-3 align-top text-[14px]" style={{ color: 'var(--ui-body)', borderTop: '1px solid var(--ui-rule)' }}>{evidenceLabel[entry.evidence][lang]}</td>
                      <td className="whitespace-nowrap px-3 py-3 align-top text-[14px] tabular-nums" style={{ color: 'var(--ui-muted)', borderTop: '1px solid var(--ui-rule)' }}>{entry.checked}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </main>
      <Footer lang={lang} />
    </div>
  )
}
