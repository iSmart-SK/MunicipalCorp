package com.muncipal.entity;

import java.time.LocalDate;

import com.muncipal.entity.enums.CertificateStatus;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.muncipal.entity.enums.Gender;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "certificate")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Certificate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "enrollment_no")
    private Long enrollment;

    @Column(name = "person_name", nullable = false)
    private String personName ;//A neutral filed name

    @Column(name = "father_name")
    private String fatherName;

    @Column(name = "mother_name")
    private String motherName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CertificateStatus status;

    @Column(name = "event_place", nullable = false)
    private String eventPlace;
    
    @Column(name = "event_type", nullable = false)
    private String eventType; // BIRTH / DEATH
    

    @Column(name = "event_date", nullable = false)
    private LocalDate eventDate;
    
    @Column(name = "citizen_id", nullable = false)
    private int citizenId;

    @Column(name = "cause_of_death")
    private String causeOfDeath;
    
    @Column
    private String relation;
    
    @Column(name = "applied_date", nullable = false)
    @CreationTimestamp
    private LocalDate appliedDate;
    
    @Column(name = "last_modified_date", nullable = false)
    @UpdateTimestamp
    private LocalDate lastModifiedDate;
    
    @Column
    private String reason;
    

    
   
}
