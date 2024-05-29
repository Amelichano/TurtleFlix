import { useEffect, useState } from 'react'
import { Typography } from '@material-tailwind/react'

import { getLikedMovies } from '../api/movies'
import MoviesCarousel from './movies-carousel'

function LikedMovies() {
  const [liked, setLiked] = useState([])

  useEffect(() => {
    const fetchLikedMovies = async () => {
      const response = await getLikedMovies()
      setLiked(response)
    }

    fetchLikedMovies()
  }, [])

  return liked.length === 0 ? (
    <Typography color="gray" className="w-full">
      좋아하는 영화가 없습니다.
    </Typography>
  ) : (
    <MoviesCarousel movies={liked} />
  )
}

export default LikedMovies
