package com.insurance.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.insurance.Request.CreateProductRequest;
import com.insurance.domain.AccountStatus;
import com.insurance.model.InsuranceOrder;
import com.insurance.model.Product;
import com.insurance.model.Seller;
import com.insurance.model.SellerReport;
import com.insurance.model.User;
import com.insurance.repository.SellerRepository;
import com.insurance.repository.UserRepository;
import com.insurance.service.AdminService;
import com.insurance.service.InsuranceOrderService;
import com.insurance.service.ProductService;
import com.insurance.service.SellerService;


import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final SellerService sellerService;
    private final ProductService productService;
    private final SellerRepository sellerRepository;
    private final UserRepository userRepository;
    private final InsuranceOrderService orderService;
    private final AdminService adminService;

    
    @PostMapping("/create")
    public ResponseEntity<Product> createProduct(@RequestBody CreateProductRequest req,
            @RequestParam Long sellerId,
            @RequestHeader("userId") Long adminId) throws Exception {

        User admin = userRepository.findById(adminId)
                .orElseThrow(() -> new Exception("User not found"));

        if (!"ADMIN".equalsIgnoreCase(admin.getRole().toString())) {
            throw new Exception("Access denied. Only ADMIN can create products.");
        }

        Seller seller = sellerRepository.findById(sellerId)
                .orElseThrow(() -> new Exception("Seller not found"));

        Product product = productService.createProduct(req, seller);
        return ResponseEntity.ok(product);
    }

   
    @PutMapping("/{productId}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long productId,
            @RequestBody Product updatedProduct,
            @RequestHeader("userId") Long adminId) throws Exception {

        User admin = userRepository.findById(adminId)
                .orElseThrow(() -> new Exception("User not found"));

        if (!"ADMIN".equalsIgnoreCase(admin.getRole().toString())) {
            throw new Exception("Access denied. Only ADMIN can update products.");
        }

        Product product = productService.updateProduct(productId, updatedProduct);
        return ResponseEntity.ok(product);
    }

    
    @DeleteMapping("/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long productId,
            @RequestHeader("userId") Long adminId,@RequestHeader("Authorization") String jwt) throws Exception {

        User admin = userRepository.findById(adminId)
                .orElseThrow(() -> new Exception("User not found"));

        if (!"ADMIN".equalsIgnoreCase(admin.getRole().toString())) {
            throw new Exception("Access denied. Only ADMIN can delete products.");
        }

        productService.deleteProduct(productId);
        return ResponseEntity.ok("Product deleted successfully");
    }

    @GetMapping("/reports/summary")
    public ResponseEntity<SellerReport> fetchAllReports(@RequestHeader("Authorization") String jwt) {
        SellerReport report = adminService.fetchAllReports();
        return ResponseEntity.ok(report);
    }

    
    @GetMapping("/sellers")
    public ResponseEntity<List<Seller>> getAllSellers(@RequestHeader("Authorization") String jwt) {
        List<Seller> sellers = adminService.getAllSellers();
        return ResponseEntity.ok(sellers);
    }

   
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers(@RequestHeader("Authorization") String jwt) {
        List<User> users = adminService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PatchMapping("/seller/{id}/status/{status}")
    public ResponseEntity<Seller> updateSellerStatus(@PathVariable Long id, @PathVariable AccountStatus status,@RequestHeader("Authorization") String jwt)
            throws Exception {
        Seller seller = sellerService.updateSellerAccountStatus(id, status);
        return new ResponseEntity<>(seller, HttpStatus.OK);
    }


    @GetMapping("/orders")
    public ResponseEntity<List<InsuranceOrder>> findAllOrders(@RequestHeader("Authorization") String jwt) {
        List<InsuranceOrder> users = orderService.findAllOrders();
        return ResponseEntity.ok(users);
    }


}
