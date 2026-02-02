package com.muncipal.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoggerRequestDTO {

    private String userId;
    private String application;
    private String level;
    private String service;
    private String endpoint;
    private String method;
    private String ipAddress;
    private String message;
}
