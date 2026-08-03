'use client'

import { useState, useEffect } from 'react'
import { JobFilters as JobFiltersType } from '@/lib/actions/jobs'
import { useLanguage } from '@/lib/i18n'

interface JobFiltersProps {
  onFilterChange: (filters: JobFiltersType) => void
  categories: { id: string; name: string; emoji?: string; track: string }[]
  locations: string[]
  initialFilters?: JobFiltersType
}

export function JobFilters({ onFilterChange, categories, locations, initialFilters }: JobFiltersProps) {
  const { isEnglish } = useLanguage()
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
        <label htmlFor="job-list-search" className="sr-only">
          {isEnglish ? 'Search jobs' : 'Cari kerja'}
        </label>
        <input
          id="job-list-search"
          type="text"
          placeholder={isEnglish ? 'Search: cleaner, photographer, painter...' : 'Cari: cleaner, jurugambar, tukang cat...'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
            aria-label={isEnglish ? 'Clear job search' : 'Kosongkan carian kerja'}
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
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-800"
          aria-expanded={showFilters}
          aria-controls="job-filter-options"
        >
          <svg className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          {isEnglish ? 'Filters' : 'Tapis'}
          {hasActiveFilters && (
            <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs">
              {isEnglish ? 'Active' : 'Aktif'}
            </span>
          )}
        </button>
        
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm text-slate-500 hover:text-slate-700"
          >
            {isEnglish ? 'Clear all' : 'Kosongkan semua'}
          </button>
        )}
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div id="job-filter-options" className="bg-slate-50 rounded-xl p-4 space-y-4 animate-fadeIn">
          {/* Track Filter */}
          <fieldset>
            <legend className="block text-sm font-medium text-slate-700 mb-2">
              {isEnglish ? 'Type of work' : 'Jenis kerja'}
            </legend>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSelectedTrack(selectedTrack === 'LABOUR' ? '' : 'LABOUR')}
                aria-pressed={selectedTrack === 'LABOUR'}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition ${
selectedTrack === 'LABOUR'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {isEnglish ? '🛠️ Physical work' : '🛠️ Kerja fizikal'}
              </button>
              <button
                type="button"
                onClick={() => setSelectedTrack(selectedTrack === 'TECHNICAL' ? '' : 'TECHNICAL')}
                aria-pressed={selectedTrack === 'TECHNICAL'}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition ${
                  selectedTrack === 'TECHNICAL'
                    ? 'bg-purple-500 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {isEnglish ? '💻 Technical' : '💻 Teknikal'}
              </button>
            </div>
          </fieldset>

          {/* Category Filter */}
          <div>
            <label htmlFor="job-category-filter" className="block text-sm font-medium text-slate-700 mb-2">
              {isEnglish ? 'Category' : 'Kategori'}
            </label>
            <select
              id="job-category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-3 border border-slate-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">{isEnglish ? 'All categories' : 'Semua kategori'}</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.emoji ? `${cat.emoji} ` : ''}{cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label htmlFor="job-location-filter" className="block text-sm font-medium text-slate-700 mb-2">
              {isEnglish ? 'Location' : 'Lokasi'}
            </label>
            <select
              id="job-location-filter"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full py-2 px-3 border border-slate-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">{isEnglish ? 'All locations' : 'Semua lokasi'}</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  )
}
