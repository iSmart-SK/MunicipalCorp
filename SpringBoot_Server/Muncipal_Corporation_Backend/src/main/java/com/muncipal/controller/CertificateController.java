package com.muncipal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.muncipal.entity.Certificate;
import com.muncipal.service.CertificateService;

@RestController
@RequestMapping("/certificateController")
@CrossOrigin(origins = "http://localhost:5173")
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
}
