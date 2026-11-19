import Link from 'next/link'

/** Content-site 404: no marketplace routes, no marketplace copy. */
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: 'var(--color-canvas-soft)' }}>
      <div className="text-center max-w-md">
        <p className="section-label text-emerald-700">UpahJe.my</p>
        <h1 className="font-display-xl mt-3 mb-3" style={{ color: 'var(--color-ink)' }}>
          Page not found
        </h1>
        <p className="text-sm mb-8" style={{ color: 'var(--color-body)' }}>
          That page does not exist. The site is an index of articles about technology for Malaysian
          small businesses, in English and Bahasa Melayu.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/en/articles"
            className="inline-flex items-center justify-center text-white font-bold text-sm px-6 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
            style={{ backgroundColor: 'var(--color-green-mid)' }}
            hrefLang="en-MY"
          >
            English articles
          </Link>
          <Link
            href="/ms/articles"
            className="inline-flex items-center justify-center border bg-white font-bold text-sm px-6 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
            style={{ borderColor: 'rgba(14, 15, 12, 0.1)', color: 'var(--color-ink)' }}
            hrefLang="ms-MY"
          >
            Artikel Bahasa Melayu
          </Link>
        </div>
        <p className="mt-6 text-xs" style={{ color: 'var(--color-mute)' }}>
          <Link href="/en" className="underline" hrefLang="en-MY">English hub</Link>
          {' · '}
          <Link href="/ms" className="underline" hrefLang="ms-MY">Hab Bahasa Melayu</Link>
        </p>
      </div>
    </div>
  )
}
