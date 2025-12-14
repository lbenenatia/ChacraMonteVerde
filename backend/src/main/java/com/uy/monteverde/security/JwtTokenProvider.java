package com.uy.monteverde.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.expiration:86400000}") // 24 horas por defecto
    private int jwtExpirationMs;

    @Value("${app.jwt.longExpiration:2592000000}") // 30 días por defecto
    private int jwtLongExpirationMs;

    private Key getSigningKey() {
        byte[] keyBytes = jwtSecret.getBytes(StandardCharsets.UTF_8);
        
        if (keyBytes.length < 32) {
            byte[] paddedKey = new byte[32];
            System.arraycopy(keyBytes, 0, paddedKey, 0, Math.min(keyBytes.length, 32));
            keyBytes = paddedKey;
        }
        
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // Método 1: Para login (con rememberMe)
    public String generateToken(Authentication authentication, boolean rememberMe) {
        String username = authentication.getName();
        
        Date now = new Date();
        long expirationTime = rememberMe ? jwtLongExpirationMs : jwtExpirationMs;
        Date expiryDate = new Date(now.getTime() + expirationTime);
        
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Método 2: Para registro (sin rememberMe, usa tiempo normal)
    public String generateToken(Authentication authentication) {
        return generateToken(authentication, false); // Llama al método anterior con false
    }

    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        
        return claims.getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException ex) {
            logger.error("Token JWT inválido: {}", ex.getMessage());
            return false;
        }
    }
}