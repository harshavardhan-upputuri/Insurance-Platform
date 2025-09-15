package com.insurance.Request;

import lombok.Data;

@Data
public class SignupRequest {
    private String email;
    private String fullName;
    private String otp;  
    private String mobile;  
    private String password;

}
