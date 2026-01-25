package com.muncipal.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.muncipal.dto.PropertyRegistrationRequest;
import com.muncipal.entity.Property;
import com.muncipal.service.PropertyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/properties")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PropertyController {

    private final PropertyService propertyService;

    @PostMapping
    public ResponseEntity<Property> registerProperty(
            @Validated @RequestBody PropertyRegistrationRequest request) {

        Property savedProperty = propertyService.registerProperty(request);
        return ResponseEntity.ok(savedProperty);
    }
}
