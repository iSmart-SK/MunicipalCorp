package com.muncipal.service;

import java.util.List;

import com.muncipal.dto.ActInactStatusDTO;
import com.muncipal.dto.ApiResponse;
import com.muncipal.entity.User;

public interface UserService {


	String login(String email, String password);

	ApiResponse register(User user);

	List<User> getRegisteredCitizens();

	ApiResponse updateUserStatus(Long userId, ActInactStatusDTO actInactStatusDTO);
}
