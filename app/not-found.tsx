import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: 'var(--color-canvas-soft)' }}>
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">🔍</div>
        <h1 className="font-display-xl mb-3" style={{ color: 'var(--color-ink)' }}>
          Page not found
        </h1>
        <p className="text-sm mb-8" style={{ color: 'var(--color-body)' }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/"
            className="inline-flex items-center justify-center text-white font-bold text-sm px-6 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
            style={{ backgroundColor: 'var(--color-teal-mid)' }}
          >
            Back to Home
          </Link>
          <Link
            href="/jobs"
            className="inline-flex items-center justify-center border bg-white font-bold text-sm px-6 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
            style={{ borderColor: 'rgba(14, 15, 12, 0.1)', color: 'var(--color-ink)' }}
          >
            Browse Jobs
          </Link>
        </div>
      </div>
    </div>
  )
}
