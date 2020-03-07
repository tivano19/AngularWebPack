package com.myorga.code.model.audit;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


public abstract class UserDateAudit extends DateAudit {


    private Long createdBy;


    private Long updatedBy;

    public Long getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public Long getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(Long updatedBy) {
        this.updatedBy = updatedBy;
    }
}
