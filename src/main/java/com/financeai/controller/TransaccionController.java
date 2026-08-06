package com.financeai.controller;

import com.financeai.dto.request.TransaccionRequest;
import com.financeai.dto.response.TransaccionResponse;
import com.financeai.service.TransaccionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transacciones")
@RequiredArgsConstructor
public class TransaccionController {

    private final TransaccionService transaccionService;

    @PostMapping
    public ResponseEntity<TransaccionResponse> crearTransaccion(
            @Valid @RequestBody TransaccionRequest request) {

        TransaccionResponse response =
                transaccionService.crearTransaccion(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<TransaccionResponse>> listarTransacciones() {

        return ResponseEntity.ok(
                transaccionService.listarTransacciones());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransaccionResponse> obtenerTransaccion(
            @PathVariable Integer id) {

        return ResponseEntity.ok(
                transaccionService.obtenerTransaccion(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TransaccionResponse> actualizarTransaccion(
            @PathVariable Integer id,
            @Valid @RequestBody TransaccionRequest request) {

        return ResponseEntity.ok(
                transaccionService.actualizarTransaccion(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarTransaccion(
            @PathVariable Integer id) {

        transaccionService.eliminarTransaccion(id);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<TransaccionResponse>> listarPorUsuario(
            @PathVariable Integer usuarioId) {

        return ResponseEntity.ok(
                transaccionService.listarPorUsuario(usuarioId));
    }

    @GetMapping("/categoria/{categoriaId}")
    public ResponseEntity<List<TransaccionResponse>> listarPorCategoria(
            @PathVariable Integer categoriaId) {

        return ResponseEntity.ok(
                transaccionService.listarPorCategoria(categoriaId));
    }
}