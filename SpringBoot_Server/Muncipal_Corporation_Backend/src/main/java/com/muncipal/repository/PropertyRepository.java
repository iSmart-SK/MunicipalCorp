package com.muncipal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.muncipal.entity.Property;
import com.muncipal.entity.enums.Status;

public interface PropertyRepository extends JpaRepository<Property, Long> {

    boolean existsByPropertyNumber(String propertyNumber);
    
    List<Property> findByCitizenIdAndStatus(int citizenId, Status status);
    
    List<Property> findByCitizenId(int citizenId);
}
