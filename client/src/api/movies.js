import { serverInstance, tmdbInstance } from './instance'

const getDetails = async (id) => {
  const response = await tmdbInstance.get(`/movie/${id}?language=ko-KR`)
  return response.data
}

const getPopular = async () => {
  const response = await tmdbInstance.get(
    '/movie/popular?language=ko-KR&page=1&region=KOR',
  )
  return response.data
}

const getRecommendations = async (id) => {
  const response = await tmdbInstance.get(
    `/movie/${id}/recommendations?language=ko-KR`,
  )
  return response.data
}

const getIsLiked = async (movieId) => {
  const response = await serverInstance.get(`/api/isLiked?tmdbId=${movieId}`)
  return response.data
}

const postLike = async (movieId) => {
  const response = await serverInstance.post(`/api/like?tmdbId=${movieId}`)
  return response.data
}

const deleteLike = async (movieId) => {
  const response = await serverInstance.delete(`/api/deleteLike/${movieId}`)
  return response.data
}

const getLikedRecommendations = async () => {
  const response = await serverInstance.get('/api/recommendations')
  return response.data
}

const getLikedMovies = async () => {
  const response = await serverInstance.get('/api/likedMovies')
  return response.data
}

export {
  getDetails,
  getPopular,
  getRecommendations,
  getIsLiked,
  postLike,
  deleteLike,
  getLikedRecommendations,
  getLikedMovies,
}
