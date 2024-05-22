package com.server.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Movie {
    @Id
    @Column(name = "movie_id")
    private long id;
    private String title;
    private Long tmdbId;
    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Genre> genres;
    private double averageRating;

}
