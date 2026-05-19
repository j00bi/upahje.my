'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { PortfolioProject } from '@/data/portfolioProjects'

interface ProjectCardProps {
  project: PortfolioProject
  onImageLoad?: () => void
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [liked, setLiked] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Link
      href={`/portfolio/${project.id}`}
      className="group block break-inside-avoid mb-5"
    >
      <article className="relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 transition-all duration-300 hover:border-zinc-700 hover:shadow-xl hover:shadow-amber-500/5 hover:-translate-y-0.5">
        {/* Cover Image */}
        <div className="relative overflow-hidden bg-zinc-800">
          <div className={`aspect-[4/3] transition-all duration-500 ${imageLoaded ? '' : 'animate-pulse bg-zinc-800'}`}>
            <Image
              src={project.coverImage}
              alt={project.title}
              width={800}
              height={600}
              className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>

          {/* Hover Overlay — Behance-style info on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Quick actions */}
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setLiked(!liked)
                }}
                className="flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-white/90 hover:bg-amber-500/80 transition-colors"
              >
                <svg className={`w-3.5 h-3.5 ${liked ? 'text-amber-400 fill-amber-400' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {liked ? project.likes + 1 : project.likes}
              </button>
            </div>
          </div>

          {/* Category Badge — always visible */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center rounded-full bg-black/60 backdrop-blur-sm px-2.5 py-1 text-[11px] font-medium tracking-wide text-white/90">
              {project.category}
            </span>
          </div>
        </div>

        {/* Card Info — Behance style, always visible below image */}
        <div className="p-4">
          <h3 className="text-sm font-medium text-white leading-snug line-clamp-1 group-hover:text-amber-400 transition-colors">
            {project.title}
          </h3>
          
          <div className="mt-2 flex items-center gap-2">
            <div className="relative h-5 w-5 flex-shrink-0 overflow-hidden rounded-full bg-zinc-700">
              <Image
                src={project.talentAvatar}
                alt={project.talentName}
                width={20}
                height={20}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-xs text-zinc-500 truncate">{project.talentName}</span>
          </div>

          {/* Tags */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] font-medium text-zinc-400"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="inline-flex items-center rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] font-medium text-zinc-500">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="mt-3 flex items-center gap-3 text-[11px] text-zinc-600">
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {project.likes}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              {project.views}
            </span>
            <span className="text-zinc-700">{project.year}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
