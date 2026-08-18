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


    // =========================================================
    // CREAR TRANSACCION
    // =========================================================

    @PostMapping
    public ResponseEntity<TransaccionResponse> crearTransaccion(
            @Valid @RequestBody TransaccionRequest request) {

        TransaccionResponse response =
                transaccionService.crearTransaccion(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }


    // =========================================================
    // LISTAR TRANSACCIONES DEL USUARIO AUTENTICADO
    // =========================================================

    @GetMapping
    public ResponseEntity<List<TransaccionResponse>> listarTransacciones() {

        List<TransaccionResponse> response =
                transaccionService.listarTransacciones();

        return ResponseEntity.ok(response);
    }


    // =========================================================
    // OBTENER UNA TRANSACCION
    // =========================================================

    @GetMapping("/{id}")
    public ResponseEntity<TransaccionResponse> obtenerTransaccion(
            @PathVariable Integer id) {

        TransaccionResponse response =
                transaccionService.obtenerTransaccion(id);

        return ResponseEntity.ok(response);
    }


    // =========================================================
    // ACTUALIZAR TRANSACCION
    // =========================================================

    @PutMapping("/{id}")
    public ResponseEntity<TransaccionResponse> actualizarTransaccion(
            @PathVariable Integer id,
            @Valid @RequestBody TransaccionRequest request) {

        TransaccionResponse response =
                transaccionService.actualizarTransaccion(
                        id,
                        request
                );

        return ResponseEntity.ok(response);
    }


    // =========================================================
    // ELIMINAR TRANSACCION
    // =========================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarTransaccion(
            @PathVariable Integer id) {

        transaccionService.eliminarTransaccion(id);

        return ResponseEntity.noContent().build();
    }


    // =========================================================
    // LISTAR POR CATEGORIA
    // =========================================================

    @GetMapping("/categoria/{categoriaId}")
    public ResponseEntity<List<TransaccionResponse>> listarPorCategoria(
            @PathVariable Integer categoriaId) {

        List<TransaccionResponse> response =
                transaccionService.listarPorCategoria(categoriaId);

        return ResponseEntity.ok(response);
    }
}