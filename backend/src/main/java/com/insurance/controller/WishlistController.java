package com.insurance.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.insurance.model.Product;
import com.insurance.model.User;
import com.insurance.model.Wishlist;
import com.insurance.service.ProductService;
import com.insurance.service.UserService;
import com.insurance.service.WishlistService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/wishlist")
public class WishlistController {
    private final ProductService productService;
    private final UserService userService;
    private final WishlistService wishlistService;

    @GetMapping
    public ResponseEntity<Wishlist> getWishlistByUserId(@RequestHeader("Authorization") String jwt) throws Exception{
        User user=userService.findUserbyJwt(jwt);
        Wishlist wishlist=wishlistService.getWishlistByUserId(user);
        return ResponseEntity.ok(wishlist);
    }

    @PostMapping("/add-product/{productId}")
    public ResponseEntity<Wishlist> addProductToWishlist(@RequestHeader("Authorization") String jwt,@PathVariable Long productId) throws Exception{
        User user=userService.findUserbyJwt(jwt);
        Product product=productService.findByProductId(productId);
        Wishlist wishlist=wishlistService.addProductToWishlist(user, product);
        return ResponseEntity.ok(wishlist);
    }
}
