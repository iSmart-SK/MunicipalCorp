package com.muncipal.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.muncipal.entity.Payment;


public interface PaymentRepo extends JpaRepository<Payment, Long> {
	
}