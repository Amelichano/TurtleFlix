import MovieDetails from '../components/movie-details';

import BaseLayout from '../layouts/base-layout'

function PrintMovieDetails() {
  return (
    <BaseLayout>
      <div className="test-movie-details">
        <MovieDetails/>
      </div>
    </BaseLayout>
  );
}

export default PrintMovieDetails;
