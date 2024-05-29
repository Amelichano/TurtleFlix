package com.server.service;

import com.server.entity.*;
import com.server.repository.MovieLikeRepository;
import com.server.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecommendationService {

    private final MovieLikeRepository movieLikeRepository;

    private final MovieRepository movieRepository;

    public Page<Movie> recommendMovies(Member member, Sort sort) {
        //사용자가 좋아요를 누른 영화들 가져오기
        List<MovieLike> allLikes = movieLikeRepository.findAllByMemberId(member.getId());
        if (allLikes.isEmpty()) {
            System.out.println("No likes found");
            return Page.empty();
        }

//        Set<Movie> likedMovies = allLikes.stream().map(MovieLike::getMovie).collect(Collectors.toSet());

        //모든 영화 가져오기
        List<Movie> allMovies = movieRepository.findAll();

        //likedMovies를 allMovies에서 참조된 객체로 대체
        Set<Movie> likedMovies = new HashSet<>();
        for (MovieLike like : allLikes) {
            Movie likedMovie = like.getMovie();
            for (Movie movie : allMovies) {
                if (movie.getId() == likedMovie.getId()) {
                    likedMovies.add(movie);
                    break;
                }
            }
        }

        //영화-영화 유사도 계산 (좋아요, 장르, 제목 포함)
        Map<Movie, Map<Movie, Double>> similarityMatrix = calculateCombinedSimilarity(likedMovies, allMovies);

        //각 영화에 대한 유사도 점수 계산
        Map<Movie, Double> recommendationScores = new HashMap<>();
        for (Movie likedMovie : likedMovies) {
            Map<Movie, Double> similarMovies = similarityMatrix.getOrDefault(likedMovie, Collections.emptyMap());
            for (Map.Entry<Movie, Double> entry : similarMovies.entrySet()) {
                Movie movie = entry.getKey();
                double similarity = entry.getValue();
                if (!likedMovies.contains(movie)) {
                    recommendationScores.merge(movie, similarity, Double::sum);
                }
            }
        }

        if (recommendationScores.isEmpty()) {
            System.out.println("No recommendations found");
            return Page.empty();
        }

        //추천 영화 반환 (페이징 처리)
        List<Movie> sortedMovies = recommendationScores.entrySet().stream()
                .sorted(Map.Entry.<Movie, Double>comparingByValue().reversed())
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());

        Pageable pageable = PageRequest.of(0, 12, sort);
        int start = Math.min((int) pageable.getOffset(), sortedMovies.size());
        int end = Math.min((start + pageable.getPageSize()), sortedMovies.size());
        List<Movie> pagedMovies = sortedMovies.subList(start, end);

        return new PageImpl<>(pagedMovies, pageable, sortedMovies.size());
    }

    private Map<Movie, Map<Movie, Double>> calculateCombinedSimilarity(Set<Movie> likedMovies, List<Movie> allMovies) {
        Map<Movie, Map<Movie, Double>> similarityMatrix = new HashMap<>();
        Map<Movie, Map<Genre, Integer>> genreVectors = buildGenreVectors(allMovies);
        Map<Movie, Map<String, Integer>> titleVectors = buildTitleVectors(allMovies);

        for (Movie likedMovie : likedMovies) {
            for (Movie movie : allMovies) {
                if (likedMovie.equals(movie)) continue;
                double combinedSimilarity = calculateCombinedSimilarity(likedMovie, movie, genreVectors, titleVectors);
                similarityMatrix
                        .computeIfAbsent(likedMovie, k -> new HashMap<>())
                        .put(movie, combinedSimilarity);
            }
        }

        return similarityMatrix;
    }

    private Map<Movie, Map<Genre, Integer>> buildGenreVectors(List<Movie> allMovies) {
        Map<Movie, Map<Genre, Integer>> genreVectors = new HashMap<>();
        for (Movie movie : allMovies) {
            Map<Genre, Integer> genreVector = new HashMap<>();
            for (Genre genre : movie.getGenres()) {
                genreVector.put(genre, 1);
            }
            genreVectors.put(movie, genreVector);
        }
        return genreVectors;
    }

    private Map<Movie, Map<String, Integer>> buildTitleVectors(List<Movie> allMovies) {
        Map<Movie, Map<String, Integer>> titleVectors = new HashMap<>();
        for (Movie movie : allMovies) {
            Map<String, Integer> titleVector = new HashMap<>();
            String[] words = movie.getTitle().toLowerCase().split("\\s+");
            for (String word : words) {
                titleVector.put(word, titleVector.getOrDefault(word, 0) + 1);
            }
            titleVectors.put(movie, titleVector);
        }
        return titleVectors;
    }

    private double calculateCombinedSimilarity(Movie movie1, Movie movie2, Map<Movie, Map<Genre, Integer>> genreVectors, Map<Movie, Map<String, Integer>> titleVectors) {
        Map<Genre, Integer> genreVector1 = genreVectors.get(movie1);
        Map<Genre, Integer> genreVector2 = genreVectors.get(movie2);

        double genreSimilarity = calculateCosineSimilarity(genreVector1, genreVector2);

        Map<String, Integer> titleVector1 = titleVectors.get(movie1);
        Map<String, Integer> titleVector2 = titleVectors.get(movie2);

        double titleSimilarity = calculateCosineSimilarity(titleVector1, titleVector2);

        // 좋아요 유사도는 1로 고정 (단순히 유사도를 계산하기 위해)
        double likeSimilarity = 1.0;

        // 가중치 합산
        double combinedSimilarity = 0.3 * likeSimilarity + 0.3 * genreSimilarity + 0.4 * titleSimilarity;
        return combinedSimilarity;
    }

    private double calculateCosineSimilarity(Map<?, Integer> vector1, Map<?, Integer> vector2) {
        if (vector1 == null || vector2 == null) {
            return 0.0;
        }

        Set<Object> allKeys = new HashSet<>();
        allKeys.addAll(vector1.keySet());
        allKeys.addAll(vector2.keySet());

        double dotProduct = 0.0;
        double norm1 = 0.0;
        double norm2 = 0.0;

        for (Object key : allKeys) {
            int value1 = vector1.getOrDefault(key, 0);
            int value2 = vector2.getOrDefault(key, 0);

            dotProduct += value1 * value2;
            norm1 += value1 * value1;
            norm2 += value2 * value2;
        }

        return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
    }
}