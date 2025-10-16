package com.insurance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.insurance.model.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction,Long>{
    List<Transaction> findBySellerId(Long sellerId);

    List<Transaction> findByCustomerId(Long userId);
}
