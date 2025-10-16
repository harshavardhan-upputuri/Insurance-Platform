package com.insurance.model;

import com.insurance.domain.PaymentMethod;
import com.insurance.domain.PaymentOrderStatus;
 

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class PaymentOrder {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Double amount;

    private PaymentOrderStatus status=PaymentOrderStatus.PENDING;
    

    private PaymentMethod paymentMethod;

    private String paymentLinkId;

    private String paymentId;

    @ManyToOne
    private User user;

    @OneToOne
    private InsuranceOrder insuranceOrder;

}
