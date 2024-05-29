import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { IconButton, Typography } from '@material-tailwind/react'

import MovieCard from '../components/movie-card'
import { getSearch } from '../api/search'
import BaseLayout from '../layouts/base-layout'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'

function Search() {
  const [searchParams] = useSearchParams()
  const genre = searchParams.get('genre')
  const title = searchParams.get('title')
  const sort = searchParams.get('sort')

  const [movieCount, setMovieCount] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [movies, setMovies] = useState([])

  useEffect(() => {
    getSearch(genre, title, sort, page).then((result) => {
      setMovies(result.data)
      setMovieCount(result.pageInfo.totalElements)
      setTotalPages(result.pageInfo.totalPages)
    })
  }, [genre, title, page, sort])

  const next = () => {
    if (page === totalPages) return
    setPage((prev) => prev + 1)
  }

  const prev = () => {
    if (page === 1) return
    setPage((prev) => prev - 1)
  }

  return (
    <BaseLayout>
      <div className="flex w-full flex-col items-center gap-16">
        <div className="mt-8 flex flex-col items-center gap-2">
          <span className="text-xl font-semibold">제목: {title ?? '전체'}</span>
          <span className="text-xl font-semibold">장르: {genre ?? '전체'}</span>
          <span className="font-medium">
            총 {movieCount}개의 영화가 검색되었습니다.
          </span>
        </div>
        <div className="grid w-full grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
          {movies.map((movie) => (
            <MovieCard key={`movie-${movie.id}`} movie={movie} />
          ))}
        </div>
        <div className="flex items-center gap-8">
          <IconButton
            size="sm"
            variant="outlined"
            onClick={prev}
            disabled={page === 1}
          >
            <ChevronLeftIcon strokeWidth={2} className="h-4 w-4" />
          </IconButton>
          <Typography color="gray" className="font-normal">
            Page <strong className="text-gray-900">{page}</strong> of{' '}
            <strong className="text-gray-900">{totalPages}</strong>
          </Typography>
          <IconButton
            size="sm"
            variant="outlined"
            onClick={next}
            disabled={page === totalPages}
          >
            <ChevronRightIcon strokeWidth={2} className="h-4 w-4" />
          </IconButton>
        </div>
      </div>
    </BaseLayout>
  )
}

export default Search
