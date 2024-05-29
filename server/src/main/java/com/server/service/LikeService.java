package com.server.service;

import com.server.dto.MemberSessionDto;
import com.server.entity.MovieLike;
import com.server.entity.Member;
import com.server.entity.Movie;
import com.server.repository.LikeRepository;
import com.server.repository.MemberRepository;
import com.server.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;

    private final MemberRepository memberRepository;

    private final MovieRepository movieRepository;

    public void likeMovie(MemberSessionDto memberSession, Long tmdbId) {
        Member member = memberRepository.findById(memberSession.getId())
                .orElseThrow(() -> new IllegalArgumentException("회원을 찾을 수 없습니다"));
        Movie movie = movieRepository.findByTmdbId(tmdbId)
                .orElseThrow(() -> new IllegalArgumentException("영화를 찾을 수 없습니다"));

        if (!likeRepository.existsByMemberAndMovie(member, movie)) {
            MovieLike movieLike = new MovieLike();
            movieLike.setMember(member);
            movieLike.setMovie(movie);
            likeRepository.save(movieLike);
        }
    }

    public boolean isMovieLikedByMember(MemberSessionDto memberSession, Long tmdbId) {
        Member member = memberRepository.findById(memberSession.getId())
                .orElseThrow(() -> new IllegalArgumentException("회원을 찾을 수 없습니다"));
        Movie movie = movieRepository.findByTmdbId(tmdbId)
                .orElseThrow(() -> new IllegalArgumentException("영화를 찾을 수 없습니다"));

        return likeRepository.existsByMemberAndMovie(member, movie);
    }

    public List<Movie> getLikedMoviesByMember(MemberSessionDto memberSession) {
        Member member = memberRepository.findById(memberSession.getId())
                .orElseThrow(() -> new IllegalArgumentException("회원을 찾을 수 없습니다"));
        List<MovieLike> movieLikes = likeRepository.findByMember(member);
        return movieLikes.stream()
                .map(MovieLike::getMovie)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteLike(Long memberId, Long tmdbId) {
        Optional<Member> member = memberRepository.findById(memberId);
        Member findMember = member.get();

        Optional<Movie> movie = movieRepository.findByTmdbId(tmdbId);
        Movie findMovie = movie.get();
        likeRepository.deleteByMemberAndMovie(findMember, findMovie);
    }
}
