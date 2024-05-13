import { serverInstance } from './instance'

const getSearch = async (genre, title) => {
  const query = `?genre=${genre}&title=${title}`
  const response = await serverInstance.get(`/api/search${query}`)
  return response.data
}

export { getSearch }
