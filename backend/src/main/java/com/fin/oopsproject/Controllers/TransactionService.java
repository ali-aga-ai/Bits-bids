package com.fin.oopsproject.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fin.oopsproject.Model.*;

import java.math.BigDecimal;
import java.util.*;
@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private ProductRepository productRepository;

    public boolean transferMoney(ProductModel product) {
        BidModel topBid = product.getCurrentBid();
        if (topBid == null) {
            // Log error or perform additional error handling
            return false; // Indicate failure
        }
    
        UserModel buyer = topBid.getUser();
        UserModel seller = product.getUser();
        BigDecimal amount = BigDecimal.valueOf(topBid.getBid());
    
        TransactionModel transaction = new TransactionModel(product, buyer, seller, amount, "completed");
        transactionRepository.save(transaction);
    
        // Additional money transfer logic here
    
        return true; // Indicate success
    }
    

    public Iterable<TransactionModel> getAllTrans() {
        return transactionRepository.findAll();
    }

    public TransactionModel addTransaction(TransactionModel transactionModel) {
        return transactionRepository.save(transactionModel);
    }

    public List<TransactionModel> getTransByUserId(Long userId) {
        UserModel user = new UserModel();
        user.setUserId(userId);
        return transactionRepository.findByBuyerOrSeller(user, user);
    }

    public TransactionModel getTransByTransId(Long transId) {
        return transactionRepository.findById(transId).orElse(null);
    }

    public List<TransactionModel> getTransByProductId(Long productId) {
        Optional<ProductModel> productOpt = productRepository.findById(productId);
        if (productOpt.isPresent()) {
            return transactionRepository.findByProduct(productOpt.get());
        }
        return Collections.emptyList(); // or handle error
    }
    
    
}
