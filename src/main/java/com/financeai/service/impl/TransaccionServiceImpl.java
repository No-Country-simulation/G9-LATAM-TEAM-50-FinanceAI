package com.financeai.service.impl;

import com.financeai.dto.request.TransaccionRequest;
import com.financeai.dto.response.TransaccionResponse;
import com.financeai.entity.Categoria;
import com.financeai.entity.Transaccion;
import com.financeai.entity.Usuario;
import com.financeai.exception.ResourceNotFoundException;
import com.financeai.repository.CategoriaRepository;
import com.financeai.repository.TransaccionRepository;
import com.financeai.repository.UsuarioRepository;
import com.financeai.service.TransaccionService;
import com.financeai.service.ai.AIService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TransaccionServiceImpl implements TransaccionService {

    private final TransaccionRepository transaccionRepository;

    private final UsuarioRepository usuarioRepository;

    private final CategoriaRepository categoriaRepository;

    private final AIService aiService;

    // =========================================================
    // OBTENER USUARIO AUTENTICADO
    // =========================================================

    private Usuario obtenerUsuarioAutenticado() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (authentication == null ||
                !authentication.isAuthenticated()) {

            throw new ResourceNotFoundException(
                    "Usuario no autenticado."
            );
        }

        Object principal = authentication.getPrincipal();

        if (!(principal instanceof Usuario)) {

            throw new ResourceNotFoundException(
                    "No fue posible identificar al usuario autenticado."
            );
        }

        return (Usuario) principal;
    }


    // =========================================================
    // VALIDAR EL TIPO DE TRANSACCION
    // =========================================================

    private void validarTipo(String tipo) {

        if (!"INGRESO".equalsIgnoreCase(tipo) &&
                !"GASTO".equalsIgnoreCase(tipo)) {

            throw new IllegalArgumentException(
                    "El tipo debe ser INGRESO o GASTO."
            );
        }
    }


    // =========================================================
    // CONVERTIR ENTITY -> RESPONSE
    // =========================================================

    private TransaccionResponse convertirRespuesta(
            Transaccion transaccion) {

        return TransaccionResponse.builder()
                .transaccionId(transaccion.getTransaccionId())
                .descripcion(transaccion.getDescripcion())
                .monto(transaccion.getMonto())
                .fecha(transaccion.getFecha())
                .tipo(transaccion.getTipo())
                .metodoPago(transaccion.getMetodoPago())
                .categoria(
                        transaccion.getCategoria().getNombre()
                )
                .usuario(
                        transaccion.getUsuario().getNombreCompleto()
                )
                .build();
    }


    // =========================================================
    // CREAR TRANSACCION CON PREDICCIÓN DE IA
    // =========================================================

    @Override
    @Transactional
    public TransaccionResponse crearTransaccion(
            TransaccionRequest request) {

        Usuario usuario = obtenerUsuarioAutenticado();

        validarTipo(request.getTipo());

        /*Categoria categoria =
                categoriaRepository
                        .findById(request.getCategoriaId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Categoría no encontrada."
                                )
                        );*/

        Categoria categoria = null;

        try {
            log.info("Llamando a AIService para clasificar: '{}'", request.getDescripcion());

            String nombreCategoriaAI = aiService.obtenerCategoria(request.getDescripcion());

            if (nombreCategoriaAI != null) {
                nombreCategoriaAI = nombreCategoriaAI.toUpperCase().trim();
                log.info("La IA devolvió la categoría: {}", nombreCategoriaAI);

                categoria = categoriaRepository.findByNombre(nombreCategoriaAI).orElse(null);
            }

        } catch (Exception e) {
            log.error("Error al obtener la categoría desde AIService: {}", e.getMessage());
        }

        if (categoria == null) {
            log.warn("Asignando categoría por defecto 'OTROS'.");
            categoria = categoriaRepository.findByNombre("OTROS")
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Categoría por defecto 'OTROS' no encontrada en la Base de Datos."
                    ));
        }

        Transaccion transaccion =
                Transaccion.builder()
                        .descripcion(request.getDescripcion())
                        .monto(request.getMonto())
                        .fecha(LocalDateTime.now())
                        .tipo(request.getTipo().toUpperCase())
                        .metodoPago(request.getMetodoPago())
                        .categoria(categoria)
                        .usuario(usuario)
                        .registerUserId(usuario.getCorreo())
                        .registerDate(LocalDateTime.now())
                        .ipRegister("127.0.0.1")
                        .build();

        Transaccion guardada =
                transaccionRepository.save(transaccion);

        log.info(
                "Transacción {} creada como {} para usuario {}",
                guardada.getTransaccionId(),
                guardada.getTipo(),
                usuario.getUsuarioId()
        );

        return convertirRespuesta(guardada);
    }


    // =========================================================
    // LISTAR TRANSACCIONES DEL USUARIO AUTENTICADO
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<TransaccionResponse> listarTransacciones() {

        Usuario usuario = obtenerUsuarioAutenticado();

        log.info(
                "Consultando transacciones del usuario {}",
                usuario.getUsuarioId()
        );

        List<Transaccion> transacciones =
                transaccionRepository
                        .findByUsuarioUsuarioId(
                                usuario.getUsuarioId()
                        );

        return transacciones.stream()
                .map(this::convertirRespuesta)
                .toList();
    }


    // =========================================================
    // OBTENER UNA TRANSACCION
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public TransaccionResponse obtenerTransaccion(
            Integer id) {

        Usuario usuario = obtenerUsuarioAutenticado();

        log.info(
                "Consultando transacción {} del usuario {}",
                id,
                usuario.getUsuarioId()
        );

        Transaccion transaccion =
                transaccionRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Transacción no encontrada."
                                )
                        );

        // Seguridad:
        // verificar que pertenece al usuario autenticado
        if (!transaccion.getUsuario()
                .getUsuarioId()
                .equals(usuario.getUsuarioId())) {

            throw new ResourceNotFoundException(
                    "Transacción no encontrada."
            );
        }

        return convertirRespuesta(transaccion);
    }


    // =========================================================
    // ELIMINAR TRANSACCION
    // =========================================================

    @Override
    @Transactional
    public void eliminarTransaccion(Integer id) {

        Usuario usuario = obtenerUsuarioAutenticado();

        log.info(
                "Eliminando transacción {} del usuario {}",
                id,
                usuario.getUsuarioId()
        );

        Transaccion transaccion =
                transaccionRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Transacción no encontrada."
                                )
                        );

        // Verificar propietario
        if (!transaccion.getUsuario()
                .getUsuarioId()
                .equals(usuario.getUsuarioId())) {

            throw new ResourceNotFoundException(
                    "Transacción no encontrada."
            );
        }

        transaccionRepository.delete(transaccion);
    }


    // =========================================================
    // LISTAR POR CATEGORIA
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<TransaccionResponse> listarPorCategoria(
            Integer categoriaId) {

        Usuario usuario = obtenerUsuarioAutenticado();

        log.info(
                "Consultando categoría {} para usuario {}",
                categoriaId,
                usuario.getUsuarioId()
        );

        List<Transaccion> transacciones =
                transaccionRepository
                        .findByCategoriaCategoriaId(
                                categoriaId
                        );

        // Filtrar para que solamente regresen
        // transacciones del usuario autenticado
        return transacciones.stream()
                .filter(transaccion ->
                        transaccion.getUsuario()
                                .getUsuarioId()
                                .equals(
                                        usuario.getUsuarioId()
                                )
                )
                .map(this::convertirRespuesta)
                .toList();
    }


    // =========================================================
    // ACTUALIZAR TRANSACCION CON PREDICCIÓN DE AI
    // =========================================================

    @Override
    @Transactional
    public TransaccionResponse actualizarTransaccion(
            Integer id,
            TransaccionRequest request) {

        Usuario usuario = obtenerUsuarioAutenticado();

        log.info(
                "Actualizando transacción {} del usuario {}",
                id,
                usuario.getUsuarioId()
        );

        Transaccion transaccion =
                transaccionRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Transacción no encontrada."
                                )
                        );

        // Verificar propietario
        if (!transaccion.getUsuario()
                .getUsuarioId()
                .equals(usuario.getUsuarioId())) {

            throw new ResourceNotFoundException(
                    "Transacción no encontrada."
            );
        }

        /*/ Buscar categoría
        Categoria categoria =
                categoriaRepository
                        .findById(request.getCategoriaId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Categoría no encontrada."
                                )
                        );*/

        Categoria categoria = null;

        if (request.getCategoriaId() != null) {
            categoria = categoriaRepository.findById(request.getCategoriaId())
                    .orElse(null);
        }

        if (categoria == null) {
            try {
                log.info("Llamando a AIService para clasificar la edición: '{}'", request.getDescripcion());
                String nombreCategoriaIA = aiService.obtenerCategoria(request.getDescripcion());

                if (nombreCategoriaIA != null) {
                    nombreCategoriaIA = nombreCategoriaIA.toUpperCase().trim();
                    categoria = categoriaRepository.findByNombre(nombreCategoriaIA).orElse(null);
                }
            } catch (Exception e) {
                log.error("Error al obtener categoría por IA en actualización: {}", e.getMessage());
            }
        }

        if (categoria == null) {
            log.warn("Asignando categoría por defecto 'OTROS' en la actualización.");
            categoria = categoriaRepository.findByNombre("OTROS")
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Categoría por defecto 'OTROS' no encontrada en la Base de Datos."
                    ));
        }

        //Validar el tipo de categoria
        validarTipo(request.getTipo());


        // Actualizar datos
        transaccion.setTipo(
                request.getTipo().toUpperCase()
        );

        transaccion.setDescripcion(
                request.getDescripcion()
        );

        transaccion.setMonto(
                request.getMonto()
        );

        transaccion.setMetodoPago(
                request.getMetodoPago()
        );

        transaccion.setCategoria(
                categoria
        );

        // NO cambia el usuario.
        transaccion.setUsuario(usuario);

        // Auditoría
        transaccion.setUserEdit(
                usuario.getCorreo()
        );

        transaccion.setEditDate(
                LocalDateTime.now()
        );

        transaccion.setIpEdit(
                "127.0.0.1"
        );

        Transaccion actualizada =
                transaccionRepository.save(
                        transaccion
                );

        log.info("Transacción {} actualizada correctamente con categoría '{}'",
                actualizada.getTransaccionId(), categoria.getNombre());

        return convertirRespuesta(actualizada);
    }
}