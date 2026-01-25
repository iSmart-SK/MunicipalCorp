package com.muncipal.service;

import com.muncipal.entity.Grievance;
import com.municipal.dto.ApiResponse;

public interface GrievanceService {
	ApiResponse addGrievance(Grievance grievance);
	ApiResponse updateGrievance(Grievance grievance);
}
