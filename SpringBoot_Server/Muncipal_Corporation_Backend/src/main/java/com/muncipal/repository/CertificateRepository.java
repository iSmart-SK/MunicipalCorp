package com.muncipal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.muncipal.entity.Certificate;

@Repository
public interface CertificateRepository
        extends JpaRepository<Certificate, Long> {

    
}
