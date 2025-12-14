// backend/src/main/java/com/uy/monteverde/controller/AuthController.java
package com.uy.monteverde.controller;

import com.uy.monteverde.model.User;
import com.uy.monteverde.repository.UserRepository;
import com.uy.monteverde.service.UserService;
import com.uy.monteverde.security.JwtTokenProvider;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.Collections;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "${cors.origins}")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            // Buscar usuario
            User user = userService.findByEmail(loginRequest.getEmail());
            
            // Verificar contraseña
            if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                throw new RuntimeException("Credenciales inválidas");
            }
            
            // Verificar si el usuario está activo
            if (!user.getIsActive()) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("success", false);
                errorResponse.put("message", "Cuenta desactivada");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);
            }
            
            // Crear Authentication object
            Authentication authentication = new UsernamePasswordAuthenticationToken(
                user.getEmail(),
                null,
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
            );
            
            SecurityContextHolder.getContext().setAuthentication(authentication);
            
            // ✅ LLAMADA CORRECTA: Pasar authentication Y rememberMe
            String jwt = tokenProvider.generateToken(authentication, loginRequest.isRememberMe());
            
            // Actualizar último login
            user.setUpdatedAt(LocalDateTime.now());
            userRepository.save(user);
            
            // Preparar respuesta
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Login exitoso");
            response.put("token", jwt);
            response.put("user", Map.of(
                "email", user.getEmail(),
                "name", user.getName(),
                "surname", user.getSurname(),
                "role", user.getRole().name(),
                "isActive", user.getIsActive()
            ));
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Credenciales inválidas");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            // Verificar si el usuario ya existe
            if (userService.existsByEmail(registerRequest.getEmail())) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("success", false);
                errorResponse.put("message", "El email ya está registrado");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }
            
            // Crear nuevo usuario
            User user = User.builder()
                .email(registerRequest.getEmail())
                .password(registerRequest.getPassword())
                .name(registerRequest.getFirstName())
                .surname(registerRequest.getLastName())
                .isActive(true)
                .build();
            
            User savedUser = userService.save(user);
            
            // Crear Authentication object para el nuevo usuario
            Authentication authentication = new UsernamePasswordAuthenticationToken(
                savedUser.getEmail(),
                null,
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + savedUser.getRole().name()))
            );
            
            // ✅ LLAMADA CORRECTA: Solo authentication (sin rememberMe)
            String jwt = tokenProvider.generateToken(authentication);
            
            // Preparar respuesta
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Usuario registrado exitosamente");
            response.put("token", jwt);
            response.put("user", Map.of(
                "email", savedUser.getEmail(),
                "name", savedUser.getName(),
                "surname", savedUser.getSurname(),
                "role", savedUser.getRole().name(),
                "isActive", savedUser.getIsActive()
            ));
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
            
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Error en el registro: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyToken(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                throw new RuntimeException("Token no proporcionado");
            }
            
            String token = authHeader.substring(7);
            
            if (tokenProvider.validateToken(token)) {
                String username = tokenProvider.getUsernameFromToken(token);
                User user = userService.findByEmail(username);
                
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("user", Map.of(
                    "email", user.getEmail(),
                    "name", user.getName(),
                    "surname", user.getSurname(),
                    "role", user.getRole().name(),
                    "isActive", user.isActive()
                ));
                
                return ResponseEntity.ok(response);
            }
            
            throw new RuntimeException("Token inválido");
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }
}

// DTOs en archivos separados (mejor práctica)
class LoginRequest {
    private String email;
    private String password;
    private boolean rememberMe;
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public boolean isRememberMe() { return rememberMe; }
    public void setRememberMe(boolean rememberMe) { this.rememberMe = rememberMe; }
}

class RegisterRequest {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String phone;
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
}