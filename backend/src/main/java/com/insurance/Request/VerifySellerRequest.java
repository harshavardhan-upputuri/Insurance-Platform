package com.insurance.Request;
 

import lombok.Data;

@Data
public class VerifySellerRequest {
    String email;
    String otp;
}
