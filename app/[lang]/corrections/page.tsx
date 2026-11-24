import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import TopBar from '@/components/layout/TopBar'
import { languageCodes } from '@/lib/articles.mjs'
import { absolute, languagesFor, social } from '@/lib/seo'

export const dynamicParams = false
export function generateStaticParams() {
  return languageCodes.map((lang) => ({ lang }))
}

const COPY = {
  en: {
    title: 'Corrections',
    description: 'How to report an error in an UpahJe article, and what happens next: acknowledged within two business days, fixed or explained within seven.',
    body: 'If something on this site is wrong, tell us. Send the article URL, the sentence, and what the correct version should be.',
    contact: 'corrections@upahje.my',
    slaTitle: 'What happens next',
    sla: [
      'We acknowledge your message within two business days.',
      'We fix the error or explain why we believe the article is correct within seven business days.',
      'A fixed error is noted in the article\u2019s changelog with the date, unless the change is purely typographical.',
    ],
    whatTitle: 'What counts as an error',
    what: 'A number that does not match its source, a date that is wrong, a claim attributed to the wrong publisher, a link that no longer supports what we said it supports, or a translation that changes the meaning.',
    siteTitle: 'Where we publish corrections',
    site: 'A correction that changes what a reader would do is stated in the article, not quietly edited. Structural changes are listed in the changelog entry carried in the article\u2019s metadata.',
    policy: 'Editorial policy',
    back: 'About UpahJe',
  },
  ms: {
    title: 'Pembetulan',
    description: 'Cara melaporkan kesilapan dalam artikel UpahJe, dan apa yang berlaku selepas itu: diakui dalam dua hari bekerja, dibetulkan atau dijelaskan dalam tujuh hari.',
    body: 'Jika ada yang salah di laman ini, beritahu kami. Sertakan URL artikel, ayat berkenaan, dan versi yang betul sepatutnya.',
    contact: 'corrections@upahje.my',
    slaTitle: 'Apa yang berlaku selepas itu',
    sla: [
      'Kami mengakui mesej anda dalam dua hari bekerja.',
      'Kami membetulkan kesilapan atau menjelaskan mengapa kami percaya artikel itu betul dalam tujuh hari bekerja.',
      'Kesilapan yang dibetulkan dicatat dalam changelog artikel dengan tarikhnya, kecuali perubahan itu hanya tipografi.',
    ],
    whatTitle: 'Apa yang dianggap kesilapan',
    what: 'Angka yang tidak sepadan dengan sumbernya, tarikh yang salah, dakwaan yang diberikan kepada penerbit yang salah, pautan yang tidak lagi menyokong apa yang kami katakan, atau terjemahan yang mengubah maksud.',
    siteTitle: 'Di mana pembetulan diterbitkan',
    site: 'Pembetulan yang mengubah apa yang pembaca akan lakukan dinyatakan dalam artikel, bukan diedit secara senyap. Perubahan struktur disenaraikan dalam changelog yang dibawa dalam metadata artikel.',
    policy: 'Dasar editorial',
    back: 'Tentang UpahJe',
  },
} as const

type Lang = keyof typeof COPY

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (params.lang === 'ms' ? 'ms' : 'en') as Lang
  const copy = COPY[lang]
  const path = `/${lang}/corrections`
  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: absolute(path), languages: languagesFor('/corrections') },
    ...social(lang, path, copy.title, copy.description),
  }
}

export default function Corrections({ params }: { params: { lang: string } }) {
  const lang = (params.lang === 'ms' ? 'ms' : 'en') as Lang
  const copy = COPY[lang]
  const other = lang === 'en' ? 'ms' : 'en'

  return (
    <div className="ui-canvas min-h-screen">
      <TopBar lang={lang} otherHref={`/${other}/corrections`} />
      <main id="main" className="container-editorial" style={{ paddingTop: 'var(--space-12)', paddingBottom: 'var(--space-12)' }}>
        <h1 className="type-h1" style={{ color: 'var(--ui-ink)' }}>{copy.title}</h1>
        <div style={{ maxWidth: 'var(--measure)' }}>
          <p className="type-body mt-5" style={{ color: 'var(--ui-body)' }}>{copy.body}</p>
          <p className="type-body mt-2" style={{ color: 'var(--ui-body)' }}>
            <a href="mailto:corrections@upahje.my" className="ui-link" style={{ color: 'var(--ui-accent)' }}>{copy.contact}</a>
          </p>

          <h2 className="type-h3 mt-10" style={{ color: 'var(--ui-ink)' }}>{copy.slaTitle}</h2>
          <ol className="mt-3 space-y-2 type-body" style={{ color: 'var(--ui-body)' }}>
            {copy.sla.map((line) => (<li key={line}>{line}</li>))}
          </ol>

          <h2 className="type-h3 mt-10" style={{ color: 'var(--ui-ink)' }}>{copy.whatTitle}</h2>
          <p className="type-body mt-2" style={{ color: 'var(--ui-body)' }}>{copy.what}</p>

          <h2 className="type-h3 mt-10" style={{ color: 'var(--ui-ink)' }}>{copy.siteTitle}</h2>
          <p className="type-body mt-2" style={{ color: 'var(--ui-body)' }}>{copy.site}</p>

          <p className="mt-10">
            <Link href={`/${lang}/editorial-policy`} className="ui-link type-small" style={{ color: 'var(--ui-accent)' }}>{copy.policy}</Link>
          </p>
          <p className="mt-3">
            <Link href={`/${lang}/about`} className="ui-link type-small" style={{ color: 'var(--ui-accent)' }}>{copy.back}</Link>
          </p>
        </div>
      </main>
      <Footer lang={lang} />
    </div>
  )
}
