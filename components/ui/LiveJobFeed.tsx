'use client'

/**
 * LiveJobFeed — shows recent activity on the marketplace.
 *
 * Renders nothing when there's no activity data. Shown only when
 * real marketplace activity exists (jobs posted, completed, reviewed).
 * Once the database has real data, pass activityItems as a prop.
 */
export default function LiveJobFeed() {
  // No activity data yet — render nothing to avoid empty state signals
  return null

  // Future: when activityItems.length > 0, render:
  // <div className="space-y-3">
  //   <div className="flex items-center gap-2 mb-4">
  //     <span className="relative flex h-2.5 w-2.5">
  //       <span className="absolute inline-flex h-full w-full rounded-full bg-teal-mid/30" />
  //       <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-mid" />
  //     </span>
  //     <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: 'var(--color-mute)' }}>
  //       Live Activity
  //     </span>
  //   </div>
  //   {/* Render activity items here */}
  // </div>
}
