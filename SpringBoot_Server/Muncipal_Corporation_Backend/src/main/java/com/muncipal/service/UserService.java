package com.muncipal.service;

import com.muncipal.dto.ApiResponse;
import com.muncipal.dto.UserDTO;
import com.muncipal.entity.User;

public interface UserService {

	UserDTO login(String email, String password);
	ApiResponse register(User user);
}
