'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Job {
  id: string
  title: string
  description: string
  categories: string[]
  location: string
  rateMin: number | null
  rateMax: number | null
  createdAt: string
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => {
        setJobs(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="p-8 text-center">Loading jobs...</div>
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Available Jobs</h1>
        <Link
          href="/jobs/post"
          className="px-5 py-2.5 bg-green-600 text-white rounded-2xl text-sm font-medium"
        >
          Post a Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No jobs available right now.
        </div>
      ) : (
        <div className="grid gap-4">
          {jobs.map(job => (
            <Link
              key={job.id} 
              href={`/jobs/${job.id}`}
              className="block border rounded-3xl p-6 hover:border-green-600 transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-xl">{job.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{job.location}</p>
                </div>
                <div className="text-right text-sm">
                  {job.rateMin && job.rateMax && (
                    <span className="font-medium">RM {job.rateMin}–{job.rateMax}</span>
                  )}
                </div>
              </div>

              <p className="mt-4 text-gray-700 line-clamp-2">{job.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {job.categories?.slice(0, 4).map((cat, i) => (
                  <span 
                    key={i} 
                    className="text-xs px-3 py-1 bg-gray-100 rounded-full"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
