package com.fin.oopsproject.Model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ProductModel, Long> {
    List<ProductModel> findByCategory(String category);

    List<ProductModel> findAll();

    List<ProductModel> findAllBySold(String sold);

    Iterable<ProductModel> findAllByUser(UserModel userModel);

    Iterable<ProductModel> findAllByUserAndSold(UserModel userModel, String sold);

    Iterable<ProductModel> findAllBySoldNot(String sold);

     // Method to find all products by category and sold status
     Iterable<ProductModel> findAllByCategoryAndSold(String category, String sold);

}
