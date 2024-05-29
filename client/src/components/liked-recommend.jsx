import { useEffect, useState } from 'react'
import { Typography } from '@material-tailwind/react'

import { getLikedRecommendations } from '../api/movies'

function LikecRecommend() {
  const [recommendations, setRecommendations] = useState([])

  useEffect(() => {
    const fetchRecommendations = async () => {
      const response = await getLikedRecommendations()
      setRecommendations(response.data)
      console.log(response)
    }

    fetchRecommendations()
  }, [])

  return recommendations.length === 0 ? (
    <Typography color="gray" className="w-full">
      좋아요를 눌러서 영화를 추천받아보세요!
    </Typography>
  ) : (
    <></>
  )
}

export default LikecRecommend
