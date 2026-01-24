package com.muncipal.entity;

import java.time.LocalDate;

import com.muncipal.entity.enums.Gender;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "birth_certificates")
public class BirthCertificate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "enrollment_no")
    private Long enrollment;

    @Column(name = "child_name", nullable = false)
    private String childName;

    @Column(name = "father_name", nullable = false)
    private String fatherName;

    @Column(name = "mother_name", nullable = false)
    private String motherName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    @Column(name = "place_of_birth", nullable = false)
    private String placeOfBirth;

    @Column(name = "date_of_birth", nullable = false)
//    @JsonProperty("dob")
    private LocalDate dateOfBirth ;

    // ---------- Constructors ----------

    public BirthCertificate() {
        // required by JPA
    }

    public BirthCertificate(Long enrollment, String childName, String fatherName,
                            String motherName, Gender gender,
                            String placeOfBirth, LocalDate dateOfBirth) {
        this.enrollment = enrollment;
        this.childName = childName;
        this.fatherName = fatherName;
        this.motherName = motherName;
        this.gender = gender;
        this.placeOfBirth = placeOfBirth;
        this.dateOfBirth = dateOfBirth;
    }

    // ---------- Getters & Setters ----------

    public Long getEnrollment() {
        return enrollment;
    }

//    public void setEnrollment(Long enrollment) {
//        this.enrollment = enrollment;
//    }

    public String getChildName() {
        return childName;
    }

    public void setChildName(String childName) {
        this.childName = childName;
    }

    public String getFatherName() {
        return fatherName;
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }

    public String getMotherName() {
        return motherName;
    }

    public void setMotherName(String motherName) {
        this.motherName = motherName;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getPlaceOfBirth() {
        return placeOfBirth;
    }

    public void setPlaceOfBirth(String placeOfBirth) {
        this.placeOfBirth = placeOfBirth;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
}
