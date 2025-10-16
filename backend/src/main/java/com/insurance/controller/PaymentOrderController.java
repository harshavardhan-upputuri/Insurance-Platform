package com.insurance.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.insurance.Response.ApiResponse;
import com.insurance.model.InsuranceOrder;
import com.insurance.model.PaymentOrder;
import com.insurance.model.Seller;
import com.insurance.model.SellerReport;
import com.insurance.model.User;
import com.insurance.service.PaymentOrderService;
import com.insurance.service.SellerReportService;
import com.insurance.service.SellerService;
import com.insurance.service.TransactionService;
import com.insurance.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/payment")
public class PaymentOrderController {
    private final PaymentOrderService paymentOrderService;
    private final UserService userService;
    private final SellerService sellerService;
    private final SellerReportService sellerReportService;
    private final TransactionService transactionService;

    @GetMapping("/{paymentId}")
    public ResponseEntity<ApiResponse> paymentSuccessHandler(@PathVariable String paymentId,
            @RequestParam String paymentLinkId, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserbyJwt(jwt);

        PaymentOrder paymentOrder = paymentOrderService.getPaymentOrderByPaymentLinkId(paymentLinkId);

        if (!paymentOrder.getUser().getId().equals(user.getId())) {
            throw new Exception("You cannot access this payment");
        }

        boolean paymentSuccess = paymentOrderService.ProceedPaymentOrder(paymentOrder, paymentId, paymentLinkId);

        if (paymentSuccess) {
            InsuranceOrder order = paymentOrder.getInsuranceOrder();
            transactionService.createTransaction(order);
            Seller seller = order.getSeller();
            SellerReport report = sellerReportService.getSellerReport(seller);
            report.setTotalOrders(report.getTotalOrders() + 1);
            report.setTotalEarnings((long) (report.getTotalEarnings() + order.getPremiumAmount()));
            report.setTotalSales(report.getTotalSales() + 1);
            sellerReportService.updateSellerReport(report);
        }
        ApiResponse res = new ApiResponse();
        res.setMessage("Payment successful");

        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
