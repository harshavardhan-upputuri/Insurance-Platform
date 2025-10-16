package com.insurance.controller;

import java.util.List;

 
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;

import com.insurance.model.Product;
import com.insurance.service.ProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {
    
    private final ProductService productService;

    @GetMapping("/{productId}")
    public ResponseEntity<Product> findByProductId(@PathVariable Long productId) throws Exception{
        Product product=productService.findByProductId(productId);
        return new ResponseEntity<>(product,HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam(required = false) String query){
        List<Product> products=productService.searchProducts(query);
        return new ResponseEntity<>(products,HttpStatus.OK);
    }
    
    @GetMapping
    public ResponseEntity<Page<Product>> searchAllProducts(
        @RequestParam(required = false) String category,
        @RequestParam(required = false) String type,
        @RequestParam(required = false) Double minPremium,
        @RequestParam(required = false) Double maxPremium,
        @RequestParam(required = false) String sort,
        @RequestParam(required = false) Integer pageNumber
    ){
        return new ResponseEntity<>(productService.searchAllProducts(category, type, minPremium, maxPremium, sort, pageNumber),HttpStatus.OK);
    }
}
