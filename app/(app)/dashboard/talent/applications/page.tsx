'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Application {
  id: string
  status: string
  proposal: string
  appliedAt: string
  job: {
    id: string
    title: string
    status: string
    employer: { user: { name: string | null; email: string } }
    category: { name: string; emoji: string | null }
  }
}

const STATUS_STYLES: Record<string, string> = {
  PENDING: 'bg-amber-100 text-amber-800',
  REVIEWED: 'bg-blue-100 text-blue-800',
  ACCEPTED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-700',
  WITHDRAWN: 'bg-slate-100 text-slate-500',
}

export default function TalentApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [withdrawing, setWithdrawing] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/applications?role=talent')
      .then(r => r.json())
      .then(data => {
        setApplications(data.applications || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleWithdraw = async (appId: string) => {
    setWithdrawing(appId)
    try {
      const res = await fetch(`/api/applications/${appId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'withdraw' }),
      })
      if (res.ok) {
        setApplications(prev =>
          prev.map(a => a.id === appId ? { ...a, status: 'WITHDRAWN' } : a)
        )
      }
    } finally {
      setWithdrawing(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-green-mid border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-[2rem] p-5 sm:p-6 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="inline-flex rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-teal-900 mb-2">
              My Applications
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Jobs you&apos;ve applied to
            </h1>
          </div>
          <Link
            href="/jobs"
            className="text-sm font-bold text-teal-600 hover:text-teal-700 underline"
          >
            Browse jobs →
          </Link>
        </div>
      </section>

      {applications.length === 0 ? (
        <div className="bg-white rounded-[2rem] p-12 text-center border border-slate-100">
          <div className="text-5xl mb-4">📭</div>
          <h3 className="text-lg font-black text-slate-800 mb-2">No applications yet</h3>
          <p className="text-sm text-slate-500 mb-6 font-medium">
            Browse available jobs and submit your first proposal.
          </p>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-2xl transition"
          >
            Browse open jobs
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map(app => (
            <div
              key={app.id}
              className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-sm transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-slate-900 truncate">
                      {app.job.title}
                    </h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${STATUS_STYLES[app.status] || 'bg-slate-100 text-slate-600'}`}>
                      {app.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mb-2">
                    <span>{app.job.employer.user.name || app.job.employer.user.email}</span>
                    <span>•</span>
                    <span>{app.job.category.emoji} {app.job.category.name}</span>
                    <span>•</span>
                    <span>Applied {new Date(app.appliedAt).toLocaleDateString('ms-MY', { day: 'numeric', month: 'short' })}</span>
                  </div>
                  <details className="group">
                    <summary className="text-xs font-bold text-teal-600 cursor-pointer hover:text-teal-700">
                      View proposal
                    </summary>
                    <p className="mt-2 text-sm text-slate-700 bg-slate-50 rounded-xl p-3">
                      {app.proposal}
                    </p>
                  </details>
                  {app.status === 'ACCEPTED' && (
                    <div className="mt-3 rounded-2xl border border-teal-100 bg-teal-50 p-3">
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-teal-800">
                        Contact handoff
                      </p>
                      <p className="mt-1 text-sm text-slate-700">
                        Your application was accepted. Email the employer to confirm schedule, scope, and payment next steps.
                      </p>
                      <a
                        href={`mailto:${app.job.employer.user.email}?subject=${encodeURIComponent(`UpahJe job: ${app.job.title}`)}`}
                        className="mt-2 inline-flex rounded-full bg-teal-700 px-4 py-2 text-xs font-bold text-white hover:bg-teal-800"
                      >
                        Email {app.job.employer.user.email}
                      </a>
                    </div>
                  )}
                </div>

                <div className="shrink-0 flex flex-col gap-2">
                  <Link
                    href={`/jobs/${app.job.id}`}
                    className="text-xs font-bold text-teal-600 hover:text-teal-700 underline"
                  >
                    View job →
                  </Link>
                  {(app.status === 'PENDING' || app.status === 'REVIEWED') && (
                    <button
                      onClick={() => handleWithdraw(app.id)}
                      disabled={withdrawing === app.id}
                      className="text-xs font-bold text-red-500 hover:text-red-600 disabled:opacity-50"
                    >
                      {withdrawing === app.id ? '...' : 'Withdraw'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
