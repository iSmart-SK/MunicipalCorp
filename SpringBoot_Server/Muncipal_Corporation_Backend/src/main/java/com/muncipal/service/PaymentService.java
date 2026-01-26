package com.muncipal.service;

import java.util.Map;

public interface PaymentService {

	Map<String, Object> createOrder(int amount)throws Exception;

}
