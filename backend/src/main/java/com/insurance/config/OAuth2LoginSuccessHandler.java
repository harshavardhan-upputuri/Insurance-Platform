package com.insurance.config;

import java.io.IOException;
import java.util.Map;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.insurance.domain.USER_ROLE;
import com.insurance.model.User;
import com.insurance.model.Wishlist;
import com.insurance.repository.UserRepository;
import com.insurance.repository.WishlistRepository;

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
            Authentication authentication) throws IOException {

        OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;
        Map<String, Object> attributes = token.getPrincipal().getAttributes();
        String registrationId = token.getAuthorizedClientRegistrationId(); // google / github

        String email = null;
        String name = null;

        // ---- Handle Google ----
        if ("google".equalsIgnoreCase(registrationId)) {
            email = (String) attributes.get("email");
            name = (String) attributes.getOrDefault("name", email);
        }

        // ---- Handle GitHub ----
        // ... inside the onAuthenticationSuccess method

        // ---- Handle GitHub ----
        else if ("github".equalsIgnoreCase(registrationId)) {
            email = (String) attributes.get("email");
            name = (String) attributes.getOrDefault("name", (String) attributes.get("login"));

            // FIX: If email is still null after checking attributes, we cannot proceed.
            // The old logic here was causing an error.
            if (email == null) {
                System.err.println("❌ GitHub login failed: Email is null. User may have a private email.");
                response.sendError(HttpServletResponse.SC_BAD_REQUEST,
                        "Could not get email from GitHub. Please make your email public on GitHub.");
                return; // Stop execution here
            }
        }

        // ---- Final safety fallback ----
        if (email == null) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Email not available from provider");
            return;
        }

        // ---- Find or Create unified user ----
        User user = userRepository.findByEmail(email);
        String message;

        if (user == null) {
            message = "Signup success";
            user = new User();
            user.setEmail(email);
            user.setFullName(name);
            user.setRole(USER_ROLE.ROLE_CUSTOMER);
            userRepository.save(user);

            Wishlist wishlist = new Wishlist();
            wishlist.setUser(user);
            wishlistRepository.save(wishlist);
        } else {
            message = "Login success";
            // Optional: Update name/provider if changed
            if (user.getFullName() == null || !user.getFullName().equals(name)) {
                user.setFullName(name);
                userRepository.save(user);
            }
        }

        // ---- Generate JWT ----
        Authentication appAuth = new UsernamePasswordAuthenticationToken(email, null, authentication.getAuthorities());
        String jwt = jwtProvider.generateJwtToken(appAuth);

        // ---- Redirect ----
        String frontendUrl = "https://insuranceplatform.vercel.app/oauth2/redirect?jwt=" + jwt + "&role=" + user.getRole();
        response.sendRedirect(frontendUrl);

        System.out.println("✅ Unified OAuth login success for: " + registrationId + " -> " + email);
    }
}
