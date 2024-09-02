package com.fin.oopsproject.Controllers;

import com.fin.oopsproject.Model.*;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Date;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionService transService;

    @Scheduled(fixedRate = 60000) // Check every minute on completed auctions
    public void scheduledAuctionCheck() {
        List<ProductModel> allProducts = productRepository.findAll();
        for (ProductModel product : allProducts) {
            checkAuctionAndTransfer(product.getProductId());
        }
    }

    public void checkAuctionAndTransfer(Long productId) {
        ProductModel productModel = productRepository.findById(productId).orElseThrow(() -> 
            new IllegalArgumentException("Product not found, HAS BEEN DELETED FROM MAIN DATABASE"));

        Date currentDate = new Date();
        
        if (currentDate.after(productModel.getExpiryDate())) {
            boolean success = transService.transferMoney(productModel);
            if (!success) {
                productModel.setSold("off_auction"); // Set to off_auction if transfer failed
            } else {
                productModel.setSold("sold"); // Mark product as sold if transfer succeeded
            }
            productRepository.save(productModel);
        }
        
    }
    
    // USer  needs to pass in everything in request
    public ProductModel addProduct(ProductModel productModel, Long userId) {
        UserModel userModel = userRepository.findById(userId).orElseThrow(() -> 
            new EntityNotFoundException("User not found with id: " + userId)
        );
        productModel.setUser(userModel);
        return productRepository.save(productModel);
    }
    

    // Read
    public ProductModel getProductById(Long productId) {
        return productRepository.findById(productId).orElse(null);
    }

    public Iterable<ProductModel> getProductsByUserId(Long userId) {
        UserModel userModel = userRepository.findById(userId).orElse(null);
        assert userModel != null;
        return productRepository.findAllByUser(userModel);
    }
    
    public Iterable<BidModel> getBidsByProductId(Long productId) {
        ProductModel productModel = productRepository.findById(productId).orElse(null);
        assert productModel != null;
        return bidRepository.findAllByProduct(productModel);
    }

  // Update
public ProductModel updateProduct(ProductModel productModel) {
    // Ensure the product ID is not null and the product exists
    if (productModel.getProductId() == null) {
        throw new IllegalArgumentException("Product ID must not be null");
    }

    ProductModel existingProduct = productRepository.findById(productModel.getProductId())
            .orElseThrow(() -> new EntityNotFoundException("Product not found with id " + productModel.getProductId()));

    // Update the fields of the existing product with the new details
    existingProduct.setProductName(productModel.getProductName());
    existingProduct.setImage(productModel.getImage());
    existingProduct.setDetails(productModel.getDetails());
    existingProduct.setCategory(productModel.getCategory());
    existingProduct.setUser(productModel.getUser());
    existingProduct.setStartingBid(productModel.getStartingBid());

    // Save the updated product to the repository
    return productRepository.save(existingProduct);
}


    // Delete
    public String deleteProduct(Long productId) {
        productRepository.deleteById(productId);
        return "Product removed !! " + productId;
    }

    // Get all
    public Iterable<ProductModel> getAllProducts() {
        // Find the products that are not sold
        List<ProductModel> products = productRepository.findAll();
        products.removeIf(product -> "sold".equals(product.getSold()));//except those that have been sold
        return products;
    }
    public Iterable<ProductModel> getAllUnsoldProducts() {
        return productRepository.findAllBySoldNot("sold");
    }
    
    public Iterable<ProductModel> getProductsByCategoryAndSoldStatus(String category, String soldStatus) {
        return productRepository.findAllByCategoryAndSold(category, soldStatus);
    }
    
    
    public Iterable<ProductModel> getSoldProductsByUser(UserModel user) {
        return productRepository.findAllByUserAndSold(user, "sold");
    }
    
    // Get by category
    public Iterable<ProductModel> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    // Get featured products
    // Find the top 3 products with maximum number of bids
    public Iterable<ProductModel> getFeaturedProducts() {
        List<BidModel> bids = bidRepository.findAll();
        HashMap<Long, Integer> productBids = new HashMap<>();
        for (BidModel bid : bids) {
            Long productId = bid.getProduct().getProductId();
            if (productBids.containsKey(productId)) {
                productBids.put(productId, productBids.get(productId) + 1);
            } else {
                productBids.put(productId, 1);
            }
        }
        List<ProductModel> products = productRepository.findAllBySold("sold");
        products.sort((o1, o2) -> {
            Integer o1Bids = productBids.get(o1.getProductId());
            Integer o2Bids = productBids.get(o2.getProductId());
            if (o1Bids == null) {
                o1Bids = 0;
            }
            if (o2Bids == null) {
                o2Bids = 0;
            }
            return o2Bids.compareTo(o1Bids);
        });
        return products.subList(0, Math.min(3, products.size()));
    }
}
