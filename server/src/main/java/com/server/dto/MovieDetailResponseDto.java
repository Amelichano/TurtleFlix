package com.server.dto;

import com.server.entity.Genre;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
public class MovieDetailResponseDto {
    private String title;
    private Long tmdbId;
    private Set<Genre> genres;
    private double averageRating;
}
