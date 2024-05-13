import axios from 'axios'

const tmdbInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
})

tmdbInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}`
  return config
})

export { tmdbInstance }
