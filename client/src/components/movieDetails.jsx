import React, { useEffect, useState } from 'react';
import { 
  Button, 
  Rating, 
  Card, 
  CardHeader, 
  CardBody 
} from '@material-tailwind/react';
import { getDetails, getRecommendations } from './api/movies';
import MovieCardSkeleton from './movie-card-skeleton';
import { useParams } from 'react-router-dom';

function MovieDetails() {
  const { tmdbId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (tmdbId) {
      const fetchTmdbDetails = async () => {
        try {
          const tmdbData = await getDetails(tmdbId);
          setDetails(tmdbData);
          setIsLoading(false);
        } catch (error) {
          console.error('TMDB details 오류 발생:', error);
          setIsLoading(false);
        }
      };

      const fetchRecommendations = async () => {
        try {
          const recData = await getRecommendations(tmdbId);
          setRecommendations(recData.results.slice(0, 8));
        } catch (error) {
          console.error('Recommendations 오류 발생:', error);
        }
      };

      fetchTmdbDetails();
      fetchRecommendations();
    }
  }, [tmdbId]);

  return isLoading ? (
    <MovieCardSkeleton />
  ) : (
    <div className="container mx-auto mt-6">
      <div className="p-4 border border-gray-300 rounded-lg shadow-lg">
        <div className="flex flex-row">
          <div className="w-1/3">
            <img
              src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
              alt={details.title}
              className="h-full w-full object-cover rounded-lg"
            />
          </div>
          <div className="w-2/3 pl-4">
            <h1 className="mb-2 text-2xl font-semibold text-blue-gray-900">
              {details.title}
            </h1>
            <p className="mb-4 text-base font-light">{details.tagline}</p>
            <p className="mb-4 text-base font-light">{details.overview}</p>
            <div className="mb-4 flex items-center">
              <strong className="mr-2">평점:</strong>
              <span className="ml-2 text-base font-light">{details.vote_average} / 10</span>
              <Rating value={Math.round(details.vote_average / 2)} readonly />
            </div>
            <p className="mb-2 text-base font-light">
              <strong>장르:</strong> {details.genres?.map(genre => genre.name).join(', ')}
            </p>
            <p className="mb-2 text-base font-light">
              <strong>러닝타임:</strong> {details.runtime ? `${details.runtime} 분` : '정보 없음'}
            </p>
            <p className="mb-2 text-base font-light">
              <strong>개봉일:</strong> {details.release_date}
            </p>
            <p className="mb-2 text-base font-light">
              <strong>제작사:</strong> {details.production_companies?.map(company => company.name).join(', ')}
            </p>
            <p className="mb-2 text-base font-light">
              <strong>국가:</strong> {details.production_countries?.map(country => country.name).join(', ')}
            </p>
            <p className="mb-2 text-base font-light">
              <strong>언어:</strong> {details.spoken_languages?.map(language => language.name).join(', ')}
            </p>
            <div className="flex gap-4 mt-4">
              <a href={`https://www.themoviedb.org/movie/${tmdbId}`} target="_blank" rel="noopener noreferrer">
                <Button color="blue">더 찾아보기</Button>
              </a>
              <a href={details.homepage} target="_blank" rel="noopener noreferrer">
                <Button color="green">공식 홈페이지</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 p-4 border border-gray-300 rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-blue-gray-900 mb-4">비슷한 영화 추천</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map(rec => (
            <Card key={rec.id} className="flex flex-col items-center">
              <CardHeader className="relative w-full">
                <img
                  src={`https://image.tmdb.org/t/p/w200${rec.poster_path}`}
                  alt={rec.title}
                  className="w-full object-cover rounded-lg"
                />
              </CardHeader>
              <CardBody className="text-center">
                <h3 className="text-lg font-semibold">{rec.title}</h3>
                <p className="text-base font-light">{rec.vote_average} / 10</p>
                <Rating value={Math.round(rec.vote_average / 2)} readonly />
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;