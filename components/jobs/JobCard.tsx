 "use client"

'use client'

import { useState } from 'react'

interface JobCardProps {
  id: string
  title: string
  category: string
  location: string
  budget: string
  status: string
  postedDate: string
  onView?: () => void
  onConfirmCompletion?: () => void
  onCancelRefund?: () => void
}

export function JobCard({
  id,
  title,
  category,
  location,
  budget,
  status,
  postedDate,
  onView,
  onConfirmCompletion,
  onCancelRefund,
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
        return 'bg-blue-100 text-blue-800'
      case 'matched':
        return 'bg-purple-100 text-purple-800'
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <>
      <div className="border rounded-xl p-5 hover:shadow-md transition">
        <div className="flex justify-between items-start mb-2">
          <div className="font-semibold text-lg">{title}</div>
          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(status)}`}>
            {status.replace('_', ' ')}
          </span>
        </div>

        <div className="text-sm text-gray-600 mb-3">
          {category} • {location}
        </div>

        <div className="flex justify-between items-end">
          <div>
            <div className="text-xs text-gray-500">Budget</div>
            <div className="font-medium">{budget}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">Posted</div>
            <div className="text-sm">{postedDate}</div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <button
            onClick={onView}
            className="w-full border border-gray-300 hover:bg-gray-50 py-2 rounded-lg text-sm font-medium transition"
          >
            View Details
          </button>
          
          {status === 'IN_PROGRESS' && (
            <div className="flex gap-2">
              <button
                onClick={() => setShowConfirmModal(true)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium transition"
              >
                Confirm Completion
              </button>
              <button
                onClick={() => setShowCancelModal(true)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium transition"
              >
                Cancel & Refund
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Confirm Completion Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">Confirm Job Completion</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to confirm that this job is complete? 
              This will release the payment to the talent.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 border border-gray-300 hover:bg-gray-50 py-2 rounded-lg text-sm font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmCompletion}
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-2 rounded-lg text-sm font-medium transition"
              >
                {loading ? 'Processing...' : 'Confirm & Release Payment'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel & Refund Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">Cancel Job & Refund</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to cancel this job? 
              The payment will be refunded to your account.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 border border-gray-300 hover:bg-gray-50 py-2 rounded-lg text-sm font-medium transition"
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
