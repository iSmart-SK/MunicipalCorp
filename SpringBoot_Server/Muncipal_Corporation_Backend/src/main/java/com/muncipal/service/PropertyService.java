package com.muncipal.service;

import java.util.List;

import com.muncipal.dto.PropertyRegistrationRequest;
import com.muncipal.entity.Property;
import com.muncipal.entity.enums.Status;

public interface PropertyService {

    Property registerProperty(PropertyRegistrationRequest request);

    List<Property> getPropertiesByCitizen(int citizenId);

	List<Property> getmyProperties(int citizenId);

	List<Property> getAllProperies();

	Property updatePropertyStatus(Long id , Status status , String reason);

   

}
