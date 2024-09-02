package com.fin.oopsproject.Model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
public class TransactionModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id", insertable = false, updatable = false)
    private Long transactionId;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "product_id")
    private ProductModel product;

    @ManyToOne
    @JoinColumn(name = "buyer_id", referencedColumnName = "user_id")
    private UserModel buyer;

    @ManyToOne
    @JoinColumn(name = "seller_id", referencedColumnName = "user_id")
    private UserModel seller;

    @Column(name = "amount")
    private BigDecimal amount;

    @Column(name = "timestamp")
    private LocalDateTime timestamp;

    @Column(name = "status")
    private String status;

    public TransactionModel() {}

    public TransactionModel(ProductModel product, UserModel buyer, UserModel seller, BigDecimal amount, String status) {
        this.product = product;
        this.buyer = buyer;
        this.seller = seller;
        this.amount = amount;
        this.timestamp = LocalDateTime.now();
        this.status = status;
    }

    @PrePersist
    protected void onCreate() {
        this.timestamp = LocalDateTime.now();
    }

    // Getters and setters

    @Override
    public String toString() {
        return "TransactionModel{" +
                "transactionId=" + transactionId +
                ", product=" + product +
                ", buyer=" + buyer +
                ", seller=" + seller +
                ", amount=" + amount +
                ", timestamp=" + timestamp +
                ", status='" + status + '\'' +
                '}';
    }
}
