package com.insurance.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.insurance.model.InsuranceOrder;

@Repository
public interface InsuranceOrderRepository extends JpaRepository<InsuranceOrder,Long> {
    List<InsuranceOrder> findByUserId(Long userId);
    List<InsuranceOrder> findBySellerId(Long sellerId);
     Optional<InsuranceOrder> findByApplicationFormId(Long applicationFormId);
}
