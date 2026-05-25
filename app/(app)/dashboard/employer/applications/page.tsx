'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Application {
  id: string
  status: string
  proposal: string
  appliedAt: string
  job: { id: string; title: string; status: string }
  talent: {
    user: { name: string | null; email: string; image: string | null }
    categories: { category: { name: string } }[]
  }
}

const STATUS_STYLES: Record<string, string> = {
  PENDING: 'bg-amber-100 text-amber-800',
  REVIEWED: 'bg-blue-100 text-blue-800',
  ACCEPTED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-700',
  WITHDRAWN: 'bg-slate-100 text-slate-500',
}

export default function EmployerProposalsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>('ALL')

  const loadApplications = () => {
    setLoading(true)
    fetch('/api/applications?role=employer')
      .then(r => r.json())
      .then(data => {
        setApplications(data.applications || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    loadApplications()
  }, [])

  const handleAction = async (appId: string, action: 'accept' | 'reject') => {
    setActionLoading(`${appId}-${action}`)
    try {
      const res = await fetch(`/api/applications/${appId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      })
      if (res.ok) {
        loadApplications()
      } else {
        const err = await res.json()
        alert(err.error || 'Action failed')
      }
    } finally {
      setActionLoading(null)
    }
  }

  const filtered = filter === 'ALL'
    ? applications
    : applications.filter(a => a.status === filter)

  const pendingCount = applications.filter(a => a.status === 'PENDING' || a.status === 'REVIEWED').length

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
              Proposals
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Review applications
            </h1>
          </div>
          {pendingCount > 0 && (
            <span className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-bold">
              {pendingCount} new
            </span>
          )}
        </div>
      </section>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {['ALL', 'PENDING', 'REVIEWED', 'ACCEPTED', 'REJECTED', 'WITHDRAWN'].map(f => {
          const count = f === 'ALL' ? applications.length : applications.filter(a => a.status === f).length
          if (count === 0 && f !== 'ALL') return null
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                filter === f
                  ? f === 'PENDING' || f === 'ALL'
                    ? 'bg-teal-600 text-white'
                    : f === 'ACCEPTED' ? 'bg-green-mid text-white'
                      : f === 'REJECTED' ? 'bg-red-500 text-white'
                        : 'bg-slate-800 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {f === 'ALL' ? `All (${count})` : `${f} (${count})`}
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-[2rem] p-12 text-center border border-slate-100">
          <div className="text-5xl mb-4">📋</div>
          <h3 className="text-lg font-black text-slate-800 mb-2">No {filter === 'ALL' ? '' : `${filter.toLowerCase()} `}proposals</h3>
          <p className="text-sm text-slate-500 font-medium">
            When talents apply to your jobs, their proposals will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(app => (
            <div
              key={app.id}
              className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-sm transition"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm shrink-0">
                    {(app.talent.user.name || app.talent.user.email)[0].toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-slate-900">
                      {app.talent.user.name || app.talent.user.email}
                    </h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${STATUS_STYLES[app.status] || 'bg-slate-100 text-slate-600'}`}>
                      {app.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
                    <span>Applied for: <Link href={`/jobs/${app.job.id}`} className="text-teal-600 hover:underline font-bold">{app.job.title}</Link></span>
                    <span>•</span>
                    <span>{new Date(app.appliedAt).toLocaleDateString('ms-MY', { day: 'numeric', month: 'short' })}</span>
                  </div>

                  {/* Categories */}
                  {app.talent.categories.length > 0 && (
                    <div className="flex gap-1.5 mb-2 flex-wrap">
                      {app.talent.categories.map((c, i) => (
                        <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                          {c.category.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Proposal */}
                  <details className="group">
                    <summary className="text-xs font-bold text-teal-600 cursor-pointer hover:text-teal-700">
                      View proposal
                    </summary>
                    <p className="mt-2 text-sm text-slate-700 bg-slate-50 rounded-xl p-3 whitespace-pre-wrap">
                      {app.proposal}
                    </p>
                  </details>

                  {app.status === 'ACCEPTED' && (
                    <div className="mt-3 rounded-2xl border border-teal-100 bg-teal-50 p-3">
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-teal-800">
                        Contact handoff
                      </p>
                      <p className="mt-1 text-sm text-slate-700">
                        This proposal is accepted. Email the talent to arrange scope, schedule, and payment next steps.
                      </p>
                      <a
                        href={`mailto:${app.talent.user.email}?subject=${encodeURIComponent(`UpahJe job: ${app.job.title}`)}`}
                        className="mt-2 inline-flex rounded-full bg-teal-700 px-4 py-2 text-xs font-bold text-white hover:bg-teal-800"
                      >
                        Email {app.talent.user.email}
                      </a>
                    </div>
                  )}
                </div>

                {/* Actions */}
                {(app.status === 'PENDING' || app.status === 'REVIEWED') && app.job.status === 'OPEN' && (
                  <div className="shrink-0 flex flex-col gap-2">
                    <button
                      onClick={() => handleAction(app.id, 'accept')}
                      disabled={actionLoading === `${app.id}-accept`}
                      className="px-4 py-2 bg-green-mid hover:bg-green-800 text-white text-xs font-bold rounded-xl transition disabled:opacity-50"
                    >
                      {actionLoading === `${app.id}-accept` ? '...' : '✓ Accept'}
                    </button>
                    <button
                      onClick={() => handleAction(app.id, 'reject')}
                      disabled={actionLoading === `${app.id}-reject`}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-xl transition disabled:opacity-50"
                    >
                      {actionLoading === `${app.id}-reject` ? '...' : '✗ Reject'}
                    </button>
                  </div>
                )}
                {app.status === 'ACCEPTED' && (
                  <div className="shrink-0">
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-800 text-xs font-bold rounded-xl">
                      ✓ Matched
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
