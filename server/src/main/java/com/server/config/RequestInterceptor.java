package com.server.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.server.exception.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.util.PatternMatchUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import java.util.Objects;

import static com.server.exception.ErrorCode.AUTHENTICATION_USER;


@Slf4j
public class RequestInterceptor implements HandlerInterceptor{
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();

        String requestURI = request.getRequestURI();
        log.info("요청 URI : {}", requestURI);

        HttpSession session = request.getSession(false);
        if (Objects.isNull(session) || Objects.isNull(session.getAttribute("SESSION_KEY"))) {
            if (Objects.equals(request.getMethod(), "GET") && PatternMatchUtils.simpleMatch("/**", request.getRequestURI())) {
                return true;
            }

            log.info("미인증 사용자 요청");
            String errorResponseToJSON = objectMapper.writeValueAsString(ErrorResponse.of(AUTHENTICATION_USER));

            response.getWriter().write(errorResponseToJSON);  response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");


            return false;
        }

        return true;
    }
}
