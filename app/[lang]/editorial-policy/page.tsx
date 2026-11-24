import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import TopBar from '@/components/layout/TopBar'
import { languageCodes } from '@/lib/articles.mjs'
import { SITE_NAME, absolute, languagesFor, social } from '@/lib/seo'

export const dynamicParams = false
export function generateStaticParams() {
  return languageCodes.map((lang) => ({ lang }))
}

const COPY = {
  en: {
    title: 'Editorial policy',
    description: 'How UpahJe decides what to publish, where its money comes from, and how it uses AI in production. No affiliate links or paid placement today.',
    editor: 'Editor',
    editorLine: 'Husni Ahmad is the editor and is accountable for everything published here.',
    contact: 'Contact',
    contactLine: 'husni@upahje.my',
    moneyTitle: 'How this is funded',
    moneyBody: 'There are no affiliate links on this site and no paid placement today. No vendor has paid for an article, a ranking, a mention or a link, and none has reviewed a draft before publication. If that ever changes, the disclosure will appear inline at the affected link and on this page, with the date it changed.',
    evidenceTitle: 'What a claim needs',
    evidenceBody: 'Every claim is checked at the primary document where one exists. Every number carries a source and the date that source was checked. Where we could not verify something, the article says so and names what is missing rather than filling the gap. A vendor page is cited as a vendor page, never as independent evidence.',
    aiTitle: 'AI use',
    aiBody: 'Articles are produced with AI assistance and reviewed and edited by the editor before publication. Pieces that involve running software, measuring something or arguing a position carry the editor\u2019s byline; desk-written explainers and guides carry the house byline, UpahJe Desk, which is explained on the About page.',
    corrections: 'Corrections policy',
    back: 'About UpahJe',
  },
  ms: {
    title: 'Dasar editorial',
    description: 'Bagaimana UpahJe memutuskan apa yang diterbitkan, dari mana wangnya datang, dan bagaimana AI digunakan. Tiada pautan afiliasi atau penempatan berbayar buat masa ini.',
    editor: 'Editor',
    editorLine: 'Husni Ahmad ialah editor dan bertanggungjawab atas semua yang diterbitkan di sini.',
    contact: 'Hubungi',
    contactLine: 'husni@upahje.my',
    moneyTitle: 'Bagaimana ini dibiayai',
    moneyBody: 'Tiada pautan afiliasi di laman ini dan tiada penempatan berbayar buat masa ini. Tiada vendor membayar untuk artikel, kedudukan, sebutan atau pautan, dan tiada yang menyemak draf sebelum terbit. Jika itu berubah, pendedahannya akan muncul terus pada pautan berkenaan dan di halaman ini, dengan tarikh ia berubah.',
    evidenceTitle: 'Apa yang diperlukan oleh sesuatu dakwaan',
    evidenceBody: 'Setiap dakwaan disemak pada dokumen utama jika ada. Setiap angka membawa sumber dan tarikh sumber itu disemak. Jika kami tidak dapat mengesahkan sesuatu, artikel menyatakannya dan menamakan apa yang tiada dan bukan mengisi jurang itu. Halaman vendor dipetik sebagai halaman vendor, tidak pernah sebagai bukti bebas.',
    aiTitle: 'Penggunaan AI',
    aiBody: 'Artikel dihasilkan dengan bantuan AI dan disemak serta diedit oleh editor sebelum terbit. Artikel yang melibatkan menjalankan perisian, mengukur sesuatu atau berhujah pendirian membawa nama editor; penjelasan dan panduan yang ditulis meja membawa nama rumah, UpahJe Desk, yang dijelaskan di halaman Tentang.',
    corrections: 'Dasar pembetulan',
    back: 'Tentang UpahJe',
  },
} as const

type Lang = keyof typeof COPY

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (params.lang === 'ms' ? 'ms' : 'en') as Lang
  const copy = COPY[lang]
  const path = `/${lang}/editorial-policy`
  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: absolute(path), languages: languagesFor('/editorial-policy') },
    ...social(lang, path, copy.title, copy.description),
  }
}

export default function EditorialPolicy({ params }: { params: { lang: string } }) {
  const lang = (params.lang === 'ms' ? 'ms' : 'en') as Lang
  const copy = COPY[lang]
  const other = lang === 'en' ? 'ms' : 'en'

  return (
    <div className="ui-canvas min-h-screen">
      <TopBar lang={lang} otherHref={`/${other}/editorial-policy`} />
      <main id="main" className="container-editorial" style={{ paddingTop: 'var(--space-12)', paddingBottom: 'var(--space-12)' }}>
        <h1 className="type-h1" style={{ color: 'var(--ui-ink)' }}>{copy.title}</h1>
        <div style={{ maxWidth: 'var(--measure)' }}>
          <h2 className="type-h3 mt-8" style={{ color: 'var(--ui-ink)' }}>{copy.editor}</h2>
          <p className="type-body mt-2" style={{ color: 'var(--ui-body)' }}>{copy.editorLine}</p>
          <p className="type-body mt-1" style={{ color: 'var(--ui-body)' }}>
            {copy.contact}: <a href="mailto:husni@upahje.my" className="ui-link" style={{ color: 'var(--ui-accent)' }}>{copy.contactLine}</a>
          </p>

          <h2 className="type-h3 mt-10" style={{ color: 'var(--ui-ink)' }}>{copy.moneyTitle}</h2>
          <p className="type-body mt-2" style={{ color: 'var(--ui-body)' }}>{copy.moneyBody}</p>

          <h2 className="type-h3 mt-10" style={{ color: 'var(--ui-ink)' }}>{copy.evidenceTitle}</h2>
          <p className="type-body mt-2" style={{ color: 'var(--ui-body)' }}>{copy.evidenceBody}</p>

          <h2 className="type-h3 mt-10" style={{ color: 'var(--ui-ink)' }}>{copy.aiTitle}</h2>
          <p className="type-body mt-2" style={{ color: 'var(--ui-body)' }}>{copy.aiBody}</p>

          <p className="mt-10">
            <Link href={`/${lang}/corrections`} className="ui-link type-small" style={{ color: 'var(--ui-accent)' }}>{copy.corrections}</Link>
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
