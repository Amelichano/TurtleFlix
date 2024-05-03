import MovieCard from '../components/movie-card'

import { MOVIE_DATA } from '../data/movie'

function Search() {
  return (
    <div className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
      {MOVIE_DATA.map((movie) => (
        <MovieCard key={`movie-${movie.id}`} movie={movie} />
      ))}
    </div>
  )
}

export default Search
