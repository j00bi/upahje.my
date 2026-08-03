'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface KYCSubmission {
  id: string
  userId: string
  kycStatus: string
  kycFileUrl: string | null
  state: string | null
  area: string | null
  user: {
    name: string | null
    email: string
    createdAt: string
  }
}

export default function AdminKYCMgmt() {
  const [submissions, setSubmissions] = useState<KYCSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<'ALL' | 'SUBMITTED' | 'VERIFIED' | 'REJECTED'>('SUBMITTED')
  const [processing, setProcessing] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/kyc')
      .then(r => {
        if (!r.ok) throw new Error('Unauthorized or forbidden')
        return r.json()
      })
      .then(data => {
        setSubmissions(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const handleAction = async (profileId: string, action: 'verify' | 'reject') => {
    setProcessing(profileId)
    try {
      const res = await fetch(`/api/admin/kyc/${profileId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      })

      if (res.ok) {
        setSubmissions(prev =>
          prev.map(s => s.id === profileId
            ? { ...s, kycStatus: action === 'verify' ? 'VERIFIED' : 'REJECTED' }
            : s
          )
        )
      }
    } finally {
      setProcessing(null)
    }
  }

  const handleViewDocument = async (profileId: string) => {
    try {
      const res = await fetch(`/api/admin/kyc/${profileId}/document`)
      if (!res.ok) {
        const data = await res.json()
        alert(data.error ?? 'Could not load document')
        return
      }
      const data = await res.json()
      window.open(data.signedUrl, '_blank', 'noopener,noreferrer')
    } catch {
      alert('Could not load document')
    }
  }

  const filtered = submissions.filter(s => filter === 'ALL' || s.kycStatus === filter)
  const counts = {
    ALL: submissions.length,
    SUBMITTED: submissions.filter(s => s.kycStatus === 'SUBMITTED').length,
    VERIFIED: submissions.filter(s => s.kycStatus === 'VERIFIED').length,
    REJECTED: submissions.filter(s => s.kycStatus === 'REJECTED').length,
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Top nav */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/admin" className="text-sm text-slate-500 hover:text-slate-800">
            ← Admin
          </Link>
          <span className="text-slate-300">|</span>
          <h1 className="font-semibold text-slate-900">KYC Review</h1>
          <span className="ml-auto text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-medium">
            {counts.SUBMITTED} pending
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {error ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔐</div>
            <h2 className="text-xl font-semibold text-slate-700 mb-2">Access denied</h2>
            <p className="text-slate-500 text-sm">{error}</p>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Filter tabs */}
            <div className="flex gap-2 mb-6">
              {(['ALL', 'SUBMITTED', 'VERIFIED', 'REJECTED'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                    filter === f
                      ? f === 'SUBMITTED' ? 'bg-amber-500 text-white'
                        : f === 'VERIFIED' ? 'bg-green-600 text-white'
                          : f === 'REJECTED' ? 'bg-red-500 text-white'
                            : 'bg-slate-800 text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {f === 'ALL' ? `All (${counts.ALL})` : f === 'SUBMITTED' ? `Pending (${counts.SUBMITTED})` : f === 'VERIFIED' ? `Verified (${counts.VERIFIED})` : `Rejected (${counts.REJECTED})`}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
                <div className="text-5xl mb-3">📋</div>
                <p className="text-slate-500">No {filter === 'ALL' ? '' : filter.toLowerCase()} submissions.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map(sub => (
                  <div key={sub.id} className="bg-white border border-slate-200 rounded-3xl p-6">
                    <div className="flex gap-6">
                      {/* User info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-semibold text-sm">
                            {(sub.user.name || sub.user.email)[0].toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">{sub.user.name || 'No name'}</div>
                            <div className="text-xs text-slate-500">{sub.user.email}</div>
                          </div>
                          <span className={`ml-auto text-xs px-2.5 py-1 rounded-full font-medium ${
                            sub.kycStatus === 'VERIFIED' ? 'bg-green-100 text-green-700'
                              : sub.kycStatus === 'REJECTED' ? 'bg-red-100 text-red-700'
                                : 'bg-amber-100 text-amber-700'
                          }`}>
                            {sub.kycStatus}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-3 text-sm">
                          {sub.state && (
                            <div className="bg-slate-50 rounded-xl p-3">
                              <div className="text-xs text-slate-500 mb-0.5">State</div>
                              <div className="font-medium text-slate-800">{sub.state}</div>
                            </div>
                          )}
                          {sub.area && (
                            <div className="bg-slate-50 rounded-xl p-3">
                              <div className="text-xs text-slate-500 mb-0.5">Area</div>
                              <div className="font-medium text-slate-800">{sub.area}</div>
                            </div>
                          )}
                          <div className="bg-slate-50 rounded-xl p-3">
                            <div className="text-xs text-slate-500 mb-0.5">Joined</div>
                            <div className="font-medium text-slate-800 text-xs">
                              {new Date(sub.user.createdAt).toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions + file */}
                      <div className="w-48 shrink-0 space-y-3">
                        {sub.kycFileUrl ? (
                          <button
                            type="button"
                            onClick={() => handleViewDocument(sub.id)}
                            className="block w-full text-center py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 transition"
                          >
                            📄 View MyKad
                          </button>
                        ) : (
                          <div className="text-center py-2.5 text-xs text-slate-400 italic">
                            No file uploaded
                          </div>
                        )}

                        {sub.kycStatus === 'SUBMITTED' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleAction(sub.id, 'verify')}
                              disabled={processing === sub.id}
                              className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-xl transition disabled:opacity-50"
                            >
                              {processing === sub.id ? '...' : '✓ Verify'}
                            </button>
                            <button
                              onClick={() => handleAction(sub.id, 'reject')}
                              disabled={processing === sub.id}
                              className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-xl transition disabled:opacity-50"
                            >
                              {processing === sub.id ? '...' : '✗ Reject'}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}