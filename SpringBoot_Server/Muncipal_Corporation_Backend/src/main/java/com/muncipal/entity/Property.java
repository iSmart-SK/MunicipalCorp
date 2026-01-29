package com.muncipal.entity;

import java.time.LocalDate;
import com.muncipal.entity.enums.*;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "properties")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Property extends BaseEntity {


    @Column(name = "owner_name", nullable = false)
    private String ownerName;

    @Column( nullable = false, length = 10)
    private String mobile;

    @Column(name="citizen_id", nullable = false)
    private int citizenId;
    
    @Column(name="property_type",nullable = false)
    private String propertyType;

    @Column(name ="usage_type",nullable = false)
    private String usageType;

    @Column(name="plot_area",nullable = false)
    private Integer plotArea;

    @Column(name="built_up_area",nullable = false)
    private Integer builtUpArea;

    @Column(name="survey_number",nullable = false, unique = true)
    private String surveyNumber;

    @Column(name="property_number",nullable = false, unique = true)
    private String propertyNumber;

    @Column(name ="registration_date",nullable = false)
    private LocalDate registrationDate;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status; //PENDING,COMPLETED,CANCELED;

    @Column
    private String reason;
    
    @Enumerated(EnumType.STRING)
    @Column(name="tax_payment")
    private Status taxPayment;
    
    @Column(name="yearly_tax")
    private double yearlyTax;
}
