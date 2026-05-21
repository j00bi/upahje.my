'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Job {
  id: string
  title: string
  description: string
  category: string
  location: string
  budget: string
  track: 'LABOUR' | 'TECHNICAL'
  status: string
  postedDate: string
  employerName?: string
  employerRating?: number
  jobType?: string
  duration?: string
  requirements?: string[]
}

// Mock job data - in production, this would come from your database
const mockJob: Job = {
  id: '1',
  title: 'Garden Maintenance - Taman Melawati',
  description: 'Need regular garden maintenance for 3-bedroom house. Grass cutting, weeding, and basic pruning.',
  category: 'Garden & Landscaping',
  location: 'Taman Melawati, Kuala Lumpur',
  budget: 'RM 150 - 200',
  track: 'LABOUR',
  status: 'Open',
  postedDate: '2 hours ago',
  employerName: 'Encik Ahmad',
  employerRating: 4.5,
  jobType: 'One-time',
  duration: '3-4 hours',
  requirements: ['Own tools preferred', 'Reliable', 'Can start immediately']
}

export default function PayPage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')

  const job = mockJob

  // Parse budget to get amount (extract first number from "RM 150 - 200")
  const parseBudget = (budget: string): number => {
    const match = budget.match(/RM\s*(\d+)/)
    return match ? parseInt(match[1]) : 0
  }

  const amount = parseBudget(job.budget)

  const handlePayNow = async () => {
    setIsProcessing(true)
    setError('')

    try {
      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId: job.id,
          amount: amount,
          customerName: 'Test Customer',
          customerEmail: 'test@example.com',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment')
      }

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="text-emerald-600 hover:text-emerald-700 mb-4 inline-flex items-center"
          >
            ← Back to job
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Complete Payment</h1>
          <p className="text-gray-600">Pay for job: {job.title}</p>
        </div>

        {/* Job Details Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Job Title:</span>
              <span className="font-medium">{job.title}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Category:</span>
              <span className="font-medium">{job.category}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span className="font-medium">{job.location}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Duration:</span>
              <span className="font-medium">{job.duration}</span>
            </div>
            
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Amount to Pay:</span>
                <span className="font-bold text-emerald-600">RM {amount}.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-blue-800 mb-2">Payment Information</h3>
          <p className="text-blue-700 text-sm">
            You will be redirected to Billplz to complete your payment via FPX. 
            Please have your online banking credentials ready.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Pay Now Button */}
        <button
          onClick={handlePayNow}
          disabled={isProcessing}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
            isProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-700'
          }`}
        >
          {isProcessing ? 'Processing...' : 'Pay Now with FPX'}
        </button>

        {/* Security Notice */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>🔒 Your payment is secured by Billplz</p>
          <p className="mt-1">We accept FPX payments from all major Malaysian banks</p>
        </div>
      </div>
    </div>
  )
}
