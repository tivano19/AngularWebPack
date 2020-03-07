package com.myorga.code.rest;


import com.myorga.code.security.JwtAuthenticationResponse;
import com.myorga.code.security.JwtTokenProvider;
import com.myorga.code.service.security.LoginDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;


@RestController
    @RequestMapping("/users")
    public class AuthenticationController {

        @Autowired
        AuthenticationManager authenticationManager;

        @Autowired
        PasswordEncoder passwordEncoder;

        @Autowired
        JwtTokenProvider tokenProvider;

        @PostMapping("/authenticate")
        public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginDTO loginRequest) {

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = tokenProvider.generateToken(authentication);

            System.out.println("Yes jwt : " + jwt);

            return ResponseEntity.ok(new JwtAuthenticationResponse(1L, "lounes", "lounes", "lounes", jwt, authentication.getAuthorities()));
        }



    }