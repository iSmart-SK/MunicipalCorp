package com.muncipal.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.muncipal.dto.PropertyRegistrationRequest;
import com.muncipal.entity.Property;
import com.muncipal.entity.enums.PropertyStatus;
import com.muncipal.service.PropertyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/properties")
@RequiredArgsConstructor
public class PropertyController {

    private final PropertyService propertyService;

    @GetMapping
    public List<Property> getAllProperties() {
        return propertyService.getAllProperies();
    }

    @PostMapping
    public ResponseEntity<Property> registerProperty(
            @Validated @RequestBody PropertyRegistrationRequest request) {

        Property savedProperty = propertyService.registerProperty(request);
        return ResponseEntity.ok(savedProperty);
    }

    @GetMapping("/{citizenId}")
    public List<Property> getMyProperties(@PathVariable int citizenId) {
        return propertyService.getPropertiesByCitizen(citizenId);
    }

    @GetMapping("/citizen/{citizenId}")
    public List<Property> trackMyProperties(@PathVariable int citizenId) {
        return propertyService.getmyProperties(citizenId);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Property> updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {

        PropertyStatus status = PropertyStatus.valueOf(body.get("status"));
        String reason = body.get("reason");

        Property updated = propertyService.updatePropertyStatus(id, status, reason);
        return ResponseEntity.ok(updated);
    }

    @PatchMapping("/taxUpdate/{id}")
    public ResponseEntity<Property> updateTaxStatus(@PathVariable Long id) {

        Property updated = propertyService.updatePropertyTaxStatus(id);
        return ResponseEntity.ok(updated);
    }
}
