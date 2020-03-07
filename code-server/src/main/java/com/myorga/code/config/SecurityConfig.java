package com.myorga.code.config;


import com.myorga.code.security.CustomAuthenticationProvider;
import com.myorga.code.security.JwtAuthenticationEntryPoint;
import com.myorga.code.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true
)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    CustomAuthenticationProvider customAuthProvider;

    @Autowired
    JwtAuthenticationEntryPoint unauthorizedHandler;

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder
                .authenticationProvider(customAuthProvider);
    }

    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .csrf()
                .disable()
                .exceptionHandling()
                .authenticationEntryPoint(unauthorizedHandler)
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/",
                        "/**/**/favicon.ico",
                        "/**/**/*.png",
                        "/**/**/*.gif",
                        "/**/**/*.svg",
                        "/**/**/*.jpg",
                        "/**/**/*.html",
                        "/**/**/*.css",
                        "/**/**/*.css.map",
                        "/**/**/*.js",
                        "/content/events/assets/env/env-specific.json",
                        "/content/events/assets/env/*",
                        "/content/events/**",
                        "/test",
                        "/users/test",
                        "/content/events/assets/env/env-prod.json")
                .permitAll()
                //FIXME:
                .antMatchers("/content/events/", "/content/events/*",
                        "/content/events/", "/content/events/index",  "/content/events/index.html", "/users")
                .permitAll()
                .antMatchers("/users/authenticate")
                .permitAll()
                .antMatchers("/users","/users/details")
                .permitAll()
                .antMatchers("/users/processing")
                .permitAll()
                .antMatchers(HttpMethod.GET, "/api/polls/**", "/api/permit")
                .permitAll()
                .anyRequest()
                .permitAll();
                //.authenticated();

        // Add our custom JWT security filter
        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

    }

}