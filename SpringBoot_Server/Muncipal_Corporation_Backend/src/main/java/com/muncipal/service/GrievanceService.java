package com.muncipal.service;

import java.util.List;

import com.muncipal.dto.ApiResponse;
import com.muncipal.entity.Grievance;
import com.muncipal.entity.enums.GrievanceStatus;
import com.muncipal.entity.enums.Status;

public interface GrievanceService {
	ApiResponse addGrievance(Grievance grievance);
	ApiResponse updateGrievance(Grievance grievance);
	ApiResponse updateGrievanceStatus(Long id, GrievanceStatus st);
	List<Grievance> findGrievance();
	List<Grievance> findUserGrievance(Long userId);
	List<Grievance> findAllGrievance();
}
