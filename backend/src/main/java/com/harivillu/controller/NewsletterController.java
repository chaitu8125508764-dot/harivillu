package com.harivillu.controller;

import com.harivillu.dto.ApiResponse;
import com.harivillu.model.NewsletterSubscriber;
import com.harivillu.repository.NewsletterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/newsletter")
public class NewsletterController {

    private final NewsletterRepository newsletterRepository;

    @Autowired
    public NewsletterController(NewsletterRepository newsletterRepository) {
        this.newsletterRepository = newsletterRepository;
    }

    @PostMapping("/subscribe")
    public ResponseEntity<ApiResponse<Map<String, String>>> subscribe(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        if (email == null || email.trim().isEmpty() || !email.contains("@")) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Please provide a valid email address"));
        }

        if (newsletterRepository.findByEmailIgnoreCase(email.trim()).isEmpty()) {
            newsletterRepository.save(new NewsletterSubscriber(email.trim()));
        }

        return ResponseEntity.ok(ApiResponse.success(
            "Welcome to Harivillu Royalty Club! Use secret code 'HARIVILLU20' for 20% off your order.",
            Map.of("email", email.trim(), "coupon", "HARIVILLU20")
        ));
    }
}
