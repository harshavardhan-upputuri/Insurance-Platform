package com.insurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.insurance.model.PaymentOrder;
@Repository
public interface PaymentOrderRepository extends JpaRepository<PaymentOrder ,Long>{
    PaymentOrder findByPaymentId(String paymentId);

    PaymentOrder findByPaymentLinkId(String paymentLinkId);
}
