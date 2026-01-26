package com.muncipal.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.muncipal.custom_exceptions.ResourceNotFoundException;
import com.muncipal.dto.ApiResponse;
import com.muncipal.dto.CertificateDTO;
import com.muncipal.entity.Certificate;
import com.muncipal.repository.CertificateRepository;
import com.muncipal.service.CertificateService;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class CertificateServiceImpl
        implements CertificateService {
	
	@Autowired
    private final CertificateRepository repository= null;

//    public BirthCertificateServiceImpl(BirthCertificateRepository repository) {
//        this.repository = repository;
//    }

    @Override
    public Certificate createCertificate(Certificate certificate) {
        return repository.save(certificate);
    }

    @Override
    public Optional<Certificate> getByEnrollment(Long enrollment) {
        return repository.findById(enrollment);
    }

    @Override
    public List<Certificate> getAllCertificates() {
        return repository.findAll();
    }

    @Override
    public Certificate updateCertificate(Long enrollment,
                                              Certificate certificate) {

        Certificate existing =
                repository.findById(enrollment)
                        .orElseThrow(() ->
                                new RuntimeException("Birth Certificate not found"));

        existing.setPersonName(certificate.getPersonName());
        existing.setFatherName(certificate.getFatherName());
        existing.setMotherName(certificate.getMotherName());
        existing.setGender(certificate.getGender());
        existing.setEventPlace(certificate.getEventPlace());
        existing.setEventDate(certificate.getEventDate());

        return repository.save(existing);
    }

    @Override
    public void deleteCertificate(Long enrollment) {
        repository.deleteById(enrollment);
    }

	@Override
	public List<Certificate> getUserCertificate(Long citizenId) {
		return repository.findUserCertificate(citizenId);
	}

	@Override
	public List<Certificate> getUserBirthCertificate(Long citizenId) {
		return repository.findUserBirthCertificate(citizenId);
	}

	@Override
	public List<Certificate> getUserDeathCertificate(Long citizenId) {
		return repository.findUserDeathCertificate(citizenId);
	}

	@Override
	public List<Certificate> getBirthCertificate() {
		
		return repository.findBirthCertificate();
	}

	@Override
	public List<Certificate> getDeathCertificate() {
		return repository.findDeathCertificate();
	}

	@Override
	public ApiResponse updateCertificateStatus(Long certId, CertificateDTO certificateDTO) {
		Certificate c = repository.findById(certId).orElseThrow(() -> new ResourceNotFoundException("Invalid certificate id !!!!!!!"));
		c.setStatus(certificateDTO.getStatus());
		if(certificateDTO.getReason()!=null && (!certificateDTO.getReason().isBlank()))
				c.setReason(certificateDTO.getReason());
		repository.save(c);
		return new ApiResponse("Certificate Status updated","Success");
	}
	
	@Override
	public List<Certificate> getPendingBirthCertificate() {
		
		return repository.findPendingBirthCertificate();
	}

	@Override
	public List<Certificate> getPendingDeathCertificate() {
		return repository.findPendingDeathCertificate();
	}
}
