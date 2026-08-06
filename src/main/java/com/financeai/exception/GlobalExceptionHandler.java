package com.financeai.exception;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceAlreadyExistsException.class)
    public ResponseEntity<ApiError> handleResourceAlreadyExists(

            ResourceAlreadyExistsException ex,

            HttpServletRequest request){

        ApiError error = ApiError.builder()

                .timestamp(LocalDateTime.now())

                .status(HttpStatus.CONFLICT.value())

                .error(HttpStatus.CONFLICT.getReasonPhrase())

                .message(ex.getMessage())

                .path(request.getRequestURI())

                .build();

        return ResponseEntity

                .status(HttpStatus.CONFLICT)

                .body(error);

    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationErrorResponse> handleValidationErrors(

            MethodArgumentNotValidException ex,

            HttpServletRequest request){

        Map<String,String> errors = new HashMap<>();

        ex.getBindingResult()

                .getFieldErrors()

                .forEach(error ->

                        errors.put(

                                error.getField(),

                                error.getDefaultMessage()

                        )

                );

        ValidationErrorResponse response =

                ValidationErrorResponse.builder()

                        .timestamp(LocalDateTime.now())

                        .status(HttpStatus.BAD_REQUEST.value())

                        .error(HttpStatus.BAD_REQUEST.getReasonPhrase())

                        .message("Error de validación")

                        .path(request.getRequestURI())

                        .errors(errors)

                        .build();

        return ResponseEntity

                .status(HttpStatus.BAD_REQUEST)

                .body(response);

    }

}