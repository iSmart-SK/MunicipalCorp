package com.muncipal.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.muncipal.custom_exceptions.ApiException;
import com.muncipal.custom_exceptions.ResourceNotFoundException;
import com.muncipal.dto.ActInactStatusDTO;
import com.muncipal.dto.ApiResponse;
import com.muncipal.dto.UserDTO;
import com.muncipal.entity.User;
import com.muncipal.repository.UserRepository;
import com.muncipal.service.UserService;

@Service
@Transactional
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDTO login(String email, String password) {
		UserDTO udto = userRepository.findUser(email,password);
		if(udto==null) {
			throw new ApiException("Invalid email or password");
		}
		return udto;
	}

	@Override
	public ApiResponse register(User user) {
		if (userRepository.existsByEmail(user.getEmail())) {
			throw new ApiException("Email already exists!!!!!!!");
		}
		User savedUser = userRepository.save(user);
		return new ApiResponse("New user added with ID=" + savedUser.getId(), "Success");
	}

	@Override
	public List<User> getRegisteredCitizens() {	
		return userRepository.getRegisteredCitizens();
	}

	@Override
	public ApiResponse updateUserStatus(Long userid, ActInactStatusDTO actInactStatusDTO) {
		User u = userRepository.findById(userid).orElseThrow(() -> new ResourceNotFoundException("User not found"));
		u.setActStatus(actInactStatusDTO.getStatus());
		userRepository.save(u);
		return new ApiResponse("User Status updated","Success");
	}

}
