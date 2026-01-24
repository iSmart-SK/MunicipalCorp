package com.muncipal.service;

import com.muncipal.entity.User;
import com.municipal.dto.ApiResponse;
import com.municipal.dto.UserDTO;

public interface UserService {

	UserDTO login(String email, String password);
	ApiResponse register(User user);
}
