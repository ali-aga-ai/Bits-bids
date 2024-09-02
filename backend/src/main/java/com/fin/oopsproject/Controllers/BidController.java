package com.fin.oopsproject.Controllers;

import com.fin.oopsproject.Model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/bids")
public class BidController {
    @Autowired
    private BidService bidService;

    // Read
    @GetMapping(path = "/")
    public Iterable<BidResponseDTO> getAllBids() {
        return bidService.getAllBids();
    }

// Create
        @PostMapping(path = "/")
        public BidModel addBid(@RequestParam Long bidAmount, @RequestParam Long productId, @RequestParam Long userId) {
           System.out.println("hello ");
            return bidService.addBid(productId, userId, bidAmount);
        }

    @GetMapping(path = "/{userId}")
    public Iterable<BidResponseDTO> getBidsByUserId(@PathVariable Long userId) {
        return bidService.getBidsByUserId(userId);
    }

    @GetMapping(path = "/highestBid/{productId}")
    public Long getHighestBid(@PathVariable Long productId) {
        return bidService.getHighestBid(productId);
    }

    @PostMapping(path = "/freezeBid") //might need to set active status false
    public BidModel freezeBid(@RequestParam Long bidId) {
        return bidService.freezeBid(bidId);
    }

    @GetMapping(path = "/products/{userId}")
    public Iterable<ProductModel> getBiddedProducts(@PathVariable Long userId) {
        return bidService.getProductsByUserId(userId);
    }

    @GetMapping(path = "/product/{productId}")
    public Iterable<BidResponseDTO> getAllBidsForProduct(@PathVariable Long productId) {
        return bidService.getBidByProductId(productId);
    }
}
