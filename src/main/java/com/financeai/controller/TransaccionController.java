package com.financeai.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.financeai.dto.request.TransaccionRequest;
import com.financeai.dto.response.TransaccionResponse;
import com.financeai.service.TransaccionService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/transacciones")
@RequiredArgsConstructor
public class TransaccionController {

    private final TransaccionService transaccionService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TransaccionResponse crear(
            @Valid @RequestBody TransaccionRequest request){

        return transaccionService.crearTransaccion(request);
    }

    @GetMapping
    public List<TransaccionResponse> listar(){

        return transaccionService.listarTransacciones();
    }

    @GetMapping("/{id}")
    public TransaccionResponse obtener(
            @PathVariable Integer id){

        return transaccionService.obtenerTransaccion(id);
    }

    @PutMapping("/{id}")
    public TransaccionResponse actualizar(
            @PathVariable Integer id,
            @Valid @RequestBody TransaccionRequest request){

        return transaccionService.actualizarTransaccion(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(
            @PathVariable Integer id){

        transaccionService.eliminarTransaccion(id);
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<TransaccionResponse> listarPorUsuario(
            @PathVariable Integer usuarioId){

        return transaccionService.listarPorUsuario(usuarioId);
    }

    @GetMapping("/categoria/{categoriaId}")
    public List<TransaccionResponse> listarPorCategoria(
            @PathVariable Integer categoriaId){

        return transaccionService.listarPorCategoria(categoriaId);
    }

}