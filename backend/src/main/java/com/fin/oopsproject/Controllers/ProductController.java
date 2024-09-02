package com.fin.oopsproject.Controllers;

import com.fin.oopsproject.Model.ProductModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/v1/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    // Create
    @PostMapping(path = "/")
    public ProductModel addProduct(@RequestBody ProductModel productModel, @RequestParam Long userId) {
        return productService.addProduct(productModel, userId);
    }

    // gets product info based on product id
    @GetMapping(path = "/")
    public ProductModel getProductById(@RequestParam Long productId) {
        return productService.getProductById(productId);
    }

    @GetMapping(path = "/user")
    public Iterable<ProductModel> getProductsByUserId(@RequestParam Long userId) {
        return productService.getProductsByUserId(userId);
    }

    // Update
    @PostMapping(path = "/update")
    public ProductModel updateProduct(@RequestBody ProductModel productModel) {
        return productService.updateProduct(productModel);
    }

    // Delete
    @DeleteMapping(path = "/")
    public String deleteProduct(@RequestParam Long productId) {
        return productService.deleteProduct(productId);
    }

    // Get all
    @GetMapping(path = "/listAll")
    public Iterable<ProductModel> getAllProducts() {
        return productService.getAllProducts();
    }
    @GetMapping(path = "/listUnsold")
    public Iterable<ProductModel> getUnsoldProducts() {
        return productService.getAllUnsoldProducts();
    }

    // Get by category
    @GetMapping(path = "/listByCategory")
    public Iterable<ProductModel> getProductsByCategory(@RequestParam String category) {
        return productService.getProductsByCategory(category);
    }
    

        // Get by category and sold status
    @GetMapping(path = "/listByCategoryAndStatus")
    public Iterable<ProductModel> getProductsByCategoryAndSoldStatus(
            @RequestParam String category, 
            @RequestParam String soldStatus) {
        return productService.getProductsByCategoryAndSoldStatus(category, soldStatus);
    }

    //@GetMapping(path = "/featured")
    //public Iterable<ProductModel> getFeaturedProducts() {
    //    return productService.getFeaturedProducts();
    //}
}
