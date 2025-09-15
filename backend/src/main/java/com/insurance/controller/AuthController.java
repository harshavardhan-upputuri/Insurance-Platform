package com.insurance.controller;

import com.insurance.Request.LoginOtpRequest;
import com.insurance.Request.LoginRequest;
import com.insurance.Request.SignupRequest;
import com.insurance.Response.ApiResponse;
import com.insurance.Response.AuthResponse;
 
import com.insurance.domain.USER_ROLE;

import com.insurance.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
 
import org.springframework.web.bind.annotation.*;

 

@RestController
@RequestMapping("/auth")
public class AuthController {   

    @Autowired 
    private AuthService authService; 

    //  LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) throws Exception {
        AuthResponse authResponse=authService.signing(loginRequest);      

        return ResponseEntity.ok(authResponse);
    }

    //  SIGNUP
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest signupRequest) throws Exception {

        String jwt= authService.createUser(signupRequest);

        AuthResponse authResponse=new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("created user successfully");
        authResponse.setRole(USER_ROLE.ROLE_CUSTOMER);
       return ResponseEntity.ok(authResponse);
    }


    // Send Otp
    @PostMapping("/send-otp")
    public ResponseEntity<ApiResponse> sendOtp(@RequestBody LoginOtpRequest req) throws Exception{
        authService.sendLoginOtp(req.getEmail(), req.getRole());

        String mes="Otp Sent Success";
        ApiResponse apiResponse=new ApiResponse();
        apiResponse.setMessage(mes);
        return ResponseEntity.ok(apiResponse);
    }
}
