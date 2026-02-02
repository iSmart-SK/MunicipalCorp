package com.muncipal.entity;

import com.muncipal.entity.enums.Status;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "payments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Payment extends BaseEntity {

	//data for below three fields will be provided by razorpay
	@Column(name="razorpay_order_id" )
    private String razorpayOrderId;
	
	@Column(name="razorpay_payment_id" )
    private String razorpayPaymentId;
	
	@Column(name="razorpay_signature" )
    private String razorpaySignature;
	

	@Column(name="amount", nullable = false)
    private int amount ; //store in paisa
	
	@Column(name="currency", nullable = false)
    private String currency;
	

	@Column(name = "status", nullable = false)
	private String status;

	
	@Column(name="payment_method")
    private String paymentMethod;

	
	@Column(name="citizen_id", nullable = false)
    private int citizenId;
	
	@Column(name="reference_id", nullable = false)
    private String referenceId;//Property ID or Tax Reference
	
	@Column(name="fee_type", nullable = false)
    private String feeType;


}

