package com.fin.oopsproject.Model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<TransactionModel, Long> {
    // Find transactions by buyer ID
    List<TransactionModel> findByBuyer(UserModel buyer);

    // Find transactions by product ID
    List<TransactionModel> findByProduct(ProductModel product);

    // Find transactions by buyer ID or seller ID
    List<TransactionModel> findByBuyerOrSeller(UserModel buyer, UserModel seller);
}
