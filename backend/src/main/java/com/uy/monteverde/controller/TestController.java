// backend/src/main/java/com/uy/monteverde/controller/TestController.java
package com.uy.monteverde.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/test")
public class TestController {
    
    @GetMapping("/health")
    public Map<String, String> healthCheck() {
        return Map.of(
            "status", "OK",
            "service", "Monte Verde Backend",
            "timestamp", String.valueOf(System.currentTimeMillis())
        );
    }
    
    @GetMapping("/public")
    public Map<String, String> publicEndpoint() {
        return Map.of("message", "Este es un endpoint público");
    }
    
    @GetMapping("/protected")
    public Map<String, String> protectedEndpoint() {
        return Map.of("message", "Este es un endpoint protegido");
    }
}