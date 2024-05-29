package com.server.controller;

import com.server.dto.MemberSessionDto;
import com.server.entity.Movie;
import com.server.service.LikeService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.server.SessionFactory.SESSION_KEY;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class LikeController {

    private final LikeService likeService;

    @PostMapping("/like")
    public ResponseEntity<Void> likeMovie(HttpServletRequest request, @RequestParam Long tmdbId) {
        HttpSession session = request.getSession(false);

        MemberSessionDto memberSession = (MemberSessionDto) session.getAttribute(SESSION_KEY);
        likeService.likeMovie(memberSession, tmdbId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/isLiked")
    public ResponseEntity<Boolean> isMovieLikedByMember(HttpServletRequest request, @RequestParam Long tmdbId) {
        HttpSession session = request.getSession(false);

        MemberSessionDto memberSession = (MemberSessionDto) session.getAttribute(SESSION_KEY);
        boolean isLiked = likeService.isMovieLikedByMember(memberSession, tmdbId);
        return ResponseEntity.ok(isLiked);
    }

    @GetMapping("/likedMovies")
    public ResponseEntity<List<Movie>> getLikedMoviesByMember(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        MemberSessionDto memberSession = (MemberSessionDto) session.getAttribute(SESSION_KEY);
        List<Movie> likedMovies = likeService.getLikedMoviesByMember(memberSession);
        return ResponseEntity.ok(likedMovies);
    }

    @PostMapping("/deleteLike/{tmdbId}")
    public ResponseEntity<?> deleteLike(@PathVariable Long tmdbId, HttpServletRequest request){
        HttpSession session = request.getSession(false);
        MemberSessionDto dto = (MemberSessionDto) session.getAttribute(SESSION_KEY);
        likeService.deleteLike(dto.getId(), tmdbId);
        return ResponseEntity.ok().build();
    }
}