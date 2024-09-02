package com.fin.oopsproject.Model;
import java.sql.Date;
import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public class BidResponseDTO {
    private Long userId;
    private Long bidId;
    private Long bid;
    private Long productId;
    private Date time; // Use LocalDateTime or Date depending on your time type
    private boolean activeStatus;

    // Default constructor
    public BidResponseDTO() {
    }

    // Parameterized constructor
    public BidResponseDTO(Long userId, Long bidId, Long bid, Long productId, Date time, boolean activeStatus) {
        this.userId = userId;
        this.bidId = bidId;
        this.bid = bid;
        this.productId = productId;
        this.time = time;
        this.activeStatus = activeStatus;
    }

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getBidId() {
        return bidId;
    }

    public void setBidId(Long bidId) {
        this.bidId = bidId;
    }

    public Long getBid() {
        return bid;
    }

    public void setBid(Long bid) {
        this.bid = bid;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(java.util.Date date) {
        this.time = new java.sql.Date(date.getTime());
    }
    
    public boolean isActiveStatus() {
        return activeStatus;
    }

    public void setActiveStatus(boolean activeStatus) {
        this.activeStatus = activeStatus;
    }
}
