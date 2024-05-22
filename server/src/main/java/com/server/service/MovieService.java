package com.server.service;

import com.server.entity.Genre;
import com.server.entity.Movie;
import com.server.repository.GenreRepository;
import com.server.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public Page<Movie> findAllMovies(int page, int size, Sort sort) {
        PageRequest pageRequest = PageRequest.of(page, size, sort);
        return movieRepository.findAll(pageRequest);
    }

    public Page<Movie> findGenreAndTitleMovies(String genre, String title, int page, int size, Sort sort) {
        PageRequest pageRequest = PageRequest.of(page, size, sort);
        return movieRepository.findByGenresNameAndTitleContainingIgnoreCase(genre, title, pageRequest);
    }

    public Page<Movie> findGenreMovies(String genre, int page, int size, Sort sort) {
        PageRequest pageRequest = PageRequest.of(page, size, sort);
        return movieRepository.findByGenresNameContainingIgnoreCase(genre, pageRequest);
    }

    public Page<Movie> findTitleMovies(String title, int page, int size, Sort sort) {
        PageRequest pageRequest = PageRequest.of(page, size, sort);
        return movieRepository.findByTitleContainingIgnoreCase(title, pageRequest);
    }

}
