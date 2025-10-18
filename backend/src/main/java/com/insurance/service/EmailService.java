package com.insurance.service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class EmailService {
    @Value("${BREVO_API_KEY}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public void sendVerificationOtpEmail(String userEmail, String otp, String subject, String text) {
        

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("api-key", apiKey);

        Map<String, Object> body = Map.of(
                "sender", Map.of("name", "Insurance Platform", "email", "harshaupputuri123@gmail.com"),
                "to", new Map[]{Map.of("email", userEmail)},
                "subject", subject,
                "htmlContent", text + "<br><b>OTP:</b> " + otp
        );

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(
                    "https://api.brevo.com/v3/smtp/email",
                    entity,
                    String.class
            );
            System.out.println("Email sent: " + response.getStatusCode());
        } catch (Exception e) {
            throw new RuntimeException("Failed to send email: " + e.getMessage(), e);
        }
    }
}


  // MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            // MimeMessageHelper mimeMessageHelper=new MimeMessageHelper(mimeMessage,"utf-8");
            // mimeMessageHelper.setSubject(subject);
            // mimeMessageHelper.setText(text);
            // mimeMessageHelper.setTo(userEmail);
            // javaMailSender.send(mimeMessage);