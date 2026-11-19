'use client'

import { useState, use } from 'react'

interface JobDetailProps {
  params: Promise<{ jobId: string }>
}

export default function JobDetailPage({ params }: JobDetailProps) {
  const { jobId } = use(params)
  const [proposal, setProposal] = useState('')
  const [isApplying, setIsApplying] = useState(false)
  const [applied, setApplied] = useState(false)

  const handleApply = async () => {
    if (!proposal.trim()) return alert('Please write a short proposal')

    setIsApplying(true)

    try {
      const response = await fetch(`/api/jobs/${jobId}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proposal }),
      })

      if (response.ok) {
        setApplied(true)
        alert('Application submitted!')
      } else {
        alert('Failed to submit application')
      }
    } catch {
      alert('Error submitting application')
    } finally {
      setIsApplying(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Job Details</h1>
        <p className="text-sm text-gray-500 mt-1">Job ID: {jobId}</p>
      </div>

      {/* Placeholder job info - in real app this would come from API */}
      <div className="border rounded-3xl p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Job Title</h2>
        <div className="space-y-4 text-gray-700">
          <p><strong>Location:</strong> Kajang, Selangor</p>
          <p><strong>Rate:</strong> RM 80 – 150</p>
          <p><strong>Description:</strong> Looking for an experienced painter for a 3-bedroom house. Must have own tools and transport.</p>
        </div>
      </div>

      {!applied ? (
        <div className="border rounded-3xl p-8">
          <h3 className="font-semibold mb-4">Apply for this job</h3>
          <textarea
            value={proposal}
            onChange={(e) => setProposal(e.target.value)}
            placeholder="Write a short proposal explaining why you're a good fit..."
            className="w-full border rounded-2xl p-4 h-32 mb-4"
          />
          <button
            onClick={handleApply}
            disabled={isApplying || !proposal.trim()}
            className="w-full py-4 bg-green-600 text-white font-semibold rounded-3xl disabled:bg-gray-300"
          >
            {isApplying ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      ) : (
        <div className="text-center py-8 border rounded-3xl">
          <p className="text-green-600 font-medium">Application submitted successfully!</p>
          <p className="text-sm text-gray-600 mt-2">You can track status in your dashboard.</p>
        </div>
      )}
    </div>
  )
}
