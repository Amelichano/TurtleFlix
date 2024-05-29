import React, { useEffect, useState } from 'react'
import { Button, Rating, IconButton } from '@material-tailwind/react'
import { getDetails } from '../api/movies'
import MovieDetailsSkeleton from './movie-details-skeleton'
import { useParams } from 'react-router-dom'

function MovieDetails() {
  const { tmdbId } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [details, setDetails] = useState({})

  useEffect(() => {
    if (tmdbId) {
      const fetchTmdbDetails = async () => {
        try {
          const tmdbData = await getDetails(tmdbId)
          setDetails(tmdbData)
        } catch (error) {
          console.error('TMDB details 오류 발생:', error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchTmdbDetails()
    }
  }, [tmdbId])

  return isLoading ? (
    <MovieDetailsSkeleton />
  ) : (
    <div className="rounded-lg border border-gray-300 p-4 shadow-lg">
      <div className="flex flex-row">
        <div className="w-1/3">
          <img
            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
            alt={details.title}
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
        <div className="w-2/3 pl-4">
          <h1 className="mb-2 text-2xl font-semibold text-blue-gray-900">
            {details.title}
          </h1>
          <p className="mb-4 text-base font-light">{details.tagline}</p>
          <p className="mb-4 text-base font-light">{details.overview}</p>
          <div className="mb-4 flex items-center">
            <strong className="mr-2">평점:</strong>
            <span className="ml-2 text-base font-light">
              {details.vote_average} / 10
            </span>
            <Rating value={Math.round(details.vote_average / 2)} readonly />
          </div>
          <p className="mb-2 text-base font-light">
            <strong>장르:</strong>{' '}
            {details.genres?.map((genre) => genre.name).join(', ')}
          </p>
          <p className="mb-2 text-base font-light">
            <strong>러닝타임:</strong>{' '}
            {details.runtime ? `${details.runtime} 분` : '정보 없음'}
          </p>
          <p className="mb-2 text-base font-light">
            <strong>개봉일:</strong> {details.release_date}
          </p>
          <p className="mb-2 text-base font-light">
            <strong>제작사:</strong>{' '}
            {details.production_companies
              ?.map((company) => company.name)
              .join(', ')}
          </p>
          <p className="mb-2 text-base font-light">
            <strong>국가:</strong>{' '}
            {details.production_countries
              ?.map((country) => country.name)
              .join(', ')}
          </p>
          <p className="mb-2 text-base font-light">
            <strong>언어:</strong>{' '}
            {details.spoken_languages
              ?.map((language) => language.name)
              .join(', ')}
          </p>
          <div className="mt-4 flex gap-4">
            <a
              href={`https://www.themoviedb.org/movie/${tmdbId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button color="blue">더 찾아보기</Button>
            </a>
            <a
              href={details.homepage}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button color="green">공식 홈페이지</Button>
            </a>
            <IconButton>
              <i className="fas fa-heart" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
