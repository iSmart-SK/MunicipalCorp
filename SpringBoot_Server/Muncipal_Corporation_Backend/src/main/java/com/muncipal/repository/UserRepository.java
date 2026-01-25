package com.muncipal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.muncipal.dto.UserDTO;
import com.muncipal.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	boolean existsByEmail(String em);

	@Query("select new com.muncipal.dto.UserDTO(u.id, u.name, u.role) from User u where u.email=:em and u.password=:pass and u.actStatus=\"ACTIVE\"")
	UserDTO findUser(@Param("em") String email, @Param("pass") String password);
	
	
}
