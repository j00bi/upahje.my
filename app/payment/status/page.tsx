'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function PaymentStatusContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [status, setStatus] = useState<'loading' | 'pending' | 'success' | 'cancelled' | 'error'>('loading')
  const [billId, setBillId] = useState<string | null>(null)
  const [amount, setAmount] = useState<number | null>(null)

  useEffect(() => {
    const billIdParam =
      searchParams.get('bill_id') ??
      searchParams.get('billplz[id]')

    if (!billIdParam) {
      setStatus('error')
      return
    }

    setBillId(billIdParam)
    let cancelled = false

    async function confirmPayment() {
      try {
        const response = await fetch(
          `/api/payments/status?billId=${encodeURIComponent(billIdParam)}`
        )
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.error || 'Unable to confirm payment.')
        }
        if (cancelled) return

        const serverStatus = String(data.payment.status).toUpperCase()
        setAmount(Number(data.payment.amount))
        if (serverStatus === 'SUCCESS' || serverStatus === 'PAID') {
          setStatus('success')
        } else if (serverStatus === 'CANCELLED' || serverStatus === 'FAILED') {
          setStatus('cancelled')
        } else {
          setStatus('pending')
        }
      } catch {
        if (!cancelled) setStatus('error')
      }
    }

    confirmPayment()
    return () => {
      cancelled = true
    }
  }, [searchParams])

  const handleContinue = () => {
    // Redirect back to jobs or dashboard
    router.push('/jobs')
  }

  const getStatusContent = () => {
    switch (status) {
      case 'success':
        return {
          icon: '✓',
          title: 'Payment Successful!',
          message: 'Your payment has been processed successfully. You will receive a confirmation email shortly.',
          color: 'text-emerald-600',
          bgColor: 'bg-emerald-50',
          borderColor: 'border-emerald-200',
        }
      case 'cancelled':
        return {
          icon: '✗',
          title: 'Payment Cancelled',
          message: 'Your payment was cancelled. You can try again when you are ready.',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
        }
      case 'pending':
        return {
          icon: '…',
          title: 'Payment confirmation pending',
          message:
            'We have not received a verified payment confirmation yet. Refresh this page in a moment before trying again.',
          color: 'text-amber-700',
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
        }
      case 'error':
        return {
          icon: '!',
          title: 'Payment Error',
          message:
            'We could not verify this payment for your account. No success status has been assumed from the return link.',
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
        }
      default:
        return {
          icon: '...',
          title: 'Processing Payment',
          message: 'Please wait while we confirm your payment status.',
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
        }
    }
  }

  const content = getStatusContent()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4">
      <div className="max-w-md w-full">
        {/* Status Card */}
        <div
          className={`bg-white rounded-lg shadow-sm p-6 sm:p-8 border ${content.borderColor}`}
          role={status === 'error' ? 'alert' : 'status'}
        >
          {/* Icon */}
          <div className={`text-center mb-6`}>
            <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full ${content.bgColor} ${content.color} text-xl sm:text-2xl font-bold`}>
              {content.icon}
            </div>
          </div>

          {/* Title */}
          <h1 className={`text-lg sm:text-xl font-bold text-center mb-4 ${content.color}`}>
            {content.title}
          </h1>

          {/* Message */}
          <p className="text-gray-600 text-center mb-6 text-sm sm:text-base">
            {content.message}
          </p>

          {/* Payment Details (if available) */}
          {billId && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600">Reference ID:</span>
                <span className="font-mono text-gray-800">{billId}</span>
              </div>
              {amount !== null && (
                <div className="flex justify-between text-xs sm:text-sm mt-2">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium text-gray-800">RM {amount.toFixed(2)}</span>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleContinue}
              className="w-full py-3 px-4 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors text-sm"
            >
              Continue Browsing Jobs
            </button>
            
            {status === 'success' && (
              <button
                onClick={() => router.push('/dashboard')}
                className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm"
              >
                View My Dashboard
              </button>
            )}
          </div>

          {/* Help Text */}
          <p className="text-center text-xs sm:text-sm text-gray-500 mt-6">
            Need help?{' '}
            <a href="/contact" className="text-emerald-600 hover:text-emerald-700">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function PaymentStatusPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4">
        <div className="animate-pulse text-gray-400">Loading payment status...</div>
      </div>
    }>
      <PaymentStatusContent />
    </Suspense>
  )
}
