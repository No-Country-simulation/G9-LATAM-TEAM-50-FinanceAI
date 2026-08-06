package com.financeai.service.impl;

import com.financeai.service.TransaccionService;

import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import java.util.List;

import java.util.stream.Collectors;

import org.springframework.transaction.annotation.Transactional;

import com.financeai.dto.request.TransaccionRequest;

import com.financeai.dto.response.TransaccionResponse;

import com.financeai.entity.Categoria;

import com.financeai.entity.Usuario;

import com.financeai.entity.Transaccion;

import com.financeai.repository.CategoriaRepository;

import com.financeai.repository.UsuarioRepository;

import com.financeai.repository.TransaccionRepository;

import com.financeai.exception.ResourceNotFoundException;


@Slf4j
@Service
@RequiredArgsConstructor
public class TransaccionServiceImpl implements TransaccionService {

    private final TransaccionRepository transaccionRepository;

    private final UsuarioRepository usuarioRepository;

    private final CategoriaRepository categoriaRepository;

    private TransaccionResponse convertirRespuesta(Transaccion transaccion) {

        return TransaccionResponse.builder()
                .transaccionId(transaccion.getTransaccionId())
                .descripcion(transaccion.getDescripcion())
                .monto(transaccion.getMonto())
                .fecha(transaccion.getFecha())
                .metodoPago(transaccion.getMetodoPago())
                .categoria(transaccion.getCategoria().getNombre())
                .usuario(transaccion.getUsuario().getNombreCompleto())
                .build();
    }

    @Override
    @Transactional
    public TransaccionResponse crearTransaccion(TransaccionRequest request) {

        Usuario usuario = usuarioRepository.findById(request.getUsuarioId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Usuario no encontrado."));

        Categoria categoria = categoriaRepository.findById(request.getCategoriaId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Categoría no encontrada."));

        Transaccion transaccion = Transaccion.builder()
                .descripcion(request.getDescripcion())
                .monto(request.getMonto())
                .fecha(LocalDateTime.now())
                .metodoPago(request.getMetodoPago())
                .categoria(categoria)
                .usuario(usuario)
                .registerUserId("SYSTEM")
                .registerDate(LocalDateTime.now())
                .ipRegister("127.0.0.1")
                .build();

        Transaccion guardada = transaccionRepository.save(transaccion);

        return convertirRespuesta(guardada);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TransaccionResponse> listarTransacciones() {

        log.info("Consultando todas las transacciones");

        List<Transaccion> transacciones =
                transaccionRepository.findAll();

        return transacciones.stream()
                .map(this::convertirRespuesta)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public TransaccionResponse obtenerTransaccion(Integer id) {

        log.info("Consultando transacción {}", id);

        Transaccion transaccion =
                transaccionRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Transacción no encontrada."));

        return convertirRespuesta(transaccion);

    }

    @Override
    public void eliminarTransaccion(Integer id) {

        log.info("Eliminando transacción {}", id);

        Transaccion transaccion =
                transaccionRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Transacción no encontrada."));

        transaccionRepository.delete(transaccion);

    }

    @Override
    @Transactional(readOnly = true)
    public List<TransaccionResponse> listarPorUsuario(Integer usuarioId) {

        log.info("Consultando transacciones del usuario {}", usuarioId);

        List<Transaccion> transacciones =
                transaccionRepository.findByUsuarioUsuarioId(usuarioId);

        return transacciones.stream()
                .map(this::convertirRespuesta)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<TransaccionResponse> listarPorCategoria(Integer categoriaId) {

        log.info("Consultando transacciones de la categoría {}", categoriaId);

        List<Transaccion> transacciones =
                transaccionRepository.findByCategoriaCategoriaId(categoriaId);

        return transacciones.stream()
                .map(this::convertirRespuesta)
                .toList();
    }

    @Override
    @Transactional
    public TransaccionResponse actualizarTransaccion(Integer id, TransaccionRequest request) {
        log.info("Iniciando la actualización de la transacción con ID: {}", id);

        // 1. Verificar si la transacción existe
        Transaccion transaccionExistente = transaccionRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Error: Transacción con ID {} no encontrada para actualizar", id);
                    return new ResourceNotFoundException("Transacción no encontrada.");
                });

        // 2. Verificar y actualizar el Usuario si cambió
        if (!transaccionExistente.getUsuario().getUsuarioId().equals(request.getUsuarioId())) {
            log.info("Cambiando usuario de la transacción al ID: {}", request.getUsuarioId());
            Usuario nuevoUsuario = usuarioRepository.findById(request.getUsuarioId())
                    .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado."));
            transaccionExistente.setUsuario(nuevoUsuario);
        }

        // 3. Verificar y actualizar la Categoría si cambió
        if (!transaccionExistente.getCategoria().getCategoriaId().equals(request.getCategoriaId())) {
            log.info("Cambiando categoría de la transacción al ID: {}", request.getCategoriaId());
            Categoria nuevaCategoria = categoriaRepository.findById(request.getCategoriaId())
                    .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada."));
            transaccionExistente.setCategoria(nuevaCategoria);
        }

        // 4. Actualizar los datos primitivos/propios de la transacción
        transaccionExistente.setDescripcion(request.getDescripcion());
        transaccionExistente.setMonto(request.getMonto());
        transaccionExistente.setMetodoPago(request.getMetodoPago());


        // 5. Guardar cambios y retornar respuesta mapeada
        Transaccion actualizada = transaccionRepository.save(transaccionExistente);
        log.info("Transacción con ID: {} actualizada exitosamente", id);

        return convertirRespuesta(actualizada);
    }




}