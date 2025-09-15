package com.insurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.insurance.model.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address,Long>{
    
}
