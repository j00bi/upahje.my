import Link from 'next/link'

/** Server-rendered pagination: real links, no client JS. */
export default function Pagination({ page, pageCount, lang }: { page: number; pageCount: number; lang: string }) {
  if (pageCount <= 1) return null
  const href = (n: number) => (n === 1 ? `/${lang}/articles` : `/${lang}/articles/page/${n}`)
  const numbers = Array.from({ length: pageCount }, (_, i) => i + 1)

  return (
    <nav aria-label="Article pages" className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 pt-6">
      {page > 1 ? (
        <Link href={href(page - 1)} rel="prev" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
          ← Newer
        </Link>
      ) : (
        <span className="text-sm text-mute">Newest first</span>
      )}
      <ol className="flex items-center gap-1">
        {numbers.map((n) => (
          <li key={n}>
            <Link
              href={href(n)}
              aria-current={n === page ? 'page' : undefined}
              className={`inline-flex h-9 min-w-9 items-center justify-center rounded-pill px-3 text-sm font-semibold transition ${
                n === page
                  ? 'bg-emerald-700 text-white'
                  : 'border border-neutral-200 text-ink hover:border-neutral-300 hover:bg-canvas-soft'
              }`}
            >
              {n}
            </Link>
          </li>
        ))}
      </ol>
      {page < pageCount ? (
        <Link href={href(page + 1)} rel="next" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
          Older →
        </Link>
      ) : (
        <span className="text-sm text-mute">End</span>
      )}
    </nav>
  )
}
