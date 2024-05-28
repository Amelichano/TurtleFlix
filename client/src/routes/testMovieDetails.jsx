import MovieDetails from '../components/movieDetails';

import BaseLayout from '../layouts/base-layout'

function TestMovieDetails({ tmdbId }) {
  const testdbId = '862'; // 임의로 설정한 tmdbId
  tmdbId = testdbId;

  return (
    <BaseLayout>
      <div className="test-movie-details">
        <MovieDetails tmdbId={tmdbId} />
      </div>
    </BaseLayout>
  );
}

export default TestMovieDetails;
