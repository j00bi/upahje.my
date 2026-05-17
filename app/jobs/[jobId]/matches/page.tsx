'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { TalentCard } from '@/components/talent/TalentCard'
import { rankTalents } from '@/lib/matching'
import { mockTalents, talentLocations, talentRates, talentAvailability } from '@/lib/mockTalents'
import { mockJobs } from '@/lib/mockJobs'

export default function MatchesPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = params.jobId as string

  // Find the job
  const job = mockJobs.find(j => j.id === jobId)

  // Filter state
  const [selectedLocation, setSelectedLocation] = useState('All Locations')
  const [selectedRate, setSelectedRate] = useState('All Rates')
  const [selectedAvailability, setSelectedAvailability] = useState('All Availability')
  const [searchQuery, setSearchQuery] = useState('')

  // Calculate match scores for all talents
  const talentsWithScores = rankTalents(mockTalents, {
    jobCategory: job?.category || '',
    jobLocation: job?.location || '',
  })

  // Filter talents based on selected filters
  const filteredTalents = talentsWithScores.filter((talentScore) => {
    const talent = mockTalents.find(t => t.id === talentScore.talentId)
    if (!talent) return false

    // Location filter
    const matchesLocation = selectedLocation === 'All Locations' || 
      talent.location.includes(selectedLocation.replace('All Locations', ''))

    // Rate filter
    let matchesRate = true
    if (selectedRate !== 'All Rates') {
      const rateValue = parseInt(talent.rate.match(/\d+/)?.[0] || '0')
      if (selectedRate === 'Under RM 30/hour') matchesRate = rateValue < 30
      else if (selectedRate === 'RM 30 - 50/hour') matchesRate = rateValue >= 30 && rateValue <= 50
      else if (selectedRate === 'RM 50 - 100/hour') matchesRate = rateValue > 50 && rateValue <= 100
      else if (selectedRate === 'RM 100+/hour') matchesRate = rateValue > 100
    }

    // Availability filter
    const matchesAvailability = selectedAvailability === 'All Availability' || 
      talent.availability === selectedAvailability

    // Search query
    const matchesSearch = searchQuery === '' || 
      talent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesLocation && matchesRate && matchesAvailability && matchesSearch
  })

  // Handle contact action
  const handleContact = (talentName: string) => {
    console.log('Contact talent:', talentName)
    // In a real app, this would open a chat or contact modal
  }

  // Handle view profile
  const handleViewProfile = (talentName: string) => {
    router.push(`/talent/${talentName.toLowerCase().replace(/\s+/g, '-')}`)
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">Job not found</h2>
          <button
            onClick={() => router.push('/jobs')}
            className="mt-4 text-emerald-600 hover:text-emerald-700"
          >
            Back to Job Board
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => router.push('/jobs')}
                className="text-emerald-600 hover:text-emerald-700 text-sm mb-2"
              >
                ← Back to Jobs
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Talent Matches</h1>
              <p className="mt-1 text-sm text-gray-500">
                Showing matched talents for: <span className="font-medium">{job.title}</span>
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Location</div>
              <div className="font-medium">{job.location}</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search talents by name or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {talentLocations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Rate Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rate</label>
              <select
                value={selectedRate}
                onChange={(e) => setSelectedRate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {talentRates.map((rate) => (
                  <option key={rate} value={rate}>
                    {rate}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {talentAvailability.map((availability) => (
                  <option key={availability} value={availability}>
                    {availability}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredTalents.length} of {talentsWithScores.length} matched talents
        </div>

        {/* Talent Grid */}
        {filteredTalents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTalents.map((talentScore) => {
              const talent = mockTalents.find(t => t.id === talentScore.talentId)
              if (!talent) return null

              return (
                <TalentCard
                  key={talent.id}
                  name={talent.name}
                  track={talent.track}
                  location={talent.location}
                  rate={talent.rate}
                  availability={talent.availability}
                  categories={talent.categories}
                  score={talentScore.score}
                  verified={talent.verified}
                  onContact={() => handleContact(talent.name)}
                  onViewProfile={() => handleViewProfile(talent.name)}
                />
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No talents found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedLocation('All Locations')
                setSelectedRate('All Rates')
                setSelectedAvailability('All Availability')
                setSearchQuery('')
              }}
              className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
