package com.muncipal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.muncipal.entity.Grievance;
import com.muncipal.entity.enums.Status;
import com.muncipal.service.GrievanceService;
import com.municipal.dto.ApiResponse;
import com.municipal.dto.StatusDTO;

@RestController
@RequestMapping("/grievances")
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
	
	@PatchMapping("/{id}")
	ResponseEntity<?> updateStatusGrievance(@PathVariable Long id,@RequestBody StatusDTO status) {
		try {
			return ResponseEntity.status(HttpStatus.NO_CONTENT)
					.body(grievanceService.updateGrievanceStatus(id,status.getStatus()));
		}
		catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ApiResponse(e.getMessage(),"Failed"));
		}
	}
	
	@GetMapping
	ResponseEntity<?> getPendingGrievance() {
		List<Grievance> gl = grievanceService.findGrievance();
		return ResponseEntity.ok(gl);
	}
}
