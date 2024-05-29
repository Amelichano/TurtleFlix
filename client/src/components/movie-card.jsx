import { Link } from 'react-router-dom'
import { Card, CardHeader, CardBody } from '@material-tailwind/react'
import { getDetails } from '../api/movies'
import { useEffect, useState } from 'react'
import MovieCardSkeleton from './movie-card-skeleton'

function MovieCard({ movie }) {
  const [isLoading, setIsLoading] = useState(true)
  const [details, setDetails] = useState('')

  useEffect(() => {
    getDetails(movie.tmdbId).then((data) => {
      setDetails(data)
      setIsLoading(false)
    })
  }, [])

  return isLoading ? (
    <MovieCardSkeleton />
  ) : (
    <Link to={`/details/${movie.tmdbId}`} className="flex w-full">
      <Card className="mt-6 w-full">
        <CardHeader color="blue-gray" className="relative aspect-square">
          <img
            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
            alt={movie.title}
            className="w-full"
          />
        </CardHeader>
        <CardBody>
          <h5 className="mb-2 line-clamp-1 font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            {details.title}
          </h5>
          <p className="line-clamp-3 font-sans text-base font-light leading-relaxed text-inherit antialiased">
            {details.overview || '줄거리가 없습니다.'}
          </p>
        </CardBody>
      </Card>
    </Link>
  )
}

export default MovieCard
