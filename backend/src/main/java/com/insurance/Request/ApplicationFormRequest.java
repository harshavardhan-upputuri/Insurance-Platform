package com.insurance.Request;

import lombok.Data;

@Data
public class ApplicationFormRequest {
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
    private Long policyId;
    private Long categoryId;
}

