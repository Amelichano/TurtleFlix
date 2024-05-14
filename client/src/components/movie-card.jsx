import { Link } from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from '@material-tailwind/react'
import { getDetails } from '../api/movies'
import { useEffect, useState } from 'react'

function MovieCard({ movie }) {
  const [details, setDetails] = useState('')

  useEffect(() => {
    getDetails(movie.tmdbId).then((data) => {
      setDetails(data)
    })
  }, [])

  return (
    <Card className="mt-6 w-80">
      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
          alt={movie.title}
        />
      </CardHeader>
      <CardBody>
        <h5 className="mb-2 line-clamp-1 font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {movie.title}
        </h5>
        <p className="line-clamp-2 font-sans text-base font-light leading-relaxed text-inherit antialiased">
          {details.overview ?? ''}
        </p>
      </CardBody>
      <CardFooter className="flex gap-4 pt-0">
        <Link to={`https://www.themoviedb.org/movie/${movie.tmdbId}`}>
          <Button color="blue">TMDB</Button>
        </Link>
        <Link to={`https://www.imdb.com/title/${details.imdb_id}`}>
          <Button color="yellow">IMDB</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default MovieCard
