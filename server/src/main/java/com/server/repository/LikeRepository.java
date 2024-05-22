package com.server.repository;

import com.server.entity.MovieLike;
import com.server.entity.Member;
import com.server.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikeRepository extends JpaRepository<MovieLike, Long> {
    boolean existsByMemberAndMovie(Member member, Movie movie);
    List<MovieLike> findByMember(Member member);
}
