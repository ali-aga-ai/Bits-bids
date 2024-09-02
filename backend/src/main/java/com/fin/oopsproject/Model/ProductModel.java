package com.fin.oopsproject.Model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "products")
public class ProductModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id", insertable = false, updatable = false)
    private Long id;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "image")
    private String image;

    @Column(name = "details")
    private String details;

    @Column(name = "category")
    private String category;

    @ManyToOne(targetEntity = UserModel.class)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private UserModel user;

    @Column(name = "starting_bid")
    private int startingBid;

    @OneToOne // Adjust the relationship as needed
    @JoinColumn(name = "current_bid_id") // Change to your actual field name
    private BidModel currentBid;

    @Column(name = "expiryDate")
    private Date expiryDate;

    @Column(name = "minimum_increment")
    private long minimumIncrement;

    @Column(name = "status", columnDefinition = "varchar(20) default 'on_auction'")
    private String sold = "on_auction"; // Default value

    // Constructor with all fields (consider adding expiryDate and minimumIncrement)
    public ProductModel(String productName, String image, String details, String category, UserModel user, int startingBid, Date expiryDate, long minimumIncrement) {
        this.productName = productName;
        this.image = image;
        this.details = details;
        this.category = category;
        this.user = user;
        this.startingBid = startingBid;
        this.expiryDate = expiryDate;
        this.minimumIncrement = minimumIncrement;
        this.sold = "on_auction";
    }

    // Default constructor
    public ProductModel() {}

    // Getters and Setters
    public Long getProductId() {
        return id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public UserModel getUser() {
        return user;
    }

    public void setUser(UserModel user) {
        this.user = user;
    }

    public int getStartingBid() {
        return startingBid;
    }

    public void setStartingBid(int startingBid) {
        this.startingBid = startingBid;
    }

    public BidModel getCurrentBid() {
        return currentBid;
    }

    public void setCurrentBid(BidModel currentBid) {
        this.currentBid = currentBid;
    }

    public Date getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }

    public long getMinimumIncrement() {
        return minimumIncrement;
    }

    public void setMinimumIncrement(long minimumIncrement) {
        this.minimumIncrement = minimumIncrement;
    }

    public String getSold() {
        return this.sold;
    }

    public void setSold(String sold) {
        this.sold = sold;
    }

    @Override
    public String toString() {
        return "ProductModel{" +
                "id=" + id +
                ", productName='" + productName + '\'' +
                ", image='" + image + '\'' +
                ", details='" + details + '\'' +
                ", category='" + category + '\'' +
                ", user=" + user +
                ", startingBid=" + startingBid +
                ", currentBid=" + currentBid +
                ", expiryDate=" + expiryDate +
                ", minimumIncrement=" + minimumIncrement +
                ", sold='" + sold + '\'' +
                '}';
    }
}
