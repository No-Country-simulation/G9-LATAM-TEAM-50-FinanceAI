package com.financeai.service.impl;

import com.financeai.service.TransaccionService;

import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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

    private static final Logger logger =
            LoggerFactory.getLogger(TransaccionServiceImpl.class);

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

        logger.info("Iniciando registro de transacción...");

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
    public TransaccionResponse actualizarTransaccion(
            Integer id,
            TransaccionRequest request) {

        log.info("Actualizando transacción {}", id);

        Transaccion transaccion =
                transaccionRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Transacción no encontrada."));

        Usuario usuario =
                usuarioRepository.findById(request.getUsuarioId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Usuario no encontrado."));

        Categoria categoria =
                categoriaRepository.findById(request.getCategoriaId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Categoría no encontrada."));

        transaccion.setDescripcion(request.getDescripcion());
        transaccion.setMonto(request.getMonto());
        transaccion.setMetodoPago(request.getMetodoPago());

        transaccion.setUsuario(usuario);
        transaccion.setCategoria(categoria);

        transaccion.setUserEdit("SYSTEM");
        transaccion.setEditDate(LocalDateTime.now());
        transaccion.setIpEdit("127.0.0.1");

        Transaccion actualizada =
                transaccionRepository.save(transaccion);

        return convertirRespuesta(actualizada);
    }




}