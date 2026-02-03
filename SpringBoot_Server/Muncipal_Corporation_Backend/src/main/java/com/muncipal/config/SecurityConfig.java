package com.muncipal.config;

import com.muncipal.security.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.web.cors.*;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                // CORS
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                .csrf(csrf -> csrf.disable())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                .authorizeHttpRequests(auth -> auth

                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // PUBLIC
                        .requestMatchers(
                                "/user/login",
                                "/user/register",
                                "/swagger-ui/**",
                                "/v3/api-docs/**",
                                "/swagger-ui.html"
                        ).permitAll()

                        // CITIZEN
                        .requestMatchers(HttpMethod.POST, "/certificateController").hasRole("CITIZEN")
                        .requestMatchers(HttpMethod.GET,  "/certificateController/birth/**").hasRole("CITIZEN")
                        .requestMatchers(HttpMethod.GET,  "/certificateController/death/**").hasRole("CITIZEN")

                        .requestMatchers(HttpMethod.GET,  "/properties/citizen/**").hasRole("CITIZEN")
                        .requestMatchers(HttpMethod.GET,  "/properties/**").hasRole("CITIZEN")
                        .requestMatchers(HttpMethod.PATCH,"/properties/taxUpdate/**").hasRole("CITIZEN")

                        .requestMatchers(HttpMethod.POST, "/grievances").hasRole("CITIZEN")
                        .requestMatchers(HttpMethod.GET,  "/grievances/**").hasRole("CITIZEN")

                        .requestMatchers(HttpMethod.POST, "/payment/create-order").hasRole("CITIZEN")
                        .requestMatchers(HttpMethod.POST, "/payment/verify").hasRole("CITIZEN")

                        //  ADMIN
                        .requestMatchers(HttpMethod.GET,   "/properties").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/properties/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET,   "/certificateController/birth").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET,   "/certificateController/death").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/certificateController/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET,   "/grievances").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET,   "/grievances/all").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/grievances/**").hasRole("ADMIN")

                        .anyRequest().authenticated()
                )

                // JWT filter
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(List.of(
                "http://localhost:5173",
                "https://69819a3bf8107372177ec984--quiet-klepon-b43f8a.netlify.app"
        ));

        config.setAllowedMethods(List.of(
                "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"
        ));

        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}
