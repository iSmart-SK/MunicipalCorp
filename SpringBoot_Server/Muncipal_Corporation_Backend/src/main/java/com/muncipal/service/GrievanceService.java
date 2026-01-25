package com.muncipal.service;

import java.util.List;

import com.muncipal.entity.Grievance;
import com.muncipal.entity.enums.Status;
import com.municipal.dto.ApiResponse;

public interface GrievanceService {
	ApiResponse addGrievance(Grievance grievance);
	ApiResponse updateGrievance(Grievance grievance);
	ApiResponse updateGrievanceStatus(Long id,Status st);
	List<Grievance> findGrievance();
}
