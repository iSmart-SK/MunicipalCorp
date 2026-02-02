package com.muncipal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.muncipal.dto.ApiResponse;
import com.muncipal.dto.CertificateDTO;
import com.muncipal.entity.Certificate;
import com.muncipal.service.CertificateService;

@RestController
@RequestMapping("/certificateController")
public class CertificateController {

	@Autowired
	private final CertificateService service = null;

//    public BirthCertificateController(BirthCertificateService service) {
//        this.service = service;
//    }

    // Create
    @PostMapping
    public ResponseEntity<Certificate> create(
            @RequestBody Certificate certificate) {
        return ResponseEntity.ok(service.createCertificate(certificate));
    }

    // Get by enrollment
    @GetMapping("/{enrollment}")
    public ResponseEntity<Certificate> getByEnrollment(
            @PathVariable Long enrollment) {

        return service.getByEnrollment(enrollment)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Get all
    @GetMapping
    public ResponseEntity<List<Certificate>> getAll() {
        return ResponseEntity.ok(service.getAllCertificates());
    }

    // Update
    @PutMapping("/{enrollment}")
    public ResponseEntity<Certificate> update(
            @PathVariable Long enrollment,
            @RequestBody Certificate certificate) {

        return ResponseEntity.ok(
                service.updateCertificate(enrollment, certificate));
    }

    // Delete
    @DeleteMapping("/{enrollment}")
    public ResponseEntity<Void> delete(
            @PathVariable Long enrollment) {

        service.deleteCertificate(enrollment);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/{userid}")
    public ResponseEntity<?> findUserCertificate(@PathVariable Long userid) {
    	return ResponseEntity.ok(service.getUserCertificate(userid));
    }
    
    @GetMapping("/birth/{userid}")
    public ResponseEntity<?> findUserBirthCertificate(@PathVariable Long userid) {
    	return ResponseEntity.ok(service.getUserBirthCertificate(userid));
    }
    
    @GetMapping("/death/{userid}")
    public ResponseEntity<?> findUserDeathCertificate(@PathVariable Long userid) {
    	return ResponseEntity.ok(service.getUserDeathCertificate(userid));
    }
    
    @GetMapping("/birth")
    public ResponseEntity<?> findBirthCertificate() {
    	return ResponseEntity.ok(service.getBirthCertificate());
    }
    
    @GetMapping("/death")
    public ResponseEntity<?> findDeathCertificate() {
    	return ResponseEntity.ok(service.getDeathCertificate());
    }
    
    @GetMapping("/birth/pending")
    public ResponseEntity<?> findPendingBirthCertificate() {
    	return ResponseEntity.ok(service.getPendingBirthCertificate());
    }
    
    @GetMapping("/death/pending")
    public ResponseEntity<?> findPendingDeathCertificate() {
    	return ResponseEntity.ok(service.getPendingDeathCertificate());
    }
    
    @PatchMapping("/{certId}")
    public ResponseEntity<?> updateCertificateStatus(@PathVariable Long certId,@RequestBody CertificateDTO certificateDTO) {
    	try {
    		return ResponseEntity.status(HttpStatus.NO_CONTENT)
    				.body(service.updateCertificateStatus(certId, certificateDTO));
    	}
    	catch (RuntimeException e) {
    		return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ApiResponse(e.getMessage(),"Failed"));
		}
    }
}
