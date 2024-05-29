import React, { useEffect, useState } from 'react'
import { Rating, Card, CardHeader, CardBody } from '@material-tailwind/react'
import { useParams } from 'react-router-dom'

import { getRecommendations } from '../api/movies'
import MovieCardSkeleton from './movie-card-skeleton'

function MovieRecommend() {
  const { tmdbId } = useParams()
  const [recommendations, setRecommendations] = useState([])
  const [isLoadingRecommendations, setIsRecommendationLoading] = useState(true)

  useEffect(() => {
    const fetchRecomendations = async () => {
      try {
        const recData = await getRecommendations(tmdbId)
        setRecommendations(recData.results.slice(0, 8))
      } catch (error) {
        console.error('Recommendations 오류 발생:', error)
      } finally {
        setIsRecommendationLoading(false)
      }
    }

    fetchRecomendations()
  }, [tmdbId])

  return (
    <div className="mt-10 rounded-lg border border-gray-300 p-4 shadow-lg">
      <h2 className="mb-4 text-xl font-semibold text-blue-gray-900">
        이런 영화는 어떠신가요?
      </h2>
      {isLoadingRecommendations ? (
        <MovieCardSkeleton />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((rec) => (
            <Card key={rec.id} className="flex flex-col items-center">
              <CardHeader className="relative w-full">
                <img
                  src={`https://image.tmdb.org/t/p/w200${rec.poster_path}`}
                  alt={rec.title}
                  className="w-full rounded-lg object-cover"
                />
              </CardHeader>
              <CardBody className="text-center">
                <h3 className="text-lg font-semibold">{rec.title}</h3>
                <p className="text-base font-light">{rec.vote_average} / 10</p>
                <Rating value={Math.round(rec.vote_average / 2)} readonly />
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default MovieRecommend
