package com.muncipal.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.muncipal.dto.PropertyRegistrationRequest;
import com.muncipal.entity.Property;
import com.muncipal.service.PropertyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/properties")

@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class PropertyController {

    private final PropertyService propertyService;

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
}
