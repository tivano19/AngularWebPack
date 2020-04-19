package com.myorga.code.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.convert.DurationUnit;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotNull;
import java.time.Duration;
import java.time.temporal.ChronoUnit;

@ConfigurationProperties(prefix = "app")
@Validated
@Data
public class AppProperties {


    @NotNull
    private String jwtSecret;


    @DurationUnit(ChronoUnit.SECONDS)
    private Duration jwtExpirationInMs = Duration.ofSeconds(30);


}
