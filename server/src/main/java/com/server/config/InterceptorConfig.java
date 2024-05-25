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
                .addPathPatterns("/update/**", "/addMovies", "/api/like", "/api/isLiked", "/api/likedMovies", "/api/recommendations")
                .excludePathPatterns(
                        "/signUp", "/login" // Login
                        , "/session-check" // MemberController
                        , "/api/movies", "/api/search" //MovieController
                );
    }
}

