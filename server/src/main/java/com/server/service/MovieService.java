package com.server.service;

import com.server.entity.Genre;
import com.server.entity.Movie;
import com.server.repository.GenreRepository;
import com.server.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MovieService {
    private final GenreRepository genreRepository;
    private final MovieRepository movieRepository;

    public Genre findAndCreateGenre(String name) {
        return genreRepository.findByName(name).orElseGet(
                () -> genreRepository.save(new Genre(name))
        );
    }

    public ResponseEntity findAllMovies(Pageable pageable) {
        Page<Movie> moviesPage = movieRepository.findAll(pageable);
        return new ResponseEntity<>(moviesPage, HttpStatus.OK);
    }


}
