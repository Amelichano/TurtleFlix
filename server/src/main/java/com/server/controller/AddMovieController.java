package com.server.controller;

import com.server.dto.RatingDto;
import com.server.entity.Movie;
import com.server.repository.GenreRepository;
import com.server.repository.MovieRepository;
import com.server.service.MovieService;
import com.server.service.RatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/dummy")
public class AddMovieController {

    private final MovieService movieService;
    private final MovieRepository movieRepository;
    private final Map<Long, Long> movieIdToTid;
    private final List<RatingDto> ratingData;
    private final RatingService ratingService;

    @GetMapping("/addMovies")
    public ResponseEntity<?> addMovies() throws IOException {

        File csv = new File("src/main/resources/static/movies.csv");
        BufferedReader br = new BufferedReader(new BufferedReader(new FileReader(csv)));

        String line = "";
        boolean skipFirstLine = true;
        while ((line = br.readLine()) != null) {
            if(skipFirstLine) {
                skipFirstLine = false;
                continue;
            }

            String[] token = line.split(",");
            Long movieId = Long.parseLong(token[0]);
            String[] genre = token[token.length - 1].split("\\|");

            StringBuilder title = new StringBuilder();
            for(int i = 1; i < token.length - 1; i++) {
                title.append(token[i]);
                if(i != token.length-2) title.append(",");
            }


            movieRepository.save(Movie.builder()
                    .id(movieId).tmdbId(movieIdToTid.get(movieId))
                    .title(title.toString())
                    .genres(Arrays.stream(genre)
                            .map(movieService::findAndCreateGenre)
                            .collect(Collectors.toSet()))
                    .build());


            }

        return ResponseEntity.ok().build();
    }

    @GetMapping("/addRatingsFromCsv")
    public ResponseEntity<?> addRatingsFromCsv() {
        for (RatingDto rating : ratingData) {
            ratingService.saveMovieRating(rating.getMovieId(), rating.getRating());
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/calculateAverageRatings")
    public ResponseEntity<?> calculateAverageRatings() {
        ratingService.calculateAndSaveAverageRatings();
        return ResponseEntity.ok().build();
    }
}
