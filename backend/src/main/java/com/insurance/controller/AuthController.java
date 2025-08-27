package com.insurance.controller;

import com.insurance.config.JwtProvider;
import com.insurance.domain.USER_ROLE;
import com.insurance.model.User;
import com.insurance.repository.UserRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtProvider jwtTokenProvider;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // 🔹 LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );

        String token = jwtTokenProvider.generateJwtToken(authentication);

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("email", email);

        return ResponseEntity.ok(response);
    }

    // 🔹 SIGNUP
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestParam String email,
                                    @RequestParam String password,
                                    @RequestParam(defaultValue = "ROLE_CUSTOMER") USER_ROLE role) {

        if (userRepository.findByEmail(email) != null) {
            return ResponseEntity.badRequest().body("User already exists with email: " + email);
        }

        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password)); // store encoded password
        user.setRole(role);

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully with email: " + email);
    }
}
