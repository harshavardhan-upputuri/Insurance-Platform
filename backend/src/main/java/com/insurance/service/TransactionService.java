package com.insurance.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.insurance.model.InsuranceOrder;
import com.insurance.model.Seller;
import com.insurance.model.Transaction;
import com.insurance.repository.SellerReportRepository;
import com.insurance.repository.TransactionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final SellerReportRepository sellerReportRepository;

    public Transaction createTransaction(InsuranceOrder order){
        Seller seller=order.getSeller();

        Transaction transaction=new Transaction();
        transaction.setCustomer(order.getUser());
        transaction.setSeller(seller);
        transaction.setInsuranceOrder(order);

        return transactionRepository.save(transaction);
    }

    public List<Transaction> getAllTransactions(){
        return transactionRepository.findAll();
    }

    public List<Transaction> getTransactionsBySellerId(Seller seller){
        return transactionRepository.findBySellerId(seller.getId());
    }

    public List<Transaction> getTransactionsByUserId(Long userId) {
    return transactionRepository.findByCustomerId(userId);
}

}
