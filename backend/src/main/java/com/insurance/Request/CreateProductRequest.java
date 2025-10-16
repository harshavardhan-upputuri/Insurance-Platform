package com.insurance.Request;

import lombok.Data;

@Data
public class CreateProductRequest {
    private String categoryName;
    private String image;
    private String name;
    private String head;
    private String subName;
    private String type;
    private double premium;
    private double coverage;
    private String desc1;
    private String desc2;
    private String desc3;
}
