import MovieDetails from '../components/movie-details'

import BaseLayout from '../layouts/base-layout'

function Details() {
  return (
    <BaseLayout>
      <div className="test-movie-details">
        <MovieDetails />
      </div>
    </BaseLayout>
  )
}

export default Details
