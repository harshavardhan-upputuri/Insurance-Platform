package com.insurance.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.insurance.Request.CreateReviewRequest;
import com.insurance.Response.ApiResponse;
import com.insurance.model.Product;
import com.insurance.model.Review;
import com.insurance.model.User;
import com.insurance.service.ProductService;
import com.insurance.service.ReviewService;
import com.insurance.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ReviewController {
    
    private final ProductService productService;
    private final UserService userService;
    private final ReviewService reviewService;

    @GetMapping("/products/{productId}/reviews")
    public ResponseEntity<List<Review>> getReviewsByProductId(@PathVariable Long productId){
        List<Review> reviews=reviewService.getReviewByProductId(productId);
        return ResponseEntity.ok(reviews);
    }

    @PostMapping("/products/{productId}/reviews")
    public ResponseEntity<Review> writeReview(@PathVariable Long productId,@RequestBody CreateReviewRequest req,@RequestHeader("Authorization") String jwt) throws Exception{
        Product product=productService.findByProductId(productId);
        User user=userService.findUserbyJwt(jwt);
        Review review=reviewService.createReview(req, user, product);
        return ResponseEntity.ok(review);
    }

    @PatchMapping("/reviews/{reviewId}")
    public ResponseEntity<Review> updateReview(@RequestBody CreateReviewRequest req,@PathVariable Long reviewId,@RequestHeader("Authorization") String jwt) throws Exception{
        User user=userService.findUserbyJwt(jwt);

        Review review=reviewService.updateReview(reviewId, req.getReviewText(), req.getReviewRating(), user.getId());
        return ResponseEntity.ok(review);
    }

    @DeleteMapping("/reviews/{reviewId}")
    public ResponseEntity<ApiResponse> deleteReview(@PathVariable Long reviewId,@RequestHeader("Authorization") String jwt) throws Exception{
        User user=userService.findUserbyJwt(jwt);
        reviewService.deleteReview(reviewId, user.getId());
        ApiResponse apiResponse=new ApiResponse();
        apiResponse.setMessage("Deleted Review Successfully");
        return ResponseEntity.ok(apiResponse);
    }
}
