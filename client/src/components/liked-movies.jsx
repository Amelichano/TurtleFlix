import { useEffect, useState } from 'react'
import { Typography } from '@material-tailwind/react'

import { getLikedMovies } from '../api/movies'

function LikedMovies() {
  const [liked, setLiked] = useState([])

  useEffect(() => {
    const fetchLikedMovies = async () => {
      const response = await getLikedMovies()
      setLiked(response)
      console.log(response)
    }

    fetchLikedMovies()
  }, [])

  return liked.length === 0 ? (
    <Typography color="gray" className="w-full">
      좋아하는 영화가 없습니다.
    </Typography>
  ) : (
    <></>
  )
}

export default LikedMovies
