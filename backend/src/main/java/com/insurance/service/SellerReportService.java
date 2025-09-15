package com.insurance.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.insurance.model.Seller;
import com.insurance.model.SellerReport;
import com.insurance.repository.SellerReportRepository;

@Service
public class SellerReportService {

    @Autowired
    private SellerReportRepository sellerReportRepository;

    public SellerReport getSellerReport(Seller seller){
        SellerReport sr=sellerReportRepository.findBySellerId(seller.getId());

        if(sr==null){
            sr=new SellerReport();
            sr.setSeller(seller);
            sellerReportRepository.save(sr);
        }
        return sr;
    }

    public SellerReport updateSellerReport(SellerReport sellerReport){
        return sellerReportRepository.save(sellerReport);
    }
}
