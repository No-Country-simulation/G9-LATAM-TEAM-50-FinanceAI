package com.financeai.service;

import com.financeai.dto.request.TransaccionRequest;
import com.financeai.dto.response.TransaccionResponse;

import java.util.List;

public interface TransaccionService {

    TransaccionResponse crearTransaccion(
            TransaccionRequest request
    );

    List<TransaccionResponse> listarTransacciones();

    TransaccionResponse obtenerTransaccion(
            Integer id
    );

    TransaccionResponse actualizarTransaccion(
            Integer id,
            TransaccionRequest request
    );

    void eliminarTransaccion(
            Integer id
    );

    List<TransaccionResponse> listarPorCategoria(
            Integer categoriaId
    );
}