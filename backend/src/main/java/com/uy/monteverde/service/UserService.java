// backend/src/main/java/com/uy/monteverde/service/UserService.java
package com.uy.monteverde.service;

import com.uy.monteverde.model.User;
import com.uy.monteverde.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    public boolean existsByEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public User save(User user) {
        // Encriptar contraseña antes de guardar
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        // Establecer fechas si no existen
        if (user.getCreatedAt() == null) {
            user.setCreatedAt(LocalDateTime.now());
        }
        user.setUpdatedAt(LocalDateTime.now());
        
        return userRepository.save(user);
    }

    public User updateLastLogin(String email) {
        User user = findByEmail(email);
        user.setUpdatedAt(LocalDateTime.now());
        // Puedes agregar un campo lastLogin si lo necesitas
        return userRepository.save(user);
    }
}