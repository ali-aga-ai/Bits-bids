package com.fin.oopsproject.Model;

import java.util.Date;
import jakarta.persistence.*;

@Entity
@Table(name = "bids")
public class BidModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bid_id")
    private Long bidId;

    @ManyToOne(targetEntity = UserModel.class)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private UserModel userId;

    @Column(name = "bid")
    private Long bid;

    @ManyToOne(targetEntity = ProductModel.class)
    @JoinColumn(name = "product_id", referencedColumnName = "product_id")
    private ProductModel product;

    @Column(name ="frozen")
    private boolean frozen;

    @Column(name ="time")
    private Date time;

    @Column(name ="active_status")
    private boolean active;

    public BidModel(UserModel userId, Long bid, ProductModel product) {
        this.userId = userId;
        this.bid = bid;
        this.product = product;
        this.active = true;
    }

    public BidModel() {
    }

    // Getters and Setters
    public Long getBidId() {
        return bidId;
    }

    public void setBidId(Long bidId) {
        this.bidId = bidId;
    }

    public UserModel getUser() {
        return userId;
    }

    public void setUser(UserModel userId) {
        this.userId = userId;
    }

    public Long getUserId() {
        return userId.getUserId();
    }

    public void setUserId(Long userId) {
        if (this.userId != null) {
            this.userId.setUserId(userId);
        }
    }

    public Long getBid() {
        return bid;
    }

    public void setBid(Long bid) {
        this.bid = bid;
    }

    public ProductModel getProduct() {
        return product;
    }

    public void setProduct(ProductModel product) {
        this.product = product;
    }

    public boolean isFrozen() {
        return frozen;
    }

    public void setFrozen(boolean frozen) {
        this.frozen = frozen;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
