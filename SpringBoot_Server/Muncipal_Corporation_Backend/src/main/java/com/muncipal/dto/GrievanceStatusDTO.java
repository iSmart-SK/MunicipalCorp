package com.muncipal.dto;

import com.muncipal.entity.enums.GrievanceStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GrievanceStatusDTO {
    private GrievanceStatus status;
}
