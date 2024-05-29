import BaseLayout from '../layouts/base-layout'
import MovieDetails from '../components/movie-details'
import MovieRecommend from '../components/movie-recommend'

function Details() {
  return (
    <BaseLayout>
      <div className="flex w-full flex-col">
        <MovieDetails />
        <MovieRecommend />
      </div>
    </BaseLayout>
  )
}

export default Details
