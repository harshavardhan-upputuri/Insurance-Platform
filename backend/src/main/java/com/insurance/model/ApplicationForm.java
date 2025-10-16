package com.insurance.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.insurance.domain.ApplicationStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationForm {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Product policy;   

    private String firstName;
    private String lastName;
    private String occupation;
    private String email;
    private String phone;
    private double income;

    private String dateOfBirth;
    private String gender;
    private boolean married;
    private String address;
    private String pinCode;

     
    private String aadharFile;

   
    private String panFile;     

    @ManyToOne
    private Category category;
    private LocalDateTime appliedDate = LocalDateTime.now();


    private ApplicationStatus status = ApplicationStatus.PENDING; 

    @ManyToOne
    private Seller seller;   
}

