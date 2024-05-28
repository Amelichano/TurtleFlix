package com.server.controller;

import com.server.entity.Movie;
import com.server.service.MovieRecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MovieRecommendationController {

    private final MovieRecommendationService movieRecommendationService;

    @GetMapping("/movie-recommendations")
    public ResponseEntity<Page<Movie>> getRecommendations(@RequestParam Long movieId, 
                                                          @RequestParam(defaultValue = "0") int page,
                                                          @RequestParam(defaultValue = "12") int size,
                                                          @RequestParam(defaultValue = "id") String sortBy,
                                                          @RequestParam(defaultValue = "asc") String sortOrder) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortOrder), sortBy);
        Page<Movie> recommendations = movieRecommendationService.recommendMovies(movieId, page, size, sort);
        if (recommendations.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(recommendations, HttpStatus.OK);
    }
}
