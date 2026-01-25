package com.muncipal.service.impl;

import com.muncipal.entity.enums.*;
import java.time.LocalDate;

import org.springframework.stereotype.Service;

import com.muncipal.dto.PropertyRegistrationRequest;
import com.muncipal.entity.Property;
import com.muncipal.repository.PropertyRepository;
import com.muncipal.service.PropertyService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PropertyServiceImpl implements PropertyService {

    private final PropertyRepository propertyRepository;

    @Override
    public Property registerProperty(PropertyRegistrationRequest request) {

        // 🔒 Business validations
        if (request.getBuiltUpArea() > request.getPlotArea()) {
            throw new IllegalArgumentException("Built-up area cannot exceed plot area");
        }

        if (request.getRegistrationDate().isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("Registration date cannot be in future");
        }

        if (propertyRepository.existsByPropertyNumber(request.getPropertyNumber())) {
            throw new IllegalArgumentException("Property number already exists");
        }

        Property property = new Property();
        property.setOwnerName(request.getOwnerName());
        property.setMobile(request.getMobile());
        property.setPropertyType(request.getPropertyType());
        property.setUsageType(request.getUsageType());
        property.setPlotArea(request.getPlotArea());
        property.setBuiltUpArea(request.getBuiltUpArea());
        property.setSurveyNumber(request.getSurveyNumber());
        property.setPropertyNumber(request.getPropertyNumber());
        property.setRegistrationDate(request.getRegistrationDate());
        property.setStatus(Status.PENDING);

        return propertyRepository.save(property);
    }
}
