package com.fin.oopsproject.Controllers;

import com.fin.oopsproject.Model.BidModel;
import com.fin.oopsproject.Model.ProductModel;
import com.fin.oopsproject.Model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/transactions")  // Updated path to avoid conflict with BidController
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    // Read
    @GetMapping(path = "/")
    public Iterable<TransactionModel> getAllTransactions() {
        return transactionService.getAllTrans();
    }

    // Create
    @PostMapping(path = "/")
    public TransactionModel addTrans(@RequestBody TransactionModel transactionModel) {
        return transactionService.addTransaction(transactionModel);
    }

    @GetMapping(path = "/user/{userId}")
    public Iterable<TransactionModel> getTransByUserId(@PathVariable Long userId) {
        return transactionService.getTransByUserId(userId);
    }

    @GetMapping(path = "/{transId}")
    public TransactionModel getTransByTransId(@PathVariable Long transId) {
        return transactionService.getTransByTransId(transId);
    }

    @GetMapping(path = "/product/{productId}")
    public Iterable<TransactionModel> getTransByProductId(@PathVariable Long productId) {
        return transactionService.getTransByProductId(productId);
    }
}
