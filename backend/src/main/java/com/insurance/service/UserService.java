package com.insurance.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.insurance.config.JwtProvider;
import com.insurance.model.Address;
import com.insurance.model.User;
import com.insurance.repository.AddressRepository;
import com.insurance.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AddressRepository addressRepository;

    public User findUserByEmail(String email) throws Exception {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new Exception("User not found with this email - " + email);
        }

        return user;
    }

    public User findUserbyJwt(String jwt) throws Exception {
        String email = jwtProvider.getEmailFromJwtToken(jwt);

        return this.findUserByEmail(email);
    }

    public void updateUserProfile(String jwt, User user) throws Exception {
        User curr = findUserbyJwt(jwt);

        if (user.getFullName() != null)
            curr.setFullName(user.getFullName());
        if (user.getEmail() != null)
            curr.setEmail(user.getEmail());
        if (user.getMobile() != null)
            curr.setMobile(user.getMobile());

        if (user.getAddresses() != null) {
            for (Address incomingAddr : user.getAddresses()) {
                if (incomingAddr.getId() != null) {
                     
                    Address existing = addressRepository.findById(incomingAddr.getId())
                            .orElseThrow(
                                    () -> new RuntimeException("Address not found with id " + incomingAddr.getId()));

                    existing.setName(incomingAddr.getName());
                    existing.setLocality(incomingAddr.getLocality());
                    existing.setAddress(incomingAddr.getAddress());
                    existing.setCity(incomingAddr.getCity());
                    existing.setState(incomingAddr.getState());
                    existing.setPinCode(incomingAddr.getPinCode());
                    existing.setMobile(incomingAddr.getMobile());

                    // Ensure relationship
                    existing.setUser(curr);

                } else {
                    // New address -> add it
                    incomingAddr.setUser(curr);
                    curr.getAddresses().add(incomingAddr);
                }
            }
        }

        // Save user along with addresses
        userRepository.save(curr);

        // Debug
        curr.getAddresses().forEach(addr -> System.out.println("Saved Address -> id: " + addr.getId() + ", "
                + addr.getName() + ", " + addr.getCity() + ", " + addr.getMobile()));
    }

    public void changePassword(String jwt, String oldPassword, String newPassword) throws Exception {
        User user = findUserbyJwt(jwt);
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new Exception("Old password is incorrect");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

}
