import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
  } from '@material-tailwind/react';
  import { getDetails } from '../api/movies';
  import { useEffect, useState } from 'react';
  import MovieCardSkeleton from './movie-card-skeleton';
  
  function MovieDetails({ tmdbId }) {
    
    const [isLoading, setIsLoading] = useState(true);
    const [details, setDetails] = useState({});
  
    useEffect(() => {
      getDetails(tmdbId).then((data) => {
        setDetails(data);
        setIsLoading(false);
      });
    }, [tmdbId]);
  
    return isLoading ? (
      <MovieCardSkeleton />
    ) : (
      <Card className="mt-6 w-full flex flex-row">
        <CardHeader color="blue-gray" className="relative w-1/3">
          <img
            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
            alt={details.title}
          />
        </CardHeader>
        <CardBody className="w-2/3">
          <h5 className="mb-2 font-sans text-xl font-semibold text-blue-gray-900">
            {details.title}
          </h5>
          <p className="mb-4 font-sans text-base font-light">{details.overview}</p>
          <p className="font-sans text-base font-light">
            <strong>장르:</strong> {details.genres?.map(genre => genre.name).join(', ')}
          </p>
          <p className="font-sans text-base font-light">
          <strong>러닝타임:</strong> {details.runtime ? `${details.runtime} 분` : '정보 없음'}
          </p>
          <p className="font-sans text-base font-light">
            <strong>개봉일:</strong> {details.release_date}
          </p>
          <p className="font-sans text-base font-light">
            <strong>제작사:</strong> {details.production_companies?.map(company => company.name).join(', ')}
          </p>
          <p className="font-sans text-base font-light">
            <strong>국가:</strong> {details.production_countries?.map(country => country.name).join(', ')}
          </p>
          <p className="font-sans text-base font-light">
            <strong>언어:</strong> {details.spoken_languages?.map(language => language.name).join(', ')}
          </p>
        </CardBody>
        <CardFooter className="flex gap-4 pt-0">
          <a href={`https://www.themoviedb.org/movie/${tmdbId}`} target="_blank" rel="noopener noreferrer">
            <Button color="blue">더 찾아보기</Button>
          </a>
          <a href={details.homepage} target="_blank" rel="noopener noreferrer">
            <Button color="green">공식 홈페이지</Button>
          </a>
        </CardFooter>
      </Card>
    );
  }
  
  export default MovieDetails;