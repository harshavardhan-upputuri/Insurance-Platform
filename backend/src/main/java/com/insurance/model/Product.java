package com.insurance.model;

 

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private Category category;   // e.g., "termlife"
    private String image;          // store URL or filename of image
    private String name;           // e.g., "HDFC Life Click 2 Protect"
    private String head;           // e.g., "Term Life Plan"
    private String subName;        // e.g., "HDFC Life Insurance"
    private String type;           // e.g., "Individual"

    private double premium;        // e.g., 4500
    private double coverage;       // e.g., "₹ 1 Crore*"
    
    private String desc1;
    private String desc2;
    private String desc3;
           

    @ManyToOne
    private Seller seller;

    @OneToMany(mappedBy = "product" , cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Review> review=new ArrayList<>();
}
