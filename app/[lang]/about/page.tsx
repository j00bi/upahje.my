import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import TopBar from '@/components/layout/TopBar'
import { languageCodes, languageByCode } from '@/lib/articles.mjs'
import { SITE_NAME, absolute, languagesFor, social } from '@/lib/seo'

export const dynamicParams = false
export function generateStaticParams() {
  return languageCodes.map((lang) => ({ lang }))
}

const COPY = {
  en: {
    title: 'About UpahJe',
    description: 'An independent Malaysian publication about the technology, money and operations decisions a small business actually makes.',
    intro:
      'UpahJe publishes short, sourced articles for people running or building a small business in Malaysia. Every claim carries a source and a date, and where we could not verify something we say so instead of filling the gap.',
    independence: 'We do not accept payment for coverage, placement or reviews.',
    bylines: 'Who writes it',
    editorName: 'Husni Ahmad',
    editorRole: 'Editor',
    editorBody:
      'Writes the pieces that involve running something: benchmark teardowns, hands-on tests, and opinions. If an article reports a command that was executed or a number measured on a machine, it carries this byline.',
    deskName: 'UpahJe Desk',
    deskRole: 'House byline',
    deskBody:
      'UpahJe Desk is a house byline for pieces produced with AI assistance and reviewed by the editor. It is not a person, and it claims no credentials.',
    contactLabel: 'Reach the editor',
    corrections: 'Corrections',
    correctionsBody:
      'If something here is wrong, tell us and we will fix it and note the change. A correction is a normal event, not an embarrassment.',
    back: 'Read the articles',
  },
  ms: {
    title: 'Tentang UpahJe',
    description: 'Penerbitan bebas Malaysia tentang keputusan teknologi, wang dan operasi yang sebenarnya dibuat perniagaan kecil.',
    intro:
      'UpahJe menerbitkan artikel pendek bersumber untuk orang yang menjalankan atau membina perniagaan kecil di Malaysia. Setiap dakwaan membawa sumber dan tarikh, dan jika kami tidak dapat mengesahkan sesuatu, kami menyatakannya dan bukan mengisi jurang itu.',
    independence: 'Kami tidak menerima bayaran untuk liputan, penempatan atau ulasan.',
    bylines: 'Siapa yang menulis',
    editorName: 'Husni Ahmad',
    editorRole: 'Editor',
    editorBody:
      'Menulis artikel yang melibatkan sesuatu yang dijalankan: bedah penanda aras, ujian sendiri, dan pendapat. Jika artikel melaporkan arahan yang dijalankan atau angka yang diukur pada mesin, ia membawa nama ini.',
    deskName: 'UpahJe Desk',
    deskRole: 'Nama rumah',
    deskBody:
      'UpahJe Desk ialah nama rumah untuk artikel yang dihasilkan dengan bantuan AI dan disemak oleh editor. Ia bukan seorang individu, dan ia tidak mendakwa sebarang kelayakan.',
    contactLabel: 'Hubungi editor',
    corrections: 'Pembetulan',
    correctionsBody:
      'Jika ada yang salah di sini, beritahu kami dan kami akan betulkan serta catat perubahannya. Pembetulan ialah perkara biasa, bukan sesuatu yang memalukan.',
    back: 'Baca artikel',
  },
} as const

type Lang = keyof typeof COPY

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (params.lang === 'ms' ? 'ms' : 'en') as Lang
  const copy = COPY[lang]
  const path = `/${lang}/about`
  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: absolute(path), languages: languagesFor('/about') },
    ...social(lang, path, copy.title, copy.description),
  }
}

export default function AboutPage({ params }: { params: { lang: string } }) {
  const lang = (params.lang === 'ms' ? 'ms' : 'en') as Lang
  const copy = COPY[lang]
  const other = lang === 'en' ? 'ms' : 'en'

  return (
    <div className="ui-canvas min-h-screen">
      <TopBar lang={lang} otherHref={`/${other}/about`} />
      <main id="main" className="container-editorial" style={{ paddingTop: 'var(--space-12)', paddingBottom: 'var(--space-12)' }}>
        <h1 className="type-h1" style={{ color: 'var(--ui-ink)' }}>{copy.title}</h1>
        <p className="type-body mt-5" style={{ color: 'var(--ui-body)', maxWidth: 'var(--measure)' }}>{copy.intro}</p>
        <p className="type-body mt-3" style={{ color: 'var(--ui-body)', maxWidth: 'var(--measure)' }}>{copy.independence}</p>

        <h2 className="type-h3 mt-12" style={{ color: 'var(--ui-ink)' }}>{copy.bylines}</h2>
        <dl className="mt-5" style={{ maxWidth: 'var(--measure)' }}>
          <dt className="type-h4" style={{ color: 'var(--ui-ink)' }}>
            {copy.editorName} <span className="type-small" style={{ color: 'var(--ui-muted)' }}>· {copy.editorRole}</span>
          </dt>
          <dd className="type-small mt-1" style={{ color: 'var(--ui-body)' }}>{copy.editorBody}</dd>
          <dt className="type-h4 mt-6" style={{ color: 'var(--ui-ink)' }}>
            {copy.deskName} <span className="type-small" style={{ color: 'var(--ui-muted)' }}>· {copy.deskRole}</span>
          </dt>
          <dd className="type-small mt-1" style={{ color: 'var(--ui-body)' }}>{copy.deskBody}</dd>
        </dl>

        <p className="type-small mt-8" style={{ color: 'var(--ui-body)' }}>
          {copy.contactLabel}: <a href="mailto:husni@upahje.my" className="ui-link" style={{ color: 'var(--ui-accent)' }}>husni@upahje.my</a>
        </p>

        <h2 className="type-h3 mt-12" style={{ color: 'var(--ui-ink)' }}>{copy.corrections}</h2>
        <p className="type-body mt-3" style={{ color: 'var(--ui-body)', maxWidth: 'var(--measure)' }}>{copy.correctionsBody}</p>

        <p className="mt-10">
          <Link href={`/${lang}/articles`} className="ui-link type-small" style={{ color: 'var(--ui-accent)' }}>{copy.back}</Link>
        </p>
      </main>
      <Footer lang={lang} />
    </div>
  )
}
