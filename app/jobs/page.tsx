import { Suspense } from 'react'
import JobsPageClient from './JobsPageClient'

export default function JobsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-slate-500 text-sm">Loading jobs...</p>
          </div>
        </div>
      }
    >
      <JobsPageClient />
    </Suspense>
  )
}
