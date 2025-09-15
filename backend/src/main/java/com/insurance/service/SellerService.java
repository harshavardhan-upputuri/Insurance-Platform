package com.insurance.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.insurance.Request.VerifySellerRequest;
import com.insurance.config.JwtProvider;
import com.insurance.domain.AccountStatus;
import com.insurance.domain.USER_ROLE;
import com.insurance.model.Address;
import com.insurance.model.BankDetails;
import com.insurance.model.BusinessDetails;
import com.insurance.model.Seller;
import com.insurance.model.VerificationCode;
import com.insurance.repository.AddressRepository;
import com.insurance.repository.SellerRepository;
import com.insurance.repository.VerificationCodeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SellerService {

    private final SellerRepository sellerRepository;
    private final VerificationCodeRepository verificationCodeRepository;
    private final AddressRepository addressRepository;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;

    public Seller getSellerByEmail(String email) throws Exception {
        Seller seller = sellerRepository.findByEmail(email);
        if (seller == null) {
            throw new Exception("Seller not found with email - " + email);
        }
        return seller;
    }

    public Seller getSellerById(Long id) throws Exception {
        return sellerRepository.findById(id).orElseThrow(() -> new Exception("Seller not found "));
    }

    public Seller getSellerProfile(String jwt) throws Exception {
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        return getSellerByEmail(email);
    }

    public Seller creatSeller(Seller seller) throws Exception {
        Seller sellerExist = sellerRepository.findByEmail(seller.getEmail());
        if (sellerExist != null) {
            throw new Exception("Email Already Exists");
        }
        Address savedAddress = addressRepository.save(seller.getPickupAddress());
        Seller newSeller = new Seller();
        newSeller.setEmail(seller.getEmail());
        newSeller.setPassword(passwordEncoder.encode(seller.getPassword()));
        newSeller.setSellerName(seller.getSellerName());
        newSeller.setPickupAddress(savedAddress);
        newSeller.setGstin(seller.getGstin());
        newSeller.setRole(USER_ROLE.ROLE_SELLER);
        newSeller.setMobile(seller.getMobile());
        newSeller.setBankDetails(seller.getBankDetails());
        newSeller.setBusinessDetails(seller.getBusinessDetails());

        return sellerRepository.save(newSeller);
    }

    public List<Seller> getAllSellers(AccountStatus accountStatus) {
        return sellerRepository.findByAccountStatus(accountStatus);
    }

    public void deleteSeller(Long id) throws Exception {
        Seller seller = getSellerById(id);
        sellerRepository.delete(seller);
    }

    public Seller verifySeller(VerifySellerRequest req) throws Exception {

        VerificationCode verificationCode = verificationCodeRepository.findByEmail(req.getEmail());
        if (verificationCode == null || !verificationCode.getOtp().equals(req.getOtp())) {
            throw new Exception("Wrong otp");
        }
        Seller seller = getSellerByEmail(req.getEmail());
        seller.setEmailVerified(true);
        return sellerRepository.save(seller);
    }

    public Seller updateSeller(Long id, Seller seller) throws Exception {
        Seller existingSeller = this.getSellerById(id);

        // Top-level fields
        if (seller.getSellerName() != null) {
            existingSeller.setSellerName(seller.getSellerName());
        }

        if (seller.getMobile() != null) {
            existingSeller.setMobile(seller.getMobile());
        }

        if (seller.getEmail() != null) {
            existingSeller.setEmail(seller.getEmail());
        }

        if (seller.getGstin() != null) {
            existingSeller.setGstin(seller.getGstin());
        }

        // ---------------- Business Details ----------------
        if (seller.getBusinessDetails() != null) {
            if (existingSeller.getBusinessDetails() == null) {
                existingSeller.setBusinessDetails(new BusinessDetails());
            }
            BusinessDetails reqBiz = seller.getBusinessDetails();
            BusinessDetails exBiz = existingSeller.getBusinessDetails();

            if (reqBiz.getBusinessName() != null)
                exBiz.setBusinessName(reqBiz.getBusinessName());
            if (reqBiz.getBusinessEmail() != null)
                exBiz.setBusinessEmail(reqBiz.getBusinessEmail());
            if (reqBiz.getBusinessMobile() != null)
                exBiz.setBusinessMobile(reqBiz.getBusinessMobile());
            if (reqBiz.getBusinessAddress() != null)
                exBiz.setBusinessAddress(reqBiz.getBusinessAddress());
            if (reqBiz.getLogo() != null)
                exBiz.setLogo(reqBiz.getLogo());

        }

        // ---------------- Bank Details ----------------
        if (seller.getBankDetails() != null) {
            if (existingSeller.getBankDetails() == null) {
                existingSeller.setBankDetails(new BankDetails());
            }
            BankDetails reqBank = seller.getBankDetails();
            BankDetails exBank = existingSeller.getBankDetails();

            if (reqBank.getAccountNumber() != null)
                exBank.setAccountNumber(reqBank.getAccountNumber());
            if (reqBank.getAccountHolderName() != null)
                exBank.setAccountHolderName(reqBank.getAccountHolderName());
            if (reqBank.getIfscCode() != null)
                exBank.setIfscCode(reqBank.getIfscCode());
        }

        // ---------------- Pickup Address ----------------
        if (seller.getPickupAddress() != null) {
            if (existingSeller.getPickupAddress() == null) {
                existingSeller.setPickupAddress(new Address());
            }
            Address reqAddr = seller.getPickupAddress();
            Address exAddr = existingSeller.getPickupAddress();

            if (reqAddr.getName() != null)
                exAddr.setName(reqAddr.getName());
            if (reqAddr.getLocality() != null)
                exAddr.setLocality(reqAddr.getLocality());
            if (reqAddr.getAddress() != null)
                exAddr.setAddress(reqAddr.getAddress());
            if (reqAddr.getCity() != null)
                exAddr.setCity(reqAddr.getCity());
            if (reqAddr.getState() != null)
                exAddr.setState(reqAddr.getState());
            if (reqAddr.getPinCode() != null)
                exAddr.setPinCode(reqAddr.getPinCode());
            if (reqAddr.getMobile() != null)
                exAddr.setMobile(reqAddr.getMobile());
        }

        return sellerRepository.save(existingSeller);
    }

    public Seller updateSellerAccountStatus(Long id, AccountStatus accountStatus) throws Exception {
        Seller seller = getSellerById(id);
        seller.setAccountStatus(accountStatus);
        return sellerRepository.save(seller);
    }

}
