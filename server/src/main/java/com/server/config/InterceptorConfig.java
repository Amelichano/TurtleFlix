package com.server.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class InterceptorConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new RequestInterceptor())
                .order(1)
                .addPathPatterns("/update/**")
                .excludePathPatterns(
                        "/signUp", "/login" // Login
                        , "/session-check" // MemberController
                );
    }
}

