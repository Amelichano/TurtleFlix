import { tmdbInstance } from './instance'

const getDetails = async (id) => {
  const response = await tmdbInstance.get(`/movie/${id}?language=ko-KR`)
  return response.data
}

const getRecommendations = async (id) => {
  const response = await tmdbInstance.get(`/movie/${id}/recommendations`)
  return response.data
}

export { getDetails, getRecommendations }

