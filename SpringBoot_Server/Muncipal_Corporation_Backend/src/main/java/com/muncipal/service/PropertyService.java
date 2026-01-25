package com.muncipal.service;

import com.muncipal.dto.PropertyRegistrationRequest;
import com.muncipal.entity.Property;

public interface PropertyService {

    Property registerProperty(PropertyRegistrationRequest request);
}
