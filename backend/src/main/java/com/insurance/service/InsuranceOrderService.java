package com.insurance.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.insurance.domain.PaymentStatus;
import com.insurance.model.ApplicationForm;
import com.insurance.model.InsuranceOrder;
import com.insurance.model.User;
import com.insurance.repository.ApplicationFormRepository;
import com.insurance.repository.InsuranceOrderRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InsuranceOrderService {

    private final ApplicationFormRepository applicationFormRepository;
    private final InsuranceOrderRepository insuranceOrderRepository;

    public InsuranceOrder createOrder(User user, ApplicationForm applicationForm) {
        InsuranceOrder order = new InsuranceOrder();
        order.setOrderId("ORD-" + System.currentTimeMillis());
        order.setUser(user);
        order.setSeller(applicationForm.getSeller());
        order.setApplicationForm(applicationForm);
        order.setPolicy(applicationForm.getPolicy());
        order.setPremiumAmount(applicationForm.getPolicy().getPremium());
        order.getPaymentDetails().setStatus(PaymentStatus.PENDING);
        order.setPaymentStatus(PaymentStatus.PENDING);
        order.setOrderDate(LocalDateTime.now());
        order.setApproved(true);

        return insuranceOrderRepository.save(order);
    }

    public InsuranceOrder findOrderById(Long id) throws Exception {
        return insuranceOrderRepository.findById(id).orElseThrow(() -> new Exception("There is no order with this id"));
    }

    public List<InsuranceOrder> sellersOrders(Long sellerId) {
        return insuranceOrderRepository.findBySellerId(sellerId);
    }

    public List<InsuranceOrder> userOrderHistory(Long userId) {
        return insuranceOrderRepository.findByUserId(userId);
    }

    public InsuranceOrder cancelOrder(Long orderId, User user) throws Exception {
        InsuranceOrder order = findOrderById(orderId);
        if (!order.getUser().getId().equals(user.getId())) {
            throw new Exception("you don't have access to this order");
        }
        order.getPaymentDetails().setStatus(PaymentStatus.CANCELLED);
        insuranceOrderRepository.save(order);

        return order;
    }

    public InsuranceOrder findOrderByApplicationFormId(Long applicationFormId) throws Exception {
        return insuranceOrderRepository
                .findByApplicationFormId(applicationFormId)
                .orElse(null); 
    }


    public List<InsuranceOrder> findAllOrders(){
        return insuranceOrderRepository.findAll();
    }

}
