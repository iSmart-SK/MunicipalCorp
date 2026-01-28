package com.muncipal.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.muncipal.dto.PaymentDTO;
import com.muncipal.service.PaymentService;
import com.razorpay.RazorpayException;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/payment")
@CrossOrigin
@RequiredArgsConstructor
public class PaymentController {

	@Autowired
    private final PaymentService paymentService;

    @PostMapping("/create-order")
    public Map<String, Object> createOrder(
            @RequestBody Map<String, Object> data) throws Exception {
    	
    	System.out.println("Incoming request data: " + data);

    	if (!data.containsKey("amount")) {
            throw new IllegalArgumentException("Amount is required");
        }

        int amount = Integer.parseInt(data.get("amount").toString());
        return paymentService.createOrder(amount);
    }
    
    @PostMapping("/verify")
    public  Object verify(@RequestBody   Map<String, Object> response ) throws Exception {
    	System.out.println("repose data" + response);
    	return paymentService.verify(response);
    	
    }
   
}