'use client'

import { useState } from 'react'

interface StarRatingPickerProps {
  rating: number
  onChange: (rating: number) => void
  disabled?: boolean
}

export function StarRatingPicker({ rating, onChange, disabled }: StarRatingPickerProps) {
  const [hoverRating, setHoverRating] = useState(0)

  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={disabled}
          onClick={() => !disabled && onChange(star)}
          onMouseEnter={() => !disabled && setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          className={`text-3xl transition-transform hover:scale-110 ${
            disabled ? 'cursor-default' : 'cursor-pointer'
          }`}
        >
          <span className={`
            ${star <= (hoverRating || rating) ? 'text-amber-400' : 'text-gray-300'}
          `}>
            ★
          </span>
        </button>
      ))}
      <span className="ml-2 text-sm text-gray-500">
        {rating > 0 ? `${rating} star${rating !== 1 ? 's' : ''}` : 'Select rating'}
      </span>
    </div>
  )
}