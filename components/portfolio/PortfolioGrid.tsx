'use client'

import React, { useState, useMemo } from 'react'
import type { PortfolioProject } from '@/data/portfolioProjects'
import { ProjectCard } from './ProjectCard'

interface PortfolioGridProps {
  projects: PortfolioProject[]
  categories?: string[]
  showFilters?: boolean
  title?: string
  subtitle?: string
}

export function PortfolioGrid({
  projects,
  categories,
  showFilters = true,
  title,
  subtitle,
}: PortfolioGridProps) {
  const [activeCategory, setActiveCategory] = useState('All')

  // Auto-detect categories from projects if not provided
  const displayCategories = useMemo(() => {
    if (categories) return ['All', ...categories]
    const cats = new Set(projects.map((p) => p.category))
    return ['All', ...Array.from(cats)]
  }, [projects, categories])

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects
    return projects.filter((p) => p.category === activeCategory)
  }, [projects, activeCategory])

  return (
    <div className="w-full">
      {/* Header */}
      {title && (
        <div className="mb-3">
          <h2 className="text-xl font-bold text-white sm:text-2xl">{title}</h2>
          {subtitle && (
            <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
          )}
        </div>
      )}

      {/* Category Filter — Behance-style pills */}
      {showFilters && displayCategories.length > 1 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {displayCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-white text-black'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
              }`}
            >
              {cat === 'All' ? `All (${projects.length})` : cat}
            </button>
          ))}
        </div>
      )}

      {/* Masonry Grid — Behance-style */}
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 text-4xl">📭</div>
          <p className="text-sm font-medium text-zinc-400">No projects yet</p>
          <p className="mt-1 text-xs text-zinc-600">
            Projects in &ldquo;{activeCategory}&rdquo; will appear here.
          </p>
        </div>
      )}

      {/* Loading state (Behance-style skeleton) */}
      {projects.length === 0 && (
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="mb-5 animate-pulse break-inside-avoid">
              <div className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden">
                <div className={`bg-zinc-800 ${i % 3 === 0 ? 'aspect-[4/3]' : i % 3 === 1 ? 'aspect-square' : 'aspect-[3/4]'}`} />
                <div className="p-4 space-y-3">
                  <div className="h-4 w-3/4 rounded bg-zinc-800" />
                  <div className="flex gap-2">
                    <div className="h-5 w-5 rounded-full bg-zinc-800" />
                    <div className="h-3 w-24 rounded bg-zinc-800" />
                  </div>
                  <div className="flex gap-1.5">
                    <div className="h-4 w-14 rounded-full bg-zinc-800" />
                    <div className="h-4 w-16 rounded-full bg-zinc-800" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
