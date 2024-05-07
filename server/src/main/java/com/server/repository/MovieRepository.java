package com.server.repository;

import com.server.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {

    List<Movie> findByGenresNameAndTitleContainingIgnoreCase(String genreName, String title);
    List<Movie> findByGenresName(String genreName);
    List<Movie> findByTitleContainingIgnoreCase(String title);
}
