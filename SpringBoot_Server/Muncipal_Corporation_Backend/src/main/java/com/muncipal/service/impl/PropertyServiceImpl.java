package com.muncipal.service.impl;

import com.muncipal.entity.enums.*;

import java.net.Authenticator.RequestorType;
import java.time.LocalDate;
import java.util.List;
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
        
        double taxAmount=PropertyTaxCalculator.calculateTax(request.getBuiltUpArea(), request.getPropertyType() , request.getUsageType());
        System.out.println("amount to pay :" +taxAmount);
        
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
        property.setStatus(request.getStatus());
        property.setCitizenId(request.getCitizenId());
        property.setTaxPayment(request.getTaxPayment());
        property.setYearlyTax(taxAmount);
        System.out.println(request.getTaxPayment());
       

        return propertyRepository.save(property);
    }
    
    @Override
    public List<Property> getPropertiesByCitizen(int citizenId) {

        return propertyRepository.findByCitizenIdAndStatus(
                citizenId,
                Status.COMPLETED
        );
    }

	@Override
	public List<Property> getmyProperties(int citizenId) {
		// TODO Auto-generated method stub
		return propertyRepository.findByCitizenId(
                citizenId
                
        );
	}

	@Override
	public List<Property> getAllProperies() {
		// TODO Auto-generated method stub
		return propertyRepository.findAll();
	}

	@Override
	public Property updatePropertyStatus(Long id, Status status, String reason) {

	    Property property = propertyRepository.findById(id)
	        .orElseThrow(() -> new RuntimeException("Property not found with id: " + id));

	    property.setStatus(status);

	    if (status == Status.CANCELED) {
	        property.setReason(reason);   // only for rejection
	    } else {
	        property.setReason(null);     // clear reason if approved
	    }

	    return propertyRepository.save(property);
	}

	@Override
	public Property updatePropertyTaxStatus(Long Id) {
		// TODO Auto-generated method stub
		Status taxPayment = Status.COMPLETED;
		int updated =propertyRepository.updateTaxStatus(taxPayment, Id);
		return null;
	}


  
}
