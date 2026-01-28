package com.muncipal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.muncipal.entity.Property;
import com.muncipal.entity.enums.Status;

import jakarta.transaction.Transactional;

public interface PropertyRepository extends JpaRepository<Property, Long> {

    boolean existsByPropertyNumber(String propertyNumber);
    
    List<Property> findByCitizenIdAndStatus(int citizenId, Status status);
    
    List<Property> findByCitizenId(int citizenId);
    
    @Transactional
    @Modifying
    @Query("update Property p set p.taxPayment = :taxPayment where p.id = :id")
    int updateTaxStatus(@Param("taxPayment") Status taxPayment ,@Param("id") Long id);
}
