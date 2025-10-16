package com.insurance.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.insurance.domain.AccountStatus;
import com.insurance.domain.USER_ROLE;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Seller {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sellerName;

    @Column(unique = true,nullable = false)
    private String email;

    private String password;

    private String mobile;

    private USER_ROLE role=USER_ROLE.ROLE_SELLER;

    @JsonProperty("GSTIN") 
    private String gstin;

    private boolean isEmailVerified=false;

    private AccountStatus accountStatus=AccountStatus.PENDING_VERIFICATION;

    @Embedded
    private BusinessDetails businessDetails=new BusinessDetails();

    @Embedded
    private BankDetails bankDetails=new BankDetails();

    @OneToOne(cascade = CascadeType.ALL)
    private Address pickupAddress=new Address();
}
