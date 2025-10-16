package com.insurance.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.insurance.Request.LoginRequest;
import com.insurance.Request.VerifySellerRequest;
import com.insurance.Response.AuthResponse;
import com.insurance.config.JwtProvider;
import com.insurance.domain.AccountStatus;
import com.insurance.model.Seller;
import com.insurance.model.SellerReport;
import com.insurance.model.VerificationCode;
import com.insurance.repository.VerificationCodeRepository;
import com.insurance.service.AuthService;
import com.insurance.service.EmailService;
import com.insurance.service.SellerReportService;
import com.insurance.service.SellerService;
import com.insurance.utils.OtpUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/seller")
public class SellerController {
    
    private final SellerService sellerService;
    private final VerificationCodeRepository verificationCodeRepository;
    private final AuthService authService;
    private final EmailService emailService;
    private final JwtProvider jwtProvider;
    private final SellerReportService sellerReportService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginSeller(@RequestBody LoginRequest req) throws Exception{
        String email=req.getEmail();
        String otp=req.getOtp();
        req.setEmail("seller_"+email);
        AuthResponse authResponse=authService.signing(req);
        return ResponseEntity.ok(authResponse);
    }


    @PatchMapping("/verify")
    public ResponseEntity<Seller> verifySellerEmail(@RequestBody VerifySellerRequest req) throws Exception{
        Seller seller=sellerService.verifySeller(req);
        return new ResponseEntity<>(seller,HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<Seller> createSeller(@RequestBody Seller seller) throws Exception{
        Seller savedSeller=sellerService.creatSeller(seller);
        
        String otp= OtpUtil.generateOtp();

        VerificationCode verificationCode=new VerificationCode();
        verificationCode.setEmail(seller.getEmail());
        verificationCode.setOtp(otp);

        verificationCodeRepository.save(verificationCode);
        String subject= "Ecommerce Email verification Code";
        String text="Welcome to Ecommerce ,verify you account using this link ";
        String frontend_url="http://localhost:3000/verify-seller/";
        emailService.sendVerificationOtpEmail(seller.getEmail(), verificationCode.getOtp(), subject, text+frontend_url);

        return new ResponseEntity<>(savedSeller,HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Seller> getSellerById(@PathVariable Long id) throws Exception{
        Seller seller=sellerService.getSellerById(id);
        return new ResponseEntity<>(seller,HttpStatus.OK);
    }

    @GetMapping("/profile")
    public ResponseEntity<Seller> getSellerByJwt(@RequestHeader("Authorization") String jwt) throws Exception{
        Seller seller=sellerService.getSellerProfile(jwt);
        return new ResponseEntity<>(seller,HttpStatus.OK);
    }

    @GetMapping("/report")
    public ResponseEntity<SellerReport> getSellerReport(@RequestHeader("Authorization") String jwt) throws Exception{
        Seller seller=sellerService.getSellerProfile(jwt);
        SellerReport sellerReport=sellerReportService.getSellerReport(seller);
        return new ResponseEntity<>(sellerReport,HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Seller>> getAllSellers(@RequestParam(required = false) AccountStatus status){
        List<Seller> sellers=sellerService.getAllSellers(status);
        return new ResponseEntity<>(sellers,HttpStatus.OK);
    }

    @PatchMapping
    public ResponseEntity<Seller> updateSeller(@RequestHeader("Authorization") String jwt,@RequestBody Seller seller) throws Exception{
        Seller profile=sellerService.getSellerProfile(jwt);
        Seller updateSeller=sellerService.updateSeller(profile.getId(), seller);
        return ResponseEntity.ok(updateSeller);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeller(@PathVariable Long id) throws Exception{
        sellerService.deleteSeller(id);
        return ResponseEntity.noContent().build();
    }

}
