import { serverInstance } from './instance'

const getSearch = async (genre, title, page) => {
  const genreQuery = genre && `genreName=${genre}`
  const titleQuery = title && `title=${title}`
  const pageQuery = page && `page=${page}`
  const query = `?${[genreQuery, titleQuery, pageQuery].filter(Boolean).join('&')}`

  const response = await serverInstance.get(`/api/search${query}`)
  return response.data
}

export { getSearch }
