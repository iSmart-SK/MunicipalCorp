package com.muncipal.service.impl;


import java.util.HashMap;
import java.util.Map;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.muncipal.config.RazorpayConfig;
import com.muncipal.entity.Payment;
import com.muncipal.repository.PaymentRepo;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements com.muncipal.service.PaymentService{

	@Autowired 
    private final RazorpayConfig razorpayConfig;
	
	@Autowired
	private final PaymentRepo paymentRepo;

    public Map<String, Object> createOrder(int amount) throws Exception {
    	

        RazorpayClient client = new RazorpayClient(
            razorpayConfig.getKeyId(),
            razorpayConfig.getKeySecret()
        );

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount *100);
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

	@Override
	public Object verify(Map<String, Object> response) throws Exception {
		 
		RazorpayClient client = new RazorpayClient(
	            razorpayConfig.getKeyId(),
	            razorpayConfig.getKeySecret()
	        );
		System.out.println("reponse "+response);
		String orderId = response.get("orderId").toString();
        String paymentId = response.get("paymentId").toString();
        String razorpaySignature = response.get("signature").toString();
        
        //payment verification
        boolean valid = SignatureVerification(orderId,
                 paymentId,
                razorpaySignature); //get true or false when compared
        System.out.println("checking :" +valid);
        System.out.println("client signature" +razorpaySignature);
        
        // after signature is verified we can conclude that the payment is geniun
        
      //we have all required data available in response but we need payment used in transaction  eg.upi ,card ,etc
        com.razorpay.Payment razorpayPayment = client.payments.fetch(paymentId); //my entity and razorpay entity name were same so to remove ambiguity used fully qualified class name 
        
        String paymentMethod = razorpayPayment.get("method");
        String status = razorpayPayment.get("status");   // captured
        int amount = razorpayPayment.get("amount");

        System.out.println("Method: " + paymentMethod);
        System.out.println("Status: " + status);
        
        Payment payment = new Payment();
        payment.setAmount(amount);
        payment.setCitizenId(Integer.parseInt(response.get("citizenId").toString()));
        payment.setCurrency(response.get("currency").toString());
        payment.setFeeType(response.get("feeType").toString());
        payment.setPaymentMethod(paymentMethod);
        payment.setRazorpayOrderId(response.get("orderId").toString());
        payment.setRazorpayPaymentId(response.get("paymentId").toString());
        payment.setRazorpaySignature(response.get("signature").toString());
        payment.setReferenceId(response.get("propertyId").toString());
        payment.setStatus(status);
        
        
		return paymentRepo.save(payment);
	}
    
	//method to compare and verify signature
    private Boolean SignatureVerification(String orderId,
            String paymentId,
            String razorpaySignature) throws Exception {
    	
    	String payload = orderId + "|" + paymentId ;
    	
    	Mac mac = Mac.getInstance("HmacSHA256");
    	mac.init(new SecretKeySpec(razorpayConfig.getKeySecret().getBytes(),"HmacSHA256"));
    	byte[]  hash = mac.doFinal(payload.getBytes());
    	

//    		String generatedSignature =Base64.getEncoder().encodeToString(hash);// failed and get false when compare this with client side signature
    	
    	String generateSignature =bytesToHex(hash);//Razorpay signatures are HMAC SHA256 encoded in HEX, not Base64.
    	System.out.println("backend signature" +generateSignature);
    	return generateSignature.equals(razorpaySignature);
    }
    //method for conversion of byte to hex
    private String bytesToHex(byte[] bytes) {
        StringBuilder hex = new StringBuilder(bytes.length * 2);
        for (byte b : bytes) {
            hex.append(String.format("%02x", b));
        }
        return hex.toString();
    }
}