package com.financeai.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class ApiError {

    private LocalDateTime timestamp;

    private Integer status;

    private String error;

    private String message;

    private String path;

}