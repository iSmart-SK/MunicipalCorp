package com.muncipal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.muncipal.entity.Grievance;

@Repository
public interface GrievanceRepository extends JpaRepository<Grievance, Long> {
	
	@Query("select g from Grievance g where g.status=\"PENDING\"")
	List<Grievance> findPendingGrievance();
	
	@Query("select g from Grievance g where g.user.id=:id")
	List<Grievance> findUserGrievance(@Param("id") Long userid);
}
