package com.fin.oopsproject.Controllers;

import com.fin.oopsproject.Model.UserModel;
import com.fin.oopsproject.Model.UserRepository;
import com.fin.oopsproject.Model.UserRepository2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final UserRepository2 userRepository2;

    public boolean isUsernameExists(String username) {
        return userRepository2.existsByUsername(username);
    }

    public boolean isEmailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    public UserService(UserRepository userRepository, UserRepository2 userRepository2) {
        this.userRepository = userRepository;
        this.userRepository2 = userRepository2;
    }

    public UserModel addUser(UserModel user) {
        // Hash the password
        String hashedPassword = hashPassword(user.getPassword());

        // Set the hashed password back to the user model
        user.setPassword(hashedPassword);

        // Save the user to the repository
        return this.userRepository.save(user);
    }

    public Optional<UserModel> authenticateUser(String email, String password) {
        Optional<UserModel> optionalUser = userRepository.findByEmail(email);
        
        if (optionalUser.isPresent()) {
            UserModel user = optionalUser.get();
            if (hashPassword(password).equals(user.getPassword())) {
                return Optional.of(user);
            }
        }
        return Optional.empty(); // Return empty if authentication fails
    }

    private String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(password.getBytes());

            StringBuilder hexString = new StringBuilder();
            for (byte b : hashBytes) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }

            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error: SHA-256 algorithm not found.", e);
        }
    }

    public UserModel getUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public Iterable<UserModel> getAllUsers() {
        return userRepository.findAll();
    }

    public UserModel setCampusId(Long userId, String campusId) {
        UserModel userModel = userRepository.findById(userId).orElse(null);
        assert userModel != null;
        userModel.setCampusID(campusId);
        return userRepository.save(userModel);
    }

    public UserModel setHostel(Long userId, String hostel) {
        UserModel userModel = userRepository.findById(userId).orElse(null);
        assert userModel != null;
        userModel.setHostel(hostel);
        return userRepository.save(userModel);
    }

    public UserModel setPhone(Long userId, String phone) {
        UserModel userModel = userRepository.findById(userId).orElse(null);
        assert userModel != null;
        userModel.setPhone(phone);
        return userRepository.save(userModel);
    }

}
