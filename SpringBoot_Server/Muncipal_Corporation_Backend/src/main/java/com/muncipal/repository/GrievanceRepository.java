package com.muncipal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.muncipal.entity.Grievance;

@Repository
public interface GrievanceRepository extends JpaRepository<Grievance, Long> {
	
}
