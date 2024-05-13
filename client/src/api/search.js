import { serverInstance } from './instance'

const getSearch = async (genre, title) => {
  const genreQuery = genre && `genreName=${genre}`
  const titleQuery = title && `title=${title}`
  const query = `?${[genreQuery, titleQuery].filter(Boolean).join('&')}`

  const response = await serverInstance.get(`/api/search${query}`)
  return response.data
}

export { getSearch }
