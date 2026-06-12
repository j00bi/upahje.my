import { getRecentJobs } from '@/lib/jobs'
import Link from 'next/link'

function timeAgo(dateStr: string): string {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diff = now - then

  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`

  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`

  return new Date(dateStr).toLocaleDateString('en-MY', { day: 'numeric', month: 'short' })
}

/**
 * LiveJobFeed — shows recent marketplace activity.
 * Server component that queries the database directly.
 */
export default async function LiveJobFeed() {
  const recentJobs = await getRecentJobs(5)

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-green-mid/30 animate-ping" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-mid" />
        </span>
        <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: 'var(--color-mute)' }}>
          Live Activity
        </span>
      </div>

      {recentJobs.length > 0 ? (
        <div className="space-y-2.5">
          {recentJobs.map((job) => (
            <Link
              key={job.id}
              href={`/jobs/${job.id}`}
              className="flex items-start gap-3 p-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              style={{
                backgroundColor: 'var(--color-canvas)',
                border: '1px solid rgba(14, 15, 12, 0.05)',
              }}
            >
              <span className="text-xl flex-shrink-0 mt-0.5">
                {job.categoryEmoji || '📋'}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: 'var(--color-ink)' }}>
                  {job.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  {job.location && (
                    <span className="text-xs" style={{ color: 'var(--color-mute)' }}>
                      📍 {job.location}
                    </span>
                  )}
                  {job.rate && (
                    <span className="text-xs font-medium" style={{ color: 'var(--color-teal-deep)' }}>
                      {job.rate}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-[11px] flex-shrink-0 whitespace-nowrap" style={{ color: 'var(--color-mute)' }}>
                {timeAgo(job.createdAt)}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center py-12 text-center rounded-xl"
          style={{
            backgroundColor: 'var(--color-canvas)',
            border: '1px solid rgba(14, 15, 12, 0.05)',
          }}
        >
          <div className="text-3xl mb-3">📋</div>
          <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-ink)' }}>
            No jobs posted yet
          </p>
          <p className="text-xs max-w-[200px]" style={{ color: 'var(--color-mute)' }}>
            Be the first to post a job and find local talent.
          </p>
          <Link
            href="/jobs/post"
            className="mt-4 text-xs font-semibold px-4 py-2 rounded-full transition-all hover:-translate-y-0.5"
            style={{ backgroundColor: 'var(--color-primary-pale)', color: 'var(--color-green-mid)' }}
          >
            Post a Job
          </Link>
        </div>
      )}
    </div>
  )
}
