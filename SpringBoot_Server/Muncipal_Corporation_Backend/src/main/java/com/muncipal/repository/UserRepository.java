package com.muncipal.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.muncipal.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	boolean existsByEmail(String email);

	Optional<User> findByEmail(String email);

	// Optional: still useful for admin reports
	List<User> findByRole(com.muncipal.entity.enums.UserRole role);
}
