import axios from 'axios'

const tmdbInstance = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
})

const serverInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  withCredentials: true,
})

tmdbInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}`
  return config
})

export { tmdbInstance, serverInstance }
