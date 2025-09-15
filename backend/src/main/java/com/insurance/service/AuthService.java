package com.insurance.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.insurance.Request.LoginRequest;
import com.insurance.Request.SignupRequest;
import com.insurance.Response.AuthResponse;
import com.insurance.config.JwtProvider;
import com.insurance.domain.USER_ROLE;
import com.insurance.model.Seller;
import com.insurance.model.User;
import com.insurance.model.VerificationCode;
import com.insurance.model.Wishlist;
import com.insurance.repository.SellerRepository;
import com.insurance.repository.UserRepository;
import com.insurance.repository.VerificationCodeRepository;
import com.insurance.repository.WishlistRepository;
import com.insurance.utils.OtpUtil;
import lombok.RequiredArgsConstructor;

//  4 methods 
// create user
// send otp
// signin
// authentication token

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final SellerRepository sellerRepository;
    private final WishlistRepository wishlistRepository;
    private final VerificationCodeRepository verificationCodeRepository;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final CustomerUserService customerUserService;

    /**
     * Creates a new customer user after verifying OTP.
     */

    public String createUser(SignupRequest req) throws Exception{
        VerificationCode verificationCode=verificationCodeRepository.findByEmail(req.getEmail());
        if(verificationCode==null||!verificationCode.getOtp().equals(req.getOtp())){
            throw new Exception("wrong otp");
        }

        User user=userRepository.findByEmail(req.getEmail());
        if(user==null){
            User createdUser=new User();
            createdUser.setEmail(req.getEmail());
            createdUser.setFullName(req.getFullName());
            createdUser.setRole(USER_ROLE.ROLE_CUSTOMER);
            createdUser.setMobile(req.getMobile());
            createdUser.setPassword(passwordEncoder.encode(req.getPassword()));
            user=userRepository.save(createdUser);
            Wishlist wishlist=new Wishlist();
            wishlist.setUser(user);
            wishlistRepository.save(wishlist);
        }

        List<GrantedAuthority> authorities=new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(USER_ROLE.ROLE_CUSTOMER.toString()));

        Authentication authentication=new UsernamePasswordAuthenticationToken(req.getEmail(),null,authorities);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        return jwtProvider.generateJwtToken(authentication);
    }
    
    public void sendLoginOtp(String email, USER_ROLE role) throws Exception {
        String SIGNIN_PREFIX = "signin_";

        if (email.startsWith(SIGNIN_PREFIX)) {
            email = email.substring(SIGNIN_PREFIX.length());

            if (role.equals(USER_ROLE.ROLE_SELLER)) {
                Seller seller = sellerRepository.findByEmail(email);
                if (seller == null) {
                    throw new Exception("Seller not found with this Email");
                }
            } else {
                User user = userRepository.findByEmail(email);
                if (user == null) {
                    throw new Exception("User not found with this Email");
                }
            }
        }

        VerificationCode isExist = verificationCodeRepository.findByEmail(email);
        if (isExist != null) {
            verificationCodeRepository.delete(isExist);
        }

        String otp = OtpUtil.generateOtp();

        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setEmail(email);
        verificationCode.setOtp(otp);
        verificationCode.setExpiryTime(LocalDateTime.now().plusMinutes(5));

        verificationCodeRepository.save(verificationCode);

        String subject = "Your OTP for Login/Signup - Insurance Bazar";

        String text = "Dear User,\n\n"
                + "Thank you for using our Insurance Bazar service.\n\n"
                + "Your One-Time Password (OTP) for login/signup is: " + otp + "\n\n"
                + "⚠️ Please do not share this OTP with anyone.\n"
                + "This code is valid for the next 5 minutes.\n\n"
                + "Best Regards,\n"
                + "Insurance Bazar Team";

                emailService.sendVerificationOtpEmail(email, otp, subject, text);
    }

    public AuthResponse signing(LoginRequest req) throws Exception{
        String email=req.getEmail();
        String otp=req.getOtp();
        String password=req.getPassword();



        Authentication authentication;

        if(otp != null && !otp.isEmpty()){
            authentication=authenticationWithOtp(email,otp);
        }else if(password !=null && !password.isEmpty()){
            authentication=authenticationWithPassword(email,password);
        }else{
            throw new Exception("Either OTP or Password is required");
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt=jwtProvider.generateJwtToken(authentication);

        AuthResponse authResponse=new AuthResponse();

        authResponse.setJwt(jwt);
        authResponse.setMessage("Login Success");
        
        Collection<? extends GrantedAuthority> authorities=authentication.getAuthorities();
        String rolename=authorities.isEmpty()?null:authorities.iterator().next().getAuthority();
        authResponse.setRole(USER_ROLE.valueOf(rolename));
        
        return authResponse;
    }

    private Authentication authenticationWithOtp(String username, String otp) throws Exception {
        UserDetails userDetails = customerUserService.loadUserByUsername(username);

        String Seller_Prefix = "seller_";
        if (username.startsWith(Seller_Prefix)) {
            username = username.substring(Seller_Prefix.length());
        }

        if (userDetails == null) {
            throw new BadCredentialsException("Username not found");
        }

        VerificationCode verificationCode = verificationCodeRepository.findByEmail(username);

        if (verificationCode == null || !verificationCode.getOtp().equals(otp)) {
            throw new Exception("Invalid otp");
        }

        return new UsernamePasswordAuthenticationToken(username, null, userDetails.getAuthorities());
    }

    private Authentication authenticationWithPassword(String username,String password){
        UserDetails userDetails=customerUserService.loadUserByUsername(username);

        String Seller_Prefix = "seller_";
        if (username.startsWith(Seller_Prefix)) {
            username = username.substring(Seller_Prefix.length());
        }

        if(userDetails==null){
            throw new BadCredentialsException("Username not found");
        }
        User user= userRepository.findByEmail(username);

        if(user==null || !passwordEncoder.matches(password,user.getPassword())){
            throw new BadCredentialsException("Invalid email or password");
        }

        return new UsernamePasswordAuthenticationToken(username,null,userDetails.getAuthorities());
    }
}
