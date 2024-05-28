import { serverInstance } from './instance'

const getDBMovieDetails = async (id) => {
  const response = await serverInstance.get(`/api/movieDetails?movieId=${id}`)
  return response.data
}

export { getDBMovieDetails }
