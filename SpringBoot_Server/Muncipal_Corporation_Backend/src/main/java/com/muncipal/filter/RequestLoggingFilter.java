package com.muncipal.filter;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.muncipal.dto.LoggerRequestDTO;
import com.muncipal.service.LoggerService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RequestLoggingFilter extends OncePerRequestFilter {

    private final LoggerService loggerService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        long startTime = System.currentTimeMillis();

        try {
            filterChain.doFilter(request, response);
        } finally {

            long duration = System.currentTimeMillis() - startTime;

            String userId = "ANONYMOUS";

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.isAuthenticated()) {
                userId = auth.getName();
            }

            LoggerRequestDTO log = new LoggerRequestDTO();
            log.setUserId(userId);
            log.setApplication("SpringBoot");
            log.setLevel("INFO");
            String serviceName = request.getRequestURI().split("/")[1].toUpperCase();
            log.setService(serviceName);
            log.setEndpoint(request.getRequestURI());
            log.setMethod(request.getMethod());
            log.setIpAddress(request.getRemoteAddr());
            log.setMessage("Request completed in " + duration + " ms");

            loggerService.logInfo(log);
        }
    }
}
