import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[var(--color-canvas-soft)] px-4 py-16">
      <div className="w-full max-w-xl rounded-3xl border border-neutral-200 bg-white p-6 text-center sm:p-10">
        <div className="text-5xl" aria-hidden="true">🧭</div>
        <p className="section-label mt-5 text-green-mid">404</p>
        <h1 className="mt-2 text-3xl font-bold text-green-deep">Halaman ini tak dijumpai</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-neutral-600">
          Pautan mungkin sudah berubah atau ciri ini belum tersedia. Cuba kembali ke marketplace.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-green-mid px-5 text-sm font-semibold text-white">
            Go to homepage
          </Link>
          <Link href="/jobs" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-neutral-300 px-5 text-sm font-semibold text-neutral-800">
            Browse jobs
          </Link>
        </div>
      </div>
    </div>
  )
}
