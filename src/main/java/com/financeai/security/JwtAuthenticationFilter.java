package com.financeai.security;

import com.financeai.entity.Usuario;
import com.financeai.repository.UsuarioRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UsuarioRepository usuarioRepository;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String authorizationHeader =
                request.getHeader("Authorization");

        // No existe Authorization
        if (authorizationHeader == null ||
                !authorizationHeader.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);
            return;
        }

        // Obtener JWT
        String token =
                authorizationHeader.substring(7);

        try {

            // Validar token
            if (!jwtService.isTokenValid(token)) {

                filterChain.doFilter(request, response);
                return;
            }

            // Obtener correo
            String correo =
                    jwtService.extractCorreo(token);

            // Evitar autenticar nuevamente
            if (SecurityContextHolder
                    .getContext()
                    .getAuthentication() == null) {

                Usuario usuario =
                        usuarioRepository
                                .findByCorreo(correo)
                                .orElse(null);

                if (usuario != null &&
                        Boolean.TRUE.equals(usuario.getActivo())) {

                    String autoridad =
                            "ROLE_" +
                                    usuario.getRol().getNombre();

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    usuario,
                                    null,
                                    List.of(
                                            new SimpleGrantedAuthority(
                                                    autoridad
                                            )
                                    )
                            );

                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(authentication);
                }
            }

        } catch (Exception e) {

            // Token inválido
            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);
    }
}