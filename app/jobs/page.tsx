'use client'

import { useState } from 'react'
import { JobCard } from '@/components/jobs/JobCard'
import { mockJobs, categories, locations, tracks, Job } from '@/lib/mockJobs'

export default function JobsPage() {
  const [selectedTrack, setSelectedTrack] = useState('All Tracks')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedLocation, setSelectedLocation] = useState('All Locations')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter jobs based on selected filters
  const filteredJobs = mockJobs.filter((job) => {
    const matchesTrack = selectedTrack === 'All Tracks' || 
      (selectedTrack === 'Labour' && job.track === 'LABOUR') ||
      (selectedTrack === 'Technical' && job.track === 'TECHNICAL')
    
    const matchesCategory = selectedCategory === 'All Categories' || job.category === selectedCategory
    const matchesLocation = selectedLocation === 'All Locations' || job.location.includes(selectedLocation)
    const matchesSearch = searchQuery === '' || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesTrack && matchesCategory && matchesLocation && matchesSearch
  })

  const handleViewDetails = (job: Job) => {
    console.log('View details for job:', job.id)
    // In a real app, this would navigate to the job detail page
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Job Board</h1>
          <p className="mt-1 text-sm text-gray-500">Find your next opportunity</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Track Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Track</label>
              <select
                value={selectedTrack}
                onChange={(e) => setSelectedTrack(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {tracks.map((track) => (
                  <option key={track} value={track}>
                    {track}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredJobs.length} of {mockJobs.length} jobs
        </div>

        {/* Job Listings */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                title={job.title}
                category={job.category}
                location={job.location}
                budget={job.budget}
                status={job.status}
                postedDate={job.postedDate}
                onView={() => handleViewDetails(job)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No jobs found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedTrack('All Tracks')
                setSelectedCategory('All Categories')
                setSelectedLocation('All Locations')
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