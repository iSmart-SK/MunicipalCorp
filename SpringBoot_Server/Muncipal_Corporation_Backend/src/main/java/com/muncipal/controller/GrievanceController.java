package com.muncipal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.muncipal.entity.Grievance;
import com.muncipal.service.GrievanceService;
import com.municipal.dto.ApiResponse;

@RestController
@RequestMapping("/grievance")
@CrossOrigin(origins = "http://localhost:5173")
public class GrievanceController {

	@Autowired
	private GrievanceService grievanceService;
	
	@PostMapping
	ResponseEntity<?> addGrievance(@RequestBody Grievance grievance) {
		try {
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(grievanceService.addGrievance(grievance));
		} 
		catch (RuntimeException e) {
			return  ResponseEntity.status(HttpStatus.CONFLICT) // SC 409
					.body(new ApiResponse(e.getMessage(), "Failed"));
		}
	}
	
	@PutMapping
	ResponseEntity<?> updateGrievance(@RequestBody Grievance grievance) {
		try {
			return ResponseEntity.status(HttpStatus.NO_CONTENT)
					.body(grievanceService.updateGrievance(grievance));
		}
		catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ApiResponse(e.getMessage(),"Failed"));
		}
	}
}
