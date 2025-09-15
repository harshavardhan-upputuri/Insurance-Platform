package com.insurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.insurance.model.SellerReport;

@Repository
public interface SellerReportRepository extends JpaRepository<SellerReport,Long>{
    SellerReport findBySellerId(Long sellerId);
}
