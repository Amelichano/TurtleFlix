import MovieDetails from '../components/movieDetails';

import BaseLayout from '../layouts/base-layout'

function TestMovieDetails({ id }) {
  const testdbId = '1'; // 임의로 설정한 tmdbId
  id = testdbId;

  return (
    <BaseLayout>
      <div className="test-movie-details">
        <MovieDetails id={id} />
      </div>
    </BaseLayout>
  );
}

export default TestMovieDetails;
