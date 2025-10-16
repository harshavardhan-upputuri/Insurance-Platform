package com.insurance.service;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.insurance.domain.USER_ROLE;
import com.insurance.model.User;
import com.insurance.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class Datainitialization implements CommandLineRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        initializeAdminUser();
    }

    private void initializeAdminUser() {
        String adminUserName = "nikkiharshunikki@gmail.com";

        if (userRepository.findByEmail(adminUserName) == null) {
            User adminUser = new User();

            adminUser.setPassword(passwordEncoder.encode("harshaupputuri"));
            adminUser.setFullName("Harsha");
            adminUser.setEmail(adminUserName);
            adminUser.setRole(USER_ROLE.ROLE_ADMIN);
            adminUser.setMobile("9999988888");
            User admin = userRepository.save(adminUser);
        }
    };

}
