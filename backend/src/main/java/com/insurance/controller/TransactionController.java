package com.insurance.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.insurance.model.Seller;
import com.insurance.model.Transaction;
import com.insurance.model.User;
import com.insurance.service.SellerService;
import com.insurance.service.TransactionService;
import com.insurance.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;
    private final SellerService sellerService;
    private final UserService userService;

    @GetMapping("/seller")
    public ResponseEntity<List<Transaction>> getTransactionBySeller(@RequestHeader("Authorization") String jwt)
            throws Exception {
        Seller seller = sellerService.getSellerProfile(jwt);
        List<Transaction> transactions = transactionService.getTransactionsBySellerId(seller);
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        return new ResponseEntity<>(transactionService.getAllTransactions(), HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Transaction>> getUserTransactions(@RequestHeader("Authorization") String jwt)
            throws Exception {
        User user = userService.findUserbyJwt(jwt); // fetch user from JWT
        List<Transaction> transactions = transactionService.getTransactionsByUserId(user.getId());
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

}
