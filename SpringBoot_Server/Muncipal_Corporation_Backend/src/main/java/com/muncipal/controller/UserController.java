package com.muncipal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.muncipal.entity.User;
import com.muncipal.service.UserService;
import com.municipal.dto.ApiResponse;
import com.municipal.dto.LoginDTO;

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
}
