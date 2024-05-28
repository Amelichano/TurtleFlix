package com.server.service;

import com.server.entity.Movie;
import com.server.entity.Genre;
import com.server.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class MovieRecommendationService {

    private final MovieRepository movieRepository;

    @Autowired
    public MovieRecommendationService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public Page<Movie> recommendMovies(Long movieId, int page, int size, Sort sort) {
        // 선택한 영화 가져오기
        Movie selectedMovie = movieRepository.findById(movieId).orElse(null);
        if (selectedMovie == null) {
            return Page.empty(); // 선택한 영화가 데이터베이스에 없으면 빈 페이지 반환
        }

        // 모든 영화 가져오기
        List<Movie> allMovies = movieRepository.findAll();

        // 벡터 생성
        Map<Long, Map<String, Integer>> genreVectors = createGenreVectors(allMovies);
        Map<Long, Map<String, Integer>> titleVectors = createTitleVectors(allMovies);

        // 유사도 계산 및 정렬
        Map<Movie, Double> similarityScores = calculateSimilarity(selectedMovie, allMovies, genreVectors, titleVectors);

        List<Movie> sortedMovies = similarityScores.entrySet().stream()
                .filter(entry -> entry.getKey().getId() != movieId)
                .sorted(Map.Entry.<Movie, Double>comparingByValue().reversed())
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());

        // 페이징 처리
        Pageable pageable = PageRequest.of(page, size, sort);
        int start = Math.min((int) pageable.getOffset(), sortedMovies.size());
        int end = Math.min((start + pageable.getPageSize()), sortedMovies.size());
        List<Movie> pagedMovies = sortedMovies.subList(start, end);

        return new PageImpl<>(pagedMovies, pageable, sortedMovies.size());
    }

    private Map<Long, Map<String, Integer>> createGenreVectors(List<Movie> movies) {
        Map<Long, Map<String, Integer>> vectors = new HashMap<>();
        for (Movie movie : movies) {
            Map<String, Integer> vector = new HashMap<>();
            for (Genre genre : movie.getGenres()) {
                vector.put(genre.getName(), vector.getOrDefault(genre.getName(), 0) + 1);
            }
            vectors.put(movie.getId(), vector);
        }
        return vectors;
    }

    private Map<Long, Map<String, Integer>> createTitleVectors(List<Movie> movies) {
        Map<Long, Map<String, Integer>> vectors = new HashMap<>();
        for (Movie movie : movies) {
            Map<String, Integer> vector = new HashMap<>();
            String[] words = movie.getTitle().toLowerCase().split("\\s+");
            for (String word : words) {
                vector.put(word, vector.getOrDefault(word, 0) + 1);
            }
            vectors.put(movie.getId(), vector);
        }
        return vectors;
    }

    private Map<Movie, Double> calculateSimilarity(Movie selectedMovie, List<Movie> allMovies,
                                                   Map<Long, Map<String, Integer>> genreVectors,
                                                   Map<Long, Map<String, Integer>> titleVectors) {
        Map<Movie, Double> similarityScores = new HashMap<>();
        Map<String, Integer> selectedMovieGenreVector = genreVectors.get(selectedMovie.getId());
        Map<String, Integer> selectedMovieTitleVector = titleVectors.get(selectedMovie.getId());

        for (Movie movie : allMovies) {
            double genreSimilarity = calculateCosineSimilarity(selectedMovieGenreVector, genreVectors.get(movie.getId()));
            double titleSimilarity = calculateCosineSimilarity(selectedMovieTitleVector, titleVectors.get(movie.getId()));
            double likeSimilarity = 1.0; //좋아요 추천기능과 결과를 동일하게 하기 위해 추가
            double combinedSimilarity = 0.3 * likeSimilarity + 0.3 * genreSimilarity + 0.4 * titleSimilarity; // 가중치 조절 가능
            similarityScores.put(movie, combinedSimilarity);
        }
        return similarityScores;
    }

    private double calculateCosineSimilarity(Map<String, Integer> vector1, Map<String, Integer> vector2) {
        Set<String> allKeys = new HashSet<>(vector1.keySet());
        allKeys.addAll(vector2.keySet());

        double dotProduct = 0.0;
        double norm1 = 0.0;
        double norm2 = 0.0;

        for (String key : allKeys) {
            int value1 = vector1.getOrDefault(key, 0);
            int value2 = vector2.getOrDefault(key, 0);

            dotProduct += value1 * value2;
            norm1 += value1 * value1;
            norm2 += value2 * value2;
        }

        return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
    }
}
