import React from 'react'
import StarRating from './StarRating'
const MovieHeader = ({ title, genres, runtime, rating, reviewCount }) => {
  return (
    <div className="mb-4">
      <h1 className="text-2xl font-bold mb-1">{title}</h1>
      <div className="flex items-center text-sm text-gray-400 mb-3">
        {genres.join(' • ')} • {runtime}
      </div>
      <div className="flex items-center">
        <StarRating rating={rating} />
        <span className="text-gray-400 text-sm ml-2">({reviewCount})</span>
      </div>
    </div>
  )
}
export default MovieHeader