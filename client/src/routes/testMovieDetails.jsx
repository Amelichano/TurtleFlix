import MovieDetails from '../components/movieDetails';

function TestMovieDetails() {
  const testTmdbId = '617127'; // 임의로 설정한 tmdbId

  return (
    <div className="test-movie-details">
      <MovieDetails tmdbId={testTmdbId} />
    </div>
  );
}

export default TestMovieDetails;
