import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import MovieCard from '../components/movie-card'
import { getSearch } from '../api/search'
import BaseLayout from '../layouts/base-layout'

function Search() {
  const [searchParams] = useSearchParams()
  const genre = searchParams.get('genre')
  const title = searchParams.get('title')

  const [movies, setMovies] = useState([])

  useEffect(() => {
    getSearch(genre, title).then((data) => {
      setMovies(data)
    })
  }, [genre, title])

  return (
    <BaseLayout>
      <div className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
        {movies.map((movie) => (
          <MovieCard key={`movie-${movie.id}`} movie={movie} />
        ))}
      </div>
    </BaseLayout>
  )
}

export default Search
