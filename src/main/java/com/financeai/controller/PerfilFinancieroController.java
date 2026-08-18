package com.financeai.controller;

import com.financeai.entity.Transaccion;
import com.financeai.entity.Usuario;
import com.financeai.repository.TransaccionRepository;
import com.financeai.service.ai.AIService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/perfil-financiero")
@RequiredArgsConstructor
public class PerfilFinancieroController {
    private final AIService aiService;
    private final TransaccionRepository transaccionRepository;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> obtenerPerfil() {
        Usuario usuario = (Usuario) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        log.info("Solicitando análisis de perfil financiero para el usuario: {}", usuario.getUsuarioId());

        List<Transaccion> transaccionList = transaccionRepository.findByUsuarioUsuarioId(usuario.getUsuarioId());

        if (transaccionList.isEmpty()) {
            log.warn("El usuario {} no tiene transacciones para analizar.", usuario.getUsuarioId());
            return ResponseEntity.ok("{\"mensaje\": \"No hay suficientes transacciones para generar un perfil financiero.\"}");
        }

        String resultadoAnalisis = aiService.obtenerPerfilFinanciero(transaccionList);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(resultadoAnalisis);
    }
}
