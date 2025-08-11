import React from 'react'
const MovieCredits = ({ director, cast }) => {
  return (
    <div className="mb-6">
      <div className="mb-2">
        <span className="text-gray-400 text-sm">Director: </span>
        <span className="text-sm">{director}</span>
      </div>
      <div>
        <span className="text-gray-400 text-sm">Cast: </span>
        <span className="text-sm">{cast.join(', ')}</span>
      </div>
    </div>
  )
}
export default MovieCredits