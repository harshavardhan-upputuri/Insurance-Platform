    package com.insurance.model;

    import java.time.LocalDateTime;

    import com.insurance.domain.PaymentStatus;

    import jakarta.persistence.Embedded;
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
    public class InsuranceOrder {
        
        @Id
        @GeneratedValue(strategy=GenerationType.AUTO)
        private Long id;

        private String orderId;
        
        @ManyToOne
        private User user;
    
        @ManyToOne
        private Seller seller;

        @OneToOne
        private ApplicationForm applicationForm;

        @ManyToOne
        private Product policy;

        private double premiumAmount;

        private boolean approved=false;

        @Embedded
        private PaymentDetails paymentDetails=new PaymentDetails();

        private PaymentStatus paymentStatus= PaymentStatus.PENDING;

        private LocalDateTime orderDate = LocalDateTime.now();
        private LocalDateTime startDate;
        private LocalDateTime endDate;
    }
