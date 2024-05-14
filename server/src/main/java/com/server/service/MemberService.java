package com.server.service;

import com.server.dto.MemberSessionDto;
import com.server.dto.SignUpDto;
import com.server.entity.Member;
import com.server.exception.ErrorException;
import com.server.exception.ErrorResponse;
import com.server.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static com.server.exception.ErrorCode.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    //회원가입
    @Transactional
    public Long signUp(SignUpDto request) {
        if(memberRepository.findByLoginId(request.getLoginId()).isPresent()){
            throw ErrorException.type(USER_ALREADY_JOIN);
        }
        String encodedPassword = passwordEncoder.encode(request.getPassword());
        Member member = Member.builder()
                .loginId(request.getLoginId())
                .password(encodedPassword)
                .username(request.getUsername())
                .build();
        Member savedMember = memberRepository.save(member);
        return savedMember.getId();
    }

    //로그인
    public MemberSessionDto login(String loginId, String password) {
        Member findMember = memberRepository.findByLoginId(loginId)
                .orElseThrow(() -> ErrorException.type(USER_NOT_FOUND));
        if(!passwordEncoder.matches(password, findMember.getPassword())){
            throw ErrorException.type(WRONG_PASSWORD);
        }else{
            return new MemberSessionDto(findMember.getId(), findMember.getLoginId(), findMember.getUsername());
        }
    }


    //모든 회원 조회

    public List<Member> findAll(){
        return memberRepository.findAll();
    }
    //단일 회원 조회

    public Optional<Member> findById(Long id){
        return memberRepository.findById(id);
    }

    //회원정보 업데이트

    @Transactional
    public void updateMember(Long id, String loginId, String password, String username){
        Optional<Member> findMember = memberRepository.findById(id);
        if(findMember.isPresent()){
            Member member = findMember.get();
            member.setLoginId(loginId); //dirty checking
            member.setPassword(password);
            member.setUsername(username);
        }else{
            throw ErrorException.type(USER_NOT_FOUND);
        }
    }
    //회원 삭제

    @Transactional
    public void deleteMember(Long id){
        memberRepository.deleteById(id);
    }
}

