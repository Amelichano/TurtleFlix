package com.server.repository;

import com.server.entity.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {

    Page<Movie> findByGenresNameAndTitleContainingIgnoreCase(String genreName, String title, PageRequest pageRequest);
    Page<Movie> findByGenresNameContainingIgnoreCase(String genreName, PageRequest pageRequest);
    Page<Movie> findByTitleContainingIgnoreCase(String title, PageRequest pageRequest);

    Optional<Movie> findByTmdbId(Long tmdbId);
}
