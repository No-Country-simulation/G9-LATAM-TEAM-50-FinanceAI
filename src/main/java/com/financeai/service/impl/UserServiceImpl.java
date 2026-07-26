
package com.financeai.service.impl;

import java.time.LocalDateTime;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.financeai.dto.request.RegisterRequest;
import com.financeai.dto.response.RegisterResponse;
import com.financeai.entity.Usuario;
import com.financeai.enums.Rol;
import com.financeai.repository.UsuarioRepository;
import com.financeai.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UsuarioRepository usuarioRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    public RegisterResponse register(RegisterRequest request) {

        if (usuarioRepository.existsByCorreo(request.getCorreo())) {
            throw new RuntimeException("El correo ya está registrado.");
        }

        if (usuarioRepository.existsByDocumento(request.getDocumento())) {
            throw new RuntimeException("El documento ya está registrado.");
        }

        Usuario usuario = Usuario.builder()
                .nombreCompleto(request.getNombreCompleto())
                .documento(request.getDocumento())
                .edad(request.getEdad())
                .correo(request.getCorreo())
                .contrasena(passwordEncoder.encode(request.getContrasena()))
                .rol(Rol.CLIENTE)
                .activo(true)
                .registerDate(LocalDateTime.now())
                .registerUserId("SYSTEM")
                .build();

        Usuario usuarioGuardado = usuarioRepository.save(usuario);

        return RegisterResponse.builder()
                .usuarioId(usuarioGuardado.getUsuarioId())
                .nombreCompleto(usuarioGuardado.getNombreCompleto())
                .correo(usuarioGuardado.getCorreo())
                .mensaje("Usuario registrado correctamente.")
                .build();
    }
}