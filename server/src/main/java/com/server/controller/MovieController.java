package com.server.controller;

import com.server.dto.MovieAllDto;
import com.server.dto.MovieDetailResponseDto;
import com.server.dto.PageInfo;
import com.server.entity.Movie;
import com.server.repository.MovieRepository;
import com.server.service.MovieService;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
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

    @GetMapping("/movies")
    public ResponseEntity findAllMovies(@Positive @RequestParam int page, @RequestParam(required = false, defaultValue = "DESC") String sortDirection) {
        Sort sort;
        if ("ASC".equalsIgnoreCase(sortDirection)) {
            sort = Sort.by(Sort.Direction.ASC, "averageRating"); // 오름차순으로 정렬
        } else {
            sort = Sort.by(Sort.Direction.DESC, "averageRating"); // 내림차순으로 정렬
        }
        Page<Movie> moviePage = movieService.findAllMovies(page - 1, 12, sort);
        PageInfo pageInfo = new PageInfo(page, 12,(int)moviePage.getTotalElements(), moviePage.getTotalPages());

        List<Movie> movies = moviePage.getContent();
        return new ResponseEntity<>(
            new MovieAllDto(movies, pageInfo), HttpStatus.OK
        );
    }


    @GetMapping("/search")
    public ResponseEntity searchMovies(@RequestParam(required = false) String genreName,
                                       @RequestParam(required = false) String title,
                                       @RequestParam(required = false, defaultValue = "DESC") String sortDirection,
                                       @RequestParam int page) {

        Sort sort;
        if ("ASC".equalsIgnoreCase(sortDirection)) {
            sort = Sort.by(Sort.Direction.ASC, "averageRating"); // 오름차순으로 정렬
        } else {
            sort = Sort.by(Sort.Direction.DESC, "averageRating"); // 내림차순으로 정렬
        }
        ResponseEntity result = null;
        if (genreName != null && title != null) {
            // 장르와 제목으로 검색
            Page<Movie> resultPage = movieService.findGenreAndTitleMovies(genreName, title, page - 1, 12, sort);
            result = paging(page, resultPage);

        } else if (genreName != null) {
            // 장르로 검색
            Page<Movie> resultPage = movieService.findGenreMovies(genreName, page - 1, 12, sort);
            result = paging(page, resultPage);

        } else if (title != null) {
            // 제목으로 검색
            Page<Movie> resultPage = movieService.findTitleMovies(title, page - 1, 12, sort);
            result = paging(page, resultPage);
        } else {
            // 파라미터가 없으면 모든 영화 반환
            Page<Movie> moviePage = movieService.findAllMovies(page - 1, 12, sort);
            PageInfo pageInfo = new PageInfo(page, 12,(int)moviePage.getTotalElements(), moviePage.getTotalPages());

            List<Movie> movies = moviePage.getContent();
            return new ResponseEntity<>(
                    new MovieAllDto(movies, pageInfo), HttpStatus.OK
            );
        }

        return result;
    }

    @GetMapping("/movieDetails")
    public ResponseEntity<MovieDetailResponseDto> getMovieDetails(@RequestParam Long movieId){
        MovieDetailResponseDto movieDetails = movieService.getMovieDetails(movieId);
        return new ResponseEntity<>(movieDetails, HttpStatus.OK);
    }

    public static ResponseEntity paging(int page, Page<Movie> moviePage){
        PageInfo pageInfo = new PageInfo(page, 12,(int)moviePage.getTotalElements(), moviePage.getTotalPages());

        List<Movie> movies = moviePage.getContent();
        return new ResponseEntity<>(
                new MovieAllDto(movies, pageInfo), HttpStatus.OK
        );
    }
}
