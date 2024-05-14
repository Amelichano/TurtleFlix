import React, { useEffect, useState } from 'react'
import {
  Typography,
  Card,
  Input,
  Button,
  Select,
  Option,
  Alert,
} from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'

import BaseLayout from '../layouts/base-layout'

const GENRES = [
  { key: 'gen1', value: '1', name: 'Adventure' },
  { key: 'gen2', value: '2', name: 'Animation' },
  { key: 'gen3', value: '3', name: 'Children' },
  { key: 'gen4', value: '4', name: 'Comedy' },
  { key: 'gen5', value: '5', name: 'Fantasy' },
  { key: 'gen6', value: '6', name: 'Romance' },
  { key: 'gen7', value: '7', name: 'Drama' },
  { key: 'gen8', value: '8', name: 'Action' },
  { key: 'gen9', value: '9', name: 'Crime' },
  { key: 'gen10', value: '10', name: 'Thriller' },
  { key: 'gen11', value: '11', name: 'Horror' },
  { key: 'gen12', value: '12', name: 'Mystery' },
  { key: 'gen13', value: '13', name: 'Sci-Fi' },
  { key: 'gen14', value: '14', name: 'War' },
  { key: 'gen15', value: '15', name: 'Musical' },
  { key: 'gen16', value: '16', name: 'Documentary' },
  { key: 'gen17', value: '17', name: 'IMAX' },
  { key: 'gen18', value: '18', name: 'Western' },
  { key: 'gen19', value: '19', name: 'Film-Noir' },
]

function Root() {
  const [title, setTitle] = useState('')
  const [genre, setGenre] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const searchMovie = (e) => {
    e.preventDefault()
    if (!title && !genre) {
      setErrorMessage('제목이나 장르를 입력해주세요.')
    }
    setErrorMessage('')
    const genreQuery = genre && `genreName=${genre}`
    const titleQuery = title && `title=${title}`
    const query = `?${[genreQuery, titleQuery].filter(Boolean).join('&')}`
    navigate(`/search?${query}`)
  }

  useEffect(() => {
    if (errorMessage) {
      const timer = setErrorMessage(() => {
        setErrorMessage('')
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [errorMessage])

  return (
    <BaseLayout>
      <div className="flex items-center justify-center bg-white p-4">
        <div className={`fixed top-6 ${!errorMessage ? 'hidden' : ''}`}>
          <Alert variant="ghost">
            <span>{errorMessage}</span>
          </Alert>
        </div>

        <form
          className="mb-2 mt-8 w-80 max-w-screen-lg sm:w-96"
          onSubmit={searchMovie}
        >
          <Card className="w-full max-w-md p-6">
            <Typography
              className="mb-6 font-bold"
              variant="h4"
              color="blue-gray"
            >
              TurtleFlix
            </Typography>
            <Input
              type="text"
              placeholder="제목을 통해 검색하시겠습니까?"
              className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              labelProps={{
                className: 'hidden',
              }}
              containerProps={{ className: 'min-w-[100px]' }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="mt-6 w-full">
              <Select
                label="장르 선택"
                value={genre}
                onChange={(val) => setGenre(val)}
              >
                <Option value="">None</Option>
                {GENRES.map((genre) => (
                  <Option value={genre.value} key={genre.key}>
                    {genre.name}
                  </Option>
                ))}
              </Select>
            </div>
            <Button className="mt-6" type="submit" fullWidth>
              검색
            </Button>
          </Card>
        </form>
      </div>
    </BaseLayout>
  )
}

export default Root
