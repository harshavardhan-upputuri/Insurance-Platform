package com.insurance.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.insurance.Request.ChangePasswordRequest;
import com.insurance.Response.ApiResponse;
import com.insurance.model.User;
import com.insurance.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    
    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<User> GetUser(@RequestHeader("Authorization") String jwt) throws Exception{
        User user=userService.findUserbyJwt(jwt);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse> updateProfile(@RequestHeader("Authorization") String jwt,@RequestBody User user) throws Exception{
        userService.updateUserProfile(jwt, user);
        ApiResponse apiResponse=new ApiResponse();
        apiResponse.setMessage("Profile updated successfully");
        return ResponseEntity.ok(apiResponse);
    }

    @PutMapping("/change-password")
    public ResponseEntity<ApiResponse> changePassword(@RequestHeader("Authorization") String jwt,@RequestBody ChangePasswordRequest req) throws Exception{
        userService.changePassword(jwt, req.getOldPassword(), req.getNewPassword());
        ApiResponse apiResponse=new ApiResponse();
        apiResponse.setMessage("Password changed successfully");
        return ResponseEntity.ok(apiResponse);
    }
}
