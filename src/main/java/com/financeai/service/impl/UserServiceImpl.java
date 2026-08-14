package com.financeai.service.impl;

import com.financeai.dto.request.LoginRequest;
import com.financeai.dto.request.RegisterRequest;
import com.financeai.dto.response.LoginResponse;
import com.financeai.dto.response.RegisterResponse;
import com.financeai.entity.Rol;
import com.financeai.entity.Usuario;
import com.financeai.exception.ResourceAlreadyExistsException;
import com.financeai.exception.ResourceNotFoundException;
import com.financeai.repository.RolRepository;
import com.financeai.repository.UsuarioRepository;
import com.financeai.security.JwtService;
import com.financeai.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UsuarioRepository usuarioRepository;

    private final RolRepository rolRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;


    // ==============================
    // REGISTRO
    // ==============================

    @Override
    @Transactional
    public RegisterResponse register(RegisterRequest request) {

        // Verificar correo
        if (usuarioRepository.existsByCorreo(request.getCorreo())) {

            throw new ResourceAlreadyExistsException(
                    "El correo ya está registrado."
            );
        }

        // Verificar documento
        if (usuarioRepository.existsByDocumento(request.getDocumento())) {

            throw new ResourceAlreadyExistsException(
                    "El documento ya está registrado."
            );
        }

        // Buscar rol CLIENTE
        Rol rolCliente = rolRepository.findByNombre("CLIENTE")
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "El rol CLIENTE no existe."
                        )
                );

        // Crear usuario
        Usuario usuario = Usuario.builder()
                .nombreCompleto(request.getNombreCompleto())
                .documento(request.getDocumento())
                .edad(request.getEdad())
                .correo(request.getCorreo())
                .contrasena(
                        passwordEncoder.encode(
                                request.getContrasena()
                        )
                )
                .rol(rolCliente)
                .activo(true)
                .registerDate(LocalDateTime.now())
                .registerUserId("SYSTEM")
                .build();

        // Guardar
        Usuario usuarioGuardado =
                usuarioRepository.save(usuario);

        // Respuesta
        return RegisterResponse.builder()
                .usuarioId(usuarioGuardado.getUsuarioId())
                .nombreCompleto(
                        usuarioGuardado.getNombreCompleto()
                )
                .correo(
                        usuarioGuardado.getCorreo()
                )
                .mensaje(
                        "Usuario registrado correctamente."
                )
                .build();
    }


    // ==============================
    // LOGIN
    // ==============================

    @Override
    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest request) {

        // 1. Buscar usuario por correo
        Usuario usuario = usuarioRepository
                .findByCorreo(request.getCorreo())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Correo o contraseña incorrectos."
                        )
                );


        // 2. Verificar si está activo
        if (!Boolean.TRUE.equals(usuario.getActivo())) {

            throw new RuntimeException(
                    "El usuario está inactivo."
            );
        }


        // 3. Verificar contraseña
        boolean passwordCorrecta =
                passwordEncoder.matches(
                        request.getContrasena(),
                        usuario.getContrasena()
                );

        if (!passwordCorrecta) {

            throw new RuntimeException(
                    "Correo o contraseña incorrectos."
            );
        }


        // 4. Generar JWT
        String token =
                jwtService.generateToken(
                        usuario.getCorreo()
                );


        // 5. Obtener rol
        String rol = null;

        if (usuario.getRol() != null) {

            rol = usuario.getRol().getNombre();
        }


        // 6. Devolver respuesta
        return LoginResponse.builder()
                .token(token)
                .tipo("Bearer")
                .usuarioId(usuario.getUsuarioId())
                .nombreCompleto(
                        usuario.getNombreCompleto()
                )
                .correo(
                        usuario.getCorreo()
                )
                .rol(rol)
                .build();
    }
}