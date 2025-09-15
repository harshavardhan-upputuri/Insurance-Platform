package com.insurance.Request;

import com.insurance.domain.USER_ROLE;

import lombok.Data;

@Data
public class LoginOtpRequest {
    private String email;
    private USER_ROLE role;
}
