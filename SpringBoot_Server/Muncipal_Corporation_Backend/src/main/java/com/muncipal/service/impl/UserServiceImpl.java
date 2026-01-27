package com.muncipal.service.impl;

import java.util.List;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.muncipal.custom_exceptions.ApiException;
import com.muncipal.custom_exceptions.ResourceNotFoundException;
import com.muncipal.dto.ActInactStatusDTO;
import com.muncipal.dto.ApiResponse;
import com.muncipal.dto.UserDTO;
import com.muncipal.entity.User;
import com.muncipal.entity.enums.ActInactStatus;
import com.muncipal.entity.enums.UserRole;
import com.muncipal.repository.UserRepository;
import com.muncipal.security.JwtUtil;
import com.muncipal.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	private final JwtUtil jwtUtil;

	@Override
	public UserDTO login(String email, String password) {

		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(email, password)
		);

		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new ApiException("Invalid email or password"));
		if(ActInactStatus.INACTIVE.equals(user.getActStatus())) {
			throw new ApiException("Inactive User");
		}
		UserDTO userDTO = new UserDTO();
		userDTO.setId(user.getId());
		userDTO.setName(user.getName());
		userDTO.setRole(user.getRole());
		userDTO.setToken(jwtUtil.generateToken(user.getEmail(), user.getRole().name()));
		return userDTO;
	}

	@Override
	public ApiResponse register(User user) {

		if (userRepository.existsByEmail(user.getEmail())) {
			throw new ApiException("Email already exists!");
		}

		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setRole(UserRole.CITIZEN);
		user.setActStatus(ActInactStatus.ACTIVE);

		userRepository.save(user);
		return new ApiResponse("User registered successfully", "SUCCESS");
	}

	@Override
	public List<User> getRegisteredCitizens() {
		return userRepository.findByRole(UserRole.CITIZEN);
	}

	@Override
	public ApiResponse updateUserStatus(Long userId, ActInactStatusDTO actInactStatusDTO) {

		User user = userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found"));

		user.setActStatus(actInactStatusDTO.getStatus());
		userRepository.save(user);

		return new ApiResponse("User status updated successfully", "SUCCESS");
	}
}
