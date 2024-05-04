package com.server.service;

import com.server.entity.Genre;
import com.server.repository.GenreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MovieService {
    private final GenreRepository genreRepository;

    public Genre findAndCreateGenre(String name) {
        return genreRepository.findByName(name).orElseGet(
                () -> genreRepository.save(new Genre(name))
        );
    }
}
