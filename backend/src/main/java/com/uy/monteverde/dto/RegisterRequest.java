package com.uy.monteverde.dto;

import lombok.*;

@Getter @Setter
public class RegisterRequest {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
}
