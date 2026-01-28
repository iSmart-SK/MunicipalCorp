package com.muncipal.dto;
import com.muncipal.entity.enums.*;
import java.time.LocalDate;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PropertyRegistrationRequest {

    @NotBlank
    private String ownerName;

    @NotBlank
    @Pattern(regexp = "^[0-9]{10}$", message = "Mobile must be 10 digits")
    private String mobile;

    @NotBlank
    private String propertyType; // RESIDENTIAL / COMMERCIAL / MIXED

    @NotBlank
    private String usageType; // SELF_OCCUPIED / RENTED / SHOP etc.

    @NotNull
    @Min(1)
    private Integer plotArea;

    @NotNull
    @Min(1)
    private Integer builtUpArea;

    @NotBlank
    private String surveyNumber;

    @NotBlank
    private String propertyNumber;

    @NotNull
    private LocalDate registrationDate;
    
    @NotNull
    private Status status;
    
    @NotNull
    private int citizenId;
    
    private Status taxPayment; 
}
