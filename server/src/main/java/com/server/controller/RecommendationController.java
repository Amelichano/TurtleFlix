package com.server.controller;

import com.server.dto.MemberSessionDto;
import com.server.dto.MovieAllDto;
import com.server.dto.PageInfo;
import com.server.entity.Member;
import com.server.entity.Movie;
import com.server.repository.MemberRepository;
import com.server.service.RecommendationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.server.SessionFactory.SESSION_KEY;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class RecommendationController {

    private final RecommendationService recommendationService;

    private final MemberRepository memberRepository;

    @GetMapping("/recommendations")
    public ResponseEntity getRecommendations(HttpServletRequest request,
                                             @RequestParam(required = false, defaultValue = "DESC") String sortDirection) {
        HttpSession session = request.getSession(false);
        MemberSessionDto dto = (MemberSessionDto) session.getAttribute(SESSION_KEY);
        Member member = memberRepository.findById(dto.getId()).get();

        Sort sort;
        if ("ASC".equalsIgnoreCase(sortDirection)) {
            sort = Sort.by(Sort.Direction.ASC, "averageRating"); // 오름차순으로 정렬
        } else {
            sort = Sort.by(Sort.Direction.DESC, "averageRating"); // 내림차순으로 정렬
        }
        Page<Movie> moviePage = recommendationService.recommendMovies(member, sort);
        PageInfo pageInfo = new PageInfo(1, 12,(int)moviePage.getTotalElements(), moviePage.getTotalPages());

        List<Movie> movies = moviePage.getContent();
        return new ResponseEntity<>(
                new MovieAllDto(movies, pageInfo), HttpStatus.OK
        );
    }
}
