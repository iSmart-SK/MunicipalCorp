package com.muncipal.service;

import java.util.List;

import com.muncipal.dto.PropertyRegistrationRequest;
import com.muncipal.entity.Property;

public interface PropertyService {

    Property registerProperty(PropertyRegistrationRequest request);

    List<Property> getPropertiesByCitizen(int citizenId);

   

}
