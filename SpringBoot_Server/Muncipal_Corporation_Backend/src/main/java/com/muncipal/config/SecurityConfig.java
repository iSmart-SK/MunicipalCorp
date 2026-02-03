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
                // ✅ CORS MUST BE FIRST
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // ✅ Stateless API
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                .authorizeHttpRequests(auth -> auth

                        // ✅ PRE-FLIGHT (CRITICAL)
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // 🔓 PUBLIC
                        .requestMatchers(
                                "/user/login",
                                "/user/register",
                                "/swagger-ui/**",
                                "/v3/api-docs/**",
                                "/swagger-ui.html"
                        ).permitAll()

                        // 🔴 ADMIN (PLACE FIRST)
                        .requestMatchers(HttpMethod.GET,   "/user").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/user/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/certificateController/birth/pending").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/certificateController/death/pending").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET,   "/certificateController/birth").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET,   "/certificateController/death").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/certificateController/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET,   "/properties").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/properties/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET,   "/grievances").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET,   "/grievances/all").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/grievances/**").hasRole("ADMIN")

                        // 🟢 CITIZEN (AFTER ADMIN)
                        .requestMatchers(HttpMethod.POST, "/certificateController").hasRole("CITIZEN")
                        .requestMatchers(HttpMethod.GET,  "/certificateController/birth/**").hasRole("CITIZEN")
                        .requestMatchers(HttpMethod.GET,  "/certificateController/death/**").hasRole("CITIZEN")

                        .requestMatchers(HttpMethod.GET, "/properties/citizen/**").hasRole("CITIZEN")
                        .requestMatchers(HttpMethod.GET, "/properties/*").hasRole("CITIZEN")
                        .requestMatchers(HttpMethod.PATCH,"/properties/taxUpdate/**").hasRole("CITIZEN")

                        .requestMatchers(HttpMethod.POST, "/grievances").hasRole("CITIZEN")
                        .requestMatchers(HttpMethod.GET,  "/grievances/*").hasRole("CITIZEN")

                        .requestMatchers(HttpMethod.POST, "/payment/create-order").hasRole("CITIZEN")
                        .requestMatchers(HttpMethod.POST, "/payment/verify").hasRole("CITIZEN")

                        .anyRequest().authenticated()
                )

                // ✅ JWT AFTER CORS & AUTH RULES
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();

        // 1. Allow specific origins
        //config.setAllowedOrigins(List.of(
        //        "http://localhost:5173", // Local React
        //        "https://quiet-klepon-b43f8a.netlify.app" // Main Netlify URL (Use this one!)
        //));

        // OR: If you want to allow ALL Netlify preview URLs (safe for dev)
         config.setAllowedOriginPatterns(List.of(
                 "https://*.netlify.app",
                 "http://localhost:5173"
         ));

        // 2. Allow all standard methods
        config.setAllowedMethods(List.of(
                "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"
        ));

        // 3. Allow all headers (Authorization, Content-Type, etc.)
        config.setAllowedHeaders(List.of("*"));

        // 4. Expose headers if needed
        config.setExposedHeaders(List.of("Authorization"));

        // 5. Allow credentials
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
