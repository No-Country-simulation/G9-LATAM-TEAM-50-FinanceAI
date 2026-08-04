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

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UsuarioRepository usuarioRepository;

    private final RolRepository rolRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public RegisterResponse register(RegisterRequest request) {

        // Verificar correo
        if (usuarioRepository.existsByCorreo(request.getCorreo())) {
            throw new ResourceAlreadyExistsException("El correo ya está registrado.");
        }

        // Verificar documento
        if (usuarioRepository.existsByDocumento(request.getDocumento())) {
            throw new ResourceAlreadyExistsException("El documento ya está registrado.");
        }

        // Buscar el rol CLIENTE
        Rol rolCliente = rolRepository.findByNombre("CLIENTE")
                .orElseThrow(() ->
                        new ResourceNotFoundException("El rol CLIENTE no existe."));

        // Crear usuario
        Usuario usuario = Usuario.builder()
                .nombreCompleto(request.getNombreCompleto())
                .documento(request.getDocumento())
                .edad(request.getEdad())
                .correo(request.getCorreo())
                .contrasena(passwordEncoder.encode(request.getContrasena()))
                .rol(rolCliente)
                .activo(true)
                .registerDate(LocalDateTime.now())
                .registerUserId("SYSTEM")
                .build();

        // Guardar usuario
        Usuario usuarioGuardado = usuarioRepository.save(usuario);

        // Respuesta
        return RegisterResponse.builder()
                .usuarioId(usuarioGuardado.getUsuarioId())
                .nombreCompleto(usuarioGuardado.getNombreCompleto())
                .correo(usuarioGuardado.getCorreo())
                .mensaje("Usuario registrado correctamente.")
                .build();
    }
}