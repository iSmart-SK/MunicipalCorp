package com.muncipal.service;

import java.util.List;
import java.util.Optional;

import com.muncipal.entity.BirthCertificate;

public interface BirthCertificateService {

    BirthCertificate createCertificate(BirthCertificate certificate);

    Optional<BirthCertificate> getByEnrollment(Long enrollment);

    List<BirthCertificate> getAllCertificates();

    BirthCertificate updateCertificate(Long enrollment, BirthCertificate certificate);

    void deleteCertificate(Long enrollment);
}
