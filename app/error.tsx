'use client'

import Link from 'next/link'

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[var(--color-canvas-soft)] px-4 py-16">
      <div className="w-full max-w-xl rounded-3xl border border-neutral-200 bg-white p-6 text-center sm:p-10" role="alert">
        <div className="text-5xl" aria-hidden="true">↻</div>
        <p className="section-label mt-5 text-negative">Something went wrong</p>
        <h1 className="mt-2 text-3xl font-bold text-green-deep">We couldn&apos;t load this page</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-neutral-600">
          This may be a temporary service issue. No changes were made to your account.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-green-mid px-5 text-sm font-semibold text-white"
          >
            Try again
          </button>
          <Link href="/" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-neutral-300 px-5 text-sm font-semibold text-neutral-800">
            Go to homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
