package com.harivillu.controller;

import com.harivillu.dto.ApiResponse;
import com.harivillu.model.CustomerReview;
import com.harivillu.repository.CustomerReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    private final CustomerReviewRepository reviewRepository;

    @Autowired
    public ReviewController(CustomerReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<CustomerReview>>> getVerifiedReviews() {
        List<CustomerReview> reviews = reviewRepository.findByVerifiedTrueOrderByIdDesc();
        return ResponseEntity.ok(ApiResponse.success("Verified customer reviews retrieved", reviews));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CustomerReview>> submitReview(@RequestBody CustomerReview review) {
        review.setVerified(true);
        CustomerReview saved = reviewRepository.save(review);
        return ResponseEntity.ok(ApiResponse.success("Thank you! Your review has been published.", saved));
    }
}
