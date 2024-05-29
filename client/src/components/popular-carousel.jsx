import React, { useState, useEffect } from 'react'
import { Carousel } from '@material-tailwind/react'
import { Link } from 'react-router-dom'

import { getPopular } from '../api/movies'

function PopularCarousel() {
  const [popular, setPopular] = useState([])

  useEffect(() => {
    async function getPopularMovies() {
      const popularMovies = await getPopular()
      setPopular(popularMovies.results.slice(0, 10))
    }

    getPopularMovies()
  }, [])

  return (
    <Carousel className="w-full rounded-xl">
      {popular.map((movie) => (
        <Link to={`/details/${movie.id}`} className="group relative">
          <img
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
            className="h-80 w-full object-cover brightness-50 transition group-hover:brightness-[.35] md:aspect-video md:h-full"
          />
          <div className="absolute bottom-0 left-0 p-16">
            <h3 className="mb-4 line-clamp-1 text-4xl font-bold text-white">
              {movie.title}
            </h3>
            <p className="line-clamp-4 w-full text-white md:w-1/2">
              {movie.overview}
            </p>
          </div>
        </Link>
      ))}
    </Carousel>
  )
}

export default PopularCarousel
