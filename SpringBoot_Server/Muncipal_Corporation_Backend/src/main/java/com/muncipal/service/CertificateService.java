package com.muncipal.service;

import java.util.List;
import java.util.Optional;

import com.muncipal.dto.ApiResponse;
import com.muncipal.dto.CertificateDTO;
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
    
    List<Certificate> getBirthCertificate();
    
    List<Certificate> getDeathCertificate();
    
    ApiResponse updateCertificateStatus(Long certId, CertificateDTO certificateDTO);
    
    List<Certificate> getPendingBirthCertificate();
    
    List<Certificate> getPendingDeathCertificate();
}
