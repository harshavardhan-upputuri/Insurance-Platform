package com.insurance.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.insurance.model.Seller;
import com.insurance.model.SellerReport;
import com.insurance.model.User;
import com.insurance.repository.SellerReportRepository;
import com.insurance.repository.SellerRepository;
import com.insurance.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final SellerReportRepository sellerReportRepository;
    private final SellerRepository sellerRepository;
    private final UserRepository userRepository;
    

    public SellerReport fetchAllReports(){
        List<SellerReport> reports = sellerReportRepository.findAll();
        SellerReport combined = new SellerReport();

        // Combine all seller reports into one total summary
        for (SellerReport r : reports) {
            combined.setTotalEarnings(combined.getTotalEarnings() + r.getTotalEarnings());
            combined.setTotalSales(combined.getTotalSales() + r.getTotalSales());
            combined.setTotalRefunds(combined.getTotalRefunds() + r.getTotalRefunds());
            combined.setTotalTax(combined.getTotalTax() + r.getTotalTax());
            combined.setNetEarnings(combined.getNetEarnings() + r.getNetEarnings());
            combined.setTotalOrders(combined.getTotalOrders() + r.getTotalOrders());
            combined.setCanceledOrders(combined.getCanceledOrders() + r.getCanceledOrders());
            combined.setTotalTransactions(combined.getTotalTransactions() + r.getTotalTransactions());
        }

        combined.setSeller(null); // not linked to any single seller
        return combined;
    }

    public List<Seller> getAllSellers() {
        return sellerRepository.findAll();
    }

    public List<User> getAllUsers() {
        String excludedEmail = "nikkiharshunikki@gmail.com";
        return userRepository.findByEmailIsNotNullAndEmailNot(excludedEmail);
    }
}
