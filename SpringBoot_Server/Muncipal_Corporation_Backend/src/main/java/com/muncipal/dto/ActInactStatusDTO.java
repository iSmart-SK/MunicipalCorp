package com.muncipal.dto;

import com.muncipal.entity.enums.ActInactStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ActInactStatusDTO {
	ActInactStatus status;
}
