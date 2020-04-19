package com.myorga.code.service.security;

import com.myorga.code.model.User;
import com.myorga.code.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class CustomUserDetailsService implements UserDetailsService {

    // @Autowired
    // UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        // Let people login with either username or email
        User user = new User();
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return UserPrincipal.create(user);
    }

    @Transactional
    public UserDetails loadUserByUsernameAndPassword(String username, String password) {
        User user = new User();
        passwordEncoder.matches("lounes", "encodedPassword");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return UserPrincipal.create(user);
    }
}