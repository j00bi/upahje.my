'use client'

import { useState, useEffect } from 'react'
import { JobFilters as JobFiltersType } from '@/lib/actions/jobs'

interface JobFiltersProps {
  onFilterChange: (filters: JobFiltersType) => void
  categories: { id: string; name: string; emoji?: string; track: string }[]
  locations: string[]
  initialFilters?: JobFiltersType
}

export function JobFilters({ onFilterChange, categories, locations, initialFilters }: JobFiltersProps) {
  const [search, setSearch] = useState(initialFilters?.search || '')
  const [selectedCategory, setSelectedCategory] = useState(initialFilters?.category || '')
  const [selectedLocation, setSelectedLocation] = useState(initialFilters?.location || '')
  const [selectedTrack, setSelectedTrack] = useState<'LABOUR' | 'TECHNICAL' | ''>(initialFilters?.track || '')
  const [showFilters, setShowFilters] = useState(false)

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({
        search: search || undefined,
        category: selectedCategory || undefined,
        location: selectedLocation || undefined,
        track: selectedTrack || undefined,
      })
    }, 300)

    return () => clearTimeout(timer)
  }, [search, selectedCategory, selectedLocation, selectedTrack, onFilterChange])

  const clearFilters = () => {
    setSearch('')
    setSelectedCategory('')
    setSelectedLocation('')
    setSelectedTrack('')
    onFilterChange({})
  }

  const hasActiveFilters = search || selectedCategory || selectedLocation || selectedTrack

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Cari kerja: plumber, wiring, cuci rumah..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Filter Toggle & Active Filters */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-800"
        >
          <svg className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          Filters
          {hasActiveFilters && (
            <span className="bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full text-xs">
              Active
            </span>
          )}
        </button>
        
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-slate-500 hover:text-slate-700"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="bg-slate-50 rounded-xl p-4 space-y-4 animate-fadeIn">
          {/* Track Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Track</label>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedTrack(selectedTrack === 'LABOUR' ? '' : 'LABOUR')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition ${
selectedTrack === 'LABOUR'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                🛠️ Labour
              </button>
              <button
                onClick={() => setSelectedTrack(selectedTrack === 'TECHNICAL' ? '' : 'TECHNICAL')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition ${
                  selectedTrack === 'TECHNICAL'
                    ? 'bg-purple-500 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                💻 Technical
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-3 border border-slate-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.emoji ? `${cat.emoji} ` : ''}{cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full py-2 px-3 border border-slate-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Quick Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {[
          { label: 'Nearby', value: 'nearby', icon: '📍' },
          { label: 'Urgent', value: 'urgent', icon: '⚡' },
          { label: 'Today', value: 'today', icon: '📅' },
          { label: 'Under RM200', value: 'budget-200', icon: '💰' },
          { label: 'Verified', value: 'verified', icon: '✓' },
        ].map((chip) => (
          <button
            key={chip.value}
            className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-sm text-slate-600 whitespace-nowrap hover:bg-slate-50 transition"
          >
            <span>{chip.icon}</span>
            <span>{chip.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
