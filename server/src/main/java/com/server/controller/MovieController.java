package com.server.controller;

import com.server.entity.Movie;
import com.server.repository.MovieRepository;
import com.server.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MovieController {

    private final MovieService movieService;
    private final MovieRepository movieRepository;

    @GetMapping("/movies") //~/api/movies?size=10 이런 식으로 사이즈 조절 가능
    public ResponseEntity findAllMovies(@PageableDefault(size = 100) Pageable pageable) {
        return movieService.findAllMovies(pageable);
    }


    @GetMapping("/search")
    public ResponseEntity<List<Movie>> searchMovies(@RequestParam(required = false) String genreName, @RequestParam(required = false) String title) {
        List<Movie> movies;
        if (genreName != null && title != null) {
            // 장르와 제목으로 검색
            movies = movieRepository.findByGenresNameAndTitleContainingIgnoreCase(genreName, title);
        } else if (genreName != null) {
            // 장르로 검색
            movies = movieRepository.findByGenresName(genreName);
        } else if (title != null) {
            // 제목으로 검색
            movies = movieRepository.findByTitleContainingIgnoreCase(title);
        } else {
            // 파라미터가 없으면 모든 영화 반환
            movies = movieRepository.findAll();
        }

        if (movies.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(movies);
    }

}
