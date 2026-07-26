package com.financeai.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.validation.annotation.Validated;

import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import com.financeai.dto.request.RegisterRequest;
import com.financeai.dto.response.RegisterResponse;
import com.financeai.service.UserService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Validated
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(

            @Valid

            @RequestBody

            RegisterRequest request){

        RegisterResponse response =
                userService.register(request);

        return ResponseEntity

                .status(HttpStatus.CREATED)

                .body(response);

    }

}