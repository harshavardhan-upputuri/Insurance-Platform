package com.insurance.config;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.insurance.Response.AuthResponse;
import com.insurance.domain.USER_ROLE;
import com.insurance.model.User;
import com.insurance.model.Wishlist;
import com.insurance.repository.UserRepository;
import com.insurance.repository.WishlistRepository;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;
    private final WishlistRepository wishlistRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
        OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;

        String email = token.getPrincipal().getAttribute("email");
        String name = token.getPrincipal().getAttribute("name");

        User user = userRepository.findByEmail(email);
        String message;
        if (user == null) {
            message="Signup success";
            user = new User();
            user.setEmail(email);
            user.setFullName(name);
            user.setRole(USER_ROLE.ROLE_CUSTOMER);
            userRepository.save(user);

            Wishlist wishlist = new Wishlist();
            wishlist.setUser(user);
            wishlistRepository.save(wishlist);
        }else{
            message="Login success";
        }

        String jwt = jwtProvider.generateJwtToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage(message);
        authResponse.setRole(user.getRole());

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        new ObjectMapper().writeValue(response.getWriter(), authResponse);

    }

}
