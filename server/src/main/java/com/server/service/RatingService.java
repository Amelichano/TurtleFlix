package com.server.service;

import com.server.entity.Movie;
import com.server.entity.Rating;
import com.server.repository.MovieRepository;
import com.server.repository.RatingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RatingService {
    private final RatingRepository movieRatingRepository;
    private final MovieRepository movieRepository;

    public void saveMovieRating(Long movieId, double rating) {
        Movie movie = movieRepository.findById(movieId).orElseThrow(() -> new RuntimeException("Movie not found"));

        Rating newRating = Rating.builder()
                .movie(movie)
                .rating(rating)
                .build();

        movieRatingRepository.save(newRating);
    }

    public void calculateAndSaveAverageRatings() {
        List<Movie> movies = movieRepository.findAll();
        for (Movie movie : movies) {
            List<Rating> ratings = movieRatingRepository.findByMovieId(movie.getId());
            double averageRating = ratings.stream()
                    .mapToDouble(Rating::getRating)
                    .average()
                    .orElse(0.0);

            BigDecimal roundedAverageRating = new BigDecimal(averageRating).setScale(1, RoundingMode.HALF_UP);

            movie.setAverageRating(roundedAverageRating.doubleValue());
            movieRepository.save(movie);
        }
    }
}