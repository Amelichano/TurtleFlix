import React, { useEffect, useState } from 'react'
import {
  Rating,
  Card,
  Typography,
  CardHeader,
  CardBody,
  Spinner,
} from '@material-tailwind/react'
import { useParams, useNavigate } from 'react-router-dom'

import { getRecommendations } from '../api/movies'
import MovieCardSkeleton from './movie-card-skeleton'

function MovieRecommend() {
  const { tmdbId } = useParams()
  const navigate = useNavigate()
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
    <Card className="mt-10 w-full shadow-none">
      <CardBody className="p-0">
        <Typography variant="h5" color="blue-gray" className="mb-2">
          이런 영화는 어떠신가요?
        </Typography>
        {isLoadingRecommendations ? (
          <Spinner className="h-12 w-12" />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((rec) => (
              <Card
                key={rec.id}
                className="cursor-pointer"
                onClick={() => {
                  navigate(`/details/${rec.id}`)
                }}
              >
                <CardHeader floated={false} className="aspect-square">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${rec.poster_path}`}
                    alt={rec.title}
                    className="w-full rounded-lg object-cover"
                  />
                </CardHeader>
                <CardBody className="text-center">
                  <Typography variant="h4" color="blue-gray" className="mb-2">
                    {rec.title}
                  </Typography>
                  <Typography
                    color="blue-gray"
                    className="font-medium"
                    textGradient
                  >
                    {Math.round(rec.vote_average * 5) / 10} / 5
                  </Typography>
                  <Rating value={Math.round(rec.vote_average / 2)} readonly />
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  )
}

export default MovieRecommend
