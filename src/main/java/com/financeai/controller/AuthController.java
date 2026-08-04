package com.financeai.controller;

import com.financeai.config.TokenJWTDTO;
import com.financeai.dto.loginDTO;
import com.financeai.entity.Usuario;
import com.financeai.repository.UsuarioRepository;
import com.financeai.service.TokenService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.annotation.Validated;

import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import com.financeai.dto.request.RegisterRequest;
import com.financeai.dto.response.RegisterResponse;
import com.financeai.service.UserService;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Validated
@SecurityRequirement(name = "bearer-key")
public class AuthController {

    private final UserService userService;
    @Autowired
    public TokenService tokenService;
    @Autowired
    public AuthenticationManager manager;

    @Autowired
    private final UsuarioRepository repository;


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

    @PostMapping("/login")
    public ResponseEntity Login(@RequestBody @Valid loginDTO data) {

        try{ UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken(data.correo(), data.contrasena());

        Authentication authentication = this.manager.authenticate(token);

        String tokenJWT = this.tokenService.CreateToken((Usuario)authentication.getPrincipal());

        return ResponseEntity.ok(new TokenJWTDTO(tokenJWT));
        } catch (BadCredentialsException | UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("mensaje", "El correo o la contraseña son incorrectos"));
        }
    }

}

