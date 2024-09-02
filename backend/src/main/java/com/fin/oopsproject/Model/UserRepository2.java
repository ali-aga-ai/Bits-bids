package com.fin.oopsproject.Model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository2 extends JpaRepository<UserModel, Long> {
    Optional<UserModel> findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByUsernameAndPassword(String username, String password);
    UserModel findByUsername(String username);
} 
