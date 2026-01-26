package com.muncipal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.muncipal.entity.Certificate;
import com.muncipal.entity.Grievance;

@Repository
public interface CertificateRepository
        extends JpaRepository<Certificate, Long> {

	@Query("select c from Certificate c where c.citizenId=:id")
	List<Certificate> findUserCertificate(@Param("id") Long userid);
	
	@Query("select c from Certificate c where c.eventType=\"BIRTH\" and c.citizenId=:id")
	List<Certificate> findUserBirthCertificate(@Param("id") Long userid);
	
	@Query("select c from Certificate c where c.eventType=\"DEATH\" and c.citizenId=:id")
	List<Certificate> findUserDeathCertificate(@Param("id") Long userid);
	
	@Query("select c from Certificate c where c.eventType=\"BIRTH\"")
	List<Certificate> findBirthCertificate();
	
	@Query("select c from Certificate c where c.eventType=\"DEATH\"")
	List<Certificate> findDeathCertificate();
	
	@Query("select c from Certificate c where c.eventType=\"BIRTH\" and c.status=\"PENDING\"")
	List<Certificate> findPendingBirthCertificate();
	
	@Query("select c from Certificate c where c.eventType=\"DEATH\" and c.status=\"PENDING\"")
	List<Certificate> findPendingDeathCertificate();
}
