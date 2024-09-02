package com.fin.oopsproject.Model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long> {

    Optional<UserModel> findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByUsernameAndPassword(String username, String password);
    Optional<UserModel> findByUsername(String username);
    Optional<UserModel> findById(Long userId); // Optional is a container object used to represent a value that might be present or absent. It helps to avoid NullPointerException by providing methods to check if a value is present and handle the absence of a value gracefully.
    boolean existsByEmail(String email);


}
