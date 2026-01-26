package com.muncipal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.muncipal.dto.ActInactStatusDTO;
import com.muncipal.dto.ApiResponse;
import com.muncipal.dto.LoginDTO;
import com.muncipal.entity.User;
import com.muncipal.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
	@Autowired
	private UserService userService;
	
	
	@PostMapping("/register")
	ResponseEntity<?> register(@RequestBody User u) {
		try {
			return ResponseEntity.ok(userService.register(u));
					
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT) //SC 409
					.body(new ApiResponse(e.getMessage(), "Failed"));
		}
	}
	
	@PostMapping("/login")
	ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
		try {
			return ResponseEntity.ok(userService.login(loginDTO.getEmail(),loginDTO.getPassword()));
					
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND) //SC 404
					.body(new ApiResponse(e.getMessage(), "Failed"));
		}
	}
	
	@GetMapping
	ResponseEntity<?> getRegisteredCitizen() {
		return ResponseEntity.ok(userService.getRegisteredCitizens());
	}
	
	@PatchMapping("/{userid}")
	ResponseEntity<?> updateCitizenStatus(@PathVariable Long userid,@RequestBody ActInactStatusDTO actInactStatusDTO) {
		try {
			return ResponseEntity.status(HttpStatus.NO_CONTENT)
					.body(userService.updateUserStatus(userid,actInactStatusDTO));
		}
		catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ApiResponse(e.getMessage(),"Failed"));
		}
	}
}
