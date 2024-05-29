package com.server.controller;

import com.server.dto.LoginFormDto;
import com.server.dto.LoginResponseDto;
import com.server.dto.MemberSessionDto;
import com.server.dto.SignUpDto;
import com.server.exception.ErrorException;
import com.server.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

import static com.server.SessionFactory.SESSION_KEY;
import static com.server.exception.ErrorCode.AUTHENTICATION_USER;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/signUp") //회원가입
    public ResponseEntity<Void> signUp(@RequestBody SignUpDto signUpDto){
        memberService.signUp(signUpDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @ResponseBody
    @PostMapping("/login") //로그인 (request : loginId, password / response : (session)id, loginId, username)
    public String login(@Valid @RequestBody LoginFormDto loginFormDto, HttpServletRequest request){
        MemberSessionDto memberSession = memberService.login(loginFormDto.getLoginId(), loginFormDto.getPassword());
        HttpSession session = request.getSession();
        session.setAttribute(SESSION_KEY, memberSession);
        return session.getId();
    }

    @GetMapping("/logout") //로그아웃
    public ResponseEntity<Void> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if(Objects.nonNull(session)){
            session.invalidate();
        }
        return ResponseEntity.noContent().build();
    }


    @PutMapping("/update/{id}") //회원 정보 변경
    public void updateMember(@RequestBody SignUpDto memberRequestDto, @PathVariable Long id){
        memberService.updateMember(
                id,
                memberRequestDto.getLoginId(),
                memberRequestDto.getPassword(),
                memberRequestDto.getUsername()
        );
    }

    @GetMapping("/session-check")
    public MemberSessionDto sessionCheck(HttpServletRequest request) {
        HttpSession session = request.getSession(false);

        if (Objects.isNull(session) || Objects.isNull(session.getAttribute(SESSION_KEY))) {
            throw ErrorException.type(AUTHENTICATION_USER);
        }

        return (MemberSessionDto) session.getAttribute(SESSION_KEY);
    }

}
