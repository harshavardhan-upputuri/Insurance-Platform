package com.insurance.Request;


import lombok.Data;

@Data
public class CreateReviewRequest {
    private String reviewText;
    private double reviewRating;
}
