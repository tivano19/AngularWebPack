package com.myorga.code.rest;

import lombok.Data;

@Data
public class DetailUser {

    private Integer callId;

    private Integer duration;

    private String switchCode;

    private String direction;

    private Integer number;

    public DetailUser(Integer callId, Integer duration, String switchCode, Integer number, String direction) {
        this.callId = callId;
        this.duration = duration;
        this.switchCode = switchCode;
        this.number = number;
        this.direction = direction;
    }
}
