package com.server.repository;

import com.server.entity.Member;
import com.server.entity.MovieLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieLikeRepository extends JpaRepository<MovieLike, Long> {
    List<MovieLike> findAllByMemberId(Long id);

}
