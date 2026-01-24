package com.muncipal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.muncipal.entity.BirthCertificate;
import com.muncipal.service.BirthCertificateService;

@RestController
@RequestMapping("/birth-certificates")
@CrossOrigin(origins = "http://localhost:5173")
public class BirthCertificateController {

	@Autowired
	private final BirthCertificateService service = null;

//    public BirthCertificateController(BirthCertificateService service) {
//        this.service = service;
//    }

    // Create
    @PostMapping
    public ResponseEntity<BirthCertificate> create(
            @RequestBody BirthCertificate certificate) {
        return ResponseEntity.ok(service.createCertificate(certificate));
    }

    // Get by enrollment
    @GetMapping("/{enrollment}")
    public ResponseEntity<BirthCertificate> getByEnrollment(
            @PathVariable Long enrollment) {

        return service.getByEnrollment(enrollment)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Get all
    @GetMapping
    public ResponseEntity<List<BirthCertificate>> getAll() {
        return ResponseEntity.ok(service.getAllCertificates());
    }

    // Update
    @PutMapping("/{enrollment}")
    public ResponseEntity<BirthCertificate> update(
            @PathVariable Long enrollment,
            @RequestBody BirthCertificate certificate) {

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
}
