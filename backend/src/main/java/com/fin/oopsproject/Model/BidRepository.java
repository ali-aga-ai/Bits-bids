package com.fin.oopsproject.Model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface BidRepository extends JpaRepository<BidModel, Long> {

    List<BidModel> findAllBy();

    Optional<BidModel> findByUserId(UserModel userId);

    List<BidModel> findAllByUserId(UserModel userId);

    List<BidModel> findAllByProduct(ProductModel productModel);

    List<BidModel> findByActiveTrueAndUserId(UserModel userId);
}
