package com.muncipal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.muncipal.entity.BirthCertificate;

@Repository
public interface BirthCertificateRepository
        extends JpaRepository<BirthCertificate, Long> {

    
}
