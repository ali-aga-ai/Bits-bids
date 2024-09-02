package com.fin.oopsproject.Controllers;

import com.fin.oopsproject.Model.*;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class BidService  {
    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public List<BidResponseDTO> getAllBids() {
        List<BidModel> bidModels = bidRepository.findAllBy();
        List<BidResponseDTO> response = new ArrayList<>();
    
        for (BidModel bid : bidModels) {
            BidResponseDTO dto = new BidResponseDTO();
            dto.setUserId(bid.getUser().getUserId());
            dto.setBidId(bid.getBidId());
            dto.setBid(bid.getBid());
            dto.setProductId(bid.getProduct().getProductId());
            dto.setTime(bid.getTime());
            dto.setActiveStatus(bid.isActive());
            response.add(dto);
        }
    
        return response;
    }
    
    public BidModel addBid(Long productId, Long userId, Long bidAmount) {
        Date currentDate = new Date(); // Get the current date and time
    
        ProductModel productModel = productRepository.findById(productId).orElseThrow(() -> 
            new IllegalArgumentException("Product not found"));
    
        // If the product is not on auction, you can't bid on it
        if (!productModel.getSold().equals("on_auction")) {
            throw new IllegalArgumentException("Product is not on auction");
        }
    
        // Check if the auction time has passed
        if (currentDate.after(productModel.getExpiryDate())) {
            throw new IllegalArgumentException("Auction time has passed");
        }
        
        UserModel userModel = userRepository.findById(userId).orElseThrow(() -> 
            new IllegalArgumentException("User not found"));
    
        // Check if the user is the seller
        if (productModel.getUser().getUserId().equals(userModel.getUserId())) {
            throw new IllegalArgumentException("Seller cannot bid on their own product");
        }
    
        Long userMoney = userModel.getMoney();
    
        if (bidAmount > userMoney) {
            throw new IllegalArgumentException("Insufficient funds for this bid");
        }
    
        BidModel lastBid = productModel.getCurrentBid();
    
        // If there is a last bid, validate the increment
        if (lastBid != null) {
            if (bidAmount < productModel.getMinimumIncrement() + lastBid.getBid()) {
                throw new IllegalArgumentException("Low increments not allowed");
            }
            
            lastBid.setActive(false); // Deactivate the last bid
        }
    
        // Create and set the new bid model
        BidModel bidModel = new BidModel();
        bidModel.setProduct(productModel);
        bidModel.setBid(bidAmount);
        bidModel.setUser(userModel);
        bidModel.setFrozen(false);
        bidModel.setTime(currentDate);
        bidModel.setActive(true);
    
        productModel.setCurrentBid(bidModel);
    
        return bidRepository.save(bidModel);
    }
    
    
    public List<BidResponseDTO> getBidsByUserId(Long userId) {
        UserModel userModel = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));
        
        Iterable<BidModel> bids = bidRepository.findAllByUserId(userModel);
    
        List<BidResponseDTO> response = new ArrayList<>();
        for (BidModel bid : bids) {
            BidResponseDTO dto = new BidResponseDTO();
            dto.setUserId(bid.getUser().getUserId());
            dto.setBidId(bid.getBidId());
            dto.setBid(bid.getBid());
            dto.setProductId(bid.getProduct().getProductId());
            dto.setTime(bid.getTime());
            dto.setActiveStatus(bid.isActive());
            response.add(dto);
        }
        return response;
    }
    

    public Iterable<BidModel> getActiveBidsByUserId(Long userId) {
        UserModel userModel = userRepository.findById(userId).orElse(null);
        assert userModel != null;
        return bidRepository.findByActiveTrueAndUserId(userModel);
    }
    
    

    public Long getHighestBid(Long productId) {
    ProductModel productModel = productRepository.findById(productId).orElse(null);
    if (productModel == null) {
        throw new NoSuchElementException("Product not found with id: " + productId);
    }
    
    List<BidModel> bidModels = bidRepository.findAllByProduct(productModel);
    
    if (bidModels.isEmpty()) {
        return null; // or throw an exception if preferred
    }
    
    Long highestBid = Long.MIN_VALUE; // Use a minimal value for comparison
    
    for (BidModel bidModel : bidModels) {
        if (bidModel.getBid() > highestBid) {
            highestBid = bidModel.getBid();
        }
    }
    
    return highestBid == Long.MIN_VALUE ? null : highestBid; // Return null if no bids were found
}


public BidModel freezeBid(Long bidId) {
    BidModel bidModel = bidRepository.findById(bidId).orElseThrow(() -> 
        new NoSuchElementException("Bid not found with id: " + bidId));
    
    bidModel.setFrozen(true);
    
    ProductModel productModel = bidModel.getProduct();
    if (productModel == null) {
        throw new NoSuchElementException("Associated product not found for bid id: " + bidId);
    }
    
    productModel.setSold("sold");
    
    productRepository.save(productModel);
    bidRepository.save(bidModel);
    
    return bidModel;
}


    public Iterable<ProductModel> getProductsByUserId(Long userId) {
        UserModel userModel = userRepository.findById(userId).orElse(null);
        assert userModel != null;
        Iterable<BidModel> bids = bidRepository.findAllByUserId(userModel);
        HashSet<ProductModel> products = new HashSet<>();
        for (BidModel bid : bids) {
            products.add(bid.getProduct());
        }
        return products;
    }
    
public List<BidResponseDTO> getBidByProductId(Long productId) {
    ProductModel productModel = productRepository.findById(productId)
            .orElseThrow(() -> new EntityNotFoundException("Product not found with ID: " + productId));
    Iterable<BidModel> bids = bidRepository.findAllByProduct(productModel);

    List<BidResponseDTO> response = new ArrayList<>();
    for (BidModel bid : bids) {
        BidResponseDTO dto = new BidResponseDTO();
        dto.setUserId(bid.getUser().getUserId());
        dto.setBidId(bid.getBidId());
        dto.setBid(bid.getBid());
        dto.setProductId(bid.getProduct().getProductId()); // or appropriate method to get productId
        dto.setTime(bid.getTime());
        dto.setActiveStatus(bid.isActive()); // Assuming `isActiveStatus()` method exists
        response.add(dto);
    }
    return response;
}

}
