package com.financeai.service.impl;

import java.time.LocalDateTime;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.financeai.exception.ResourceNotFoundException;
import com.financeai.dto.request.RegisterRequest;
import com.financeai.dto.response.RegisterResponse;
import com.financeai.entity.Rol;
import com.financeai.entity.Usuario;
import com.financeai.exception.ResourceAlreadyExistsException;
import com.financeai.repository.RolRepository;
import com.financeai.repository.UsuarioRepository;
import com.financeai.service.UserService;

import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UsuarioRepository usuarioRepository;

    private final RolRepository rolRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public RegisterResponse register(RegisterRequest request) {

        log.info("===== Inicio del registro de usuario =====");
        log.info("Correo recibido: {}", request.getCorreo());

        // Verificar correo
        if (usuarioRepository.existsByCorreo(request.getCorreo())) {
            log.warn("Intento de registro con correo existente: {}", request.getCorreo());
            throw new ResourceAlreadyExistsException("El correo ya está registrado.");
        }

        // Verificar documento
        if (usuarioRepository.existsByDocumento(request.getDocumento())) {
            log.warn("Documento ya registrado: {}", request.getDocumento());
            throw new ResourceAlreadyExistsException("El documento ya está registrado.");
        }

        // Buscar el rol CLIENTE
        log.info("Buscando rol CLIENTE...");

        Rol rolCliente = rolRepository.findByNombre("CLIENTE")
                .orElseThrow(() -> {

                    log.error("No existe el rol CLIENTE en la base de datos");

                    return new ResourceNotFoundException("El rol CLIENTE no existe.");
                });

        log.info("Rol encontrado: {}", rolCliente.getNombre());

        // Crear usuario
        Usuario usuario = Usuario.builder()

                .nombreCompleto(request.getNombreCompleto())
                .documento(request.getDocumento())
                .edad(request.getEdad())
                .correo(request.getCorreo())
                .contrasena(passwordEncoder.encode(request.getContrasena()))
                .rol(rolCliente)
                .activo(true)
                .build();

        // Guardar usuario
        log.info("Guardando usuario...");

        Usuario usuarioGuardado = usuarioRepository.save(usuario);

        log.info("Usuario guardado correctamente.");

        log.info("ID generado: {}", usuarioGuardado.getUsuarioId());

        // Respuesta
        log.info("Registro finalizado correctamente.");
        return RegisterResponse.builder()
                .usuarioId(usuarioGuardado.getUsuarioId())
                .nombreCompleto(usuarioGuardado.getNombreCompleto())
                .correo(usuarioGuardado.getCorreo())
                .mensaje("Usuario registrado correctamente.")
                .build();
    }
}