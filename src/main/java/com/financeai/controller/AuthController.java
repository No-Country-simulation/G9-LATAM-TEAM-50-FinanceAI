package com.financeai.controller;

import com.financeai.dto.request.LoginRequest;
import com.financeai.dto.request.RegisterRequest;
import com.financeai.dto.response.LoginResponse;
import com.financeai.dto.response.RegisterResponse;
import com.financeai.service.UserService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;


    // ==============================
    // REGISTER
    // ==============================

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(
            @Valid @RequestBody RegisterRequest request
    ) {

        RegisterResponse response =
                userService.register(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }


    // ==============================
    // LOGIN
    // ==============================

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request
    ) {

        LoginResponse response =
                userService.login(request);

        return ResponseEntity.ok(response);
    }
}