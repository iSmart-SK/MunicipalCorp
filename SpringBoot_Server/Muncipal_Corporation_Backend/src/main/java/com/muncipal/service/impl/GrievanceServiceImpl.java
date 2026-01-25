package com.muncipal.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.muncipal.custom_exceptions.ResourceNotFoundException;
import com.muncipal.dto.ApiResponse;
import com.muncipal.entity.Grievance;
import com.muncipal.entity.enums.Status;
import com.muncipal.repository.GrievanceRepository;
import com.muncipal.service.GrievanceService;

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

	@Override
	public ApiResponse updateGrievanceStatus(Long id, Status st) {
		Grievance g = grievanceRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Invalid user id !!!!!!!"));
		g.setStatus(st);
		grievanceRepository.save(g);
		return new ApiResponse("Grievance Status updated","Success");
	}

	@Override
	public List<Grievance> findGrievance() {	
		return grievanceRepository.findPendingGrievance();
	}

	@Override
	public List<Grievance> findUserGrievance(Long userId) {
		return grievanceRepository.findUserGrievance(userId);
	}
	
	

}
