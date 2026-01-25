package com.muncipal.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.muncipal.custom_exceptions.ResourceNotFoundException;
import com.muncipal.entity.Grievance;
import com.muncipal.repository.GrievanceRepository;
import com.muncipal.service.GrievanceService;
import com.municipal.dto.ApiResponse;

@Service
@Transactional
public class GrievanceServiceImpl implements GrievanceService {
	
	@Autowired
	private GrievanceRepository grievanceRepository;

	@Override
	public ApiResponse addGrievance(Grievance grievance) {
		Grievance g = grievanceRepository.save(grievance);
		return new ApiResponse("New Grievance added with ID=" + g.getId(), "Success");
	}

	@Override
	public ApiResponse updateGrievance(Grievance grievance) {
		// TODO Auto-generated method stub
		Grievance g = grievanceRepository.findById(grievance.getId()).orElseThrow(() -> new ResourceNotFoundException("Invalid user id !!!!!!!"));
		g.setStatus(grievance.getStatus());
		grievanceRepository.save(g);
		return new ApiResponse("Grievance updated","Success");
	}

}
