package com.muncipal.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.muncipal.config.RazorpayConfig;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements com.muncipal.service.PaymentService{

	@Autowired 
    private final RazorpayConfig razorpayConfig;

    public Map<String, Object> createOrder(int amount) throws Exception {

        RazorpayClient client = new RazorpayClient(
            razorpayConfig.getKeyId(),
            razorpayConfig.getKeySecret()
        );

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount * 100);
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "receipt_" + System.currentTimeMillis());

        Order order = client.orders.create(orderRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("orderId", order.get("id"));
        response.put("amount", amount);
        response.put("currency", "INR");
        response.put("key", razorpayConfig.getKeyId());

        return response;
    }
}