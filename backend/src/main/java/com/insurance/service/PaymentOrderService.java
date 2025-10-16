package com.insurance.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.insurance.domain.PaymentOrderStatus;
import com.insurance.domain.PaymentStatus;
import com.insurance.model.InsuranceOrder;
import com.insurance.model.PaymentOrder;
import com.insurance.model.User;
import com.insurance.repository.InsuranceOrderRepository;
import com.insurance.repository.PaymentOrderRepository;

import org.json.JSONObject;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentOrderService {

    private final PaymentOrderRepository paymentOrderRepository;
    private final InsuranceOrderRepository insuranceOrderRepository;

    @Value("${razorpay.api.key}")
    private String RazorpayKey;

    @Value("${razorpay.api.secret}")
    private String RazorpaySecret;

    @Value("${stripe.api.secret}")
    private String StripeSecret;

    public Boolean ProceedPaymentOrder(PaymentOrder paymentOrder, String paymentId, String paymentLinkId)
            throws RazorpayException {

        if (paymentOrder.getStatus().equals(PaymentOrderStatus.PENDING)) {
            RazorpayClient razorpay = new RazorpayClient(RazorpayKey, RazorpaySecret);

            Payment payment = razorpay.payments.fetch(paymentId);

            String status = payment.get("status");

            if ("captured".equals(status)) {
                InsuranceOrder order = paymentOrder.getInsuranceOrder();
                order.setPaymentStatus(PaymentStatus.COMPLETED);
                order.setStartDate(LocalDateTime.now());
                order.setEndDate(LocalDateTime.now().plusYears(1));

                order.getPaymentDetails().setRazorpayPaymentId(paymentId);
                order.getPaymentDetails().setRazorpayPaymentLinkId(paymentLinkId);
                order.getPaymentDetails().setStatus(PaymentStatus.COMPLETED);

                insuranceOrderRepository.save(order);
                paymentOrder.setPaymentId(payment.get("id"));
                paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
                paymentOrderRepository.save(paymentOrder);
                return true;
            }
            paymentOrder.setStatus(PaymentOrderStatus.FAILED);
            paymentOrderRepository.save(paymentOrder);
            return false;
        }
        return false;
    }

    public PaymentOrder createOrder(User user, InsuranceOrder order) {
        Double amount = order.getPremiumAmount();
        if (amount <= 0) {
            throw new IllegalArgumentException(
                    "Order total amount must be greater than 0. Please check product prices and discounts.");
        }
        PaymentOrder paymentOrder = new PaymentOrder();
        paymentOrder.setAmount(amount);
        paymentOrder.setUser(user);
        paymentOrder.setInsuranceOrder(order);
        return paymentOrderRepository.save(paymentOrder);
    }

    public PaymentLink createRazorPayPaymentLink(User user, Double amount, Long orderId) throws RazorpayException {
        if (amount == null || amount <= 0) {
            throw new IllegalArgumentException("To create RazorPay payment link amount must be greater than 0");
        }

        try {
            RazorpayClient razorpay = new RazorpayClient(RazorpayKey, RazorpaySecret);

            JSONObject paymentLinkRequest = new JSONObject();
            paymentLinkRequest.put("amount", Math.round(amount * 100));
            paymentLinkRequest.put("currency", "INR");

            JSONObject customer = new JSONObject();
            customer.put("name", user.getFullName());
            customer.put("email", user.getEmail());
            paymentLinkRequest.put("customer", customer);

            JSONObject notify = new JSONObject();
            notify.put("email", true);
            paymentLinkRequest.put("notify", notify);

            paymentLinkRequest.put("callback_url", "https://insuranceplatform.vercel.app/payment-success/" + orderId);
            paymentLinkRequest.put("callback_method", "get");

            PaymentLink paymentLink = razorpay.paymentLink.create(paymentLinkRequest);
            return paymentLink;

        } catch (Exception e) {

            System.out.println("Razorpay create link error: " + e.getMessage());
            throw new RazorpayException(e.getMessage());
        }
    }

    public String createStripePaymentLink(User user, Double amount, Long orderId) throws StripeException {
        if (amount == null || amount <= 0) {
            throw new IllegalArgumentException("To create Stripe payment link amount must be greater than 0");
        }
        Stripe.apiKey = StripeSecret;
        long amountInCents = Math.round(amount * 100);
        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("https://insuranceplatform.vercel.app/payment-success/" + orderId)
                .setCancelUrl("https://insuranceplatform.vercel.app/payment-cancel/")
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("usd")
                                .setUnitAmount(amountInCents)
                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                        .setName("Insurance Platform")
                                        .build())
                                .build())
                        .build())
                .build();

        Session session = Session.create(params);
        return session.getUrl();
    }

    public PaymentOrder getPaymentOrderById(Long orderId) throws Exception {
        return paymentOrderRepository.findById(orderId).orElseThrow(() -> new Exception("Payment order not found"));
    }

    public PaymentOrder getPaymentOrderByPaymentId(String orderId) throws Exception {
        PaymentOrder paymentOrder = paymentOrderRepository.findByPaymentId(orderId);
        if (paymentOrder == null) {
            throw new Exception("Payment Order not found with provided payment link id");
        }
        return paymentOrder;
    }

    public PaymentOrder getPaymentOrderByPaymentLinkId(String paymentLinkId) throws Exception {
        PaymentOrder paymentOrder = paymentOrderRepository.findByPaymentLinkId(paymentLinkId);
        if (paymentOrder == null) {
            throw new Exception("Payment Order not found with provided payment link id");
        }
        return paymentOrder;
    }

}
