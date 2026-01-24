package com.muncipal.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.muncipal.entity.BirthCertificate;
import com.muncipal.repository.BirthCertificateRepository;
import com.muncipal.service.BirthCertificateService;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class BirthCertificateServiceImpl
        implements BirthCertificateService {
	
	@Autowired
    private final BirthCertificateRepository repository= null;

//    public BirthCertificateServiceImpl(BirthCertificateRepository repository) {
//        this.repository = repository;
//    }

    @Override
    public BirthCertificate createCertificate(BirthCertificate certificate) {
        return repository.save(certificate);
    }

    @Override
    public Optional<BirthCertificate> getByEnrollment(Long enrollment) {
        return repository.findById(enrollment);
    }

    @Override
    public List<BirthCertificate> getAllCertificates() {
        return repository.findAll();
    }

    @Override
    public BirthCertificate updateCertificate(Long enrollment,
                                              BirthCertificate certificate) {

        BirthCertificate existing =
                repository.findById(enrollment)
                        .orElseThrow(() ->
                                new RuntimeException("Birth Certificate not found"));

        existing.setChildName(certificate.getChildName());
        existing.setFatherName(certificate.getFatherName());
        existing.setMotherName(certificate.getMotherName());
        existing.setGender(certificate.getGender());
        existing.setPlaceOfBirth(certificate.getPlaceOfBirth());
        existing.setDateOfBirth(certificate.getDateOfBirth());

        return repository.save(existing);
    }

    @Override
    public void deleteCertificate(Long enrollment) {
        repository.deleteById(enrollment);
    }
}
