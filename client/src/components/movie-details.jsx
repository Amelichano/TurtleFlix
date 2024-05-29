import React, { useEffect, useState } from 'react'
import {
  Button,
  Rating,
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
} from '@material-tailwind/react'
import { useParams } from 'react-router-dom'
import {
  ArrowRightIcon,
  HeartFilledIcon,
  HeartIcon,
} from '@radix-ui/react-icons'

import { postDeleteLike, getDetails, getIsLiked, postLike } from '../api/movies'
import MovieDetailsSkeleton from './movie-details-skeleton'

function MovieDetails() {
  const { tmdbId } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
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

      const fetchIsLiked = async () => {
        const response = await getIsLiked(tmdbId)
        setIsLiked(response)
      }

      fetchTmdbDetails()
      fetchIsLiked()
    }
  }, [tmdbId])

  const handleLike = async () => {
    try {
      await postLike(tmdbId)
      setIsLiked(true)
    } catch (error) {
      console.error('좋아요 오류 발생:', error)
    }
  }

  const handleUnlike = async () => {
    try {
      await postDeleteLike(tmdbId)
      setIsLiked(false)
    } catch (error) {
      console.error('좋아요 취소 오류 발생:', error)
    }
  }

  return isLoading ? (
    <MovieDetailsSkeleton />
  ) : (
    <Card className="w-full flex-col md:flex-row">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-full shrink-0 md:w-2/5 md:rounded-r-none"
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
          alt={details.title}
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody className="flex w-full flex-col justify-between gap-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Typography variant="h6" color="gray" className="mb-2 uppercase">
              {details.tagline}
            </Typography>
            <IconButton
              variant="text"
              onClick={isLiked ? handleUnlike : handleLike}
            >
              {isLiked ? (
                <HeartFilledIcon className="h-6 w-6 text-red-500" />
              ) : (
                <HeartIcon className="h-6 w-6 text-red-500" />
              )}
            </IconButton>
          </div>
          <Typography variant="h4" color="blue-gray">
            {details.title}
          </Typography>
          <Typography color="gray" className="font-normal">
            {details.overview}
          </Typography>
        </div>
        <div className="flex flex-col gap-2 uppercase">
          <div className="mb-6 flex items-center gap-2 font-bold text-blue-gray-500">
            {Math.round(details.vote_average * 5) / 10}
            <Rating value={Math.round(details.vote_average / 2)} readonly />
            <Typography
              color="blue-gray"
              className="font-medium text-blue-gray-500"
            >
              {details.vote_count} 리뷰
            </Typography>
          </div>
          <Typography color="gray">
            장르: {details.genres?.map((genre) => genre.name).join(', ')}
          </Typography>
          <Typography color="gray">
            러닝타임:
            {details.runtime ? `${details.runtime} 분` : '정보 없음'}
          </Typography>
          <Typography color="gray">개봉일: {details.release_date}</Typography>
          <Typography color="gray">
            제작사:
            {details.production_companies
              ?.map((company) => company.name)
              .join(', ')}
          </Typography>
          <Typography color="gray">
            국가:
            {details.production_countries
              ?.map((country) => country.name)
              .join(', ')}
          </Typography>
          <Typography color="gray">
            언어:
            {details.spoken_languages
              ?.map((language) => language.name)
              .join(', ')}
          </Typography>
        </div>
        <div className="flex gap-4">
          <a
            href={`https://www.themoviedb.org/movie/${tmdbId}`}
            className="inline-block"
          >
            <Button color="blue" className="flex items-center gap-2">
              더 알아보기
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </a>
          {details.homepage && (
            <a href={details.homepage} className="inline-block">
              <Button color="green">공식 홈페이지</Button>
            </a>
          )}
        </div>
      </CardBody>
    </Card>
  )
}

export default MovieDetails
