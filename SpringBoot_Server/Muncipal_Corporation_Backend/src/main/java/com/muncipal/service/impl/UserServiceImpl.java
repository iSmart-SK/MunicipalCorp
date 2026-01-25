package com.muncipal.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.muncipal.custom_exceptions.ApiException;
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

}
