package com.muncipal.service;

import java.util.List;
import java.util.Optional;

import com.muncipal.entity.Certificate;

public interface CertificateService {

    Certificate createCertificate(Certificate certificate);

    Optional<Certificate> getByEnrollment(Long enrollment);

    List<Certificate> getAllCertificates();

    Certificate updateCertificate(Long enrollment, Certificate certificate);

    void deleteCertificate(Long enrollment);
    
    List<Certificate> getUserCertificate(Long citizenId);
    
    List<Certificate> getUserBirthCertificate(Long citizenId);
    
    List<Certificate> getUserDeathCertificate(Long citizenId);
}
