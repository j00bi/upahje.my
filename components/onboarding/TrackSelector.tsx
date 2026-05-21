'use client'

import type { Track } from "@/lib/domain"

interface TrackSelectorProps {
  role: 'employer' | 'talent'
  onSelect: (track: Track) => void
  selected?: Track
}

export function TrackSelector({ role, onSelect, selected }: TrackSelectorProps) {
  const tracks = [
    {
      value: 'LABOUR' as Track,
      label: 'Labour',
      emoji: '🛠️',
      description: role === 'talent' 
        ? 'Offer services like cleaning, gardening, delivery, etc.'
        : 'Find workers for physical tasks and home services'
    },
    {
      value: 'TECHNICAL' as Track,
      label: 'Technical',
      emoji: '💻',
      description: role === 'talent'
        ? 'Offer skills like web dev, design, marketing, writing'
        : 'Find freelancers for digital and creative work'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
      {tracks.map((track) => (
        <button
          key={track.value}
          onClick={() => onSelect(track.value)}
          className={`p-6 rounded-xl border-2 text-left transition-all ${
            selected === track.value
              ? 'border-purple-600 bg-purple-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="text-3xl mb-3">{track.emoji}</div>
          <div className="font-semibold text-lg">{track.label}</div>
          <div className="text-sm text-gray-600 mt-2 leading-snug">
            {track.description}
          </div>
        </button>
      ))}
    </div>
  )
}
