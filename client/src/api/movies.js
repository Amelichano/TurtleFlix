import { tmdbInstance } from './instance'

const getDetails = async (id) => {
  const response = await tmdbInstance.get(`/movie/${id}?language=ko-KR`)
  return response.data
}

export { getDetails }

const getRecomendations = async (id) => {
  const response = await tmdbInstance.get(`/movie/${id}/recommendations`)
  return response.data
}

export { getRecomendations }

