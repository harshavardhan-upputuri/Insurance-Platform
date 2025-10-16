package com.insurance.service;

import org.springframework.stereotype.Service;

import com.insurance.model.Product;
import com.insurance.model.User;
import com.insurance.model.Wishlist;
import com.insurance.repository.WishlistRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WishlistService {
    private final WishlistRepository wishlistRepository;

    public Wishlist addProductToWishlist(User user,Product product){
        Wishlist wishlist=getWishlistByUserId(user);
        if(wishlist.getProducts().contains(product)){
            wishlist.getProducts().remove(product);
        }else{
            wishlist.getProducts().add(product);
        }
        return wishlistRepository.save(wishlist);
    }

    public Wishlist getWishlistByUserId(User user) {
        Wishlist wishlist=wishlistRepository.findByUserId(user.getId());
        if(wishlist==null){
            return createWishlist(user);
        }
        return wishlist;
    }

    public Wishlist createWishlist(User user) {
        Wishlist wishlist=new Wishlist();
        wishlist.setUser(user);
        return wishlistRepository.save(wishlist);
    }
}
