package com.financeai.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;

import lombok.Getter;
import lombok.Setter;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;

import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class Audit {

    @CreatedDate
    @Column(name = "register_date", updatable = false)
    private LocalDateTime registerDate;

    @CreatedBy
    @Column(name = "register_user_id", updatable = false)
    private String registerUserId;

    @LastModifiedDate
    @Column(name = "update_date")
    private LocalDateTime updateDate;

    @LastModifiedBy
    @Column(name = "update_user_id")
    private String updateUserId;

}