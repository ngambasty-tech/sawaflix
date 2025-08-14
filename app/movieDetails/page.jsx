"use client"

import React from 'react'
import MovieHeader from '../../components/MovieHeader'
import MovieSummary from '../../components/MovieSummary'
import MovieCredits from '../../components/MovieCredits'
import MovieActions from '../../components/MovieActions'
// Mock movie data
const movieData = {
  id: 1,
  title: 'Spider-Man: No Way Home',
  posterUrl:
    'https://image.tmdb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
  genres: ['Action', 'Adventure', 'Fantasy'],
  runtime: '2h 13m',
  rating: 4.5,
  reviewCount: 148,
  summary:
    "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.",
  director: 'Jon Watts',
  cast: ['Tom Holland', 'Zendaya', 'Benedict Cumberbatch'],
}
const MovieDetails = () => {
  return (
    <div className="max-w-md mx-auto pb-10 text-white">
      <div className="relative">
        <img
          src={movieData.posterUrl}
          alt={movieData.title}
          className="w-full h-auto rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-lg"></div>
      </div>
      <div className="px-4 -mt-6 relative z-10">
        <MovieHeader
          title={movieData.title}
          genres={movieData.genres}
          runtime={movieData.runtime}
          rating={movieData.rating}
          reviewCount={movieData.reviewCount}
        />
        <MovieSummary summary={movieData.summary} />
        <MovieCredits director={movieData.director} cast={movieData.cast} />
        <MovieActions />
      </div>
    </div>
  )
}
export default MovieDetails