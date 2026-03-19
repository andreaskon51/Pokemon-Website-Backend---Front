import React from 'react'
import { Star, StarHalf } from 'lucide-react'

interface StarRatingProps {
  rating: number
  totalReviews?: number
  size?: 'sm' | 'md' | 'lg'
  showCount?: boolean
}

export default function StarRating({ rating, totalReviews, size = 'sm', showCount = true }: StarRatingProps) {
  const starSize = size === 'lg' ? 'w-5 h-5' : size === 'md' ? 'w-4 h-4' : 'w-3.5 h-3.5'
  const full = Math.floor(rating)
  const hasHalf = rating - full >= 0.5
  const empty = 5 - full - (hasHalf ? 1 : 0)

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: full }).map((_, i) => (
          <Star key={`f${i}`} className={`${starSize} fill-amber-400 text-amber-400`} />
        ))}
        {hasHalf && <StarHalf className={`${starSize} fill-amber-400 text-amber-400`} />}
        {Array.from({ length: empty }).map((_, i) => (
          <Star key={`e${i}`} className={`${starSize} text-gray-600`} />
        ))}
      </div>
      {showCount && totalReviews !== undefined && (
        <span className={`text-gray-400 ${size === 'lg' ? 'text-sm' : 'text-xs'}`}>
          ({totalReviews})
        </span>
      )}
    </div>
  )
}
