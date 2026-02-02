package com.muncipal.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.muncipal.dto.PropertyRegistrationRequest;
import com.muncipal.entity.Property;
import com.muncipal.entity.enums.PaymentStatus;
import com.muncipal.entity.enums.PropertyStatus;
import com.muncipal.repository.PropertyRepository;
import com.muncipal.service.PropertyService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class PropertyServiceImpl implements PropertyService {

    private final PropertyRepository propertyRepository;

    @Override
    public Property registerProperty(PropertyRegistrationRequest request) {

        if (request.getBuiltUpArea() > request.getPlotArea()) {
            throw new IllegalArgumentException("Built-up area cannot exceed plot area");
        }

        if (request.getRegistrationDate().isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("Registration date cannot be in future");
        }

        if (propertyRepository.existsByPropertyNumber(request.getPropertyNumber())) {
            throw new IllegalArgumentException("Property number already exists");
        }

        double taxAmount = PropertyTaxCalculator.calculateTax(
                request.getBuiltUpArea(),
                request.getPropertyType(),
                request.getUsageType()
        );

        Property property = new Property();
        property.setOwnerName(request.getOwnerName());
        property.setMobile(request.getMobile());
        property.setCitizenId(request.getCitizenId());
        property.setPropertyType(request.getPropertyType());
        property.setUsageType(request.getUsageType());
        property.setPlotArea(request.getPlotArea());
        property.setBuiltUpArea(request.getBuiltUpArea());
        property.setSurveyNumber(request.getSurveyNumber());
        property.setPropertyNumber(request.getPropertyNumber());
        property.setRegistrationDate(request.getRegistrationDate());

        // ✅ Correct enums
        property.setStatus(PropertyStatus.PENDING);
        property.setTaxPayment(PaymentStatus.PENDING);
        property.setYearlyTax(taxAmount);

        return propertyRepository.save(property);
    }

    @Override
    public List<Property> getPropertiesByCitizen(int citizenId) {
        return propertyRepository.findByCitizenIdAndStatus(
                citizenId,
                PropertyStatus.COMPLETED
        );
    }

    @Override
    public List<Property> getmyProperties(int citizenId) {
        return propertyRepository.findByCitizenId(citizenId);
    }

    @Override
    public List<Property> getAllProperies() {
        return propertyRepository.findAll();
    }

    @Override
    public Property updatePropertyStatus(Long id, PropertyStatus status, String reason) {

        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        property.setStatus(status);

        if (status == PropertyStatus.CANCELED) {
            property.setReason(reason);
        } else {
            property.setReason(null);
        }

        return propertyRepository.save(property);
    }

    @Override
    public Property updatePropertyTaxStatus(Long id) {

        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        property.setTaxPayment(PaymentStatus.SUCCESSFULL);

        return propertyRepository.save(property);
    }
}
