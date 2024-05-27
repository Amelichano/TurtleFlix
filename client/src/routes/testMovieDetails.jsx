import MovieDetails from '../components/movieDetails';
import BaseLayout from '../layouts/base-layout'

function TestMovieDetails({ tmdbId }) {
  const testTmdbId = '617127'; // 임의로 설정한 tmdbId
  tmdbId = testTmdbId;

  return (
    <BaseLayout>
      <div className="test-movie-details">
        <MovieDetails tmdbId={tmdbId} />
      </div>
    </BaseLayout>
  );
}

export default TestMovieDetails;
