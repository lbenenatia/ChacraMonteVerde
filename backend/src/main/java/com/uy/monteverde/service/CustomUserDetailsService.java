package com.uy.monteverde.service;

import com.uy.monteverde.model.User;
import com.uy.monteverde.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(CustomUserDetailsService.class);

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        logger.debug("Buscando usuario con email: {}", email);
        
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> {
                logger.error("Usuario no encontrado con email: {}", email);
                return new UsernameNotFoundException("Usuario no encontrado con email: " + email);
            });

        logger.debug("Usuario encontrado: {} {}", user.getName(), user.getSurname());
        
        return org.springframework.security.core.userdetails.User.builder()
            .username(user.getEmail())
            .password(user.getPassword())
            .roles(user.getRole().name())
            .disabled(!user.getIsActive())
            .build();
    }
}