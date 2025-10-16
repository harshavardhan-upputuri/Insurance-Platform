package com.insurance.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.insurance.Response.PaymentLinkResponse;
import com.insurance.domain.PaymentMethod;
import com.insurance.model.ApplicationForm;
import com.insurance.model.InsuranceOrder;
import com.insurance.model.PaymentOrder;
import com.insurance.model.Seller;
import com.insurance.model.SellerReport;
import com.insurance.model.User;
import com.insurance.repository.ApplicationFormRepository;
import com.insurance.repository.PaymentOrderRepository;
import com.insurance.service.InsuranceOrderService;
import com.insurance.service.PaymentOrderService;
import com.insurance.service.SellerReportService;
import com.insurance.service.SellerService;
import com.insurance.service.UserService;
import com.razorpay.PaymentLink;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class InsuranceOrderController {

    private final InsuranceOrderService insuranceOrderService;
    private final ApplicationFormRepository applicationFormRepository;
    private final UserService userService;
    private final SellerService sellerService;
    private final SellerReportService sellerReportService;
    private final PaymentOrderService paymentOrderService;
    private final PaymentOrderRepository paymentOrderRepository;

    @PostMapping("/create/{applicationFormId}")
    public ResponseEntity<PaymentLinkResponse> createOrder(@PathVariable Long applicationFormId,
            @RequestParam("paymentMethod") PaymentMethod paymentMethod, @RequestHeader("Authorization") String jwt)
            throws Exception {
        ApplicationForm form = applicationFormRepository.findById(applicationFormId)
                .orElseThrow(() -> new RuntimeException("ApplicationForm not found"));
        User user = userService.findUserbyJwt(jwt);
        InsuranceOrder insuranceOrder = insuranceOrderService.createOrder(user, form);

        PaymentOrder paymentOrder = paymentOrderService.createOrder(user, insuranceOrder);
        PaymentLinkResponse res = new PaymentLinkResponse();

        if (paymentMethod.equals(PaymentMethod.RAZORPAY)) {
            PaymentLink payment = paymentOrderService.createRazorPayPaymentLink(user, paymentOrder.getAmount(),
                    paymentOrder.getId());
            String paymentUrl = payment.get("short_url");
            String paymentUrlId = payment.get("id");

            res.setPayment_link_id(paymentUrlId);
            res.setPayment_link_url(paymentUrl);
            paymentOrder.setPaymentLinkId(paymentUrlId);
            paymentOrderRepository.save(paymentOrder);
        } else {
            String paymentUrl = paymentOrderService.createStripePaymentLink(user, paymentOrder.getAmount(),
                    paymentOrder.getId());
            res.setPayment_link_url(paymentUrl);
        }

        return ResponseEntity.ok(res);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InsuranceOrder> findOrderById(@PathVariable Long id,
            @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserbyJwt(jwt);
        InsuranceOrder order = insuranceOrderService.findOrderById(id);
        if (!order.getUser().getId().equals(user.getId())) {
            throw new Exception("You cannot access this order");
        }

        return ResponseEntity.ok(order);
    }

    @GetMapping("/user")
    public ResponseEntity<List<InsuranceOrder>> userOrderHistory(@RequestHeader("Authorization") String jwt)
            throws Exception {
        User user = userService.findUserbyJwt(jwt);
        List<InsuranceOrder> orders = insuranceOrderService.userOrderHistory(user.getId());
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PutMapping("/cancel/{orderId}")
    public ResponseEntity<InsuranceOrder> cancelOrder(@PathVariable Long orderId,
            @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserbyJwt(jwt);
        InsuranceOrder order = insuranceOrderService.cancelOrder(orderId, user);

        Seller seller = order.getSeller();
        SellerReport report = sellerReportService.getSellerReport(seller);
        report.setCanceledOrders(report.getCanceledOrders() + 1);
        report.setTotalRefunds((long) (report.getTotalRefunds() + order.getPremiumAmount()));
        sellerReportService.updateSellerReport(report);
        return new ResponseEntity<>(order, HttpStatus.ACCEPTED);
    }

    @GetMapping("/seller")
    public ResponseEntity<List<InsuranceOrder>> sellersOrders(@RequestHeader("Authorization") String jwt)
            throws Exception {
        Seller seller = sellerService.getSellerProfile(jwt);
        List<InsuranceOrder> orders = insuranceOrderService.sellersOrders(seller.getId());
        return new ResponseEntity<>(orders, HttpStatus.ACCEPTED);
    }

    @GetMapping("/by-form/{formId}")
    public ResponseEntity<InsuranceOrder> getOrderByFormId(
            @PathVariable Long formId,
            @RequestHeader("Authorization") String jwt) throws Exception {

        // Optional: validate user if needed
        User user = userService.findUserbyJwt(jwt);

        InsuranceOrder order = insuranceOrderService.findOrderByApplicationFormId(formId);

        if (order == null) {
            return ResponseEntity.status(404).body(null);
        }

        // Optional: ensure user owns this order
        if (!order.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).body(null);
        }

        return ResponseEntity.ok(order);
    }
}
