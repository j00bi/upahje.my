'use client'

import Link from 'next/link'

/**
 * LiveJobFeed — shows recent activity on the marketplace.
 *
 * Currently shows a no-activity placeholder. Once the marketplace has
 * real jobs and completed work, this should fetch from the database
 * instead of using hardcoded fake data.
 */
export default function LiveJobFeed() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-green-mid/30" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-mid" />
        </span>
        <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: 'var(--color-mute)' }}>
          Live Activity
        </span>
      </div>

      <div
        className="flex flex-col items-center justify-center py-12 text-center rounded-xl"
        style={{
          backgroundColor: 'var(--color-canvas)',
          border: '1px solid rgba(14, 15, 12, 0.05)',
        }}
      >
        <div className="text-4xl mb-4" role="img" aria-label="No activity">📭</div>
        <p className="text-sm font-semibold mb-2" style={{ color: 'var(--color-ink)' }}>
          No recent activity yet
        </p>
        <p className="text-xs max-w-[200px] mb-4" style={{ color: 'var(--color-mute)' }}>
          Activity will appear here once users start posting and completing jobs.
        </p>
        <Link
          href="/jobs/post"
          className="text-xs font-medium px-4 py-2 rounded-full transition"
          style={{
            backgroundColor: 'var(--color-teal-soft)',
            color: 'var(--color-teal-deep)',
          }}
        >
          Post the first job →
        </Link>
      </div>
    </div>
  )
}
