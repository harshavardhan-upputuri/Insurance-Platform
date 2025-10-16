package com.insurance.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.insurance.Request.CreateReviewRequest;
import com.insurance.model.Product;
import com.insurance.model.Review;
import com.insurance.model.User;
import com.insurance.repository.ReviewRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewService {
    
    private final ReviewRepository reviewRepository;

    public Review createReview(CreateReviewRequest req,User user,Product product){
        Review review=new Review();
        review.setUser(user);
        review.setProduct(product);
        review.setRating(req.getReviewRating());
        review.setReviewText(req.getReviewText());
        product.getReview().add(review);
        return reviewRepository.save(review);
    }

    public void deleteReview(Long reviewId,Long userId) throws Exception{
        Review review=getReviewById(reviewId);
        if(!review.getUser().getId().equals(userId)){
            throw new Exception("U can't delete this Item");
        }
        reviewRepository.delete(review);
    }

    public List<Review> getReviewByProductId(Long productId){
        return reviewRepository.findByProductId(productId);
    }
    public Review updateReview(Long reviewId,String reviewText,double rating,Long userId) throws Exception{
        Review review=getReviewById(reviewId);

        if(review.getUser().getId().equals(userId)){
            review.setReviewText(reviewText);
            review.setRating(rating);
            return reviewRepository.save(review);
        }
        throw new Exception("U can't update the review");
    }
    public Review getReviewById(Long reviewId) throws Exception{
        return reviewRepository.findById(reviewId).orElseThrow(()->new Exception("review not found"));
    }
}
