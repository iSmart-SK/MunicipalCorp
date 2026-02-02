package com.muncipal.service;

import com.muncipal.dto.LoggerRequestDTO;

public interface LoggerService {

    void logInfo(LoggerRequestDTO log);

    void logError(LoggerRequestDTO log);
}
