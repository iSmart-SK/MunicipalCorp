package com.muncipal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.muncipal.entity.Payment;
import com.muncipal.entity.Property;
import com.muncipal.entity.enums.Status;

public interface PaymentRepo extends JpaRepository<Payment, Long> {
	
}