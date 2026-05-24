'use client'

import { useState } from 'react'

interface JobCardProps {
  id: string
  title: string
  category: string
  categoryEmoji?: string
  location: string
  budget: string
  status: string
  postedDate: string
  employerName?: string
  onView?: () => void
  onConfirmCompletion?: () => void
  onCancelRefund?: () => void
  skills?: string[]
  proposalCount?: number
  isEscrowProtected?: boolean
  distance?: string
}

export function JobCard({
  id,
  title,
  category,
  categoryEmoji,
  location,
  budget,
  status,
  postedDate,
  employerName,
  onView,
  onConfirmCompletion,
  onCancelRefund,
  skills = [],
  proposalCount,
  isEscrowProtected = false,
  distance,
}: JobCardProps) {
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleConfirmCompletion = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/escrow/release', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId: id })
      })
      
      if (response.ok) {
        if (onConfirmCompletion) onConfirmCompletion()
        setShowConfirmModal(false)
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to release payment')
      }
    } catch (error) {
      console.error('Error releasing payment:', error)
      alert('Failed to release payment')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelRefund = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/escrow/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId: id })
      })
      
      if (response.ok) {
        if (onCancelRefund) onCancelRefund()
        setShowCancelModal(false)
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to cancel payment')
      }
    } catch (error) {
      console.error('Error cancelling payment:', error)
      alert('Failed to cancel payment')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-emerald-100 text-emerald-800'
      case 'matched':
        return 'bg-purple-100 text-purple-800'
      case 'in_progress':
        return 'bg-amber-100 text-amber-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <>
      <div className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition bg-white group cursor-pointer">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-slate-900 group-hover:text-teal-700 transition line-clamp-2">
              {title}
            </h3>
            {employerName && (
              <div className="flex items-center gap-2 mt-2">
                <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium text-slate-600">
                  {employerName.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-slate-500 truncate">{employerName}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col items-end gap-2 ml-3">
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getStatusColor(status)}`}>
              {status.replace('_', ' ')}
            </span>
            {isEscrowProtected && (
              <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Escrow
              </span>
            )}
          </div>
        </div>

        {/* Meta Row */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 mb-3">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location}
            {distance && <span className="text-slate-400 ml-1">({distance})</span>}
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1">
            <span>{categoryEmoji}</span>
            {category}
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500">{postedDate}</span>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
            {skills.length > 3 && (
              <span className="px-2 py-0.5 bg-slate-50 text-slate-400 text-xs rounded-full border border-slate-200">
                +{skills.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between items-end pt-3 border-t border-slate-100">
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wide">Budget</div>
            <div className="font-semibold text-slate-900">{budget}</div>
          </div>
          <div className="text-right">
            {proposalCount !== undefined && (
              <div className="text-xs text-slate-500 mb-1">
                {proposalCount} {proposalCount === 1 ? 'proposal' : 'proposals'}
              </div>
            )}
            <button
              onClick={onView}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition"
            >
              View Details
            </button>
          </div>
        </div>

        {/* Status-specific actions */}
        {status === 'IN_PROGRESS' && (
          <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
            <button
              onClick={() => setShowConfirmModal(true)}
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-lg text-sm font-medium transition"
            >
              Confirm Completion
            </button>
            <button
              onClick={() => setShowCancelModal(true)}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg text-sm font-medium transition"
            >
              Cancel & Refund
            </button>
          </div>
        )}
      </div>

      {/* Confirm Completion Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-semibold mb-2">Confirm Job Completion</h3>
            <p className="text-slate-600 mb-4">
              Are you sure you want to confirm that this job is complete? 
              This will release the payment to the talent.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 border border-slate-300 hover:bg-slate-50 py-2 rounded-lg text-sm font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmCompletion}
                disabled={loading}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white py-2 rounded-lg text-sm font-medium transition"
              >
                {loading ? 'Processing...' : 'Confirm & Release Payment'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel & Refund Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-semibold mb-2">Cancel Job & Refund</h3>
            <p className="text-slate-600 mb-4">
              Are you sure you want to cancel this job? 
              The payment will be refunded to your account.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 border border-slate-300 hover:bg-slate-50 py-2 rounded-lg text-sm font-medium transition"
              >
                Keep Job
              </button>
              <button
                onClick={handleCancelRefund}
                disabled={loading}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white py-2 rounded-lg text-sm font-medium transition"
              >
                {loading ? 'Processing...' : 'Cancel & Refund'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
