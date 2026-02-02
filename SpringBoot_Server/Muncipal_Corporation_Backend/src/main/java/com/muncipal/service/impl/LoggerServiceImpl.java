package com.muncipal.service.impl;

import com.muncipal.dto.LoggerRequestDTO;
import com.muncipal.service.LoggerService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class LoggerServiceImpl implements LoggerService {

    @Value("${logger.api.url}")
    private String loggerApiUrl;

    private final RestTemplate restTemplate;

    @Override
    public void logInfo(LoggerRequestDTO log) {
        log.setLevel("INFO");
        send(log);
    }

    @Override
    public void logError(LoggerRequestDTO log) {
        log.setLevel("ERROR");
        send(log);
    }

    private void send(LoggerRequestDTO log) {
        try {
            restTemplate.postForEntity(loggerApiUrl, log, Void.class);
        } catch (Exception e) {
            // LOG THE REAL ERROR (do not swallow)
            System.err.println("Logger failed: " + e.getMessage());
        }
    }
}
