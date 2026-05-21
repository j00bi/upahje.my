'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { StarRatingPicker } from './StarRatingPicker'

interface ReviewFormProps {
  jobId: string
  toUserId: string
  toUserName: string
  toUserRole: 'Talent' | 'Employer'
}

export function ReviewForm({ jobId, toUserId, toUserName, toUserRole }: ReviewFormProps) {
  const router = useRouter()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (rating === 0) {
      setError('Please select a rating')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId,
          toUserId,
          rating,
          comment: comment.trim() || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit review')
      }

      // Redirect to thank you page
      router.push(`/review/thank-you?jobId=${jobId}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border rounded-3xl p-6">
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          How would you rate your experience with {toUserName}?
        </label>
        <StarRatingPicker rating={rating} onChange={setRating} disabled={isSubmitting} />
      </div>

      <div className="mb-6">
        <label htmlFor="comment" className="block text-sm font-medium mb-2">
          Write a review (optional)
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={isSubmitting}
          placeholder={`Share your experience working with ${toUserName}...`}
          className="w-full h-32 p-3 border rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        />
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Your review helps {toUserRole === 'Talent' ? 'talents' : 'employers'} build trust on UpahJe.
        </div>
        <button
          type="submit"
          disabled={isSubmitting || rating === 0}
          className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-medium hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </div>
    </form>
  )
}