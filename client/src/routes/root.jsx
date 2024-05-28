import React, { useState } from 'react'
import { Card, Input, Button, Select, Option } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'

import BaseLayout from '../layouts/base-layout'
import PopularCarousel from '../components/popular-carousel'

const GENRES = [
  { key: 'gen1', name: 'Adventure' },
  { key: 'gen2', name: 'Animation' },
  { key: 'gen3', name: 'Children' },
  { key: 'gen4', name: 'Comedy' },
  { key: 'gen5', name: 'Fantasy' },
  { key: 'gen6', name: 'Romance' },
  { key: 'gen7', name: 'Drama' },
  { key: 'gen8', name: 'Action' },
  { key: 'gen9', name: 'Crime' },
  { key: 'gen10', name: 'Thriller' },
  { key: 'gen11', name: 'Horror' },
  { key: 'gen12', name: 'Mystery' },
  { key: 'gen13', name: 'Sci-Fi' },
  { key: 'gen14', name: 'War' },
  { key: 'gen15', name: 'Musical' },
  { key: 'gen16', name: 'Documentary' },
  { key: 'gen17', name: 'IMAX' },
  { key: 'gen18', name: 'Western' },
  { key: 'gen19', name: 'Film-Noir' },
]

function Root() {
  const [title, setTitle] = useState('')
  const [genre, setGenre] = useState('')
  const navigate = useNavigate()

  const searchMovie = (e) => {
    e.preventDefault()
    const genreQuery = genre && `genre=${genre}`
    const titleQuery = title && `title=${title}`
    const query = `?${[genreQuery, titleQuery].filter(Boolean).join('&')}`
    navigate(`/search${query}`)
  }

  return (
    <BaseLayout>
      <div className="flex flex-col items-center gap-8 bg-white p-4">
        <h2 className="w-full text-2xl font-bold md:text-4xl">인기 영화</h2>
        <PopularCarousel />
        <Card className="w-full p-6">
          <form
            onSubmit={searchMovie}
            className="flex w-full flex-col gap-6 lg:flex-row"
          >
            <div className="flex w-full flex-col gap-4">
              <Input
                type="text"
                placeholder="Toy Story (1995)"
                label="영화 제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Select
                label="장르"
                value={genre}
                onChange={(val) => setGenre(val)}
              >
                {GENRES.map((genre) => (
                  <Option value={genre.name} key={genre.key}>
                    {genre.name}
                  </Option>
                ))}
              </Select>
            </div>
            <Button type="submit" className="w-full lg:w-1/4 lg:text-lg">
              검색
            </Button>
          </form>
        </Card>
      </div>
    </BaseLayout>
  )
}

export default Root
