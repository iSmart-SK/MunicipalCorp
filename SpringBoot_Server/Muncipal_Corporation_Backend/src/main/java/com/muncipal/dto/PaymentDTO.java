package com.muncipal.dto;

import com.muncipal.entity.enums.PaymentStatus;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentDTO {

    // Razorpay provided fields
    @NotBlank
    private String razorpayOrderId;

    @NotBlank
    private String razorpayPaymentId;

    @NotBlank
    private String razorpaySignature;

    // Payment details
    @NotNull
    @Positive
    private Double amount;

    @NotBlank
    private String currency;

    @NotNull
    private PaymentStatus status;

    @NotBlank
    private String paymentMethod;

    // Business references
    @NotNull
    private Integer citizenId;

    @NotBlank
    private String referenceId;

    @NotBlank
    private String feeType;
}
