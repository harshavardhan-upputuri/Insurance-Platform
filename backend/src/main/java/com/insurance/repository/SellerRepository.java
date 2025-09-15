package com.insurance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.insurance.domain.AccountStatus;
import com.insurance.model.Seller;

@Repository
public interface SellerRepository extends JpaRepository<Seller,Long>{
    
    Seller findByEmail(String email);
    List<Seller> findByAccountStatus(AccountStatus status);
}
