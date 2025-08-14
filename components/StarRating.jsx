import React from 'react'
import { StarIcon } from 'lucide-react'
const StarRating = ({ rating }) => {
  // Convert rating to nearest half star (e.g., 4.5)
  const roundedRating = Math.round(rating * 2) / 2
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => {
        // Full star
        if (star <= roundedRating) {
          return (
            <StarIcon
              key={star}
              className="w-4 h-4 text-red-500 fill-red-500"
            />
          )
        }
        // Half star
        else if (star - 0.5 === roundedRating) {
          return (
            <div key={star} className="relative">
              <StarIcon className="w-4 h-4 text-gray-400" />
              <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                <StarIcon className="w-4 h-4 text-red-500 fill-red-500" />
              </div>
            </div>
          )
        }
        // Empty star
        else {
          return <StarIcon key={star} className="w-4 h-4 text-gray-400" />
        }
      })}
    </div>
  )
}
export default StarRating