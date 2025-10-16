package com.insurance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.insurance.model.ApplicationForm;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationFormRepository extends JpaRepository<ApplicationForm,Long>{
    
    List<ApplicationForm> findByUserId(Long userId);
    List<ApplicationForm> findBySellerId(Long sellerId);
}
