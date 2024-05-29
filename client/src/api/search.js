import { serverInstance } from './instance'

const getSearch = async (genre, title, sort, page) => {
  const genreQuery = genre && `genreName=${genre}`
  const titleQuery = title && `title=${title}`
  const pageQuery = page && `page=${page}`
  const sortQuery = sort && `sortDirection=${sort}`
  const query = `?${[genreQuery, titleQuery, pageQuery, sortQuery].filter(Boolean).join('&')}`

  const response = await serverInstance.get(`/api/search${query}`)
  return response.data
}

export { getSearch }
