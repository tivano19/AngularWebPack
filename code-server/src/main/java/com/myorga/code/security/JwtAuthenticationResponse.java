package com.myorga.code.security;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
public class JwtAuthenticationResponse {

    private Long id;

    private String username;

    private String firstName;

    private String lastName;

    private String token;

    private String tokenType = "Bearer";

    private Collection<? extends GrantedAuthority> authorities = null;

    public JwtAuthenticationResponse(Long id, String username, String firstName, String lastName, String token, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.token = token;
        this.authorities = authorities;
    }

}
