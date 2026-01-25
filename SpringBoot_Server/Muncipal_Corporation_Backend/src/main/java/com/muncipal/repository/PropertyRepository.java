package com.muncipal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.muncipal.entity.Property;

public interface PropertyRepository extends JpaRepository<Property, Long> {

    boolean existsByPropertyNumber(String propertyNumber);
}
