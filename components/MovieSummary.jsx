import React, { useState } from 'react'
const MovieSummary = ({ summary }) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="my-4">
      <h2 className="text-lg font-medium mb-1">Summary</h2>
      <p className="text-sm text-gray-300">
        {expanded ? summary : `${summary.slice(0, 100)}...`}
        {summary.length > 100 && (
          <button
            className="text-red-500 ml-1 font-medium"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Read less' : 'Read more'}
          </button>
        )}
      </p>
    </div>
  )
}
export default MovieSummary