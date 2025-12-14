package com.uy.monteverde.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.uy.monteverde.repository.UserRepository;
import com.uy.monteverde.model.User;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{email}")
    public ResponseEntity<?> getUserProfile(@PathVariable String email) {
        try {
            Optional<User> optionalUser = userRepository.findByEmail(email);

            if (optionalUser.isEmpty()) {
                return ResponseEntity.status(404).body(Map.of("message", "Usuario no encontrado"));
            }

            User user = optionalUser.get();

            Map<String, Object> response = new HashMap<>();

            Map<String, Object> userData = new HashMap<>();
            userData.put("email", user.getEmail());
            userData.put("name", user.getName());
            userData.put("surname", user.getSurname());
            userData.put("isActive", user.getIsActive());
            userData.put("role", user.getRole().name());
            userData.put("createdAt", user.getCreatedAt().toString());

            response.put("user", userData);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Error al obtener datos del usuario: " + e.getMessage()));
        }
    }
}
